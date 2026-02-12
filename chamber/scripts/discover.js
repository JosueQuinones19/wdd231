// scripts/discover.js

// 1. IMPORT DATA (This replaces the fetch method)
import { places } from '../data/places.mjs';

// 2. GENERATE CARDS
const cardsGrid = document.querySelector("#cards-grid");

function displayPlaces(data) {
    cardsGrid.innerHTML = ""; // Clear existing content just in case
    
    data.forEach((place, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Assign a specific grid-area name for CSS Grid (card1, card2, etc.)
        // This is crucial for the responsive layout requirements
        card.style.gridArea = `card${index + 1}`;

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

// Call the function to display items
displayPlaces(places);


// 3. VISITOR MESSAGE (LocalStorage)
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now(); // Current timestamp in milliseconds

if (!lastVisit) {
    // First visit
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

// Store current date for next visit
localStorage.setItem("lastVisit", now);