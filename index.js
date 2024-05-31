const features = document.querySelector("#features"),
  story = document.querySelector("#story"),
  navLogoCircle = document.querySelector(".nav-logo-circle"),
  diamonds = document.querySelectorAll(".diamonds"),
  diamondsWrap = document.querySelectorAll(".diamonds-wrap"),
  featuresExplorationImagesNTexts = document.querySelectorAll(
    ".features-exploration-images-n-texts"
  );

let velocity = 0;
let timeoutId;

function scrollToElement(element) {
  if (element != home) {
    window.scrollTo({
      top:
        Math.round(
          element.getBoundingClientRect().top +
            document.documentElement.scrollTop
        ) - 100,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

function rotateAnim() {
  navLogoCircle.style.transitionDuration = "0.6s";
  velocity += 10;
  navLogoCircle.style.rotate = velocity + "deg";
  timeoutId = setTimeout(rotateAnim, 60);
}

function rotateStop() {
  navLogoCircle.style.transitionDuration = "1s";
  clearTimeout(timeoutId);
  velocity = Math.round(velocity / 180) * 180;
  navLogoCircle.style.rotate = velocity + "deg";
}

for (let i = 0; i <= 2; i++) {
  featuresExplorationImagesNTexts[i].addEventListener("mouseenter", () => {
    diamonds[i].classList.toggle("diamond-active");
    diamondsWrap[i].classList.toggle("diamond-wrap-active");
  });
  featuresExplorationImagesNTexts[i].addEventListener("mouseleave", () => {
    diamonds[i].classList.toggle("diamond-active");
    diamondsWrap[i].classList.toggle("diamond-wrap-active");
  });
}