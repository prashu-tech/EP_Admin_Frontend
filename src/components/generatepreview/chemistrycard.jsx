"use client";
import React from 'react';

const ChemistryCard = () => {
  return (
    <div className="p-4 bg-blue-300 shadow-xl max-w-3xl mx-8 rounded-tr-2xl rounded-tl-2xl w-[34rem] overflow-x-hidden max-h-[500px] -mt-60 ">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="shadow-lg">
          <img 
            src="/atoms_3652335.png"  // Ensure the icon path is correct
            alt="Chemistry Icon"
            className="w-11 h-12" 
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Chemistry</h2>
          
          {/* Flexbox for side-by-side boxes */}
          <div className="flex space-x-4 mt-2">
            {/* Total Questions Box */}
            <div className="bg-blue-400 text-white text-sm px-4 py-2 rounded-md w-40 text-center">
              Total Questions: 11
            </div>
            {/* Total Marks Box */}
            <div className="bg-blue-400 text-white text-sm px-4 py-2 rounded-md w-40 text-center">
              Total Marks: 44
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Selected Chapters</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b-2  bg-gray-200">
              <th className="px-1 py-2 text-left">Sr.No</th>
              <th className="px-1 py-2 text-left">Chapter Name</th>
              <th className="px-1 py-2 text-left">Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-2 py-2">1</td>
              <td className="px-2 py-2">Solid State</td>
              <td className="px-2 py-2">3</td>
            </tr>
            <tr className="border-b">
              <td className="px-2 py-2">2</td>
              <td className="px-2 py-2">Solutions</td>
              <td className="px-2 py-2">2</td>
            </tr>
            <tr className="border-b">
              <td className="px-2 py-2">3</td>
              <td className="px-2 py-2">Electrochemistry</td>
              <td className="px-2 py-2">6</td>
            </tr>
            <tr>
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
