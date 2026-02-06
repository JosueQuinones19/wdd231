// --- 1. TIMESTAMP (Hidden date field) ---
const timestampInput = document.querySelector('#timestamp');

if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

// --- 2. MEMBERSHIP MODALS ---
const modal = document.querySelector('#membership-modal');
const closeButton = document.querySelector('#close-modal');
const modalContent = document.querySelector('#modal-content');

// Membership Data (Now fully in English)
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

// Function to open the modal
function openModal(level) {
    const data = membershipData[level];
    
    // Check if elements exist to prevent errors
    if (data && modalContent && modal) {
        modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <p class="cost"><strong>Cost:</strong> ${data.cost}</p>
            <p>${data.benefits}</p>
        `;
        modal.showModal();
    }
}

// --- 3. EVENT LISTENERS ---
const cardButtons = document.querySelectorAll('.card-action');

if (cardButtons.length > 0) {
    cardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level');
            openModal(level);
        });
    });
}

if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}