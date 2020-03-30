const blackOverlay = document.querySelector(".black-overlay");
const hamburger = document.querySelector(".navbar__collapse");
const navLinks = document.querySelector(".navbar__links");

hamburger.addEventListener("click", () => {
  blackOverlay.classList.toggle("hide");
  navLinks.classList.toggle("navbar__links--show");
  hamburger.classList.toggle("navbar__collapse--close");
});
