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
    <div className="overflow-hidden p-4">
      {/* BATCHES Box */}
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-6 mb-4">
  <div className="relative w-[950px]">
    <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
    <input
      type="text"
      placeholder="Search by Batch ID, Name, or Email..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full h-[60px] pl-12 pr-4 border border-[#BBBBBB] rounded-[10px] shadow-[0px_4px_6px_0px_#00000040] focus:outline-none text-gray-700"
    />
  </div>
</div>

      <div className="relative flex flex-col items-center pt-[25px] md:items-start md:left-14">
        <div className="w-[171px] h-[66px] border border-[#BBBBBB] rounded-[10px] 
                         shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] text-center flex justify-center items-center 
                        font-['Open_Sans'] font-normal">
          BATCHES
        </div>
      </div>

      {/* Batches Count Card */}
      <div className="relative min-w-[180px] min-h-[140px] sm:min-w-[248px] sm:min-h-[112px] rounded-[10px] mt-10 left-[30px] md:left-[130px]">
        <div className="relative w-[200px] h-[150px] sm:w-64 sm:h-44 bg-white rounded-2xl p-3 sm:p-4 shadow-lg">
          {/* Title & Badge on Same Line */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm sm:text-lg font-semibold text-black flex items-center">
              <CiImageOn className="w-4 h-4 sm:w-5 stroke-1 sm:h-5 mr-2 text-black" />
              Batches Count
            </h3>
            <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
              {batches.length}
            </span>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-lg mt-2">
            <img
              src="test.png"
              alt="Test Created"
              className="w-full h-20 sm:h-28 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* New Batch Button */}
      <div className="relative">
        <div className="absolute top-[-100px] left-[480px]">
        <Link href="/batchesedit">
          <button className="w-[238px] h-[43px] bg-[#4880FF] opacity-90 rounded-[8px] flex items-center justify-center">
            <span className="text-[14px] font-[700] leading-[100%] tracking-[-0.05px] text-white">
              +New Batch
            </span>
          </button>
          </Link>
        </div>
      </div>

      

      {/* Batch Table Component */}
      <BatchTable batches={filteredBatches} />
    </div>
  );
}

function BatchTable({ batches }) {
  return (
    <div className="mb-10 mt-6 w-[90%] mx-auto rounded-[10px] shadow-lg overflow-hidden">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2">SR.NO</th>
            <th className="border border-gray-300 px-4 py-2">BATCH ID</th>
            <th className="border border-gray-300 px-4 py-2">BATCH NAME</th>
            <th className="border border-gray-300 px-4 py-2">EMAIL</th>
            <th className="border border-gray-300 px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {batches.length > 0 ? (
            batches.map((batch, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{batch.srNo}</td>
                <td className="border border-gray-300 px-4 py-2">{batch.batchId}</td>
                <td className="border border-gray-300 px-4 py-2">{batch.batchName}</td>
                <td className="border border-gray-300 px-4 py-2">{batch.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                <Link href="/batches_edit">
                  <button className="bg-[#FBBF24] text-white px-4 py-1 rounded">
                    Edit Batch
                  </button>
                  </Link>
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
