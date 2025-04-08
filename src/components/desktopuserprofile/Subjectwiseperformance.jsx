"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// Data for Practice and Customized modes
const practiceData = {
  title: "Subject Wise Performance",
  chartData: {
    labels: ["Zoology", "Chemistry", "Physics", "Bootany"],
    datasets: [
      {
        data: [60, 20, 15, 5],
        backgroundColor: ["#3b82f6", "#34d399", "#8b5cf6", "#9333ea"], // Colors for each section
        borderColor: ["#2563eb", "#10b981", "#6b21a8", "#6b21a8"], // Border colors
        borderWidth: 1,
      },
    ],
  },
};

const customizedData = {
  title: "Customized Subject Wise Performance",
  chartData: {
    labels: ["Mathematics", "Physics", "Chemistry", "Biology"],
    datasets: [
      {
        data: [50, 30, 15, 5],
        backgroundColor: ["#3b82f6", "#34d399", "#8b5cf6", "#9333ea"], // Colors for each section
        borderColor: ["#2563eb", "#10b981", "#6b21a8", "#6b21a8"], // Border colors
        borderWidth: 1,
      },
    ],
  },
};

const ModeSwitcherChart = ({ selectedMode }) => {
  // Determine which data to show based on the selected mode
  const selectedData = selectedMode === "Practice" ? practiceData : customizedData;

  return (
    <div className="flex flex-col items-center space-y-6 my-10 px-10 w-[500px] h-[350px]">
      {/* Title */}
      <h2 className="text-xl w-full font-semibold">{selectedData.title}</h2>

      {/* Pie Chart */}
      <div className="w-72 h-72">
        <Pie data={selectedData.chartData} />
      </div>

      {/* Labels for Subjects */}
      <div className="flex justify-center space-x-6 ">
        {selectedData.chartData.labels.map((label, index) => (
          <div key={index} className="flex items-center rounded-4xl bg-[#F2F4FE] p-2 shadow-md">
            <div
              className={`w-4 h-4 rounded-sm ${index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : index === 2 ? "bg-purple-500" : "bg-pink-500"}`}
            />
            <span className="ml-2">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeSwitcherChart;
