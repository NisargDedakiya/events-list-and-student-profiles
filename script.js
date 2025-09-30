// =======================
// Mock JSON Dataset
// =======================
const eventsJSON = `
[
  {"title":"Hackathon 2025","date":"2025-10-10","venue":"Main Hall"},
  {"title":"Tech Fest","date":"2025-11-05","venue":"Auditorium"},
  {"title":"Cultural Day","date":"2025-12-01","venue":"Open Grounds"},
  {"title":"Sports Meet","date":"2026-01-15","venue":"Stadium"},
  {"title":"Workshop on AI","date":"2026-02-20","venue":"Lab 3"},
  {"title":"Annual Convocation","date":"2026-03-25","venue":"Main Hall"},
  {"title":"Coding Bootcamp","date":"2026-04-10","venue":"Tech Park"}
]
`;

const studentsJSON = `
[
  {"name":"Aryan","age":20,"course":"Computer Science"},
  {"name":"Nisarg","age":22,"course":"IT"},
  {"name":"Mira","age":21,"course":"Electronics"},
  {"name":"Rahul","age":23,"course":"Civil"},
  {"name":"Priya","age":20,"course":"AI/ML"},
  {"name":"Ravi","age":24,"course":"Mechanical"},
  {"name":"Sneha","age":21,"course":"Biotech"},
  {"name":"Karan","age":22,"course":"Robotics"},
  {"name":"Anjali","age":20,"course":"Cybersecurity"},
  {"name":"Vivek","age":23,"course":"Data Science"}
]
`;

// =======================
// Parse JSON
// =======================
const events = JSON.parse(eventsJSON);
const students = JSON.parse(studentsJSON);

// =======================
// Pagination Variables
// =======================
let currentEventPage = 1;
let currentStudentPage = 1;
const eventsPerPage = 3;
const studentsPerPage = 3;

// =======================
// Render Events
// =======================
function renderEvents(page = 1) {
  const list = document.getElementById("eventsList");
  list.innerHTML = "";

  const start = (page - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  const pageData = events.slice(start, end);

  pageData.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = `${ev.title} - ${ev.date} @ ${ev.venue}`;
    list.appendChild(li);
  });

  renderEventPagination();
}

function renderEventPagination() {
  const pagination = document.getElementById("eventPagination");
  pagination.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentEventPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentEventPage > 1) {
      currentEventPage--;
      renderEvents(currentEventPage);
    }
  });
  pagination.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentEventPage * eventsPerPage >= events.length;
  nextBtn.addEventListener("click", () => {
    if (currentEventPage * eventsPerPage < events.length) {
      currentEventPage++;
      renderEvents(currentEventPage);
    }
  });
  pagination.appendChild(nextBtn);
}

// =======================
// Render Students
// =======================
function renderStudents(page = 1) {
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  const start = (page - 1) * studentsPerPage;
  const end = start + studentsPerPage;
  const pageData = students.slice(start, end);

  pageData.forEach(stu => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stu.name}</td>
      <td>${stu.age}</td>
      <td>${stu.course}</td>
    `;
    tbody.appendChild(row);
  });

  renderStudentPagination();
}

function renderStudentPagination() {
  const pagination = document.getElementById("studentPagination");
  pagination.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentStudentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentStudentPage > 1) {
      currentStudentPage--;
      renderStudents(currentStudentPage);
    }
  });
  pagination.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentStudentPage * studentsPerPage >= students.length;
  nextBtn.addEventListener("click", () => {
    if (currentStudentPage * studentsPerPage < students.length) {
      currentStudentPage++;
      renderStudents(currentStudentPage);
    }
  });
  pagination.appendChild(nextBtn);
}

// =======================
// Initialize Page
// =======================
renderEvents();
renderStudents();
