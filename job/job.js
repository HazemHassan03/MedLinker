import {
  domain,
  apiVersion,
  getAccessToken,
  storeNewAccess,
  checkAccess,
  fetchUserData,
  loading,
  finish,
  logoutFunction,
  createMessage,
} from "../constants.js";

let params = new URLSearchParams(location.search);
let jobId = params.get("id");

let userData;
let access = await checkAccess();
if (access === true) {
  let fetchData = await fetchUserData();
  if (fetchData) {
    userData = fetchData;
    if (userData.user.user_type === "job_seeker") {
      let applyElement = `<button class="apply">Apply</button>`;
      document
        .querySelector(".job .container")
        .insertAdjacentHTML("beforeend", applyElement);
    }
  }
}

let landing = document.querySelector(".landing");
let jobNotFound = document.querySelector(".job-message.not-found");
let jobFailed = document.querySelector(".job-message.failed");
let jobContainer = document.querySelector(".job");
async function fetchJob() {
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/jobs/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );
  return request;
}
let fetchJobRequest = await fetchJob();
if (fetchJobRequest.status == 200) {
  landing.remove();
  let jobDetails = await fetchJobRequest.json();
  let jobTitle = document.querySelector(".job-title"),
    jobId = document.querySelector(".job-id"),
    companyName = document.querySelector(".company-name"),
    jobLocation = document.querySelector(".location"),
    vacancies = document.querySelector(".vacancies .value"),
    employmentType = document.querySelector(".employment-type .value"),
    jobType = document.querySelector(".job-type .value"),
    workplace = document.querySelector(".workplace .value"),
    jobDescription = document.querySelector(".job-description .value"),
    jobRequirements = document.querySelector(".job-requirements .value");
  let jobLocationValue = `${jobDetails.location_country}, ${jobDetails.location_city}`;
  let employmentTypeValue = `${jobDetails.position_type[0].toUpperCase()}${jobDetails.position_type.slice(
    1
  )}`;
  let jobTypeValue = `${jobDetails.job_type
    .split(" ")[0][0]
    .toUpperCase()}${jobDetails.job_type
    .split(" ")[0]
    .slice(1)} ${jobDetails.job_type
    .split(" ")[1][0]
    .toUpperCase()}${jobDetails.job_type.split(" ")[1].slice(1)}`;
  let workplaceValue = `${jobDetails.work_place[0].toUpperCase()}${jobDetails.work_place.slice(
    1
  )}`;
  if (workplaceValue === "Onsite") {
    workplaceValue = "On-site";
  }
  document.title = jobDetails.title;
  jobTitle.textContent = jobDetails.title;
  jobId.textContent += jobDetails.id;
  companyName.innerHTML += jobDetails.company;
  jobLocation.innerHTML += jobLocationValue;
  vacancies.textContent = jobDetails.number_of_vacancies;
  employmentType.textContent = employmentTypeValue;
  jobType.textContent = jobTypeValue;
  workplace.textContent = workplaceValue;
  jobDescription.textContent = jobDetails.description;
  jobRequirements.textContent = jobDetails.requirements;
} else if (fetchJobRequest.status == 404) {
  jobContainer.remove();
  jobFailed.remove();
} else if (fetchJobRequest.status == 401) {
  let check = await storeNewAccess();
  if (check === true) {
    await fetchJob();
  }
} else {
  jobContainer.remove();
  jobNotFound.remove();
}

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout"),
  apply = document.querySelector(".apply"),
  closeApplicationFormBox = document.querySelector(".application .close"),
  applicationFormBox = document.querySelector(".application"),
  applicationForm = document.querySelector(".application-form"),
  resumeInput = document.getElementById("resume"),
  resumeButton = document.querySelector(".application-form .upload-resume"),
  fileDetails = document.querySelector(".application-form .resume .details"),
  fileDetailsName = document.querySelector(
    ".application-form .resume .details .file-name"
  ),
  fileDetailsSize = document.querySelector(
    ".application-form .resume .details .file-size"
  ),
  fileNotValid = document.querySelector(".application-form .resume .not-valid"),
  overlay = document.querySelector(".overlay");

account.addEventListener("click", () => {
  navList.classList.toggle("active");
  if (navList.classList.contains("active")) {
    accountIcon.className = accountIcon.className.replace("down", "up");
  } else {
    accountIcon.className = accountIcon.className.replace("up", "down");
  }
  // document.addEventListener("click", (e) => {
  //   if (
  //     e.target !== navList &&
  //     e.target.parentElement.parentElement !== account &&
  //     e.target.parentElement !== account &&
  //     e.target !== account
  //   ) {
  //     navList.classList.remove("active");
  //     accountIcon.className = accountIcon.className.replace("up", "down");
  //   }
  // });
});

logout.addEventListener("click", () => {
  logoutFunction();
});

async function jobApply() {
  let applyData = new FormData();
  let userDataKeys = Object.keys(userData);
  for (let key of userDataKeys) {
    if (key === "user") {
      let userDataKeys = Object.keys(userData[key]);
      for (let key of userDataKeys) {
        applyData.append(`user.${key}`, userData.user[key]);
      }
    } else {
      if (key === "resume") {
        applyData.append(`${key}`, resumeInput.files[0]);
      } else {
        applyData.append(`${key}`, userData[key]);
      }
    }
  }
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/jobs/${jobId}/application`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: applyData,
    }
  );
  finish();
  return request;
}
function checkResume(file) {
  if (file) {
    if (file.type === "application/pdf" && file.size <= 2000000) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function fileSize(size) {
  let returnedSize;
  if (size < 1000) {
    returnedSize = `${size} Byte`;
  } else if (size >= 1000 && size < 1000000) {
    returnedSize = `${(size / 1000).toFixed(2)} KB`;
  } else {
    returnedSize = `${(size / 1000000).toFixed(2)} MB`;
  }
  return returnedSize;
}
resumeInput.addEventListener("input", () => {
  fileNotValid.classList.remove("active");
  fileDetailsName.textContent = resumeInput.files[0].name;
  fileDetailsSize.textContent = fileSize(resumeInput.files[0].size);
  fileDetails.classList.add("active");
});
resumeButton.addEventListener("click", () => {
  resumeInput.click();
});
applicationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.submitter.tagName !== "BUTTON") {
    if (checkResume(resumeInput.files[0])) {
      let jobApplyRequest = await jobApply();
      let json = await jobApplyRequest.json();
      if (jobApplyRequest.status == 201) {
        createMessage(
          "success",
          applicationFormBox,
          "تم التقديم بنجاح",
          "انتظر حتى يتم التواصل معك"
        );
      } else if (jobApplyRequest.status == 400) {
        createMessage(
          "failed",
          applicationFormBox,
          "لم يتم التقديم بنجاح",
          undefined,
          json
        );
      } else if (jobApplyRequest.status == 401) {
        let check = await storeNewAccess();
        if (check === true) {
          await jobApply();
        }
      } else {
        createMessage(
          "failed",
          applicationFormBox,
          "لم يتم التقديم بنجاح",
          "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
        );
      }
    } else {
      fileNotValid.classList.add("active");
    }
  }
});
if (apply) {
  apply.addEventListener("click", () => {
    applicationFormBox.classList.add("active");
    overlay.classList.add("active");
    closeApplicationFormBox.addEventListener("click", () => {
      applicationFormBox.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
}

finish();
