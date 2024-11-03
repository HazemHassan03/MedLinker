import { userData, overlay } from "./home.js";
import {
  domain,
  apiVersion,
  getAccessToken,
  loading,
  finish,
  createMessage,
} from "../constants.js";

console.log(userData);
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
  return request;
}
let getJobsRequest = await getCompanyJobs();
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
  postJobBtn = document.querySelector(".post-job"),
  postJobBox = document.querySelector(".post-job-box"),
  closePostJob = document.querySelector(".post-job-box .close"),
  postJobForm = document.querySelector(".post-job-form"),
  jobTitle = document.getElementById("job-title"),
  employmentType = document.getElementById("employment-type"),
  jobType = document.getElementById("job-type"),
  workplace = document.getElementById("workplace"),
  jobLocationCountry = document.getElementById("job-location-country"),
  jobLocationCity = document.getElementById("job-location-city"),
  jobDescription = document.getElementById("job-description"),
  jobRequirements = document.getElementById("job-requirements"),
  numberOfVacancies = document.getElementById("vacancies"),
  addQuestionRow = document.querySelector(".question-row .add"),
  removeQuestionRow = document.querySelectorAll(".question-row .remove"),
  questionsInputs = document.querySelectorAll(".question-row input"),
  // timeInputs = document.querySelectorAll(".time-row input[type=number]"),
  // hoursRow = document.querySelector(".time-row"),
  // addHoursRow = document.querySelector(".time-row .add"),
  // interviewDateTimeRow = document.querySelector(".time-row.interview"),
  // addInterviewDateTimeRow = document.querySelector(".time-row.interview .add"),
  postJob = document.querySelector(".post-job-form .submit"),
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];

landingName.textContent += ` ${userData.user.first_name}`;

postJobBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  postJobBox.classList.add("active");
});

closePostJob.addEventListener("click", () => {
  overlay.classList.remove("active");
  postJobBox.classList.remove("active");
});

if (sessionStorage.getItem("Post Job Form")) {
  let object = JSON.parse(sessionStorage.getItem("Post Job Form"));
  let keys = Object.keys(object);
  for (let key of keys) {
    document.getElementById(`${key}`).value = object[key];
  }
}
function addInputToSessionStorage(input) {
  let object = JSON.parse(sessionStorage.getItem("Post Job Form"));
  object[input.id] = input.value;
  sessionStorage.setItem("Post Job Form", JSON.stringify(object));
}
allPostJobInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (sessionStorage.getItem("Post Job Form")) {
      addInputToSessionStorage(input);
    } else {
      sessionStorage.setItem("Post Job Form", JSON.stringify({}));
      addInputToSessionStorage(input);
    }
  });
});

let questionsNumber = 1;
addQuestionRow.addEventListener("click", () => {
  questionsNumber++;
  let elements = `<div class="question-row">
              <div class="question">
                <input
                  type="text"
                  name="interview-questions"
                  data-type="question"
                  id="question${questionsNumber}"
                  placeholder="Add Question"
                />
                <input
                  type="text"
                  name="interview-questions"
                  data-type="answer"
                  id="answer${questionsNumber}"
                  placeholder="Add Answer"
                />
              </div>
              <i class="remove fa-solid fa-circle-minus"></i>
            </div>`;
  document
    .querySelector(`.interview-questions`)
    .insertAdjacentHTML("beforeend", elements);
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
  removeQuestionRow = document.querySelectorAll(".question-row .remove");
  removeQuestionRow.forEach((removeRow) => {
    removeRow.addEventListener("click", () => {
      removeRow.parentElement.remove();
      allPostJobInputs = [
        ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
        ...document.querySelectorAll(".post-job-form select"),
        ...document.querySelectorAll(".post-job-form textarea"),
      ];
      let checkQuestionInputs = [];
      questionsInputs.forEach((questionInput) => {
        let checkObject = {
          input: questionInput,
          name: questionInput.id,
        };
        checkObject.check = questionInput.value.length > 0 ? true : false;
        checkQuestionInputs.push(checkObject);
      });
      let checkArray = [];
      for (let checkQuestionInput of checkQuestionInputs) {
        checkArray.push(checkQuestionInput.check);
      }
      let finalCheck = checkArray.every((check) => {
        return check === true;
      });
      if (finalCheck) {
        document
          .querySelector(".interview-questions .not-valid")
          .classList.remove("active");
      }
    });
  });
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
});

function assignValues() {
  let workplaceValue;
  if (workplace.value === "On-site") {
    workplaceValue = "onsite";
  } else {
    workplaceValue = workplace.value;
  }
  let questionsRows = document.querySelectorAll(".question-row");
  let interviewQuestionsArray = [];
  questionsRows.forEach((questionsRow) => {
    let question = questionsRow
      .querySelector("[data-type=question]")
      .value.trim();
    let answer = questionsRow.querySelector("[data-type=answer]").value.trim();
    interviewQuestionsArray.push({
      question: question,
      answer: answer,
    });
  });
  let object = {
    title: jobTitle.value.trim(),
    position_type: employmentType.value.toLowerCase(),
    job_type: jobType.value.toLowerCase(),
    work_place: workplaceValue.toLowerCase(),
    location_country: jobLocationCountry.value.trim(),
    location_city: jobLocationCity.value.trim(),
    description: jobDescription.value.trim(),
    requirements: jobRequirements.value.trim(),
    number_of_vacancies: numberOfVacancies.value,
    interview_questions: interviewQuestionsArray,
    closing_date: "2024-10-30T10:43:39.591Z",
  };
  return object;
}

function checkInputRequired(input) {
  let check = {
    input: input,
    name: input.name,
  };
  if (input.type === "text" || input.tagName === "TEXTAREA") {
    if (input.value.length > 0) {
      check.result = true;
    } else {
      check.result = false;
    }
  } else if (input.type === "number") {
    if (input.value > 0) {
      check.result = true;
    } else {
      check.result = false;
    }
  } else if (input.tagName === "SELECT") {
    if (input.value == 0) {
      check.result = false;
    } else {
      check.result = true;
    }
  }
  return check;
}

function checkAllRequired() {
  let checkArray = [];
  allPostJobInputs.forEach((input) => {
    checkArray.push(checkInputRequired(input));
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

function finalCheck() {
  let checkArray = checkAllRequired();
  let falseInputs = [];
  for (let checkInput of checkArray) {
    if (checkInput.result === false) {
      falseInputs.push(checkInput.input);
    }
  }
  falseInputs.forEach((input) => {
    document.querySelector(`.${input.name} .not-valid`).classList.add("active");
    input.addEventListener("input", () => {
      document
        .querySelector(`.${input.name} .not-valid`)
        .classList.remove("active");
    });
  });
}

async function postJobFetch() {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignValues()),
    }
  );
  finish();
  return request;
}

postJobForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (checkAllRequired() === true) {
    let postJobRequest = await postJobFetch();
    if (postJobRequest.status == 201) {
      createMessage(
        "success",
        postJobBox,
        "تم نشر الوظيفة بنجاح",
        "شكرا لاستخدامك لـMedLinker، سنعمل جاهدين لإيجاد أفضل الموظفين المناسبين لهذه الوظيفة"
      );
    } else if (postJobRequest.status == 401) {
      let check = await checkAccess();
      if (check === true) {
        await postJobFetch();
      }
    } else {
      createMessage(
        "failed",
        postJobBox,
        "حدث خطأ",
        "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
      );
    }
  } else {
    createMessage(
      "failed",
      postJobBox,
      "البيانات غير كاملة",
      "يرجى التأكد من أنك قد قمت بإدخل جميع البيانات المطلوبة"
    );
    finalCheck();
  }
});

document.body.style.overflow = "initial";
finish();
