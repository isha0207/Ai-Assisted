console.log("JS Running ✅");

// ================= DATA =================
const mockDashboardData = [
  { id: "1", name: "Aarav", email: "a@gmail.com", revenue: 1200, status: "Active" },
  { id: "2", name: "Isha", email: "i@gmail.com", revenue: 900, status: "Pending" },
  { id: "3", name: "Rohan", email: "r@gmail.com", revenue: 1500, status: "Active" },
  { id: "4", name: "Neha", email: "n@gmail.com", revenue: 700, status: "Churned" }
];

// ================= TABLE =================
const tbody = document.getElementById("table-body");

function renderTable(data) {
  if (!tbody) return;

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

renderTable(mockDashboardData);

// ================= CHART =================
const ctx = document.getElementById("revenueChart");

if (ctx) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: mockDashboardData.map(u => u.name),
      datasets: [{
        label: "Revenue",
        data: mockDashboardData.map(u => u.revenue)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ================= FILTER =================
const toggleBtn = document.getElementById("filter-toggle");
const filterBox = document.getElementById("filter-box");

if (toggleBtn && filterBox) {
  const options = filterBox.querySelectorAll("p");

  toggleBtn.addEventListener("click", () => {
    filterBox.classList.toggle("show");
  });

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
