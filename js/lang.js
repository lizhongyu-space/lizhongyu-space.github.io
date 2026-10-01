// ===== 右上角两个按钮：语言切换（English / 中文）+ 主题切换（Light / Dark）=====
// 这个文件由 js/main.js 在每个页面自动加载。
// 语言切换的原理：英文是页面里原本写的文字；切换到中文时，到下面的 PAIRS 词典里查对应的中文并替换，切回英文就还原。
// 想增加 / 修改某句话的中文：在 PAIRS 里加一行 ["英文原文", "中文翻译"]（英文必须和页面上的一字不差）。
(() => {
  const root = document.documentElement;
  const base = document.body.dataset.base || "";

  // 0) 自动加载深色模式的样式文件
  const css = document.createElement("link");
  css.rel = "stylesheet"; css.href = base + "css/theme.css";
  document.head.appendChild(css);

  // 1) 读取上次的选择（没有的话：英文 + 浅色）
  let lang = "en", theme = "light";
  try { lang = localStorage.getItem("lang") || "en"; theme = localStorage.getItem("theme") || "light"; } catch (e) {}

  // 2) 词典：[英文, 中文]
  const PAIRS = [
    // --- 左侧导航 / 页脚 ---
    ["About", "关于"], ["Gallery", "相册"], ["Postcrossing", "明信片交换"], ["Global View", "全球视野"], ["Contact me", "联系我"],
    ["Keep Exploring.", "继续探索。"], ["Made with curiosity.", "带着好奇心制作。"],
    // --- About ---
    ["High School Student", "高中生"], ["Nanjing, China", "中国南京"],
    ["Biology · Photography · Computing · Postcrossing", "生物 · 摄影 · 计算机 · 明信片交换"],
    ["A little about me", "关于我"],
    ["Hi 👋 I'm Li Zhongyu, a high school student from Nanjing, China, with a focus on biology. 🧬",
     "你好 👋 我是李中钰，来自中国南京的一名高中生，主要关注生物学。🧬"],
    ["I'm curious about how things work, and I enjoy exploring the connections between people, places, and the world around us. My main interests are biology and computer science, and I hope to explore the intersection of these two fields in the future. 💻",
     "我对事物的运作方式充满好奇，喜欢探索人、地方以及我们周围世界之间的联系。我主要的兴趣是生物学和计算机科学，希望将来能探索这两个领域的交叉。💻"],
    ["Outside of school, I enjoy photography 📷, traveling ✈️, and collecting postcards 💌. I like mountains ⛰️, the sea 🌊, cities, and museums, and I enjoy capturing the people, places, and moments I encounter along the way — especially the small details that are easy to overlook.",
     "课余时间，我喜欢摄影 📷、旅行 ✈️ 和收集明信片 💌。我喜欢山 ⛰️、大海 🌊、城市和博物馆，也喜欢记录一路上遇见的人、地方和瞬间——尤其是那些容易被忽略的小细节。"],
    ["I created this website to give you a better idea of who I am, while also giving myself a chance to explore and learn more about computer science. As I continue to learn and grow, this website will keep evolving with me, eventually becoming a space that is truly my own. 🌱",
     "我建立这个网站，是想让你更了解我，同时也给自己一个探索和学习更多计算机科学的机会。随着我不断学习和成长，这个网站也会和我一起不断演变，最终成为一个真正属于我自己的空间。🌱"],
    ["I'm still exploring many things, and I haven't found all the answers yet.", "我仍在探索许多事情，还没有找到所有的答案。"],
    ["But for now, I want to stay curious. ✨", "但现在，我想保持好奇。✨"],
    // --- Gallery ---
    ["All", "全部"], ["Nature", "自然"], ["City", "城市"], ["Travel", "旅行"], ["Daily", "日常"], ["Other", "其他"],
    ["No photos in this category yet.", "这个分类下还没有照片。"],
    // --- Postcrossing ---
    ["Sent", "寄出"], ["Received", "收到"], ["Pending", "等待中"], ["Expired", "已过期"],
    ["Hover a place for a preview · click for details", "将鼠标移到地点上预览 · 点击查看详情"],
    ["Records", "记录"], ["Date", "日期"], ["Country", "国家"], ["Type", "类型"], ["Postcard ID", "明信片编号"], ["Status", "状态"],
    ["Front", "正面"], ["Back", "背面"], ["Click for all records", "点击查看全部记录"],
    // --- Global View ---
    ["Illustrate", "说明"], ["Contact me →", "联系我 →"],
    ["Global View is a collection of photographs from different places around the world, taken by different people.",
     "全球视野汇集了世界各地不同的人拍摄的照片。"],
    ["Choose how you want to browse: by country, or by person.", "选择浏览方式：按国家，或按人物。"],
    ["Click any photo to enlarge it.", "点击任意照片即可放大。"],
    ["Below the enlarged photo you'll find when and where it was taken, and a short note about it.", "放大后的照片下方会显示拍摄时间、地点，以及一段简短的说明。"],
    ["Would you like to share a photo from where you are? You're very welcome to get in touch.", "想分享一张你所在地方的照片吗？欢迎与我联系。"],
    ["By Country", "按国家"], ["By Person", "按人物"],
    ["Browse photos by where they were taken", "按拍摄地点浏览照片"], ["Browse photos by who took them", "按拍摄者浏览照片"],
    ["← Change", "← 更改"], ["Short description of this photo.", "这张照片的简短说明。"],
    // --- Contact ---
    ["Contact", "联系"], ["Contact me!", "联系我！"],
    ["If you want to get in touch with me, upload your content on this website, or contribute to this site, there are several ways to do it:",
     "如果你想联系我、在本网站上传你的内容，或为这个网站做出贡献，有以下几种方式："],
    ["on GitHub to support me:", "在 GitHub 上支持我："], ["Email：", "邮箱："],
    ["Apple message：lzy2504@outlook.com", "Apple 信息：lzy2504@outlook.com"],
    ["Something about this website", "关于这个网站"],
    ["The page you are visiting is a personal website about Li Zhongyu, published on GitHub's servers and built with HTML, JS and CSS. It was first made public on October 1, 2026, and from now on it will be maintained jointly with ChatGPT, Claude and Copilot. Please do not attack it maliciously. This website was created for my own programming practice and to introduce my Postcrossing hobby. Anyway, I'm glad to meet you this way! I wish you all the best in your future work and life.",
     "你目前访问的这个网页为在GitHub服务器上发布的关于李中钰的个人网站，由html+js+css编写而成。在2026年10月1日首次发布于公网，此后将使用ChatGPT+Claude+copilot共同维护。请不要恶意攻击，此网站的创建目的为个人编程学习+post crossing个人介绍。还是，很高兴以这种方式认识你！愿你在以后的工作生活中顺利"],
    ["Share ↗", "分享 ↗"], ["Message copied ✓", "已复制 ✓"],
    // --- 404 ---
    ["This page doesn't exist.", "这个页面不存在。"], ["← Back to About", "← 返回关于页"]
  ];

  // 3) 短句里夹杂的单词（例如 "Received · 2026-09-12"、"🇯🇵 Japan"、"GLOBAL VIEW · BY COUNTRY"）——只在照片 / 明信片 / 地图相关区域生效
  const WORDS = [["GLOBAL VIEW", "全球视野"], ["BY COUNTRY", "按国家"], ["BY PERSON", "按人物"], ["Received", "收到"], ["Sent", "寄出"],
    ["Pending", "等待中"], ["Expired", "已过期"], ["Front", "正面"], ["Back", "背面"], ["Date", "日期"], ["From", "来自"],
    ["Japan", "日本"], ["USA", "美国"], ["Germany", "德国"], ["Finland", "芬兰"], ["Netherlands", "荷兰"], ["France", "法国"]];
  const WORD_AREAS = ".pc-card, .pc-modal, .records, .lightbox, .legend, #gvLabel, .gv-group";
  const wordRules = WORDS.map(([e, z]) => [new RegExp(`\\b${e}\\b`, "gi"), z]);
  wordRules.push([/(\d+) cards/g, "$1 张"]);
  const NAV_LETTERS = { "About": "关", "Gallery": "相", "Postcrossing": "明", "Global View": "视", "Contact me": "联" };   // 导航收缩后显示的单个汉字

  const toZh = new Map(PAIRS.map(([e, z]) => [e.toLowerCase(), z]));
  const toEn = new Map(PAIRS.map(([e, z]) => [z, e]));
  const orig = new WeakMap();   // 记住每段文字最初的样子，切回英文时还原

  // 4) 翻译一段文字
  const translate = (o, node) => {
    const m = o.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const core = m[2].replace(/\s+/g, " ");
    if (!core) return o;
    if (lang === "en") return toEn.has(core) ? m[1] + toEn.get(core) + m[3] : o;
    if (toZh.has(core.toLowerCase())) return m[1] + toZh.get(core.toLowerCase()) + m[3];
    if (core.length < 90 && node.parentElement.closest(WORD_AREAS)) {
      let t = core;
      wordRules.forEach(([re, z]) => (t = t.replace(re, z)));
      if (t !== core) return m[1] + t + m[3];
    }
    return o;
  };
  const skip = (n) => !n.parentElement || n.parentElement.closest("script, style, [data-no-i18n], .ab");
  const processText = (n) => {
    if (skip(n)) return;
    if (!orig.has(n)) orig.set(n, n.nodeValue);
    const t = translate(orig.get(n), n);
    if (n.nodeValue !== t) n.nodeValue = t;
  };
  const walk = (node) => {
    if (node.nodeType === 3) return processText(node);
    if (node.nodeType !== 1) return;
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    const list = []; while (w.nextNode()) list.push(w.currentNode);
    list.forEach(processText);
  };

  // 5) 监听页面变化：照片墙、明信片表格、弹窗等是后来才生成的，生成后自动翻译
  const obs = new MutationObserver((muts) => {
    obs.disconnect();
    muts.forEach((m) => m.addedNodes.forEach(walk));
    obs.observe(document.body, { childList: true, subtree: true });
  });

  // 6) 应用语言：翻译整个页面 + 导航收缩后的汉字 + 右上角按钮上的字
  const applyLang = () => {
    obs.disconnect();
    root.lang = lang === "zh" ? "zh-CN" : "en";
    walk(document.body);
    document.querySelectorAll(".side nav a").forEach((a) => {
      const en = a.getAttribute("title"), ab = a.querySelector(".ab");
      if (ab && NAV_LETTERS[en]) ab.textContent = lang === "zh" ? NAV_LETTERS[en] : en[0];
    });
    ctrl.querySelector("#langBtn").textContent = lang === "en" ? "中文" : "English";
    ctrl.querySelector("#themeBtn").textContent = (theme === "dark" ? "☀ " : "☾ ") + (theme === "dark" ? (lang === "en" ? "Light" : "浅色") : (lang === "en" ? "Dark" : "深色"));
    obs.observe(document.body, { childList: true, subtree: true });
  };

  // 7) 应用主题
  const applyTheme = () => { root.dataset.theme = theme; };

  // 8) 右上角的两个按钮
  const ctrl = document.createElement("div");
  ctrl.className = "top-ctrl";
  ctrl.setAttribute("data-no-i18n", "");
  ctrl.innerHTML = `<button type="button" id="langBtn" aria-label="Language"></button><button type="button" id="themeBtn" aria-label="Theme"></button>`;
  document.body.appendChild(ctrl);
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  ctrl.querySelector("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "zh" : "en"; save("lang", lang); applyLang(); });
  ctrl.querySelector("#themeBtn").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; save("theme", theme); applyTheme(); applyLang(); });

  applyTheme();
  applyLang();
})();