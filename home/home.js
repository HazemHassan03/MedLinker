import { checkAccess, fetchUserData } from "../js/constants.js";

let userData,
  jobSeekerBody = document.querySelector(".job-seeker-body"),
  companyBody = document.querySelector(".company-body");
if (
  !document.cookie.includes("access") &&
  !document.cookie.includes("refresh")
) {
  companyBody.remove();
  let script = document.createElement("script");
  script.src = "not-login.js";
  script.type = "module";
  document.body.append(script);
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "job-seeker.css";
  document.head.append(link);
} else {
  let access = await checkAccess();
  if (access === true) {
    let fetchData = await fetchUserData();
    userData = fetchData;
    let userType = userData.user.user_type;
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
  }
}

export { userData };
