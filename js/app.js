// ✅ Mock Data
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

// ✅ Select table body
const tbody = document.getElementById("table-body");

// ✅ Status class helper
function getStatusClass(status){
  return `status-${status.toLowerCase()}`;
}

// ✅ Currency formatter
const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// ✅ Render Table Function
function renderTable(data){
  if(!tbody) return; // safety

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
  `).join('');

  tbody.innerHTML = rows;
}

// ✅ Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  renderTable(mockDashboardData);
});


// ===============================
// 📊 CHART (Top 10 Revenue)
// ===============================

// Sort & pick top 10
const topData = [...mockDashboardData]
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 10);

// Labels & data
const labels = topData.map(item => item.name);
const revenues = topData.map(item => item.revenue);

// Chart render
const canvas = document.getElementById("revenueChart");

if (canvas) {
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
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
