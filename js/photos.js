// Gallery photo manifest — metadata extracted from XMP sidecars before migration.
// Folder structure: /gallery/<category>/<YYYY-MM-DD>/<photo>
// Capture timestamps are stored here so XMP sidecars are no longer required by the site.
const categories = ["上海","北京","南京","天津研学","太子尖","威海","山东","我的学校","泰山","连云港","香港"];
const photos = [
  {
    "id": 1,
    "image": "gallery/上海/2025-08-03/IMG_1581.HEIC",
    "title": "IMG_1581",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月03日",
    "capturedAt": "2025-08-03T20:34:41+08:00"
  },
  {
    "id": 2,
    "image": "gallery/上海/2025-08-03/IMG_1585.HEIC",
    "title": "IMG_1585",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月03日",
    "capturedAt": "2025-08-03T21:24:47+08:00"
  },
  {
    "id": 3,
    "image": "gallery/上海/2025-08-03/IMG_1590.HEIC",
    "title": "IMG_1590",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月03日",
    "capturedAt": "2025-08-03T21:28:50+08:00"
  },
  {
    "id": 4,
    "image": "gallery/上海/2025-08-03/IMG_1595.HEIC",
    "title": "IMG_1595",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月03日",
    "capturedAt": "2025-08-03T21:33:29+08:00"
  },
  {
    "id": 5,
    "image": "gallery/上海/2025-08-03/IMG_1597.HEIC",
    "title": "IMG_1597",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月03日",
    "capturedAt": "2025-08-03T21:35:45+08:00"
  },
  {
    "id": 6,
    "image": "gallery/上海/2025-08-04/IMG_1625.HEIC",
    "title": "IMG_1625",
    "category": "上海",
    "location": "上海市",
    "date": "2025年08月04日",
    "capturedAt": "2025-08-04T10:33:52+08:00"
  },
  {
    "id": 7,
    "image": "gallery/北京/2024-07-27/IMG_20240727_152104.jpg",
    "title": "IMG_20240727_152104",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月27日",
    "capturedAt": "2024-07-27T15:21:05+08:00"
  },
  {
    "id": 8,
    "image": "gallery/北京/2024-07-27/IMG_20240727_153512.jpg",
    "title": "IMG_20240727_153512",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月27日",
    "capturedAt": "2024-07-27T15:35:13+08:00"
  },
  {
    "id": 9,
    "image": "gallery/北京/2024-07-27/IMG_20240727_162714.jpg",
    "title": "IMG_20240727_162714",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月27日",
    "capturedAt": "2024-07-27T16:27:15+08:00"
  },
  {
    "id": 10,
    "image": "gallery/北京/2024-07-27/IMG_20240727_163036.jpg",
    "title": "IMG_20240727_163036",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月27日",
    "capturedAt": "2024-07-27T16:30:36+08:00"
  },
  {
    "id": 11,
    "image": "gallery/北京/2024-07-28/IMG_20240728_115113.jpg",
    "title": "IMG_20240728_115113",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月28日",
    "capturedAt": "2024-07-28T11:51:13+08:00"
  },
  {
    "id": 12,
    "image": "gallery/北京/2024-07-28/IMG_20240728_135416.jpg",
    "title": "IMG_20240728_135416",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月28日",
    "capturedAt": "2024-07-28T13:54:17+08:00"
  },
  {
    "id": 13,
    "image": "gallery/北京/2024-07-28/IMG_20240728_135654.jpg",
    "title": "IMG_20240728_135654",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月28日",
    "capturedAt": "2024-07-28T13:56:54+08:00"
  },
  {
    "id": 14,
    "image": "gallery/北京/2024-07-29/IMG_20240729_051307.jpg",
    "title": "IMG_20240729_051307",
    "category": "北京",
    "location": "北京市",
    "date": "2024年07月29日",
    "capturedAt": "2024-07-29T05:13:07+08:00"
  },
  {
    "id": 15,
    "image": "gallery/南京/2026-03-02/dji_mimo_20260302_214518_20260302214518_1772462632196_photo.jpg",
    "title": "dji_mimo_20260302_214518_20260302214518_1772462632196_photo",
    "category": "南京",
    "location": "南京",
    "date": "2026年03月02日",
    "capturedAt": "2026-03-02T21:45:18+08:00"
  },
  {
    "id": 16,
    "image": "gallery/南京/2025-06-25/IMG_1478.HEIC",
    "title": "IMG_1478",
    "category": "南京",
    "location": "南京市",
    "date": "2025年06月25日",
    "capturedAt": "2025-06-25T08:59:52+08:00"
  },
  {
    "id": 17,
    "image": "gallery/南京/2025-06-25/IMG_1481.HEIC",
    "title": "IMG_1481",
    "category": "南京",
    "location": "南京市",
    "date": "2025年06月25日",
    "capturedAt": "2025-06-25T10:43:04+08:00"
  },
  {
    "id": 18,
    "image": "gallery/南京/2026-03-03/dji_mimo_20260303_195800_20260303195800_1772545593447_photo.jpg",
    "title": "dji_mimo_20260303_195800_20260303195800_1772545593447_photo",
    "category": "南京",
    "location": "南京市",
    "date": "2026年03月03日",
    "capturedAt": "2026-03-03T19:58:00+08:00"
  },
  {
    "id": 19,
    "image": "gallery/南京/2026-03-03/dji_mimo_20260303_202428_20260303202428_1772545592020_photo.jpg",
    "title": "dji_mimo_20260303_202428_20260303202428_1772545592020_photo",
    "category": "南京",
    "location": "南京市",
    "date": "2026年03月03日",
    "capturedAt": "2026-03-03T20:24:28+08:00"
  },
  {
    "id": 20,
    "image": "gallery/南京/2026-03-03/dji_mimo_20260303_203656_20260303203657_1772545591004_photo.jpg",
    "title": "dji_mimo_20260303_203656_20260303203657_1772545591004_photo",
    "category": "南京",
    "location": "南京市",
    "date": "2026年03月03日",
    "capturedAt": "2026-03-03T20:36:56+08:00"
  },
  {
    "id": 21,
    "image": "gallery/南京/2026-07-02/DJI_20260702_205533_Edit_Composited_Photo.jpg",
    "title": "DJI_20260702_205533_Edit_Composited_Photo",
    "category": "南京",
    "location": "南京市",
    "date": "2026年07月02日",
    "capturedAt": "2026-07-02T20:55:33+08:00"
  },
  {
    "id": 22,
    "image": "gallery/南京/2026-07-02/DJI_20260702_205647_Edit_Composited_Photo.jpg",
    "title": "DJI_20260702_205647_Edit_Composited_Photo",
    "category": "南京",
    "location": "南京市",
    "date": "2026年07月02日",
    "capturedAt": "2026-07-02T20:56:47+08:00"
  },
  {
    "id": 23,
    "image": "gallery/天津研学/2026-06-08/IMG_1836.JPG",
    "title": "IMG_1836",
    "category": "天津研学",
    "location": "天津研学",
    "date": "2026年06月08日",
    "capturedAt": "2026-06-08T14:55:48+08:00"
  },
  {
    "id": 24,
    "image": "gallery/天津研学/2026-06-08/IMG_1837.JPG",
    "title": "IMG_1837",
    "category": "天津研学",
    "location": "天津研学",
    "date": "2026年06月08日",
    "capturedAt": "2026-06-08T14:55:53+08:00"
  },
  {
    "id": 25,
    "image": "gallery/天津研学/2026-06-08/IMG_1838.JPG",
    "title": "IMG_1838",
    "category": "天津研学",
    "location": "天津研学",
    "date": "2026年06月08日",
    "capturedAt": "2026-06-08T14:55:56+08:00"
  },
  {
    "id": 26,
    "image": "gallery/天津研学/2026-06-07/dji_export_20260607_photo_0009.JPG",
    "title": "dji_export_20260607_photo_0009",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月07日",
    "capturedAt": "2026-06-07T20:17:02+08:00"
  },
  {
    "id": 27,
    "image": "gallery/天津研学/2026-06-07/dji_export_20260607_photo_0010.JPG",
    "title": "dji_export_20260607_photo_0010",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月07日",
    "capturedAt": "2026-06-07T21:04:56+08:00"
  },
  {
    "id": 28,
    "image": "gallery/天津研学/2026-06-07/dji_export_20260607_photo_0027.JPG",
    "title": "dji_export_20260607_photo_0027",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月07日",
    "capturedAt": "2026-06-07T21:59:05+08:00"
  },
  {
    "id": 29,
    "image": "gallery/天津研学/2026-06-07/dji_export_20260607_photo_0028.JPG",
    "title": "dji_export_20260607_photo_0028",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月07日",
    "capturedAt": "2026-06-07T21:59:41+08:00"
  },
  {
    "id": 30,
    "image": "gallery/天津研学/2026-06-07/dji_export_20260607_photo_0029.JPG",
    "title": "dji_export_20260607_photo_0029",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月07日",
    "capturedAt": "2026-06-07T22:00:15+08:00"
  },
  {
    "id": 31,
    "image": "gallery/天津研学/2026-06-08/DJI_20260608_120340_Edit_Composited_Photo.jpg",
    "title": "DJI_20260608_120340_Edit_Composited_Photo",
    "category": "天津研学",
    "location": "天津市",
    "date": "2026年06月08日",
    "capturedAt": "2026-06-08T12:03:41+08:00"
  },
  {
    "id": 32,
    "image": "gallery/太子尖/2026-08-02/DJI_20260802_064448_Edit_Composited_Photo.jpg",
    "title": "DJI_20260802_064448_Edit_Composited_Photo",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T06:44:48+08:00"
  },
  {
    "id": 33,
    "image": "gallery/太子尖/2026-08-02/DJI_20260802_064540_Edit_Composited_Photo.jpg",
    "title": "DJI_20260802_064540_Edit_Composited_Photo",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T06:45:40+08:00"
  },
  {
    "id": 34,
    "image": "gallery/太子尖/2026-08-02/DJI_20260802_064606_Edit_Composited_Photo.jpg",
    "title": "DJI_20260802_064606_Edit_Composited_Photo",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T06:46:06+08:00"
  },
  {
    "id": 35,
    "image": "gallery/太子尖/2026-08-02/DJI_20260802_064624_Edit_Composited_Photo.jpg",
    "title": "DJI_20260802_064624_Edit_Composited_Photo",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T06:46:24+08:00"
  },
  {
    "id": 36,
    "image": "gallery/太子尖/2026-08-02/IMG_20260802_044537.jpg",
    "title": "IMG_20260802_044537",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T04:45:37+08:00"
  },
  {
    "id": 37,
    "image": "gallery/太子尖/2026-08-02/IMG_20260802_052743.jpg",
    "title": "IMG_20260802_052743",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T05:27:43+08:00"
  },
  {
    "id": 38,
    "image": "gallery/太子尖/2026-08-02/IMG_20260802_053339.jpg",
    "title": "IMG_20260802_053339",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T05:33:39+08:00"
  },
  {
    "id": 39,
    "image": "gallery/太子尖/2026-08-02/IMG_20260802_054028.jpg",
    "title": "IMG_20260802_054028",
    "category": "太子尖",
    "location": "杭州市",
    "date": "2026年08月02日",
    "capturedAt": "2026-08-02T05:40:28+08:00"
  },
  {
    "id": 40,
    "image": "gallery/威海/2026-08-20/DJI_20260820_193921_Edit_Composited_Photo.jpg",
    "title": "DJI_20260820_193921_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海",
    "date": "2026年08月20日",
    "capturedAt": "2026-08-20T19:39:21+08:00"
  },
  {
    "id": 41,
    "image": "gallery/威海/2026-08-20/DJI_20260820_193929_Edit_Composited_Photo.jpg",
    "title": "DJI_20260820_193929_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海",
    "date": "2026年08月20日",
    "capturedAt": "2026-08-20T19:39:30+08:00"
  },
  {
    "id": 42,
    "image": "gallery/威海/2026-08-20/DJI_20260820_194106_Edit_Composited_Photo.jpg",
    "title": "DJI_20260820_194106_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海",
    "date": "2026年08月20日",
    "capturedAt": "2026-08-20T19:41:06+08:00"
  },
  {
    "id": 43,
    "image": "gallery/威海/2026-08-20/DJI_20260820_194200_Edit_Composited_Photo.jpg",
    "title": "DJI_20260820_194200_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海",
    "date": "2026年08月20日",
    "capturedAt": "2026-08-20T19:42:00+08:00"
  },
  {
    "id": 44,
    "image": "gallery/威海/2026-08-20/DJI_20260820_194241_Edit_Composited_Photo.jpg",
    "title": "DJI_20260820_194241_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海",
    "date": "2026年08月20日",
    "capturedAt": "2026-08-20T19:42:41+08:00"
  },
  {
    "id": 45,
    "image": "gallery/威海/2026-08-18/DJI_20260818_222606_Edit_Composited_Photo.jpg",
    "title": "DJI_20260818_222606_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海市",
    "date": "2026年08月18日",
    "capturedAt": "2026-08-18T22:26:06+08:00"
  },
  {
    "id": 46,
    "image": "gallery/威海/2026-08-18/DJI_20260818_222618_Edit_Composited_Photo.jpg",
    "title": "DJI_20260818_222618_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海市",
    "date": "2026年08月18日",
    "capturedAt": "2026-08-18T22:26:18+08:00"
  },
  {
    "id": 47,
    "image": "gallery/威海/2026-08-18/DJI_20260818_222647_Edit_Composited_Photo.jpg",
    "title": "DJI_20260818_222647_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海市",
    "date": "2026年08月18日",
    "capturedAt": "2026-08-18T22:26:47+08:00"
  },
  {
    "id": 48,
    "image": "gallery/威海/2026-08-19/DJI_20260819_230218_Edit_Composited_Photo.jpg",
    "title": "DJI_20260819_230218_Edit_Composited_Photo",
    "category": "威海",
    "location": "威海市",
    "date": "2026年08月19日",
    "capturedAt": "2026-08-19T23:02:18+08:00"
  },
  {
    "id": 49,
    "image": "gallery/山东/2026-02-16/3B8755E6B95AC5625F5B3C3CE455EB2C.png",
    "title": "3B8755E6B95AC5625F5B3C3CE455EB2C",
    "category": "山东",
    "location": "泰安市",
    "date": "2026年02月16日",
    "capturedAt": "2026-02-16T20:26:55+08:00"
  },
  {
    "id": 50,
    "image": "gallery/山东/2026-02-16/6F45CF0D19E0D375411B469441997B26.png",
    "title": "6F45CF0D19E0D375411B469441997B26",
    "category": "山东",
    "location": "泰安市",
    "date": "2026年02月16日",
    "capturedAt": "2026-02-16T20:26:54+08:00"
  },
  {
    "id": 51,
    "image": "gallery/山东/2026-02-16/IMG_20260216_194624.jpg",
    "title": "IMG_20260216_194624",
    "category": "山东",
    "location": "泰安市",
    "date": "2026年02月16日",
    "capturedAt": "2026-02-16T19:46:24+08:00"
  },
  {
    "id": 52,
    "image": "gallery/山东/2026-02-16/IMG_20260216_194626.jpg",
    "title": "IMG_20260216_194626",
    "category": "山东",
    "location": "泰安市",
    "date": "2026年02月16日",
    "capturedAt": "2026-02-16T19:46:26+08:00"
  },
  {
    "id": 53,
    "image": "gallery/山东/2026-02-18/IMG_20260218_175930.jpg",
    "title": "IMG_20260218_175930",
    "category": "山东",
    "location": "泰安市与济南市",
    "date": "2026年02月18日",
    "capturedAt": "2026-02-18T17:59:30+08:00"
  },
  {
    "id": 54,
    "image": "gallery/山东/2026-02-18/IMG_20260218_180028.jpg",
    "title": "IMG_20260218_180028",
    "category": "山东",
    "location": "泰安市与济南市",
    "date": "2026年02月18日",
    "capturedAt": "2026-02-18T18:00:28+08:00"
  },
  {
    "id": 55,
    "image": "gallery/山东/2026-02-18/IMG_20260218_181401.jpg",
    "title": "IMG_20260218_181401",
    "category": "山东",
    "location": "泰安市与济南市",
    "date": "2026年02月18日",
    "capturedAt": "2026-02-18T18:14:01+08:00"
  },
  {
    "id": 56,
    "image": "gallery/山东/2026-02-18/IMG_20260218_181540.jpg",
    "title": "IMG_20260218_181540",
    "category": "山东",
    "location": "泰安市与济南市",
    "date": "2026年02月18日",
    "capturedAt": "2026-02-18T18:15:40+08:00"
  },
  {
    "id": 57,
    "image": "gallery/山东/2026-02-18/IMG_20260218_183329.jpg",
    "title": "IMG_20260218_183329",
    "category": "山东",
    "location": "泰安市与济南市",
    "date": "2026年02月18日",
    "capturedAt": "2026-02-18T18:33:29+08:00"
  },
  {
    "id": 58,
    "image": "gallery/我的学校/2026-03-29/dji_mimo_20260329_2026_03_29_18_26_48_20260329182649_1774791486148_photo.jpg",
    "title": "dji_mimo_20260329_2026_03_29_18_26_48_20260329182649_1774791486148_photo",
    "category": "我的学校",
    "location": "我的学校",
    "date": "2026年03月29日",
    "capturedAt": "2026-03-29T18:26:48+08:00"
  },
  {
    "id": 59,
    "image": "gallery/我的学校/2026-04-26/dji_export_20260426_photo_0002.HEIC",
    "title": "dji_export_20260426_photo_0002",
    "category": "我的学校",
    "location": "我的学校",
    "date": "2026年04月26日",
    "capturedAt": "2026-04-26T21:21:18+08:00"
  },
  {
    "id": 60,
    "image": "gallery/我的学校/2026-03-26/dji_export_20260326_photo_0001.JPG",
    "title": "dji_export_20260326_photo_0001",
    "category": "我的学校",
    "location": "南京市",
    "date": "2026年03月26日",
    "capturedAt": "2026-03-26T22:54:16+08:00"
  },
  {
    "id": 61,
    "image": "gallery/我的学校/2026-03-26/dji_mimo_20260326_123012_20260326123013_1774535804259_photo.jpg",
    "title": "dji_mimo_20260326_123012_20260326123013_1774535804259_photo",
    "category": "我的学校",
    "location": "南京市",
    "date": "2026年03月26日",
    "capturedAt": "2026-03-26T12:30:12+08:00"
  },
  {
    "id": 66,
    "image": "gallery/泰山/2026-07-18/DJI_20260718_172551_Edit_Composited_Photo.jpg",
    "title": "DJI_20260718_172551_Edit_Composited_Photo",
    "category": "泰山",
    "location": "泰安市",
    "date": "2026年07月18日",
    "capturedAt": "2026-07-18T17:25:51+08:00"
  },
  {
    "id": 67,
    "image": "gallery/泰山/2026-07-18/DJI_20260718_172603_Edit_Composited_Photo.jpg",
    "title": "DJI_20260718_172603_Edit_Composited_Photo",
    "category": "泰山",
    "location": "泰安市",
    "date": "2026年07月18日",
    "capturedAt": "2026-07-18T17:26:03+08:00"
  },
  {
    "id": 68,
    "image": "gallery/泰山/2026-07-18/DJI_20260718_173003_Edit_Composited_Photo.jpg",
    "title": "DJI_20260718_173003_Edit_Composited_Photo",
    "category": "泰山",
    "location": "泰安市",
    "date": "2026年07月18日",
    "capturedAt": "2026-07-18T17:30:03+08:00"
  },
  {
    "id": 69,
    "image": "gallery/泰山/2026-07-18/DJI_20260718_173015_Edit_Composited_Photo.jpg",
    "title": "DJI_20260718_173015_Edit_Composited_Photo",
    "category": "泰山",
    "location": "泰安市",
    "date": "2026年07月18日",
    "capturedAt": "2026-07-18T17:30:15+08:00"
  },
  {
    "id": 70,
    "image": "gallery/泰山/2026-07-18/DJI_20260718_173032_Edit_Composited_Photo.jpg",
    "title": "DJI_20260718_173032_Edit_Composited_Photo",
    "category": "泰山",
    "location": "泰安市",
    "date": "2026年07月18日",
    "capturedAt": "2026-07-18T17:30:32+08:00"
  },
  {
    "id": 71,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155109_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155109_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:51:10+08:00"
  },
  {
    "id": 72,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155140_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155140_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:51:40+08:00"
  },
  {
    "id": 73,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155153_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155153_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:51:53+08:00"
  },
  {
    "id": 74,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155207_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155207_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:52:07+08:00"
  },
  {
    "id": 75,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155235_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155235_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:52:35+08:00"
  },
  {
    "id": 76,
    "image": "gallery/连云港/2026-06-27/DJI_20260627_155244_Edit_Composited_Photo.jpg",
    "title": "DJI_20260627_155244_Edit_Composited_Photo",
    "category": "连云港",
    "location": "连云港市",
    "date": "2026年06月27日",
    "capturedAt": "2026-06-27T15:52:45+08:00"
  },
  {
    "id": 77,
    "image": "gallery/香港/2017-07-15/20170715_131655.jpg",
    "title": "20170715_131655",
    "category": "香港",
    "location": "香港",
    "date": "2017年07月15日",
    "capturedAt": "2017-07-15T13:16:55+08:00"
  },
  {
    "id": 78,
    "image": "gallery/香港/2017-07-15/20170715_133014.jpg",
    "title": "20170715_133014",
    "category": "香港",
    "location": "香港",
    "date": "2017年07月15日",
    "capturedAt": "2017-07-15T13:30:14+08:00"
  },
  {
    "id": 79,
    "image": "gallery/香港/2017-07-16/20170716_154344.jpg",
    "title": "20170716_154344",
    "category": "香港",
    "location": "澳门特别行政区",
    "date": "2017年07月16日",
    "capturedAt": "2017-07-16T15:43:43+08:00"
  },
  {
    "id": 80,
    "image": "gallery/香港/2017-07-16/20170716_155153.jpg",
    "title": "20170716_155153",
    "category": "香港",
    "location": "澳门特别行政区",
    "date": "2017年07月16日",
    "capturedAt": "2017-07-16T15:51:53+08:00"
  },
  {
    "id": 81,
    "image": "gallery/香港/2017-07-16/20170716_161052.jpg",
    "title": "20170716_161052",
    "category": "香港",
    "location": "澳门特别行政区",
    "date": "2017年07月16日",
    "capturedAt": "2017-07-16T16:10:52+08:00"
  }
];
