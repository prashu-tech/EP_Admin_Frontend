"use client";
import React, { useEffect, useState } from "react";

const ChemistryCard = () => {
  const [chapterData, setChapterData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    const storedChemistry = localStorage.getItem("Chemistry");
    if (storedChemistry) {
      const parsedData = JSON.parse(storedChemistry);

      setChapterData(parsedData);

      // Calculate total questions and marks
      const questionCount = parsedData.reduce((acc, chapter) => acc + chapter.numQuestions, 0);
      setTotalQuestions(questionCount);
      setTotalMarks(questionCount * 4);
    }
  }, []);

  return (
    <div className="p-4 mt-0 bg-[#B1CEFB] shadow-xl rounded-tr-2xl rounded-tl-2xl ml-2 mr-3 w-[34rem] max-h-[700px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative bg-[#B1CEFB] shadow-lg">
          <img
            src="/science_2022299.svg"
            alt="Chemistry Icon"
            className="object-cover w-16 h-15"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Chemistry</h2>
          <div className="flex space-x-4 mt-2">
            <div className="bg-blue-400 text-white text-sm px-3 py-2 rounded-md w-36 text-center">
              Total Questions: {totalQuestions}
            </div>
            <div className="bg-blue-400 text-white text-sm px-4 py-2 rounded-md w-36 text-center">
              Total Marks: {totalMarks}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <h3 className="text-2xl font-semibold ml-5 mb-4 mt-2">Selected Chapters</h3>
        <table className="min-w-full table-auto border-collapse border-spacing-y-2">
          <thead>
            <tr className="bg-[#F5F5F5] border-gray-300">
              <th className="px-2 py-1 text-center rounded-tl-lg">Sr.No</th>
              <th className="px-1 py-2 text-center">Chapter Name</th>
              <th className="px-1 py-2 text-center rounded-tr-lg">Questions</th>
            </tr>
          </thead>
          <tbody>
            {chapterData.map((chapter, index) => (
              <tr key={index} className="border-t border-gray-300 text-center">
                <td className="px-2 py-2">{index + 1}</td>
                <td className="px-2 py-2">{chapter.chapterName}</td>
                <td className="px-2 py-2">{chapter.numQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChemistryCard;
