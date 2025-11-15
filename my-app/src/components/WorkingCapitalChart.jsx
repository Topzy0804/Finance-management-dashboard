import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function WorkingCapitalChart({ series = [] }) {
  const labels = series.map((s) => s.label);
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: series.map((s) => s.income),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: "Expenses",
        data: series.map((s) => s.expenses),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.12)",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.06)" } },
    },
  };

  return (
    <div style={{ height: 260 }}>
      <Line data={data} options={options} />
    </div>
  );
}
