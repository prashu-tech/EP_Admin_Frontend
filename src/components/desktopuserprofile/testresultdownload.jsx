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
    }));

    // Create a new workbook and sheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Test Results');

    // Write file
    XLSX.writeFile(wb, 'test_results.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-auto w-[500px] h-[350px]">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Last Test Results</h2>
        <button
          onClick={downloadExcel}
          className="mb-4 bg-white text-blue-500 py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Download
        </button>
      </div>
      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default TestResultDownload;
