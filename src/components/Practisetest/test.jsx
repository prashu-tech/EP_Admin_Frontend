'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci"; // Import CiSearch icon from react-icons/ci
import { BsDownload } from "react-icons/bs";
import axios from 'axios'; // Import axios to fetch data
import { ArrowRightCircle } from 'lucide-react'; // Import Arrow icon

export default function Practisetest() {
  const [students, setStudents] = useState([]); // State for student data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter(); // Initialize the useRouter hook from Next.js (next/navigation)

  // Fetch data from the API once and store it in localStorage to persist it across refreshes
  useEffect(() => {
    // Check if students data exists in localStorage
    const storedStudents = localStorage.getItem('studentsData');

    if (storedStudents) {
      // If data exists in localStorage, set it to state
      setStudents(JSON.parse(storedStudents));
    } else {
      // If no data in localStorage, make an API request to fetch students
      const fetchStudents = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/practicetest/practice`);
          const fetchedData = response.data.results;
          setStudents(fetchedData);

          // Store the fetched data in localStorage for subsequent page refreshes
          localStorage.setItem('studentsData', JSON.stringify(fetchedData));
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      fetchStudents();
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handling student name click to route to the student details page
  const handleStudentClick = (studentId) => {
    router.push(`/student/${studentId}`);
  };

  // Function to download the student data as CSV
  const downloadCSV = () => {
    const headers = ['SR.NO', 'STUDENT NAME', 'STUDENT ID', 'TEST NAME', 'SUBJECT', 'TOTAL MARKS', 'MARKS OBTAINED'];
    const rows = students.map((student, index) => [
      index + 1,
      student.fullName,
      student.studentId,
      student.testName,
      student.subject,
      student.totalMarks,
      student.marksObtained
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'students_data.csv');
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Filtered students based on search query
 // Filtered students based on search query
const filteredStudents = students.filter(student => {
  return (
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(student.studentId).toLowerCase().includes(searchQuery.toLowerCase()) // Convert studentId to string before using toLowerCase
  );
});

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="relative w-full sm:flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
            className="w-full pl-19 pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-3xl">
            <CiSearch />
          </span>
        </div>

        <div className="flex lg:flex-row justify-end flex-row gap-4 w-full lg:max-w-lg">
          <button className="px-6 text-[14px] lg:text-[18px] py-3 w-fit lg:w-full sm:w-2/3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition active:scale-95 cursor-pointer">
            Practice Test
          </button>

          <button
            className="lg:px-6 px-2 py-3 w-fit lg:w-full sm:w-2/3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center active:scale-95 cursor-pointer"
            onClick={downloadCSV} // Trigger the download when clicked
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>

      <div className="border-2 overflow-x-auto rounded-xl lg:rounded-4xl w-full mx-auto">
        <table className="w-full border border-black shadow-amber-100 overflow-hidden">
          <thead className="bg-white-100 border-b border-black">
            <tr className="text-center text-sm font-bold text-[2B313E]">
              <th className="p-4 border-2 border-black rounded-tl-lg border-r-white">SR.NO</th>
              <th className="p-4 border-2 border-black border-r-white">STUDENT NAME</th>
              <th className="p-4 border-2 border-black border-r-white">STUDENT ID</th>
              <th className="p-4 border-2 border-black border-r-white">TEST NAME</th>
              <th className="p-4 border-2 border-black border-r-white">SUBJECT</th>
              <th className="p-4 border-2 border-black border-r-white">TOTAL MARKS</th>
              <th className="p-4 border-2 border-black rounded-tr-lg">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredStudents.map((student, index) => (
              <tr key={`${student.studentId}-${student.testName}`} className="border-b border-black hover:bg-gray-50">
                <td className="p-4 border-2 border-black text-center font-bold">{index + 1}</td>
                <td className="p-4 border-2 border-black">{student.fullName}</td>
                <td className="p-4 border-2 border-black">{student.studentId}</td>
                <td className="p-4 border-2 border-black">{student.testName}</td>
                <td className="p-4 border-2 border-black text-[#00B0FF] ">{student.subject}</td>
                <td className="p-4 border-2 border-black">
                  <span className="block text-sm text-gray-600 mt-1 w-full">{student.marksObtained} / {student.totalMarks}</span>
                </td>
                <td className="p-4 border-2 border-black text-center">
                  <button
                    className="text-black hover:text-black font-bold"
                    onClick={() => handleStudentClick(student.studentId)}
                  >
                    <ArrowRightCircle size={24} strokeWidth={3.5} />
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
