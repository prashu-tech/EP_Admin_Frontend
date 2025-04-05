import React from 'react';
import Link from 'next/link';
import { FaFileAlt, FaUser, FaUsers } from "react-icons/fa";

export default function Batchesedit() {
  return (
    <div className="">
      {/* Generate Batches Button */}
      <div className="relative flex items-center  justify-center">
        <button className="w-[171px] h-[66px] rounded-[10px] border border-gray-300 
                          shadow-md text-gray-600 mt-7 bg-white">
          Generate Batches
        </button>                 
      </div>

      <div className="relative flex mt-4">
        <div className="w-[783px] h-[342px] mx-auto bg-white rounded-[10px] shadow-lg p-6 space-y-4">

          {/* Batch ID */}
          <div>
            <label className="text-gray-700 ml-9">Batch ID</label>
            <div className="flex items-center gap-2 mt-1">
              <FaFileAlt className="text-[#007AFF] text-2xl" />
              <input type="text" className="border border-[#000000] rounded px-2 h-[37px] outline-none w-full" />
            </div>
          </div>

          {/* Batch Name */}
          <div>
            <label className="text-gray-700 ml-9 ">Batch Name</label>
            <div className="flex items-center gap-2 mt-1">
              <FaUser className="text-[#007AFF] text-2xl" />
              <input type="text" className="border border-[#000000] rounded px-2 h-[37px] outline-none w-full" />
            </div>
          </div>

          {/* No. of Students */}
          <div>
            <label className="text-gray-700 ml-9">No. of Students</label>
            <div className="flex items-center gap-2 mt-1">
              <FaUsers className="text-[#007AFF] text-3xl" />
              <input type="text" className="border border-[#000000] rounded px-2 h-[37px] outline-none w-full" />
            </div>
          </div>

        </div>
      </div>

      <div className="pb-20 mt-10">
        <div className="flex flex-nowrap justify-center items-center mb-20 mt-6 gap-6 md:space-x-7 lg:gap-20">
          <button className="min-w-[200px] md:w-[200px] lg:w-[270px] h-[40px] text-white rounded-[6px] flex items-center justify-center text-sm font-semibold px-4 whitespace-nowrap"
            style={{ backgroundColor: '#47BE7D' }}>
            Import Student Data (Excel Sheet)
          </button>

          <Link href="/create-batch">
            <button className="min-w-[10px] md:w-[180px] lg:w-[180px] h-[40px] text-white rounded-[6px] flex items-center justify-center text-sm font-semibold px-4 whitespace-nowrap"
              style={{ backgroundColor: '#F93535' }}>
              + Create Batch
            </button>
          </Link>
        </div> 
      </div>
    </div>
  );
}
