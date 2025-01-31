import {
  domain,
  apiVersion,
  maxJobs,
  maxCvSize,
  showFileSize,
  getAccessToken,
  storeNewAccess,
  loading,
  finish,
  createMessage,
} from "../js/constants.js";
import { personalData } from "./profile.js";

let maxCV = document.querySelector(".user-card .cv .max-cv-size");
maxCV.textContent = maxCvSize.show;

let userInfCard = document.querySelector("section.user-card"),
  jobAppsWidget = document.querySelector("section.job-applications"),
  applicationsContainer = document.querySelector(
    "section.job-applications .applications"
  ),
  userInfFailed = document.querySelector(".profile-message.inf.failed"),
  noApps = document.querySelector(".profile-message.apps.no-apps"),
  appsFailed = document.querySelector(".profile-message.apps.failed");

let birthDay = document.querySelector("select#birth-day"),
  birthMonth = document.querySelector("select#birth-month"),
  birthYear = document.querySelector("select#birth-year"),
  yearsInput = document.querySelector("select#graduation"),
  date = new Date();
for (let i = 1; i <= 31; i++) {
  let option = document.createElement("option");
  if (i < 10) {
    option.append(document.createTextNode(`0${i}`));
    option.setAttribute("value", `0${i}`);
  } else {
    option.append(document.createTextNode(i));
    option.setAttribute("value", i);
  }
  birthDay.append(option);
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
  birthMonth.append(option);
}
for (let i = date.getFullYear(); i >= date.getFullYear() - 60; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  option.setAttribute("value", i);
  birthYear.append(option);
}
for (let i = date.getFullYear() + 10; i > date.getFullYear() - 50; i--) {
  let option = document.createElement("option");
  option.append(document.createTextNode(i));
  yearsInput.append(option);
}

let educationEditElement = document.querySelector(
    ".user-card .education select"
  ),
  educationOther = document.querySelector(
    ".user-card .education #education-other"
  );
educationEditElement.addEventListener("input", () => {
  if (educationEditElement.value == "Other") {
    educationOther.classList.add("active");
  } else {
    educationOther.classList.remove("active");
  }
});

userInfFailed.remove();
let userInfCon = document.querySelector(".user-card .user-inf"),
  fullName = userInfCon.querySelector(".full-name"),
  firstNameEdit = userInfCon.querySelector(".full-name.edit-mode input#fname"),
  lastNameEdit = userInfCon.querySelector(".full-name.edit-mode input#lname"),
  username = userInfCon.querySelector(".username .value"),
  usernameEdit = userInfCon.querySelector(".username.edit-mode .value"),
  email = userInfCon.querySelector(".email .value"),
  emailEdit = userInfCon.querySelector(".email.edit-mode .value"),
  phone = userInfCon.querySelector(".phone .value"),
  phoneEdit = userInfCon.querySelector(".phone.edit-mode input"),
  address = userInfCon.querySelector(".address .value"),
  addressEdit = userInfCon.querySelector(".address.edit-mode input"),
  gender = userInfCon.querySelector(".gender .value"),
  genderEdit = userInfCon.querySelector(".gender.edit-mode select"),
  jobTitle = userInfCon.querySelector(".job-title .value"),
  jobTitleEdit = userInfCon.querySelector(".job-title.edit-mode input"),
  birth = userInfCon.querySelector(".birth .value"),
  birthDayEdit = userInfCon.querySelector(".birth.edit-mode select#birth-day"),
  birthMonthEdit = userInfCon.querySelector(
    ".birth.edit-mode select#birth-month"
  ),
  birthYearEdit = userInfCon.querySelector(
    ".birth.edit-mode select#birth-year"
  ),
  level = userInfCon.querySelector(".level .value"),
  levelEdit = userInfCon.querySelector(".level.edit-mode select"),
  graduationYear = userInfCon.querySelector(".graduation .value"),
  graduationYearEdit = userInfCon.querySelector(".graduation.edit-mode select"),
  education = userInfCon.querySelector(".education .value"),
  educationEdit = userInfCon.querySelector(".education.edit-mode select"),
  experience = userInfCon.querySelector(".experience .value"),
  experienceYearsEdit = userInfCon.querySelector(
    ".experience.edit-mode input#experience-years"
  ),
  experienceMonthsEdit = userInfCon.querySelector(
    ".experience.edit-mode input#experience-months"
  ),
  jobType = userInfCon.querySelector(".job-type .value"),
  jobTypeEdit = userInfCon.querySelector(".job-type.edit-mode select"),
  military = userInfCon.querySelector(".military .value"),
  militaryEdit = userInfCon.querySelector(".military.edit-mode select"),
  showCV = document.querySelector(".user-card .cv .show"),
  cvNameValue = document.querySelector(".user-card .cv .file-name .value"),
  uploadCV = document.querySelector(".user-card .cv .upload"),
  cvInput = document.querySelector(".user-card .cv #cv"),
  fileInf = document.querySelector(".user-card .cv .file-inf"),
  fileName = document.querySelector(".user-card .cv .name .value"),
  fileSizeParent = document.querySelector(".user-card .cv .size"),
  fileSize = document.querySelector(".user-card .cv .size .value");

let fullNameValue = `${personalData.user.first_name} ${personalData.user.last_name}`,
  genderValue = personalData.gender == 1 ? "Male" : "Female",
  birthValue = personalData.birthdate.split("-").reverse().join(" / "),
  experienceValue = `${personalData.years_of_experience} year(s) and ${personalData.months_of_experience} month(s)`,
  jobTypeValue = `${personalData.job_type
    .split(" ")[0][0]
    .toUpperCase()}${personalData.job_type
    .split(" ")[0]
    .slice(1)} ${personalData.job_type
    .split(" ")[1][0]
    .toUpperCase()}${personalData.job_type.split(" ")[1].slice(1)}`,
  militaryValue = `${personalData.military_status[0].toUpperCase()}${personalData.military_status.slice(
    1
  )}`;
fullName.textContent = fullNameValue;
firstNameEdit.value = personalData.user.first_name;
lastNameEdit.value = personalData.user.last_name;
username.textContent = personalData.user.username;
usernameEdit.textContent = personalData.user.username;
email.textContent = personalData.user.email;
emailEdit.textContent = personalData.user.email;
phone.textContent = personalData.contact_number;
phoneEdit.value = personalData.contact_number;
address.textContent = personalData.location_city;
addressEdit.value = personalData.location_city;
gender.textContent = genderValue;
genderEdit.value = genderValue;
jobTitle.textContent = personalData.job_title;
jobTitleEdit.value = personalData.job_title;
birth.textContent = birthValue;
birth = personalData.birthdate.split("-");
birthDayEdit.value = birth[2];
birthMonthEdit.value = birth[1];
birthYearEdit.value = birth[0];
let levelValue;
if (+personalData.current_level <= 5) {
  levelValue = `Level ${personalData.current_level}`;
} else {
  levelValue = personalData.current_level;
}
if (levelValue === "graduated") levelValue = "Graduated";
level.textContent = levelValue;
levelEdit.value = levelValue;
graduationYear.textContent = personalData.graduation_year;
graduationYearEdit.value = personalData.graduation_year;
education.textContent = personalData.education;
let checkEducation = Array.from(educationEdit.querySelectorAll("option")).some(
  (value) => {
    return value.value == personalData.education;
  }
);
if (checkEducation) {
  educationEdit.value = personalData.education;
} else {
  educationOther.classList.add("active");
  educationOther.value = personalData.education;
}
experience.textContent = experienceValue;
experienceYearsEdit.value = personalData.years_of_experience;
experienceMonthsEdit.value = personalData.months_of_experience;
jobType.textContent = jobTypeValue;
jobTypeEdit.value = jobTypeValue;
military.textContent = militaryValue;
militaryEdit.value = militaryValue;
showCV.href = personalData.resume;
let resumeParams = new URL(personalData.resume);
let cvName =
  (cvNameValue.textContent =
  fileName.textContent =
    resumeParams.pathname.split("/").at(-1));
console.log(personalData);

function profileEditMode() {
  document
    .querySelectorAll(".user-card .view-mode")
    .forEach((el) => el.classList.add("hide"));
  document
    .querySelectorAll(".user-card .edit-mode")
    .forEach((el) => el.classList.remove("hide"));
}
function profileViewMode() {
  document
    .querySelectorAll(".user-card .view-mode")
    .forEach((el) => el.classList.remove("hide"));
  document
    .querySelectorAll(".user-card .edit-mode")
    .forEach((el) => el.classList.add("hide"));
}
profileViewMode();
let enableEditing = document.querySelector(".user-card .edit-inf");
enableEditing.addEventListener("click", profileEditMode);
let closeEditing = document.querySelector(".user-card .close-editing");
closeEditing.addEventListener("click", profileViewMode);

uploadCV.addEventListener("click", () => {
  cvInput.click();
});
cvInput.addEventListener("input", () => {
  if (cvInput.files[0]) {
    fileName.textContent = cvInput.files[0].name;
    fileSizeParent.classList.add("active");
    fileSize.textContent = showFileSize(cvInput.files[0].size);
  } else {
    fileName.textContent = cvName;
    fileSizeParent.classList.remove("active");
  }
});

function checkInput(input) {
  let check = {
    input: input,
    name: input.name,
  };
  if (input.type === "text") {
    if (input.value.length > 0) {
      check.result = true;
    } else {
      check.result = false;
    }
  } else if (input.type === "number") {
    if (input.value) {
      if (input.id == "experience-months") {
        if (input.value <= 11) {
          check.result = true;
        } else {
          check.result = false;
        }
      } else {
        check.result = true;
      }
    } else {
      check.result = false;
    }
  } else if (input.tagName === "SELECT") {
    if (input.value == 0) {
      check.result = false;
    } else if (input.value == "Other") {
      check.input = input.parentElement.querySelector(".other");
      if (input.parentElement.querySelector(".other").value.length > 0) {
        check.result = true;
      } else {
        check.result = false;
      }
    } else {
      check.result = true;
    }
  } else if (input.type === "file") {
    if (input.files[0]) {
      if (
        input.files[0].size <= maxCvSize.size &&
        input.files[0].type == "application/pdf"
      ) {
        check.result = true;
      } else {
        check.result = false;
      }
    } else {
      check.result = true;
    }
  }
  return check;
}
function checkAllRequired(inputs) {
  let checkArray = [];
  inputs.forEach((input) => {
    checkArray.push(checkInput(input));
  });
  let checkFalse = checkArray.some((check) => {
    return check.result === false;
  });
  if (checkFalse) {
    return checkArray;
  } else {
    return true;
  }
}
function finalCheck(inputs) {
  let checkArray = checkAllRequired(inputs);
  let falseInputs = [];
  for (let checkInput of checkArray) {
    if (checkInput.result === false) {
      falseInputs.push(checkInput.input);
    }
  }
  falseInputs.forEach((input) => {
    if (input.type == "file") {
      input.parentElement
        .querySelector("button.input")
        .classList.add("not-valid");
    } else {
      input.classList.add("not-valid");
    }
    input.addEventListener("input", () => {
      if (input.type == "file") {
        input.parentElement
          .querySelector("button.input")
          .classList.remove("not-valid");
      } else {
        input.classList.remove("not-valid");
      }
    });
  });
  return checkArray;
}

let allProfileEditInputs = [
  ...document.querySelectorAll(".user-card input:not([type=submit], .other)"),
  ...document.querySelectorAll(".user-card select"),
];
console.log(allProfileEditInputs);

function assignValues() {
  let formData = new FormData();
  let genderValue = {
    Male: 1,
    Female: 2,
  };
  let currentLevelValue = {
    "Level 1": "1",
    "Level 2": "2",
    "Level 3": "3",
    "Level 4": "4",
    "Level 5": "5",
    Graduated: "graduated",
  };
  let educationValue =
    educationEdit.value === "Other"
      ? educationOther.value
      : educationEdit.value;
  console.log(educationEdit, educationOther, education);
  if (firstNameEdit.value !== personalData.user.first_name)
    formData.append("user.first_name", firstNameEdit.value.trim());
  if (lastNameEdit.value !== personalData.user.last_name)
    formData.append("user.last_name", lastNameEdit.value.trim());
  if (phoneEdit.value !== personalData.contact_number)
    formData.append("contact_number", phoneEdit.value.trim());
  if (addressEdit.value !== personalData.location_city)
    formData.append("location_city", addressEdit.value.trim());
  if (genderValue[genderEdit.value] !== personalData.gender)
    formData.append("gender", genderValue[genderEdit.value]);
  console.log(genderValue, genderValue[genderEdit.value], personalData.gender);
  if (jobTitleEdit.value !== personalData.job_title)
    formData.append("job_title", jobTitleEdit.value.trim());
  if (
    `${birthYearEdit.value}-${birthMonthEdit.value}-${birthDayEdit.value}` !==
    personalData.birthdate
  )
    formData.append(
      "birthdate",
      `${birthYearEdit.value}-${birthMonthEdit.value}-${birthDayEdit.value}`
    );
  if (currentLevelValue[levelEdit.value] !== personalData.current_level)
    formData.append("current_level", currentLevelValue[levelEdit.value]);
  if (+graduationYearEdit.value !== personalData.graduation_year)
    formData.append("graduation_year", +graduationYearEdit.value);
  console.log(educationValue);
  console.log(personalData.education);
  if (educationValue !== personalData.education)
    formData.append("education", educationValue);
  if (+experienceYearsEdit.value !== personalData.years_of_experience)
    formData.append("years_of_experience", +experienceYearsEdit.value);
  if (+experienceMonthsEdit.value !== personalData.months_of_experience)
    formData.append("months_of_experience", +experienceMonthsEdit.value);
  if (jobTypeEdit.value.toLowerCase() !== personalData.job_type)
    formData.append("job_type", jobTypeEdit.value.toLowerCase());
  if (militaryEdit.value.toLowerCase() !== personalData.military_status)
    formData.append("military_status", militaryEdit.value.toLowerCase());
  if (cv.files[0]) {
    formData.append("resume", cv.files[0]);
  }
  return formData;
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

async function editProfile() {
  if (checkAllRequired(allProfileEditInputs) === true) {
    let formData = assignValues();
    console.log(Object.values(extractFormDataEntries(formData)).length);
    if (Object.values(extractFormDataEntries(formData)).length > 0) {
      console.log(extractFormDataEntries(formData));
      loading();
      let request = await fetch(`${domain}/${apiVersion}/users/jobseeker/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
        body: formData,
      });
      finish();
      if (request.status == 200) {
        createMessage(
          "success",
          undefined,
          "Your data has been successfully updated",
          "Close this message to see your updated data.",
          undefined,
          true
        );
      } else if (request.status == 401) {
        let check = await storeNewAccess();
        if (check === true) {
          await editProfile();
        } else {
          createMessage(
            "failed",
            undefined,
            "Something went wrong",
            "We're sorry about that. Please try again."
          );
        }
      } else {
        createMessage(
          "failed",
          undefined,
          "Something went wrong",
          "We're sorry about that. Please try again."
        );
      }
    } else {
      profileViewMode();
    }
  } else {
    console.log(finalCheck(allProfileEditInputs));
  }
}
let saveEditing = document.querySelector(".user-card input[type=submit]");
saveEditing.addEventListener("click", editProfile);
let params = new URLSearchParams(location.search);
let jobsPage = params.get("page");
let options = document.querySelector(
  "section.job-seeker-body .job-applications .options"
);
let showingDetails = document.querySelector(
  "section.job-seeker-body .job-applications .showing-details"
);
async function getApplications(url = `${domain}/${apiVersion}/applications`) {
  let request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 200) {
    let applicationsObj = await request.json();
    console.log(applicationsObj);
    let applications = applicationsObj.results;
    console.log(applications);
    if (applicationsObj.count <= maxJobs) {
      options.style.display = "none";
      showingDetails.style.display = "none";
    } else {
      let maxLength = maxJobs,
        to = maxLength,
        from = to - maxLength + 1;
      if (jobsPage) {
        to *= jobsPage;
        from = to - maxLength + 1;
      }
      if (to > applicationsObj.count) {
        to = applicationsObj.count;
      }
      let showing = showingDetails.querySelector(".showing"),
        count = showingDetails.querySelector(".count"),
        next = options.querySelector(".next"),
        back = options.querySelector(".back"),
        pages = options.querySelector(".pages");
      showing.textContent = `${from} - ${to}`;
      count.textContent = applicationsObj.count;
      if (applicationsObj.previous === null) {
        back.classList.add("disabled");
      }
      if (applicationsObj.next === null) {
        next.classList.add("disabled");
      }
      let currentPage = jobsPage ? +jobsPage : 1;
      let pagesCount = Math.ceil(applicationsObj.count / maxLength);
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i < 1) continue;
        let button = document.createElement("button");
        button.append(document.createTextNode(i));
        button.id = `page-${i}`;
        pages.append(button);
        if (i === pagesCount) break;
      }
      document.getElementById(`page-${currentPage}`).classList.add("active");
      next.addEventListener("click", () => {
        let nextPage = new URLSearchParams(
          new URL(applicationsObj.next).search
        ).get("page");
        params.set("page", nextPage);
        location.search = params.toString();
      });
      back.addEventListener("click", () => {
        let previousPage = new URLSearchParams(
          new URL(applicationsObj.previous).search
        ).get("page");
        if (previousPage === null) {
          previousPage = 1;
        }
        params.set("page", previousPage);
        location.search = params.toString();
      });
      let pagesButtons = pages.querySelectorAll("button");
      pagesButtons.forEach((button) => {
        button.addEventListener("click", () => {
          params.set("page", button.textContent);
          location.search = params.toString();
        });
      });
    }
    if (applications.length > 0) {
      noApps.remove();
      appsFailed.remove();
      for (let application of applications) {
        let jobTitleValue,
          at,
          regex = /\sat\s/i;
        let job = application.job;
        if (
          (job.company_id == 1 || job.company_id == 2) &&
          regex.test(job.title)
        ) {
          let split = job.title.split(regex);
          jobTitleValue = split[0];
          at = split[1];
        }
        let jobLocation = `${job.location_country}, ${job.location_city}`;
        let employmentType = `${job.position_type[0].toUpperCase()}${job.position_type.slice(
          1
        )}`;
        let jobType = `${job.job_type
          .split(" ")[0][0]
          .toUpperCase()}${job.job_type.split(" ")[0].slice(1)} ${job.job_type
          .split(" ")[1][0]
          .toUpperCase()}${job.job_type.split(" ")[1].slice(1)}`;
        let workplace = `${job.work_place[0].toUpperCase()}${job.work_place.slice(
          1
        )}`;
        if (workplace === "Onsite") {
          workplace = "On-site";
        }
        let jobTimestamp = new Date(job.posted_date);
        let jobTimeAgo = timeago.format(jobTimestamp);
        let appTimestamp = new Date(application.date_applied);
        let appTimeAgo = timeago.format(appTimestamp);
        let jobElement = `<div class="job-application">
                <a class="job-title" href="../job/job.html?id=${
                  job.id
                }" target="_blank"
                  >${jobTitleValue ? jobTitleValue : job.title}</a
                >
                <p class="post-date">${jobTimeAgo}</p>
                <p class="job-id">Job Id: ${job.id}</p>
                <p class="company-name">
                  <i class="fa-regular fa-building fa-fw"></i> ${
                    at ? at : job.company
                  }</p>
                <p class="location">
                  <i class="fa-solid fa-location-dot fa-fw"></i> ${jobLocation}
                </p>
                <p class="vacancies">
                  <i class="fa-regular fa-user fa-fw"></i>
                  <span class="title">Number Of Vacancies: </span>
                  <span class="value">${job.number_of_vacancies}</span>
                </p>
                <div class="job-inf">
                  <span class="employment-type">${employmentType}</span>
                  |
                  <span class="job-type">${jobType}</span>
                  |
                  <span class="workplace">${workplace}</span>
                </div>
                <p class="apply-date">Applied: ${appTimeAgo}</p>
              </div>`;
        applicationsContainer.insertAdjacentHTML("beforeend", jobElement);
      }
    } else {
      appsFailed.remove();
    }
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await getApplications();
    } else {
      options.style.display = "none";
      showingDetails.style.display = "none";
      noApps.remove();
    }
  } else {
    options.style.display = "none";
    showingDetails.style.display = "none";
    noApps.remove();
  }
  console.log(request);
}
if (jobsPage) {
  await getApplications(
    `${domain}/${apiVersion}/applications?page=${jobsPage}`
  );
} else {
  await getApplications();
}
finish();
