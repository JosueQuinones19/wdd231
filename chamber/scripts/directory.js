const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

/* Cache-busting prevents stale JSON in browsers/GitHub Pages */
const dataUrl = "data/members.json?v=7";

function membershipLabel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}

/* ---------- Skeleton (CLS fix) ---------- */
function createSkeletonCard() {
  const card = document.createElement("article");
  card.classList.add("member-card", "skeleton");

  const img = document.createElement("div");
  img.classList.add("skeleton-img");

  const line1 = document.createElement("div");
  line1.classList.add("skeleton-line", "w-70");

  const line2 = document.createElement("div");
  line2.classList.add("skeleton-line", "w-90");

  const line3 = document.createElement("div");
  line3.classList.add("skeleton-line", "w-80");

  const line4 = document.createElement("div");
  line4.classList.add("skeleton-line", "w-60");

  card.append(img, line1, line2, line3, line4);
  return card;
}

function showSkeleton(count = 6) {
  membersContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    membersContainer.appendChild(createSkeletonCard());
  }
}

function createMemberCard(member, isFirst = false) {
  const card = document.createElement("article");
  card.classList.add("member-card");

  const img = document.createElement("img");
  img.src = `images/${member.image}`;
  img.alt = `${member.name} logo`;

  // Reserve space (helps CLS)
  img.width = 300;
  img.height = 200;
  img.decoding = "async";

  // LCP: do NOT lazy-load the first image rendered (helps if it becomes LCP)
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
    const response = await fetch(dataUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.members;
  } catch (error) {
    console.error("Failed to fetch members:", error);
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

  // Show skeleton immediately so footer doesn't shift when members load (CLS fix)
  showSkeleton(6);

  const members = await getMembers();

  if (members.length === 0) {
    membersContainer.textContent = "Sorry, member data could not be loaded.";
    return;
  }

  displayMembers(members);
})();
