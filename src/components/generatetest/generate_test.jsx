"use client";
import React, { useState, useEffect } from "react";
import { ArrowRightCircle, Download } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import * as XLSX from "xlsx";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import axios from "axios"; // Import axios for making API calls
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation

export default function CenterText() {
  const [searchQuery, setSearchQuery] = useState("");
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Using the Next.js useRouter hook for navigation

  // Fetch the test data from the backend
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-data`);
        setTestData(response.data.tests); // Set the test data to state
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  // Filtered data based on search
  const filteredRows = testData.filter(
    (row) =>
      row.batch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.marks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Data");
    XLSX.writeFile(workbook, "test_data.xlsx");
  };

  const handleGenerate = () => {
    localStorage.removeItem("Biology");
    localStorage.removeItem("Chemistry");
    localStorage.removeItem("Physics");
    localStorage.removeItem("marks");
    localStorage.removeItem("selectedSubjects");
    localStorage.removeItem("testName");
    localStorage.removeItem("ScheduleTest");
  };

  const handleActionClick = (testId) => {
    // Store the testId in localStorage
    localStorage.setItem("testid", testId);

    // Redirect to the test preview page
    router.push("/test_preview");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 items-center w-full pt-[30px]">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-6 mb-4">
        <div className="relative w-[950px]">
          <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
          <input
            type="text"
            placeholder="Search by Batch ,Marks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[60px] pl-12 pr-4 border border-[#BBBBBB] rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Generate Test Button */}
      <div className="w-[171px] mt-2 h-[66px] border-[1px] border-[#BBBBBB] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] text-center flex justify-center items-center">
        Generate Test
      </div>

      {/* Download Button */}
      <div className="absolute right-19 top-[230px]">
        <button
          onClick={downloadExcel}
          className="px-4 py-2 w-[173px] h-[66px] border-[1px] border-[#BBBBBB] rounded-lg flex items-center 
                justify-center space-x-2 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] bg-white"
        >
          <span>Download Test</span>
          <Download className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Generate Button */}
      <div className="absolute left-[950px] top-[330px]">
        <Link href="/subjectselect">
          <button
            className="w-[238px] h-[43px] px-3 py-3 bg-[#4880FF] text-white rounded-lg shadow-md flex items-center justify-center space-x-2"
            onClick={handleGenerate}
          >
            + Generate
          </button>
        </Link>
      </div>

      {/* Test Created Card */}
      <div className="absolute left-[340px] top-[290px] w-[248px] h-[182px] rounded-[10px]">
        <div className="relative w-64 h-44 bg-white rounded-2xl p-4 shadow-lg">
          <span className="absolute top-[20px] left-[185px] w-[27px] h-[22px] bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center rounded-[2px]">
            {filteredRows.length}
          </span>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <CiImageOn className="w-5 stroke-1 h-5 mr-2 text-[#000000]" />
            Test Created
          </h3>
          <div className="overflow-hidden rounded-lg">
            <img src="test.png" alt="Test Created" className="w-full h-28 object-cover rounded-lg" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center w-full mt-[200px]">
        <div className="w-[952px] h-auto border-[#000000] border-2 overflow-x-auto rounded-[20px]">
          <table className="min-w-full border-2 border-collapse text-center text-sm rounded-[20px] overflow-hidden">
            <thead className="bg-white text-black border-b border-black">
              <tr className="rounded-t-[20px]">
                <th className="py-3 px-4 border border-white rounded-tl-[20px]">SR.NO</th>
                <th className="py-3 px-4 border border-white">Test ID</th>
                <th className="py-3 px-4 border border-white">Test Name</th>
                <th className="py-3 px-4 border border-white">BATCHES</th>
                <th className="py-3 px-4 border border-white">MARKS</th>
                <th className="py-3 px-4 border border-white">STATUS</th>
                <th className="py-3 px-4 border border-white">CREATED AT</th>
                <th className="py-3 px-4 border border-white">TOTAL QUESTIONS</th>
                <th className="py-3 px-4 border border-white rounded-tr-[20px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-2 border-black font-semibold">{index + 1}</td>
                  <td className="py-3 px-4 border-2 border-black">{row.id}</td> {/* Test ID */}
                  <td className="py-3 px-4 border-2 border-black">{row.testname}</td> {/* Test Name */}
                  <td className="py-3 px-4 border-2 border-black">{row.batch_name}</td>
                  <td className="py-3 px-4 border-2 border-black">{row.marks}</td>
                  <td className="py-3 px-4 border-2 border-black text-black">{row.status}</td>
                  <td className="py-3 px-4 border-2 border-black">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-2 border-black">{row.no_of_questions}</td>
                  <td className="py-3 px-4 border-2 border-black">
                    <button
                      onClick={() => handleActionClick(row.id)} // Trigger action with the testId
                      className="text-black hover:text-black font-bold"
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
    </div>
  );
}
