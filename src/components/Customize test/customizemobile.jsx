'use client';
import { CiSearch } from "react-icons/ci"; 
import { BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/router
import { ArrowRightCircle, Download } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import the router from next/navigation


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

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // Initialize the router

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.studentId.toLowerCase().includes(searchLower) || 
      student.id.toString().includes(searchLower)
    );
  });

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

  // Handle the Action Button Click
  const handleActionClick = (studentId) => {
    // Navigate to the student details page
    router.push(`/student/${studentId}`); // This will navigate to the dynamic route (e.g., /student/1)
  };

  return (
    <div className="py-6 w-full mx-auto px-4 lg:px-6">
      {/* Search & Buttons Section */}
      <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-6 w-full mt-2">
        <div className="relative flex-1 w-full max-w-full">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            className="lg:w-full w-[400px] pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md text-sm placeholder:text-gray-500 pl-19"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-4xl">
            <CiSearch />
          </span>
        </div>
        <div className="flex justify-end lg:w-fit w-full gap-2 px-6 mt-4 lg:mt-0">
          <button className="lg:w-64 w-full lg:px-6 lg:py-3 px-4 py-3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition active:scale-95 ml-[-11px]">
            Customized Test
          </button>
          <button
            onClick={downloadCSV}
            className="lg:w-64 w-full lg:px-6 lg:py-3 px-4 py-3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex items-center active:scale-95"
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>

      {/* Filter Bar with Boxed Stats */}
      <div className="lg:flex grid grid-cols-2 lg:grid-cols-5 grid-cols-1 lg:flex-wrap gap-2 mb-6 p-3 bg-white rounded-lg drop-shadow hover:bg-white-100 w-full max-w-6xl mx-auto lg:justify-between">
        {["Total Test: 8", "Average Marks: 180", "Physics Test: 8", "Target Test: 4", "Customized Test: 4"].map((item, index) => (
          <div
            key={index}
            className="px-6 py-2 min-w-[150px] bg-White-500 border border-gray-300 shadow text-base font-Regular text-center text-gray "
          >
            {item}
          </div>
        ))}
        <button className="px-6 py-2 bg-white border border-gray-300 shadow hover:bg-gray-100 flex items-center justify-center transition active:scale-95">
          <FiFilter className="text-xl text-gray-700" /> <span className="ml-2">Filter</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="border-2 overflow-x-auto rounded-xl lg:rounded-4xl w-full mx-auto">
        <table className="w-full border border-black shadow-md overflow-x-auto">
          <thead className="bg-white-100 border-b rounded-xl">
            <tr className="text-left text-sm font-bold text-[2B313E]">
              <th className="p-4 border border-r-white rounded-tl-lg">SR.NO</th>
              <th className="p-4 border border-r-white">STUDENT NAME</th>
              <th className="p-4 border border-r-white">STUDENT ID</th>
              <th className="p-4 border border-r-white">TEST TYPE</th>
              <th className="p-4 border border-r-white">SUBJECT</th>
              <th className="p-4 border border-r-white">TOTAL MARKS</th>
              <th className="p-4 border border-r-white">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border text-center font-bold">{student.id}</td>
                <td className="p-4 border">
                  <Link href={`/student/${student.id}`}>
                    <a className="text-black-600 hover:underline">{student.name}</a>
                  </Link>
                </td>
                <td className="p-4 border">{student.studentId}</td>
                <td className="p-4 border">{student.testType}</td>
                <td className="p-4 border-b border-black text-[#00B0FF]">{student.subject}</td>
                <td className="p-4 border">{student.marks}</td>
                <td className="p-4 border text-center">
                  <button
                    className="text-black hover:text-black font-bold"
                    onClick={() => handleActionClick(student.id)} // Trigger action on click
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
