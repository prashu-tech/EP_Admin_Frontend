"use client"; 
import React, { useState } from "react";
import Image from "next/image";

export default function PhysicsChapterList() {
  const [chapters, setChapters] = useState([
    { id: 1, name: "Kinematics", unit: "Unit 1", isChecked: false, numQuestions: 0, rows: [] },
    { id: 2, name: "Dynamics", unit: "Unit 2", isChecked: false, numQuestions: 0, rows: [] },
  ]);

  const handleCheckboxChange = (id) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === id ? { ...chapter, isChecked: !chapter.isChecked, rows: [] } : chapter
      )
    );
  };

  const handleQuestionChange = (id, e) => {
    const value = parseInt(e.target.value) || 0;
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === id
          ? {
              ...chapter,
              numQuestions: value,
              rows: Array.from({ length: value }, (_, index) => ({
                id: index + 1,
                subject: "Physics",
                question: "What is Newton's second law of motion?",
              })),
            }
          : chapter
      )
    );
  };

  return (
    <div className="flex justify-center mt-4 px-2">
      <div className="bg-white w-full md:w-5/6 lg:w-4/5 xl:w-3/4 rounded-2xl overflow-hidden border-none">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm md:text-base text-left font-Poppins text-[#181C32]">
                <thead className="bg-[#B1CEFB] text-[#181C32] font-Mulish font-semibold">
                  <tr >
                    {["Selected", "Sr.no", "Chapter Name", "Unit", "Questions", "Total Marks"].map((header, i) => (
                      <th
                        key={i}
                        className={`py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center ${i === 0 ? "rounded-tl-2xl" : ""} ${i === 6 ? "rounded-tr-2xl" : ""}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr >
                    <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center">
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer mx-auto ${chapter.isChecked ? "bg-blue-500" : "bg-gray-300"}`}
                        onClick={() => handleCheckboxChange(chapter.id)}
                      >
                        {chapter.isChecked && (
                          <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </td>
                    {[index + 1, chapter.name, chapter.unit].map((item, i) => (
                      <td key={i} className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold text-black">
                        {item}
                      </td>
                    ))}
                    <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center">
                      <input
                        type="number"
                        value={chapter.numQuestions}
                        onChange={(e) => handleQuestionChange(chapter.id, e)}
                        className="w-12 h-10 bg-gray-200 text-center font-Mulish font-semibold outline-none rounded-md mx-auto"
                        min="0"
                      />
                    </td>
                    <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold">
                      <div className="w-12 h-10 bg-gray-200 flex items-center justify-center rounded-md mx-auto">
                        {chapter.numQuestions * 4 || 0}
                      </div>
                    </td>
                  </tr>
                  {chapter.isChecked && (
                    <tr>
                      <td colSpan="7" className="p-4">
                        <div className="rounded-2xl shadow-lg">
                          <table className="w-full text-xs sm:text-sm md:text-base text-left font-Poppins text-[#181C32] border-collapse">
                            <thead className="bg-gray-100 text-black">
                              <tr>
                                {["Q.no", "Subjects", "Question", "Action"].map((header, i) => (
                                  <th
                                    key={i}
                                    className={`py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold ${i === 0 ? "rounded-tl-2xl" : ""} ${i === 3 ? "rounded-tr-2xl" : ""}`}
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {chapter.rows.map((row, index) => (
                                <tr
                                  key={row.id}
                                  className={`hover:bg-gray-50 transition ${index === chapter.rows.length - 1
                                    ? "border-none"
                                    : "border-b border-[#E1CFFF]"}`}
                                >
                                  <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-bold">
                                    {row.id}
                                  </td>
                                  <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold flex items-center justify-center space-x-1">
                                    <Image
                                      src="/physics_logo.png"
                                      alt="Physics"
                                      width={20}
                                      height={20}
                                      className="w-5 h-5"
                                    />
                                    <div className="text-md font-semibold">Physics</div>
                                  </td>
                                  <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold">
                                    {row.question}
                                  </td>
                                  <td className="py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6 text-center font-Mulish font-semibold">
                                    <div className="flex justify-center space-x-2">
                                      <Image
                                        src="/refresh.png"
                                        alt="Refresh"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 cursor-pointer"
                                      />
                                      <Image
                                        src="/arrow.png"
                                        alt="Arrow"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 cursor-pointer"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
