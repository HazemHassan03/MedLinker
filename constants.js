let domain = "medlinker.org";
let apiVersion = "v1";

function logoutFunction() {
  document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

async function storeNewAccess() {
  let cookies = document.cookie.split("; ");
  let neededCookie = cookies.filter((cookie) => {
    return cookie.startsWith("refresh");
  });
  let refreshToken = neededCookie[0].split("=")[1];
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/auth/token/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    }
  );
  if (request.status == 200) {
    let json = await request.json();
    let now = Date.now();
    let accessExpire = now + 10 * 60 * 1000;
    let accessDate = new Date(accessExpire);
    let accessExpiryDate = accessDate.toUTCString();
    document.cookie = `access=${json.access}; expires=${accessExpiryDate}; path=/`;
  }
  return request.status;
}

async function checkAccess() {
  if (
    !document.cookie.includes("access") &&
    document.cookie.includes("refresh")
  ) {
    let status = await storeNewAccess();
    if (status == 200) {
      return true;
    } else {
      location.href = "../login/login.html";
    }
  } else if (
    !document.cookie.includes("access") &&
    !document.cookie.includes("refresh")
  ) {
    location.href = "../login/login.html";
  } else {
    return true;
  }
}

async function fetchUserData() {
  let request = await fetch(
    `https://api.${domain}/${apiVersion}/users/jobseeker/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  if (request.status == 200) {
    let userData = await request.json();
    return userData;
  } else if (request.status == 401) {
    let check = await checkAccess();
    if (check === true) {
      await fetchUserData();
    }
  } else {
    return false;
  }
  console.log(request);
}

function getAccessToken() {
  let cookies = document.cookie.split("; ");
  let neededCookie = cookies.filter((cookie) => {
    return cookie.startsWith("access");
  });
  let accessToken = neededCookie[0].split("=")[1];
  return accessToken;
}

function loading() {
  document.querySelector(".loading").classList.add("active");
}
function finish() {
  document.querySelector(".loading").classList.remove("active");
}

function createMessage(type, from, title, mainMessage, anotherMessages) {
  let message = document.querySelector(".message"),
    messageClose = document.querySelector(".message i"),
    messageTitle = document.querySelector(".message .title"),
    messageMain = document.querySelector(".message .main-message"),
    messageAnother = document.querySelector(".message .another-messages");
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
  if (from) {
    from.classList.remove("active");
  }
  message.classList.add("active");
  messageClose.addEventListener("click", () => {
    message.classList.remove("active");
    if (from) {
      from.classList.add("active");
    }
  });
}

export {
  domain,
  apiVersion,
  storeNewAccess,
  checkAccess,
  logoutFunction,
  fetchUserData,
  getAccessToken,
  loading,
  finish,
  createMessage,
};
