<<<<<<< HEAD
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const TestResultDownload = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResults = async () => {
      const studentId = localStorage.getItem("studentId"); // Get studentId from localStorage

      if (!studentId) return;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-result`, // Your endpoint
          { studentId } // Send studentId to the backend
        );

        const fullTestResults = response.data.data.fullTestResults || [];
        const meTestResults = response.data.data.resultsWithTotalMarks || [];

        // Combine fullTestResults and meTestResults if necessary
        setTestResults([...fullTestResults, ...meTestResults]);
      } catch (error) {
        console.error("Error fetching test results:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults(); // Fetch data when the component mounts
  }, []);

  // Function to download the results in Excel format
  const downloadExcel = () => {
    // Prepare data for download
    const data = testResults.map((result) => ({
      TestName: result.testName,
      MarksObtained: result.marksObtained,
      TotalMarks: result.totalMarks,
=======
import React from 'react';
import * as XLSX from 'xlsx';

const TestResultDownload = () => {
  const testResults = [
    { name: 'Ayaan Raje', score: '230/240', icon: '🌐' },
    { name: 'Muskan Shaikh', score: '240/240', icon: '🧑‍🏫' },
    { name: 'Tanvi Sawant', score: '210/240', icon: '👩‍🏫' },
    { name: 'Wajiha Jafri', score: '200/240', icon: '💬' },
  ];

  const downloadExcel = () => {
    // Prepare data for download
    const data = testResults.map(result => ({
      Name: result.name,
      Score: result.score,
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
    }));

    // Create a new workbook and sheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Test Results');

    // Write file
    XLSX.writeFile(wb, 'test_results.xlsx');
  };

  return (
<<<<<<< HEAD
    <div className="bg-white p-6 rounded-lg shadow-md overflow-auto w-[500px] h-[350px]">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Last Test Results</h2>
=======
    <div className="bg-white p-6 rounded-lg shadow-md w-[500px] h-[350px]">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Last Test Result</h2>
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        <button
          onClick={downloadExcel}
          className="mb-4 bg-white text-blue-500 py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Download
        </button>
      </div>
      <div className="space-y-4">
<<<<<<< HEAD
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
              <div className="flex items-center gap-2">
                <span className="text-xl">{result.testName}</span>
              </div>
              <div className="flex text-[18px]">
                <span> {result.marksObtained}/</span>
                <span> {result.totalMarks}</span>
              </div>
            </div>
          ))
        )}
=======
        {testResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">{result.icon}</span>
              <span>{result.name}</span>
            </div>
            <span>{result.score}</span>
          </div>
        ))}
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
      </div>
    </div>
  );
};

export default TestResultDownload;
<<<<<<< HEAD
=======
  
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
