"use client";
import React from 'react';

const ChemistryCard = () => {
  return (
    <div className="p-4 bg-[#B1CEFB] shadow-xl  rounded-tr-2xl rounded-tl-2xl ml-2 mr-3 w-[34rem] max-h-[700px] -mt-60  ">
      {/* Header Section */}
      <div className="flex items-center space-x-4  mb-6 ">
        <div className="relative bg-[#B1CEFB] shadow-lg">
          <img
            src="/science_2022299.svg"  // Ensure the icon path is correct
            alt="Chemistry Icon"
            className=" object-cover w-16 h-15"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Chemistry</h2>
         
          {/* Flexbox for side-by-side boxes */}
          <div className="flex space-x-4 mt-2">
            {/* Total Questions Box */}
            <div className="bg-blue-400 text-white text-sm px-3 py-2 rounded-md w-36 text-center">
              Total Questions: 11
            </div>
            {/* Total Marks Box */}
            <div className="bg-blue-400 text-white text-sm px-4 py-2 rounded-md w-36 text-center">
              Total Marks: 44
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <h3 className="text-2xl font-semibold ml-5 mb-4 align-middle mt-2 ">Selected Chapters</h3>
        <table className="min-w-full table-auto border-collapse:separate border-spacing-y-2 ">
          <thead>
            <tr className="border-b  bg-[#F5F5F5] border-gray-300">
              <th className="px-2 py-1 text-center rounded-tl-lg ">Sr.No</th>
              <th className="px-1 py-2 text-center ">Chapter Name</th>
              <th className="px-1 py-2 text-center rounded-tr-lg ">Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-gray-300 border-b text-center">
              <td className="px-2 py-2">1</td>
              <td className="px-2 py-2">Solid State</td>
              <td className="px-2 py-2">3</td>
            </tr>
            <tr className="border-gray-300 border-b text-center">
              <td className="px-2 py-2">2</td>
              <td className="px-2 py-2">Solutions</td>
              <td className="px-2 py-2">2</td>
            </tr>
            <tr className="border-gray-300 border-b text-center">
              <td className="px-2 py-2">3</td>
              <td className="px-2 py-2">Electrochemistry</td>
              <td className="px-2 py-2">6</td>
            </tr>
            <tr className="border-gray-[1px]  text-center">
              <td className="px-2 py-2">4</td>
              <td className="px-2 py-2">Biomolecules</td>
              <td className="px-2 py-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChemistryCard;
