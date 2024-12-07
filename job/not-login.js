let header = document.querySelector("header .container"),
  headerAccount = document.querySelector("header .account"),
  headerNav = document.querySelector("header .nav-list");

headerAccount.remove();
headerNav.remove();
let loginDiv = document.createElement("div");
loginDiv.classList.add("login");
header.append(loginDiv);
let loginLink = document.createElement("a");
loginLink.href = "../login/login.html";
loginLink.classList.add("login-link");
loginLink.append(document.createTextNode("Login"));
loginDiv.append(loginLink);
