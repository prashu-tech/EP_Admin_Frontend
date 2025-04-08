"use client";

import React, { useState, useEffect } from "react";

const AttendanceComponent = ({ selectedMode }) => {
  // Example of dynamic data fetched from an API or set as mock data
  const [attendanceData, setAttendanceData] = useState([
    { testName: "Test 1", date: "02/04/2025", progress: 60, image: "/AttendanceComponent_img.svg" },
    { testName: "Test 2", date: "02/04/2025", progress: 80, image: "/AttendanceComponent_img.svg" },
    { testName: "Test 3", date: "02/04/2025", progress: 90, image: "/AttendanceComponent_img.svg" },
  ]);

  const [selectedTest, setSelectedTest] = useState("Test 1");
  const [selectedDate, setSelectedDate] = useState("02/04/2025");

  // Dummy API call simulation for dynamic data change
  useEffect(() => {
    // Simulate data change based on selectedMode
    if (selectedMode === "Practice") {
      setAttendanceData([
        { testName: "Test 1", date: "02/04/2025", progress: 90, image: "/AttendanceComponent_img.svg" },
        { testName: "Test 2", date: "02/04/2025", progress: 95, image: "/AttendanceComponent_img.svg" },
        { testName: "Test 3", date: "02/04/2025", progress: 99, image: "/AttendanceComponent_img.svg" },
      ]);
    } else if (selectedMode === "Customized") {
      setAttendanceData([
        { testName: "Test 1", date: "03/04/2025", progress: 35, image: "/AttendanceComponent_img.svg" },
        { testName: "Test 2", date: "03/04/2025", progress: 35, image: "/AttendanceComponent_img.svg" },
        { testName: "Test 3", date: "03/04/2025", progress: 25, image: "/AttendanceComponent_img.svg" },
      ]);
    }
  }, [selectedMode]); // This will run every time selectedMode changes

  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Attendance Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-15">
          <h2 className="text-xl text-Montserrat font-semibold">Attendance</h2>
          {/* Attendance Percentage Circle */}
          <div className="flex justify-center items-center w-20 h-20 shadow-2xl rounded-full bg-blue-500 text-white text-3xl font-semibold">
            80%
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Test Name Dropdown */}
          <select
            value={selectedTest}
            onChange={handleTestChange}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-600"
          >
            {attendanceData.map((data, index) => (
              <option key={index} value={data.testName}>
                {data.testName}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-600"
          />
        </div>
      </div>

      {/* Dynamic Test Results */}
      <div className="space-y-10 mt-10">
        {attendanceData.map((data, index) => (
          <div key={index} className="flex gap-15 items-center">
            <div className="flex items-center">
              {/* Image Icon */}
              <div className="w-40 h-10 flex items-center justify-center">
                <img src={data.image} alt={data.testName} className="" />
              </div>
            </div>
            <div className="flex-col w-full">
              <span className="text-md font-semibold">{data.testName}</span>
              <div className=" bg-gray-200 rounded-full h-2 relative">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${data.progress}%`,
                    backgroundColor: data.progress > 80 ? "#16DBCC" : "#FE5C73",
                  }}
                ></div>
              </div>
            </div>
            <span className="text-sm pl-6 text-gray-500">{data.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceComponent;
