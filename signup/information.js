import { domain, apiVersion } from "../js/constants.js";

let infObj;
if (sessionStorage.getItem("Data")) {
  infObj = JSON.parse(sessionStorage.getItem("Data"));
} else {
  location.href = "../signup/signup.html";
}
if (JSON.parse(sessionStorage.getItem("Data")).comingFrom) {
  sessionStorage.removeItem("User Type");
  sessionStorage.removeItem("MedLinker Form");
  sessionStorage.removeItem("Active Messages");
  delete infObj.comingFrom;
  sessionStorage.setItem("Data", JSON.stringify(infObj));
}

let userType,
  choices = document.querySelector(".choices"),
  returnChoices = document.querySelector(".choices .return"),
  exitChoices = document.querySelector(".choices .exit"),
  companyChoice = document.querySelector(".company"),
  employeeChoice = document.querySelector(".employee"),
  container = document.querySelector(".container"),
  employeeForm = document.querySelector(".employee-form"),
  employeeSecondForm = document.querySelector(".employee-second-form"),
  companyForm = document.querySelector(".company-form"),
  back = document.querySelector("form .back"),
  allInputs = [
    ...document.querySelectorAll("input:not([type=submit], [type=file])"),
    ...document.querySelectorAll("select"),
  ],
  allEmployeeInputs = [
    ...document.querySelectorAll(".employee-form input:not([type=submit])"),
    ...document.querySelectorAll(
      ".employee-second-form input:not([type=submit])"
    ),
    ...document.querySelectorAll("select"),
  ],
  allCompanyInputs = [
    ...document.querySelectorAll(".company-form input:not([type=submit])"),
  ],
  firstName = document.querySelectorAll("input[name=fname]"),
  lastName = document.querySelectorAll("input[name=lname]"),
  employeeFirstName = document.getElementById("employee-fname"),
  employeeLastName = document.getElementById("employee-lname"),
  companyFirstName = document.getElementById("company-fname"),
  companyLastName = document.getElementById("company-lname"),
  email = document.querySelectorAll("input[name=email]"),
  employeeEmail = document.getElementById("employee-email"),
  companyEmail = document.getElementById("company-email"),
  userName = document.querySelectorAll("input[name=username]"),
  companyName = document.getElementById("company-name"),
  employeeUserName = document.getElementById("employee-username"),
  companyUserName = document.getElementById("company-username"),
  phoneNumber = document.querySelectorAll("input[name=phone]"),
  companyPhoneNumber = document.getElementById("company-phone"),
  employeePhoneNumber = document.getElementById("employee-phone"),
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
  numberInputs = document.querySelectorAll("input[type=number]"),
  jobTitle = document.getElementById("job-title"),
  education = document.getElementById("education"),
  educationOther = document.getElementById("education-other"),
  experienceYears = document.getElementById("years"),
  experienceMonths = document.getElementById("months"),
  jobType = document.getElementById("job-type"),
  cv = document.getElementById("cv"),
  photo = document.getElementById("photo"),
  uploadButtons = document.querySelectorAll(".upload button"),
  maxCvSize = 2,
  maxPhotoSize = 2,
  maxCv = document.querySelector(".max-cv-size"),
  maxPhoto = document.querySelector(".max-photo-size"),
  date = new Date(),
  employeeSubmit = document.getElementById("employee-submit"),
  companySubmit = document.getElementById("company-submit"),
  emptyMessage = document.querySelector(".empty-message"),
  notValidMessage = document.querySelector(".not-valid-message"),
  failedMessage = document.querySelector(".failed-message"),
  failedCauseMessage = document.querySelector(".failed-cause-message"),
  closeErrorMessages = document.querySelectorAll(
    ".message:not(.success-message) i"
  ),
  success = document.querySelector(".success-message"),
  loading = document.querySelector(".loading"),
  overlay = document.querySelector(".overlay");

function employeeMode() {
  choices.style.marginLeft = "-100%";
  companyForm.style.display = "none";
  employeeForm.style.display = "block";
  employeeSecondForm.style.display = "block";
  setTimeout(() => {
    returnChoices.style.display = "flex";
    exitChoices.style.display = "initial";
  }, 300);
  userType = "job-seeker";
  sessionStorage.setItem("User Type", userType);
}
employeeChoice.addEventListener("click", () => {
  employeeMode();
});
function companyMode() {
  choices.style.marginLeft = "-100%";
  employeeForm.style.display = "none";
  employeeSecondForm.style.display = "none";
  companyForm.style.display = "block";
  setTimeout(() => {
    returnChoices.style.display = "flex";
    exitChoices.style.display = "initial";
  }, 300);
  userType = "company";
  sessionStorage.setItem("User Type", userType);
}
companyChoice.addEventListener("click", () => {
  companyMode();
});
exitChoices.addEventListener("click", () => {
  choices.style.marginLeft = "-100%";
  setTimeout(() => {
    returnChoices.style.display = "flex";
  }, 300);
});
returnChoices.addEventListener("click", () => {
  choices.style.marginLeft = "0";
  setTimeout(() => {
    returnChoices.style.display = "none";
  }, 200);
});
if (sessionStorage.getItem("User Type")) {
  userType = sessionStorage.getItem("User Type");
}
if (userType) {
  if (userType === "job-seeker") {
    employeeMode();
  } else if (userType === "company") {
    companyMode();
  }
}

let nameArray = infObj.fullName.split(" ");
let firstNameValue = nameArray[0];
firstName.forEach((input) => {
  input.value = firstNameValue;
});
nameArray.shift();
let lastNameValue = nameArray.join(" ");
lastName.forEach((input) => {
  input.value = lastNameValue;
});
email.forEach((input) => {
  input.value = infObj.email;
});

setInterval(() => {
  firstName.forEach((input) => {
    input.setAttributeNode(document.createAttribute("readonly"));
  });
  lastName.forEach((input) => {
    input.setAttributeNode(document.createAttribute("readonly"));
  });
  email.forEach((input) => {
    input.setAttributeNode(document.createAttribute("readonly"));
  });
});

for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
    option.setAttribute("value", `0${i}`);
  } else {
    option.append(document.createTextNode(i));
    option.setAttribute("value", i);
  }
  day.append(option);
}

for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
    option.setAttribute("value", `0${i}`);
  } else {
    option.append(document.createTextNode(i));
    option.setAttribute("value", i);
  }
  month.append(option);
}

for (let i = date.getFullYear(); i >= date.getFullYear() - 60; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  option.setAttribute("value", i);
  year.append(option);
}

for (let i = date.getFullYear() + 5; i >= date.getFullYear() - 50; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  option.setAttribute("value", i);
  graduation.append(option);
}

if (!sessionStorage.getItem("Active Messages")) {
  let activeMessages = {};
  sessionStorage.setItem("Active Messages", JSON.stringify(activeMessages));
} else {
  let ids = Object.values(
    JSON.parse(sessionStorage.getItem("Active Messages"))
  );
  for (let id of ids) {
    document.getElementById(id).classList.add("active");
  }
}
function addActiveMessage(input, name = input.id) {
  let object = JSON.parse(sessionStorage.getItem("Active Messages"));
  object[name] = input.parentElement.querySelector(".not-valid").id;
  sessionStorage.setItem("Active Messages", JSON.stringify(object));
}
function deleteActiveMessage(input, name = input.id) {
  let object = JSON.parse(sessionStorage.getItem("Active Messages"));
  delete object[name];
  sessionStorage.setItem("Active Messages", JSON.stringify(object));
}

function checkUserNameMessage(input) {
  let check = checkInputValidation(input).check;
  if (input.value.length > 0) {
    if (check) {
      input.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
      deleteActiveMessage(input);
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
      addActiveMessage(input);
    }
  } else {
    input.parentElement.querySelector(".not-valid").classList.remove("active");
    deleteActiveMessage(input);
  }
}
userName.forEach((input) => {
  input.addEventListener("input", () => {
    checkUserNameMessage(input);
  });
});

function checkPhoneMessage(input) {
  let check = checkInputValidation(input).check;
  if (input.value.length > 0) {
    if (check) {
      input.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
      deleteActiveMessage(input);
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
      addActiveMessage(input);
    }
  } else {
    input.parentElement.querySelector(".not-valid").classList.remove("active");
    deleteActiveMessage(input);
  }
}
phoneNumber.forEach((input) => {
  input.addEventListener("input", () => {
    checkPhoneMessage(input);
  });
});

function checkBirthMessage(input) {
  let check = checkInputValidation(input).check;
  if (day.value > 0 && month.value > 0 && year.value > 0) {
    if (check) {
      input.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
      deleteActiveMessage(input, "birth");
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
      addActiveMessage(input, "birth");
    }
  }
}
birthDaySelection.forEach((input) => {
  input.addEventListener("input", () => {
    checkBirthMessage(input);
  });
});

function checkGraduationMessage() {
  let check = checkInputValidation(graduation).check;
  if (check) {
    graduation.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
    deleteActiveMessage(graduation);
  } else {
    graduation.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
    addActiveMessage(graduation);
  }
}
graduation.addEventListener("input", () => {
  checkGraduationMessage();
});

function checkLevelMessage() {
  let check = checkInputValidation(currentLevel).check;
  if (check) {
    currentLevel.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
    deleteActiveMessage(currentLevel);
  } else {
    currentLevel.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
    addActiveMessage(currentLevel);
  }
}
currentLevel.addEventListener("input", () => {
  checkLevelMessage();
});

function checkMilitaryMessage() {
  let check = checkInputValidation(militaryStatus).check;
  if (check) {
    militaryStatus.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
    deleteActiveMessage(militaryStatus);
  } else {
    militaryStatus.parentElement
      .querySelector(".not-valid")
      .classList.add("active");
    addActiveMessage(militaryStatus);
  }
}
militaryStatus.addEventListener("input", () => {
  checkMilitaryMessage();
});

genderSelect.forEach((input) => {
  input.addEventListener("change", () => {
    checkedGender = document.querySelector("input[type=radio]:checked");
  });
});

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  employeeForm.classList.add("finish");
  employeeSecondForm.classList.add("active");
  container.scrollTo({
    top: 0,
  });
});

back.addEventListener("click", () => {
  employeeSecondForm.classList.remove("active");
  employeeForm.classList.remove("finish");
  container.scrollTo({
    top: 0,
  });
});

setInterval(() => {
  numberInputs.forEach((input) => {
    input.setAttribute("min", "0");
  });
  experienceMonths.setAttribute("max", "12");
});

education.addEventListener("input", () => {
  if (education.value === "Other") {
    educationOther.classList.add("active");
  } else {
    educationOther.classList.remove("active");
  }
});

function checkJobTypeMessage() {
  let check = checkInputValidation(jobType).check;
  if (check) {
    jobType.parentElement
      .querySelector(".not-valid")
      .classList.remove("active");
    deleteActiveMessage(jobType);
  } else {
    jobType.parentElement.querySelector(".not-valid").classList.add("active");
    addActiveMessage(jobType);
  }
}
jobType.addEventListener("input", () => {
  checkJobTypeMessage();
});

uploadButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.querySelector("input[type=file]").click();
  });
});
maxCv.textContent = `${maxCvSize}MB`;
maxPhoto.textContent = `${maxPhotoSize}MB`;
// function convertSizeIntoMB(size) {
//   return size / Math.pow(1024, 2);
// }
// function convertSizeIntoKB(size) {
//   return size / 1024;
// }
function process(input) {
  if (input.files[0]) {
    input.parentElement.querySelector(".not-found").classList.remove("active");
    let check = checkInputValidation(input).check;
    if (check) {
      input.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
      input.parentElement.querySelector(".details").classList.add("active");
      input.parentElement.querySelector(".details .file-name").textContent =
        input.files[0].name;
      input.parentElement.querySelector(".details .file-size").textContent =
        input.files[0].size < 1000
          ? `${input.files[0].size.toFixed(2)}Byte`
          : input.files[0].size >= 1000 && input.files[0].size < 1e6
          ? `${(input.files[0].size / 1000).toFixed(2)}KB`
          : input.files[0].size >= 1e6 && input.files[0].size < 1e9
          ? `${(input.files[0].size / 1e6).toFixed(2)}MB`
          : "";
    } else {
      input.parentElement.querySelector(".details").classList.remove("active");
      input.parentElement.querySelector(".not-valid").classList.add("active");
    }
  } else {
    input.parentElement.querySelector(".details").classList.remove("active");
    input.parentElement.querySelector(".not-valid").classList.remove("active");
    input.parentElement.querySelector(".not-found").classList.add("active");
  }
}
cv.addEventListener("input", (e) => {
  process(e.target);
});
photo.addEventListener("input", (e) => {
  process(e.target);
});

function checkEmpty(input) {
  let info = {
    input: input,
    name: input.name,
  };
  if (input.type === "text") {
    if (input.name === "education-other") {
      info.check = true;
    } else {
      if (input.value.length > 0) {
        info.check = true;
      } else {
        info.check = false;
      }
    }
  } else if (input.tagName === "SELECT") {
    if (input.value == 0) {
      info.check = false;
    } else {
      if (input.name === "education" && input.value === "Other") {
        if (educationOther.value.length > 0) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = true;
      }
    }
  } else if (input.type === "radio") {
    if (document.querySelector(`input[name="${input.name}"]:checked`)) {
      info.check = true;
    } else {
      info.check = false;
    }
  } else if (input.type === "number") {
    if (input.value) {
      info.check = true;
    } else {
      info.check = false;
    }
  } else if (input.type === "file") {
    if (input.files[0]) {
      info.check = true;
    } else {
      info.check = false;
      // if (input.name === "cv") {
      //   if (currentLevel.value === "Graduated") {
      //     info.check = false;
      //   } else {
      //     info.check = true;
      //   }
      // } else {
      //   info.check = false;
      // }
    }
  }
  return info;
}
function checkAllEmpty() {
  let checks = [];
  if (userType === "job-seeker") {
    allEmployeeInputs.forEach((input) => {
      checks.push(checkEmpty(input));
    });
  } else if (userType === "company") {
    allCompanyInputs.forEach((input) => {
      checks.push(checkEmpty(input));
    });
  } else {
    return false;
  }
  let thereIsAFalse = checks.some((check) => {
    return check.check === false;
  });
  if (thereIsAFalse) {
    let findFalseElements = checks.filter((check) => {
      return check.check === false;
    });
    let falseElements = [];
    for (let falseElement of findFalseElements) {
      falseElements.push(falseElement.input);
    }
    falseElements.forEach((element) => {
      if (element.parentElement.classList.contains(element.name)) {
        element.parentElement
          .querySelector(".check-false")
          .classList.add("active");
        element.addEventListener("input", () => {
          element.parentElement
            .querySelector(".check-false")
            .classList.remove("active");
        });
        if (element.name === "education") {
          educationOther.addEventListener("input", () => {
            educationOther.parentElement.parentElement
              .querySelector(".check-false")
              .classList.remove("active");
          });
        }
      } else {
        element.parentElement.parentElement
          .querySelector(".check-false")
          .classList.add("active");
        element.addEventListener("input", () => {
          element.parentElement.parentElement
            .querySelector(".check-false")
            .classList.remove("active");
        });
      }
    });
    return falseElements;
  } else {
    return true;
  }
}
function checkInputValidation(input) {
  let info = {
    input: input,
    name: input.name,
  };
  if (input.type === "text") {
    if (input.name === "fname") {
      if (input.value === firstNameValue) {
        info.check = true;
      } else {
        info.check = false;
      }
    } else if (input.name === "lname") {
      if (input.value === lastNameValue) {
        info.check = true;
      } else {
        info.check = false;
      }
    } else if (input.name === "email") {
      if (input.value === infObj.email) {
        info.check = true;
      } else {
        info.check = false;
      }
    } else if (input.name === "username") {
      let regex = /^[a-zA-Z0-9]{8,}$/;
      if (regex.test(input.value)) {
        info.check = true;
      } else {
        info.check = false;
      }
    } else if (input.name === "phone") {
      let regex = /^(010|011|012|015)\d{8}$/;
      if (regex.test(input.value)) {
        info.check = true;
      } else {
        info.check = false;
      }
    }
  } else if (input.tagName === "SELECT") {
    if (input.parentElement.id === "birth") {
      if (day.value > 0 && month.value > 0 && year.value > 0) {
        if (
          month.value == "04" ||
          month.value == "06" ||
          month.value == "09" ||
          month.value == "11"
        ) {
          if (day.value == "31") {
            info.check = false;
          } else {
            info.check = true;
          }
        } else if (month.value == "02") {
          if (day.value == "30" || day.value == "31") {
            info.check = false;
          } else {
            info.check = true;
          }
        } else {
          info.check = true;
        }
      } else {
        info.check = false;
      }
    } else {
      info.check = true;
    }
  } else if (input.type === "file") {
    let value = input.files[0];
    if (input.name === "cv") {
      if (value) {
        if (value.type === "application/pdf" && value.size / 1e6 <= maxCvSize) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = false;
        // if (currentLevel.value === "Graduated") {
        //   info.check = false;
        // } else {
        //   info.check = true;
        // }
      }
    } else if (input.name === "photo") {
      if (value) {
        if (
          value.type.startsWith("image") &&
          value.size / 1e6 <= maxPhotoSize
        ) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = false;
      }
    }
  }
  return info;
}
function checkAllInputsValidation() {
  let checks = [];
  if (userType === "job-seeker") {
    allEmployeeInputs.forEach((input) => {
      checks.push(checkInputValidation(input));
    });
  } else if (userType === "company") {
    allCompanyInputs.forEach((input) => {
      checks.push(checkInputValidation(input));
    });
  } else {
    return false;
  }
  let thereIsAFalse = checks.some((check) => {
    return check.check === false;
  });
  if (thereIsAFalse) {
    let findFalseElements = checks.filter((check) => {
      return check.check === false;
    });
    let falseElements = [];
    for (let falseElement of findFalseElements) {
      falseElements.push(falseElement.input);
    }
    falseElements.forEach((element) => {
      element.parentElement
        .querySelector(".check-false")
        .classList.add("active");
      element.addEventListener("input", () => {
        element.parentElement
          .querySelector(".check-false")
          .classList.remove("active");
      });
    });
    return falseElements;
  } else {
    return true;
  }
}

function assignValues() {
  let formData = new FormData();
  let currentLevelValue = {
    "Level 1": "1",
    "Level 2": "2",
    "Level 3": "3",
    "Level 4": "4",
    "Level 5": "5",
    Graduated: "graduated",
  };
  let genderValue = {
    Male: "1",
    Female: "2",
  };
  let educationValue =
    education.value === "Other" ? educationOther.value : education.value;
  if (userType === "job-seeker") {
    formData.append("user.username", employeeUserName.value.trim());
    formData.append("user.password", infObj.password);
    formData.append("user.first_name", employeeFirstName.value.trim());
    formData.append("user.last_name", employeeLastName.value.trim());
    formData.append("user.email", employeeEmail.value.trim());
    formData.append("user.user_type", "job_seeker");
    formData.append("resume", cv.files[0]);
    formData.append("id_card", photo.files[0]);
    formData.append("education", educationValue);
    formData.append("birthdate", `${year.value}-${month.value}-${day.value}`);
    formData.append("location_city", address.value.trim());
    formData.append("job_title", jobTitle.value.trim());
    formData.append("years_of_experience", experienceYears.value);
    formData.append("months_of_experience", experienceMonths.value);
    formData.append("gender", genderValue[checkedGender.value]);
    formData.append("contact_number", employeePhoneNumber.value.trim());
    formData.append("current_level", currentLevelValue[currentLevel.value]);
    formData.append("military_status", militaryStatus.value.toLowerCase());
    formData.append("job_type", jobType.value.toLowerCase());
    formData.append("graduation_year", graduation.value);
  } else if (userType === "company") {
    formData.append("user.username", companyUserName.value.trim());
    formData.append("user.password", infObj.password);
    formData.append("user.first_name", companyFirstName.value.trim());
    formData.append("user.last_name", companyLastName.value.trim());
    formData.append("user.email", companyEmail.value.trim());
    formData.append("user.user_type", "company");
    formData.append("company_name", companyName.value.trim());
    formData.append("phone_number", companyPhoneNumber.value.trim());
  } else {
    return false;
  }
  return formData;
}

if (!sessionStorage.getItem("MedLinker Form")) {
  let sessionStorageObject = {};
  sessionStorage.setItem(
    "MedLinker Form",
    JSON.stringify(sessionStorageObject)
  );
}
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    let object = JSON.parse(sessionStorage.getItem("MedLinker Form"));
    if (input.type === "radio") {
      object[input.name] = input.value;
    } else {
      object[input.id] = input.value;
    }
    sessionStorage.setItem("MedLinker Form", JSON.stringify(object));
  });
});
function fillValues() {
  allInputs.forEach((input) => {
    if (sessionStorage.getItem("MedLinker Form")) {
      let object = JSON.parse(sessionStorage.getItem("MedLinker Form"));
      if (object[input.id]) {
        if (input.tagName === "SELECT") {
          document
            .querySelector(
              `select[name=${input.id}] option[value="${object[input.id]}"]`
            )
            .setAttributeNode(document.createAttribute("selected"));
          if (input.id === "education") {
            if (object[input.id] === "Other") {
              educationOther.classList.add("active");
            }
          }
        } else {
          input.value = object[input.id];
        }
      } else if (object[input.name]) {
        if (input.type === "radio") {
          document
            .querySelector(`input[value="${object[input.name]}"]`)
            .setAttributeNode(document.createAttribute("checked"));
          checkedGender = document.querySelector("input[type=radio]:checked");
        }
      }
    }
  });
}
fillValues();

function showEmptyMessage() {
  emptyMessage.classList.add("active");
  overlay.classList.add("active");
}
function showNotValidMessage() {
  notValidMessage.classList.add("active");
  overlay.classList.add("active");
}
function showFailedMessage(status) {
  let anotherMessages = failedMessage.querySelector(".another-messages");
  failedMessage.classList.add("active");
  overlay.classList.add("active");
  Array.from(anotherMessages.children).forEach((e) => {
    e.remove();
  });
  if (status) {
    let p = document.createElement("p");
    let pText = document.createTextNode(`Error Code: ${status}`);
    p.append(pText);
    p.classList.add("error-code");
    anotherMessages.append(p);
  }
}
function showFailedCauseMessage(status, messages) {
  let anotherMessages = failedCauseMessage.querySelector(".another-messages");
  failedCauseMessage.classList.add("active");
  overlay.classList.add("active");
  Array.from(anotherMessages.children).forEach((e) => {
    e.remove();
  });
  if (status) {
    let p = document.createElement("p");
    let pText = document.createTextNode(`Error Code: ${status}`);
    p.append(pText);
    p.classList.add("error-code");
    anotherMessages.append(p);
  }
  for (let message of messages) {
    let msg;
    if (message[0] === "user") {
      msg = Object.entries(message[1])[0];
    } else {
      msg = message;
    }
    let p = document.createElement("p");
    let pText = document.createTextNode(msg.join(": "));
    p.append(pText);
    p.classList.add(msg[0]);
    anotherMessages.append(p);
  }
}
function loadingMessage() {
  loading.classList.add("active");
  overlay.classList.add("active");
}
function removeLoadingMessage() {
  loading.classList.remove("active");
  overlay.classList.remove("active");
}
function successMessage() {
  if (userType === "job-seeker") {
    let loginLink = success.querySelector("a");
    loginLink.href = "../home/home.html";
    loginLink.textContent = "Explore Jobs";
  }
  success.classList.add("active");
  overlay.classList.add("active");
}
function removeDisabled(interval) {
  clearInterval(interval);
  if (userType === "job-seeker") {
    employeeSubmit.removeAttribute("disabled");
  } else if (userType === "company") {
    companySubmit.removeAttribute("disabled");
  }
}
function clearSessionStorage() {
  sessionStorage.removeItem("User Type");
  sessionStorage.removeItem("MedLinker Form");
  sessionStorage.removeItem("Active Messages");
  sessionStorage.removeItem("Data");
}
async function fetchData(from) {
  let interval = setInterval(() => {
    from.setAttributeNode(document.createAttribute("disabled"));
  });
  if (checkAllEmpty() === true) {
    if (checkAllInputsValidation() === true) {
      let formData = assignValues();
      loadingMessage();
      let request = await fetch(
        `https://api.${domain}/${apiVersion}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (request) {
        removeLoadingMessage();
      }
      if (request.status === 201) {
        successMessage();
        clearSessionStorage();
      } else if (request.status === 400) {
        removeDisabled(interval);
        let json = await request.json();
        showFailedCauseMessage(request.status, Object.entries(json));
      } else {
        removeDisabled(interval);
        showFailedMessage(request.status);
      }
    } else {
      removeDisabled(interval);
      showNotValidMessage();
    }
  } else {
    removeDisabled(interval);
    showEmptyMessage();
  }
}
employeeSecondForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.submitter.tagName !== "BUTTON") {
    fetchData(employeeSubmit);
  }
});

companyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData(companySubmit);
});

closeErrorMessages.forEach((closeIcon) => {
  closeIcon.addEventListener("click", () => {
    closeIcon.parentElement.classList.remove("active");
    overlay.classList.remove("active");
  });
});
