import"./constants-D2DsSXG6.js";import{h as u}from"./constants-DNmD6dpJ.js";let a=document.querySelector(".bar"),l=document.querySelector(".nav"),m=document.querySelector("nav.not-logged"),v=document.querySelector("nav.logged"),h=document.querySelector("header nav .nav .account-nav"),r=document.querySelector("header nav .nav .my-account"),o=document.querySelector("header nav .nav .triangle"),g=document.getElementById("logout"),n=document.querySelector(".to-top"),d=document.querySelectorAll(".presentation .body > div"),L=document.querySelector(".copyright-date"),p=new Date,f=document.querySelector(".search-form"),t=document.getElementById("job-search"),c=document.querySelector(".input .go");!document.cookie.includes("access")&&!document.cookie.includes("refresh")?m.classList.add("active"):v.classList.add("active");a.addEventListener("click",()=>{l.classList.toggle("active"),l.classList.contains("active")?(a.classList.remove("fa-bars"),a.classList.add("fa-xmark")):(a.classList.remove("fa-xmark"),a.classList.add("fa-bars"))});h.addEventListener("click",()=>{r.classList.toggle("active"),r.classList.contains("active")?o.className=o.className.replace("down","up"):o.className=o.className.replace("up","down")});g.addEventListener("click",()=>{u(!1)});window.addEventListener("scroll",()=>{window.scrollY>900?n.style.transform="scale(1)":n.style.transform="scale(0)"});n.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});for(let e=0;e<d.length;e++){let s=document.createElement("span"),i=document.createTextNode(e+1);s.classList.add("number"),s.append(i),d[e].prepend(s)}L.textContent=p.getFullYear();c.addEventListener("click",()=>{t.value.length>0&&(location.href="../home/home.html")});f.addEventListener("submit",e=>{e.preventDefault(),t.value.length>0&&(location.href="../home/home.html")});t.addEventListener("input",()=>{t.value.length>0?c.classList.add("active"):c.classList.remove("active")});t.addEventListener("focus",()=>{t.value.length>0?c.classList.add("active"):c.classList.remove("active")});
