/* My Museum catalog — framework only. Collection data will be added later. */
const museumCollections=[];
const museumGrid=document.getElementById("museumGrid");
const museumEmpty=document.getElementById("museumEmpty");
const museumLang=()=>document.documentElement.lang==="zh-CN"?"zh":"en";
let museumType="all";
function renderMuseum(){
 const list=museumType==="all"?museumCollections:museumCollections.filter(x=>x.type===museumType);
 museumGrid.innerHTML=list.map(()=> "").join("");
 museumEmpty.hidden=false;
 museumEmpty.textContent=museumLang()==="zh"?"暂时没有收藏，敬请期待。":"No collections yet. More will be added.";
}
document.querySelectorAll(".museum-chip").forEach(b=>b.addEventListener("click",()=>{museumType=b.dataset.type||"all";document.querySelectorAll(".museum-chip").forEach(x=>x.classList.toggle("active",x===b));renderMuseum();}));
renderMuseum();
window.addEventListener("site-language-change",renderMuseum);
