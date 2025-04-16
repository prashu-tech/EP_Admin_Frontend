"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { dataofquestions } from "../../../../public/cleaned.js";

export default function PhysicsChapterList() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChaptersData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admintest/questions`);
        const questions = response.data.questions;

        const physicsChapters = Object.keys(dataofquestions.Physics).map((chapterKey, index) => {
          const unitName = chapterKey.split(":")[0];
          const chapterName = chapterKey.split(":")[1].trim();

          const chapterQuestions = questions.filter((q) => q.chapter_name === chapterName);

          return {
            id: index + 1,
            name: chapterName,
            unit: unitName,
            isChecked: false,
            numQuestions: 0,
            totalMarks: 0,
            questions: chapterQuestions,
            rows: [],
          };
        });

        setChapters(physicsChapters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchChaptersData();
  }, []);

  const handleCheckboxChange = (id) => {
    setChapters((prev) => {
      const updatedChapters = prev.map((chapter) =>
        chapter.id === id ? { ...chapter, isChecked: !chapter.isChecked } : chapter
      );

      const selectedChapters = updatedChapters
        .filter((chapter) => chapter.isChecked)
        .map((chapter) => ({
          chapterName: chapter.name,
          unit: chapter.unit,
          numQuestions: chapter.numQuestions,
          totalMarks: chapter.numQuestions * 4,
          questions: chapter.rows,
        }));

      localStorage.setItem("Physics", JSON.stringify(selectedChapters));
      return updatedChapters;
    });
  };

  const handleQuestionChange = (id, e) => {
    const value = parseInt(e.target.value) || 0;

    const updatedChapters = chapters.map((chapter) =>
      chapter.id === id
        ? {
            ...chapter,
            numQuestions: value,
            totalMarks: value * 4,
            rows: chapter.questions.slice(0, value).map((q) => ({
              id: q.id,
              subject: "Physics",
              question: q.question_text,
            })),
          }
        : chapter
    );

    setChapters(updatedChapters);

    const selectedChapters = updatedChapters
      .filter((chapter) => chapter.isChecked)
      .map((chapter) => ({
        chapterName: chapter.name,
        unit: chapter.unit,
        numQuestions: chapter.numQuestions,
        totalMarks: chapter.numQuestions * 4,
        questions: chapter.rows,
      }));

    localStorage.setItem("Physics", JSON.stringify(selectedChapters));
  };

  useEffect(() => {
    const savedChapters = JSON.parse(localStorage.getItem("Physics")) || [];
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        const savedChapter = savedChapters.find((saved) => saved.chapterName === chapter.name);
        return savedChapter
          ? { ...chapter, isChecked: true, numQuestions: savedChapter.numQuestions, rows: savedChapter.questions }
          : chapter;
      })
    );
  }, []);

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;

  return (
    <div className="flex justify-center mt-4 px-2">
      <div className="bg-white hidden md:block w-3/3 rounded-xl overflow-hidden border-none">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left font-Poppins text-[#181C32] max-w-4xl mx-auto">
                <thead className="bg-[#B1CEFB] text-[#181C32] font-Mulish font-semibold">
                  <tr>
                    {["Selected", "Sr.no", "Chapter Name", "Questions", "Total Marks"].map((header, i) => (
                      <th key={i} className={`py-3 px-6 text-center ${i === 0 ? "rounded-tl-xl" : ""} ${i === 4 ? "rounded-tr-xl" : ""}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-6 text-center">
                      <div
                        className={`w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer mx-auto ${chapter.isChecked ? "bg-blue-500" : "bg-gray-300"}`}
                        onClick={() => handleCheckboxChange(chapter.id)}
                      >
                        {chapter.isChecked && (
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </td>
                    {[index + 1, chapter.name].map((item, i) => (
                      <td key={i} className="py-3 px-6 text-center font-Mulish font-semibold text-black">
                        {item}
                      </td>
                    ))}
                    <td className="py-3 px-6 text-center">
                      <input
                        type="number"
                        value={chapter.numQuestions}
                        onChange={(e) => handleQuestionChange(chapter.id, e)}
                        className="w-12 h-10 bg-gray-200 text-center font-Mulish font-semibold outline-none rounded-md mx-auto"
                        min="0"
                      />
                    </td>
                    <td className="py-3 px-6 text-center font-Mulish font-semibold">
                      <div className="w-12 h-10 bg-gray-200 flex items-center justify-center rounded-md mx-auto">
                        {chapter.totalMarks || 0}
                      </div>
                    </td>
                  </tr>
                  {chapter.isChecked && (
                    <tr>
                      <td colSpan="5" className="p-3">
                        <div className="rounded-xl shadow-md w-[95%] ml-5">
                          <table className="w-full text-sm text-left font-Poppins text-[#181C32] border-collapse">
                            <thead className="bg-gray-100 text-black">
                              <tr>
                                {["Q.no", "Subjects", "Question", "Action"].map((header, i) => (
                                  <th key={i} className={`py-3 px-6 text-center font-Mulish font-semibold ${i === 0 ? "rounded-tl-xl" : ""} ${i === 3 ? "rounded-tr-xl" : ""}`}>
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {chapter.rows.map((row, index) => (
                                <tr key={row.id} className={`hover:bg-gray-50 transition ${index === chapter.rows.length - 1 ? "border-none" : "border-b border-[#E1CFFF]"}`}>
                                  <td className="py-3 px-6 text-center font-Mulish font-bold">{index + 1}</td>
                                  <td className="py-3 px-6 text-center font-Mulish font-semibold flex items-center justify-center space-x-1">
                                    <Image src="/physics_logo.png" alt="Physics" width={20} height={20} className="w-5 h-5" />
                                    <div className="text-sm font-semibold">Physics</div>
                                  </td>
                                  <td className="py-3 px-6 text-center font-Mulish font-semibold">{row.question}</td>
                                  <td className="py-3 px-6 text-center font-Mulish font-semibold">
                                    <div className="flex justify-center space-x-2">
                                      <Image src="/refresh.png" alt="Refresh" width={20} height={20} className="w-5 h-5 cursor-pointer" />
                                      <Image src="/arrow.png" alt="Arrow" width={20} height={20} className="w-5 h-5 cursor-pointer" />
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
