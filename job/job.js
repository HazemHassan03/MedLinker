import {
  domain,
  apiVersion,
  getAccessToken,
  checkAccess,
  fetchUserData,
  finish,
  logoutFunction,
} from "../constants.js";

let params = new URLSearchParams(location.search);
let jobId = params.get("id");

let userData;
let access = await checkAccess();
if (access === true) {
  let fetchData = await fetchUserData();
  if (fetchData) {
    userData = fetchData;
    console.log(userData);
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
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  return request;
}
let fetchJobRequest = await fetchJob();
if (fetchJobRequest.status == 200) {
  landing.remove();
  let jobDetails = await fetchJobRequest.json();
  console.log(jobDetails);
  let jobTitle = document.querySelector(".job-title"),
    companyName = document.querySelector(".company-name"),
    jobLocation = document.querySelector(".location"),
    vacancies = document.querySelector(".vacancies .value"),
    employmentType = document.querySelector(".employment-type .value"),
    jobType = document.querySelector(".job-type .value"),
    workplace = document.querySelector(".workplace .value"),
    jobDescription = document.querySelector(".job-description .value"),
    jobRequirements = document.querySelector(".job-requirements .value");
  jobTitle.textContent = jobDetails.title;
  companyName.innerHTML += jobDetails.company;
  jobLocation.innerHTML += `${jobDetails.location_country}, ${jobDetails.location_city}`;
  vacancies.textContent = jobDetails.number_of_vacancies;
  employmentType.textContent = jobDetails.position_type;
  jobType.textContent = jobDetails.job_type;
  workplace.textContent = jobDetails.work_place;
  jobDescription.textContent = jobDetails.description;
  jobRequirements.textContent = jobDetails.requirements;
} else if (fetchJobRequest.status == 404) {
  jobContainer.remove();
  jobFailed.remove();
} else {
  jobContainer.remove();
  jobNotFound.remove();
}
console.log(fetchJobRequest);

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout"),
  apply = document.querySelector(".apply");

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

logout.addEventListener("click", () => {
  logoutFunction();
});

async function jobApply() {
  let fetchResume = await fetch(userData.resume);
  let resume = await fetchResume.blob();
  console.log(resume);
  console.log(fetchResume);
  console.log(userData);
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
        applyData.append(`${key}`, resume);
      } else {
        applyData.append(`${key}`, userData[key]);
      }
    }
  }
  console.log(applyData.get("resume"));
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/jobs/${jobId}/application`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: applyData,
    }
  );
  return request;
}
if (apply) {
  apply.addEventListener("click", async () => {
    let jobApplyRequest = await jobApply();
    console.log(jobApplyRequest);
    console.log(await jobApplyRequest.json());
  });
}

document.body.style.overflow = "initial";
finish();
// let resume = document.querySelector(".resume .uploaded-resume");
// let resumeName = document.querySelector(".resume .uploaded-resume .name");
// resume.href = userData.resume;
// resumeName.textContent = userData.resume.split("/")[userData.resume.split("/").length - 1];
// console.log(resumeName);
