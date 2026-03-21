// ================================
// ✅ MOCK DATA (WORKING)
// ================================
const mockDashboardData = [
  { id: "1", name: "Aarav", email: "a@gmail.com", revenue: 1200, status: "Active" },
  { id: "2", name: "Isha", email: "i@gmail.com", revenue: 900, status: "Pending" },
  { id: "3", name: "Rohan", email: "r@gmail.com", revenue: 1500, status: "Active" },
  { id: "4", name: "Neha", email: "n@gmail.com", revenue: 700, status: "Churned" }
];

console.log("JS Connected ✅");

// ================================
// ✅ TABLE RENDER
// ================================
const tbody = document.getElementById("table-body");

function renderTable(data) {
  tbody.innerHTML = "";

  const rows = data.map((user, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>$${user.revenue}</td>
      <td>${user.status}</td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
}

// Initial render
renderTable(mockDashboardData);

// ================================
// ✅ CHART (Chart.js)
// ================================
const ctx = document.getElementById("revenueChart");

const labels = mockDashboardData.map(user => user.name);
const data = mockDashboardData.map(user => user.revenue);

const revenueChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: "Revenue",
      data: data
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// ================================
// ✅ FILTER DROPDOWN
// ================================
const toggleBtn = document.getElementById("filter-toggle");
const filterBox = document.getElementById("filter-box");

if (toggleBtn && filterBox) {

  const options = filterBox.querySelectorAll("p");

  // Open / Close
  toggleBtn.addEventListener("click", () => {
    filterBox.classList.toggle("show");
  });

  // Select filter
  options.forEach(option => {
    option.addEventListener("click", () => {
      const status = option.getAttribute("data-status");

      filterBox.classList.remove("show");

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

}
