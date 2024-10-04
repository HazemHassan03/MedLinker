let signupForm = document.querySelector(".signup-form"),
  fullName = document.getElementById("name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  inputs = document.querySelectorAll("input:not([type=submit])"),
  showPassword = document.querySelector(".show-hide"),
  rules = document.querySelectorAll(".rules"),
  allMustValid = document.querySelector(".all-valid");

let infObj = {
  fullName: "",
  email: "",
  password: "",
  comingFrom: "sign up",
};

function checkFullName(name) {
  let regex = /[a-z]{2,}(?=\s[a-z]{2,})+/i;
  if (regex.test(name)) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  let regex = /.+@.+/i;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function checkPassword(pass) {
  let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (regex.test(pass)) {
    return true;
  } else {
    return false;
  }
}

function checkAll(array) {
  let check = array.every((e) => {
    return e;
  });
  return check;
}

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    rules.forEach((rule) => {
      rule.classList.remove("active");
    });
    input.parentElement.nextElementSibling.classList.add("active");
    if (input === password) {
      showPassword.classList.add("active");
    } else {
      showPassword.classList.remove("active");
    }
  });
});

showPassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    showPassword.textContent = "Hide";
  } else {
    password.type = "password";
    showPassword.textContent = "Show";
  }
  password.focus();
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    let check;
    switch (input) {
      case fullName:
        check = checkFullName(input.value);
        break;
      case email:
        check = checkEmail(input.value);
        break;
      case password:
        check = checkPassword(input.value);
        break;
    }
    if (check) {
      input.classList.remove("not-valid-value");
      input.classList.add("valid-value");
      input.parentElement.querySelector(".not-valid").style.opacity = "0";
      input.parentElement.querySelector(".valid").style.opacity = "1";
    } else {
      input.classList.remove("valid-value");
      input.classList.add("not-valid-value");
      input.parentElement.querySelector(".valid").style.opacity = "0";
      input.parentElement.querySelector(".not-valid").style.opacity = "1";
    }
  });
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  infObj.fullName = fullName.value;
  infObj.email = email.value;
  infObj.password = password.value;
  let checkArray = [
    checkFullName(infObj.fullName),
    checkEmail(infObj.email),
    checkPassword(infObj.password),
  ];
  if (checkAll(checkArray)) {
    sessionStorage.setItem("Data", JSON.stringify(infObj));
    location.pathname = location.pathname.replace(
      "signup.html",
      "information.html"
    );
  }
});
