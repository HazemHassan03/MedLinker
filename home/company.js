import { userData } from "./home.js";
import {
  domain,
  apiVersion,
  maxJobs,
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

let jobsContainer = document.querySelector(".company-jobs .jobs"),
  noJobsMessage = document.querySelector(".company-jobs .no-jobs"),
  failedJobsMessage = document.querySelector(".company-jobs .failed"),
  params = new URLSearchParams(location.search),
  jobsPage = params.get("page"),
  options = document.querySelector(".company-jobs .options"),
  showingDetails = document.querySelector(".company-jobs .showing-details");
async function getCompanyJobs(url = `${domain}/${apiVersion}/company/me/jobs`) {
  let request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 200) {
    let jobsObject = await request.json();
    let jobs = jobsObject.results;
    console.log(jobsObject);
    if (jobsObject.count <= maxJobs) {
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
      if (to > jobsObject.count) {
        to = jobsObject.count;
      }
      let showing = showingDetails.querySelector(".showing"),
        count = showingDetails.querySelector(".count"),
        next = options.querySelector(".next"),
        back = options.querySelector(".back"),
        pages = options.querySelector(".pages");
      showing.textContent = `${from} - ${to}`;
      count.textContent = jobsObject.count;
      if (jobsObject.previous === null) {
        back.classList.add("disabled");
      }
      if (jobsObject.next === null) {
        next.classList.add("disabled");
      }
      let currentPage = jobsPage ? +jobsPage : 1;
      let pagesCount = Math.ceil(jobsObject.count / maxLength);
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
        let nextPage = new URLSearchParams(new URL(jobsObject.next).search).get(
          "page"
        );
        params.set("page", nextPage);
        location.search = params.toString();
      });
      back.addEventListener("click", () => {
        let previousPage = new URLSearchParams(
          new URL(jobsObject.previous).search
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
        let timestamp = new Date(job.posted_date);
        let timeAgo = timeago.format(timestamp);
        let jobElement = `<div class="job" data-job-id="${job.id}">
                <div class="details">
                  <a class="job-title" data-job-id="${job.id}" href="../job/job.html?id=${job.id}">${job.title}</a>
                  <p class="job-id">Job Id: ${job.id}</p>
                  <p class="post-date"><i class="fa-regular fa-clock fa-fw"></i> Posted: ${timeAgo}</p>
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
    } else {
      options.style.display = "none";
      showingDetails.style.display = "none";
      noJobsMessage.remove();
    }
  } else {
    options.style.display = "none";
    showingDetails.style.display = "none";
    noJobsMessage.remove();
  }
}
if (jobsPage) {
  await getCompanyJobs(
    `${domain}/${apiVersion}/company/me/jobs?page=${jobsPage}`
  );
} else {
  await getCompanyJobs();
}

let landingName = document.querySelector(".welcome .name");
landingName.textContent += userData.user.first_name;

let deleteJobs = document.querySelectorAll(".job .delete-job"),
  deleteJobsYes = document.querySelector(".delete-job-message .yes"),
  deleteJobsNo = document.querySelector(".delete-job-message .no"),
  deleteJobMessage = document.querySelector(".delete-job-message");
async function deleteJobFetch(jobId) {
  loading();
  let request = await fetch(
    `${domain}/${apiVersion}/company/me/jobs/${jobId}`,
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
    } else {
      createMessage(
        "failed",
        deleteJobMessage,
        "Something went wrong",
        "We're sorry about that. Please try again."
      );
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
