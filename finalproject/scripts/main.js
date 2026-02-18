// scripts/main.js

// 1. ES MODULES: Importamos la función de nuestro otro archivo
import { getDestinations } from './api.js';

// ==========================================
// CONFIGURACIÓN BÁSICA (Menú y Fechas)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Fechas del Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

    // Menú Hamburguesa Responsivo
    const menuButton = document.getElementById('menu-button');
    const navList = document.getElementById('nav-list');

    if (menuButton && navList) {
        menuButton.addEventListener('click', () => {
            navList.classList.toggle('open');
            menuButton.textContent = navList.classList.contains('open') ? '✖' : '☰';
        });
    }

    // ==========================================
    // LOCAL STORAGE: Contador de Visitas
    // ==========================================
    const visitsDisplay = document.querySelector('.visits-counter');
    let numVisits = Number(window.localStorage.getItem('wanderlust-visits-ls')) || 0;
    
    if (numVisits !== 0) {
        console.log(`Welcome back! You have visited this site ${numVisits} times.`);
    } else {
        console.log("Welcome to Wanderlust Travel Guide! This is your first visit.");
    }
    numVisits++;
    localStorage.setItem('wanderlust-visits-ls', numVisits);

    // ==========================================
    // RENDERIZAR DESTINOS Y MANEJAR MODAL
    // ==========================================
    // Solo ejecutamos esto si estamos en la página que tiene la cuadrícula
    const gridContainer = document.getElementById('destinations-grid');
    if (gridContainer) {
        displayDestinations();
    }
});

// Función principal asíncrona para mostrar los datos
async function displayDestinations() {
    const destinations = await getDestinations();
    const gridContainer = document.getElementById('destinations-grid');
    const modal = document.getElementById('destination-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBestTime = document.getElementById('modal-best-time');
    const closeModal = document.getElementById('close-modal');

    // MÉTODOS DE ARRAY (.forEach) Y TEMPLATE LITERALS (``)
    destinations.forEach(dest => {
        // Crear elemento de tarjeta
        const card = document.createElement('div');
        card.classList.add('destination-card');

        // Construir HTML interno
        card.innerHTML = `
            <img src="${dest.image}" alt="Image of ${dest.name}" loading="lazy">
            <div class="card-content">
                <h3>${dest.name}</h3>
                <p><strong>${dest.country}</strong></p>
                <button class="view-more-btn" data-id="${dest.id}">Learn More</button>
            </div>
        `;

        gridContainer.appendChild(card);
    });

    // EVENT DELEGATION PARA EL MODAL (DOM Manipulation & Event Handling)
    gridContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-more-btn')) {
            const destId = parseInt(event.target.getAttribute('data-id'));
            const selectedDest = destinations.find(d => d.id === destId); // Array method: .find()

            if (selectedDest) {
                // Llenar el modal con la información
                modalTitle.textContent = `${selectedDest.name}, ${selectedDest.country}`;
                modalDescription.textContent = selectedDest.description;
                modalBestTime.textContent = `Best time to visit: ${selectedDest.bestTimeToVisit}`;
                
                // Mostrar el modal
                modal.showModal();
            }
        }
    });

    // Cerrar el modal
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.close();
        });
        
        // Cerrar al hacer clic fuera del modal (opcional pero recomendado)
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }
}