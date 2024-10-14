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
    console.log(status);
    if (status != 200) {
      location.pathname = location.pathname.replace(
        "home/home.html",
        "login/login.html"
      );
    }
  } else if (
    !document.cookie.includes("access") &&
    !document.cookie.includes("refresh")
  ) {
    location.pathname = location.pathname.replace(
      "home/home.html",
      "login/login.html"
    );
  }
}

export { domain, apiVersion, storeNewAccess, checkAccess, logoutFunction };
