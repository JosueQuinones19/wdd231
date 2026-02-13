/* jshint esversion: 6 */
import { places } from '../data/places.mjs';

// --- 1. CARDS DISPLAY ---
const cardsGrid = document.querySelector("#cards-grid");

function displayPlaces(data) {
    cardsGrid.innerHTML = "";
    data.forEach((place, index) => {
        const card = document.createElement("div");
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`; // Grid Areas

        const h2 = document.createElement("h2");
        h2.textContent = place.title;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = place.image;
        img.alt = place.alt;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = place.address;

        const p = document.createElement("p");
        p.textContent = place.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        card.appendChild(h2);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(p);
        card.appendChild(button);
        cardsGrid.appendChild(card);
    });
}
displayPlaces(places);

// --- 2. VISITOR MESSAGE ---
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeDiff = now - parseInt(lastVisit);
    const daysDiff = Math.floor(timeDiff / msPerDay);

    if (daysDiff < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const dayWord = daysDiff === 1 ? "day" : "days";
        visitMessage.textContent = `You last visited ${daysDiff} ${dayWord} ago.`;
    }
}
localStorage.setItem("lastVisit", now);


// --- 3. MENU LOGIC (UPDATED FOR NEW HEADER IDs) ---
// CAMBIO CLAVE: Usamos 'menuButton' y 'navList' para coincidir con tu HTML
const hamButton = document.querySelector('#menuButton');
const navigation = document.querySelector('#navList');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

// --- 4. FOOTER DATE ---
const lastModified = document.querySelector("#lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}