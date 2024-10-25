import { userData, overlay, createMessage } from "./home.js";

let landingName = document.querySelector(".welcome .name"),
  postJobBtn = document.querySelector(".post-job"),
  postJobBox = document.querySelector(".post-job-box"),
  closePostJob = document.querySelector(".post-job-box .close"),
  postJobForm = document.querySelector(".post-job-form"),
  jobTitle = document.getElementById("job-title"),
  employmentType = document.getElementById("employment-type"),
  jobType = document.getElementById("job-type"),
  workplace = document.getElementById("workplace"),
  jobLocation = document.getElementById("job-location"),
  jobDescription = document.getElementById("job-description"),
  jobRequirements = document.getElementById("job-requirements"),
  timeInputs = document.querySelectorAll(".time-row input[type=number]"),
  hoursRow = document.querySelector(".time-row"),
  addHoursRow = document.querySelector(".time-row .add"),
  interviewDateTimeRow = document.querySelector(".time-row.interview"),
  addInterviewDateTimeRow = document.querySelector(".time-row.interview .add"),
  allPostJobInputs = [
    ...document.querySelectorAll(".post-job-form input:not([type=submit])"),
    ...document.querySelectorAll(".post-job-form select"),
    ...document.querySelectorAll(".post-job-form textarea"),
  ];
console.log(allPostJobInputs);

landingName.textContent += ` ${userData.user.first_name}`;

postJobBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  postJobBox.classList.add("active");
});

closePostJob.addEventListener("click", () => {
  overlay.classList.remove("active");
  postJobBox.classList.remove("active");
});

let hoursRowNumber = 1;
addHoursRow.addEventListener("click", () => {
  ++hoursRowNumber;
  let elements = `<div class="time-row">
              <h4>From</h4>
              <div class="from">
                <input type="number" min="0" max="23" placeholder="Hour" name="from-hour${hoursRowNumber}" id="from-hour${hoursRowNumber}" />
                <p>:</p>
                <input type="number" min="0" max="59" placeholder="Minute" name="from-minute${hoursRowNumber}" id="from-minute${hoursRowNumber}"/>
              </div>
              <h4>To</h4>
              <div class="to">
                <input type="number" min="0" max="23" placeholder="Hour" name="to-hour${hoursRowNumber}" id="to-hour${hoursRowNumber}"/>
                <p>:</p>
                <input type="number" min="0" max="59" placeholder="Minute" name="to-minute${hoursRowNumber}" id="to-minute${hoursRowNumber}"/>
              </div>
              <i class="remove-row fa-solid fa-circle-minus"></i>
            </div>`;
  hoursRow.parentElement.insertAdjacentHTML("beforeend", elements);
  timeInputs = document.querySelectorAll(".time-row input[type=number]");
  timeInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value <= 9) {
        if (input.value.length < 2) {
          input.value = `0${input.value}`;
        }
      }
    });
  });
});

let interviewRowNumber = 1;
addInterviewDateTimeRow.addEventListener("click", () => {
  ++interviewRowNumber;
  let elements = `<div class="time-row interview">
              <h4>Day</h4>
              <select name="interview-day" id="interview-day">
                <option value="0">Select</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
              <h4>From</h4>
              <div class="from">
                <input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="Hour"
                  name="from-hour-interview${interviewRowNumber}"
                  id="from-hour-interview${interviewRowNumber}"
                />
                <p>:</p>
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Minute"
                  name="from-minute-interview${interviewRowNumber}"
                  id="from-minute-interview${interviewRowNumber}"
                />
              </div>
              <h4>To</h4>
              <div class="to">
                <input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="Hour"
                  name="to-hour-interview${interviewRowNumber}"
                  id="to-hour-interview${interviewRowNumber}"
                />
                <p>:</p>
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Minute"
                  name="to-minute-interview${interviewRowNumber}"
                  id="to-minute-interview${interviewRowNumber}"
                />
              </div>
              <i class="remove-row fa-solid fa-circle-minus"></i>
            </div>`;
  interviewDateTimeRow.parentElement.insertAdjacentHTML("beforeend", elements);
  timeInputs = document.querySelectorAll(".time-row input[type=number]");
  timeInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value <= 9) {
        if (input.value.length < 2) {
          input.value = `0${input.value}`;
        }
      }
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-row")) {
    e.target.parentElement.remove();
  }
});

timeInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value <= 9) {
      if (input.value.length < 2) {
        input.value = `0${input.value}`;
      }
    }
  });
});

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
  console.log(checkArray);
  let checkFalse = checkArray.some((check) => {
    return check.result === false;
  });
  if (checkFalse) {
    console.log(checkFalse);
    return checkArray;
  } else {
    return true;
  }
}

function assignValues() {
  let postJobObject = {
    jobTitle: jobTitle.value,
    employmentType: employmentType.value,
    jobType: jobType.value,
    workplace: workplace.value,
    jobLocation: jobLocation.value,
    jobDescription: jobDescription.value,
    jobRequirements: jobRequirements.value,
    // workingHours: workingHours.value,
    interviewTime: interviewTime.value,
  };
  return postJobObject;
}

postJobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkAllRequired() === true) {
    console.log(assignValues());
  } else {
    createMessage(
      "failed",
      postJobBox,
      "البيانات غير كاملة",
      "يرجى التأكد من أنك قد قمت بإدخل جميع البيانات المطلوبة"
    );
    let checkArray = checkAllRequired();
    let falseInputs = [];
    for (let checkInput of checkArray) {
      if (checkInput.result === false) {
        falseInputs.push(checkInput.input);
      }
    }
    falseInputs.forEach((input) => {
      input.parentElement.querySelector(".not-valid").classList.add("active");
      input.addEventListener("input", () => {
        input.parentElement
          .querySelector(".not-valid")
          .classList.remove("active");
      });
    });
  }
});
