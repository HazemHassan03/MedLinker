import"./constants-D2DsSXG6.js";import"./header-BX0fN-_f.js";import{c as H,f as z,d as T,a as A,b as V,g as O,m as B,s as F,l as W,e as R}from"./constants-DNmD6dpJ.js";let v,Y=document.querySelector(".job-seeker-body"),I=document.querySelector(".company-body");if(!document.cookie.includes("access")&&!document.cookie.includes("refresh"))I.remove(),await G();else if(await H()===!0){v=await z();let L=v.user.user_type;L==="job_seeker"?(I.remove(),await K()):L==="company"&&(Y.remove(),await Q())}async function G(){let J=document.querySelector(".jobs .jobs-container"),x=document.querySelector(".jobs .no-jobs"),L=document.querySelector(".jobs .failed"),M=document.querySelector("header .container"),C=document.querySelector("header .account"),k=document.querySelector("header .nav-list"),h=document.querySelector(".main-content"),u=document.querySelector(".main-content .container"),m=document.querySelector("section.welcome"),y=document.querySelector(".main-content aside.side"),w=document.querySelector(".jobs .options"),E=document.querySelector(".jobs .showing-details");C.remove(),k.remove();let U=document.createElement("div");U.classList.add("login"),M.append(U);let S=document.createElement("a");S.href="../login/login.html",S.classList.add("login-link"),S.append(document.createTextNode("Login")),U.append(S),m.remove(),y.remove(),h.style.marginTop="20px",u.style.cssText=`
    display: grid;
    grid-template-columns: 1fr;`;let l=new URLSearchParams(location.search),c=l.get("page");async function a(b=`${T}/${A}/jobs`){let r=await fetch(b);if(r.status==200){let s=await r.json(),p=s.results,$=document.querySelector(".jobs .options"),t=document.querySelector(".jobs .showing-details");if(s.count<=20)$.style.display="none",t.style.display="none";else{let e=20,i=e,f=i-e+1;c&&(i*=c,f=i-e+1),i>s.count&&(i=s.count);let g=document.querySelector(".showing-details .showing"),o=document.querySelector(".showing-details .count"),j=$.querySelector(".next"),_=$.querySelector(".back"),q=$.querySelector(".pages");g.textContent=`${f} - ${i}`,o.textContent=s.count,s.previous===null&&_.classList.add("disabled"),s.next===null&&j.classList.add("disabled");let P=c?+c:1,N=Math.ceil(s.count/e);for(let n=P-2;n<=P+2;n++){if(n<1)continue;let D=document.createElement("button");if(D.append(document.createTextNode(n)),D.id=`page-${n}`,q.append(D),n===N)break}document.getElementById(`page-${P}`).classList.add("active"),j.addEventListener("click",()=>{let n=new URLSearchParams(new URL(s.next).search).get("page");l.set("page",n),location.search=l.toString()}),_.addEventListener("click",()=>{let n=new URLSearchParams(new URL(s.previous).search).get("page");n===null&&(n=1),l.set("page",n),location.search=l.toString()}),q.querySelectorAll("button").forEach(n=>{n.addEventListener("click",()=>{l.set("page",n.textContent),location.search=l.toString()})})}if(p.length>0){x.remove(),L.remove();for(let e of p){let i,f,g=/\sat\s/i;if((e.company_id==1||e.company_id==2)&&g.test(e.title)){let n=e.title.split(g);i=n[0],f=n[1]}let o=`${e.location_country}, ${e.location_city}`,j=`${e.position_type[0].toUpperCase()}${e.position_type.slice(1)}`,_=`${e.job_type.split(" ")[0][0].toUpperCase()}${e.job_type.split(" ")[0].slice(1)} ${e.job_type.split(" ")[1][0].toUpperCase()}${e.job_type.split(" ")[1].slice(1)}`,q=`${e.work_place[0].toUpperCase()}${e.work_place.slice(1)}`;q==="Onsite"&&(q="On-site");let P=new Date(e.posted_date),N=timeago.format(P),d=`<div class="job">
                    <a class="job-title" href="../login/login.html">${i||e.title}</a>
                    <p class="post-date">${N}</p>
                    <p class="job-id">Job Id: ${e.id}</p>
                    <p class="company-name">
                      <i class="fa-regular fa-building fa-fw"></i> ${f||e.company}
                    </p>
                    <p class="location">
                      <i class="fa-solid fa-location-dot fa-fw"></i> ${o}
                    </p>
                    <p class="vacancies">
                      <i class="fa-regular fa-user fa-fw"></i>
                      <span class="title">Number Of Vacancies: </span>
                      <span class="value">${e.number_of_vacancies}</span>
                    </p>
                    <p class="applications">
                      <i class="fa-solid fa-briefcase fa-fw"></i>
                      <span class="title">Number Of Applications: </span>
                      <span class="value">50</span>
                    </p>
                    <div class="job-inf">
                      <span class="employment-type">${j}</span>
                      |
                      <span class="job-type">${_}</span>
                      |
                      <span class="workplace">${q}</span>
                  </div>
                </div>`;J.insertAdjacentHTML("beforeend",d)}}else L.remove()}else w.style.display="none",E.style.display="none",x.remove()}c?await a(`${T}/${A}/jobs?page=${c}`):await a()}async function K(){let J=document.querySelector(".welcome .name"),x=document.querySelector(".side .full-name"),L=document.querySelector(".side .username"),M=document.querySelector(".side .job-title");J.textContent+=` ${v.user.first_name}`,x.textContent=`${v.user.first_name} ${v.user.last_name.split(" ")[0]}`,L.textContent=`@${v.user.username}`,M.innerHTML+=` ${v.job_title}`;let C=document.querySelector(".jobs .jobs-container"),k=document.querySelector(".jobs .no-jobs"),h=document.querySelector(".jobs .failed"),u=new URLSearchParams(location.search),m=u.get("page"),y=document.querySelector(".jobs .options"),w=document.querySelector(".jobs .showing-details");async function E(U=`${T}/${A}/jobs`){let S=await fetch(U,{headers:{Authorization:`Bearer ${await O()}`}});if(S.status==200){let l=await S.json(),c=l.results;if(l.count<=B)y.style.display="none",w.style.display="none";else{let a=B,b=a,r=b-a+1;m&&(b*=m,r=b-a+1),b>l.count&&(b=l.count);let s=w.querySelector(".showing"),p=w.querySelector(".count"),$=y.querySelector(".next"),t=y.querySelector(".back"),e=y.querySelector(".pages");s.textContent=`${r} - ${b}`,p.textContent=l.count,l.previous===null&&t.classList.add("disabled"),l.next===null&&$.classList.add("disabled");let i=m?+m:1,f=Math.ceil(l.count/a);for(let o=i-2;o<=i+2;o++){if(o<1)continue;let j=document.createElement("button");if(j.append(document.createTextNode(o)),j.id=`page-${o}`,e.append(j),o===f)break}document.getElementById(`page-${i}`).classList.add("active"),$.addEventListener("click",()=>{let o=new URLSearchParams(new URL(l.next).search).get("page");u.set("page",o),location.search=u.toString()}),t.addEventListener("click",()=>{let o=new URLSearchParams(new URL(l.previous).search).get("page");o===null&&(o=1),u.set("page",o),location.search=u.toString()}),e.querySelectorAll("button").forEach(o=>{o.addEventListener("click",()=>{u.set("page",o.textContent),location.search=u.toString()})})}if(c.length>0){k.remove(),h.remove();for(let a of c){let b,r,s=/\sat\s/i;if((a.company_id==1||a.company_id==2)&&s.test(a.title)){let o=a.title.split(s);b=o[0],r=o[1]}let p=`${a.location_country}, ${a.location_city}`,$=`${a.position_type[0].toUpperCase()}${a.position_type.slice(1)}`,t=`${a.job_type.split(" ")[0][0].toUpperCase()}${a.job_type.split(" ")[0].slice(1)} ${a.job_type.split(" ")[1][0].toUpperCase()}${a.job_type.split(" ")[1].slice(1)}`,e=`${a.work_place[0].toUpperCase()}${a.work_place.slice(1)}`;e==="Onsite"&&(e="On-site");let i=new Date(a.posted_date),f=timeago.format(i),g=`<div class="job ${a.applied?"applied-job":""}">
                    <a class="job-title" href="../job/job.html?id=${a.id}">${b||a.title}</a>
                    <p class="post-date">${f}</p>
                    <p class="job-id">Job Id: ${a.id}</p>
                    <p class="company-name">
                      <i class="fa-regular fa-building fa-fw"></i> ${r||a.company}
                    </p>
                    <p class="location">
                      <i class="fa-solid fa-location-dot fa-fw"></i> ${p}
                    </p>
                    <p class="vacancies">
                      <i class="fa-regular fa-user fa-fw"></i>
                      <span class="title">Number Of Vacancies: </span>
                      <span class="value">${a.number_of_vacancies}</span>
                    </p>
                    <p class="applicants">
                      <span class="value">${a.applicants_count}</span>
                      <span class="title">Applicants</span>
                    </p>
                    <div class="job-inf">
                      <span class="employment-type">${$}</span>
                      |
                      <span class="job-type">${t}</span>
                      |
                      <span class="workplace">${e}</span>
                    </div>
                    ${a.applied?'<p class="applied">Applied</p>':""}
                </div>`;C.insertAdjacentHTML("beforeend",g)}}else h.remove()}else S.status==401&&await F()===!0?await E():(y.style.display="none",w.style.display="none",k.remove())}m?await E(`${T}/${A}/jobs?page=${m}`):await E()}async function Q(){let J=document.querySelector(".company-name"),x=document.querySelector(".full-name"),L=document.querySelector(".username");J.textContent=v.company_name,x.textContent=`${v.user.first_name} ${v.user.last_name}`,L.textContent+=v.user.username;let M=document.querySelector(".company-jobs .jobs"),C=document.querySelector(".company-jobs .no-jobs"),k=document.querySelector(".company-jobs .failed"),h=new URLSearchParams(location.search),u=h.get("page"),m=document.querySelector(".company-jobs .options"),y=document.querySelector(".company-jobs .showing-details");async function w(r=`${T}/${A}/company/me/jobs`){let s=await fetch(r,{headers:{Authorization:`Bearer ${await O()}`}});if(s.status==200){let p=await s.json(),$=p.results;if(p.count<=B)m.style.display="none",y.style.display="none";else{let t=B,e=t,i=e-t+1;u&&(e*=u,i=e-t+1),e>p.count&&(e=p.count);let f=y.querySelector(".showing"),g=y.querySelector(".count"),o=m.querySelector(".next"),j=m.querySelector(".back"),_=m.querySelector(".pages");f.textContent=`${i} - ${e}`,g.textContent=p.count,p.previous===null&&j.classList.add("disabled"),p.next===null&&o.classList.add("disabled");let q=u?+u:1,P=Math.ceil(p.count/t);for(let d=q-2;d<=q+2;d++){if(d<1)continue;let n=document.createElement("button");if(n.append(document.createTextNode(d)),n.id=`page-${d}`,_.append(n),d===P)break}document.getElementById(`page-${q}`).classList.add("active"),o.addEventListener("click",()=>{let d=new URLSearchParams(new URL(p.next).search).get("page");h.set("page",d),location.search=h.toString()}),j.addEventListener("click",()=>{let d=new URLSearchParams(new URL(p.previous).search).get("page");d===null&&(d=1),h.set("page",d),location.search=h.toString()}),_.querySelectorAll("button").forEach(d=>{d.addEventListener("click",()=>{h.set("page",d.textContent),location.search=h.toString()})})}if($.length>0){C.remove(),k.remove();for(let t of $){let e=`${t.location_country}, ${t.location_city}`,i=`${t.position_type[0].toUpperCase()}${t.position_type.slice(1)}`,f=`${t.job_type.split(" ")[0][0].toUpperCase()}${t.job_type.split(" ")[0].slice(1)} ${t.job_type.split(" ")[1][0].toUpperCase()}${t.job_type.split(" ")[1].slice(1)}`,g=`${t.work_place[0].toUpperCase()}${t.work_place.slice(1)}`;g==="Onsite"&&(g="On-site");let o=new Date(t.posted_date),j=timeago.format(o),_=`<div class="job" data-job-id="${t.id}">
                <div class="details">
                  <a class="job-title" data-job-id="${t.id}" href="../job/job.html?id=${t.id}">${t.title}</a>
                  <p class="job-id">Job Id: ${t.id}</p>
                  <p class="post-date"><i class="fa-regular fa-clock fa-fw"></i> Posted: ${j}</p>
                  <p class="location">
                    <i class="fa-solid fa-location-dot fa-fw"></i> ${e}
                  </p>
                  <p class="vacancies">
                    <i class="fa-regular fa-user fa-fw"></i>
                    <span class="title">Number Of Vacancies: </span>
                    <span class="value">${t.number_of_vacancies}</span>
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
                <a class="edit-job" data-job-id="${t.id}" href="../job/job.html?id=${t.id}&edit=true" target="_blank">Edit</a>
                <button class="delete-job" data-job-id="${t.id}">Delete</button>
                </div>
                <div class="candidates">
                  <p class="applicants">
                      <span class="value">${t.applicants_count}</span>
                      <span class="title">Applicants</span>
                  </p>
                  <div class="filtered">
                    <div class="filtered-candidates">
                      <div class="number">
                        <span class="title">Filtered Candidates: </span>
                        <span class="value">${t.filtered_applicants_count}</span>
                      </div>
                      <a href="../filtered-candidates/filtered-candidates.html?id=${t.id}" class="show">Show</a>
                    </div>
                  </div>
                </div>
              </div>`;M.insertAdjacentHTML("beforeend",_)}}else k.remove()}else s.status==401&&await F()===!0?await w():(m.style.display="none",y.style.display="none",C.remove())}u?await w(`${T}/${A}/company/me/jobs?page=${u}`):await w();let E=document.querySelector(".welcome .name");E.textContent+=v.user.first_name;let U=document.querySelectorAll(".job .delete-job"),S=document.querySelector(".delete-job-message .yes"),l=document.querySelector(".delete-job-message .no"),c=document.querySelector(".delete-job-message");async function a(r){W();let s=await fetch(`${T}/${A}/company/me/jobs/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${await O()}`}});V(),s.status==204?(c.classList.remove("active"),R("success",void 0,"The job has been successfully deleted","Thank you for using MedLinker. We are happy to serve you.",void 0,!0)):s.status==401?await F()===!0?await a(r):R("failed",c,"Something went wrong","We're sorry about that. Please try again."):s.status==404?R("failed",c,"This job does not exist","Please reload the page."):R("failed",c,"Something went wrong","We're sorry about that. Please try again.")}async function b(r){let s=document.querySelector(".overlay");c.classList.add("active"),s.classList.add("active"),c.querySelector(".close").addEventListener("click",()=>{c.classList.remove("active"),s.classList.remove("active")}),l.addEventListener("click",()=>{c.classList.remove("active"),s.classList.remove("active")}),S.addEventListener("click",async()=>{c.classList.remove("active"),await a(r)})}U.forEach(r=>{r.addEventListener("click",async()=>{let s=r.getAttribute("data-job-id");await b(s)})})}V();
