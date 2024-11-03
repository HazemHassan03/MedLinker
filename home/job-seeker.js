import { userData } from "./home.js";
import { domain, apiVersion, finish, getAccessToken } from "../constants.js";

let jobsContainer = document.querySelector(".jobs"),
  noJobsMessage = document.querySelector(".jobs .no-jobs"),
  failedJobsMessage = document.querySelector(".jobs .failed");

async function fetchJobs() {
  let request = await fetch(`https://api.${domain}/${apiVersion}/jobs`, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  return request;
}
let getJobsRequest = await fetchJobs();
if (getJobsRequest.status == 200) {
  let jobsObject = await getJobsRequest.json();
  let jobs = jobsObject.results;
  if (jobs.length > 0) {
    noJobsMessage.remove();
    failedJobsMessage.remove();
    for (let job of jobs) {
      let jobElement = `<div class="job">
                  <a class="job-title" href="../job/job.html?id=${job.id}">${
        job.title
      }</a>
                  <p class="company-name">
                    <i class="fa-regular fa-building fa-fw"></i> ${job.company}
                  </p>
                  <p class="location">
                    <i class="fa-solid fa-location-dot fa-fw"></i> ${
                      job.location_country
                    }, ${job.location_city}
                  </p>
                  <p class="vacancies">
                    <i class="fa-regular fa-user fa-fw"></i>
                    <span class="title">Number Of Vacancies: </span>
                    <span class="value">${job.number_of_vacancies}</span>
                  </p>
                  <div class="job-inf">
                    <span class="employment-type">${job.position_type[0].toUpperCase()}${job.position_type.slice(
        1
      )}</span>
                    |
                    <span class="job-type">${job.job_type
                      .split(" ")[0][0]
                      .toUpperCase()}${job.job_type
        .split(" ")[0]
        .slice(1)} ${job.job_type.split(" ")[1][0].toUpperCase()}${job.job_type
        .split(" ")[1]
        .slice(1)}</span>
                    |
                    <span class="workplace">${job.work_place[0].toUpperCase()}${job.work_place.slice(
        1
      )}</span>
                </div>
              </div>`;
      jobsContainer.insertAdjacentHTML("beforeend", jobElement);
    }
  } else {
    failedJobsMessage.remove();
  }
} else if (getJobsRequest.status == 401) {
  let check = await checkAccess();
  if (check === true) {
    await fetchJobs();
  }
} else {
  noJobsMessage.remove();
}

let landingName = document.querySelector(".welcome .name"),
  sideFullName = document.querySelector(".side .full-name"),
  sideUsername = document.querySelector(".side .username"),
  sideJobTitle = document.querySelector(".side .job-title"),
  expandJob = document.querySelectorAll(".job .explore-more");

landingName.textContent += ` ${userData.user.first_name}`;
sideFullName.textContent = `${userData.user.first_name} ${userData.user.last_name}`;
sideUsername.textContent += userData.user.username;
sideJobTitle.innerHTML += ` ${userData.job_title}`;

expandJob.forEach((expand) => {
  expand.addEventListener("click", () => {
    expand.parentElement.classList.toggle("expanded");
    if (expand.parentElement.classList.contains("expanded")) {
      expand.innerHTML = `عرض أقل <i class="fa-solid fa-angle-up"></i>`;
    } else {
      expand.innerHTML = `عرض المزيد <i class="fa-solid fa-angle-down"></i>`;
    }
  });
});

document.body.style.overflow = "initial";
finish();
