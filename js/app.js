// ================================
// 📦 MOCK DATA
// ================================

const mockDashboardData = [
  { name:"Aarav Sharma", email:"aarav@gmail.com", revenue:850, status:"Active", lastLogin:"Today" },
  { name:"Isha Patel", email:"isha@gmail.com", revenue:920, status:"Active", lastLogin:"1 hour ago" },
  { name:"Rohan Mehta", email:"rohan@gmail.com", revenue:780, status:"Pending", lastLogin:"Yesterday" },
  { name:"Neha Verma", email:"neha@gmail.com", revenue:640, status:"Active", lastLogin:"2 days ago" },
  { name:"Karan Shah", email:"karan@gmail.com", revenue:720, status:"Inactive", lastLogin:"3 days ago" },
  { name:"Ananya Gupta", email:"ananya@gmail.com", revenue:990, status:"Active", lastLogin:"Today" },
  { name:"Dev Patel", email:"dev@gmail.com", revenue:560, status:"Pending", lastLogin:"Yesterday" },
  { name:"Priya Singh", email:"priya@gmail.com", revenue:880, status:"Active", lastLogin:"4 hours ago" },
  { name:"Rahul Jain", email:"rahul@gmail.com", revenue:610, status:"Inactive", lastLogin:"5 days ago" },
  { name:"Simran Kaur", email:"simran@gmail.com", revenue:770, status:"Active", lastLogin:"2 days ago" }
];

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
