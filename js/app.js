// ================================
// 📦 MOCK DATA
// ================================
console.log(app.js running");
import { dashboardData } from "./data.js";
console.log(dashboardData);

// ================================
// 🎯 GLOBAL VARIABLES
// ================================

const tbody = document.getElementById("table-body");
const filterDropdown = document.getElementById("status-filter");
const themeToggleBtn = document.getElementById("theme-toggle");

let originalData = [...mockDashboardData]; // immutable copy

// ================================
// 🧩 HELPERS
// ================================

// Status class
function getStatusClass(status){
  return `status-${status.toLowerCase()}`;
}

// Currency format
const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// ================================
// 📊 RENDER TABLE
// ================================

function renderTable(data){
  if(!tbody) return;

  tbody.innerHTML = "";

  const rows = data.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${formatCurrency.format(user.revenue)}</td>
      <td>
        <span class="status ${getStatusClass(user.status)}">
          ${user.status}
        </span>
      </td>
      <td>${user.lastLogin}</td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
}

// ================================
// 📈 CHART.JS (TOP REVENUE)
// ================================

function initChart(){
  const canvas = document.getElementById("revenueChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const topData = [...mockDashboardData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  const labels = topData.map(item => item.name);
  const revenues = topData.map(item => item.revenue);

  // Save globally for theme updates
  window.revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Revenue",
        data: revenues
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ================================
// 🌙 THEME MANAGEMENT
// ================================

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
   if(typeof updateChartTheme === "function"){
    updateChartTheme(theme);
  }
}

function initTheme(){
  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "light" || savedTheme === "dark"){
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
}

// Toggle event
if(themeToggleBtn){
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// ================================
// 🔍 FILTER FUNCTIONALITY
// ================================

if(filterDropdown){
  filterDropdown.addEventListener("change", (e) => {
    const selectedValue = e.target.value.toLowerCase();

    if(selectedValue === "all"){
      renderTable(originalData);
      return;
    }

    const filteredData = originalData.filter(item =>
      item.status.toLowerCase() === selectedValue
    );

    renderTable(filteredData);
  });
}

// ================================
// 🎨 CHART THEME SYNC
// ================================

function updateChartTheme(theme){
  if(!window.revenueChart) return;

  const isDark = theme === "dark";

  const textColor = isDark ? "#f8fafc" : "#111827";
  const gridColor = isDark ? "#334155" : "#e5e7eb";

  revenueChart.options.plugins.legend.labels.color = textColor;

  revenueChart.options.scales.x.ticks.color = textColor;
  revenueChart.options.scales.y.ticks.color = textColor;

  revenueChart.options.scales.x.grid.color = gridColor;
  revenueChart.options.scales.y.grid.color = gridColor;

  revenueChart.update();
}

// ================================
// 🚀 INIT APP
// ================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderTable(originalData);
  initChart();
   
});
