

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
// 🌙 THEME TOGGLE
const themeToggle = document.getElementById("theme-toggle");

// ✅ Apply saved theme OR system preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
}

// ✅ Toggle Theme
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateChartTheme(); // 🔥 chart fix
});

// 🔥 INIT
initTheme();
const filterDropdown = document.getElementById("status-filter");

// ✅ FILTER EVENT
filterDropdown.addEventListener("change", (e) => {
  const selected = e.target.value;

  if (selected === "all") {
    renderTable(mockDashboardData);
  } else {
    const filteredData = mockDashboardData.filter(user =>
      user.status.toLowerCase() === selected.toLowerCase()
    );

    renderTable(filteredData);
  }
});
// Assuming you already created chart as:
let revenueChart; // 👈 global

function createChart(labels, data) {
  const ctx = document.getElementById("revenueChart");

  const styles = getComputedStyle(document.documentElement);
  const textColor = styles.getPropertyValue('--text-primary');

  revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Revenue",
        data,
        backgroundColor: textColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: textColor } },
        y: { ticks: { color: textColor } }
      }
    }
  });
}

// 🔥 UPDATE ON THEME CHANGE
function updateChartTheme() {
  const styles = getComputedStyle(document.documentElement);
  const textColor = styles.getPropertyValue('--text-primary');

  revenueChart.options.scales.x.ticks.color = textColor;
  revenueChart.options.scales.y.ticks.color = textColor;
  revenueChart.data.datasets[0].backgroundColor = textColor;

  revenueChart.update();
}

const toggleBtn = document.getElementById("filter-toggle");
const filterBox = document.getElementById("filter-box");
const options = filterBox.querySelectorAll("p");

// ✅ Open / Close dropdown
toggleBtn.addEventListener("click", () => {
  filterBox.classList.toggle("show");
});

// ✅ Select option
options.forEach(option => {
  option.addEventListener("click", () => {

    const status = option.getAttribute("data-status");

    // ❌ REMOVE THIS LINE
    // toggleBtn.textContent = option.textContent + " ▼";

    // Close dropdown
    filterBox.classList.remove("show");

    // Filter logic
    if (status === "all") {
      renderTable(mockDashboardData);
    } else {
      const filtered = mockDashboardData.filter(user =>
        user.status.toLowerCase() === status.toLowerCase()
      );
      renderTable(filtered);
    }

  });
});
