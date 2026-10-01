// ===== Postcrossing 数据 =====
// 数据来自我每次提供的 Postcrossing SENT / RECEIVED 截图。
// 每一条 { ... } 是一张明信片：
//   type       : "sent"（我 → 对方）或 "received"（对方 → 我）
//   status     : "received" / "sent" / "pending" / "expired"
//   code       : 国家的两位字母代码
//   lat, lon   : 国家代表位置，用于世界地图定位（不是对方的具体地址）
//   member     : Postcrossing 对方用户名
//   sentDate   : 明信片寄出日期
//   receivedDate : 明信片收到日期
//
// 不再保存 front / back / note，也不要求上传明信片照片。

const HOME = { name: "Nanjing", lat: 32.06, lon: 118.80 };

const postcards = [
  // ----- SENT -----
  { id: "CN-4058314", member: "poseidon66", country: "Russia", code: "RU", lat: 55.75, lon: 37.62, type: "sent", status: "received", sentDate: "2025-06-22", receivedDate: "2025-09-10" },
  { id: "CN-4058254", member: "wendyquilter", country: "Canada", code: "CA", lat: 45.42, lon: -75.70, type: "sent", status: "received", sentDate: "2025-06-22", receivedDate: "2025-07-24" },
  { id: "CN-4058322", member: "Paol", country: "Italy", code: "IT", lat: 41.90, lon: 12.50, type: "sent", status: "received", sentDate: "2025-06-22", receivedDate: "2025-07-16" },
  { id: "CN-4058287", member: "Moquari", country: "U.S.A.", code: "US", lat: 38.90, lon: -77.04, type: "sent", status: "received", sentDate: "2025-06-22", receivedDate: "2025-07-15" },
  { id: "CN-3179482", member: "hetrickfamily", country: "U.S.A.", code: "US", lat: 38.90, lon: -77.04, type: "sent", status: "received", sentDate: "2021-06-25", receivedDate: "2021-09-02" },
  { id: "CN-3178532", member: "Ejder", country: "Türkiye", code: "TR", lat: 39.93, lon: 32.86, type: "sent", status: "received", sentDate: "2021-06-24", receivedDate: "2021-08-11" },
  { id: "CN-3178553", member: "MrBadger", country: "U.K.", code: "GB", lat: 51.51, lon: -0.13, type: "sent", status: "received", sentDate: "2021-06-24", receivedDate: "2021-07-24" },
  { id: "CN-3178552", member: "Atei", country: "Germany", code: "DE", lat: 52.52, lon: 13.40, type: "sent", status: "received", sentDate: "2021-06-24", receivedDate: "2021-07-16" },
  { id: "CN-3179480", member: "PetraNecas", country: "Czechia", code: "CZ", lat: 50.08, lon: 14.44, type: "sent", status: "received", sentDate: "2021-06-25", receivedDate: "2021-07-16" },
  { id: "CN-3115590", member: "g0ralexis", country: "U.S.A.", code: "US", lat: 38.90, lon: -77.04, type: "sent", status: "received", sentDate: "2021-03-15", receivedDate: "2021-06-08" },
  { id: "CN-3114403", member: "ili_irina", country: "Russia", code: "RU", lat: 55.75, lon: 37.62, type: "sent", status: "received", sentDate: "2021-03-13", receivedDate: "2021-06-05" },
  { id: "CN-3147817", member: "kawaii22", country: "Germany", code: "DE", lat: 52.52, lon: 13.40, type: "sent", status: "received", sentDate: "2021-05-05", receivedDate: "2021-05-20" },
  { id: "CN-3116134", member: "PetiKupil", country: "Czechia", code: "CZ", lat: 50.08, lon: 14.44, type: "sent", status: "received", sentDate: "2021-03-16", receivedDate: "2021-04-13" },
  { id: "CN-3116156", member: "imagna", country: "Italy", code: "IT", lat: 41.90, lon: 12.50, type: "sent", status: "received", sentDate: "2021-03-16", receivedDate: "2021-04-07" },
  { id: "CN-3114163", member: "ingebib", country: "Germany", code: "DE", lat: 52.52, lon: 13.40, type: "sent", status: "received", sentDate: "2021-03-13", receivedDate: "2021-04-03" },

  // ----- RECEIVED -----
  { id: "PL-1777552", member: "mrowkanat", country: "Poland", code: "PL", lat: 52.23, lon: 21.01, type: "received", status: "received", sentDate: "2021-07-17", receivedDate: "2021-10-19" },
  { id: "PH-170613", member: "fel33", country: "Philippines", code: "PH", lat: 14.60, lon: 120.98, type: "received", status: "received", sentDate: "2021-06-24", receivedDate: "2021-09-19" },
  { id: "FR-1413007", member: "account closed", country: "France", code: "FR", lat: 48.86, lon: 2.35, type: "received", status: "received", sentDate: "2021-06-24", receivedDate: "2021-07-10" },
  { id: "TW-3174333", member: "baaciiga", country: "Taiwan", code: "TW", lat: 25.03, lon: 121.56, type: "received", status: "received", sentDate: "2021-06-24", receivedDate: "2021-07-10" },
  { id: "US-7641555", member: "SchneckenTochter", country: "U.S.A.", code: "US", lat: 38.90, lon: -77.04, type: "received", status: "received", sentDate: "2021-06-15", receivedDate: "2021-07-10" },
  { id: "SK-238463", member: "Emili74", country: "Slovakia", code: "SK", lat: 48.15, lon: 17.11, type: "received", status: "received", sentDate: "2021-06-08", receivedDate: "2021-07-07" },
  { id: "FI-3942446", member: "Einkeri", country: "Finland", code: "FI", lat: 60.17, lon: 24.94, type: "received", status: "received", sentDate: "2021-05-13", receivedDate: "2021-06-12" },
  { id: "US-7490758", member: "pip82", country: "U.S.A.", code: "US", lat: 38.90, lon: -77.04, type: "received", status: "received", sentDate: "2021-04-15", receivedDate: "2021-05-13" },
  { id: "DE-10382180", member: "reni27", country: "Germany", code: "DE", lat: 52.52, lon: 13.40, type: "received", status: "received", sentDate: "2021-04-15", receivedDate: "2021-04-28" }
];
