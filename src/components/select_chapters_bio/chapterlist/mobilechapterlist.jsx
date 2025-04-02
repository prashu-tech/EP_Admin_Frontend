"use client";
import React, { useState } from "react";

export default function BiologyChapterListMobile() {
  const [chapters] = useState([
    { id: 1, name: "Cell Biology", unit: "Unit 1", isChecked: false, numQuestions: 0 },
    { id: 2, name: "Genetics", unit: "Unit 2", isChecked: false, numQuestions: 0 },
  ]);

  return (
    <div className="block md:hidden">
      <div className="flex flex-col items-center mt-4 px-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{chapter.name}</h3>
              <p className="text-sm text-gray-500">{chapter.unit}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">Total Marks: {chapter.numQuestions * 4 || 0}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
