const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#navList");

if (menuButton && navList) {
  menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

/** * WAYFINDING: Resaltar el enlace de la página actual
 */
const allLinks = document.querySelectorAll("#navList a");
const currentURL = window.location.href;

allLinks.forEach(link => {
  // Verificamos si la URL del enlace coincide con la URL actual
  if (currentURL.includes(link.getAttribute("href")) && link.getAttribute("href") !== "") {
    link.classList.add("active");
  } else if (currentURL.endsWith("chamber/") && link.getAttribute("href").includes("index.html")) {
    // Caso especial para la raíz del sitio (index)
    link.classList.add("active");
  }
});