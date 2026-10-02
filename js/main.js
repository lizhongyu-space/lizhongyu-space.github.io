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

/* Gallery 中国地图：使用现有世界地图数据的中国区域投影，不新增外部地图服务。 */
const galleryLocationDefs = [
  { key:"beijing", name:"北京市", lat:39.9042, lon:116.4074, test:p=>/北京/.test(p.location||"") },
  { key:"shanghai", name:"上海市", lat:31.2304, lon:121.4737, test:p=>/上海/.test(p.location||"") },
  { key:"nanjing", name:"南京市", lat:32.0603, lon:118.7969, test:p=>/南京|我的学校/.test(p.location||"") },
  { key:"tianjin", name:"天津市", lat:39.3434, lon:117.3616, test:p=>/天津/.test(p.location||"") },
  { key:"hangzhou", name:"杭州市（太子尖）", lat:30.2741, lon:120.1551, test:p=>/杭州/.test(p.location||"") || p.category==="太子尖" },
  { key:"weihai", name:"威海市", lat:37.5131, lon:122.1204, test:p=>/威海/.test(p.location||"") },
  { key:"taian", name:"泰安市", lat:36.1949, lon:117.1291, test:p=>/泰安/.test(p.location||"") },
  { key:"jinan", name:"济南市", lat:36.6512, lon:117.1201, test:p=>/济南/.test(p.location||"") },
  { key:"lianyungang", name:"连云港市", lat:34.5967, lon:119.2229, test:p=>/连云港/.test(p.location||"") },
  { key:"hongkong", name:"香港", lat:22.3193, lon:114.1694, test:p=>/香港/.test(p.location||"") },
  { key:"macau", name:"澳门特别行政区", lat:22.1987, lon:113.5439, test:p=>/澳门/.test(p.location||"") }
];
const galleryMapFmt = (lat, lon) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
const galleryMapProjection = (lat, lon) => ({
  x:(lon + 180) / 360 * WORLD_MAP.w,
  y:(WORLD_MAP.latTop - lat) / (WORLD_MAP.latTop - WORLD_MAP.latBottom) * WORLD_MAP.h
});
const galleryMapLocations = (list) => galleryLocationDefs.map(def => ({
  ...def,
  photos:list.filter(def.test)
})).filter(x => x.photos.length);
const galleryMapMarkup = (list, selectedKey = "") => {
  const locations = galleryMapLocations(list);
  if (!locations.length) return '<div class="gallery-map-empty">No mapped photo locations yet.</div>';
  // 东部中国局部视图：覆盖北京、江浙沪及其周边，避免展示不必要的远端区域。
  const mapLonMin = 108, mapLonMax = 123;
  const mapLatMin = 28, mapLatMax = 42;
  const vx = (mapLonMin + 180) / 360 * WORLD_MAP.w;
  const vy = (mapLatMax - WORLD_MAP.latTop) / (WORLD_MAP.latBottom - WORLD_MAP.latTop) * WORLD_MAP.h;
  const vw = (mapLonMax - mapLonMin) / 360 * WORLD_MAP.w;
  const vh = (mapLatMax - mapLatMin) / (WORLD_MAP.latTop - WORLD_MAP.latBottom) * WORLD_MAP.h;
  const points = locations.map(loc => {
    const p = galleryMapProjection(loc.lat, loc.lon);
    return `<g class="gallery-map-point${selectedKey===loc.key?" active":""}" tabindex="0" role="button" data-location-key="${loc.key}" aria-label="${loc.name}">
      <circle class="halo" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5"/>
      <circle class="dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.2"/>
    </g>`;
  }).join("");
  const graticules = [30,35,40].map(lat => {
    const y=galleryMapProjection(lat,72).y;
    return `<line class="gallery-map-graticule" x1="${vx}" x2="${vx+vw}" y1="${y}" y2="${y}"/>`;
  }).join("") + [110,115,120].map(lon => {
    const x=galleryMapProjection(18,lon).x;
    return `<line class="gallery-map-graticule" x1="${x}" x2="${x}" y1="${vy}" y2="${vy+vh}"/>`;
  }).join("");
  return `<svg viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}" role="img" aria-label="China photo locations">
    <path class="gallery-map-land" d="${WORLD_MAP.land}"/>
    <path class="gallery-map-border" d="${WORLD_MAP.borders}"/>
    ${graticules}${points}
  </svg>
  <div class="gallery-map-card" id="galleryMapCard" hidden>
    <h3 id="galleryMapName"></h3>
    <div class="gallery-map-coord" id="galleryMapCoord"></div>
    <div class="gallery-map-coord" id="galleryMapCount"></div>
    <button class="gallery-map-browse" id="galleryMapBrowse" type="button">浏览该地区</button>
  </div>`;
};

const card = (p, i) =>
  `<figure class="card" data-i="${i}" tabindex="0">` +
  (p.image ? `<img src="${thumbUrl(p)}" data-full-src="${displayUrl(p)}" data-original-src="${imageUrl(p)}" alt="${p.title}" loading="lazy" decoding="async">` : "") +
  `</figure>`;

// 3) Gallery 页面：分类筛选 + 照片墙 + Lightbox
const gallery = document.getElementById("gallery");
if (gallery) {
  let list = photos;   // 当前分类 / 地区下的照片
  let cur = 0;
  let locationFilter = "";
  let currentCategory = "";
  const filters = document.getElementById("filters");
  const empty = document.getElementById("empty");
  let mapSection = null;
  const ensureMapSection = () => {
    if (mapSection) return;
    mapSection = document.createElement("section");
    mapSection.className = "gallery-map-section";
    mapSection.innerHTML = `<div class="gallery-map-head"><p class="label">PHOTO LOCATIONS</p><span class="gallery-map-note">China</span></div><div class="gallery-map" id="galleryMap">${galleryMapMarkup(list)}</div>`;
    filters.parentElement.insertBefore(mapSection, gallery);
  };
  const renderMap = () => {
    if (!mapSection) return;
    const map = mapEl();
    if (map) map.innerHTML = galleryMapMarkup(list, locationFilter);
    bindMap();
  };
  const render = () => {
    gallery.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    if (currentCategory) {
      ensureMapSection();
      renderMap();
    } else if (mapSection) {
      mapSection.remove();
      mapSection = null;
    }
  };
  filters.innerHTML = ["All", ...categories].map((c, i) =>
    `<button type="button" class="chip${i === 0 ? " active" : ""}" data-cat="${c}">${c}</button>`).join("");
  const applyCategory = (cat) => {
    locationFilter = "";
    currentCategory = cat || "";
    filters.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x.dataset.cat === (cat || "All")));
    list = cat ? photos.filter((p) => p.category === cat) : photos;
    render();
  };
  const applyLocation = (key) => {
    const def = galleryLocationDefs.find(x => x.key === key);
    if (!def) return;
    locationFilter = key;
    filters.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x.dataset.cat === "All"));
    list = photos.filter(def.test);
    render();
    document.getElementById("galleryMap")?.querySelector(`.gallery-map-point[data-location-key="${key}"]`)?.classList.add("active");
    gallery.scrollIntoView({behavior:"smooth", block:"start"});
  };
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    applyCategory(b.dataset.cat === "All" ? "" : b.dataset.cat);
  });
  let mapHideTimer = null;
  const bindMap = () => {
    const map = mapEl(), cardEl = document.getElementById("galleryMapCard");
    if (!map || !cardEl) return;
    const showLocation = (key, anchor) => {
      const def = galleryLocationDefs.find(x => x.key === key);
      if (!def) return;
      const count = galleryMapLocations(list).find(x => x.key === key)?.photos.length || 0;
      const rect = map.getBoundingClientRect(), a = anchor.getBoundingClientRect();
      cardEl.querySelector("#galleryMapName").textContent = def.name;
      cardEl.querySelector("#galleryMapCoord").textContent = galleryMapFmt(def.lat, def.lon);
      cardEl.querySelector("#galleryMapCount").textContent = `${count} ${count === 1 ? "photo" : "photos"}`;
      cardEl.hidden = false;
      const left = Math.min(Math.max(a.left - rect.left + 12, 8), rect.width - cardEl.offsetWidth - 8);
      const top = Math.min(Math.max(a.top - rect.top + 12, 8), rect.height - cardEl.offsetHeight - 8);
      cardEl.style.left = left + "px";
      cardEl.style.top = top + "px";
      cardEl.dataset.locationKey = key;
      map.querySelectorAll(".gallery-map-point").forEach(p => p.classList.toggle("active", p.dataset.locationKey === key));
      clearTimeout(mapHideTimer);
    };
    const scheduleHide = () => { clearTimeout(mapHideTimer); mapHideTimer = setTimeout(() => { if (!cardEl.matches(":hover")) cardEl.hidden = true; }, 120); };
    map.querySelectorAll(".gallery-map-point").forEach(point => {
      point.addEventListener("mouseenter", () => showLocation(point.dataset.locationKey, point));
      point.addEventListener("mouseleave", scheduleHide);
      point.addEventListener("focus", () => showLocation(point.dataset.locationKey, point));
      point.addEventListener("blur", scheduleHide);
      point.addEventListener("click", () => showLocation(point.dataset.locationKey, point));
    });
    cardEl.addEventListener("mouseenter", () => clearTimeout(mapHideTimer));
    cardEl.addEventListener("mouseleave", scheduleHide);
    cardEl.querySelector("#galleryMapBrowse")?.addEventListener("click", () => {
      applyLocation(cardEl.dataset.locationKey);
      cardEl.hidden = true;
    });
  };
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
