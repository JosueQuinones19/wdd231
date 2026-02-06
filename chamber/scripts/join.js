// Esperamos a que todo el contenido HTML cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. TIMESTAMP (Campo oculto de fecha) ---
    const timestampInput = document.querySelector('#timestamp');

    if (timestampInput) {
        // Guardamos la fecha y hora actual en formato ISO
        timestampInput.value = new Date().toISOString();
        // Opcional: Esto muestra en la consola que la fecha se guardó correctamente
        console.log("Timestamp set to:", timestampInput.value);
    }

    // --- 2. MODALES DE MEMBRESÍA ---
    const modal = document.querySelector('#membership-modal');
    const closeButton = document.querySelector('#close-modal');
    const modalContent = document.querySelector('#modal-content');
    const cardButtons = document.querySelectorAll('.card-action');

    // Datos de Membresía (En Inglés)
    const membershipData = {
        np: {
            title: 'NP Membership (Non-Profit)',
            cost: 'Free',
            benefits: 'Access to community events, basic directory listing, and no annual fees.'
        },
        bronze: {
            title: 'Bronze Membership',
            cost: '$50 / month',
            benefits: 'Event discounts, basic web advertising, and monthly training sessions.'
        },
        silver: {
            title: 'Silver Membership',
            cost: '$100 / month',
            benefits: 'All Bronze benefits, plus SEO positioning and homepage spotlight features.'
        },
        gold: {
            title: 'Gold Membership',
            cost: '$200 / month',
            benefits: 'Exclusive VIP access, premium banner advertising, and networking dinners.'
        }
    };

    // Función para abrir el modal
    function openModal(level) {
        const data = membershipData[level];
        
        // Verificamos que existan los datos y el modal antes de intentar abrirlo
        if (data && modalContent && modal) {
            modalContent.innerHTML = `
                <h2>${data.title}</h2>
                <p class="cost"><strong>Cost:</strong> ${data.cost}</p>
                <p>${data.benefits}</p>
            `;
            modal.showModal();
        }
    }

    // --- 3. EVENT LISTENERS (Detectores de Clic) ---
    
    // Asignar clic a los botones "Learn More"
    if (cardButtons.length > 0) {
        cardButtons.forEach(button => {
            button.addEventListener('click', () => {
                const level = button.getAttribute('data-level');
                openModal(level);
            });
        });
    }

    // Cerrar con el botón X
    if (closeButton && modal) {
        closeButton.addEventListener('click', () => {
            modal.close();
        });
    }

    // Cerrar al hacer clic fuera del cuadro (en el fondo oscuro)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }
});