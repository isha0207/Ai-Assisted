import { mockDashboardData } from "js/data.js";

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

// Limit data (Top 10 only)
const topData = mockDashboardData
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);

// 🎯 Data Mapping
const labels = topData.map(item => item.name);
const data = topData.map(item => item.revenue);

// 🎨 Get CSS Variable (Design System Sync)
const rootStyles = getComputedStyle(document.documentElement);
const brandColor = rootStyles.getPropertyValue('--brand-accent').trim();

// 📊 Chart Initialization
const ctx = document.getElementById('revenueChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Revenue',
      data: data,
      backgroundColor: brandColor,
      borderRadius: 6,
      barThickness: 20
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // ✅ REQUIRED

    plugins: {
      legend: {
        display: false
      }
    },

    scales: {
      x: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: '#334155'
        }
      }
    }
  }
});

// ================================
// THEME MANAGEMENT (DARK MODE)
// ================================

const themeToggleBtn = document.getElementById("theme-toggle");

// Apply theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  updateChartTheme(theme); // Fix Chart.js issue
}

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
}

initTheme();


// ================================
// FILTER FUNCTIONALITY
// ================================

const filterDropdown = document.getElementById("status-filter");

// IMPORTANT: original data (IMMUTABLE)
let originalData = [...mockDashboardData];

// Filter event
filterDropdown.addEventListener("change", (e) => {
  const selectedValue = e.target.value.toLowerCase();

  if (selectedValue === "all") {
    renderTable(originalData);
    return;
  }

  const filteredData = originalData.filter(item =>
    item.status.toLowerCase() === selectedValue
  );

  renderTable(filteredData);
});


// ================================
// CHART.JS THEME FIX (VERY IMPORTANT)
// ================================

function updateChartTheme(theme) {
  if (!window.revenueChart) return;

  const isDark = theme === "dark";

  const textColor = isDark ? "#f8fafc" : "#111827";
  const gridColor = isDark ? "#334155" : "#e5e7eb";

  // Update chart options
  revenueChart.options.plugins.legend.labels.color = textColor;

  revenueChart.options.scales.x.ticks.color = textColor;
  revenueChart.options.scales.y.ticks.color = textColor;

  revenueChart.options.scales.x.grid.color = gridColor;
  revenueChart.options.scales.y.grid.color = gridColor;

  revenueChart.update();
}
