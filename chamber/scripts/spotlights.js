// spotlights.js

const container = document.querySelector("#spotlight-container");
const membersUrl = "data/members.json";

function levelName(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
}

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function buildSpotlightCard(member) {
  const card = document.createElement("article");
  card.classList.add("spotlight-card");

  const imgPath = `images/${member.image}`;
  const levelText = levelName(member.membershipLevel);

  card.innerHTML = `
    <h3>${member.name}</h3>
    <img src="${imgPath}" alt="${member.name} logo" width="160" height="160" loading="lazy" decoding="async">
    <p>${member.description}</p>
    <p><strong>Level:</strong> ${levelText}</p>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
  `;

  return card;
}

async function loadSpotlights() {
  try {
    const res = await fetch(membersUrl);
    if (!res.ok) throw new Error("Members JSON request failed.");
    const data = await res.json();

    const members = data.members;

    // Only Gold (3) or Silver (2)
    const eligible = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

    // Randomly choose 2 or 3
    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffle(eligible).slice(0, count);

    container.innerHTML = "";
    selected.forEach(member => container.appendChild(buildSpotlightCard(member)));
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Spotlights unavailable.</p>";
  }
}

loadSpotlights();
