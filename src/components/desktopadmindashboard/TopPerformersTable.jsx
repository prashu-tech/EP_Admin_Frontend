<<<<<<< HEAD

"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const TopPerformersTable = ({ selectedMode }) => {
  // State for storing the test data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the test summaries when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Select API URL based on the selected mode
        const apiUrl =
          selectedMode === "Practice"
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/topperformance`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/topperformancecustomize`;

        // Fetch data from the selected mode's API
        const response = await axios.get(apiUrl);
        setData(response.data.results); // Store the results in state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data"); // Handle any errors
        setLoading(false);
      }
    };

    // Fetch data when mode changes
    fetchData();
  }, [selectedMode]); // Dependency array ensures fetchData is called when selectedMode changes

  // Helper function to safely join arrays or return N/A
  const safeJoin = (array) => {
    return Array.isArray(array) ? array.join(" ") : "N/A";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
=======
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
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb

  return (
    <div className="w-full max-w-4xl mx-auto p-4 rounded-xl mt-10 shadow-lg">
      {/* Title and Previous Test Button */}
      <div className="flex justify-between items-center bg-blue-200 p-4 rounded-t-xl shadow-lg">
<<<<<<< HEAD
        <h2 className="text-lg font-semibold text-blue-700">Top Performers</h2>
=======
        <h2 className="text-lg font-semibold text-blue-700">Top Performer</h2>
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        <button className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm font-bold cursor-pointer border-blue-500 hover:bg-blue-500 hover:text-white">
          Previous Test
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-0 rounded-t-xl">
          <thead>
            <tr className="bg-[#F5F5F5] text-gray-700">
              <th className="p-3 text-left text-sm md:text-base">Rank</th>
              <th className="p-3 text-left text-sm md:text-base">Student ID</th>
              <th className="p-3 text-left text-sm md:text-base">Name</th>
<<<<<<< HEAD
              <th className="p-3 text-left text-sm md:text-base">Subject</th>
              <th className="p-3 text-left text-sm md:text-base">Test Name</th>
              <th className="p-3 text-left text-sm md:text-base">Test Count</th>
              <th className="p-3 text-left text-sm md:text-base">Accuracy</th>
              <th className="p-3 text-left text-sm md:text-base">Marks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((performer) => (
              <tr key={performer.rank} className="border-b border-gray-200">
                <td className="p-3 text-sm md:text-base">{performer.rank}</td>
                <td className="p-3 text-sm md:text-base">{performer.studentId}</td>
                <td className="p-3 text-sm md:text-base">{performer.fullName}</td>
                <td className="p-3 text-sm md:text-base">
                  {safeJoin(performer.subjectWisePerformance)}
                </td>
                <td className="p-3 text-sm md:text-base">
                  {safeJoin(performer.testNames)}
                </td>
                <td className="p-3 text-sm md:text-base">{performer.testsTaken}</td>
                <td className="p-3 text-sm md:text-base">{performer.accuracy}%</td>
                <td className="p-3 text-sm md:text-base">{performer.averageMarks}</td>
=======
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
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformersTable;
