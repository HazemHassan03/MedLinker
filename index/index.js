document.getElementById("header-bar").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("active");
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 900) {
    document.getElementById("to-top").style.transform = "scale(1)";
  } else {
    document.getElementById("to-top").style.transform = "scale(0)";
  }
});
document.getElementById("to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
