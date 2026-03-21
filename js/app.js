import { mockDashboardData } from "js/app.js/data.js";

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
