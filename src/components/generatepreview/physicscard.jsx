"use client";
import React from 'react';

const PhysicsCard = () => {
  return (
    <div className="p-4 bg-[#B1CEFB] shadow-xl max-w-3xl mx-8 rounded-tr-2xl rounded-tl-2xl  w-[34rem]  overflow-y-hidden max-h-[500px] -mt-60 ">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative bg-[#B1CEFB] shadow-lg">
          <img
            src="/Atoms.svg"  // Ensure the icon path is correct
            alt="Physics Icon"
            className="object-cover w-15 h-15"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Physics</h2>
         
          {/* Flexbox for side-by-side boxes */}
          <div className="flex space-x-4 mt-2">    
            {/* Total Questions Box */}
            <div className="bg-blue-400 text-white text-sm px-3 py-2 rounded-md w-48 text-center">
              Total Questions: 11
            </div>
            {/* Total Marks Box */}
            <div className="bg-blue-400 text-white text-sm px-4 py-2 rounded-md w-48 text-center">
              Total Marks: 44
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4">
        <h3 className="text-2xl font-semibold ml-4 mb-4">Selected Chapters</h3>
        <table className="min-w-full table-auto border-separate border-spacing-y-2 ">
          <thead>
            <tr className="border-b  bg-[#F5F5F5] border-gray-300 ">
              <th className="px-1 py-2 text-left rounded-tl-lg ">Sr.No</th>
              <th className="px-1 py-2 text-left ">Chapter Name</th>
              <th className="px-1 py-2 text-left rounded-tr-lg">Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-gray-300 border-b">
              <td className="px-2 py-2 ">1</td>
              <td className="px-2 py-2">Gravitation</td>
              <td className="px-2 py-2">3</td>
            </tr>
            <tr className="border-gray-300 border-b ">
              <td className="px-2 py-2">2</td>
              <td className="px-2 py-2">Semiconductor</td>
              <td className="px-2 py-2">2</td>
            </tr>
            <tr className="border-gray-300 border-b">
              <td className="px-2 py-2">3</td>
              <td className="px-2 py-2">Rotational Dynamics</td>
              <td className="px-2 py-2">6</td>
            </tr>
            <tr>
              <td className="px-2 py-2">4</td>
              <td className="px-2 py-2">Atoms</td>
              <td className="px-2 py-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicsCard;
