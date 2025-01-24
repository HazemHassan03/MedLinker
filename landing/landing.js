let headerBar = document.querySelector(".bar"),
  closeBar = document.querySelector(".close-bar"),
  nav = document.querySelector(".nav"),
  toTop = document.querySelector(".to-top"),
  presentation = document.querySelectorAll(".presentation .body > div"),
  copyrightDate = document.querySelector(".copyright-date"),
  date = new Date(),
  searchForm = document.querySelector(".search-form"),
  searchInput = document.getElementById("job-search"),
  searchGo = document.querySelector(".input .go"),
  searchSubmit = document.querySelector(".search-form input[type=submit]");

headerBar.addEventListener("click", () => {
  nav.classList.toggle("active");
  if (nav.classList.contains("active")) {
    headerBar.classList.remove("fa-bars");
    headerBar.classList.add("fa-xmark");
  } else {
    headerBar.classList.remove("fa-xmark");
    headerBar.classList.add("fa-bars");
  }
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
searchInput.addEventListener("input", () => {
  if (searchInput.value.length > 0) {
    searchGo.classList.add("active");
  } else {
    searchGo.classList.remove("active");
  }
});
