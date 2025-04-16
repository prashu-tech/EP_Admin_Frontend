"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function BiologyChapterList() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch & group biology questions by unique chapter name
  useEffect(() => {
    const fetchBiologyChapters = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admintest/biology-questions`);
        const { questions } = response.data;

        const chapterMap = {};
        questions.forEach((q) => {
          if (!chapterMap[q.chapter_name]) {
            chapterMap[q.chapter_name] = {
              id: Object.keys(chapterMap).length + 1,
              name: q.chapter_name,
              unit: q.unit || "Unit I",
              isChecked: false,
              numQuestions: 0,
              rows: [],
              questions: [],
            };
          }

          chapterMap[q.chapter_name].questions.push({
            id: q.id, // ✅ actual question ID from backend
            subject: "Biology",
            question: q.question_text,
          });
        });

        setChapters(Object.values(chapterMap));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching biology questions:", error);
        setLoading(false);
      }
    };

    fetchBiologyChapters();
  }, []);

  const handleCheckboxChange = (id) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === id ? { ...chapter, isChecked: !chapter.isChecked, rows: [] } : chapter
      )
    );
  };

  const handleQuestionChange = (id, e) => {
    const value = parseInt(e.target.value) || 0;

    const updatedChapters = chapters.map((chapter) =>
      chapter.id === id
        ? {
            ...chapter,
            numQuestions: value,
            rows: chapter.questions.slice(0, value).map((q) => ({
              id: q.id,
              subject: "Biology",
              question: q.question,
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

    localStorage.setItem("Biology", JSON.stringify(selectedChapters));
  };

  useEffect(() => {
    const savedChapters = JSON.parse(localStorage.getItem("Biology")) || [];
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        const saved = savedChapters.find((sc) => sc.chapterName === chapter.name);
        return saved
          ? {
              ...chapter,
              isChecked: true,
              numQuestions: saved.numQuestions,
              rows: saved.questions,
            }
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
                    {["Selected", "Sr.no", "Chapter Name", "Unit", "Questions", "Total Marks"].map((header, i) => (
                      <th key={i} className={`py-3 px-6 text-center ${i === 0 ? "rounded-tl-xl" : ""} ${i === 5 ? "rounded-tr-xl" : ""}`}>
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
                    {[index + 1, chapter.name, chapter.unit].map((item, i) => (
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
                        {chapter.numQuestions * 4 || 0}
                      </div>
                    </td>
                  </tr>

                  {/* Show questions if selected */}
                  {chapter.isChecked && (
                    <tr>
                      <td colSpan="7" className="p-3">
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
                                    <Image src="/bio.jpeg" alt="biology" width={20} height={20} className="w-5 h-5" />
                                    <div className="text-sm font-semibold">Biology</div>
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
