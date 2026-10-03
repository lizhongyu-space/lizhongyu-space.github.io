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
  let currentMode = null;

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

  // 2.5) 小地图：把世界地图只截取"这个国家附近"的一块，标出位置，并在顶部写出经纬度
  //      世界地图的图形数据只放进页面一次（#gvWorld），每个国家的小地图都引用它，不会重复占用空间
  document.body.insertAdjacentHTML("beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><g id="gvWorld">` +
    `<path class="land" d="${WORLD_MAP.land}"/><path class="borders" d="${WORLD_MAP.borders}"/></g></defs></svg>`);
  const fmt = (lat, lon) =>   // 经纬度显示格式，例如 35.68° N, 139.69° E
    `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? "E" : "W"}`;
  const miniMap = (loc) => {
    const { w: MW, h: MH, latTop, latBottom } = WORLD_MAP;
    const px = (loc.lon + 180) / 360 * MW, py = (latTop - loc.lat) / (latTop - latBottom) * MH;   // 国家位置在世界地图上的坐标
    const vw = 300, vh = 200;                                                                    // 小地图截取的范围大小（数字越小，放大越多）
    const vx = Math.max(0, Math.min(px - vw / 2, MW - vw)), vy = Math.max(0, Math.min(py - vh / 2, MH - vh));
    return `<aside class="gv-map"><div class="gv-coord">${fmt(loc.lat, loc.lon)}</div>` +
      `<svg viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw} ${vh}" role="img" aria-label="Map location">` +
      `<use href="#gvWorld"/>` +
      `<line class="gv-cross" x1="${vx}" x2="${vx + vw}" y1="${py}" y2="${py}"/><line class="gv-cross" x1="${px}" x2="${px}" y1="${vy}" y2="${vy + vh}"/>` +
      `<circle class="gv-ring" cx="${px}" cy="${py}" r="8"/><circle class="gv-pin" cx="${px}" cy="${py}" r="3"/></svg></aside>`;
  };

  // 3) 选好分类后，生成真正的照片页面（按国家 / 按人名分组）
  const render = (mode) => {
    const en = document.documentElement.lang !== "zh-CN";
    const byCountry = mode === "country";
    const groups = new Map();   // 分组：组名 → 照片列表（按数据里出现的先后顺序）
    globalPhotos.forEach((p) => {
      const key = byCountry ? p.country : p.person;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    });
    flat = [];
    label.textContent = en ? "GLOBAL VIEW · " + (byCountry ? "BY COUNTRY" : "BY PERSON") : "全球视野 · " + (byCountry ? "按国家" : "按人物");
    groupsEl.innerHTML = [...groups].map(([name, list]) => {
      const head = byCountry ? `${flag(list[0].code)} ${name}` : name;   // 国家分组前面加国旗
      const cards = list.map((p) => {
        const i = flat.push(p) - 1;
        return `<figure class="card" data-i="${i}" tabindex="0" style="aspect-ratio:${p.ratio || "4/3"}">` +
          (p.image ? `<img src="${p.image}" alt="${p.place}" loading="lazy" decoding="async">` : "") +
          `<figcaption>${p.place}</figcaption></figure>`;
      }).join("");
      const loc = byCountry ? countryLocations[name] : null;   // 只有"按国家"分类时，才在右侧显示小地图
      return `<div class="gv-group"><h2>${head} <span class="muted small">${list.length}</span></h2>` +
        `<div class="gv-row${loc ? " has-map" : ""}"><div class="masonry">${cards}</div>${loc ? miniMap(loc) : ""}</div></div>`;
    }).join("");
    choice.hidden = true;
    view.hidden = false;
    window.scrollTo(0, 0);
  };
  choice.addEventListener("click", (e) => { const b = e.target.closest(".gv-big"); if (b) { currentMode = b.dataset.mode; render(b.dataset.mode); } });

  window.addEventListener("site-language-change", () => { if (currentMode) render(currentMode); });

  // 4) "← Change"：回到分类选择
  document.getElementById("gvBack").addEventListener("click", () => {
    view.hidden = true; choice.hidden = false; lb.hidden = true;
  });

  // 5) 点击照片：放大查看，照片下方显示地点 / 时间 / 来自谁 / 说明
  const show = (i) => {
    cur = (i + flat.length) % flat.length;
    const p = flat[cur];
    const en = document.documentElement.lang !== "zh-CN";
    lb.querySelector(".lb-img").innerHTML = p.image
      ? `<img src="${p.image}" alt="${p.place}">`
      : `<div class="ph" style="aspect-ratio:${p.ratio}"></div>`;
    const originalPath = p.image || "";
    const originalExt = (originalPath.split(".").pop() || "jpg").split("?")[0];
    const downloadBase = (p.place || p.country || (en ? "photo" : "照片")) + "-" + (p.date || (en ? "undated" : "未记录时间"));
    const originalName = downloadBase.replace(/[\\/:*?"<>|]+/g, "-") + "." + originalExt;
    const downloadLabel = en ? "Download original" : "下载原图";
    const downloadControl = originalPath
      ? `<a class="photo-download" href="${encodeURI(originalPath)}" download="${escapeHtml(originalName)}" aria-label="${downloadLabel}" title="${downloadLabel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg><span>${downloadLabel}</span></a>`
      : "";
    lb.querySelector(".lb-info").innerHTML =
      `${downloadControl}<h3>${p.place}, ${p.country}</h3>` +
      `<p>${en ? "Date" : "日期"} · ${p.date}</p><p>${en ? "From" : "来自"} · ${p.person}</p><p>${p.note}</p>`;
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