let studentCount = 0;
let presentCount = 0;
let absentCount = 0;

const studentNameInput = document.getElementById("studentName");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentTableBody = document.querySelector("#studentTable tbody");
const totalCount = document.getElementById("totalCount");
const presentCountEl = document.getElementById("presentCount");
const absentCountEl = document.getElementById("absentCount");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");

addStudentBtn.onclick = function() {
  const name = studentNameInput.value.trim();
  if (!name) return;
  
  studentCount++;
  totalCount.innerText = studentCount;
  
  const tr = document.createElement("tr");
  
  tr.innerHTML = `
    <td>${name}</td>
    <td><button class="present-btn">Present</button></td>
    <td><button class="absent-btn">Absent</button></td>
    <td style="color: gray; font-weight:bold">not marked</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  
  const presentBtn = tr.querySelector(".present-btn");
  const absentBtn = tr.querySelector(".absent-btn");
  const deleteBtn = tr.querySelector(".delete-btn");
  const statusTd = tr.querySelector("td:nth-child(4)");

  presentBtn.onclick = function() {
    statusTd.innerText = "present";
    statusTd.style.color = "green";
    presentBtn.disabled = true;
    absentBtn.disabled = true;
    presentCount++;
    presentCountEl.innerText = presentCount;
  };

  absentBtn.onclick = function() {
    statusTd.innerText = "absent";
    statusTd.style.color = "red";
    presentBtn.disabled = true;
    absentBtn.disabled = true;
    absentCount++;
    absentCountEl.innerText = absentCount;
  };

  deleteBtn.onclick = function() {
    if (statusTd.innerText === "present") presentCount--;
    if (statusTd.innerText === "absent") absentCount--;
    studentCount--;
    totalCount.innerText = studentCount;
    presentCountEl.innerText = presentCount;
    absentCountEl.innerText = absentCount;
    tr.remove();
  };

  studentTableBody.appendChild(tr);
  studentNameInput.value = "";
};

searchInput.oninput = function() {
  const term = searchInput.value.toLowerCase();
  const rows = studentTableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const nameTd = rows[i].getElementsByTagName("td")[0];
    if (nameTd.innerText.toLowerCase().includes(term)) rows[i].style.display = "";
    else rows[i].style.display = "none";
  }
};

resetBtn.onclick = function() {
  const rows = studentTableBody.getElementsByTagName("tr");
  presentCount = 0;
  absentCount = 0;
  for (let i = 0; i < rows.length; i++) {
    const statusTd = rows[i].getElementsByTagName("td")[3];
    const presentBtn = rows[i].getElementsByClassName("present-btn")[0];
    const absentBtn = rows[i].getElementsByClassName("absent-btn")[0];
    statusTd.innerText = "not marked";
    statusTd.style.color = "gray";
    presentBtn.disabled = false;
    absentBtn.disabled = false;
  }
  presentCountEl.innerText = presentCount;
  absentCountEl.innerText = absentCount;
};
