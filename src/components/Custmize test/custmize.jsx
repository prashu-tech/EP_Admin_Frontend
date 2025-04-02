'use client';

import { BsArrowRight, BsSearch, BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useState } from 'react';

export default function StudentTestTable() {
  const students = [
    { id: 1, name: "AYAAN RAJE", studentId: "B1 - 1231", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 2, name: "TANVI SAWANT", studentId: "B1 - 1232", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 3, name: "WAJIHA JAFRI", studentId: "B1 - 1233", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 4, name: "NAJEEB SAYEED", studentId: "B1 - 1234", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 5, name: "SAAAD SHAIKH", studentId: "B1 - 1235", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 6, name: "IBRAHIM MULLA", studentId: "B1 - 1236", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 7, name: "ARFAT SHAIKH", studentId: "B1 - 1237", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 8, name: "SANDESH DAGADE", studentId: "B1 - 1238", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
  ];

  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter students based on search input
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to download data as CSV
  const downloadCSV = () => {
    const headers = ["SR.NO", "STUDENT NAME", "STUDENT ID", "TEST TYPE", "SUBJECT", "TOTAL MARKS"];
    const csvRows = [
      headers.join(","),
      ...students.map(student => [
        student.id,
        student.name,
        student.studentId,
        student.testType,
        student.subject,
        student.marks,
      ].join(","))
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_test_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="py-6 w-full max-w-full mx-2">
      {/* Search & Buttons Section */}
      <div className="flex flex-wrap justify-between items-center gap-5 mb-6 w-full mt-2">
        <div className="relative flex-1 w-full max-w-full">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            className="w-full pl-14 pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            <BsSearch />
          </span>
        </div>
        <div className="flex gap-2 w-auto">
          <button className="w-64 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition active:scale-95 ml-[-10px]">
            Customize Test
          </button>
          <button
            onClick={downloadCSV} // Add the downloadCSV function to the onClick event
            className="w-64 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex items-center active:scale-95"
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>

      {/* Filter Bar with Boxed Stats */}
      <div className="flex flex-wrap gap-2 mb-6 p-3 bg-white rounded-lg shadow hover:bg-white-100 w-full max-w-6xl mx-auto justify-between">
        {["Total Test: 8", "Average Marks: 180", "Physics Test: 8", "Target Test: 4", "Customized Test: 4"].map((item, index) => (
          <div
            key={index}
            className="px-6 py-2 min-w-[150px] bg-White-500 border border-gray-300 rounded-lg shadow text-base font-semibold text-center text-gray "
          >
            {item}
          </div>
        ))}
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 flex items-center justify-center transition active:scale-95">
          <FiFilter className="text-xl text-gray-700" /> <span className="ml-2">Filter</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="border-2 overflow-x-auto rounded-4xl max-w-5xl mx-auto">
        <table className="w-full border border-black shadow-md overflow-hidden">
          <thead className="bg-gray-100 border-b rounded-tl-lg rounded-tr-lg">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-4 border">SR.NO</th>
              <th className="p-4 border">STUDENT NAME</th>
              <th className="p-4 border">STUDENT ID</th>
              <th className="p-4 border">TEST TYPE</th>
              <th className="p-4 border">SUBJECT</th>
              <th className="p-4 border">TOTAL MARKS</th>
              <th className="p-4 border">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border text-center font-bold">{student.id}</td>
                <td className="p-4 border">{student.name}</td>
                <td className="p-4 border">{student.studentId}</td>
                <td className="p-4 border">
                  <span className={`font-medium ${student.testType === "Custom" ? "text-blue-500" : "text-gray-700"}`}>
                    {student.testType}
                  </span>
                </td>
                <td className="p-4 border-b border-black text-blue-500">{student.subject}</td>
                <td className="p-4 border">
                  <div className="relative w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-teal-400" style={{ width: "66%" }}></div>
                  </div>
                  <span className="block text-sm text-gray-600 mt-1">{student.marks}</span>
                </td>
                <td className="p-4 border text-center">
                  <button className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition active:scale-95">
                    <BsArrowRight className="text-lg text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
