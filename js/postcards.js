// ===== Postcrossing 数据 =====
// 现在里面是【示例数据】，之后把它们改成你真实的明信片记录即可。
// 每一条 { ... } 是一张明信片：
//   type   : "sent"（我 → 对方，地图上是蓝线） 或 "received"（对方 → 我，地图上是红线）
//   status : "received" / "sent" / "pending" / "expired"  （表格里的彩色小圆点）
//   code   : 国家的两位字母代码（用来显示国旗，例如 JP、US、DE）
//   lat, lon : 对方所在地点的纬度、经度（在地图上定位用）
//   front, back : 明信片正面 / 背面照片的路径，例如 "images/postcards/jp-front.jpg"；留空会显示灰色占位
//   note   : 可选的一句备注
const HOME = { name: "Nanjing", lat: 32.06, lon: 118.80 };   // 我所在的位置：连接线的起点 / 终点

const postcards = [
  { id: "JP-XXXXX", country: "Japan",       code: "JP", lat: 35.68, lon: 139.69, type: "received", status: "received", date: "2026-09-12", front: "", back: "", note: "" },
  { id: "US-XXXXX", country: "USA",         code: "US", lat: 38.90, lon: -77.04, type: "sent",     status: "sent",     date: "2026-09-08", front: "", back: "", note: "" },
  { id: "DE-XXXXX", country: "Germany",     code: "DE", lat: 52.52, lon: 13.40,  type: "received", status: "received", date: "2026-09-03", front: "", back: "", note: "" },
  { id: "FI-XXXXX", country: "Finland",     code: "FI", lat: 60.17, lon: 24.94,  type: "sent",     status: "pending",  date: "2026-09-20", front: "", back: "", note: "" },
  { id: "NL-XXXXX", country: "Netherlands", code: "NL", lat: 52.37, lon: 4.90,   type: "sent",     status: "expired",  date: "2026-08-15", front: "", back: "", note: "" }
];
