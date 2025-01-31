import {
  domain,
  apiVersion,
  maxCvSize,
  maxPhotoSize,
  showFileSize,
} from "../js/constants.js";

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
  container = document.querySelector(".body-container"),
  employeeForm = document.querySelector(".employee-form"),
  employeeSecondForm = document.querySelector(".employee-second-form"),
  companyForm = document.querySelector(".company-form"),
  back = document.querySelector("form .back"),
  allInputs = [
    ...document.querySelectorAll("input:not([type=submit], [type=file])"),
    ...document.querySelectorAll("select"),
  ],
  allEmployeeSecondInputs = [
    ...document.querySelectorAll(
      ".employee-second-form input:not([type=submit])"
    ),
    ...document.querySelectorAll(".employee-second-form select"),
  ],
  allEmployeeFirstInputs = [
    ...document.querySelectorAll(".employee-form input:not([type=submit])"),
    ...document.querySelectorAll(".employee-form select"),
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
  maxCv = document.querySelector(".max-cv-size"),
  maxPhoto = document.querySelector(".max-photo-size"),
  date = new Date(),
  employeeSubmit = document.getElementById("employee-submit"),
  companySubmit = document.getElementById("company-submit"),
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

for (let i = date.getFullYear() + 10; i >= date.getFullYear() - 50; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  option.setAttribute("value", i);
  graduation.append(option);
}

function checkUserNameMessage(input) {
  let check = checkInputValidation(input).check;
  if (input.value.length > 0) {
    if (check) {
      input.parentElement
        .querySelector(".not-valid")
        .classList.remove("active");
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
    }
  } else {
    input.parentElement.querySelector(".not-valid").classList.remove("active");
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
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
    }
  } else {
    input.parentElement.querySelector(".not-valid").classList.remove("active");
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
    } else {
      input.parentElement.querySelector(".not-valid").classList.add("active");
    }
  }
}
birthDaySelection.forEach((input) => {
  input.addEventListener("input", () => {
    checkBirthMessage(input);
  });
});

genderSelect.forEach((input) => {
  input.addEventListener("change", () => {
    checkedGender = document.querySelector("input[type=radio]:checked");
  });
});

console.log(allEmployeeFirstInputs);
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let check = checkAllInputsValidation(allEmployeeFirstInputs);
  if (check === true) {
    employeeForm.classList.add("finish");
    employeeSecondForm.classList.add("active");
  }
  console.log(check);
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

uploadButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.querySelector("input[type=file]").click();
  });
});
maxCv.textContent = maxCvSize.show;
maxPhoto.textContent = maxPhotoSize.show;
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
      console.log(input.files[0].size);
      input.parentElement.querySelector(".details .file-size").textContent =
        showFileSize(input.files[0].size);
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

function checkInputValidation(input) {
  let info = {
    input: input,
    name: input.name,
  };
  if (input.type === "text") {
    if (input.name === "email") {
      let regex = /.+@.+/i;
      if (regex.test(input.value)) {
        return true;
      } else {
        return false;
      }
    } else if (input.name === "username") {
      let regex = /^[a-z0-9]{8,}$/;
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
    } else {
      if (input.name == "education-other") {
        if (input.classList.contains("active")) {
          if (input.value.length > 1) {
            info.check = true;
          } else {
            info.check = false;
          }
        }
      } else {
        if (input.value.length > 1) {
          info.check = true;
        } else {
          info.check = false;
        }
      }
    }
  } else if (input.tagName === "SELECT") {
    console.log(input, input.value);
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
      if (input.value == 0) {
        info.check = false;
      } else if (input.value == "Other") {
        if (
          input.parentElement.querySelector("#education-other").value.length > 0
        ) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = true;
      }
    }
  } else if (input.type === "file") {
    let value = input.files[0];
    if (input.name === "cv") {
      if (value) {
        if (value.type === "application/pdf" && value.size <= maxCvSize.size) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = false;
      }
    } else if (input.name === "photo") {
      if (value) {
        if (value.type.startsWith("image") && value.size <= maxPhotoSize.size) {
          info.check = true;
        } else {
          info.check = false;
        }
      } else {
        info.check = false;
      }
    }
  } else if (input.type === "radio") {
    let search = document.querySelector(`input[name=${input.name}]:checked`);
    if (search) {
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
  }
  return info;
}
console.log(allEmployeeSecondInputs);
function checkAllInputsValidation(inputs) {
  console.log(inputs);
  let checks = [];
  inputs.forEach((input) => {
    checks.push(checkInputValidation(input));
  });
  let thereIsAFalse = checks.some((check) => {
    return check.check === false;
  });
  if (thereIsAFalse) {
    let findFalseElements = checks.filter((check) => {
      return check.check === false;
    });
    let falseElements = [];
    console.log(falseElements);
    for (let falseElement of findFalseElements) {
      falseElements.push(falseElement.input);
    }
    falseElements.forEach((element) => {
      console.log(element);
      if (element.parentElement.querySelector(".check-false")) {
        element.parentElement
          .querySelector(".check-false")
          .classList.add("active");
      } else {
        element.parentElement.parentElement
          .querySelector(".check-false")
          .classList.add("active");
      }
      element.addEventListener("input", () => {
        if (element.parentElement.querySelector(".check-false")) {
          element.parentElement
            .querySelector(".check-false")
            .classList.remove("active");
        } else {
          element.parentElement.parentElement
            .querySelector(".check-false")
            .classList.remove("active");
        }
      });
    });
    console.log(falseElements);
    return falseElements;
  } else {
    return true;
  }
}

function extractFormDataEntries(formData) {
  let entries = {};
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      entries[key] = value.name;
    } else {
      entries[key] = value;
    }
  }

  return entries;
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
async function fetchData(from, inputs) {
  let interval = setInterval(() => {
    from.setAttributeNode(document.createAttribute("disabled"));
  });
  if (checkAllInputsValidation(inputs) === true) {
    let formData = assignValues();
    console.log(extractFormDataEntries(formData));
    loadingMessage();
    let request = await fetch(`${domain}/${apiVersion}/auth/register`, {
      method: "POST",
      body: formData,
    });
    console.log(request);
    if (request) {
      removeLoadingMessage();
    }
    if (request.status === 201) {
      successMessage();
      clearSessionStorage();
    } else if (request.status === 400) {
      removeDisabled(interval);
      let json = await request.json();
      console.log(json);
      showFailedCauseMessage(request.status, Object.entries(json));
    } else {
      removeDisabled(interval);
      showFailedMessage(request.status);
    }
  } else {
    removeDisabled(interval);
  }
}
employeeSecondForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.submitter.tagName !== "BUTTON") {
    fetchData(employeeSubmit, allEmployeeSecondInputs);
  }
});

companyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData(companySubmit, allCompanyInputs);
});

closeErrorMessages.forEach((closeIcon) => {
  closeIcon.addEventListener("click", () => {
    closeIcon.parentElement.classList.remove("active");
    overlay.classList.remove("active");
  });
});
