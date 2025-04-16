"use client";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";

export default function AnswerPaper() {
  const [showWatermark, setShowWatermark] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [proceedClicked, setProceedClicked] = useState(false);

  const fetchQuestions = async () => {
    const testid = localStorage.getItem("testid");
    if (!testid) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/get-questions`,
        { testid }
      );
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleProceed = () => {
    setProceedClicked(true);
    fetchQuestions();
  };

  // Pagination logic
  const PAGE_HEIGHT = 1000; // approximate height of one page (in px)
  const QUESTION_HEIGHT = 150; // estimated height for one question + options

  const paginateQuestions = () => {
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    questions.forEach((q, index) => {
      const block = { ...q, index: index + 1 };
      if (currentHeight + QUESTION_HEIGHT > PAGE_HEIGHT) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(block);
      currentHeight += QUESTION_HEIGHT;
    });

    if (currentPage.length > 0) pages.push(currentPage);
    return pages;
  };

  const pages = paginateQuestions();

  return (
    <div className="flex justify-center items-start min-h-screen pt-2">
      <div className="w-[1000px] bg-white rounded-lg p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative left-24">
            <div className="top-2 hidden md:block">
              <Link href="/offline_mode">
                <button className="bg-blue-600 text-white p-3 rounded-full shadow flex items-center justify-center">
                  <IoIosArrowBack size={15} />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <button className="px-6 py-4 rounded-md text-gray-500 ml-16 border shadow">
              Generate Test
            </button>
          </div>
        </div>

        {/* Options Section */}
        <div className="border border-gray-400 shadow p-6 rounded-lg w-[970px] md:h-[240px]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setShowWatermark(e.target.checked)}
              />{" "}
              Show Watermark
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setShowSubjects(e.target.checked)}
              />{" "}
              Show Subject
            </label>
            <label className="flex items-center mt-5">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setShowSolutions(e.target.checked)}
              />{" "}
              Show Solutions
            </label>
            <label className="flex items-center mt-5">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setShowMarks(e.target.checked)}
              />{" "}
              Show Marks
            </label>
          </div>
          <div className="flex gap-8 md:ml-54 mt-15">
            <button
              onClick={handleProceed}
              className="bg-blue-500 text-white px-16 py-2 rounded-md hover:bg-blue-600"
            >
              Proceed
            </button>
            <button className="bg-red-500 text-white px-16 py-1 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>

        {/* Print Preview */}
        <div className="mt-8 md:ml-46">
          <h3 className="font-semibold italic text-2xl">Print Preview</h3>
          <div className="relative border-4 border-gray-300 border-dashed h-auto w-[96%] mt-1 rounded-md bg-white p-4">
            {proceedClicked && (
              <div className="relative">
                <img
                  src="/sample-question-paper.png"
                  alt="Sample Background"
                  className="w-full rounded shadow"
                />
                {showWatermark && (
                  <p className="absolute top-1/2 left-1/2 text-gray-300 text-6xl font-bold opacity-20 -translate-x-1/2 -translate-y-1/2">
                    WATERMARK
                  </p>
                )}
                <div className="absolute top-0 left-0 p-10 text-black w-full">
                  {pages.map((page, pageIndex) => (
                    <div key={pageIndex}>
                      {page.map((q, idx) => {
                        let subjectDisplayed = false; // Track if subject is already displayed
                        return (
                          <div key={idx} className="mb-6">
                            {/* Display the subject once for each subject block */}
                            {showSubjects && !subjectDisplayed && (
                              <p className="font-semibold text-lg">
                                Subject: {q.subject}
                              </p>
                            )}
                            {/* Mark the subject as displayed after it's shown once */}
                            {subjectDisplayed = true}
                            <p className="font-semibold">
                              Q{idx + 1}. {q.question_text}
                            </p>
                            {showMarks && (
                              <p className="text-sm text-red-600">4 Marks</p>
                            )}
                            {showSolutions && (
                              <p className="text-sm mt-1 ml-4 text-green-700">
                                Correct Answer: {q.correctanswer}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => window.print()}
            className="bg-red-500 text-white w-[96%] py-2 mt-4 rounded-md hover:bg-red-600 shadow"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
