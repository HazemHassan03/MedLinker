let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list");
  // searchIcon = document.querySelector(".search-icon"),
  // searchBar = document.getElementById("search");

account.addEventListener("click", () => {
  navList.classList.toggle("active");
  if (navList.classList.contains("active")) {
    accountIcon.className = accountIcon.className.replace("down", "up");
  } else {
    accountIcon.className = accountIcon.className.replace("up", "down");
  }
});