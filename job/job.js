import {
  domain,
  apiVersion,
  getAccessToken,
  storeNewAccess,
  checkAccess,
  fetchUserData,
  finish,
} from "../js/constants.js";

let params = new URLSearchParams(location.search);
let jobId = params.get("id");

let userData, jobDetails, url;
if (
  !document.cookie.includes("access") &&
  !document.cookie.includes("refresh")
) {
  let script = document.createElement("script");
  script.src = "not-login.js";
  script.type = "module";
  document.body.append(script);
} else {
  let access = await checkAccess();
  if (access === true) {
    let fetchData = await fetchUserData();
    if (fetchData) {
      userData = fetchData;
      if (userData.user.user_type === "company") {
        url = `https://api.${domain}/${apiVersion}/company/me/jobs/${jobId}`;
        document.querySelector(".not-found").textContent =
          "This job does not exist or is no longer available.";
      } else if (userData.user.user_type === "job_seeker") {
        url = `https://api.${domain}/${apiVersion}/jobs/${jobId}`;
        document.querySelector(".interview-questions").remove();
      }
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
  jobDetails = await fetchJobRequest.json();
  let jobTitle = document.querySelector(".job-title .value"),
    companyName = document.querySelector(".company-name .value"),
    country = document.querySelector(".location .country"),
    city = document.querySelector(".location .city"),
    vacancies = document.querySelector(".vacancies .value"),
    employmentType = document.querySelector(".employment-type .value"),
    jobType = document.querySelector(".job-type .value"),
    workplace = document.querySelector(".workplace .value"),
    jobDescription = document.querySelector(".job-description .value"),
    jobRequirements = document.querySelector(".job-requirements .value");
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
  companyName.textContent = jobDetails.company;
  country.textContent = jobDetails.location_country;
  city.textContent = jobDetails.location_city;
  vacancies.textContent = jobDetails.number_of_vacancies;
  employmentType.textContent = employmentTypeValue;
  jobType.textContent = jobTypeValue;
  workplace.textContent = workplaceValue;
  jobDescription.textContent = jobDetails.description;
  jobRequirements.textContent = jobDetails.requirements;
  if (userData.user.user_type === "job_seeker") {
    let script = document.createElement("script");
    script.src = "job-seeker.js";
    script.type = "module";
    document.body.append(script);
  } else if (userData.user.user_type === "company") {
    let script = document.createElement("script");
    script.src = "company.js";
    script.type = "module";
    document.body.append(script);
  }
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

let goBack = document.querySelector(".go-back");
goBack.addEventListener("click", () => {
  location.href = "../home/home.html";
});

export { userData, jobId, jobDetails };
