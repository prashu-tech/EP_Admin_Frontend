"use client";
import React from "react";

const SpotlightOnImprovementTablemobile = ({ selectedMode }) => {
  // Data for both Previous Test and Customized
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

  // Select data based on the selected mode (Previous Test or Customized)
  const dataToDisplay = selectedMode === "Practice" ? practiceData : customizedData;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 shadow-lg">
      {/* Title and Previous Test Button */}
      <div className="flex justify-between items-center bg-blue-200 p-4 rounded-t-xl shadow-lg">
        <h2 className="text-lg font-semibold text-blue-700">Spotlight on Improvement</h2>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm font-bold blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
          Previous Test
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-0 rounded-t-lg">
          <thead>
            <tr className="bg-[#F5F5F5] text-gray-700">
              <th className="p-3 text-left text-sm md:text-base">Rank</th>
              <th className="p-3 text-left text-sm md:text-base">Student ID</th>
              <th className="p-3 text-left text-sm md:text-base">Name</th>
              <th className="p-3 text-left text-sm md:text-base">Score</th>
              <th className="p-3 text-left text-sm md:text-base">Practices</th>
              <th className="p-3 text-left text-sm md:text-base">Test Count</th>
              <th className="p-3 text-left text-sm md:text-base">Accuracy</th>
              <th className="p-3 text-left text-sm md:text-base">Speed</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((performer) => (
              <tr key={performer.rank} className="border-b border-gray-200">
                <td className="p-3 text-sm md:text-base">{performer.rank}</td>
                <td className="p-3 text-sm md:text-base">{performer.studentId}</td>
                <td className="p-3 text-sm md:text-base">{performer.name}</td>
                <td className="p-3 text-sm md:text-base">{performer.score}</td>
                <td className="p-3 text-sm md:text-base">{performer.practices}</td>
                <td className="p-3 text-sm md:text-base">{performer.testCount}</td>
                <td className="p-3 text-sm md:text-base">{performer.accuracy}</td>
                <td className="p-3 text-sm md:text-base">{performer.speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpotlightOnImprovementTablemobile;
