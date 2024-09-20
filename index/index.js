let headerBar = document.getElementById("header-bar"),
  nav = document.getElementById("nav"),
  toTop = document.getElementById("to-top");
headerBar.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.addEventListener("click", (e) => {
    if (e.target !== headerBar && e.target !== nav) {
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
