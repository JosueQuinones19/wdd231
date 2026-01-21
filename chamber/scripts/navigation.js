const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#navList");

if (menuButton && navList) {
  menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}
