// ===== Postcrossing：互动地图（蓝 = 发送，红 = 接收）+ Hover 预览 + Click 详情 + Records 表格 =====
const NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("worldMap");
const wrap = document.getElementById("mapWrap");
const cardEl = document.getElementById("pcCard");
const modal = document.getElementById("pcModal");
const detail = document.getElementById("pcDetail");
const { w: MW, h: MH, latTop, latBottom } = WORLD_MAP;

const project = (lon, lat) => [(lon + 180) / 360 * MW, (latTop - lat) / (latTop - latBottom) * MH];
const flag = (code) => [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");
const label = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const el = (tag, attrs = {}) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
const dot = (status) => `<span class="dot ${status}"></span>${label(status)}`;
const sw = (type) => `<i class="sw ${type === "sent" ? "sent" : "recv"}"></i>${label(type)}`;
const byDate = (a, b) => (a.date < b.date ? 1 : -1);

// ---- 1) 地图底图 ----
svg.appendChild(el("path", { d: WORLD_MAP.land, class: "land" }));
svg.appendChild(el("path", { d: WORLD_MAP.borders, class: "borders" }));

// ---- 2) 按国家分组 ----
const groups = {};
postcards.forEach((p) => {
  (groups[p.code] = groups[p.code] || { code: p.code, country: p.country, lat: p.lat, lon: p.lon, records: [] }).records.push(p);
});
Object.values(groups).forEach((g) => g.records.sort(byDate));

// ---- 3) 连接线：从我所在地到对方（发送）/ 从对方到我（接收），弧线，跨过日期变更线时从画面边缘穿出再穿入 ----
const home = project(HOME.lon, HOME.lat);
const lines = el("g"); svg.appendChild(lines);
Object.values(groups).forEach((g) => {
  const target = project(g.lon, g.lat);
  const dlon = g.lon - HOME.lon;
  let tx = target[0], shift = 0;
  if (dlon > 180) { tx -= MW; shift = MW; }          // 向西走更近
  else if (dlon < -180) { tx += MW; shift = -MW; }   // 向东走更近
  g.records.forEach((p) => {
    const sent = p.type === "sent";
    const [ax, ay] = sent ? home : [tx, target[1]];
    const [bx, by] = sent ? [tx, target[1]] : home;
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    let nx = dy / len, ny = -dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }              // 弧线总是向上拱
    const k = sent ? 0.2 : 0.34;                     // 同一国家的发送 / 接收两条线拱度不同，避免重叠
    const cx = (ax + bx) / 2 + nx * len * k, cy = (ay + by) / 2 + ny * len * k;
    const d = `M${ax.toFixed(1)} ${ay.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`;
    const attrs = { d, class: "arc " + (sent ? "sent" : "recv") };
    lines.appendChild(el("path", attrs));
    if (shift) { const second = el("path", attrs); second.setAttribute("transform", `translate(${shift} 0)`); lines.appendChild(second); }
  });
});
svg.appendChild(el("circle", { cx: home[0], cy: home[1], r: 3, class: "home" }));

// ---- 4) 地点节点：平时隐藏，Hover 时才显示 ----
const thumb = (src, txt) => (src ? `<img src="${src}" alt="${txt}">` : `<div class="ph">${txt}</div>`);
const nodes = el("g"); svg.appendChild(nodes);
Object.values(groups).forEach((g) => {
  const [x, y] = project(g.lon, g.lat);
  const n = el("g", { class: "node", tabindex: 0, "data-code": g.code, role: "button", "aria-label": g.country });
  n.appendChild(el("circle", { cx: x, cy: y, r: 13, class: "hit" }));
  n.appendChild(el("circle", { cx: x, cy: y, r: 4.5, class: "pin" }));
  nodes.appendChild(n);
});

// ---- 5) Hover 预览小卡片 ----
const showCard = (node) => {
  const g = groups[node.dataset.code], p = g.records[0];
  cardEl.innerHTML =
    `<div class="pc-card-h"><span>${flag(g.code)} ${g.country}</span>${g.records.length > 1 ? `<span class="muted">${g.records.length} cards</span>` : ""}</div>` +
    `<div class="pc-thumbs">${thumb(p.front, "Front")}</div>` +
    `<div class="pc-meta">${sw(p.type)} · ${p.date}</div><div class="pc-id">${p.id}</div>` +
    (g.records.length > 1 ? `<div class="muted small">Click for all records</div>` : "");
  cardEl.hidden = false;
  const wr = wrap.getBoundingClientRect(), nr = node.querySelector(".pin").getBoundingClientRect();
  const cw = cardEl.offsetWidth, ch = cardEl.offsetHeight;
  let left = nr.left + nr.width / 2 - wr.left - cw / 2;
  left = Math.max(8, Math.min(left, wr.width - cw - 8));
  let top = nr.top - wr.top - ch - 12;
  if (top < 8) top = nr.bottom - wr.top + 12;
  cardEl.style.left = left + "px"; cardEl.style.top = top + "px";
};
const hideCard = () => { cardEl.hidden = true; };
nodes.addEventListener("mouseover", (e) => { const n = e.target.closest(".node"); if (n) showCard(n); });
nodes.addEventListener("mouseout", (e) => { if (e.target.closest(".node")) hideCard(); });
nodes.addEventListener("focusin", (e) => { const n = e.target.closest(".node"); if (n) showCard(n); });
nodes.addEventListener("focusout", hideCard);

// ---- 6) Click：完整信息 ----
const openDetail = (code) => {
  const g = groups[code];
  detail.innerHTML = `<h3>${flag(g.code)} ${g.country}</h3>` + g.records.map((p) =>
    `<article class="pc-rec"><div class="pc-rec-h"><span>${sw(p.type)}</span><span>${p.date}</span><span>${p.id}</span><span>${dot(p.status)}</span></div>` +
    `<div class="pc-rec-img">${thumb(p.front, "Front")}</div>` +
    (p.note ? `<p class="muted">${p.note}</p>` : "") + `</article>`).join("");
  modal.hidden = false;
  hideCard();
};
nodes.addEventListener("click", (e) => { const n = e.target.closest(".node"); if (n) openDetail(n.dataset.code); });
nodes.addEventListener("keydown", (e) => { if (e.key === "Enter") { const n = e.target.closest(".node"); if (n) openDetail(n.dataset.code); } });
modal.addEventListener("click", (e) => { if (e.target === modal || e.target.matches(".pc-close")) modal.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.hidden = true; });

// ---- 7) Records 表格 ----
document.getElementById("recordsBody").innerHTML = [...postcards].sort(byDate).map((p) =>
  `<tr data-code="${p.code}"><td>${p.date}</td><td>${flag(p.code)} ${p.country}</td><td>${label(p.type)}</td><td>${p.id}</td><td>${dot(p.status)}</td></tr>`).join("");


// ---- 8) Hover Records：鼠标移到表格行时，地图上的对应地点同步放大 ----
const rows = document.querySelectorAll("#recordsBody tr");
const setActive = (code, active) => {
  const node = nodes.querySelector(`.node[data-code="${code}"]`);
  if (node) node.classList.toggle("active", active);
};
rows.forEach((row) => {
  row.addEventListener("mouseenter", () => setActive(row.dataset.code, true));
  row.addEventListener("mouseleave", () => setActive(row.dataset.code, false));
  row.addEventListener("focusin", () => setActive(row.dataset.code, true));
  row.addEventListener("focusout", () => setActive(row.dataset.code, false));
});
