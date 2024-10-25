import { checkAccess, logoutFunction, fetchUserData } from "../constants.js";

function loading() {
  document.querySelector(".loading").classList.add("active");
}
function finish() {
  document.querySelector(".loading").classList.remove("active");
}

let userData;
async function starting() {
  let access = await checkAccess();
  if (access === true) {
    let fetchData = await fetchUserData();
    if (fetchData) {
      userData = fetchData;
      console.log(userData);
      let jobSeekerBody = document.querySelector(".job-seeker-body"),
        companyBody = document.querySelector(".company-body");
      let userType = "job_seeker";
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
      document.body.style.overflow = "initial";
      finish();
    }
  }
}
await starting();

let account = document.querySelector(".account > div"),
  accountIcon = document.querySelector(".account button i"),
  navList = document.querySelector(".nav-list"),
  logout = document.getElementById("logout"),
  overlay = document.querySelector(".overlay"),
  message = document.querySelector(".message"),
  messageClose = document.querySelector(".message i"),
  messageTitle = document.querySelector(".message .title"),
  messageMain = document.querySelector(".message .main-message"),
  messageAnother = document.querySelector(".message .another-messages");

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

function createMessage(type, from, title, mainMessage, anotherMessages) {
  if (type) {
    switch (type) {
      case "success":
        message.classList.remove("failed");
        message.classList.add("success");
        break;
      case "failed":
        message.classList.remove("success");
        message.classList.add("failed");
        break;
    }
  }
  if (title) {
    messageTitle.textContent = title;
  }
  if (mainMessage) {
    messageMain.textContent = mainMessage;
  }
  if (anotherMessages) {
    for (let message of anotherMessages) {
      let p = document.createElement("p"),
        pText = document.createTextNode(message);
      p.append(pText);
      messageAnother.append(p);
    }
  }
  from.classList.remove("active");
  message.classList.add("active");
  messageClose.addEventListener("click", () => {
    message.classList.remove("active");
    from.classList.add("active");
  });
}

export { userData, overlay, createMessage };
