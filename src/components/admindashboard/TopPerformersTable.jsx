"use client";
import React from "react";

const TopPerformersTable = ({ selectedMode }) => {
  // Define data for both Practice and Customized
  const practiceData = [
    {
      rank: 1,
      studentId: "100030689",
      name: "Ayaan Raje",
      score: "Physics",
      practices: "Thermo",
      testCount: "Practice",
      accuracy: 80,
      speed: 80,
    },
    {
      rank: 2,
      studentId: "100030688",
      name: "Muskan Shaikh",
      score: "Biology",
      practices: "Thermo",
      testCount: "Practice",
      accuracy: 97,
      speed: 97,
    },
    {
      rank: 3,
      studentId: "100030687",
      name: "Tanvi Sawant",
      score: "Chemistry",
      practices: "Thermo",
      testCount: "Practice",
      accuracy: 81,
      speed: 81,
    },
    {
      rank: 4,
      studentId: "100030686",
      name: "Wajiha Jafri",
      score: "Physics",
      practices: "Thermo",
      testCount: "Practice",
      accuracy: 70,
      speed: 70,
    },
  ];

  const customizedData = [
    {
      rank: 1,
      studentId: "100030689",
      name: "Ayaan Raje",
      score: "Physics",
      practices: "Thermo",
      testCount: "Customized",
      accuracy: 90,
      speed: 85,
    },
    {
      rank: 2,
      studentId: "100030688",
      name: "Muskan Shaikh",
      score: "Biology",
      practices: "Thermo",
      testCount: "Customized",
      accuracy: 95,
      speed: 92,
    },
    {
      rank: 3,
      studentId: "100030687",
      name: "Tanvi Sawant",
      score: "Chemistry",
      practices: "Thermo",
      testCount: "Customized",
      accuracy: 88,
      speed: 89,
    },
    {
      rank: 4,
      studentId: "100030686",
      name: "Wajiha Jafri",
      score: "Physics",
      practices: "Thermo",
      testCount: "Customized",
      accuracy: 76,
      speed: 80,
    },
  ];

  // Select data based on the selected mode
  const dataToDisplay = selectedMode === "Practice" ? practiceData : customizedData;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 rounded-xl mt-10">
      {/* Title and Previous Test Button */}
      <div className="flex justify-between items-center bg-blue-200 p-4 rounded-t-xl shadow-lg">
        <h2 className="text-lg font-semibold text-blue-700">Top Performer</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer">
          Previous Test
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto mt-0 rounded-t-2xl ">
        <thead>
          <tr className="bg-[#F5F5F5] text-gray-700">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Student ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Practices</th>
            <th className="p-3 text-left">Test Count</th>
            <th className="p-3 text-left">Accuracy</th>
            <th className="p-3 text-left">Speed</th>
          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((performer) => (
            <tr key={performer.rank} className="border-b border-gray-200">
              <td className="p-3">{performer.rank}</td>
              <td className="p-3">{performer.studentId}</td>
              <td className="p-3">{performer.name}</td>
              <td className="p-3">{performer.score}</td>
              <td className="p-3">{performer.practices}</td>
              <td className="p-3">{performer.testCount}</td>
              <td className="p-3">{performer.accuracy}</td>
              <td className="p-3">{performer.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformersTable;
