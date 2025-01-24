import { domain, apiVersion } from "../js/constants.js";

let userName = document.getElementById("username"),
  password = document.getElementById("password"),
  loginForm = document.querySelector(".login-form"),
  messages = document.querySelectorAll(".message"),
  wrong = document.querySelector(".not-found"),
  notActive = document.querySelector(".not-active"),
  empty = document.querySelector(".empty"),
  loading = document.querySelector(".loading"),
  success = document.querySelector(".success"),
  error = document.querySelector(".error"),
  showPassword = document.querySelector(".show-hide"),
  goBack = document.querySelector(".go-back");

goBack.addEventListener("click", () => {
  location.href = "../index.html";
});

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
  }, 5000);
}

function generateDateExpire() {
  let now = Date.now();
  let accessExpire = now + 2 * 60 * 60 * 1000;
  let refreshExpire = now + 7 * 24 * 60 * 60 * 1000;
  let accessDate = new Date(accessExpire);
  let refreshDate = new Date(refreshExpire);
  let accessExpiryDate = accessDate.toUTCString();
  let refreshExpiryDate = refreshDate.toUTCString();
  return [accessExpiryDate, refreshExpiryDate];
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
    document.cookie = `access=${json.access}; expires=${
      generateDateExpire()[0]
    }; path=/`;
    document.cookie = `refresh=${json.refresh}; expires=${
      generateDateExpire()[1]
    }; path=/`;
    location.href = "../home/home.html";
  } else if (request.status == 401) {
    let json = await request.json();
    if (json.detail === "Account is not active") {
      showMessage(notActive);
    } else {
      showMessage(wrong);
    }
  } else {
    showMessage(error);
  }
});
