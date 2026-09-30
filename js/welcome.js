// ===== Welcome 时间线：黑屏 → 光 → 少量文字 → WELCOME → 进入 About =====
// 这里只搭好"结构和时间"，视觉动画以后单独设计。想调节快慢，改下面的毫秒数即可。
const wl = document.getElementById("wl");
const go = () => { location.href = "about.html"; };
const steps = [
  [700,  "on-light"],   // 出现一道细光
  [1800, "on-text"],    // 出现一行小字
  [3400, "on-title"],   // 小字淡出，WELCOME 出现
  [5400, "on-out"],     // 整体淡出回到黑屏
];
steps.forEach(([t, cls]) => setTimeout(() => {
  if (cls === "on-title") wl.classList.remove("on-text");
  wl.classList.add(cls);
}, t));
setTimeout(go, 6400);   // Welcome 结束，进入 About
document.addEventListener("click", go);   // 点击屏幕任意位置也可直接跳过
document.addEventListener("keydown", go);
