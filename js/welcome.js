// Welcome：黑屏 → 带有终端感的非匀速打字 → 短暂停留 → 进入 About
const typed = document.getElementById("wlTyped");
const go = () => { location.href = "about.html"; };

const phrase = "hello from China";
const delays = [110, 180, 75, 240, 95, 310, 120, 80, 210, 140, 95, 260, 100, 180, 120, 300]; // 故意不均匀
let timer;
let i = 0;

const typeNext = () => {
  if (i >= phrase.length) {
    timer = setTimeout(go, 700);
    return;
  }
  typed.textContent += phrase[i];
  i += 1;
  timer = setTimeout(typeNext, delays[i - 1] ?? 140);
};

timer = setTimeout(typeNext, 1100);
document.addEventListener("click", go);
document.addEventListener("keydown", go);
window.addEventListener("beforeunload", () => clearTimeout(timer));
