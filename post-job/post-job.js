import { finish, checkAccess, fetchUserData } from "../js/constants.js";

let access = await checkAccess();
let postJobDiv = document.querySelector(".post-job");
if (access === true) {
  let fetchData = await fetchUserData();
  let userType = fetchData.user.user_type;
  if (userType === "company") {
    let script = document.createElement("script");
    script.src = "post-form.js";
    script.type = "module";
    document.body.append(script);
  } else {
    postJobDiv.remove();
    let p = document.createElement("p");
    p.classList.add("forbidden");
    let container = document.createElement("div");
    container.classList.add("container");
    container.append(
      document.createTextNode("You do not have permission to access this page.")
    );
    p.append(container);
    document.body.append(p);
  }
  finish();
}
