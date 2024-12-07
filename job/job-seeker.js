import { userData, jobId } from "./job.js";
import {
  domain,
  apiVersion,
  getAccessToken,
  createMessage,
  storeNewAccess,
  loading,
  finish,
} from "../js/constants.js";

let apply = document.querySelector(".apply"),
  closeApplicationFormBox = document.querySelector(".application .close"),
  applicationFormBox = document.querySelector(".application"),
  applicationForm = document.querySelector(".application-form"),
  resumeInput = document.getElementById("resume"),
  resumeButton = document.querySelector(".application-form .upload-resume"),
  fileDetails = document.querySelector(".application-form .resume .details"),
  fileDetailsName = document.querySelector(
    ".application-form .resume .details .file-name"
  ),
  fileDetailsSize = document.querySelector(
    ".application-form .resume .details .file-size"
  ),
  fileNotValid = document.querySelector(".application-form .resume .not-valid"),
  overlay = document.querySelector(".overlay");

apply.classList.add("active");

async function jobApply() {
  let applyData = new FormData();
  let userDataKeys = Object.keys(userData);
  for (let key of userDataKeys) {
    if (key === "user") {
      let userDataKeys = Object.keys(userData[key]);
      for (let key of userDataKeys) {
        applyData.append(`user.${key}`, userData.user[key]);
      }
    } else {
      if (key === "resume") {
        applyData.append(`${key}`, resumeInput.files[0]);
      } else {
        applyData.append(`${key}`, userData[key]);
      }
    }
  }
  loading();
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/jobs/${jobId}/application`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: applyData,
    }
  );
  finish();
  return request;
}
function checkResume(file) {
  if (file) {
    if (file.type === "application/pdf" && file.size <= 2000000) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function fileSize(size) {
  let returnedSize;
  if (size < 1000) {
    returnedSize = `${size} Byte`;
  } else if (size >= 1000 && size < 1000000) {
    returnedSize = `${(size / 1000).toFixed(2)} KB`;
  } else {
    returnedSize = `${(size / 1000000).toFixed(2)} MB`;
  }
  return returnedSize;
}
resumeInput.addEventListener("input", () => {
  fileNotValid.classList.remove("active");
  fileDetailsName.textContent = resumeInput.files[0].name;
  fileDetailsSize.textContent = fileSize(resumeInput.files[0].size);
  fileDetails.classList.add("active");
});
resumeButton.addEventListener("click", () => {
  resumeInput.click();
});
applicationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (e.submitter.tagName !== "BUTTON") {
    if (checkResume(resumeInput.files[0])) {
      let jobApplyRequest = await jobApply();
      let json = await jobApplyRequest.json();
      if (jobApplyRequest.status == 201) {
        createMessage(
          "success",
          applicationFormBox,
          "You have successfully applied for the job.",
          "Please wait until you are contacted.",
          undefined,
          true
        );
      } else if (jobApplyRequest.status == 400) {
        createMessage(
          "failed",
          applicationFormBox,
          "The job application was not submitted successfully",
          undefined,
          json
        );
      } else if (jobApplyRequest.status == 401) {
        let check = await storeNewAccess();
        if (check === true) {
          await jobApply();
        }
      } else {
        createMessage(
          "failed",
          applicationFormBox,
          "Something went wrong",
          "We're sorry about that. Please try again."
        );
      }
    } else {
      fileNotValid.classList.add("active");
    }
  }
});
apply.addEventListener("click", () => {
  applicationFormBox.classList.add("active");
  overlay.classList.add("active");
  closeApplicationFormBox.addEventListener("click", () => {
    applicationFormBox.classList.remove("active");
    overlay.classList.remove("active");
  });
});
