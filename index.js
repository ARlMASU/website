const features = document.querySelector("#features"),
  story = document.querySelector("#story"),
  navLogoCircle = document.querySelector(".nav-logo-circle"),
  diamonds = document.querySelectorAll(".diamonds"),
  diamondsWrap = document.querySelectorAll(".diamonds-wrap"),
  featuresExplorationImagesNTexts = document.querySelectorAll(
    ".features-exploration-images-n-texts"
  ),
  featuresExplorationWrap = document.querySelector(
    ".features-exploration-wrap"
  ),
  arrow = document.querySelectorAll(".arrow"),
  arrowWrap = document.querySelectorAll(".arrow-wrap"),
  featuresExplorationText = document.querySelectorAll(
    ".features-exploration-text"
  ),
  footer = document.querySelector("footer");

let velocity = 0;
let timeoutId;

function scrollToElement(element) {
  if (element == features) {
    window.scrollTo({
      top:
        Math.round(
          element.getBoundingClientRect().top +
            document.documentElement.scrollTop
        ) - 175,
      behavior: "smooth",
    });
  } else if(element == story){
    window.scrollTo({
      top:
        Math.round(
          element.getBoundingClientRect().top +
            document.documentElement.scrollTop
        ) - 250,
      behavior: "smooth",
    });
  }else {
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

let featuresExplorationImagesNTextsRect = [];
const windowHeight = window.innerHeight;

document.addEventListener("scroll", () => {
  for (let i = 0; i <= 2; i++) {
    featuresExplorationImagesNTextsRect[i] =
      featuresExplorationImagesNTexts[i].getBoundingClientRect();
    if (
      featuresExplorationImagesNTextsRect[i].top >=
        windowHeight / 2 - featuresExplorationImagesNTextsRect[i].height / 2 &&
      featuresExplorationImagesNTextsRect[i].top <=
        windowHeight / 2 + featuresExplorationImagesNTextsRect[i].height / 2
    ) {
      diamonds[i].classList.add("diamond-active");
      diamondsWrap[i].classList.add("diamond-wrap-active");
      arrow[i].classList.add("arrow-active");
      arrowWrap[i].classList.add("arrow-wrap-active");
      featuresExplorationText[i].classList.add(
        "features-exploration-text-active"
      );
    } else {
      diamonds[i].classList.remove("diamond-active");
      diamondsWrap[i].classList.remove("diamond-wrap-active");
      arrow[i].classList.remove("arrow-active");
      arrowWrap[i].classList.remove("arrow-wrap-active");
      featuresExplorationText[i].classList.remove(
        "features-exploration-text-active"
      );
    }
  }
});

const arrowRect = arrow[0].getBoundingClientRect();
const arrowCenterX = arrowRect.left + arrowRect.width / 2;

const viewportCenterX = window.innerWidth / 2;

const offsetX = (viewportCenterX - arrowCenterX) * 2.5;

featuresExplorationWrap.style.marginLeft = `${offsetX}px`;


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in-view');
    return;
  }
  entry.target.classList.remove('in-view');
  });
});

const allAnimatedElements = document.querySelectorAll('.animate');

allAnimatedElements.forEach((element) => observer.observe(element));