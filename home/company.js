import { userData, overlay } from "./home.js";
import {
  domain,
  apiVersion,
  getAccessToken,
  storeNewAccess,
  loading,
  finish,
  createMessage,
} from "../constants.js";

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
        let jobElement = `<div class="job" data-job-id="${job.id}">
                <div class="details">
                  <h3 class="job-title" data-job-id="${job.id}">${job.title}</h3>
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
                  <button class="edit-job" data-job-id="${job.id}">تعديل</button>
                  <button class="delete-job" data-job-id="${job.id}">حذف</button>
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

let landingName = document.querySelector(".welcome .name"),
  postJobBtn = document.querySelector(".post-job"),
  postJobBox = document.querySelector(".post-job-box"),
  closePostJob = document.querySelector(".post-job-box .close"),
  postJobForm = document.querySelector(".post-job-form"),
  addQuestionRow = document.querySelectorAll(".question-row .add"),
  removeQuestionRow = document.querySelectorAll(".question-row .remove"),
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ],
  editJobBox = document.querySelector(".edit-job-box"),
  editJobForm = document.querySelector(".edit-job-form"),
  allEditJobInputs = [
    ...document.querySelectorAll(".edit-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".edit-job-form select"),
    ...document.querySelectorAll(".edit-job-form textarea"),
  ];

landingName.textContent += userData.user.first_name;

postJobBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  postJobBox.classList.add("active");
  let allNotValidIcons = postJobBox.querySelectorAll(".not-valid");
  allNotValidIcons.forEach((icon) => {
    icon.classList.remove("active");
  });
});

closePostJob.addEventListener("click", () => {
  overlay.classList.remove("active");
  postJobBox.classList.remove("active");
});

let questionsNumber = 1;
let editQuestionsNumber = 1;

if (sessionStorage.getItem("Post Job Form")) {
  let object = JSON.parse(sessionStorage.getItem("Post Job Form"));
  let keys = Object.keys(object);
  for (let key of keys) {
    if (key === "interviewQuestions") {
      for (let question of object[key]) {
        if (object[key].indexOf(question) === 0) {
          document.getElementById("question1").value = question.question;
          document.getElementById("answer1").value = question.answer;
        } else {
          addQuestion(postJobBox, question.question, question.answer);
        }
      }
    } else {
      document.getElementById(`${key}`).value = object[key];
    }
  }
}
function addInputToSessionStorage(input) {
  let object = JSON.parse(sessionStorage.getItem("Post Job Form"));
  if (input.name === "interview-questions") {
    let questionsObject = [];
    let questionRows = document.querySelectorAll(".post-job-box .question-row");
    for (let i = 0; i < questionRows.length; i++) {
      questionsObject.push({
        question: questionRows[i].querySelector("input[data-type=question]")
          .value,
        answer: questionRows[i].querySelector("input[data-type=answer]").value,
      });
    }
    object.interviewQuestions = questionsObject;
  } else {
    object[input.id] = input.value;
  }
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

function addQuestion(from, question, answer) {
  if (from === editJobBox) {
    editQuestionsNumber++;
  } else {
    questionsNumber++;
  }
  let elements = `<div class="question-row">
              <div class="question">
                <input
                  type="text"
                  name="interview-questions"
                  name="${
                    from === editJobBox
                      ? `edit-interview-questions`
                      : `interview-questions`
                  }"
                  data-type="question"
                  id="${
                    from === editJobBox
                      ? `edit-question${editQuestionsNumber}`
                      : `question${questionsNumber}`
                  }"
                  placeholder="Add Question"
                  value="${question ? question : ""}"
                  />
                  <input
                  type="text"
                  name="${
                    from === editJobBox
                      ? `edit-interview-questions`
                      : `interview-questions`
                  }"
                  data-type="answer"
                  id="${
                    from === editJobBox
                      ? `edit-answer${editQuestionsNumber}`
                      : `answer${questionsNumber}`
                  }"
                  placeholder="Add Answer"
                  value="${answer ? answer : ""}"
                />
              </div>
              <i class="remove fa-solid fa-circle-minus"></i>
            </div>`;
  from
    .querySelector(`.interview-questions`)
    .insertAdjacentHTML("beforeend", elements);
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
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
  allEditJobInputs = [
    ...document.querySelectorAll(".edit-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".edit-job-form select"),
    ...document.querySelectorAll(".edit-job-form textarea"),
  ];
  removeQuestionRow = from.querySelectorAll(".question-row .remove");
  removeQuestionRow.forEach((removeRow) => {
    removeRow.addEventListener("click", () => {
      removeRow.parentElement.remove();
      allPostJobInputs = [
        ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
        ...document.querySelectorAll(".post-job-form select"),
        ...document.querySelectorAll(".post-job-form textarea"),
      ];
      allPostJobInputs.forEach((input) => {
        if (sessionStorage.getItem("Post Job Form")) {
          addInputToSessionStorage(input);
        } else {
          sessionStorage.setItem("Post Job Form", JSON.stringify({}));
          addInputToSessionStorage(input);
        }
      });
      allEditJobInputs = [
        ...document.querySelectorAll(".edit-job-form input:not([type=submit])"),
        ...document.querySelectorAll(".edit-job-form select"),
        ...document.querySelectorAll(".edit-job-form textarea"),
      ];
      let checkQuestionInputs = [];
      let questionsInputs = from.querySelectorAll(".question-row input");
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
        from
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
  allEditJobInputs = [
    ...document.querySelectorAll(".edit-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".edit-job-form select"),
    ...document.querySelectorAll(".edit-job-form textarea"),
  ];
}
addQuestionRow.forEach((add) => {
  add.addEventListener("click", (e) => {
    let from = e.target.parentElement.parentElement.parentElement.parentElement;
    addQuestion(from);
  });
});

function assignValues(from) {
  let jobTitle,
    employmentType,
    jobType,
    workplace,
    jobLocationCountry,
    jobLocationCity,
    jobDescription,
    jobRequirements,
    numberOfVacancies,
    questionsRows;
  if (from === postJobForm) {
    jobTitle = document.getElementById("job-title");
    employmentType = document.getElementById("employment-type");
    jobType = document.getElementById("job-type");
    workplace = document.getElementById("workplace");
    jobLocationCountry = document.getElementById("job-location-country");
    jobLocationCity = document.getElementById("job-location-city");
    jobDescription = document.getElementById("job-description");
    jobRequirements = document.getElementById("job-requirements");
    numberOfVacancies = document.getElementById("vacancies");
    questionsRows = document.querySelectorAll(".post-job-form .question-row");
  } else if (from === editJobForm) {
    jobTitle = document.getElementById("edit-job-title");
    employmentType = document.getElementById("edit-employment-type");
    jobType = document.getElementById("edit-job-type");
    workplace = document.getElementById("edit-workplace");
    jobLocationCountry = document.getElementById("edit-job-location-country");
    jobLocationCity = document.getElementById("edit-job-location-city");
    jobDescription = document.getElementById("edit-job-description");
    jobRequirements = document.getElementById("edit-job-requirements");
    numberOfVacancies = document.getElementById("edit-vacancies");
    questionsRows = document.querySelectorAll(".edit-job-form .question-row");
  }
  let workplaceValue;
  if (workplace.value === "On-site") {
    workplaceValue = "onsite";
  } else {
    workplaceValue = workplace.value;
  }
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

function checkAllRequired(inputs) {
  let checkArray = [];
  inputs.forEach((input) => {
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

function finalCheck(inputs, from) {
  let checkArray = checkAllRequired(inputs);
  let falseInputs = [];
  for (let checkInput of checkArray) {
    if (checkInput.result === false) {
      falseInputs.push(checkInput.input);
    }
  }
  falseInputs.forEach((input) => {
    if (from === postJobForm) {
      document
        .querySelector(`.post-job-form .${input.name} .not-valid`)
        .classList.add("active");
    } else if (from === editJobForm) {
      document
        .querySelector(`.edit-job-form .${input.name} .not-valid`)
        .classList.add("active");
    }
    input.addEventListener("input", () => {
      if (from === postJobForm) {
        document
          .querySelector(`.post-job-form .${input.name} .not-valid`)
          .classList.remove("active");
      } else if (from === editJobForm) {
        document
          .querySelector(`.edit-job-form .${input.name} .not-valid`)
          .classList.remove("active");
      }
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
      body: JSON.stringify(assignValues(postJobForm)),
    }
  );
  finish();
  if (request.status == 201) {
    createMessage(
      "success",
      postJobBox,
      "تم نشر الوظيفة بنجاح",
      "شكرا لاستخدامكم لـMedLinker، سنعمل جاهدين لإيجاد أفضل الموظفين المناسبين لهذه الوظيفة",
      undefined,
      true
    );
  } else if (request.status == 401) {
    let check = await storeNewAccess();
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
}
postJobForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (checkAllRequired(allPostJobInputs) === true) {
    await postJobFetch();
  } else {
    createMessage(
      "failed",
      postJobBox,
      "البيانات غير كاملة",
      "يرجى التأكد من أنك قد قمت بإدخل جميع البيانات المطلوبة"
    );
    finalCheck(allPostJobInputs, postJobForm);
  }
});

async function fetchJobDetails(jobId, from) {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );
  finish();
  if (from === "edit job") {
    if (request.status == 200) {
      let jobData = await request.json();
      fillValues(jobData);
    } else if (request.status == 401) {
      let check = await storeNewAccess();
      if (check === true) {
        await fetchJobDetails(jobId, from);
      }
    } else {
      createMessage(
        "failed",
        editJobBox,
        "حدث خطأ",
        "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
      );
    }
  } else if (from === "show details") {
    if (request.status == 200) {
      let jobData = await request.json();
      Array.from(jobDetails.children).forEach((child) => {
        child.remove();
      });
      let jobLocation = `${jobData.location_country}, ${jobData.location_city}`;
      let employmentType = `${jobData.position_type[0].toUpperCase()}${jobData.position_type.slice(
        1
      )}`;
      let jobType = `${jobData.job_type
        .split(" ")[0][0]
        .toUpperCase()}${jobData.job_type
        .split(" ")[0]
        .slice(1)} ${jobData.job_type
        .split(" ")[1][0]
        .toUpperCase()}${jobData.job_type.split(" ")[1].slice(1)}`;
      let workplace = `${jobData.work_place[0].toUpperCase()}${jobData.work_place.slice(
        1
      )}`;
      if (workplace === "Onsite") {
        workplace = "On-site";
      }
      let interviewQuestions = jobData.interview_questions;
      function getQuestions() {
        let questionNumber = 0;
        let elements = "";
        for (let interviewQuestion of interviewQuestions) {
          elements += `<div class="interview-question">
          <p class="title">Question ${++questionNumber}</p>
          <p class="question">Question: ${interviewQuestion.question}</p>
          <p class="answer">Answer: ${interviewQuestion.answer}</p>
        </div>`;
        }
        return elements;
      }
      let elements = `<p class="job-title">
        <span class="title">Job Title: </span>
        <span class="value">${jobData.title}</span>
      </p>
      <p class="job-id">
        <span class="title">Job Id: </span>
        <span class="value">${jobData.id}</span>
      </p>
      <p class="location">
        <span class="title">Location: </span>
        <span class="value">${jobLocation}</span>
      </p>
      <p class="vacancies">
        <span class="title">Number Of Vacancies: </span>
        <span class="value">${jobData.number_of_vacancies}</span>
      </p>
      <p class="employment-type">
        <span class="title">Employment Type: </span>
        <span class="value">${employmentType}</span>
      </p>
      <p class="job-type">
        <span class="title">Job Type: </span>
        <span class="value">${jobType}</span>
      </p>
      <p class="workplace">
        <span class="title">Workplace: </span>
        <span class="value">${workplace}</span>
      </p>
      <div class="job-description">
        <span class="title">Job Description: </span>
        <span class="value">${jobData.description}</span>
      </div>
      <div class="job-requirements">
        <span class="title">Job Requirements: </span>
        <span class="value">${jobData.requirements}</span>
      </div>
      <div class="interview-questions">
        <p class="title">Interview Questions:</p>
        ${getQuestions()}
      </div>`;
      jobDetails.insertAdjacentHTML("afterbegin", elements);
      document
        .querySelector(".job-details-box .edit-job")
        .setAttribute("data-job-id", jobData.id);
      document
        .querySelector(".job-details-box .delete-job")
        .setAttribute("data-job-id", jobData.id);
    } else if (request.status == 401) {
      let check = await storeNewAccess();
      if (check === true) {
        await fetchJobDetails(jobId, from);
      }
    } else {
      createMessage(
        "failed",
        editJobBox,
        "حدث خطأ",
        "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
      );
    }
  }
}
function fillValues(jobData) {
  let jobTitle = editJobBox.querySelector("#edit-job-title"),
    employmentType = editJobBox.querySelector("#edit-employment-type"),
    jobType = editJobBox.querySelector("#edit-job-type"),
    workplace = editJobBox.querySelector("#edit-workplace"),
    jobLocationCountry = editJobBox.querySelector("#edit-job-location-country"),
    jobLocationCity = editJobBox.querySelector("#edit-job-location-city"),
    jobDescription = editJobBox.querySelector("#edit-job-description"),
    jobRequirements = editJobBox.querySelector("#edit-job-requirements"),
    vacancies = editJobBox.querySelector("#edit-vacancies"),
    questionsRows = editJobBox.querySelectorAll(".question-row");
  let employmentTypeValue = `${jobData.position_type[0].toUpperCase()}${jobData.position_type.slice(
    1
  )}`;
  let jobTypeValue = `${jobData.job_type
    .split(" ")[0][0]
    .toUpperCase()}${jobData.job_type.split(" ")[0].slice(1)} ${jobData.job_type
    .split(" ")[1][0]
    .toUpperCase()}${jobData.job_type.split(" ")[1].slice(1)}`;
  let workplaceValue = `${jobData.work_place[0].toUpperCase()}${jobData.work_place.slice(
    1
  )}`;
  if (workplaceValue === "Onsite") {
    workplaceValue = "On-site";
  }
  jobTitle.value = jobData.title;
  employmentType.value = employmentTypeValue;
  jobType.value = jobTypeValue;
  workplace.value = workplaceValue;
  jobLocationCountry.value = jobData.location_country;
  jobLocationCity.value = jobData.location_city;
  jobDescription.value = jobData.description;
  jobRequirements.value = jobData.requirements;
  vacancies.value = jobData.number_of_vacancies;
  let questionsArray = jobData.interview_questions;
  questionsRows.forEach((row) => {
    if (!row.classList.contains("first")) {
      row.remove();
    }
  });
  for (let i = 0; i < questionsArray.length; i++) {
    if (i === 0) {
      let firstQuestion = document.getElementById("edit-question1");
      let firstAnswer = document.getElementById("edit-answer1");
      firstQuestion.value = questionsArray[i].question;
      firstAnswer.value = questionsArray[i].answer;
    } else {
      addQuestion(
        editJobBox,
        questionsArray[i].question,
        questionsArray[i].answer
      );
    }
  }
}
let editJobs = document.querySelectorAll(".edit-job");
async function editJobFunction(jobId) {
  let allNotValidIcons = editJobBox.querySelectorAll(".not-valid");
  allNotValidIcons.forEach((icon) => {
    icon.classList.remove("active");
  });
  let jobDetailsBox = document.querySelector(".edit-job-box");
  overlay.classList.add("active");
  jobDetailsBox.classList.add("active");
  let close = jobDetailsBox.querySelector(".close");
  close.addEventListener("click", () => {
    overlay.classList.remove("active");
    jobDetailsBox.classList.remove("active");
  });
  await fetchJobDetails(jobId, "edit job");
}
editJobs.forEach((editJob) => {
  editJob.addEventListener("click", async () => {
    let jobId = editJob.getAttribute("data-job-id");
    document.querySelector(".edit-job-form").setAttribute("data-job-id", jobId);
    await editJobFunction(jobId);
  });
});
async function editJobFetch(jobId) {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs/${jobId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignValues(editJobForm)),
    }
  );
  finish();
  if (request.status == 200) {
    createMessage(
      "success",
      editJobBox,
      "تم تعديل الوظيفة بنجاح",
      "شكرا لاستخدامكم لـMedLinker، نحن سعداء لخدمتكم",
      undefined,
      true
    );
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await editJobFetch(jobId);
    }
  } else {
    createMessage(
      "failed",
      editJobBox,
      "حدث خطأ",
      "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
    );
  }
}
editJobForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (checkAllRequired(allEditJobInputs) === true) {
    let jobId = editJobForm.getAttribute("data-job-id");
    await editJobFetch(jobId);
  } else {
    createMessage(
      "failed",
      editJobBox,
      "البيانات غير كاملة",
      "يرجى التأكد من أنك قد قمت بإدخل جميع البيانات المطلوبة"
    );
    finalCheck(allEditJobInputs, editJobForm);
  }
});

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
      "تم حذف الوظيفة بنجاح",
      "شكرا لاستخدامكم لـMedLinker، نحن سعداء لخدمتكم",
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
      "هذه الوظيفة غير موجودة",
      "يرجى إعادة تحميل الصفحة"
    );
  } else {
    createMessage(
      "failed",
      deleteJobMessage,
      "حدث خطأ",
      "نأسف لحدوث ذلك، يرجى المحاولة مرة أخرى"
    );
  }
}
async function deleteJobFunction(jobId) {
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

let showJobsDetails = document.querySelectorAll(".job .job-title"),
  jobDetailsBox = document.querySelector(".job-details-box"),
  jobDetails = document.querySelector(".job-details-box .details");
showJobsDetails.forEach((showJobDetails) => {
  showJobDetails.addEventListener("click", async () => {
    let jobId = showJobDetails.getAttribute("data-job-id");
    overlay.classList.add("active");
    jobDetailsBox.classList.add("active");
    let close = jobDetailsBox.querySelector(".close");
    close.addEventListener("click", () => {
      jobDetailsBox.classList.remove("active");
      overlay.classList.remove("active");
    });
    await fetchJobDetails(jobId, "show details");
  });
});
let jobDetailsEdit = document.querySelector(".job-details-box .edit-job");
jobDetailsEdit.addEventListener("click", async () => {
  jobDetailsBox.classList.remove("active");
  let jobId = jobDetailsEdit.getAttribute("data-job-id");
  await editJobFunction(jobId);
});

let jobDetailsDelete = document.querySelector(".job-details-box .delete-job");
jobDetailsDelete.addEventListener("click", async () => {
  jobDetailsBox.classList.remove("active");
  let jobId = jobDetailsDelete.getAttribute("data-job-id");
  await deleteJobFunction(jobId);
});

finish();
