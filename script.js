document.addEventListener("DOMContentLoaded", () => {
  loadData();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker Registered'));
  }
});

function addRow() {
  const tbody = document.getElementById("tableBody");
  const row = document.createElement("tr");

  for (let i = 0; i < 12; i++) {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("input", saveData);
    cell.appendChild(input);
    row.appendChild(cell);
  }

  tbody.appendChild(row);
  saveData();
}

function saveData() {
  const rows = [];
  document.querySelectorAll("#tableBody tr").forEach(tr => {
    const row = [];
    tr.querySelectorAll("input").forEach(input => {
      row.push(input.value);
    });
    rows.push(row);
  });
  localStorage.setItem("habitData", JSON.stringify(rows));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("habitData")) || [];
  data.forEach(rowData => {
    const tbody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    rowData.forEach(val => {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.value = val;
      input.addEventListener("input", saveData);
      cell.appendChild(input);
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

function exportData() {
  const table = document.getElementById("habitTable");
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Habits");
  XLSX.writeFile(wb, "Islamic_Habit_Tracker.xlsx");
}
