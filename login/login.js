import { domain, apiVersion } from "../constants.js";

let userName = document.getElementById("username"),
  password = document.getElementById("password"),
  loginForm = document.querySelector(".login-form"),
  messages = document.querySelectorAll(".message"),
  wrong = document.querySelector(".not-found"),
  empty = document.querySelector(".empty"),
  loading = document.querySelector(".loading"),
  success = document.querySelector(".success"),
  error = document.querySelector(".error"),
  showPassword = document.querySelector(".show-hide");

showPassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    showPassword.className = showPassword.className.replace("eye", "eye-slash");
  } else {
    password.type = "password";
    showPassword.className = showPassword.className.replace("eye-slash", "eye");
  }
  password.focus();
});

function assignValues() {
  let loginObject = {
    username: userName.value,
    password: password.value,
  };
  return loginObject;
}
function showMessage(message) {
  messages.forEach((msg) => {
    msg.classList.remove("active");
  });
  message.classList.add("active");
  setTimeout(() => {
    message.classList.remove("active");
  }, 3000);
}
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (userName.value.length === 0 || password.value.length === 0) {
    showMessage(empty);
    return false;
  } else {
    loading.classList.add("active");
  }
  let object = assignValues();
  let request = await fetch(`https://api.${domain}/${apiVersion}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (request.status == 200) {
    showMessage(success);
    let json = await request.json();
    document.cookie = `access=${json.access};`;
    document.cookie = `refresh=${json.refresh};`;
    console.log(json);
    location.pathname = location.pathname.replace(
      "login/login.html",
      "home/home.html"
    );
  } else if (request.status == 401) {
    showMessage(wrong);
  } else {
    showMessage(error);
  }
  console.log(request);
});
