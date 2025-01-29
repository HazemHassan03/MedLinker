let domain = "https://api.medlinker.org";
let apiVersion = "v1";
let maxJobs = 20;
let maxCvSize = {
  show: "2MB",
  size: 2 * 1000000,
};
let maxPhotoSize = {
  show: "2MB",
  size: 2 * 1000000,
};

function showFileSize(bytes) {
  let units = ["B", "KB", "MB"];
  let i = 0;
  while (bytes >= 1000) {
    bytes /= 1000;
    i++;
  }
  return `${bytes.toFixed(2)}${units[i]}`;
}

function logoutFunction(goToLogin) {
  document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  if (goToLogin === false) {
    location.reload();
  } else {
    location.href = "/login/login.html";
  }
}

function loading() {
  document.body.classList.add("scrolling");
  document.querySelector(".loading").classList.add("active");
}
function finish() {
  document.body.classList.remove("scrolling");
  document.querySelector(".loading").classList.remove("active");
}

async function getAccessToken() {
  let cookies = document.cookie.split("; ");
  let neededCookie = cookies.filter((cookie) => {
    return cookie.startsWith("access");
  });
  if (neededCookie.length > 0) {
    let accessToken = neededCookie[0].split("=")[1];
    return accessToken;
  } else {
    let check = await checkAccess();
    if (check === true) {
      await getAccessToken();
    }
  }
}

async function getRefreshToken() {
  let cookies = document.cookie.split("; ");
  let neededCookie = cookies.filter((cookie) => {
    return cookie.startsWith("refresh");
  });
  if (neededCookie.length > 0) {
    let refreshToken = neededCookie[0].split("=")[1];
    return refreshToken;
  } else {
    let check = await checkAccess();
    if (check === true) {
      await getRefreshToken();
    }
  }
}

let triesLimit = 3,
  tries = 0;
async function storeNewAccess() {
  let refreshToken = await getRefreshToken();
  let request = await fetch(`${domain}/${apiVersion}/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  tries++;
  if (request.status == 200) {
    let json = await request.json();
    let now = Date.now();
    let accessExpire = now + 2 * 60 * 60 * 1000;
    let accessDate = new Date(accessExpire);
    let accessExpiryDate = accessDate.toUTCString();
    document.cookie = `access=${json.access}; expires=${accessExpiryDate}; path=/`;
    return true;
  } else {
    location.href = "/login/login.html";
  }
  if (tries === triesLimit) {
    return false;
  }
}

async function checkAccess() {
  if (
    !document.cookie.includes("access") &&
    document.cookie.includes("refresh")
  ) {
    let check = await storeNewAccess();
    if (check === true) {
      return true;
    } else {
      location.href = "/login/login.html";
    }
  } else if (
    !document.cookie.includes("access") &&
    !document.cookie.includes("refresh")
  ) {
    location.href = "/login/login.html";
  } else {
    return true;
  }
}

async function fetchUserData() {
  let request = await fetch(`${domain}/${apiVersion}/users/jobseeker/me`, {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  if (request.status == 404) {
    let request = await fetch(`${domain}/${apiVersion}/users/company/me`, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    if (request.status == 200) {
      let userData = await request.json();
      return userData;
    } else if (request.status == 401) {
      let check = await storeNewAccess();
      if (check === true) {
        await fetchUserData();
      }
    } else {
      return false;
    }
  } else {
    if (request.status == 200) {
      let userData = await request.json();
      return userData;
    } else if (request.status == 401) {
      let check = await storeNewAccess();
      if (check === true) {
        await fetchUserData();
      }
    } else {
      return false;
    }
  }
}

function createMessage(
  type,
  from,
  title,
  mainMessage,
  anotherMessages,
  closeReload,
  closeRedirect
) {
  let message = document.querySelector(".page-message"),
    messageClose = document.querySelector(".page-message i"),
    messageTitle = document.querySelector(".page-message .title"),
    messageMain = document.querySelector(".page-message .main-message"),
    messageAnother = document.querySelector(".page-message .another-messages"),
    overlay = document.querySelector(".overlay");
  overlay.classList.add("active");
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
  messageMain.textContent = "";
  if (mainMessage) {
    messageMain.textContent = mainMessage;
  }
  if (anotherMessages) {
    Array.from(messageAnother.children).forEach((message) => {
      message.remove();
    });
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
  function closeMessage() {
    if (closeReload === true) {
      location.reload();
    } else {
      overlay.classList.remove("active");
      message.classList.remove("active");
      if (from) {
        from.classList.add("active");
      }
      messageClose.removeEventListener("click", closeMessage);
    }
  }
  messageClose.addEventListener("click", () => {
    if (closeRedirect) {
      location.href = closeRedirect;
    } else {
      closeMessage();
    }
  });
}

export {
  domain,
  apiVersion,
  maxJobs,
  maxCvSize,
  maxPhotoSize,
  showFileSize,
  storeNewAccess,
  checkAccess,
  logoutFunction,
  fetchUserData,
  getAccessToken,
  loading,
  finish,
  createMessage,
};
