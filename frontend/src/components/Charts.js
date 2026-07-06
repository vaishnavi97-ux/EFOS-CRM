import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Charts({ stats }) {

  const labels = [
    "New",
    "Contacted",
    "Interested",
    "Follow-up",
    "Qualified",
    "Enrolled",
    "Rejected"
  ];

  const values = [
    stats.newLeads,
    stats.contacted,
    stats.interested,
    stats.followup,
    stats.qualified,
    stats.enrolled,
    stats.rejected
  ];

  const colors = [
    "#3b82f6",
    "#fb923c",
    "#8b5cf6",
    "#fbbf24",
    "#06b6d4",
    "#22c55e",
    "#ef4444"
  ];

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors
      }
    ]
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Leads",
        data: values,
        backgroundColor: colors
      }
    ]
  };

  return (

    <div
      style={{
        display: "flex",
        gap: "30px",
        marginTop: "40px",
        flexWrap: "wrap"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)",
          width: "420px"
        }}
      >

        <h3>Lead Status Distribution</h3>

        <Pie data={pieData} />

      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,.1)",
          width: "500px"
        }}
      >

        <h3>Leads by Status</h3>

        <Bar data={barData} />

      </div>

    </div>

  );

}

export default Charts;