"use client";
import { useState } from "react";
import { SlPlus } from "react-icons/sl";

const CandidateTable = () => {
  const [tables, setTables] = useState([1]); // Initial parent table

  const addNewTable = () => {
    setTables([...tables, tables.length + 1]); // Add new nested table
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 mt-0 md:mt-2 space-y-6 w-full">
      <div className="p-6 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.14),0_-1px_2px_rgba(0,0,0,0.14)] rounded-lg w-full md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%]">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 w-full gap-2 md:gap-0">
          <h2 className="text-xs sm:text-sm md:text-xl font-Open Sans font-normal whitespace-nowrap">
            Candidate Field
          </h2>
          <button
            onClick={addNewTable}
            className="flex items-center bg-[#007AFF] text-white font-Open Sans px-3 sm:px-4 py-1 rounded-md transition text-xs sm:text-sm md:text-base whitespace-nowrap md:mr-15"
          >
            <SlPlus className="text-base sm:text-lg md:text-xl mr-2" />
            Add New Candidate
          </button>
        </div>

        {/* Render All Tables */}
        <div className="flex flex-col space-y-4 w-full">
          {tables.map((tableId) => (
            <div
              key={tableId}
              className="overflow-x-auto border border-gray-400 w-full max-w-full"
            >
              <table className="w-full max-w-full sm:text-sm md:text-lg font-Nunito Sans font-normal">
                <thead>
                  <tr className="bg-[#F3F3F3]">
                    <th className="px-6 py-2 w-16 whitespace-nowrap font-Nunito Sans font-medium">
                      Sr. No
                    </th>
                    <th className="px-4 py-2 font-Nunito Sans font-medium">
                      Field
                    </th>
                    <th className="px-4 py-2 font-Nunito Sans font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-center font-Nunito Sans">
                  {[
                    { id: 1, field: "Name", status: "Added" },
                    { id: 2, field: "Standard", status: "Added" },
                    { id: 3, field: "Batch", status: "Added" },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">{row.id}</td>
                      <td className="px-4 py-2 text-center">{row.field}</td>
                      <td className="px-4 py-2 text-center">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
