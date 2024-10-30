import {
  checkAccess,
  logoutFunction,
  fetchUserData,
} from "../constants.js";

let userData;
let access = await checkAccess();
if (access === true) {
  let fetchData = await fetchUserData();
  userData = fetchData;
  console.log(userData);
  let jobSeekerBody = document.querySelector(".job-seeker-body"),
    companyBody = document.querySelector(".company-body");
  let userType = userData.user.user_type;
  console.log(userType);
  if (userType === "job_seeker") {
    companyBody.remove();
    let script = document.createElement("script");
    script.src = "job-seeker.js";
    script.type = "module";
    document.body.append(script);
  } else if (userType === "company") {
    jobSeekerBody.remove();
    let script = document.createElement("script");
    script.src = "company.js";
    script.type = "module";
    document.body.append(script);
  }
}

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout"),
  overlay = document.querySelector(".overlay");

account.addEventListener("click", () => {
  navList.classList.toggle("active");
  if (navList.classList.contains("active")) {
    accountIcon.className = accountIcon.className.replace("down", "up");
  } else {
    accountIcon.className = accountIcon.className.replace("up", "down");
  }
  document.addEventListener("click", (e) => {
    if (
      e.target !== navList &&
      e.target.parentElement.parentElement !== account &&
      e.target.parentElement !== account &&
      e.target !== account
    ) {
      navList.classList.remove("active");
      accountIcon.className = accountIcon.className.replace("up", "down");
    }
  });
});

logout.addEventListener("click", () => {
  logoutFunction();
});

export { userData, overlay };
