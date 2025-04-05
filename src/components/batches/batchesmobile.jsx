import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
export default function Batches() {
  const [searchQuery, setSearchQuery] = useState("");

  const batches = [
    { srNo: 1, batchId: "200046", batchName: "Evening B1", email: "abc@gmail.com" },
    { srNo: 2, batchId: "200047", batchName: "Morning A1", email: "xyz@gmail.com" },
    { srNo: 3, batchId: "200048", batchName: "Afternoon C1", email: "pqr@gmail.com" },
  ];

  const filteredBatches = batches.filter((batch) =>
    batch.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.batchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 overflow-hidden">
      {/* 🔍 Search Bar */}
       {/* Search Input */}
              <div className="relative w-full sm:flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search Name, Student ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                  className="w-full pl-10 pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-3xl">
                  <CiSearch />
                </span>
              </div>


      {/* BATCHES Box */}
      <div className="flex justify-center md:justify-start pt-6">
        <div className="w-[150px] h-[60px] border border-gray-400 rounded-lg  shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] text-center flex justify-center items-center font-">
          BATCHES
        </div>
      </div>

      {/* Batches Count Card & New Batch Button */}
      <div className="relative flex flex-wrap items-center justify-between mt-8 px-4">
        {/* Batches Count Card */}
        <div className="w-[200px] sm:w-[250px] bg-white rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-lg font-semibold text-black flex items-center">
              <CiImageOn className=" stroke- w-5 h-5 mr-2 text-black" />
              Batches Count
            </h3>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
              {batches.length}
            </span>
          </div>
          <div className="overflow-hidden rounded-lg mt-2">
            <img
              src="test.png"
              alt="Test Created"
              className="w-full h-20 sm:h-28 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* New Batch Button */}
        <Link href="/batchesedit">
        <button className="w-[150px] h-[40px] md:w-[200px] md:h-[43px] bg-blue-500 opacity-90 
                           rounded-md flex items-center justify-center text-white font-bold text-sm mt-4 md:mt-0">
          + New Batch
        </button>
        </Link>
      </div>

      {/* Batch Table Component */}
      <BatchTable batches={filteredBatches} />
    </div>
  );
}

function BatchTable({ batches }) {
  return (
    <div className="mt-6 overflow-x-auto w-full">
      <table className="w-full min-w-[400px] border-collapse border border-gray-300 rounded-lg">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm md:text-base">
            <th className="border border-gray-300 px-2 py-2 md:px-4">SR.NO</th>
            <th className="border border-gray-300 px-2 py-2 md:px-4">BATCH ID</th>
            <th className="border border-gray-300 px-2 py-2 md:px-4">BATCH NAME</th>
            <th className="border border-gray-300 px-2 py-2 md:px-4">EMAIL</th>
            <th className="border border-gray-300 px-2 py-2 md:px-4">ACTIONS</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {batches.length > 0 ? (
            batches.map((batch, index) => (
              <tr key={index} className="text-center text-sm md:text-base">
                <td className="border border-gray-300 px-2 py-2 md:px-4">{batch.srNo}</td>
                <td className="border border-gray-300 px-2 py-2 md:px-4">{batch.batchId}</td>
                <td className="border border-gray-300 px-2 py-2 md:px-4">{batch.batchName}</td>
                <td className="border border-gray-300 px-2 py-2 md:px-4">{batch.email}</td>
                <td className="border border-gray-300 px-2 py-2 md:px-4">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded-md text-xs md:text-sm">
                    Edit Batch
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No matching batches found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
