import { userData } from "./home.js";
import {
  domain,
  apiVersion,
  maxJobs,
  finish,
  getAccessToken,
  storeNewAccess,
} from "../js/constants.js";

let landingName = document.querySelector(".welcome .name"),
  sideFullName = document.querySelector(".side .full-name"),
  sideUsername = document.querySelector(".side .username"),
  sideJobTitle = document.querySelector(".side .job-title");

landingName.textContent += ` ${userData.user.first_name}`;
sideFullName.textContent = `${userData.user.first_name} ${
  userData.user.last_name.split(" ")[0]
}`;
sideUsername.textContent = `@${userData.user.username}`;
sideJobTitle.innerHTML += ` ${userData.job_title}`;

let jobsContainer = document.querySelector(".jobs .jobs-container"),
  noJobsMessage = document.querySelector(".jobs .no-jobs"),
  failedJobsMessage = document.querySelector(".jobs .failed");

let params = new URLSearchParams(location.search);
let jobsPage = params.get("page");
let options = document.querySelector(".jobs .options");
let showingDetails = document.querySelector(".jobs .showing-details");
async function fetchJobs(url = `${domain}/${apiVersion}/jobs`) {
  let request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 200) {
    let jobsObject = await request.json();
    let jobs = jobsObject.results;
    console.log(jobs);
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
        let jobTitleValue,
          at,
          regex = /\sat\s/i;
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
        let timestamp = new Date(job.posted_date);
        let timeAgo = timeago.format(timestamp);
        let jobElement = `<div class="job">
                    <a class="job-title" href="../job/job.html?id=${job.id}">${
          jobTitleValue ? jobTitleValue : job.title
        }</a>
                    <p class="post-date">${timeAgo}</p>
                    <p class="job-id">Job Id: ${job.id}</p>
                    <p class="company-name">
                      <i class="fa-regular fa-building fa-fw"></i> ${
                        at ? at : job.company
                      }
                    </p>
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
                </div>`;
        jobsContainer.insertAdjacentHTML("beforeend", jobElement);
      }
    } else {
      failedJobsMessage.remove();
    }
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await fetchJobs();
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
  await fetchJobs(`${domain}/${apiVersion}/jobs?page=${jobsPage}`);
} else {
  await fetchJobs();
}

finish();
