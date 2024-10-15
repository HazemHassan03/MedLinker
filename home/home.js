import { checkAccess, logoutFunction, fetchUserData } from "../constants.js";

document.querySelector(".loading").classList.add("active");
await checkAccess();
let userData = await fetchUserData();
console.log(userData);
document.querySelector(".loading").classList.remove("active");

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout"),
  landingName = document.querySelector(".welcome .name");
// searchIcon = document.querySelector(".search-icon"),
// searchBar = document.getElementById("search");

landingName.textContent = ` ${userData.user.first_name}`;

account.addEventListener("click", () => {
  navList.classList.toggle("active");
  if (navList.classList.contains("active")) {
    accountIcon.className = accountIcon.className.replace("down", "up");
  } else {
    accountIcon.className = accountIcon.className.replace("up", "down");
  }
  document.addEventListener("click", (e) => {
    if (
      e.target !== navList &&
      e.target.parentElement.parentElement !== account &&
      e.target.parentElement !== account &&
      e.target !== account
    ) {
      navList.classList.remove("active");
      accountIcon.className = accountIcon.className.replace("up", "down");
    }
  });
});

logout.addEventListener("click", () => {
  logoutFunction();
});
