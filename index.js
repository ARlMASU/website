// IMPORT /////////////////////////////////////////////////////////////////////////////
const // scrollTo
  features = document.querySelector("#features"),
  story = document.querySelector("#story"),
  // rotateAnim
  navLogoCircle = document.querySelector(".nav-logo-circle"),
  // list
  diamonds = document.querySelectorAll(".exploration-list-diamonds"),
  diamondsWrap = document.querySelectorAll(".exploration-list-diamonds-wrap"),
  explorationImagesNTexts = document.querySelectorAll(
    ".exploration-images-n-texts"
  ),
  explorationWrap = document.querySelector(".exploration-wrap"),
  arrow = document.querySelectorAll(".exploration-arrow"),
  arrowWrap = document.querySelectorAll(".exploration-arrow-wrap"),
  explorationText = document.querySelectorAll(".exploration-text"),
  // storyArrowAnim
  allAnimatedElements = document.querySelectorAll(".animate"),
  // abilityWheel
  line = document.querySelector("line"),
  allCircleSectorDuos = document.querySelectorAll(".circle-sector-duo"),
  allCircleSectorIcon = document.querySelectorAll(".circle-sector-icon"),
  abilitiesWheel = document.querySelector(".abilities-wheel"),
  abilitiesTextH3 = document.querySelector(".abilities-text-h3"),
  abilitiesTextP = document.querySelector(".abilities-text-p"),
  arrowTip = document.querySelector(".arrow-tip");

// VAR ////////////////////////////////////////////////////////////////////////////////

// scrollTo var
let explorationImagesNTextsRect = [];
const windowHeight = window.innerHeight;

// rotateAnim var
let logoCircleRotationVelocity = 0;
let timoutRotate;

// list var
const arrowRect = arrow[0].getBoundingClientRect();
const arrowCenterX = arrowRect.left + arrowRect.width / 2;

const viewportCenterX = window.innerWidth / 2;

const offsetX = (viewportCenterX - arrowCenterX) * 2.5;

explorationWrap.style.marginLeft = `${offsetX}px`;

// abilityWheel var
let rotationForCircleSectorDuos = 0;
let rotationForCircleSectorIcon = 90;
let whatCircleSectorDuo = 0;

let isMouseIn = false;

// FUNCTION ///////////////////////////////////////////////////////////////////////////

// scrollTo
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
  } else if (element == story) {
    window.scrollTo({
      top:
        Math.round(
          element.getBoundingClientRect().top +
            document.documentElement.scrollTop
        ) - 250,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// rotateNavLogoCircle
function rotateAnim() {
  navLogoCircle.style.transitionDuration = "0.6s";
  logoCircleRotationVelocity += 10;
  navLogoCircle.style.rotate = logoCircleRotationVelocity + "deg";
  timoutRotate = setTimeout(rotateAnim, 60);
}

function rotateStop() {
  navLogoCircle.style.transitionDuration = "1s";
  clearTimeout(timoutRotate);
  logoCircleRotationVelocity =
    Math.round(logoCircleRotationVelocity / 180) * 180;
  navLogoCircle.style.rotate = logoCircleRotationVelocity + "deg";
}

// list
document.addEventListener("scroll", () => {
  for (let i = 0; i <= 2; i++) {
    explorationImagesNTextsRect[i] =
      explorationImagesNTexts[i].getBoundingClientRect();
    if (
      explorationImagesNTextsRect[i].top >=
        windowHeight / 2 - explorationImagesNTextsRect[i].height / 2 &&
      explorationImagesNTextsRect[i].top <=
        windowHeight / 2 + explorationImagesNTextsRect[i].height / 2
    ) {
      diamonds[i].classList.add("exploration-list-diamond-active");
      diamondsWrap[i].classList.add("exploration-list-diamond-wrap-active");
      arrow[i].classList.add("exploration-arrow-active");
      arrowWrap[i].classList.add("exploration-arrow-wrap-active");
      explorationText[i].classList.add("exploration-text-active");
    } else {
      diamonds[i].classList.remove("exploration-list-diamond-active");
      diamondsWrap[i].classList.remove("exploration-list-diamond-wrap-active");
      arrow[i].classList.remove("exploration-arrow-active");
      arrowWrap[i].classList.remove("exploration-arrow-wrap-active");
      explorationText[i].classList.remove("exploration-text-active");
    }
  }
});

// storyArrow
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      return;
    }
    entry.target.classList.remove("in-view");
  });
});

allAnimatedElements.forEach((element) => observer.observe(element));

// abilityWheel
allCircleSectorDuos.forEach((element) => {
  rotationForCircleSectorDuos += 45;
  rotationForCircleSectorIcon -= 45;
  element.style.rotate = rotationForCircleSectorDuos + "deg";
  allCircleSectorIcon[whatCircleSectorDuo].style.rotate =
    rotationForCircleSectorIcon + "deg";
  allCircleSectorIcon[whatCircleSectorDuo + 1].style.rotate =
    rotationForCircleSectorIcon + "deg";
  whatCircleSectorDuo += 2;
});

function mouseUpdate(event) {
  if (isMouseIn) {
    let rect = abilitiesWheel.getBoundingClientRect();

    let mouseX = event.pageX - rect.left;
    let mouseY = event.pageY - 2215; // rect.top ne marche pas ici, je ne saurais dire pourquoi.

    line.setAttribute("x2", mouseX);
    line.setAttribute("y2", mouseY);
  } else {
    line.setAttribute("x2", 245);
    line.setAttribute("y2", 245);
  }
}

abilitiesWheel.addEventListener("mousemove", mouseUpdate);
abilitiesWheel.addEventListener("mouseenter", mouseUpdate);
abilitiesWheel.addEventListener("mouseleave", mouseUpdate);

function circleSectorLeave() {
  abilitiesTextH3.textContent = "No ability selected";
  abilitiesTextP.textContent = "Hover an ability to have a description of it";
  abilitiesTextH3.style.color = "white";
  abilitiesTextP.style.color = "white";
}