import "./style.css";
import img1 from "./images/image1.jpg";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpeg";
import img4 from "./images/image4.jpeg";
import img5 from "./images/image5.jpg";
import img6 from "./images/image6.jpeg";

document.addEventListener("DOMContentLoaded", () => {
  const sourceImages = [img1, img2, img3, img4, img5, img6];
  const images = [];
  const imgButtons = [];
  const openNavBtn = document.querySelector(".openNav");
  const menuButtons = document.querySelectorAll(".menuBtn");
  const imageFrame = document.querySelector(".imageFrame");
  const slideMenu = document.querySelector(".slideMenu");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".previous");

  let activeImage = 1;

  activateDropdown(menuButtons, openNavBtn);

  sourceImages.forEach((imgSrc, index) => {
    const newImg = createImageElement(imgSrc, index);
    const newBtn = createButtonElement(index);
    images.push(newImg);
    imgButtons.push(newBtn);
  });

  initializeImages();
  showSlides();

  /// functions & listeners

  function showSlides() {
    const clickEvent = new Event("click");
    nextButton.dispatchEvent(clickEvent);
    setTimeout(showSlides, 4000);
  }

  function initializeImages() {
    imageFrame.appendChild(images[0]);
    imgButtons[0].classList.add("active");
  }

  function activateDropdown(menuBttns, openBtn) {
    openBtn.addEventListener("click", () => {
      menuBttns.forEach((button) => button.classList.toggle("active"));
      openBtn.classList.toggle("toggled");
    });
  }
  function appendSlideButton(button) {
    slideMenu.appendChild(button);
  }

  function createImageElement(imgSrc, index) {
    const newImg = document.createElement("img");
    newImg.classList.add("image");
    newImg.src = imgSrc;
    newImg.setAttribute("data-image-index", index + 1);
    return newImg;
  }

  function createButtonElement(index) {
    const newButton = document.createElement("button");
    newButton.classList.add("imageButton");
    newButton.setAttribute("data-button-index", index + 1);
    return newButton;
  }

  function clearImageFrame(frame) {
    const image = frame.querySelector(".image");
    frame.removeChild(image);
  }

  function resetActiveButtonClasses() {
    imgButtons.forEach((btn) => btn.classList.remove("active"));
  }
  function updateImageIndex(direction) {
    if (direction === "next") {
      activeImage = (activeImage % 6) + 1; // Ensure activeImage stays within 1 to 6 range
      return activeImage;
    } else if (direction === "previous") {
      activeImage = ((activeImage - 2 + 6) % 6) + 1; // Ensure activeImage stays within 1 to 6 range
      return activeImage;
    }
  }

  imgButtons.forEach((btn) => {
    appendSlideButton(btn);
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      resetActiveButtonClasses();
      clearImageFrame(imageFrame);
      btn.classList.add("active");
      images.forEach((image) => {
        if (
          image.getAttribute("data-image-index") ===
          btn.getAttribute("data-button-index")
        ) {
          activeImage = Number(image.getAttribute("data-image-index"));
          imageFrame.appendChild(image);
        }
      });
    });
  });

  function handleSwitchImageEvent(event, direction) {
    event.stopPropagation();
    activeImage = updateImageIndex(direction);
    resetActiveButtonClasses();
    clearImageFrame(imageFrame);
    imageFrame.appendChild(images[activeImage - 1]);
    imgButtons[activeImage - 1].classList.add("active");
  }

  nextButton.addEventListener("click", (event) =>
    handleSwitchImageEvent(event, "next")
  );
  prevButton.addEventListener("click", (event) =>
    handleSwitchImageEvent(event, "previous")
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      handleSwitchImageEvent(event, "next");
    } else if (event.key === "ArrowLeft") {
      handleSwitchImageEvent(event, "previous");
    }
  });
});
