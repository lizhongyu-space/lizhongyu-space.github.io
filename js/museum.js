/* My Museum catalog: PDF files are not requested while browsing cards. */
const museumCollections=[
{id:"album-001",type:"album",displayName:"2021 中国邮政特种纪念邮票.pdf",titleEn:"2021 中国邮政特种纪念邮票.pdf",titleZh:"2021 中国邮政特种纪念邮票.pdf",categoryEn:"Philatelic album",categoryZh:"集邮册",date:"2021",pages:"20 pages",cover:"museum/covers/album-001.svg",file:"museum/files/album-001.pdf",descriptionEn:"A scanned album preserved in its original reading quality.",descriptionZh:"一本按原始阅读质量保存的扫描集邮册。"}
];
const museumGrid=document.getElementById("museumGrid");
const museumEmpty=document.getElementById("museumEmpty");
const museumLang=()=>document.documentElement.lang==="zh-CN"?"zh":"en";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let museumType="all";
function museumCard(x){
 const zh=museumLang()==="zh",title=x.displayName|| (zh?x.titleZh:x.titleEn),cat=zh?x.categoryZh:x.categoryEn,desc=zh?x.descriptionZh:x.descriptionEn,label=zh?"打开数字藏品":"Open collection";
 const file=encodeURI(x.file),cover=encodeURI(x.cover);
 return '<article class="museum-card"><a class="museum-cover" href="'+file+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(label+": "+title)+'"><img src="'+cover+'" alt="'+esc(title)+'" loading="lazy" decoding="async"></a><div class="museum-card-body"><h2 class="museum-card-title">'+esc(title)+'</h2><div class="museum-card-meta"><span>'+esc(cat)+'</span>'+(x.date?'<span>'+esc(x.date)+'</span>':'')+(x.pages?'<span>'+esc(x.pages)+'</span>':'')+'</div><p class="museum-card-desc">'+esc(desc)+'</p><a class="museum-open" href="'+file+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a></div></article>';
}
function renderMuseum(){
 const list=museumType==="all"?museumCollections:museumCollections.filter(x=>x.type===museumType);
 museumGrid.innerHTML=list.map(museumCard).join("");
 museumEmpty.hidden=list.length>0;
 if(!list.length)museumEmpty.textContent=museumLang()==="zh"?"暂时没有，期待你的收藏":"Nothing here yet. More collections will be added.";
}
document.querySelectorAll(".museum-chip").forEach(b=>b.addEventListener("click",()=>{museumType=b.dataset.type||"all";document.querySelectorAll(".museum-chip").forEach(x=>x.classList.toggle("active",x===b));renderMuseum();}));
renderMuseum();
window.addEventListener("site-language-change",renderMuseum);