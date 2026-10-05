// ===== Global View：与 Gallery 共用同一套照片浏览体验 =====
(() => {
  const intro = document.getElementById("gvIntro");
  const win = document.getElementById("gvWin");
  const choice = document.getElementById("gvChoice");
  const view = document.getElementById("gvView");
  const groupsEl = document.getElementById("gvGroups");
  const label = document.getElementById("gvLabel");
  const lb = document.getElementById("lightbox");
  let flat = [];
  let cur = 0;
  let currentMode = null;

  const closeIntro = () => {
    if (intro.hidden) return;
    intro.hidden = true;
    if (view.hidden) choice.hidden = false;
  };
  document.getElementById("gvClose").addEventListener("click", closeIntro);
  document.getElementById("gvZoom").addEventListener("click", () => {
    const z = win.classList.toggle("zoomed");
    const b = document.getElementById("gvZoom");
    b.textContent = z ? "−" : "+";
    b.setAttribute("aria-label", z ? "Restore" : "Enlarge");
  });
  intro.addEventListener("click", e => { if (e.target === intro) closeIntro(); });

  const flag = code => [...code.toUpperCase()].map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[ch]));

  // Global View 保留自己的国家小地图；照片详情则完全采用 Gallery 的信息结构。
  document.body.insertAdjacentHTML("beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><g id="gvWorld"><path class="land" d="${WORLD_MAP.land}"/><path class="borders" d="${WORLD_MAP.borders}"/></g></defs></svg>`
  );

  const fmt = (lat, lon) =>
    `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;

  const miniMap = loc => {
    const { w: MW, h: MH, latTop, latBottom } = WORLD_MAP;
    const px = (loc.lon + 180) / 360 * MW;
    const py = (latTop - loc.lat) / (latTop - latBottom) * MH;
    const vw = 300, vh = 200;
    const vx = Math.max(0, Math.min(px - vw / 2, MW - vw));
    const vy = Math.max(0, Math.min(py - vh / 2, MH - vh));
    return `<aside class="gv-map"><div class="gv-coord">${fmt(loc.lat, loc.lon)}</div>
      <svg viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw} ${vh}" role="img" aria-label="Map location">
        <use href="#gvWorld"/>
        <line class="gv-cross" x1="${vx}" x2="${vx + vw}" y1="${py}" y2="${py}"/>
        <line class="gv-cross" x1="${px}" x2="${px}" y1="${vy}" y2="${vy + vh}"/>
        <circle class="gv-ring" cx="${px}" cy="${py}" r="8"/>
        <circle class="gv-pin" cx="${px}" cy="${py}" r="3"/>
      </svg>
    </aside>`;
  };

  const coordinateBlock = p => {
    const en = document.documentElement.lang !== "zh-CN";
    const lat = Number.isFinite(Number(p.lat)) ? Number(p.lat) : null;
    const lon = Number.isFinite(Number(p.lon)) ? Number(p.lon) : null;
    if (lat === null || lon === null) {
      return en ? "No confirmed regional reference coordinates recorded" : "未记录可确认的地区参考坐标";
    }
    const coord = fmt(lat, lon);
    const name = en ? (p.place || p.placeZh || "Location") : (p.placeZh || p.place || "地点");
    const query = encodeURIComponent(`${lat.toFixed(4)},${lon.toFixed(4)}`);
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    const appleUrl = `https://maps.apple.com/?ll=${query}&q=${encodeURIComponent(name)}`;
    const bingUrl = `https://www.bing.com/maps?cp=${encodeURIComponent(`${lat.toFixed(4)}~${lon.toFixed(4)}`)}&lvl=12`;
    const prompt = en ? "View these coordinates on a map?" : "要在地图中查看此坐标？";
    const aria = en ? `View ${escapeHtml(name)} on a map: ${coord}` : `查看${escapeHtml(name)}地图：${coord}`;
    return `<span class="coordinate-map-group">
      <span class="coordinate-map-value" tabindex="0" aria-label="${aria}">${escapeHtml(name)}：${coord}</span>
      <span class="coordinate-map-menu" role="group" aria-label="${en ? "Choose a map service" : "选择地图网站"}">
        <span>${prompt}</span>
        <a href="${googleUrl}" target="_blank" rel="noopener noreferrer">Google Maps</a>
        <a href="${appleUrl}" target="_blank" rel="noopener noreferrer">Apple Maps</a>
        <a href="${bingUrl}" target="_blank" rel="noopener noreferrer">Microsoft Maps</a>
      </span>
    </span>`;
  };

  const photoDescription = p => {
    const en = document.documentElement.lang !== "zh-CN";
    const fileName = (p.image || "").split("/").pop() || (en ? "Not recorded" : "未记录");
    const fileFormat = fileName.includes(".") ? fileName.split(".").pop().toUpperCase() : (en ? "Not recorded" : "未记录");
    const location = en ? (p.place || p.placeZh || "Location not recorded") : (p.placeZh || p.place || "未记录地点");
    const captured = p.date || (en ? "Not recorded" : "未记录");
    const labels = en
      ? ["Location", "Reference coordinates", "Date taken", "Original filename", "File format"]
      : ["拍摄地点", "位置参考坐标", "拍摄时间", "原始文件名", "文件格式"];
    const note = en
      ? "Coordinates are city/region-level reference locations, not the photo's exact original GPS. The original XMP file has been removed."
      : "坐标为城市/地区级参考位置，并非照片原始准确GPS。原始 XMP 文件已移除。";
    return `<div class="photo-metadata">
      <p><span>${labels[0]}</span><strong>${escapeHtml(location)}</strong></p>
      <p><span>${labels[1]}</span><strong class="coordinate-map-list">${coordinateBlock(p)}</strong></p>
      <p><span>${labels[2]}</span><strong>${escapeHtml(captured)}</strong></p>
      <p><span>${labels[3]}</span><strong>${escapeHtml(fileName)}</strong></p>
      <p><span>${labels[4]}</span><strong>${escapeHtml(fileFormat)}</strong></p>
      <p class="photo-metadata-note">${note}</p>
    </div>`;
  };

  const render = mode => {
    const en = document.documentElement.lang !== "zh-CN";
    const byCountry = mode === "country";
    const groups = new Map();

    globalPhotos.forEach(p => {
      const key = byCountry ? p.country : p.person;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    });

    flat = [];
    label.textContent = en
      ? "GLOBAL VIEW · " + (byCountry ? "BY COUNTRY" : "BY PERSON")
      : "全球视野 · " + (byCountry ? "按国家" : "按人物");

    groupsEl.innerHTML = [...groups].map(([name, list]) => {
      const head = byCountry
        ? `${flag(list[0].code)} ${en ? name : (list[0].countryZh || name)}`
        : escapeHtml(name);

      const cards = list.map(p => {
        const displayPlace = en ? (p.place || p.placeZh || "") : (p.placeZh || p.place || "");
        const i = flat.push(p) - 1;
        const placeholder = en ? "No photo yet — looking forward to yours." : "暂时没有，期待你的上传";
        const thumbPath = p.thumbnail || p.image || "";
        const imageContent = p.image
          ? `<img src="${encodeURI(thumbPath)}" data-original-src="${encodeURI(p.image)}" alt="${escapeHtml(displayPlace)}" loading="lazy" decoding="async">`
          : `<div class="gv-photo-placeholder" role="img" aria-label="${placeholder}"><span>${placeholder}</span></div>`;
        return `<figure class="card gv-card" data-i="${i}" tabindex="0" style="aspect-ratio:${p.ratio || "4/3"}">${imageContent}<figcaption>${escapeHtml(displayPlace)}</figcaption></figure>`;
      }).join("");

      const loc = byCountry ? countryLocations[name] : null;
      return `<div class="gv-group"><h2>${head} <span class="muted small">${list.length}</span></h2>
        <div class="gv-row${loc ? " has-map" : ""}"><div class="masonry">${cards}</div>${loc ? miniMap(loc) : ""}</div></div>`;
    }).join("");

    choice.hidden = true;
    view.hidden = false;
    window.scrollTo(0, 0);
  };

  choice.addEventListener("click", e => {
    const b = e.target.closest(".gv-big");
    if (b) {
      currentMode = b.dataset.mode;
      render(currentMode);
    }
  });

  window.addEventListener("site-language-change", () => {
    if (currentMode) render(currentMode);
  });

  document.getElementById("gvBack").addEventListener("click", () => {
    view.hidden = true;
    choice.hidden = false;
    lb.hidden = true;
  });

  const show = i => {
    if (!flat.length) return;
    cur = (i + flat.length) % flat.length;
    const p = flat[cur];
    const en = document.documentElement.lang !== "zh-CN";
    const introText = en
      ? (p.note || p.noteZh || "A brief description of this photo.")
      : (p.noteZh || p.note || "这张照片的简短说明。");
    const originalPath = p.image || "";
    const originalExt = (originalPath.split(".").pop() || "jpg").split("?")[0];
    const downloadBase = (en ? (p.place || p.placeZh || p.country || "photo") : (p.placeZh || p.place || "照片")) + "-" + (p.date || (en ? "undated" : "未记录时间"));
    const originalName = downloadBase.replace(/[\\/:*?"<>|]+/g, "-") + "." + originalExt;
    const downloadLabel = en ? "Download original" : "下载原图";
    const downloadControl = originalPath
      ? `<a class="photo-download" href="${encodeURI(originalPath)}" download="${escapeHtml(originalName)}" aria-label="${downloadLabel}" title="${downloadLabel}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg><span>${downloadLabel}</span></a>`
      : "";

    const place = en ? (p.place || p.placeZh || "Location not recorded") : (p.placeZh || p.place || "未记录地点");
    const country = en ? (p.country || "") : (p.countryZh || p.country || "");
    // Detail view intentionally does not load any image. The original is requested only by Download.

    lb.querySelector(".lb-info").innerHTML =
      `${downloadControl}<h3>${escapeHtml(place)}${country ? ", " + escapeHtml(country) : ""}</h3>
      <p>${escapeHtml(p.date || (en ? "Date not specified" : "未记录"))}</p>
      <p class="small">${escapeHtml(p.person || "")}</p>
      <p class="photo-intro">${escapeHtml(introText)}</p>
      ${photoDescription(p)}`;
    lb.hidden = false;
  };

  const open = e => {
    const c = e.target.closest(".gv-card");
    if (c) show(+c.dataset.i);
  };

  groupsEl.addEventListener("click", open);
  groupsEl.addEventListener("keydown", e => {
    if (e.key === "Enter") open(e);
  });

  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.matches(".lb-close")) lb.hidden = true;
    if (e.target.matches(".lb-prev")) show(cur - 1);
    if (e.target.matches(".lb-next")) show(cur + 1);
  });

  document.addEventListener("keydown", e => {
    if (!intro.hidden) {
      if (e.key === "Escape") closeIntro();
      return;
    }
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  let x0 = 0;
  lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; });
  lb.addEventListener("touchend", e => {
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1));
  });
})();