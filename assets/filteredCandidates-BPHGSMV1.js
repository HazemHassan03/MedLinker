import"./constants-D2DsSXG6.js";import"./header-BX0fN-_f.js";import{c as g,f as L,d as f,a as m,g as v,s as y,b as _}from"./constants-DNmD6dpJ.js";let k=document.querySelector(".go-back");k.addEventListener("click",()=>{location.href="../home/home.html"});let S=new URLSearchParams(location.search),h=S.get("id"),q=document.querySelector(".candidates-message.not-found"),p=document.querySelector(".candidates-message.job-failed"),A=document.querySelector(".candidates-message.no-candidates"),u=document.querySelector(".candidates-message.candidates-failed"),T=document.querySelector(".job-card"),C=document.querySelector(".job-card .container"),b=document.querySelector(".filtrated-candidates"),D=document.querySelector(".filtrated-candidates .candidates"),d=document.querySelector(".copied.success"),n=document.querySelector(".copied.failed"),U=await g(),F=document.querySelector(".landing .no-access");U===!0&&((await L()).user.user_type!=="company"?(T.remove(),b.remove(),F.classList.add("active")):await $());async function $(){let i=await fetch(`${f}/${m}/jobs/${h}`,{headers:{Authorization:`Bearer ${await v()}`}});if(i.status==200){let e=await i.json(),c=`${e.location_country}, ${e.location_city}`,r=`${e.position_type[0].toUpperCase()}${e.position_type.slice(1)}`,t=`${e.job_type.split(" ")[0][0].toUpperCase()}${e.job_type.split(" ")[0].slice(1)} ${e.job_type.split(" ")[1][0].toUpperCase()}${e.job_type.split(" ")[1].slice(1)}`,a=`${e.work_place[0].toUpperCase()}${e.work_place.slice(1)}`;a==="Onsite"&&(a="On-site");let s=new Date(e.posted_date),o=timeago.format(s),l=`<a class="job-title" data-job-id="${e.id}" href="../job/job.html?id=${e.id}">${e.title}</a>
                  <p class="job-id">Job Id: ${e.id}</p>
                  <p class="post-date">${o}</p>
                  <p class="location">
                    <i class="fa-solid fa-location-dot fa-fw"></i> ${c}
                  </p>
                  <p class="vacancies">
                    <i class="fa-regular fa-user fa-fw"></i>
                    <span class="title">Number Of Vacancies: </span>
                    <span class="value">${e.number_of_vacancies}</span>
                  </p>
                  <p class="applicants">
                    <span class="value">${e.applicants_count}</span>
                    <span class="title">Applicants</span>
                  </p>
                  <div class="job-inf">
                    <span class="employment-type">${r}</span>
                    |
                    <span class="job-type">${t}</span>
                    |
                    <span class="workplace">${a}</span>
                  </div>`;C.insertAdjacentHTML("beforeend",l),b.classList.add("active"),await j()}else i.status==404?q.classList.add("active"):i.status==401&&await y()===!0?await $():p.classList.add("active")}async function j(){let i=await fetch(`${f}/${m}/applications?job_id=${h}`,{headers:{Authorization:`Bearer ${await v()}`}});if(i.status==200){let c=(await i.json()).results;if(c.length==0)A.classList.add("active");else{for(let t of c){let a=new Date(t.date_applied),s=a.toLocaleString(void 0,{day:"2-digit",month:"short",year:"numeric"}).split(",").join(""),o=a.toLocaleString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}).split(",").join(""),l=`${s}, ${o}`,w=`<div class="candidate">
              <div class="img">
                <i class="fa-solid fa-user"></i>
              </div>
              <h3 class="name">${t.full_name}</h3>
              <div class="contact">
                <div class="phone" title="${t.contact_number}">
                  <i class="view fa-solid fa-phone fa-fw"></i>
                  <i class="hover fa-solid fa-copy"></i>
                </div>
                <div class="email" title="${t.email}">
                  <i class="view fa-solid fa-envelope fa-fw"></i>
                  <i class="hover fa-solid fa-copy"></i>
                </div>
                <a href="${t.resume}" target="_blank" class="cv"
                  ><i class="fa-solid fa-file-lines"></i> CV</a
                >
              </div>
              <div class="applied-date">
                <h4 class="title">Application Date</h4>
                <p class="value">${l}</p>
              </div>
              <a href="${t.interview_link}" target="_blank" class="interview-link"
                >Interview Link
                <i class="fa-solid fa-arrow-up-right-from-square"></i
              ></a>
              </div>`;D.insertAdjacentHTML("beforeend",w)}[...document.querySelectorAll(".filtrated-candidates .candidate .contact .email"),...document.querySelectorAll(".filtrated-candidates .candidate .contact .phone")].forEach(t=>{t.addEventListener("click",()=>{navigator.clipboard.writeText(t.title).then(()=>{let a=d;a.classList.add("active"),setTimeout(()=>{a.classList.remove("active"),setTimeout(()=>{a.remove()},1e3)},1e3);let s=d.cloneNode(!0);s.classList.remove("active"),document.body.append(s),d=s}).catch(()=>{let a=n;a.classList.add("active"),setTimeout(()=>{a.classList.remove("active"),setTimeout(()=>{a.remove()},1e3)},1e3);let s=n.cloneNode(!0);s.classList.remove("active"),document.body.append(s),n=s})})})}}else i.status==401&&await y()===!0?await j():u.classList.add("active")}_();
