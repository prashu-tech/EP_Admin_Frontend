"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

// You can import Axios or use fetch later for actual API calls
const StudentActivityCardmobile = () => {
  // Dummy data for now
  const [studentData, setStudentData] = useState({
    studentCount: 30,
    tags: ["P", "T", "T", "T", "T", "26+"],
  });

  // Simulating data fetch using useEffect (can be replaced with real API calls later)
  useEffect(() => {
    // Simulate a delay (replace with actual API call logic later)
    setTimeout(() => {
      setStudentData({
        studentCount: 30, // This can come from the backend later
        tags: ["P", "T", "T", "T", "T", "26+"], // This can come from the backend later
      });
    }, 1000); // 1-second delay for simulation
  }, []);

  // Predefined background colors based on index or tag
  const circleColors = ["bg-yellow-400", "bg-blue-500", "bg-yellow-400", "bg-blue-500", "bg-black"];

  return (
    <div
      className="relative p-6 shadow-lg w-[24rem] max-w-full mx-auto mt-8 bg-[#F54E60] sm:w-full"
      style={{
        backgroundImage: `url('/Vector 1.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title */}
      <h2 className="text-gray-100 text-2xl font-semibold mb-16 sm:mb-4">
        Students That Have Not Logged In Since Last 7 Days
      </h2>

      <div className="flex flex-col justify-between sm:flex-row sm:items-start sm:justify-between sm:space-x-4 shadow-lg">

        {/* Tag Section */}
        <div className="absolute top-24 sm:top-16 mt-10 drop-shadow-xl flex justify-between sm:space-x-2 bg-[#E7E7E7] p-2 rounded-lg translate-y-1/2">
          {/* Dynamically render tags */}
          {studentData.tags.map((tag, index) => (
            <span
              key={index}
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold  z-[${index}] -ml-4 first:ml-0 ${
                circleColors[index] || "bg-blue-300"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Student Info Box */}
        <div className="absolute right-5 top-20 flex items-center space-x-4 bg-[#E1F0FF] p-4 rounded-lg shadow-md transform translate-y-1/2 sm:w-auto sm:ml-auto sm:mt-0">
          <span className="text-blue-500 text-5xl sm:text-4xl">
            <AiOutlineUserAdd />
          </span>
          <div className="flex flex-col">
            {/* Dynamically render student count */}
            <h3 className="text-3xl font-semibold text-gray-800 flex justify-center sm:text-2xl">{studentData.studentCount}</h3>
            <h3 className="text-sm font-semi text-gray-800 sm:text-xs">Students</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentActivityCardmobile;
