const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = String(new Date().getFullYear());

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modification: ${document.lastModified}`;
