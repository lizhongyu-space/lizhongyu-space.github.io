// ===== Global View 照片数据 =====
// 现在的照片是【占位符】。以后换成真实照片：
//   1. 把图片放进 images/global/ 文件夹（需要自己新建这个文件夹）
//   2. 把下面某一条的 image 改成图片路径，例如 image: "images/global/tokyo-01.jpg"
//   3. 把 country（国家）、code（国家两位字母代码，用来显示国旗）、person（人名）、place（地点）、date（时间）、note（说明）改成真实信息
// ratio 是照片宽高比（横图 "4/3"，竖图 "3/4"，方图 "1/1"），image 留空时显示灰色占位块。
// 想新增一张照片：复制下面任意一行 { ... }, 粘贴在末尾，再修改里面的内容。
const globalPhotos = [
  { id: 9, image: "global_view_photo/china/pipi/拉普兰_20261004_014 拷贝.jpg", ratio: "4/3", country: "China", code: "CN", person: "pipi", place: "Qixia Mountain", placeZh: "栖霞山", date: "2026-10-04", note: "Photographed at Qixia Mountain on October 4, 2026.", noteZh: "拍摄于2026年10月4日，栖霞山。" },
  { id: 10, image: "global_view_photo/china/pipi/拉普兰_20261004_016 拷贝.jpg", ratio: "4/3", country: "China", code: "CN", person: "pipi", place: "Qixia Mountain", placeZh: "栖霞山", date: "2026-10-04", note: "Photographed at Qixia Mountain on October 4, 2026.", noteZh: "拍摄于2026年10月4日，栖霞山。" },
  { id: 1, image: "", ratio: "3/4", country: "Japan",   code: "JP", person: "Person A", place: "Tokyo",     date: "2026-09-12", note: "Short description of this photo." },
  { id: 2, image: "", ratio: "4/3", country: "Japan",   code: "JP", person: "Person B", place: "Kyoto",     date: "2026-09-14", note: "Short description of this photo." },
  { id: 3, image: "", ratio: "1/1", country: "Germany", code: "DE", person: "Person A", place: "Berlin",    date: "2026-08-30", note: "Short description of this photo." },
  { id: 4, image: "", ratio: "4/3", country: "Germany", code: "DE", person: "Person C", place: "Munich",    date: "2026-08-31", note: "Short description of this photo." },
  { id: 5, image: "", ratio: "3/4", country: "USA",     code: "US", person: "Person B", place: "New York",  date: "2026-09-02", note: "Short description of this photo." },
  { id: 6, image: "", ratio: "4/3", country: "Finland", code: "FI", person: "Person C", place: "Helsinki",  date: "2026-09-05", note: "Short description of this photo." },
  { id: 7, image: "", ratio: "1/1", country: "France",  code: "FR", person: "Person A", place: "Paris",     date: "2026-09-08", note: "Short description of this photo." },
  { id: 8, image: "", ratio: "3/4", country: "France",  code: "FR", person: "Person B", place: "Lyon",      date: "2026-09-09", note: "Short description of this photo." }
];

// ===== 各个国家在地图上的位置（用首都的经纬度代表这个国家）=====
// 格式：国家名: { lat: 纬度, lon: 经度 }。北纬 / 东经用正数，南纬 / 西经用负数。
// 国家名必须和上面照片数据里的 country 写得一模一样。新增一个国家的照片时，也要在这里补一行，否则该国家旁边不会显示地图。
const countryLocations = {
  "Japan":   { lat: 35.68, lon: 139.69 },   // 东京
  "Germany": { lat: 52.52, lon: 13.40 },    // 柏林
  "USA":     { lat: 38.90, lon: -77.04 },   // 华盛顿
  "Finland": { lat: 60.17, lon: 24.94 },    // 赫尔辛基
  "France":  { lat: 48.86, lon: 2.35 },      // 巴黎
  "China":   { lat: 39.90, lon: 116.40 }       // 北京
};