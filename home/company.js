import { userData } from "./home.js";
import {
  domain,
  apiVersion,
  getAccessToken,
  storeNewAccess,
  loading,
  finish,
  createMessage,
} from "../js/constants.js";

let companyName = document.querySelector(".company-name"),
  fullName = document.querySelector(".full-name"),
  username = document.querySelector(".username");
companyName.textContent = userData.company_name;
fullName.textContent = `${userData.user.first_name} ${userData.user.last_name}`;
username.textContent += userData.user.username;

let jobsContainer = document.querySelector(".company-jobs"),
  noJobsMessage = document.querySelector(".company-jobs .no-jobs"),
  failedJobsMessage = document.querySelector(".company-jobs .failed");
async function getCompanyJobs() {
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );
  if (request.status == 200) {
    let jobsObject = await request.json();
    let jobs = jobsObject.results;
    console.log(jobs);
    if (jobs.length > 0) {
      noJobsMessage.remove();
      failedJobsMessage.remove();
      for (let job of jobs) {
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
        let postedDate = new Date(job.posted_date);
        let displayedDate = `${postedDate.getDate()} / ${
          postedDate.getMonth() + 1
        } / ${postedDate.getFullYear()}`;
        let jobElement = `<div class="job" data-job-id="${job.id}">
                <div class="details">
                  <a class="job-title" data-job-id="${job.id}" href="../job/job.html?id=${job.id}">${job.title}</a>
                  <p class="job-id">Job Id: ${job.id}</p>
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
                </div>
                <div class="options">
                  <a class="edit-job" data-job-id="${job.id}" href="../job/job.html?id=${job.id}&edit=true" target="_blank">Edit</a>
                  <button class="delete-job" data-job-id="${job.id}">Delete</button>
                </div>
              </div>`;
        jobsContainer.insertAdjacentHTML("beforeend", jobElement);
      }
    } else {
      failedJobsMessage.remove();
    }
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await getCompanyJobs();
    }
  } else {
    noJobsMessage.remove();
  }
}
await getCompanyJobs();

let landingName = document.querySelector(".welcome .name");
landingName.textContent += userData.user.first_name;

let deleteJobs = document.querySelectorAll(".job .delete-job"),
  deleteJobsYes = document.querySelector(".delete-job-message .yes"),
  deleteJobsNo = document.querySelector(".delete-job-message .no"),
  deleteJobMessage = document.querySelector(".delete-job-message");
async function deleteJobFetch(jobId) {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs/${jobId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );
  finish();
  if (request.status == 204) {
    deleteJobMessage.classList.remove("active");
    createMessage(
      "success",
      undefined,
      "The job has been successfully deleted",
      "Thank you for using MedLinker. We are happy to serve you.",
      undefined,
      true
    );
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await deleteJobFetch(jobId);
    }
  } else if (request.status == 404) {
    createMessage(
      "failed",
      deleteJobMessage,
      "This job does not exist",
      "Please reload the page."
    );
  } else {
    createMessage(
      "failed",
      deleteJobMessage,
      "Something went wrong",
      "We're sorry about that. Please try again."
    );
  }
}
async function deleteJobFunction(jobId) {
  let overlay = document.querySelector(".overlay");
  deleteJobMessage.classList.add("active");
  overlay.classList.add("active");
  deleteJobMessage.querySelector(".close").addEventListener("click", () => {
    deleteJobMessage.classList.remove("active");
    overlay.classList.remove("active");
  });
  deleteJobsNo.addEventListener("click", () => {
    deleteJobMessage.classList.remove("active");
    overlay.classList.remove("active");
  });
  deleteJobsYes.addEventListener("click", async () => {
    deleteJobMessage.classList.remove("active");
    await deleteJobFetch(jobId);
  });
}
deleteJobs.forEach((deleteJob) => {
  deleteJob.addEventListener("click", async () => {
    let jobId = deleteJob.getAttribute("data-job-id");
    await deleteJobFunction(jobId);
  });
});

finish();
