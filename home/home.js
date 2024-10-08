if (
  (!document.cookie.includes("access") &&
    !document.cookie.includes("refresh")) ||
  (document.cookie.includes("access") && !document.cookie.includes("refresh"))
) {
  location.pathname = location.pathname.replace(
    "home/home.html",
    "login/login.html"
  );
} else if (
  !document.cookie.includes("access") &&
  document.cookie.includes("refresh")
) {
  storeNewAccess();
}

async function storeNewAccess() {
  let cookies = document.cookie.split("; ");
  let neededCookie = cookies.filter((cookie) => {
    return cookie.startsWith("refresh");
  });
  let refreshToken = neededCookie[0].split("=")[1];
  // let refreshToken = document.cookie
  //   .match(/refresh=.+;*/g)[0]
  //   .replace("refresh=", "");
  let request = await fetch(`https://api.medlinker.org/v1/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  if (request.status == 200) {
    let json = await request.json();
    let now = Date.now();
    let accessExpire = now + 15 * 60 * 1000;
    let accessDate = new Date(accessExpire);
    let accessExpiryDate = accessDate.toUTCString();
    document.cookie = `access=${json.access}; expires=${accessExpiryDate}; path=/`;
  }
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
