import {
  domain,
  apiVersion,
  loading,
  finish,
  getAccessToken,
  createMessage,
  storeNewAccess,
} from "../js/constants.js";

let postJobForm = document.querySelector(".post-job-form"),
  interviewQuestionsDiv = document.querySelector(
    ".post-job-form .interview-questions"
  ),
  addQuestionRow = document.querySelector(".question-row .add"),
  removeQuestionRow,
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ],
  questionsNumber = 1;

function addQuestion() {
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
  interviewQuestionsDiv.insertAdjacentHTML("beforeend", elements);
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
  removeQuestionRow = postJobForm.querySelectorAll(".question-row .remove");
  removeQuestionRow.forEach((removeRow) => {
    removeRow.addEventListener("click", () => {
      removeRow.parentElement.remove();
      allPostJobInputs = [
        ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
        ...document.querySelectorAll(".post-job-form select"),
        ...document.querySelectorAll(".post-job-form textarea"),
      ];
      let checkQuestionInputs = [];
      let questionsInputs = postJobForm.querySelectorAll(".question-row input");
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
        interviewQuestionsDiv
          .querySelector(".not-valid")
          .classList.remove("active");
      }
    });
  });
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
}
addQuestionRow.addEventListener("click", addQuestion);

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
  jobLocationCountry = document.getElementById("job-location-country");
  jobLocationCity = document.getElementById("job-location-city");
  jobDescription = document.getElementById("job-description");
  jobRequirements = document.getElementById("job-requirements");
  numberOfVacancies = document.getElementById("vacancies");
  questionsRows = document.querySelectorAll(".post-job-form .question-row");
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
    document
      .querySelector(`.post-job-form .${input.name} .not-valid`)
      .classList.add("active");
    input.addEventListener("input", () => {
      document
        .querySelector(`.post-job-form .${input.name} .not-valid`)
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
  if (request.status == 201) {
    createMessage(
      "success",
      undefined,
      "The job has been successfully posted",
      "Thank you for using MedLinker. We will work hard to find the best candidates suitable for this job."
    );
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await postJobFetch();
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
postJobForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (checkAllRequired(allPostJobInputs) === true) {
    await postJobFetch();
  } else {
    createMessage(
      "failed",
      undefined,
      "Incomplete data",
      "Please ensure that you have entered all the required information."
    );
    finalCheck(allPostJobInputs);
  }
});
