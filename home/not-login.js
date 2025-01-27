import { domain, apiVersion, finish } from "../js/constants.js";

let jobsContainer = document.querySelector(".jobs .jobs-container"),
  noJobsMessage = document.querySelector(".jobs .no-jobs"),
  failedJobsMessage = document.querySelector(".jobs .failed"),
  header = document.querySelector("header .container"),
  headerAccount = document.querySelector("header .account"),
  headerNav = document.querySelector("header .nav-list"),
  mainContent = document.querySelector(".main-content"),
  mainContainer = document.querySelector(".main-content .container"),
  welcomeSection = document.querySelector("section.welcome"),
  mainSide = document.querySelector(".main-content aside.side"),
  options = document.querySelector(".jobs .options"),
  showingDetails = document.querySelector(".jobs .showing-details");

headerAccount.remove();
headerNav.remove();
let loginDiv = document.createElement("div");
loginDiv.classList.add("login");
header.append(loginDiv);
let loginLink = document.createElement("a");
loginLink.href = "../login/login.html";
loginLink.classList.add("login-link");
loginLink.append(document.createTextNode("Login"));
loginDiv.append(loginLink);
welcomeSection.remove();
mainSide.remove();
mainContent.style.marginTop = "20px";
mainContainer.style.cssText = `
    display: grid;
    grid-template-columns: 1fr;`;

let params = new URLSearchParams(location.search);
let jobsPage = params.get("page");
async function fetchJobs(url = `${domain}/${apiVersion}/jobs`) {
  let request = await fetch(url);
  if (request.status == 200) {
    let jobsObject = await request.json();
    let jobs = jobsObject.results;
    let options = document.querySelector(".jobs .options");
    let showingDetails = document.querySelector(".jobs .showing-details");
    if (jobsObject.count <= 20) {
      options.style.display = "none";
      showingDetails.style.display = "none";
    } else {
      let maxLength = 20,
        to = maxLength,
        from = to - maxLength + 1;
      if (jobsPage) {
        to *= jobsPage;
        from = to - maxLength + 1;
      }
      if (to > jobsObject.count) {
        to = jobsObject.count;
      }
      let showing = document.querySelector(".showing-details .showing"),
        count = document.querySelector(".showing-details .count"),
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
        let postedDate = new Date(job.posted_date);
        let displayedDate = `${postedDate.getDate()} / ${
          postedDate.getMonth() + 1
        } / ${postedDate.getFullYear()}`;
        let jobElement = `<div class="job">
                    <a class="job-title" href="../login/login.html">${
                      jobTitleValue ? jobTitleValue : job.title
                    }</a>
                    <p class="post-date">${displayedDate}</p>
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
