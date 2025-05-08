"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { CiImageOn, CiSearch } from "react-icons/ci";
import { IoSchoolOutline, IoAddOutline, IoPencilOutline, IoPersonOutline, IoCalendarOutline } from "react-icons/io5";

export default function Batches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch batches from the backend
  useEffect(() => {
    const fetchBatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/getbatch`);
        setBatchData(response.data.batchData); // Assuming response contains batchData
      } catch (error) {
        setError("Error fetching batch data: " + (error.response?.data?.message || error.message));
      } finally {
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const filteredBatches = batchData.filter((batch) =>
    batch.batchId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.batchName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total students
  const totalStudents = batchData.reduce((sum, batch) => sum + (batch.no_of_students || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <button
            className="flex items-center justify-center gap-2 h-14 w-48 text-gray-700 text-sm py-3 px-8 font-medium transition-all hover:bg-gray-50"
          >
            <IoSchoolOutline className="text-yellow-500 text-xl" />
            <span>Batches</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search and Actions Row - Moved to top */}
        <div className="mb-6 bg-white shadow-md rounded-xl p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-3/5">
              <div className="bg-[#007AFF] inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <CiSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search by Batch ID or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* New Batch Button */}
            <Link href="/batchesedit">
              <button className="w-full md:w-auto bg-yellow-500 text-white h-12 px-6 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-2 shadow-sm">
                <IoAddOutline className="text-xl" />
                <span className="font-medium">New Batch</span>
              </button>
            </Link>
          </div>
        </div>
        
        {/* Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Batches Count Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoSchoolOutline className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Batches</p>
                <h3 className="text-2xl font-bold text-gray-800">{batchData.length}</h3>
                <p className="text-xs text-gray-500 mt-1">Active batches in your account</p>
              </div>
            </div>
            <div className="h-1 bg-blue-500"></div>
          </div>

          {/* Students Count Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoPersonOutline className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Students</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalStudents}</h3>
                <p className="text-xs text-gray-500 mt-1">Students enrolled across all batches</p>
              </div>
            </div>
            <div className="h-1 bg-yellow-500"></div>
          </div>

          {/* Performance Card */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="p-4 flex items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                <IoCalendarOutline className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Sessions</p>
                <h3 className="text-2xl font-bold text-gray-800">12</h3>
                <p className="text-xs text-gray-500 mt-1">Ongoing batch sessions this week</p>
              </div>
            </div>
            <div className="h-1 bg-green-500"></div>
          </div>
        </div>

        {/* Performance Stats Card - Adjusted proportions */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Batch Performance Overview</h3>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Image with reduced width */}
            <div className="md:col-span-1">
              <img
                src="test.png"
                alt="Batch Performance Chart"
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
            </div>
            {/* Metrics with increased width */}
            <div className="md:col-span-3 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Key Performance Indicators</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Average Attendance</span>
                    <span className="text-sm font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Based on last 30 days activity</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Assignment Completion</span>
                    <span className="text-sm font-semibold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Average across all batches</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Student Satisfaction</span>
                    <span className="text-sm font-semibold text-yellow-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Based on student feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Batch Table Component - Improved */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Batch List</h2>
            <span className="text-sm text-gray-500">Showing {filteredBatches.length} of {batchData.length} batches</span>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent mb-2"></div>
              <p>Loading batch data...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-b-2 border-gray-200 uppercase text-xs font-semibold tracking-wider">
                    <th className="py-4 px-6 text-left border-r border-gray-200">#</th>
                    <th className="py-4 px-6 text-left border-r border-gray-200">Batch ID</th>
                    <th className="py-4 px-6 text-left border-r border-gray-200">Batch Name</th>
                    <th className="py-4 px-6 text-center border-r border-gray-200">Students</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                  {filteredBatches.length > 0 ? (
                    filteredBatches.map((batch, index) => (
                      <tr key={batch.batchId} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-gray-800 font-medium border-r border-gray-200">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 border-r border-gray-200">
                          <span className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-xs font-medium">
                            {batch.batchId}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-medium border-r border-gray-200">
                          {batch.batchName}
                        </td>
                        <td className="py-4 px-6 text-center border-r border-gray-200">
                          <div className="inline-flex items-center justify-center bg-yellow-50 px-3 py-1 rounded-full">
                            <IoPersonOutline className="text-yellow-600 mr-1" />
                            <span className="font-medium text-yellow-700">{batch.no_of_students || 0}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link href={`/batchesedit?id=${batch.batchId}`}>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1 mx-auto">
                              <IoPencilOutline className="text-sm" />
                              <span>Edit</span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <IoSchoolOutline className="text-gray-300 text-5xl mb-3" />
                          <p className="text-gray-500 mb-1">No matching batches found</p>
                          <p className="text-gray-400 text-xs">Try adjusting your search or create a new batch</p>
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