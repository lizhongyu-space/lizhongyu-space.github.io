// ===== 全站脚本：左侧导航、页脚、Gallery 分类 + 照片墙、大图查看 =====
const base = document.body.dataset.base || "";   // 404 页面用 "/" 作为路径前缀
const page = document.body.dataset.page || "";   // 当前页面名，用来高亮导航

// 1) 左侧竖直导航（只在这里写一次，所有页面共用）：可展开 / 收缩，收缩后仍保留窄侧栏和控制按钮
// 这一段是：左侧导航里的菜单项。格式是 [页面名, 显示的名字, 链接文件, 收缩后显示的字母]。以后想加新菜单，照着在末尾加一项即可
const links = [["about", "About", "about.html", "A"], ["gallery", "Gallery", "gallery.html", "G"], ["postcrossing", "Postcrossing", "postcrossing.html", "P"], ["globalview", "Global View", "globalview.html", "V"], ["contact", "Contact", "contact.html", "C"]];
const root = document.documentElement;
let collapsed = window.innerWidth < 720;   // 手机默认收缩
try { const s = localStorage.getItem("navCollapsed"); if (s !== null) collapsed = s === "1"; } catch (e) {}
root.classList.toggle("nav-collapsed", collapsed);

document.body.insertAdjacentHTML("afterbegin",
  `<aside class="side" id="side"><div class="side-top">` +
  `<a class="logo" href="${base}about.html">LI ZHONGYU</a>` +
  `<button class="side-toggle" id="sideToggle" type="button"></button></div><nav>` +
  links.map(([k, t, h, a]) =>
    `<a href="${base}${h}"${k === page ? ' class="active"' : ""} title="${t}"><span class="ab">${a}</span><span class="lbl">${t.toUpperCase()}</span></a>`).join("") +
  `</nav></aside>`);
document.body.insertAdjacentHTML("beforeend",
     `<footer><p>© 2026 LI ZHONGYU</p><p>Keep Exploring.</p></footer>`);

const toggle = document.getElementById("sideToggle");
const syncToggle = () => {
  const c = root.classList.contains("nav-collapsed");
  toggle.textContent = c ? "≡" : "‹";
  toggle.setAttribute("aria-label", c ? "Expand navigation" : "Collapse navigation");
  toggle.setAttribute("aria-expanded", String(!c));
};
toggle.addEventListener("click", () => {
  const c = root.classList.toggle("nav-collapsed");
  try { localStorage.setItem("navCollapsed", c ? "1" : "0"); } catch (e) {}
  syncToggle();
});
syncToggle();

// 2) 照片卡片模板
// Gallery 卡片使用独立的小型 WebP 缩略图；点击后再加载原始照片。
const imageUrl = (p) => p.image ? encodeURI(p.image) : "";
const thumbUrl = (p) => {
  if (!p.image) return "";
  const path = p.image.replace(/^gallery\//, "gallery-thumbs/");
  return encodeURI(path.replace(/\.[^.]+$/, ".webp"));
};
const displayUrl = (p) => {
  if (!p.image) return "";
  const path = p.image.replace(/^gallery\//, "gallery-display/");
  return encodeURI(path.replace(/\.[^.]+$/, ".webp"));
};

const card = (p, i) =>
  `<figure class="card" data-i="${i}" tabindex="0">` +
  (p.image ? `<img src="${thumbUrl(p)}" data-full-src="${displayUrl(p)}" data-original-src="${imageUrl(p)}" alt="${p.title}" loading="lazy" decoding="async">` : "") +
  `</figure>`;

// 3) Gallery 页面：分类筛选 + 照片墙 + Lightbox
const gallery = document.getElementById("gallery");
if (gallery) {
  let list = photos;   // 当前分类下的照片
  let cur = 0;
  const filters = document.getElementById("filters");
  const empty = document.getElementById("empty");
  const render = () => {
    gallery.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
  };
  filters.innerHTML = ["All", ...categories].map((c, i) =>
    `<button type="button" class="chip${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    filters.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === b));
    list = b.dataset.cat === "All" ? photos : photos.filter((p) => p.category === b.dataset.cat);
    render();
  });
  render();

  const lb = document.getElementById("lightbox");
  const show = (i) => {
    cur = (i + list.length) % list.length;
    const p = list[cur];
    lb.querySelector(".lb-img").innerHTML = p.image
      ? `<img src="${displayUrl(p)}" data-original-src="${imageUrl(p)}" alt="${p.title}">`
      : `<div class="ph" style="aspect-ratio:${p.ratio}"></div>`;
    lb.querySelector(".lb-info").innerHTML =
      `<h3>${p.location}</h3><p>${p.date || "Date not specified"}</p><p class="small">${p.title}</p>`;
    const lbImage = lb.querySelector(".lb-img img");
    if (lbImage) {
      lbImage.addEventListener("error", () => {
        const original = lbImage.dataset.originalSrc;
        if (original && lbImage.src !== original) lbImage.src = original;
      }, { once: true });
    }
    lb.hidden = false;
  };
  const open = (e) => { const c = e.target.closest(".card"); if (c) show(+c.dataset.i); };
  gallery.addEventListener("click", open);
  gallery.addEventListener("keydown", (e) => e.key === "Enter" && open(e));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.matches(".lb-close")) lb.hidden = true;
    if (e.target.matches(".lb-prev")) show(cur - 1);
    if (e.target.matches(".lb-next")) show(cur + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let x0 = 0;   // 手机上左右滑动切换
  lb.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX));
  lb.addEventListener("touchend", (e) => {
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1));
  });
}
// 这一段是：加载右上角的"语言切换 + 深浅主题"功能（具体内容在 js/lang.js 里）
const langScript = document.createElement("script");
langScript.src = base + "js/lang.js";
document.body.appendChild(langScript);
