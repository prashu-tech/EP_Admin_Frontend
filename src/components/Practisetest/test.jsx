'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
import { IoDownloadOutline, IoSchoolOutline, IoBookOutline, IoCheckmarkCircleOutline, IoArrowForward } from "react-icons/io5";
import axios from 'axios';

export default function PracticeTest() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch data from the API once and store it in localStorage to persist it across refreshes
  useEffect(() => {
    // Check if students data exists in localStorage
    const storedStudents = localStorage.getItem('studentsData');

    if (storedStudents) {
      // If data exists in localStorage, set it to state
      setStudents(JSON.parse(storedStudents));
      setIsLoading(false);
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
        } finally {
          setIsLoading(false);
        }
      };

      fetchStudents();
    }
  }, []); 

  // Handling student name click to route to the student details page
  const handleStudentClick = (studentId) => {
    router.push(`/desktopuserprofile`);
    localStorage.setItem("studentId", studentId);
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
      link.setAttribute('download', 'students_test_results.csv');
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Filtered students based on search query
  const filteredStudents = students.filter(student => {
    const q = searchQuery.toLowerCase();
    return (
      (student.fullName || "").toLowerCase().includes(q) ||
      String(student.studentId || "").toLowerCase().includes(q) ||
      (student.testName || "").toLowerCase().includes(q) ||
      (student.subject || "").toLowerCase().includes(q)
    );
  });

  // Calculate statistics
  const totalTests = filteredStudents.length;
  const uniqueStudents = new Set(filteredStudents.map(student => student.studentId)).size;
  const highScorers = filteredStudents.filter(student => 
    (student.marksObtained / student.totalMarks) >= 0.8
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <button className="flex items-center justify-center gap-2 h-14 w-48 text-gray-700 text-sm py-3 px-8 font-medium transition-all hover:bg-gray-50">
            <IoBookOutline className="text-yellow-500 text-xl" />
            <span>Practice Test</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search and Actions Row */}
        <div className="mb-6 bg-white shadow-md rounded-xl p-6 border border-gray-100">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    {/* Search Bar */}
    <div className="relative w-full md:w-2/3">
      <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="Search by Name, Student ID, Test Name or Subject..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-700"
      />
    </div>

    {/* Action Buttons */}
    <div className="w-full md:w-auto flex justify-end">
      <button
        onClick={downloadCSV}
        className="w-full md:w-auto bg-blue-500 text-white h-12 px-6 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <IoDownloadOutline className="text-lg" />
        <span className="font-medium">Download</span>
      </button>
    </div>
  </div>
</div>

        
        {/* Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Tests Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoBookOutline className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Tests</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalTests}</h3>
                <p className="text-xs text-gray-500 mt-1">Practice tests completed</p>
              </div>
            </div>
            <div className="h-1 bg-blue-500"></div>
          </div>

          {/* Students Count Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoSchoolOutline className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Students</p>
                <h3 className="text-2xl font-bold text-gray-800">{uniqueStudents}</h3>
                <p className="text-xs text-gray-500 mt-1">Students who took tests</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-500"></div>
          </div>

          {/* High Scorers Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoCheckmarkCircleOutline className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">High Scorers</p>
                <h3 className="text-2xl font-bold text-gray-800">{highScorers}</h3>
                <p className="text-xs text-gray-500 mt-1">Students with 80%+ score</p>
              </div>
            </div>
            <div className="h-1 bg-green-500"></div>
          </div>
        </div>

        {/* Test Results Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Test Results</h2>
            <span className="text-sm text-gray-500">Showing {filteredStudents.length} of {students.length} results</span>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent mb-2"></div>
              <p>Loading test results...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-b-2 border-gray-200 uppercase text-xs font-semibold tracking-wider">
                    <th className="py-4 px-4 text-left border-r border-gray-200">#</th>
                    <th className="py-4 px-4 text-left border-r border-gray-200">Student Name</th>
                    <th className="py-4 px-4 text-left border-r border-gray-200">Student ID</th>
                    <th className="py-4 px-4 text-left border-r border-gray-200">Test Name</th>
                    <th className="py-4 px-4 text-left border-r border-gray-200">Subject</th>
                    <th className="py-4 px-4 text-center border-r border-gray-200">Marks</th>
                    <th className="py-4 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={`${student.studentId}-${student.testName}-${index}`} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 text-gray-800 font-medium border-r border-gray-200">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 font-medium border-r border-gray-200">
                          {student.fullName || "N/A"}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          <span className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-xs font-medium">
                            {student.studentId || "N/A"}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          {student.testName || "N/A"}
                        </td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          <span className="bg-teal-50 text-teal-700 py-1 px-3 rounded-full text-xs font-medium">
                            {student.subject || "N/A"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center border-r border-gray-200">
                          <div className="relative w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div 
                              className={`h-2.5 rounded-full ${
                                (student.marksObtained / student.totalMarks) >= 0.8 
                                  ? 'bg-green-500' 
                                  : (student.marksObtained / student.totalMarks) >= 0.6 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${(student.marksObtained / student.totalMarks) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {student.marksObtained || 0} / {student.totalMarks || 0}
                            {' '}
                            <span className="text-gray-500">
                              ({Math.round((student.marksObtained / student.totalMarks) * 100)}%)
                            </span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleStudentClick(student.studentId)}
                            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors inline-flex items-center justify-center gap-1"
                            title="View Student Profile"
                          >
                            <IoArrowForward className="text-base" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <IoBookOutline className="text-gray-300 text-5xl mb-3" />
                          <p className="text-gray-500 mb-1">No matching test results found</p>
                          <p className="text-gray-400 text-xs">Try adjusting your search criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}