if (
  !document.cookie.includes("access") ||
  !document.cookie.includes("refresh")
) {
  location.pathname = location.pathname.replace(
    "home/home.html",
    "login/login.html"
  );
}

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout");
// searchIcon = document.querySelector(".search-icon"),
// searchBar = document.getElementById("search");

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

function logoutFunction() {
  document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

logout.addEventListener("click", () => {
  logoutFunction();
});
