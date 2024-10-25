import { userData } from "./home.js";

let landingName = document.querySelector(".welcome .name"),
  sideFullName = document.querySelector(".side .full-name"),
  sideUsername = document.querySelector(".side .username"),
  sideJobTitle = document.querySelector(".side .job-title"),
  expandJob = document.querySelectorAll(".job .explore-more");

console.log(landingName);

landingName.textContent += ` ${userData.user.first_name}`;
sideFullName.textContent = `${userData.user.first_name} ${userData.user.last_name}`;
sideUsername.textContent += userData.user.username;
sideJobTitle.innerHTML += ` ${userData.jobTitle}`;

expandJob.forEach((expand) => {
  expand.addEventListener("click", () => {
    expand.parentElement.classList.toggle("expanded");
    if (expand.parentElement.classList.contains("expanded")) {
      expand.innerHTML = `عرض أقل <i class="fa-solid fa-angle-up"></i>`;
    } else {
      expand.innerHTML = `عرض المزيد <i class="fa-solid fa-angle-down"></i>`;
    }
  });
});
