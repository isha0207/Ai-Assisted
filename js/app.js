export const mockDashboardData = [
  { name:"Aarav Sharma", email:"aarav@gmail.com", revenue:850, status:"Active", lastLogin:"Today" },
  { name:"Isha Patel", email:"isha@gmail.com", revenue:920, status:"Active", lastLogin:"1 hour ago" },
  { name:"Rohan Mehta", email:"rohan@gmail.com", revenue:780, status:"Pending", lastLogin:"Yesterday" },
  { name:"Neha Verma", email:"neha@gmail.com", revenue:640, status:"Active", lastLogin:"2 days ago" },
  { name:"Karan Shah", email:"karan@gmail.com", revenue:720, status:"Churned", lastLogin:"3 days ago" },
  { name:"Ananya Gupta", email:"ananya@gmail.com", revenue:990, status:"Active", lastLogin:"Today" },
  { name:"Dev Patel", email:"dev@gmail.com", revenue:560, status:"Pending", lastLogin:"Yesterday" },
  { name:"Priya Singh", email:"priya@gmail.com", revenue:880, status:"Active", lastLogin:"4 hours ago" },
  { name:"Rahul Jain", email:"rahul@gmail.com", revenue:610, status:"Churned", lastLogin:"5 days ago" },
  { name:"Simran Kaur", email:"simran@gmail.com", revenue:770, status:"Active", lastLogin:"2 days ago" }
];


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
const canvas = document.getElementById('revenueChart');

if (canvas) {
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["A", "B", "C" , "D" , "E" , "F" , "G" , "H" , "I" , "J"],
      datasets: [{
        label: "Test",
        data: data
      }]
    }
  });
} else {
  console.error("Canvas not found");
}
