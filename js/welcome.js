// Welcome：黑屏 → 非匀速打出 HERE → 短暂停留 → 进入 About
const wl = document.getElementById("wl");
const typed = document.getElementById("wlTyped");
const go = () => { location.href = "about.html"; };

const word = "HERE";
const delays = [420, 760, 260, 980]; // 每一笔故意不同速，避免机械感

let timer;
let i = 0;

const typeNext = () => {
  if (i >= word.length) {
    timer = setTimeout(go, 1500);
    return;
  }

  typed.textContent += word[i];
  i += 1;
  timer = setTimeout(typeNext, delays[i - 1]);
};

setTimeout(typeNext, 900);

document.addEventListener("click", go);
document.addEventListener("keydown", go);

window.addEventListener("beforeunload", () => clearTimeout(timer));
