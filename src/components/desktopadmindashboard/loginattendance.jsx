"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaUserGraduate } from "react-icons/fa";
import axios from "axios";
import Loading from "../Loading/Loading";

// Helper function to convert a date string into a day name (Mon, Tue, etc.)
const getDayName = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
};

// LoginAttendance Component
const LoginAttendance = () => {
  const [studentName, setStudentName] = useState(""); // Local state for student name
  const [testData, setTestData] = useState([]); // Local state to store the fetched test data
  const [loading, setLoading] = useState(true); // Loading state for API data
  const [error, setError] = useState(null); // Error state for API data
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on student name or ID

  // Fetch data when component is mounted
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // Correct API URL
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loginattendance/attendance`);

        setTestData(response.data.results || []); // Set the fetched data
        setFilteredData(response.data.results || []); // Initialize filtered data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch data"); // Handle any errors
        setLoading(false); // Set loading to false on error
      }
    };

    fetchTestData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Handle student name change and filter data based on the search
  const handleStudentNameChange = (e) => {
    const searchTerm = e.target.value;
    setStudentName(searchTerm);

    // Filter data by student name or ID
    const filtered = testData.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentId.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // If data is loading, show loading indicator
  if (loading) {
    return <div className="absolute top-[50%] left-[50%]">
    <Loading/>
  </div>; ;
  }

  // If there is an error fetching the data, show error message
  if (error) {
    return <div>{error}</div>;
  }

  // Format data for chart (just extract the necessary data for the chart from testData)
  const chartData = filteredData.flatMap((item) => {
    return item.attendance.map((attendance) => {
      const dayName = getDayName(attendance.day);  // Convert date into day name (Mon, Tue, etc.)
      return {
        day: dayName,  // Convert day to name (Mon, Tue, etc.)
        FullTest: attendance.FullTest || 0,
        MeTest: attendance.MeTest || 0,
        RecommendedTest: attendance.RecommendedTest || 0,
      };
    });
  });

  // Remove duplicate days and aggregate test counts
  const uniqueDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Fixed order of days
  const aggregatedData = {};

  // Initialize data for all days with zero values
  uniqueDays.forEach(day => {
    aggregatedData[day] = { day, FullTest: 0, MeTest: 0, RecommendedTest: 0 };
  });

  // Aggregate the data for the filtered test results
  chartData.forEach((item) => {
    if (aggregatedData[item.day]) {
      aggregatedData[item.day].FullTest += item.FullTest;
      aggregatedData[item.day].MeTest += item.MeTest;
      aggregatedData[item.day].RecommendedTest += item.RecommendedTest;
    }
  });

  // Prepare the final aggregated data for the chart
  const finalChartData = uniqueDays.map((day) => aggregatedData[day]);

  // Custom tick formatter for the Y-Axis to show values like 1, 2, 4, etc.
  const formatYAxisTicks = (tickValue) => {
    return tickValue % 1 === 0 ? tickValue : ''; // Only show whole numbers
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[38rem] pb-20 ">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Students"
          className="border border-blue-400 rounded-lg px-4 py-2 w-1/3 outline-none"
          value={studentName}
          onChange={handleStudentNameChange}
        />

        <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full gap-2">
          <FaUserGraduate />
          <span>{studentName || "Student Name"}</span>
        </div>
      </div>

      {/* Title & Profile */}
      <div className="flex items-center justify-between gap-10">
        <h2 className="text-2xl font-semibold mb-4">Login Attendance</h2>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={finalChartData}>
          <XAxis dataKey="day" />
          <YAxis tickFormatter={formatYAxisTicks} />
          <Tooltip />
          <Legend />
          <Bar dataKey="FullTest" stackId="a" fill="#1E40AF" />
          <Bar dataKey="MeTest" stackId="a" fill="#EF4444" />
          <Bar dataKey="RecommendedTest" stackId="a" fill="#FACC15" />
        </BarChart>
      </ResponsiveContainer>

      {/* Show total test counts */}
      <div className="mt-4">
        <p><strong>Total Full Test:</strong> {finalChartData.reduce((acc, item) => acc + (item.FullTest || 0), 0)}</p>
        <p><strong>Total Me Test:</strong> {finalChartData.reduce((acc, item) => acc + (item.MeTest || 0), 0)}</p>
        <p><strong>Total Recommend Test:</strong> {finalChartData.reduce((acc, item) => acc + (item.RecommendedTest || 0), 0)}</p>
      </div>
    </div>
  );
};

export default LoginAttendance;
