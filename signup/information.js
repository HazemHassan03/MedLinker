let infObj;
if (sessionStorage.getItem("Data")) {
  infObj = JSON.parse(sessionStorage.getItem("Data"));
} else {
  location.pathname = location.pathname.replace(
    "information.html",
    "signup.html"
  );
}

let choices = document.querySelector(".choices"),
  returnChoices = document.querySelector(".choices .return"),
  exitChoices = document.querySelector(".choices .exit"),
  companyChoice = document.querySelector(".company"),
  employerChoice = document.querySelector(".employer"),
  employerForm = document.querySelector(".employer-form"),
  employerSecondForm = document.querySelector(".employer-second-form"),
  companyForm = document.querySelector(".company-form"),
  back = document.querySelector("form .back"),
  submit = document.querySelector("form .submit"),
  firstName = document.getElementById("fname"),
  lastName = document.getElementById("lname"),
  userName = document.getElementById("username"),
  email = document.getElementById("email"),
  phoneNumber = document.getElementById("phone"),
  address = document.getElementById("address"),
  day = document.getElementById("day"),
  month = document.getElementById("month"),
  year = document.getElementById("year"),
  currentLevel = document.getElementById("level"),
  militaryStatus = document.getElementById("military"),
  birthDaySelection = document.querySelectorAll(".birth select"),
  graduation = document.getElementById("graduation"),
  genderSelect = document.querySelectorAll(".gender input[type=radio]"),
  checkedGender,
  next = document.querySelector(".next"),
  numberInputs = document.querySelectorAll("input[type=number]"),
  experienceMonths = document.getElementById("months"),
  jobType = document.getElementById("job-type"),
  date = new Date();

employerChoice.addEventListener("click", () => {
  choices.style.marginLeft = "-100%";
  companyForm.style.display = "none";
  employerForm.style.display = "block";
  setTimeout(() => {
    exitChoices.style.display = "initial";
  }, 300);
});
companyChoice.addEventListener("click", () => {
  choices.style.marginLeft = "-100%";
  employerForm.style.display = "none";
  companyForm.style.display = "block";
  exitChoices.style.display = "initial";
  setTimeout(() => {
    exitChoices.style.display = "initial";
  }, 300);
});
exitChoices.addEventListener("click", () => {
  choices.style.marginLeft = "-100%";
});
returnChoices.addEventListener("click", () => {
  choices.style.marginLeft = "0";
});

let nameArray = infObj.fullName.split(" ");
firstName.value = nameArray[0];
nameArray.shift();
lastName.value = nameArray.join(" ");
email.value = infObj.email;

setInterval(() => {
  firstName.setAttributeNode(document.createAttribute("readonly"));
  lastName.setAttributeNode(document.createAttribute("readonly"));
  email.setAttributeNode(document.createAttribute("readonly"));
});

for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
  } else {
    option.append(document.createTextNode(i));
  }
  day.append(option);
}

for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
  } else {
    option.append(document.createTextNode(i));
  }
  month.append(option);
}

for (let i = date.getFullYear(); i >= date.getFullYear() - 60; i--) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
  } else {
    option.append(document.createTextNode(i));
  }
  year.append(option);
}

for (let i = date.getFullYear() + 5; i >= date.getFullYear() - 50; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  graduation.append(option);
}

function checkUsernameValid(value) {
  let regex = /(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
}
userName.addEventListener("input", () => {
  let check = checkUsernameValid(userName.value);
  if (userName.value.length > 0) {
    if (!check) {
      userName.parentElement
        .querySelector(".not-valid")
        .classList.add("active");
    } else {
      userName.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
    }
  } else {
    userName.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

function checkPhone(value) {
  let regex = /\d{11}/;
  if (regex.test(value)) {
    return true;
  } else {
    return false;
  }
}
phoneNumber.addEventListener("input", () => {
  let check = checkPhone(phoneNumber.value);
  if (phoneNumber.value.length > 0) {
    if (!check) {
      phoneNumber.parentElement
        .querySelector(".not-valid")
        .classList.add("active");
    } else {
      phoneNumber.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
    }
  } else {
    phoneNumber.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

function checkDayMonth() {
  if (day.value > 0 && month.value > 0 && year.value > 0) {
    if (
      month.value == "04" ||
      month.value == "06" ||
      month.value == "09" ||
      month.value == "11"
    ) {
      if (day.value == "31") {
        return false;
      } else {
        return true;
      }
    } else if (month.value == "02") {
      if (day.value == "30" || day.value == "31") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

birthDaySelection.forEach((input) => {
  input.addEventListener("input", () => {
    let check = checkDayMonth();
    if (day.value > 0 && month.value > 0 && year.value > 0) {
      if (!check) {
        input.parentElement.querySelector(".not-valid").classList.add("active");
      } else {
        input.parentElement
          .querySelector(".not-valid")
          .classList.remove("active");
      }
    }
  });
});

function checkGraduation(value) {
  if (value == 0) {
    return false;
  } else {
    return true;
  }
}
graduation.addEventListener("input", () => {
  let check = checkGraduation(graduation.value);
  if (!check) {
    graduation.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
  } else {
    graduation.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

function checkLevel(value) {
  if (value == "0") {
    return false;
  } else {
    return true;
  }
}
currentLevel.addEventListener("input", () => {
  let check = checkMilitary(currentLevel.value);
  if (!check) {
    currentLevel.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
  } else {
    currentLevel.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

function checkMilitary(value) {
  if (value == "0") {
    return false;
  } else {
    return true;
  }
}
militaryStatus.addEventListener("input", () => {
  let check = checkMilitary(militaryStatus.value);
  if (!check) {
    militaryStatus.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
  } else {
    militaryStatus.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

function checkGender() {
  if (!checkedGender) {
    return false;
  } else {
    return true;
  }
}
genderSelect.forEach((input) => {
  input.addEventListener("change", () => {
    checkedGender = document.querySelector("input[type=radio]:checked");
  });
});

employerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  employerForm.classList.add("finish");
  employerSecondForm.classList.add("active");
});

back.addEventListener("click", (e) => {
  e.preventDefault();
  employerSecondForm.classList.remove("active");
  employerForm.classList.remove("finish");
});

setInterval(() => {
  numberInputs.forEach((input) => {
    input.setAttribute("min", "0");
  });
  experienceMonths.setAttribute("max", "12");
});

function checkJobType(value) {
  if (value == "0") {
    return false;
  } else {
    return true;
  }
}
jobType.addEventListener("input", () => {
  let check = checkMilitary(jobType.value);
  if (!check) {
    jobType.parentElement.querySelector(".not-valid").classList.add("active");
  } else {
    jobType.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
  }
});

employerSecondForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
