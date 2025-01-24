import { logoutFunction } from "../js/constants.js";

let account = document.querySelector(".account"),
  triangle = document.querySelector(".account .triangle"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout");

account.addEventListener("click", () => {
  navList.classList.toggle("active");
  if (navList.classList.contains("active")) {
    triangle.className = triangle.className.replace("down", "up");
  } else {
    triangle.className = triangle.className.replace("up", "down");
  }
});

logout.addEventListener("click", () => {
  logoutFunction();
});
