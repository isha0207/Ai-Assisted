import { mockDashboardData } from "./data.js";


const tableBody = document.getElementById("tableBody");

function getStatusClass(status) {
  if (status === "Active") return "active";
  if (status === "Pending") return "pending";
  return "churned";
}

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>$${user.revenue.toFixed(2)}</td>
      <td>
        <span class="status ${getStatusClass(user.status)}">
          ${user.status}
        </span>
      </td>
      <td>${user.lastLogin}</td>
    `;

    tableBody.appendChild(row);
  });
}

renderTable(mockDashboardData);
console.log(mockDashboardData);
// 🔝 Top 10 Filter
// 🔝 Top 10 Filter
const topData = mockDashboardData
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);

// 🎯 Data Mapping
const labels = topData.map(item => item.name);
const data = topData.map(item => item.revenue);

const canvas = document.getElementById('revenueChart');

if (canvas) {
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["A","B","C","D","E","F","G","H","I","J"],
      datasets: [{
        label: "Test",
        data: data
      }]
    }
  });
}
