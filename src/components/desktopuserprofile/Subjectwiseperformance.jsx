"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ModeSwitcherChart = ({ selectedMode, subjectTotals }) => {
  // Ensure subjectTotals is defined and not null
  if (!subjectTotals || Object.keys(subjectTotals).length === 0) {
    return <div>Loading...</div>; // Show loading message or empty state
  }

  // Dynamically generate chart data based on subjectTotals
  const chartData = {
    labels: Object.keys(subjectTotals), // Labels are the subject names (Physics, Chemistry, Biology)
    datasets: [
      {
        data: Object.values(subjectTotals), // Data is the total marks for each subject
        backgroundColor: ["#3b82f6", "#34d399", "#8b5cf6"], // Colors for each section
        borderColor: ["#2563eb", "#10b981", "#6b21a8"], // Border colors
        borderWidth: 1,
      },
    ],
  };

  // Determine the title based on selected mode
  const title =
    selectedMode === "Practice"
      ? "Subject Wise Performance"
      : "Customized Subject Wise Performance";

  return (
    <div className="flex flex-col items-center space-y-6 my-10 px-4 sm:px-10 w-full max-w-[500px] mx-auto">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-center">{title}</h2>

      {/* Pie Chart */}
      <div className="w-full h-auto max-w-[350px] sm:max-w-[400px]">
        <Pie data={chartData} />
      </div>

      {/* Labels for Subjects */}
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
        {chartData.labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 rounded-4xl bg-[#F2F4FE] p-2 shadow-md mb-2"
          >
            <div
              className={`w-4 h-4 rounded-sm ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                  ? "bg-green-500"
                  : "bg-purple-500"
              }`}
            />
            <span className="text-sm sm:text-base">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeSwitcherChart;
