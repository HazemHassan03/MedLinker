let headerBar = document.getElementById("header-bar"),
  nav = document.getElementById("nav"),
  toTop = document.getElementById("to-top"),
  presentation = document.querySelectorAll(".presentation .body > div"),
  copyrightDate = document.getElementById("copyright-date"),
  date = new Date(),
  searchForm = document.querySelector(".search-form"),
  searchInput = document.getElementById("job-search"),
  searchGo = document.querySelector(".input .go"),
  searchSubmit = document.querySelector(".search-form input[type=submit]");

headerBar.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.addEventListener("click", (e) => {
    if (
      e.target !== headerBar &&
      e.target.parentElement.parentElement !== nav
    ) {
      nav.classList.remove("active");
    }
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 900) {
    toTop.style.transform = "scale(1)";
  } else {
    toTop.style.transform = "scale(0)";
  }
});
toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

for (let i = 0; i < presentation.length; i++) {
  let span = document.createElement("span");
  let spanText = document.createTextNode(i + 1);
  span.classList.add("number");
  span.append(spanText);
  presentation[i].prepend(span);
}

copyrightDate.textContent = date.getFullYear();

searchGo.addEventListener("click", () => {
  if (searchInput.value.length > 0) {
    location.href = "../home/home.html";
  }
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value.length > 0) {
    location.href = "../home/home.html";
  }
});
