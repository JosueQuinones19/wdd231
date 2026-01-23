const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

/* Cache-busting prevents GitHub Pages/browser from reusing an old JSON response */
const dataUrl = "data/members.json?v=6";

function membershipLabel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

function createMemberCard(member, isFirst = false) {
  const card = document.createElement("article");
  card.classList.add("member-card");

  const img = document.createElement("img");
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;

  // Reserve space to reduce layout shifts (CLS)
  img.width = 300;
  img.height = 200;
  img.decoding = "async";

  // LCP optimization: do NOT lazy-load the first (likely LCP) image
  if (isFirst) {
    img.loading = "eager";
    img.fetchPriority = "high";
  } else {
    img.loading = "lazy";
  }

  const name = document.createElement("h2");
  name.textContent = member.name;

  const level = document.createElement("p");
  level.innerHTML = `<strong>Level:</strong> ${membershipLabel(member.membershipLevel)}`;

  const address = document.createElement("p");
  address.innerHTML = `<strong>Address:</strong> ${member.address}`;

  const phone = document.createElement("p");
  phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

  const link = document.createElement("a");
  link.href = member.website;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = member.website;

  const website = document.createElement("p");
  website.innerHTML = `<strong>Website:</strong> `;
  website.appendChild(link);

  const desc = document.createElement("p");
  desc.textContent = member.description ?? "";

  card.append(img, name, level, address, phone, website, desc);
  return card;
}

async function getMembers() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.members;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    membersContainer.textContent = "Sorry, member data could not be loaded.";
    return [];
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach((member, index) => {
    membersContainer.appendChild(createMemberCard(member, index === 0));
  });
}

function setView(view) {
  membersContainer.classList.toggle("grid", view === "grid");
  membersContainer.classList.toggle("list", view === "list");

  gridBtn.setAttribute("aria-pressed", view === "grid" ? "true" : "false");
  listBtn.setAttribute("aria-pressed", view === "list" ? "true" : "false");
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

(async function initDirectory() {
  setView("grid");
  const members = await getMembers();
  displayMembers(members);
})();
