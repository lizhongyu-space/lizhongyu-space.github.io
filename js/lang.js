// ===== Language + theme controls =====
(() => {
  const root = document.documentElement;
  const base = document.body.dataset.base || "";

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "css/theme.css";
  document.head.appendChild(css);

  let lang = "en", theme = "light";
  try {
    lang = localStorage.getItem("lang") || "en";
    theme = localStorage.getItem("theme") || "light";
  } catch (e) {}

  const PAIRS = [
    ["About", "关于"], ["Gallery", "相册"], ["Postcrossing", "明信片交换"], ["Global View", "全球视野"], ["Contact", "联系"],
    ["Keep Exploring.", "继续探索。"],

    ["High School Student", "高中生"], ["Nanjing, China", "中国南京"],
    ["Biology · Photography · Computing · Postcrossing", "生物 · 摄影 · 计算机 · 明信片交换"],
    ["A little about me", "关于我"],
    ["Hi 👋 I'm Li Zhongyu, a high school student from Nanjing, China, with a particular interest in biology. 🧬",
     "你好 👋 我是李中钰，来自中国南京的一名高中生，尤其对生物学感兴趣。🧬"],
    ["I'm curious about how things work, and I enjoy noticing the connections between people, places, and the world around me. I'm especially interested in biology and computer science, and I'd love to explore where these two fields meet in the future. 💻",
     "我对事物的运作方式充满好奇，也喜欢留意人与人、人与地方，以及我们与周围世界之间的联系。我尤其对生物学和计算机科学感兴趣，也希望未来能探索这两个领域的交汇之处。💻"],
    ["Outside of school, I enjoy photography 📷, traveling ✈️, and collecting postcards 💌. I like mountains ⛰️, the sea 🌊, cities, and museums, and I enjoy capturing the people, places, and little moments I come across along the way — especially the details that are easy to miss.",
     "课余时间，我喜欢摄影 📷、旅行 ✈️ 和收集明信片 💌。我喜欢山 ⛰️、大海 🌊、城市和博物馆，也喜欢记录一路上遇见的人、地方和那些小小的瞬间——尤其是容易被忽略的细节。"],
    ["I made this website to give you a better idea of who I am, while also giving myself a place to learn and experiment with computer science. As I keep learning and growing, I hope the site will grow with me too, gradually becoming a space that feels more and more like my own. 🌱",
     "我做这个网站，是想让你更了解我，也给自己一个学习和尝试计算机科学的空间。随着我不断学习和成长，我也希望这个网站能和我一起成长，慢慢变成一个越来越有自己感觉的空间。🌱"],
    ["I'm still exploring a lot of things, and I certainly haven't figured everything out yet.", "我还在探索很多事情，当然也还没有弄明白所有的答案。"],
    ["But for now, I want to stay curious. ✨", "但现在，我想继续保持好奇。✨"],

    ["All", "全部"], ["Nature", "自然"], ["City", "城市"], ["Travel", "旅行"], ["Daily", "日常"], ["Other", "其他"],
    ["No photos in this category yet.", "这个分类下还没有照片。"],

    ["Sent", "寄出"], ["Received", "收到"], ["Pending", "等待中"], ["Expired", "已过期"],
    ["Hover over a place for a preview · click for details", "将鼠标移到地点上预览 · 点击查看详情"],
    ["Records", "记录"], ["Date", "日期"], ["Country", "国家"], ["Type", "类型"], ["Postcard ID", "明信片编号"], ["Status", "状态"],
    ["Front", "正面"], ["Click for all records", "点击查看全部记录"],

    ["Illustrate", "说明"], ["Get in touch →", "联系 →"],
    ["Global View is a collection of photographs from different places around the world, taken by different people.",
     "Global View 汇集了来自世界各地、由不同人拍摄的照片。"],
    ["Choose how you want to browse: by country, or by person.", "你可以选择按国家或按人物浏览。"],
    ["Click any photo to enlarge it.", "点击任意照片即可放大。"],
    ["Below the enlarged photo you'll find when and where it was taken, and a short note about it.", "放大照片后，你可以看到它的拍摄时间、地点，以及一段简短的说明。"],
    ["Would you like to share a photo from where you are? You're very welcome to get in touch.", "如果你愿意分享一张你所在地方拍摄的照片，欢迎来联系我。"],
    ["By Country", "按国家"], ["By Person", "按人物"],
    ["Have a photo you'd like to share with Global View?", "有一张照片想分享给 Global View 吗？"],
    ["Share a photo ↗", "分享照片 ↗"],
    ["Browse photos by where they were taken", "按拍摄地点浏览照片"], ["Browse photos by who took them", "按拍摄者浏览照片"],
    ["← Change", "← 更改"], ["Short description of this photo.", "这张照片的简短说明。"],

    ["Contact", "联系"], ["Get in touch", "联系"],
    ["I'd love to hear from you. If you'd like to say hello, share something for Global View, or contribute to the site, you can reach me here:",
     "很高兴收到你的消息。如果你想和我打个招呼、为 Global View 分享一些内容，或者参与这个网站，可以通过下面的方式联系我："],
    ["GitHub:", "GitHub："], ["Email:", "邮箱："], ["Apple Messages:", "Apple 信息："],
    ["A little about this site", "关于这个网站"],
    ["💻 This is my personal website, hosted on GitHub Pages and built with HTML, CSS, and JavaScript. I first published it on October 1, 2026, and I'm building it as a small space to learn, experiment, and share the things I'm interested in. I also use it to document my Postcrossing hobby and, through Global View, collect photographs from people I've met along the way. The site is still very much a work in progress — and that's part of the fun. 🌱",
     "💻 这是我的个人网站，托管在 GitHub Pages 上，使用 HTML、CSS 和 JavaScript 构建。它于 2026 年 10 月 1 日首次公开，我把它当作一个学习、尝试和分享兴趣的小空间，也会在这里记录我的 Postcrossing 爱好，并通过 Global View 收集一路上认识的人分享的照片。这个网站还在不断完善中——而这本身也是乐趣的一部分。🌱"],
    ["Share ↗", "分享 ↗"], ["Message copied ✓", "已复制 ✓"], ["English", "English"], ["中文", "中文"],

    ["This page doesn't exist.", "这个页面不存在。"], ["← Back to About", "← 返回关于页"],
    ["拍摄地点", "Location"], ["位置参考坐标", "Reference coordinates"], ["拍摄时间", "Date taken"],
    ["原始文件名", "Original filename"], ["文件格式", "File format"],
    ["坐标为城市/地区级参考位置，并非照片原始准确GPS。原始 XMP 文件已移除", "Coordinates are city/region-level reference locations, not the photo's exact original GPS. The original XMP file has been removed."],
    ["未记录地点", "Location not recorded"], ["未记录", "Not recorded"],
    ["未记录可确认的地区参考坐标", "No confirmed regional reference coordinates recorded"],
    ["要在地图中查看此坐标？", "View these coordinates on a map?"],
    ["上海", "Shanghai"], ["上海市", "Shanghai"],
    ["北京", "Beijing"], ["北京市", "Beijing"],
    ["南京", "Nanjing"], ["南京市", "Nanjing"],
    ["天津研学", "Tianjin Study Trip"], ["天津市", "Tianjin"],
    ["太子尖", "Taizijian"], ["太子尖周边", "Taizijian area"],
    ["杭州", "Hangzhou"], ["杭州市", "Hangzhou"],
    ["威海", "Weihai"], ["威海市", "Weihai"],
    ["山东", "Shandong"], ["泰山", "Mount Tai"], ["泰安市", "Tai'an"],
    ["济南市", "Jinan"], ["泰安市与济南市", "Tai'an and Jinan"],
    ["我的学校", "My School"], ["连云港", "Lianyungang"], ["连云港市", "Lianyungang"],
    ["香港", "Hong Kong"], ["澳门特别行政区", "Macao SAR"], ["澳门", "Macao"],
    ["Russia", "俄罗斯"], ["Canada", "加拿大"], ["Italy", "意大利"], ["U.S.A.", "美国"], ["Türkiye", "土耳其"], ["U.K.", "英国"], ["Germany", "德国"], ["Czechia", "捷克"], ["Poland", "波兰"], ["Philippines", "菲律宾"], ["Taiwan", "台湾"], ["Slovakia", "斯洛伐克"], ["Japan", "日本"], ["USA", "美国"], ["Finland", "芬兰"], ["France", "法国"],
  ];

  const WORDS = [
    ["GLOBAL VIEW", "全球视野"], ["BY COUNTRY", "按国家"], ["BY PERSON", "按人物"],
    ["Received", "收到"], ["Sent", "寄出"], ["Pending", "等待中"], ["Expired", "已过期"],
    ["Front", "正面"], ["Back", "背面"], ["Date", "日期"], ["From", "来自"],
    ["Japan", "日本"], ["USA", "美国"], ["Germany", "德国"], ["Finland", "芬兰"], ["Netherlands", "荷兰"], ["France", "法国"]
  ];
  const WORD_AREAS = ".pc-card, .pc-modal, .records, .lightbox, .legend, #gvLabel, .gv-group";
  const wordRules = WORDS.map(([e, z]) => [new RegExp(`\\b${e}\\b`, "gi"), z]);
  wordRules.push([/(\d+) cards/g, "$1 张"]);
  const NAV_LETTERS = { "About": "关", "Gallery": "相", "Postcrossing": "明", "Global View": "视", "Contact": "联" };

  const toZh = new Map(PAIRS.map(([e, z]) => [e.toLowerCase(), z]));
  const toEn = new Map(PAIRS.map(([e, z]) => [z, e]));
  const orig = new WeakMap();

  const translate = (o, node) => {
    const m = o.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const core = m[2].replace(/\s+/g, " ");
    if (!core) return o;
    const cnDate = core.match(/^(\d{4})年(\d{2})月(\d{2})日$/);
    if (lang === "en" && cnDate) {
      const [, y, mo, d] = cnDate;
      const date = new Date(Number(y), Number(mo) - 1, Number(d));
      const formatted = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
      return m[1] + formatted + m[3];
    }
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

  const obs = new MutationObserver((muts) => {
    obs.disconnect();
    muts.forEach((m) => m.addedNodes.forEach(walk));
    obs.observe(document.body, { childList: true, subtree: true });
  });

  const applyLang = () => {
    obs.disconnect();
    root.lang = lang === "zh" ? "zh-CN" : "en";
    walk(document.body);
    document.querySelectorAll(".filters .chip").forEach((chip) => {
      const original = chip.dataset.cat || "";
      const label = lang === "en" ? (toEn.get(original) || original) : (toZh.get(original.toLowerCase()) || original);
      chip.textContent = label;
    });
    document.querySelectorAll(".side nav a").forEach((a) => {
      const en = a.getAttribute("title"), ab = a.querySelector(".ab");
      if (ab && NAV_LETTERS[en]) ab.textContent = lang === "zh" ? NAV_LETTERS[en] : en[0];
    });
    ctrl.querySelector("#langBtn").textContent = lang === "en" ? "Language" : "语言";
    ctrl.querySelector("#themeBtn").textContent = (theme === "dark" ? "☀ " : "☾ ") + (theme === "dark" ? (lang === "en" ? "Light" : "浅色") : (lang === "en" ? "Dark" : "深色"));
    obs.observe(document.body, { childList: true, subtree: true });
    window.siteLang = lang;
    window.dispatchEvent(new CustomEvent("site-language-change", { detail: { lang } }));
  };

  const applyTheme = () => { root.dataset.theme = theme; };

  const ctrl = document.createElement("div");
  ctrl.className = "top-ctrl";
  ctrl.setAttribute("data-no-i18n", "");
  ctrl.innerHTML = `
    <div class="lang-menu">
      <button type="button" id="langBtn" aria-label="Language" aria-haspopup="true" aria-expanded="false"></button>
      <div class="lang-options" id="langOptions" hidden>
        <button type="button" data-lang="en">English</button>
        <button type="button" data-lang="zh">中文</button>
      </div>
    </div>
    <button type="button" id="themeBtn" aria-label="Theme"></button>`;
  document.body.appendChild(ctrl);
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const langBtn = ctrl.querySelector("#langBtn");
  const langOptions = ctrl.querySelector("#langOptions");
  langBtn.addEventListener("click", () => {
    const open = langOptions.hidden;
    langOptions.hidden = !open;
    langBtn.setAttribute("aria-expanded", String(open));
  });
  langOptions.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang]");
    if (!b) return;
    lang = b.dataset.lang;
    save("lang", lang);
    langOptions.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
    applyLang();
  });
  document.addEventListener("click", (e) => {
    if (!ctrl.contains(e.target)) {
      langOptions.hidden = true;
      langBtn.setAttribute("aria-expanded", "false");
    }
  });
  ctrl.querySelector("#themeBtn").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; save("theme", theme); applyTheme(); applyLang(); });

  applyTheme();
  applyLang();
})();
