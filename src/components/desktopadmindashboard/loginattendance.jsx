"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaUserGraduate } from "react-icons/fa";

// Comprehensive chart data for all three sub-batches (B21, B22, B23).
const chartDataMap = {
  B21: [
    { day: "Mon", Active: 3, Inactive: 2, Away: 2 },
    { day: "Tue", Active: 4, Inactive: 2, Away: 3 },
    { day: "Wed", Active: 5, Inactive: 1, Away: 2 },
    { day: "Thu", Active: 6, Inactive: 3, Away: 1 },
    { day: "Fri", Active: 4, Inactive: 2, Away: 2 },
    { day: "Sat", Active: 5, Inactive: 3, Away: 2 },
    { day: "Sun", Active: 3, Inactive: 2, Away: 4 },
  ],
  B22: [
    { day: "Mon", Active: 5, Inactive: 3, Away: 1 },
    { day: "Tue", Active: 3, Inactive: 3, Away: 2 },
    { day: "Wed", Active: 4, Inactive: 2, Away: 2 },
    { day: "Thu", Active: 3, Inactive: 4, Away: 2 },
    { day: "Fri", Active: 6, Inactive: 2, Away: 2 },
    { day: "Sat", Active: 4, Inactive: 2, Away: 3 },
    { day: "Sun", Active: 5, Inactive: 1, Away: 3 },
  ],
  B23: [
    { day: "Mon", Active: 2, Inactive: 3, Away: 3 },
    { day: "Tue", Active: 6, Inactive: 1, Away: 2 },
    { day: "Wed", Active: 5, Inactive: 2, Away: 1 },
    { day: "Thu", Active: 4, Inactive: 2, Away: 3 },
    { day: "Fri", Active: 5, Inactive: 3, Away: 2 },
    { day: "Sat", Active: 6, Inactive: 1, Away: 2 },
    { day: "Sun", Active: 7, Inactive: 2, Away: 1 },
  ],
};

const LoginAttendance = () => {
  // Local state for sub-batch & student name
  const [subBatch, setSubBatch] = useState("B21");
  const [studentName, setStudentName] = useState("Harsh Koli");

  // Combine sub-batch to grab the correct data
  const currentData = chartDataMap[subBatch] || [];

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
          onChange={(e) => setStudentName(e.target.value)}
        />

        {/* Sub-Batch Dropdown */}
        <select
          className="border border-blue-400 rounded-lg px-4 py-2 outline-none"
          value={subBatch}
          onChange={(e) => setSubBatch(e.target.value)}
        >
          <option value="B21">Batch B21</option>
          <option value="B22">Batch B22</option>
          <option value="B23">Batch B23</option>
        </select>
      </div>

      {/* Title & Profile */}
      <div className="flex items-center justify-between gap-10">
        <h2 className="text-2xl font-semibold mb-4">Login Attendance</h2>
        <div className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full gap-2">
          <FaUserGraduate />
          {/* Show typed name or fallback to "Harsh Koli" */}
          <span>{studentName || "Harsh Koli"}</span>
        </div>
      </div>

      {/* Warning if no data found */}
      {currentData.length === 0 && (
        <div className="text-red-500 font-semibold mb-2">
          No chart data found for "{subBatch}" sub-batch.
        </div>
      )}

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={currentData}>
          <XAxis dataKey="day" />
          <YAxis domain={[0, 20]} tickFormatter={(val) => `${val}-0hrs`} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Active" stackId="a" fill="#1E40AF" />
          <Bar dataKey="Inactive" stackId="a" fill="#EF4444" />
          <Bar dataKey="Away" stackId="a" fill="#FACC15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoginAttendance;
