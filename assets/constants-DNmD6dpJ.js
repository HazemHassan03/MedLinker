let r="https://api.medlinker.org",l="v1",q=20,C={show:"2MB",size:2*1e6},D={show:"2MB",size:2*1e6};function j(t){let e=["B","KB","MB"],s=0;for(;t>=1e3;)t/=1e3,s++;return`${t.toFixed(2)}${e[s]}`}function z(t){document.cookie="access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",document.cookie="refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",t===!1?location.reload():location.href="/login/login.html"}function A(){document.body.classList.add("scrolling"),document.querySelector(".loading").classList.add("active")}function B(){document.body.classList.remove("scrolling"),document.querySelector(".loading").classList.remove("active")}async function u(){let e=document.cookie.split("; ").filter(s=>s.startsWith("access"));if(e.length>0)return e[0].split("=")[1];await T()===!0&&await u()}async function L(){let e=document.cookie.split("; ").filter(s=>s.startsWith("refresh"));if(e.length>0)return e[0].split("=")[1];await T()===!0&&await L()}let $=3,v=0;async function f(){let t=await L(),e=await fetch(`${r}/${l}/auth/token/refresh`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refresh:t})});if(v++,e.status==200){let s=await e.json(),i=Date.now()+2*60*60*1e3,c=new Date(i).toUTCString();return document.cookie=`access=${s.access}; expires=${c}; path=/`,!0}else location.href="/login/login.html";if(v===$)return!1}async function T(){if(!document.cookie.includes("access")&&document.cookie.includes("refresh")){if(await f()===!0)return!0;location.href="/login/login.html"}else if(!document.cookie.includes("access")&&!document.cookie.includes("refresh"))location.href="/login/login.html";else return!0}async function y(){let t=await fetch(`${r}/${l}/users/jobseeker/me`,{headers:{Authorization:`Bearer ${await u()}`}});if(t.status==404){let e=await fetch(`${r}/${l}/users/company/me`,{headers:{Authorization:`Bearer ${await u()}`}});if(e.status==200)return await e.json();if(e.status==401)await f()===!0&&await y();else return!1}else{if(t.status==200)return await t.json();if(t.status==401)await f()===!0&&await y();else return!1}}function b(t,e,s,o,i,d,c){let a=document.querySelector(".page-message"),h=document.querySelector(".page-message i"),x=document.querySelector(".page-message .title"),m=document.querySelector(".page-message .main-message"),k=document.querySelector(".page-message .another-messages"),g=document.querySelector(".overlay");if(g.classList.add("active"),t)switch(t){case"success":a.classList.remove("failed"),a.classList.add("success");break;case"failed":a.classList.remove("success"),a.classList.add("failed");break}if(s&&(x.textContent=s),m.textContent="",o&&(m.textContent=o),i){Array.from(k.children).forEach(n=>{n.remove()});for(let n of i){let w=document.createElement("p"),S=document.createTextNode(n);w.append(S),k.append(w)}}e&&e.classList.remove("active"),a.classList.add("active");function p(){d===!0?location.reload():(g.classList.remove("active"),a.classList.remove("active"),e&&e.classList.add("active"),h.removeEventListener("click",p))}h.addEventListener("click",()=>{c?location.href=c:p()})}export{l as a,B as b,T as c,r as d,b as e,y as f,u as g,z as h,C as i,j,D as k,A as l,q as m,f as s};
