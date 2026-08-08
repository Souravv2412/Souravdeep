const monthlyData = {
  labels: ["February", "March", "April", "May", "June", "July"],
  income: [3561, 3405, 3594, 3742, 3729, 3388],
  expenses: [2582, 2536, 2659, 2655, 2642, 2619],
  savings: [979, 868, 935, 1087, 1087, 769]
};

const canvas = document.getElementById("cashflowChart");
if (canvas && window.Chart) {
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: monthlyData.labels,
      datasets: [
        {label: "Income", data: monthlyData.income, backgroundColor: "#1767a9", borderRadius: 5},
        {label: "Expenses", data: monthlyData.expenses, backgroundColor: "#93a9c2", borderRadius: 5},
        {label: "Savings", data: monthlyData.savings, type: "line", borderColor: "#d6a948", backgroundColor: "#d6a948", borderWidth: 3, pointRadius: 4, tension: .3}
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {mode: "index", intersect: false},
      plugins: {legend: {position: "bottom", labels: {usePointStyle: true, boxWidth: 8}}},
      scales: {
        x: {grid: {display: false}},
        y: {beginAtZero: true, ticks: {callback: value => "$" + Number(value).toLocaleString("en-CA")}, grid: {color: "#e6ecf3"}}
      }
    }
  });
}
