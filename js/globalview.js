// ===== Global View 页面逻辑：Illustrate 弹窗 → 选择分类 → 照片页面 → 大图查看 =====
(() => {
  const intro = document.getElementById("gvIntro");
  const win = document.getElementById("gvWin");
  const choice = document.getElementById("gvChoice");
  const view = document.getElementById("gvView");
  const groupsEl = document.getElementById("gvGroups");
  const label = document.getElementById("gvLabel");
  const lb = document.getElementById("lightbox");
  let flat = [];   // 当前页面上所有照片（按显示顺序），大图查看的上一张 / 下一张用它
  let cur = 0;

  // 1) Illustrate 弹窗：红色按钮关闭（关闭后出现分类选择），绿色按钮放大 / 还原
  const closeIntro = () => { if (intro.hidden) return; intro.hidden = true; if (view.hidden) choice.hidden = false; };
  document.getElementById("gvClose").addEventListener("click", closeIntro);
  document.getElementById("gvZoom").addEventListener("click", () => {
    const z = win.classList.toggle("zoomed");
    const b = document.getElementById("gvZoom");
    b.textContent = z ? "−" : "+";
    b.setAttribute("aria-label", z ? "Restore" : "Enlarge");
  });
  intro.addEventListener("click", (e) => { if (e.target === intro) closeIntro(); });   // 点弹窗外的遮罩也可以关闭

  // 2) 国旗：根据两位国家代码生成国旗符号
  const flag = (code) => [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");

  // 3) 选好分类后，生成真正的照片页面（按国家 / 按人名分组）
  const render = (mode) => {
    const byCountry = mode === "country";
    const groups = new Map();   // 分组：组名 → 照片列表（按数据里出现的先后顺序）
    globalPhotos.forEach((p) => {
      const key = byCountry ? p.country : p.person;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    });
    flat = [];
    label.textContent = "GLOBAL VIEW · " + (byCountry ? "BY COUNTRY" : "BY PERSON");
    groupsEl.innerHTML = [...groups].map(([name, list]) => {
      const head = byCountry ? `${flag(list[0].code)} ${name}` : name;   // 国家分组前面加国旗
      const cards = list.map((p) => {
        const i = flat.push(p) - 1;
        return `<figure class="card" data-i="${i}" tabindex="0" style="aspect-ratio:${p.ratio || "4/3"}">` +
          (p.image ? `<img src="${p.image}" alt="${p.place}" loading="lazy">` : "") +
          `<figcaption>${p.place}</figcaption></figure>`;
      }).join("");
      return `<div class="gv-group"><h2>${head} <span class="muted small">${list.length}</span></h2><div class="masonry">${cards}</div></div>`;
    }).join("");
    choice.hidden = true;
    view.hidden = false;
    window.scrollTo(0, 0);
  };
  choice.addEventListener("click", (e) => { const b = e.target.closest(".gv-big"); if (b) render(b.dataset.mode); });

  // 4) "← Change"：回到分类选择
  document.getElementById("gvBack").addEventListener("click", () => {
    view.hidden = true; choice.hidden = false; lb.hidden = true;
  });

  // 5) 点击照片：放大查看，照片下方显示地点 / 时间 / 来自谁 / 说明
  const show = (i) => {
    cur = (i + flat.length) % flat.length;
    const p = flat[cur];
    lb.querySelector(".lb-img").innerHTML = p.image
      ? `<img src="${p.image}" alt="${p.place}">`
      : `<div class="ph" style="aspect-ratio:${p.ratio}"></div>`;
    lb.querySelector(".lb-info").innerHTML =
      `<h3>${p.place}, ${p.country}</h3>` +
      `<p>Date · ${p.date}</p><p>From · ${p.person}</p><p>${p.note}</p>`;
    lb.hidden = false;
  };
  const open = (e) => { const c = e.target.closest(".card"); if (c) show(+c.dataset.i); };
  groupsEl.addEventListener("click", open);
  groupsEl.addEventListener("keydown", (e) => e.key === "Enter" && open(e));
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.matches(".lb-close")) lb.hidden = true;
    if (e.target.matches(".lb-prev")) show(cur - 1);
    if (e.target.matches(".lb-next")) show(cur + 1);
  });

  // 6) 键盘：Esc 关闭当前弹窗 / 大图，左右方向键切换照片
  document.addEventListener("keydown", (e) => {
    if (!intro.hidden) { if (e.key === "Escape") closeIntro(); return; }
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();