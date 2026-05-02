// ===== STORAGE =====
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===== SAVE =====
function save() {
  localStorage.setItem("students", JSON.stringify(students));
}

// ===== ADD STUDENT =====
function addStudent() {
  const id = document.getElementById("studentId").value.trim();
  const name = document.getElementById("studentName").value.trim();

  if (!id || !name) {
    alert("Please fill all fields");
    return;
  }

  students.push({
    id,
    name,
    status: "Not Marked"
  });

  save();
  renderAll();

  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
}

// ===== MARK ATTENDANCE =====
function mark(index, status) {
  students[index].status = status;
  save();
  renderAll();
}

// ===== DELETE STUDENT =====
function deleteStudent(index) {
  students.splice(index, 1);
  save();
  renderAll();
}

// ===== DASHBOARD COUNTS =====
function updateDashboard() {
  const total = students.length;
  const present = students.filter(s => s.status === "Present").length;
  const absent = students.filter(s => s.status === "Absent").length;

  const totalEl = document.getElementById("totalStudents");
  const presentEl = document.getElementById("presentCount");
  const absentEl = document.getElementById("absentCount");

  if (totalEl) totalEl.textContent = total;
  if (presentEl) presentEl.textContent = present;
  if (absentEl) absentEl.textContent = absent;
}

// ===== RENDER STUDENTS =====
function renderStudents() {
  const container = document.getElementById("studentTable");

  if (!container) return;

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
  `;

  students.forEach((s, i) => {
    html += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.status}</td>
        <td>
          <button onclick="mark(${i}, 'Present')">Present</button>
          <button onclick="mark(${i}, 'Absent')">Absent</button>
          <button onclick="deleteStudent(${i})" style="background:red;">Delete</button>
        </td>
      </tr>
    `;
  });

  html += "</table>";

  container.innerHTML = html;
}

// ===== RENDER ATTENDANCE =====
function renderAttendance() {
  const container = document.getElementById("attendanceTable");
  if (!container) return;

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
  `;

  students.forEach(s => {
    html += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.status}</td>
      </tr>
    `;
  });

  html += "</table>";
  container.innerHTML = html;
}

// ===== MASTER RENDER =====
function renderAll() {
  renderStudents();
  renderAttendance();
  updateDashboard();
}

// ===== TAB SWITCHING =====
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tabId).classList.remove("hidden");
}

// ===== INIT =====
renderAll();
