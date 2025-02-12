import"./constants-D2DsSXG6.js";import"./header-BX0fN-_f.js";import{c as H,f as z,d as T,a as A,b as V,g as O,m as B,s as F,l as W,e as R}from"./constants-DNmD6dpJ.js";let w,Y=document.querySelector(".job-seeker-body"),I=document.querySelector(".company-body");if(!document.cookie.includes("access")&&!document.cookie.includes("refresh"))I.remove(),await G();else if(await H()===!0){w=await z();let L=w.user.user_type;L==="job_seeker"?(I.remove(),await K()):L==="company"&&(Y.remove(),await Q())}async function G(){let J=document.querySelector(".jobs .jobs-container"),x=document.querySelector(".jobs .no-jobs"),L=document.querySelector(".jobs .failed"),M=document.querySelector("header .container"),C=document.querySelector("header .account"),_=document.querySelector("header .nav-list"),h=document.querySelector(".main-content"),u=document.querySelector(".main-content .container"),m=document.querySelector("section.welcome"),y=document.querySelector(".main-content aside.side"),v=document.querySelector(".jobs .options"),E=document.querySelector(".jobs .showing-details");C.remove(),_.remove();let U=document.createElement("div");U.classList.add("login"),M.append(U);let S=document.createElement("a");S.href="../login/login.html",S.classList.add("login-link"),S.append(document.createTextNode("Login")),U.append(S),m.remove(),y.remove(),h.style.marginTop="20px",u.style.cssText=`
    display: grid;
    grid-template-columns: 1fr;`;let l=new URLSearchParams(location.search),c=l.get("page");async function t(b=`${T}/${A}/jobs`){let r=await fetch(b);if(r.status==200){let o=await r.json(),p=o.results,$=document.querySelector(".jobs .options"),a=document.querySelector(".jobs .showing-details");if(o.count<=20)$.style.display="none",a.style.display="none";else{let e=20,i=e,f=i-e+1;c&&(i*=c,f=i-e+1),i>o.count&&(i=o.count);let g=document.querySelector(".showing-details .showing"),s=document.querySelector(".showing-details .count"),j=$.querySelector(".next"),k=$.querySelector(".back"),q=$.querySelector(".pages");g.textContent=`${f} - ${i}`,s.textContent=o.count,o.previous===null&&k.classList.add("disabled"),o.next===null&&j.classList.add("disabled");let P=c?+c:1,N=Math.ceil(o.count/e);for(let n=P-2;n<=P+2;n++){if(n<1)continue;let D=document.createElement("button");if(D.append(document.createTextNode(n)),D.id=`page-${n}`,q.append(D),n===N)break}document.getElementById(`page-${P}`).classList.add("active"),j.addEventListener("click",()=>{let n=new URLSearchParams(new URL(o.next).search).get("page");l.set("page",n),location.search=l.toString()}),k.addEventListener("click",()=>{let n=new URLSearchParams(new URL(o.previous).search).get("page");n===null&&(n=1),l.set("page",n),location.search=l.toString()}),q.querySelectorAll("button").forEach(n=>{n.addEventListener("click",()=>{l.set("page",n.textContent),location.search=l.toString()})})}if(p.length>0){x.remove(),L.remove();for(let e of p){let i,f,g=/\sat\s/i;if((e.company_id==1||e.company_id==2)&&g.test(e.title)){let n=e.title.split(g);i=n[0],f=n[1]}let s=`${e.location_country}, ${e.location_city}`,j=`${e.position_type[0].toUpperCase()}${e.position_type.slice(1)}`,k=`${e.job_type.split(" ")[0][0].toUpperCase()}${e.job_type.split(" ")[0].slice(1)} ${e.job_type.split(" ")[1][0].toUpperCase()}${e.job_type.split(" ")[1].slice(1)}`,q=`${e.work_place[0].toUpperCase()}${e.work_place.slice(1)}`;q==="Onsite"&&(q="On-site");let P=new Date(e.posted_date),N=timeago.format(P),d=`<div class="job">
                    <a class="job-title" href="../login/login.html">${i||e.title}</a>
                    <p class="post-date">${N}</p>
                    <p class="job-id">Job Id: ${e.id}</p>
                    <p class="company-name">
                      <i class="fa-regular fa-building fa-fw"></i> ${f||e.company}
                    </p>
                    <p class="location">
                      <i class="fa-solid fa-location-dot fa-fw"></i> ${s}
                    </p>
                    <p class="vacancies">
                      <i class="fa-regular fa-user fa-fw"></i>
                      <span class="title">Number Of Vacancies: </span>
                      <span class="value">${e.number_of_vacancies}</span>
                    </p>
                    <div class="job-inf">
                      <span class="employment-type">${j}</span>
                      |
                      <span class="job-type">${k}</span>
                      |
                      <span class="workplace">${q}</span>
                  </div>
                </div>`;J.insertAdjacentHTML("beforeend",d)}}else L.remove()}else v.style.display="none",E.style.display="none",x.remove()}c?await t(`${T}/${A}/jobs?page=${c}`):await t()}async function K(){let J=document.querySelector(".welcome .name"),x=document.querySelector(".side .full-name"),L=document.querySelector(".side .username"),M=document.querySelector(".side .job-title");J.textContent+=` ${w.user.first_name}`,x.textContent=`${w.user.first_name} ${w.user.last_name.split(" ")[0]}`,L.textContent=`@${w.user.username}`,M.innerHTML+=` ${w.job_title}`;let C=document.querySelector(".jobs .jobs-container"),_=document.querySelector(".jobs .no-jobs"),h=document.querySelector(".jobs .failed"),u=new URLSearchParams(location.search),m=u.get("page"),y=document.querySelector(".jobs .options"),v=document.querySelector(".jobs .showing-details");async function E(U=`${T}/${A}/jobs`){let S=await fetch(U,{headers:{Authorization:`Bearer ${await O()}`}});if(S.status==200){let l=await S.json(),c=l.results;if(l.count<=B)y.style.display="none",v.style.display="none";else{let t=B,b=t,r=b-t+1;m&&(b*=m,r=b-t+1),b>l.count&&(b=l.count);let o=v.querySelector(".showing"),p=v.querySelector(".count"),$=y.querySelector(".next"),a=y.querySelector(".back"),e=y.querySelector(".pages");o.textContent=`${r} - ${b}`,p.textContent=l.count,l.previous===null&&a.classList.add("disabled"),l.next===null&&$.classList.add("disabled");let i=m?+m:1,f=Math.ceil(l.count/t);for(let s=i-2;s<=i+2;s++){if(s<1)continue;let j=document.createElement("button");if(j.append(document.createTextNode(s)),j.id=`page-${s}`,e.append(j),s===f)break}document.getElementById(`page-${i}`).classList.add("active"),$.addEventListener("click",()=>{let s=new URLSearchParams(new URL(l.next).search).get("page");u.set("page",s),location.search=u.toString()}),a.addEventListener("click",()=>{let s=new URLSearchParams(new URL(l.previous).search).get("page");s===null&&(s=1),u.set("page",s),location.search=u.toString()}),e.querySelectorAll("button").forEach(s=>{s.addEventListener("click",()=>{u.set("page",s.textContent),location.search=u.toString()})})}if(c.length>0){_.remove(),h.remove();for(let t of c){let b,r,o=/\sat\s/i;if((t.company_id==1||t.company_id==2)&&o.test(t.title)){let s=t.title.split(o);b=s[0],r=s[1]}let p=`${t.location_country}, ${t.location_city}`,$=`${t.position_type[0].toUpperCase()}${t.position_type.slice(1)}`,a=`${t.job_type.split(" ")[0][0].toUpperCase()}${t.job_type.split(" ")[0].slice(1)} ${t.job_type.split(" ")[1][0].toUpperCase()}${t.job_type.split(" ")[1].slice(1)}`,e=`${t.work_place[0].toUpperCase()}${t.work_place.slice(1)}`;e==="Onsite"&&(e="On-site");let i=new Date(t.posted_date),f=timeago.format(i),g=`<div class="job ${t.applied?"applied-job":""}">
                    <a class="job-title" href="../job/job.html?id=${t.id}">${b||t.title}</a>
                    <p class="post-date">${f}</p>
                    <p class="job-id">Job Id: ${t.id}</p>
                    <p class="company-name">
                      <i class="fa-regular fa-building fa-fw"></i> ${r||t.company}
                    </p>
                    <p class="location">
                      <i class="fa-solid fa-location-dot fa-fw"></i> ${p}
                    </p>
                    <p class="vacancies">
                      <i class="fa-regular fa-user fa-fw"></i>
                      <span class="title">Number Of Vacancies: </span>
                      <span class="value">${t.number_of_vacancies}</span>
                    </p>
                    <div class="job-inf">
                      <span class="employment-type">${$}</span>
                      |
                      <span class="job-type">${a}</span>
                      |
                      <span class="workplace">${e}</span>
                    </div>
                    ${t.applied?'<p class="applied">Applied</p>':""}
                </div>`;C.insertAdjacentHTML("beforeend",g)}}else h.remove()}else S.status==401&&await F()===!0?await E():(y.style.display="none",v.style.display="none",_.remove())}m?await E(`${T}/${A}/jobs?page=${m}`):await E()}async function Q(){let J=document.querySelector(".company-name"),x=document.querySelector(".full-name"),L=document.querySelector(".username");J.textContent=w.company_name,x.textContent=`${w.user.first_name} ${w.user.last_name}`,L.textContent+=w.user.username;let M=document.querySelector(".company-jobs .jobs"),C=document.querySelector(".company-jobs .no-jobs"),_=document.querySelector(".company-jobs .failed"),h=new URLSearchParams(location.search),u=h.get("page"),m=document.querySelector(".company-jobs .options"),y=document.querySelector(".company-jobs .showing-details");async function v(r=`${T}/${A}/company/me/jobs`){let o=await fetch(r,{headers:{Authorization:`Bearer ${await O()}`}});if(o.status==200){let p=await o.json(),$=p.results;if(p.count<=B)m.style.display="none",y.style.display="none";else{let a=B,e=a,i=e-a+1;u&&(e*=u,i=e-a+1),e>p.count&&(e=p.count);let f=y.querySelector(".showing"),g=y.querySelector(".count"),s=m.querySelector(".next"),j=m.querySelector(".back"),k=m.querySelector(".pages");f.textContent=`${i} - ${e}`,g.textContent=p.count,p.previous===null&&j.classList.add("disabled"),p.next===null&&s.classList.add("disabled");let q=u?+u:1,P=Math.ceil(p.count/a);for(let d=q-2;d<=q+2;d++){if(d<1)continue;let n=document.createElement("button");if(n.append(document.createTextNode(d)),n.id=`page-${d}`,k.append(n),d===P)break}document.getElementById(`page-${q}`).classList.add("active"),s.addEventListener("click",()=>{let d=new URLSearchParams(new URL(p.next).search).get("page");h.set("page",d),location.search=h.toString()}),j.addEventListener("click",()=>{let d=new URLSearchParams(new URL(p.previous).search).get("page");d===null&&(d=1),h.set("page",d),location.search=h.toString()}),k.querySelectorAll("button").forEach(d=>{d.addEventListener("click",()=>{h.set("page",d.textContent),location.search=h.toString()})})}if($.length>0){C.remove(),_.remove();for(let a of $){let e=`${a.location_country}, ${a.location_city}`,i=`${a.position_type[0].toUpperCase()}${a.position_type.slice(1)}`,f=`${a.job_type.split(" ")[0][0].toUpperCase()}${a.job_type.split(" ")[0].slice(1)} ${a.job_type.split(" ")[1][0].toUpperCase()}${a.job_type.split(" ")[1].slice(1)}`,g=`${a.work_place[0].toUpperCase()}${a.work_place.slice(1)}`;g==="Onsite"&&(g="On-site");let s=new Date(a.posted_date),j=timeago.format(s),k=`<div class="job" data-job-id="${a.id}">
                <div class="details">
                  <a class="job-title" data-job-id="${a.id}" href="../job/job.html?id=${a.id}">${a.title}</a>
                  <p class="job-id">Job Id: ${a.id}</p>
                  <p class="post-date"><i class="fa-regular fa-clock fa-fw"></i> Posted: ${j}</p>
                  <p class="location">
                    <i class="fa-solid fa-location-dot fa-fw"></i> ${e}
                  </p>
                  <p class="vacancies">
                    <i class="fa-regular fa-user fa-fw"></i>
                    <span class="title">Number Of Vacancies: </span>
                    <span class="value">${a.number_of_vacancies}</span>
                  </p>
                  <div class="job-inf">
                    <span class="employment-type">${i}</span>
                    |
                    <span class="job-type">${f}</span>
                    |
                    <span class="workplace">${g}</span>
                  </div>
                </div>
                <div class="options">
                  <a class="edit-job" data-job-id="${a.id}" href="../job/job.html?id=${a.id}&edit=true" target="_blank">Edit</a>
                  <button class="delete-job" data-job-id="${a.id}">Delete</button>
                </div>
              </div>`;M.insertAdjacentHTML("beforeend",k)}}else _.remove()}else o.status==401&&await F()===!0?await v():(m.style.display="none",y.style.display="none",C.remove())}u?await v(`${T}/${A}/company/me/jobs?page=${u}`):await v();let E=document.querySelector(".welcome .name");E.textContent+=w.user.first_name;let U=document.querySelectorAll(".job .delete-job"),S=document.querySelector(".delete-job-message .yes"),l=document.querySelector(".delete-job-message .no"),c=document.querySelector(".delete-job-message");async function t(r){W();let o=await fetch(`${T}/${A}/company/me/jobs/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${await O()}`}});V(),o.status==204?(c.classList.remove("active"),R("success",void 0,"The job has been successfully deleted","Thank you for using MedLinker. We are happy to serve you.",void 0,!0)):o.status==401?await F()===!0?await t(r):R("failed",c,"Something went wrong","We're sorry about that. Please try again."):o.status==404?R("failed",c,"This job does not exist","Please reload the page."):R("failed",c,"Something went wrong","We're sorry about that. Please try again.")}async function b(r){let o=document.querySelector(".overlay");c.classList.add("active"),o.classList.add("active"),c.querySelector(".close").addEventListener("click",()=>{c.classList.remove("active"),o.classList.remove("active")}),l.addEventListener("click",()=>{c.classList.remove("active"),o.classList.remove("active")}),S.addEventListener("click",async()=>{c.classList.remove("active"),await t(r)})}U.forEach(r=>{r.addEventListener("click",async()=>{let o=r.getAttribute("data-job-id");await b(o)})})}V();
