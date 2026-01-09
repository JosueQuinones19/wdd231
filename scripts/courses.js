const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
];

const courseListEl = document.querySelector("#courseList");
const creditTotalEl = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(list) {
  courseListEl.innerHTML = "";

  list.forEach((course) => {
    const card = document.createElement("div");
    card.className = `course${course.completed ? " completed" : ""}`;

    const label = document.createElement("code");
    label.textContent = `${course.subject} ${course.number}`;

    const title = document.createElement("span");
    title.textContent = course.title;

    const credits = document.createElement("span");
    credits.textContent = `${course.credits} cr`;

    const left = document.createElement("div");
    left.style.display = "grid";
    left.style.gap = "0.1rem";
    left.append(label, title);

    card.append(left, credits);
    courseListEl.appendChild(card);
  });

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditTotalEl.textContent = String(total);
}

function applyFilter(key) {
  const filtered =
    key === "all"
      ? courses
      : courses.filter((c) => c.subject.toLowerCase() === key);

  renderCourses(filtered);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.filter);
  });
});

renderCourses(courses);
