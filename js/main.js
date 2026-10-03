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
// Gallery 只加载小型 WebP 缩略图；点击照片只展示元数据，不加载大图。
const thumbUrl = (p) => {
  if (!p.image) return "";
  const path = p.image.replace(/^gallery\//, "gallery-thumbs/");
  return encodeURI(path.replace(/\.[^.]+$/, ".webp"));
};
const card = (p, i) =>
  `<figure class="card" data-i="${i}" tabindex="0">` +
  (p.image ? `<img src="${thumbUrl(p)}" alt="${p.title}" loading="lazy" decoding="async">` : "") +
  `</figure>`;

// 3) Gallery 页面：分类筛选 + 照片墙 + Lightbox
const gallery = document.getElementById("gallery");
if (gallery) {
  let list = photos;
  let cur = 0;
  const filters = document.getElementById("filters");
  const empty = document.getElementById("empty");

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[ch]));

  // 公开页面只展示城市/地区级参考坐标，不输出照片原始 GPS 精确位置。
  const photoCoordinateRefs = (p) => {
    const loc = p.location || "";
    const cat = p.category || "";
    if (loc.includes("泰安市与济南市")) return [
      { name:"泰安市", lat:36.1949, lon:117.1291 },
      { name:"济南市", lat:36.6512, lon:117.1201 }
    ];
    if (loc.includes("澳门")) return [{ name:"澳门特别行政区", lat:22.1987, lon:113.5439 }];
    if (loc.includes("香港")) return [{ name:"香港", lat:22.3193, lon:114.1694 }];
    if (loc.includes("北京") || cat === "北京") return [{ name:"北京市", lat:39.9042, lon:116.4074 }];
    if (loc.includes("上海") || cat === "上海") return [{ name:"上海市", lat:31.2304, lon:121.4737 }];
    if (loc.includes("南京") || cat === "南京" || cat === "我的学校") return [{ name:"南京市", lat:32.0603, lon:118.7969 }];
    if (loc.includes("天津") || cat === "天津研学") return [{ name:"天津市", lat:39.3434, lon:117.3616 }];
    if (loc.includes("杭州") || cat === "太子尖") return [{ name:cat === "太子尖" ? "太子尖周边" : "杭州市", lat:30.2741, lon:120.1551 }];
    if (loc.includes("威海") || cat === "威海") return [{ name:"威海市", lat:37.5131, lon:122.1204 }];
    if (loc.includes("泰安") || cat === "泰山" || cat === "山东") return [{ name:"泰安市", lat:36.1949, lon:117.1291 }];
    if (loc.includes("济南")) return [{ name:"济南市", lat:36.6512, lon:117.1201 }];
    if (loc.includes("连云港") || cat === "连云港") return [{ name:"连云港市", lat:34.5967, lon:119.2229 }];
    return [];
  };
  const formatCoordinate = ({lat,lon}) =>
    `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
  const photoDescription = (p) => {
    const en = document.documentElement.lang !== "zh-CN";
    const fileName = (p.image || "").split("/").pop() || p.title || (en ? "Not recorded" : "未记录");
    const fileFormat = fileName.includes(".") ? fileName.split(".").pop().toUpperCase() : (en ? "Not recorded" : "未记录");
    const refs = photoCoordinateRefs(p);
    const coordinateHtml = refs.length
      ? refs.map(ref => {
          const lat = ref.lat.toFixed(4);
          const lon = ref.lon.toFixed(4);
          const query = `${lat},${lon}`;
          const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
          const appleUrl = `https://maps.apple.com/?ll=${encodeURIComponent(query)}&q=${encodeURIComponent(ref.name)}`;
          const bingUrl = `https://www.bing.com/maps?cp=${encodeURIComponent(`${lat}~${lon}`)}&lvl=12`;
          const names = {
            "泰安市": en ? "Tai'an" : "泰安市", "济南市": en ? "Jinan" : "济南市",
            "澳门特别行政区": en ? "Macao SAR" : "澳门特别行政区", "香港": en ? "Hong Kong" : "香港",
            "北京市": en ? "Beijing" : "北京市", "上海市": en ? "Shanghai" : "上海市",
            "南京市": en ? "Nanjing" : "南京市", "天津市": en ? "Tianjin" : "天津市",
            "太子尖周边": en ? "Taizijian area" : "太子尖周边", "杭州市": en ? "Hangzhou" : "杭州市",
            "威海市": en ? "Weihai" : "威海市", "连云港市": en ? "Lianyungang" : "连云港市"
          };
          const displayName = names[ref.name] || ref.name;
          const prompt = en ? "View these coordinates on a map?" : "要在地图中查看此坐标？";
          return `<span class="coordinate-map-group">
            <span class="coordinate-map-value" tabindex="0" aria-label="${en ? "View " + escapeHtml(displayName) + " on a map: " + escapeHtml(formatCoordinate(ref)) : "查看" + escapeHtml(displayName) + "地图：" + escapeHtml(formatCoordinate(ref))}">${escapeHtml(displayName)}：${escapeHtml(formatCoordinate(ref))}</span>
            <span class="coordinate-map-menu" role="group" aria-label="${en ? "Choose a map service" : "选择地图网站"}">
              <span>${prompt}</span>
              <a href="${googleUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a>
              <a href="${appleUrl}" target="_blank" rel="noopener noreferrer">Apple Maps</a>
              <a href="${bingUrl}" target="_blank" rel="noopener noreferrer">Microsoft Maps</a>
            </span>
          </span>`;
        }).join(en ? "; " : "；")
      : (en ? "No confirmed regional reference coordinates recorded" : "未记录可确认的地区参考坐标");
    const captured = p.capturedAt
      ? p.capturedAt.replace("T", " ").replace(/[+-]\d{2}:\d{2}$/, "")
      : (p.date || (en ? "Not recorded" : "未记录"));
    const location = p.location || (en ? "Location not recorded" : "未记录地点");
    const labels = en
      ? ["Location", "Reference coordinates", "Date taken", "Original filename", "File format"]
      : ["拍摄地点", "位置参考坐标", "拍摄时间", "原始文件名", "文件格式"];
    const note = en
      ? "Coordinates are city/region-level reference locations, not the photo's exact original GPS. The original XMP file has been removed."
      : "坐标为城市/地区级参考位置，并非照片原始准确GPS。原始 XMP 文件已移除";
    return `<div class="photo-metadata">
      <p><span>${labels[0]}</span><strong>${escapeHtml(location)}</strong></p>
      <p><span>${labels[1]}</span><strong class="coordinate-map-list">${coordinateHtml}</strong></p>
      <p><span>${labels[2]}</span><strong>${escapeHtml(captured)}</strong></p>
      <p><span>${labels[3]}</span><strong>${escapeHtml(fileName)}</strong></p>
      <p><span>${labels[4]}</span><strong>${escapeHtml(fileFormat)}</strong></p>
      <p class="photo-metadata-note">${note}</p>
    </div>`;
  };

  const categoryNames = {
    "All": ["All", "全部"], "自然": ["Nature", "自然"], "城市": ["City", "城市"],
    "旅行": ["Travel", "旅行"], "日常": ["Daily", "日常"], "其他": ["Other", "其他"],
    "上海": ["Shanghai", "上海"], "北京": ["Beijing", "北京"], "南京": ["Nanjing", "南京"],
    "天津研学": ["Tianjin Study Trip", "天津研学"], "太子尖": ["Taizijian", "太子尖"],
    "威海": ["Weihai", "威海"], "山东": ["Shandong", "山东"], "泰山": ["Mount Tai", "泰山"],
    "我的学校": ["My School", "我的学校"], "连云港": ["Lianyungang", "连云港"],
    "香港": ["Hong Kong", "香港"]
  };
  const renderFilters = () => {
    const en = document.documentElement.lang !== "zh-CN";
    filters.innerHTML = ["All", ...categories].map((c, i) => {
      const pair = categoryNames[c] || [c, c];
      const label = en ? pair[0] : pair[1];
      return `<button type="button" class="chip${i === 0 ? " active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(label)}</button>`;
    }).join("");
  };
  renderFilters();

  const render = () => {
    gallery.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
  };
  const applyCategory = (cat) => {
    list = cat ? photos.filter(p => p.category === cat) : photos;
    filters.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x.dataset.cat === (cat || "All")));
    render();
  };
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    applyCategory(b.dataset.cat === "All" ? "" : b.dataset.cat);
  });
  render();
  window.addEventListener("site-language-change", renderFilters);

  const lb = document.getElementById("lightbox");
  const show = (i) => {
    if (!list.length) return;
    cur = (i + list.length) % list.length;
    const p = list[cur];
    const isEnglish = document.documentElement.lang !== "zh-CN";
    const intro = isEnglish ? (p.descriptionEn || p.description || "A brief description of this photo.") : (p.description || p.descriptionEn || "这张照片的简短说明。");
    const originalPath = p.image || "";
    const originalName = originalPath.split("/").pop() || p.title || "photo";
    const downloadLabel = isEnglish ? "Download original" : "下载原图";
    const downloadControl = originalPath
      ? `<a class="photo-download" href="${encodeURI(originalPath)}" download="${escapeHtml(originalName)}" aria-label="${downloadLabel}" title="${downloadLabel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg><span>${downloadLabel}</span></a>`
      : "";
    lb.querySelector(".lb-info").innerHTML =
      `${downloadControl}<h3>${escapeHtml(p.location || (isEnglish ? "Location not recorded" : "未记录地点"))}</h3><p>${escapeHtml(p.date || (isEnglish ? "Date not specified" : "未记录"))}</p><p class="small">${escapeHtml(p.title || "")}</p><p class="photo-intro">${escapeHtml(intro)}</p>${photoDescription(p)}`;
    lb.hidden = false;
  };
  const open = (e) => {
    const c = e.target.closest(".card");
    if (c) show(+c.dataset.i);
  };
  gallery.addEventListener("click", open);
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "Enter") open(e);
  });
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
  let x0 = 0;
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
