import { jobDetails, jobId } from "./job.js";
import {
  loading,
  finish,
  domain,
  apiVersion,
  getAccessToken,
  createMessage,
  storeNewAccess,
} from "../js/constants.js";

document.querySelector(".company-name").remove();

let interviewQuestions = document.querySelector(".interview-questions .value"),
  interviewQuestionsArray = jobDetails.interview_questions;
interviewQuestionsArray.forEach((question, index) => {
  let element = `<div class="question-container">
  <h3 class="title">Question ${index + 1}</h3>
  <p class="question">Question: ${question.question}</p>
  <p class="answer">Answer: ${question.answer}</p>
  </div>`;
  interviewQuestions.insertAdjacentHTML("beforeend", element);
});

let viewModeElements = document.querySelectorAll(".view-mode"),
  editModeElements = document.querySelectorAll(".edit-mode"),
  optionsContainer = document.querySelector(".options"),
  editJob = document.querySelector(".edit"),
  deleteJob = document.querySelector(".delete"),
  closeEditing = document.querySelector(".close-editing"),
  save = document.querySelector(".save");

editJob.classList.add("active");
deleteJob.classList.add("active");

let deleteJobsYes = document.querySelector(".delete-job-message .yes"),
  deleteJobsNo = document.querySelector(".delete-job-message .no"),
  deleteJobMessage = document.querySelector(".delete-job-message");
async function deleteJobFetch(id) {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs/${id}`,
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
      await deleteJobFetch(id);
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
async function deleteJobFunction(id) {
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
    await deleteJobFetch(id);
  });
}
deleteJob.addEventListener("click", () => {
  deleteJobFunction(jobId);
});

editJob.addEventListener("click", editMode);
closeEditing.addEventListener("click", viewMode);

let interviewQuestionsDiv = document.querySelector(
    ".job .interview-questions .edit-mode"
  ),
  allEditJobInputs = [
    ...document.querySelectorAll(".job input:not([type=submit])"),
    ...document.querySelectorAll(".job select"),
    ...document.querySelectorAll(".job textarea"),
  ],
  questionsNumber = 0;
console.log(allEditJobInputs);

function addQuestion(question, answer) {
  questionsNumber++;
  let elements = `<div class="question-row">
            <div class="question">
              <input
                type="text"
                name="interview-questions"
                data-type="question"
                id="question${questionsNumber}"
                placeholder="Add Question"
                ${question ? `value="${question}"` : ""}
                />
                <input
                type="text"
                name="interview-questions"
                data-type="answer"
                id="answer${questionsNumber}"
                placeholder="Add Answer"
                ${answer ? `value="${answer}"` : ""}
              />
            </div>
            ${
              questionsNumber === 1
                ? `<i class="add-question fa-solid fa-circle-plus"></i>`
                : `<i class="remove-question fa-solid fa-circle-minus"></i>`
            }
          </div>`;
  interviewQuestionsDiv.insertAdjacentHTML("beforeend", elements);
  allEditJobInputs = [
    ...document.querySelectorAll(".job input:not([type=submit])"),
    ...document.querySelectorAll(".job select"),
    ...document.querySelectorAll(".job textarea"),
  ];
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-question")) {
    addQuestion();
  } else if (e.target.classList.contains("remove-question")) {
    e.target.parentElement.remove();
    allEditJobInputs = [
      ...document.querySelectorAll(".job input:not([type=submit])"),
      ...document.querySelectorAll(".job select"),
      ...document.querySelectorAll(".job textarea"),
    ];
    console.log(allEditJobInputs);
  }
});

let params = new URLSearchParams(location.search);
let edit = params.get("edit");
if (edit === "true") editMode();

function editMode() {
  viewModeElements.forEach((element) => {
    element.setAttribute("data-display", getComputedStyle(element).display);
    element.style.display = "none";
  });
  editModeElements.forEach((element) => {
    element.style.display = "initial";
  });
  document.getElementById("job-title").value = jobDetails.title;
  document.getElementById("country").value = jobDetails.location_country;
  document.getElementById("city").value = jobDetails.location_city;
  document.getElementById("vacancies").value = jobDetails.number_of_vacancies;
  let employmentTypeValue = `${jobDetails.position_type[0].toUpperCase()}${jobDetails.position_type.slice(
    1
  )}`;
  document.getElementById("employment-type").value = employmentTypeValue;
  let jobTypeValue = `${jobDetails.job_type
    .split(" ")[0][0]
    .toUpperCase()}${jobDetails.job_type
    .split(" ")[0]
    .slice(1)} ${jobDetails.job_type
    .split(" ")[1][0]
    .toUpperCase()}${jobDetails.job_type.split(" ")[1].slice(1)}`;
  document.getElementById("job-type").value = jobTypeValue;
  let workplaceValue = `${jobDetails.work_place[0].toUpperCase()}${jobDetails.work_place.slice(
    1
  )}`;
  if (workplaceValue === "Onsite") {
    workplaceValue = "On-site";
  }
  document.getElementById("workplace").value = workplaceValue;
  document.getElementById("description").value = jobDetails.description;
  document.getElementById("requirements").value = jobDetails.requirements;
  interviewQuestionsDiv.innerHTML = "";
  interviewQuestionsArray.forEach((question) => {
    addQuestion(question.question, question.answer);
  });
  Array.from(optionsContainer.children).forEach((child) => {
    child.classList.remove("active");
  });
  closeEditing.classList.add("active");
  save.classList.add("active");
}

function viewMode() {
  viewModeElements.forEach((element) => {
    if (element.getAttribute("data-display")) {
      element.style.display = element.getAttribute("data-display");
    } else {
      element.style.display = getComputedStyle(element).display;
    }
  });
  editModeElements.forEach((element) => {
    element.style.display = "none";
  });
  Array.from(optionsContainer.children).forEach((child) => {
    child.classList.remove("active");
  });
  editJob.classList.add("active");
  deleteJob.classList.add("active");
  questionsNumber = 0;
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
function finalCheck(inputs) {
  let checkArray = checkAllRequired(inputs);
  let falseInputs = [];
  for (let checkInput of checkArray) {
    if (checkInput.result === false) {
      falseInputs.push(checkInput.input);
    }
  }
  console.log(inputs);
  console.log(falseInputs);
  console.log(checkArray);
  falseInputs.forEach((input) => {
    input.classList.add("not-valid");
    input.addEventListener("input", () => {
      input.classList.remove("not-valid");
    });
  });
}

function assignValues() {
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
  jobTitle = document.getElementById("job-title");
  employmentType = document.getElementById("employment-type");
  jobType = document.getElementById("job-type");
  workplace = document.getElementById("workplace");
  jobLocationCountry = document.getElementById("country");
  jobLocationCity = document.getElementById("city");
  jobDescription = document.getElementById("description");
  jobRequirements = document.getElementById("requirements");
  numberOfVacancies = document.getElementById("vacancies");
  questionsRows = interviewQuestionsDiv.querySelectorAll(".question-row");
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

async function editJobFetch(id) {
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/company/me/jobs/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignValues()),
    }
  );
  finish();
  if (request.status == 200) {
    createMessage(
      "success",
      undefined,
      "The job has been successfully updated",
      "Thank you for using MedLinker. We are happy to serve you.",
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
      undefined,
      "Something went wrong",
      "We're sorry about that. Please try again."
    );
  }
}

save.addEventListener("click", async () => {
  console.log(allEditJobInputs);
  console.log(checkAllRequired(allEditJobInputs));
  if (checkAllRequired(allEditJobInputs) === true) {
    console.log(assignValues());
    await editJobFetch(jobId);
  } else {
    createMessage(
      "failed",
      undefined,
      "Incomplete data",
      "Please ensure that you have entered all the required information."
    );
    finalCheck(allEditJobInputs);
    console.log(finalCheck(allEditJobInputs));
  }
});
