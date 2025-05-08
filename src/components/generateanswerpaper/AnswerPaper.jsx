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

  const paginateQuestions = () => {
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
    const MAX_PAGE_HEIGHT = 1000;
    const QUESTION_BASE_HEIGHT = 50;
    const OPTION_HEIGHT = 20;
    const MARGIN_HEIGHT = 30;

    questions.forEach((q) => {
      const optionsCount = q.options ? Object.keys(q.options).length : 0;
      const questionHeight = 
        QUESTION_BASE_HEIGHT + 
        (optionsCount * OPTION_HEIGHT) + 
        (showSolutions ? 30 : 0) + 
        (showMarks ? 20 : 0) +
        MARGIN_HEIGHT;

      if (currentHeight + questionHeight > MAX_PAGE_HEIGHT) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push(q);
      currentHeight += questionHeight;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  const pages = proceedClicked ? paginateQuestions() : [];

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Question Paper</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.5;
              background-image: url('/sample-question-paper.png');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            .content-wrapper {
              background-color: rgba(255, 255, 255, 0.9);
              padding: 20px;
            }
            .page { 
              page-break-after: always; 
              padding: 20px;
            }
            .page:last-child { page-break-after: auto; }
            .question { margin-bottom: 25px; }
            .subject { 
              font-weight: bold; 
              font-size: 18px; 
              margin-bottom: 10px;
              padding-bottom: 5px;
              border-bottom: 1px solid #eee;
            }
            .question-text { 
              font-weight: bold; 
              font-size: 16px;
              margin-bottom: 8px;
            }
            .options { margin-left: 20px; }
            .option { margin-bottom: 5px; }
            .marks { 
              color: red; 
              font-size: 14px; 
              margin-top: 5px;
              font-style: italic;
            }
            .solution { 
              background: #f8f8f8; 
              padding: 10px; 
              margin-top: 10px; 
              border-radius: 4px;
              border-left: 3px solid #4CAF50;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 80px;
              color: rgba(0,0,0,0.08);
              font-weight: bold;
              z-index: 0;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="content-wrapper">
            ${pages.map((page, pageIndex) => `
              <div class="page">
                ${page.map((q, qIndex) => {
                  const questionNumber = pages.slice(0, pageIndex).reduce(
                    (acc, currPage) => acc + currPage.length, 0
                  ) + qIndex + 1;
                  
                  return `
                    <div class="question">
                      ${showSubjects ? `<div class="subject">Subject: ${q.subject}</div>` : ''}
                      <div class="question-text">Q${questionNumber}. ${q.question_text}</div>
                      ${q.options ? `
                        <div class="options">
                          ${Object.entries(q.options).map(([key, value]) => `
                            <div class="option">${key.toUpperCase()}. ${value}</div>
                          `).join('')}
                        </div>
                      ` : ''}
                      ${showMarks ? `<div class="marks">[4 Marks]</div>` : ''}
                      ${showSolutions ? `
                        <div class="solution">
                          <strong>Correct Answer:</strong> ${q.correctanswer}
                          ${q.solution ? `<div><strong>Solution:</strong> ${q.solution}</div>` : ''}
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            `).join('')}
            ${showWatermark ? '<div class="watermark">SAMPLE</div>' : ''}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex justify-center p-4">
        {/* White Box Container */}
        <div className="w-full max-w-6xl bg-white rounded-lg p-6 shadow-lg">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/offline_mode">
              <button className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition">
                <IoIosArrowBack size={15} />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Answer Paper Generator</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>

          {/* Options Section */}
          <div className="border border-gray-200 shadow-sm p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Display Options</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                />
                <span>Show Watermark</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={showSubjects}
                  onChange={(e) => setShowSubjects(e.target.checked)}
                />
                <span>Show Subject</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={showSolutions}
                  onChange={(e) => setShowSolutions(e.target.checked)}
                />
                <span>Show Solutions</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={showMarks}
                  onChange={(e) => setShowMarks(e.target.checked)}
                />
                <span>Show Marks</span>
              </label>
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={handleProceed}
                className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Generate Preview
              </button>
              <button className="bg-gray-500 text-white px-8 py-2 rounded-md hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {proceedClicked && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                <button
                  onClick={handlePrint}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Print Paper
                </button>
              </div>
              
              {/* Preview Content with Background Image */}
              <div className="relative border-4 border-gray-300 border-dashed h-auto w-full mt-1 rounded-md overflow-hidden">
                <img
                  src="/sample-question-paper.png"
                  alt="Sample Background"
                  className="w-full h-full object-cover bg-[#007AFF]"
                />
                {showWatermark && (
                  <p className="bg-[#007AFF] top-1/2 left-1/2 text-gray-300 text-6xl font-bold opacity-20 -translate-x-1/2 -translate-y-1/2">
                    WATERMARK
                  </p>
                )}
                <div className="relative p-10 text-black bg-white bg-opacity-90">
                  {pages.map((page, pageIndex) => (
                    <div key={pageIndex}>
                      {page.map((q, qIndex) => {
                        const questionNumber = pages.slice(0, pageIndex).reduce(
                          (acc, currPage) => acc + currPage.length, 0
                        ) + qIndex + 1;
                        
                        return (
                          <div key={`${pageIndex}-${qIndex}`} className="mb-6">
                            {showSubjects && (
                              <p className="font-semibold text-lg mb-2 text-blue-600">
                                Subject: {q.subject}
                              </p>
                            )}
                            <p className="font-semibold text-lg">
                              Q{questionNumber}. {q.question_text}
                            </p>
                            {q.options && (
                              <ul className="mt-2 ml-6 space-y-1">
                                {Object.entries(q.options).map(([key, value]) => (
                                  <li key={key} className="text-base">
                                    {key.toUpperCase()}. {value}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {showMarks && (
                              <p className="text-sm text-red-600 mt-1">[4 Marks]</p>
                            )}
                            {showSolutions && (
                              <div className="mt-2 p-2 bg-green-50 rounded">
                                <p className="text-sm font-medium text-green-700">
                                  <span className="font-bold">Correct Answer:</span> {q.correctanswer}
                                </p>
                                {q.solution && (
                                  <p className="text-sm text-green-700 mt-1">
                                    <span className="font-bold">Solution:</span> {q.solution}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}