import"./constants-D2DsSXG6.js";let f=document.querySelector(".signup-form"),c=document.getElementById("name"),o=document.getElementById("email"),l=document.getElementById("password"),i=document.querySelectorAll("input:not([type=submit])"),r=document.querySelector(".show-hide"),y=document.querySelectorAll(".rules"),s=document.querySelector(".message"),h=document.querySelector(".go-back");h.addEventListener("click",()=>{location.href="../index.html"});let a={fullName:"",email:"",password:"",comingFrom:"sign up"};function n(e){return!!/[a-z]{2,}(?=\s[a-z]{2,})+/i.test(e)}function d(e){return!!/.+@.+/i.test(e)}function u(e){return!!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/.test(e)}function g(e){return e.every(v=>v)}i.forEach(e=>{e.addEventListener("focus",()=>{e.value.length>0&&m(e),y.forEach(t=>{t.classList.remove("active")}),e.parentElement.nextElementSibling.classList.add("active"),e===l?r.classList.add("active"):r.classList.remove("active")})});r.addEventListener("click",()=>{l.type==="password"?(l.type="text",r.textContent="Hide"):(l.type="password",r.textContent="Show"),l.focus()});function m(e){let t;switch(e){case c:t=n(e.value);break;case o:t=d(e.value);break;case l:t=u(e.value);break}t?(e.classList.remove("not-valid-value"),e.classList.add("valid-value"),e.parentElement.querySelector(".not-valid").style.opacity="0",e.parentElement.querySelector(".valid").style.opacity="1"):(e.classList.remove("valid-value"),e.classList.add("not-valid-value"),e.parentElement.querySelector(".valid").style.opacity="0",e.parentElement.querySelector(".not-valid").style.opacity="1")}i.forEach(e=>{e.addEventListener("input",()=>{m(e)})});f.addEventListener("submit",e=>{e.preventDefault(),a.fullName=c.value.trim(),a.email=o.value.trim(),a.password=l.value.trim();let t=[n(a.fullName),d(a.email),u(a.password)];g(t)?(sessionStorage.setItem("Data",JSON.stringify(a)),location.href="../signup/information.html"):(s.textContent="Make sure the entered data is correct",s.classList.add("active"),setTimeout(()=>{s.classList.remove("active")},3e3))});
