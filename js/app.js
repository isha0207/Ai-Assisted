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
const topData = mockDashboardData
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);

// 🎯 Data Mapping
const labels = topData.map(item => item.name);
const data = topData.map(item => item.revenue);

// 🎨 Get CSS Variable
const rootStyles = getComputedStyle(document.documentElement);
const brandColor = rootStyles.getPropertyValue('--brand-accent').trim();

// 📊 Chart Setup
const canvas = document.getElementById('revenueChart');

if (!canvas) {
  console.error("Canvas not found!");
} else {
  const ctx = canvas.getContext('2d');

  // 🌈 Gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, brandColor);
  gradient.addColorStop(1, "rgba(56, 189, 248, 0.2)");

  // 🚀 Chart Init
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: gradient,
        borderRadius: 6,
        barThickness: 20
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
