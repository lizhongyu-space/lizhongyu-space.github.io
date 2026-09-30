// ===== 照片数据 =====
// 以后加照片：把图片放进 images/photos/，然后复制下面任意一行 { ... }，改成新照片的信息。
// ratio 是照片的宽高比（横图 "4/3"，竖图 "3/4"，方图 "1/1"）。image 留空时显示灰色占位块。
// category 是这张照片所属的分类，必须写成下面 categories 里的某一个名字。
const categories = ["Nature", "City", "Travel", "Daily", "Other"];   // 分类名称以后可以随意改；"All" 会自动出现在最前面
const photos = [
  { id: 1, image: "", ratio: "3/4", category: "Nature", title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 2, image: "", ratio: "4/3", category: "City",   title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 3, image: "", ratio: "1/1", category: "Travel", title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 4, image: "", ratio: "2/3", category: "Nature", title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 5, image: "", ratio: "4/3", category: "Daily",  title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 6, image: "", ratio: "3/4", category: "City",   title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 7, image: "", ratio: "1/1", category: "Travel", title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" },
  { id: 8, image: "", ratio: "4/5", category: "Other",  title: "PHOTO TITLE", location: "LOCATION", date: "DATE", sender: "SENDER", description: "DESCRIPTION" }
];
