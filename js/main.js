// ===== 全站脚本：导航栏、页脚、照片墙、大图查看 =====
const base = document.body.dataset.base || "";   // 404 页面用 "/" 作为路径前缀
const page = document.body.dataset.page || "";   // 当前页面名，用来高亮导航

// 1) 导航栏和页脚（只在这里写一次，四个页面共用）
const links = [["home", "Home", "index.html"], ["gallery", "Gallery", "gallery.html"], ["about", "About", "about.html"]];
document.body.insertAdjacentHTML("afterbegin",
  `<header class="nav"><a class="logo" href="${base}index.html">[NAME]</a><nav>` +
  links.map(([k, t, h]) => `<a href="${base}${h}"${k === page ? ' class="active"' : ""}>${t}</a>`).join("") +
  `</nav></header>`);
document.body.insertAdjacentHTML("beforeend",
  `<footer><p>© 2026 [NAME]</p><p>Made with curiosity.</p></footer>`);

// 2) 照片卡片模板
const card = (p, i) =>
  `<figure class="card" data-i="${i}" tabindex="0" style="aspect-ratio:${p.ratio || "4/3"}">` +
  (p.image ? `<img src="${base}${p.image}" alt="${p.title}" loading="lazy">` : "") +
  `<figcaption>${p.title}</figcaption></figure>`;

// 3) 首页精选照片：取前 4 张，点击进入 Gallery
const featured = document.getElementById("featured");
if (featured) {
  featured.innerHTML = photos.slice(0, 4).map(card).join("");
  featured.addEventListener("click", () => (location.href = "gallery.html"));
}

// 4) Gallery 页面：生成照片墙 + Lightbox
const gallery = document.getElementById("gallery");
if (gallery) {
  gallery.innerHTML = photos.map(card).join("");
  const lb = document.getElementById("lightbox");
  let cur = 0;
  const show = (i) => {
    cur = (i + photos.length) % photos.length;
    const p = photos[cur];
    lb.querySelector(".lb-img").innerHTML = p.image
      ? `<img src="${p.image}" alt="${p.title}">`
      : `<div class="ph" style="aspect-ratio:${p.ratio}"></div>`;
    lb.querySelector(".lb-info").innerHTML =
      `<h3>${p.title}</h3><p>${p.location} · ${p.date}</p><p>From ${p.sender}</p><p>${p.description}</p>`;
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
