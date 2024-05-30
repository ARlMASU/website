const features = document.querySelector("#features");
const story = document.querySelector("#story");
const navLogoCircle = document.querySelector(".nav-logo-circle");
// const footerLogo = document.querySelector('.footer-logo');
// const footerCentralPart = document.querySelector('.footer-central-part');
// const footerButton = document.querySelector('.play-now-button-footer');

// let widthCentralPart = footerCentralPart.getBoundingClientRect().width;

// console.log(widthCentralPart);

// footerLogo.style.paddingRight = Math.round(widthCentralPart) * 2 + "px";
// footerButton.style.paddingLeft = Math.round(widthCentralPart) * 2 + "px";

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

let velocity = 0;
let timeoutId;

function rotateAnim() {
  velocity += 10;
  navLogoCircle.style.rotate = velocity + "deg";
  timeoutId = setTimeout(rotateAnim, 60);
}

function rotateStop() {
  navLogoCircle.style.transitionDuration = "10s";
  clearTimeout(timeoutId);
  velocity = Math.round(velocity / 180) * 180;
  navLogoCircle.style.rotate = velocity + "deg";
  navLogoCircle.style.transitionDuration = "0.6s";
}
