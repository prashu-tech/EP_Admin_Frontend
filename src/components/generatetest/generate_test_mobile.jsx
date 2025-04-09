import React, { useState } from "react";
import { ArrowRightCircle, Download } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import * as XLSX from "xlsx";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
export default function CenterText() {
  const [searchQuery, setSearchQuery] = useState("");

  const tableRows = [
    { srNo: 1, batch: "NEET Morning", marks: "120/180", status: "Scheduled", createdAt: "Mon Jan 20, 2025 11:00 AM", totalQuestions: 50 },
    { srNo: 2, batch: "JEE Evening", marks: "145/180", status: "Completed", createdAt: "Tue Feb 11, 2025 02:30 PM", totalQuestions: 60 },
    { srNo: 3, batch: "NEET Evening", marks: "110/180", status: "In Progress", createdAt: "Wed Mar 05, 2025 09:15 AM", totalQuestions: 55 },
    { srNo: 4, batch: "JEE Morning", marks: "132/180", status: "Scheduled", createdAt: "Thu Apr 10, 2025 01:00 PM", totalQuestions: 52 },
    { srNo: 5, batch: "Foundation 9th", marks: "90/180", status: "Not Scheduled", createdAt: "Fri May 15, 2025 10:45 AM", totalQuestions: 40 },
    { srNo: 6, batch: "Foundation 10th", marks: "150/180", status: "Completed", createdAt: "Sat Jun 20, 2025 03:10 PM", totalQuestions: 48 },
    { srNo: 7, batch: "Crash Course", marks: "105/180", status: "In Progress", createdAt: "Sun Jul 25, 2025 08:00 AM", totalQuestions: 35 },
    { srNo: 8, batch: "Repeaters Batch", marks: "165/180", status: "Completed", createdAt: "Mon Aug 30, 2025 12:25 PM", totalQuestions: 70 },
    { srNo: 9, batch: "Test Series", marks: "135/180", status: "Scheduled", createdAt: "Tue Sep 05, 2025 11:50 AM", totalQuestions: 65 },
  ];

  const filteredRows = tableRows.filter(
    (row) =>
      row.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.marks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Data");
    XLSX.writeFile(workbook, "test_data.xlsx");
  };

  return (
    <div className="flex flex-col items-center px-4 pt-10 pb-20 min-h-screen w-full space-y-8">
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

      {/* Action Buttons */}
   {/* Action Buttons */}
<div className="flex flex-row items-center justify-center w-full max-w-[950px] gap-3 mt-1">
  {/* Generate Test Box (styled like button) */}
  <div className="w-[140px] h-[50px] px-3 py-2 border border-gray-400 rounded-md  
                  flex items-center justify-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] bg-white text-sm font-medium">
    Generate Test
  </div>

  {/* Download Test Button */}
  <button
    onClick={downloadExcel}
    className="w-[150px] h-[50px] px-3 py-2 border border-gray-400 rounded-md 
               flex items-center justify-center gap-2 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] bg-white text-sm font-medium"
  >
    <span>Download Test</span>
    <Download className="w-4 h-4 stroke-[2]" />
  </button>
</div>



 {/* Generate Count Card & New Generate Test Button */}
<div className="relative  flex flex-wrap items-center justify-between mt-1 px-4">
  {/* Test Count Card */}
  <div className="w-[200px] sm:w-[250px] bg-white rounded-xl p-4 shadow-lg mr-4">
    <div className="flex justify-between items-center">
      <h3 className="text-sm sm:text-lg font-semibold text-black flex items-center">
        <CiImageOn className="stroke- w-5 h-5 mr-1 text-black" />
        Test Created
      </h3>
      <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
        {filteredRows.length}
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

  {/* New Generate Button */}
  <Link href="/generate">
  <button
    className="w-[140px] h-[36px] md:w-[180px] md:h-[38px] bg-blue-500 opacity-90 
               rounded-md flex items-center justify-center text-white font-bold text-sm mt-4 md:mt-0">
    +Generate
  </button>
  </Link>
</div>


             {/* Table */}
                   <div className="flex justify-center w-full mt-[1px]">
                     <div className="w-[952px] h-auto border-[#000000] border-2 overflow-x-auto rounded-[20px]">
                       <table className="min-w-full border-2 border-collapse text-center text-sm rounded-[20px] overflow-hidden">
                         <thead className="bg-white text-black border-b border-black">
                           <tr className="rounded-t-[20px]">
                             <th className="py-3 px-4 border border-white rounded-tl-[20px]">SR.NO</th>
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
                               <td className="py-3 px-4 border-2 border-black font-semibold">{row.srNo}</td>
                               <td className="py-3 px-4 border-2 border-black">{row.batch}</td>
                               <td className="py-3 px-4 border-2 border-black">{row.marks}</td>
                               <td className="py-3 px-4 border-2 border-black text-black">{row.status}</td>
                               <td className="py-3 px-4 border-2 border-black">
                                 {row.createdAt.split(" ").slice(0, 3).join(" ")} <br />
                                 {row.createdAt.split(" ").slice(3).join(" ")}
                               </td>
                               <td className="py-3 px-4 border-2 border-black">{row.totalQuestions}</td>
                               <td className="py-3 px-4 border-2 border-black">
                               <Link href="/action">
                                 <button className="text-black hover:text-black font-bold">
                                   <ArrowRightCircle size={24} strokeWidth={3.5} />
                                 </button>
                                  </Link>
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
