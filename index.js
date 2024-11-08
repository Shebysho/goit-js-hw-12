import{a as L,S as b,i as n}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const w="46839543-ea16205625b8d87bc87d9a951",v="https://pixabay.com/api/";async function u(a,t){try{return(await L.get(v,{params:{key:w,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}catch(r){throw console.error("Помилка при отриманні зображень:",r),r}}function q(a){const{webformatURL:t,largeImageURL:r,tags:o,likes:e,views:s,comments:i,downloads:p}=a;return`
      <a href="${r}" class="gallery__item">
        <img src="${t}" alt="${o}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${e}
          </p>
          <p class="info-item">
            <b>Views</b>${s}
          </p>
          <p class="info-item">
            <b>Comments</b>${i}
          </p>
          <p class="info-item">
            <b>Downloads</b>${p}
          </p>
        </div>
      </a>
    `}function f(a){const t=document.querySelector(".gallery"),r=a.map(q).join("");t.innerHTML=r}const P=document.querySelector("#search-form"),h=document.querySelector(".gallery"),c=document.querySelector(".load-more"),d=document.querySelector(".loader");let g=new b(".gallery a",{captionsData:"alt",captionDelay:250}),l=1,y="",m=0;P.addEventListener("submit",async a=>{a.preventDefault();const t=a.currentTarget.elements.searchQuery.value.trim();if(t===""){n.warning({title:"Warning",message:"Please enter a search query."});return}d.classList.remove("hidden"),c.classList.add("hidden"),l=1,y=t,h.innerHTML="";try{const{hits:r,total:o}=await u(t,l);m=o,r.length===0?n.info({title:"Information",message:"Sorry, there are no images matching your search query. Please try again!"}):(f(r),g.refresh(),m>15&&c.classList.remove("hidden"))}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{d.classList.add("hidden")}});c.addEventListener("click",async()=>{d.classList.remove("hidden"),l+=1;try{const{hits:a}=await u(y,l);f(a),g.refresh();const{height:t}=h.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),l*15>=m&&(c.classList.add("hidden"),n.info({title:"Information",message:"We're sorry, but you've reached the end of search results."}))}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{d.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
