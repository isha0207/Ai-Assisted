import { mockDashboardData } from "./data.js";

console.log("JS Connected ✅");
console.log(mockDashboardData);
import { mockDashboardData } from "./data.js";

// ✅ STEP 1: Limit data (top 10 users)
const topUsers = mockDashboardData.slice(0, 10);

// ✅ STEP 2: Data Mapping
const labels = topUsers.map(user => user.name);
const data = topUsers.map(user => user.revenue);

// ✅ STEP 3: Get CSS Variable Color
const rootStyles = getComputedStyle(document.documentElement);
const barColor = rootStyles.getPropertyValue('--text-primary');

// ✅ STEP 4: Chart Config
const ctx = document.getElementById("revenueChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: "Revenue",
      data: data,
      backgroundColor: barColor
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: barColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: barColor
        }
      },
      y: {
        ticks: {
          color: barColor
        }
      }
    }
  }
});
import { mockDashboardData } from "./data.js";

const tbody = document.getElementById("table-body");

// ✅ Helper: Status class
function getStatusClass(status) {
  return `status-${status.toLowerCase()}`;
}

// ✅ Currency Formatter
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// ✅ Render Function
function renderTable(data) {
  tbody.innerHTML = ""; // ✅ DOM hygiene

  const rows = data.map(user => {
    return `
      <tr>
        <td>${user.id.slice(0, 6)}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${formatter.format(user.revenue)}</td>
        <td>
          <span class="status ${getStatusClass(user.status)}">
            ${user.status}
          </span>
        </td>
      </tr>
    `;
  }).join(""); // ✅ performance optimization

  tbody.innerHTML = rows;
}

// ✅ INITIAL CALL
renderTable(mockDashboardData);

