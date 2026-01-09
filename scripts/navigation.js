const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#primary-nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
