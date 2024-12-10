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
        document.querySelector(".not-found").textContent =
          "This job does not exist or is no longer available.";
      } else if (userData.user.user_type === "job_seeker") {
        document.querySelector(".interview-questions").remove();
      }
    }
  }
}

let jobNotFound = document.querySelector(".job-message.not-found"),
  jobFailed = document.querySelector(".job-message.failed"),
  jobContainer = document.querySelector(".job");
async function fetchJob(
  url = `https://api.${domain}/${apiVersion}/jobs/${jobId}`
) {
  let request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 200) {
    jobContainer.classList.add("active");
    jobDetails = await request.json();
    let jobTitleValue,
      at,
      regex = /\sat\s/i;
    if (jobDetails.company_id == 20 && regex.test(jobDetails.title)) {
      let split = jobDetails.title.split(regex);
      jobTitleValue = split[0];
      at = split[1];
    }
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
    jobTitle.textContent = jobTitleValue ? jobTitleValue : job.title;
    companyName.textContent = at ? at : job.company;
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
    } else if (
      userData.user.user_type === "company" &&
      (jobDetails.company_id == userData.id ||
        jobDetails.company == userData.id)
    ) {
      let script = document.createElement("script");
      script.src = "company.js";
      script.type = "module";
      document.body.append(script);
    } else {
      document.querySelector(".interview-questions").remove();
      finish();
    }
  } else if (request.status == 404) {
    finish();
    jobNotFound.classList.add("active");
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await fetchJob();
    }
  } else {
    finish();
    jobFailed.classList.add("active");
  }
  return jobDetails;
}
await fetchJob();

let goBack = document.querySelector(".go-back");
goBack.addEventListener("click", () => {
  location.href = "../home/home.html";
});

export { userData, jobId, jobDetails, fetchJob };
