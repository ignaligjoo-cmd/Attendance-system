let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
  let id = document.getElementById("studentId").value;
  let name = document.getElementById("studentName").value;

  if (!id || !name) {
    alert("Please fill all fields");
    return;
  }

  students.push({ id, name });

  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";

  renderStudents();
}

function renderStudents() {
  let container = document.getElementById("studentTable");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
  `;

  students.forEach(s => {
    html += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
      </tr>
    `;
  });

  html += "</table>";

  container.innerHTML = html;
}

renderStudents();
