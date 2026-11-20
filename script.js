const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const currentSlideLabel = document.querySelector("#current-slide");
const progressBar = document.querySelector(".progress-track");
const progressFill = document.querySelector(".progress-fill");
let currentIndex = 0;

document.querySelector("#total-slides").textContent = String(slides.length).padStart(2, "0");
progressBar.setAttribute("aria-valuemax", String(slides.length));

function showSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  currentSlideLabel.textContent = String(currentIndex + 1).padStart(2, "0");
  progressFill.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  progressBar.setAttribute("aria-valuenow", String(currentIndex + 1));
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
}

previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(currentIndex + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(currentIndex - 1);
  }
});

showSlide(0);
