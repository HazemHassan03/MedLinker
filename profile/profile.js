import {
  domain,
  apiVersion,
  getAccessToken,
  storeNewAccess,
  createMessage,
} from "../js/constants.js";

let personalData,
  jobSeekerBody = document.querySelector(".job-seeker-body"),
  companyBody = document.querySelector(".company-body");

let goBack = document.querySelector(".go-back");
goBack.addEventListener("click", () => {
  location.href = "../home/home.html";
});

async function getPersonalData() {
  let request = await fetch(`${domain}/${apiVersion}/users/jobseeker/me`, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 200) {
    personalData = await request.json();
    let userType = personalData.user.user_type;
    if (userType === "job_seeker") {
      companyBody.remove();
      let script = document.createElement("script");
      script.src = "job-seeker.js";
      script.type = "module";
      document.body.append(script);
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "job-seeker.css";
      document.head.append(link);
    } else if (userType === "company") {
      jobSeekerBody.remove();
      let script = document.createElement("script");
      script.src = "company.js";
      script.type = "module";
      document.body.append(script);
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "company.css";
      document.head.append(link);
    }
  } else if (request.status == 401) {
    let check = await storeNewAccess();
    if (check === true) {
      await getPersonalData();
    } else {
      createMessage(
        "failed",
        undefined,
        "Something went wrong",
        "We're sorry about that. Please try again."
      );
    }
  } else {
    createMessage(
      "failed",
      undefined,
      "Something went wrong",
      "We're sorry about that. Please try again."
    );
  }
  return request;
}
await getPersonalData();

export { personalData };
