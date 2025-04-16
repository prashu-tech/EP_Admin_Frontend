import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const TestResultDownload = () => {
  // State to store the fetched test results
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMode, setSelectedMode] = useState('Practice'); // Mode state (default to 'Practice')

  // Fetch the test results based on the selected mode
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const apiUrl =
          selectedMode === 'Practice'
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/testresult/result`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/testresult/customizedresult`;

        const response = await axios.get(apiUrl); // API URL based on mode
        if (response.data && response.data.results) {
          const results = response.data.results.map((result) => ({
            name: result.fullName,
            score: `${result.marksObtained}/${result.totalMarks}`,
            studentId: result.studentId,
            icon: getIcon(result.studentId), // Dynamic icon based on studentId
          }));
          setTestResults(results);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [selectedMode]); // Dependency on selectedMode

  // Function to get the icon for each student
  const getIcon = (studentId) => {
    if (studentId % 2 === 0) {
      return '🌐';  // Icon for even studentId (example)
    } else {
      return '🧑‍🏫';  // Icon for odd studentId (example)
    }
  };

  // Function to handle the Excel download
  const downloadExcel = () => {
    const data = testResults.map((result) => ({
      Name: result.name,
      Score: result.score,
      StudentId: result.studentId,
      Icon: result.icon,  // Include icon here
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Test Results');

    XLSX.writeFile(wb, 'test_results.xlsx');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[310px] h-[350px]">
      {/* Toggle Button to switch between modes at the top */}
      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={() => setSelectedMode('Practice')}
          className={`px-4 py-2 rounded-md ${selectedMode === 'Practice' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          Practice
        </button>
        <button
          onClick={() => setSelectedMode('Customize')}
          className={`px-4 py-2 rounded-md ${selectedMode === 'Customized' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          Customized
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Last Test Result</h2>

        {/* Download Button */}
        <button
          onClick={downloadExcel}
          className="bg-white text-blue-500 py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Download
        </button>
      </div>

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">{result.icon}</span> {/* Displaying Icon */}
              <span>{result.name}</span> {/* Displaying Full Name */}
            </div>
            <span>{result.score}</span> {/* Displaying Score (Obtained Marks / Total Marks) */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultDownload;
