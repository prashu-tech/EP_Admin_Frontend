import React from "react";
import { ArrowRightCircle } from "lucide-react";

export default function TestManagementTable() {
  return (
    // Table Centered
    <div className="flex justify-center w-full mt-[230px]">
      <div className="w-[952px] h-auto rounded-[17px] border border-[#000000] shadow-lg overflow-x-auto mx-auto">
        <table className="min-w-full border-collapse text-center text-sm">
          <thead className="bg-white text-black border-b border-black">
            <tr>
              <th className="py-3 px-4 border border-white">SR.NO</th>
              <th className="py-3 px-4 border border-white">BATCHES</th>
              <th className="py-3 px-4 border border-white">MARKS</th>
              <th className="py-3 px-4 border border-white">STATUS</th>
              <th className="py-3 px-4 border border-white">CREATED AT</th>
              <th className="py-3 px-4 border border-white">TOTAL QUESTIONS</th>
              <th className="py-3 px-4 border border-white">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-100 ">
                <td className="py-3 px-4 border-2 border-black font-semibold">{index + 1}</td>
                <td className="py-3 px-4 border-2 border-black">NEET Morning</td>
                <td className="py-3 px-4 border-2 border-black">120/180</td>
                <td className="py-3 px-4 border-2 border-black text-black">Not Scheduled</td>
                <td className="py-3 px-4 border-2 border-black">
                  Mon Jan 20, 2025 <br />
                  11:00 AM
                </td>
                <td className="py-3 px-4 border-2 border-black">50</td>
                <td className="py-3 px-4 border-2 border-black">
                  <button className="text-black hover:text-black font-bold">
                    <ArrowRightCircle size={24} strokeWidth={3.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
