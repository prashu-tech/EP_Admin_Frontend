"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
// You can import Axios or use fetch later for actual API calls

const StudentActivityCard = () => {
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

  return (
    <div
      className="relative p-6 shadow-lg w-[24rem] max-w-4xl mx-auto mt-8 bg-[#F54E60]"
      style={{
        backgroundImage: `url('/Vector 1.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title */}
      <h2 className="text-gray-100 text-2xl font-semibold mb-22">
        Students That Have Not Logged In Since Last 7 Days
      </h2>

      <div className="flex items-center justify-between">

        {/* Tag Section */}
        <div className="absolute top-26 mt-14 flex space-x-0.2 bg-[#E7E7E7] p-2 rounded-sm translate-y-1/2">
          {/* Dynamically render tags */}
          {studentData.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-sm ${
                tag === "26+" ? "bg-green-300 text-black" : "bg-blue-300 text-black"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Student Info Box */}
        <div className="absolute right-5 top-24 flex items-center space-x-4 bg-[#E1F0FF] p-4 rounded-lg shadow-md transform translate-y-1/2">
          <span className="text-blue-500 text-5xl">
            <AiOutlineUserAdd />
          </span>
          <div className="flex flex-col">
            {/* Dynamically render student count */}
            <h3 className="text-3xl font-semibold text-gray-800 flex justify-center">{studentData.studentCount}</h3>
            <h3 className="text-sm font-semi text-gray-800">Students</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentActivityCard;
