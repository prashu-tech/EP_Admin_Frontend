'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13's app directory
import { BsArrowRight, BsSearch, BsDownload } from "react-icons/bs";

export default function StudentTestTable() {
  // State to manage students data and search query
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const router = useRouter(); // Initialize the useRouter hook from Next.js (next/navigation)

  // Dummy student data
  const dummyStudents = [
    { id: 1, name: "AYAAN RAJE", studentId: "B1 - 1231", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 2, name: "TANVI SAWANT", studentId: "B1 - 1232", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 3, name: "WAJIHA JAFRI", studentId: "B1 - 1233", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 4, name: "NAJEEB SAYEED", studentId: "B1 - 1235", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 5, name: "SAAAD SHAIKH", studentId: "B1 - 1236", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 6, name: "IBRAHIM MULLA", studentId: "B1 - 1237", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
    { id: 7, name: "ARFAT SHAIKH", studentId: "B1 - 1238", testType: "TARGET", subject: "PHYSICS", marks: "120/180" },
    { id: 8, name: "SANDESH DAGADE", studentId: "B1 - 1239", testType: "Custom", subject: "PHYSICS", marks: "120/180" },
  ];

  // Simulating an API call or some async operation to fetch students data
  useEffect(() => {
    // You can replace this with a real API call
    setStudents(dummyStudents); // For now, setting dummy data
  }, []);

  // Handling student name click to route to the student details page
  const handleStudentClick = (studentId) => {
    // Navigate to the student details page using Next.js's router
    router.push(`/student/${studentId}`);
  };

  // Function to download the student data as CSV
  const downloadCSV = () => {
    // Create the CSV headers
    const headers = ['SR.NO', 'STUDENT NAME', 'STUDENT ID', 'TEST TYPE', 'SUBJECT', 'TOTAL MARKS'];
    
    // Map the students to CSV data
    const rows = students.map(student => [
      student.id, 
      student.name, 
      student.studentId, 
      student.testType, 
      student.subject, 
      student.marks
    ]);

    // Convert the data to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link for the CSV
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Create a URL for the Blob and set the download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'students_data.csv');

      // Simulate a click on the link to trigger the download
      link.click();
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
    }
  };

  // Filtered students based on search query
  const filteredStudents = students.filter(student => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      {/* Search & Buttons Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
            className="w-full pl-14 pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            <BsSearch />
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <button className="px-6 py-3 w-full sm:w-2/3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition active:scale-95 cursor-pointer">
          Practice Test
          </button>

          <button 
            className="px-6 py-3 w-full sm:w-2/3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center active:scale-95 cursor-pointer"
            onClick={downloadCSV} // Trigger the download when clicked
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-1 overflow-x-auto rounded-lg">
        <table className="w-full border border-black shadow-md overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-100 border-b border-black">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="p-4 border border-black rounded-tl-lg">SR.NO</th>
              <th className="p-4 border border-black">STUDENT NAME</th>
              <th className="p-4 border border-black">STUDENT ID</th>
              <th className="p-4 border border-black">TEST TYPE</th>
              <th className="p-4 border border-black">SUBJECT</th>
              <th className="p-4 border border-black">TOTAL MARKS</th>
              <th className="p-4 border border-black rounded-tr-lg">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                key={student.id}
                className={`border-b border-black hover:bg-gray-50 ${
                  index === filteredStudents.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <td className="p-4 border border-black text-center font-bold">{student.id}</td>
                <td className="p-4 border border-black">
                  {/* Make the student name clickable */}
                  <button
                    className="text-black-500 hover:underline"
                    onClick={() => handleStudentClick(student.id)} // Use student ID for routing
                  >
                    {student.name}
                  </button>
                </td>
                <td className="p-4 border border-black">{student.studentId}</td>
                <td className="p-4 border border-black">
                  <span
                    className={`font-medium ${
                      student.testType === "Custom" ? "text-blue-500" : "text-gray-700"
                    }`}
                  >
                    {student.testType}
                  </span>
                </td>
                <td className="p-4 border border-black text-blue-500 underline">{student.subject}</td>
                <td className="p-4 border border-black">
                  {/* Progress Bar */}
                  <div className="relative w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-teal-400" style={{ width: "66%" }}></div>
                  </div>
                  <span className="block text-sm text-gray-600 mt-1">{student.marks}</span>
                </td>
                <td className="p-4 border border-black text-center">
                  {/* Action Button */}
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
