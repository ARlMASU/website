const features = document.querySelector("#features"),
  story = document.querySelector("#story"),
  navLogoCircle = document.querySelector(".nav-logo-circle"),
  diamonds = document.querySelectorAll(".exploration-list-diamonds"),
  diamondsWrap = document.querySelectorAll(".exploration-list-diamonds-wrap"),
  explorationImagesNTexts = document.querySelectorAll(
    ".exploration-images-n-texts"
  ),
  explorationWrap = document.querySelector(".exploration-wrap"),
  arrow = document.querySelectorAll(".exploration-arrow"),
  arrowWrap = document.querySelectorAll(".exploration-arrow-wrap"),
  explorationText = document.querySelectorAll(".exploration-text"),
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

let explorationImagesNTextsRect = [];
const windowHeight = window.innerHeight;

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

const arrowRect = arrow[0].getBoundingClientRect();
const arrowCenterX = arrowRect.left + arrowRect.width / 2;

const viewportCenterX = window.innerWidth / 2;

const offsetX = (viewportCenterX - arrowCenterX) * 2.5;

explorationWrap.style.marginLeft = `${offsetX}px`;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      return;
    }
    entry.target.classList.remove("in-view");
  });
});

const allAnimatedElements = document.querySelectorAll(".animate");

allAnimatedElements.forEach((element) => observer.observe(element));

const allCircleSectorDuos = document.querySelectorAll(".circle-sector-duo"),
  allCircleSectorIcon = document.querySelectorAll(".circle-sector-icon");

let rotationForCircleSectorDuos = 0;
let rotationForCircleSectorIcon = 90;
let whatCircleSectorDuo = 0;

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

const line = document.querySelector("line");
const abilitiesWheel = document.querySelector(".abilities-wheel");
// const arrowTip = document.querySelector("arrow-tip");

let isMouseIn = false;

// let speed = 0.09;

function mouseUpdate(event) {
  if (isMouseIn) {
    let rect = abilitiesWheel.getBoundingClientRect();
    let mouseX = event.pageX - rect.left;
    let mouseY = event.pageY - 2215;

    // let lineX = Math.round(line.getAttribute("x2"));
    // let lineY = Math.round(line.getAttribute("y2"));

    // let distX = mouseX - lineX;
    // let distY = mouseY - lineY;

    // lineX += (distX * speed);
    // lineY += (distY * speed);

    line.setAttribute("x2", mouseX);
    line.setAttribute("y2", mouseY);

    // console.log("x : " + mouseX);
    // console.log("y : " + mouseY);
  } else{
    line.setAttribute("x2", 245);
    line.setAttribute("y2", 245);
  }
}

abilitiesWheel.addEventListener("mousemove", mouseUpdate);
abilitiesWheel.addEventListener("mouseenter", mouseUpdate);
abilitiesWheel.addEventListener("mouseleave", mouseUpdate);