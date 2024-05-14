import "./style.css";

const openNavBtn = document.querySelector(".openNav");
const menuButtons = document.querySelectorAll(".menuBtn");

function activateDropdown(menuBttns, openBtn) {
  openBtn.addEventListener("click", () => {
    menuBttns.forEach((button) => button.classList.toggle("active"));
    openBtn.classList.toggle("toggled");
  });
}

activateDropdown(menuButtons, openNavBtn);
