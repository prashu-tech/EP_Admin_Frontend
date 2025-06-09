"use client";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaPrint,
  FaEye,
  FaCog,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

export default function AnswerPaper() {
  const [showWatermark, setShowWatermark] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [proceedClicked, setProceedClicked] = useState(false);
  const [paperTitle, setPaperTitle] = useState("Answer Key");
  const [showOMRPreview, setShowOMRPreview] = useState(false);

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
    setTimeout(() => {
      document.getElementById("previewSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

const handlePrint = () => {
  const printWindow = window.open("", "_blank");
  let currentSubject = null;

  const renderQuestions = (questions, showSubjects) => {
    let output = "";
    let lastSubject = null;

    questions.forEach((q, idx) => {
      // Group by subject if needed
      if (showSubjects && q.subject !== lastSubject) {
        output += `
          <div class="subject-header">
            ${q.subject}
          </div>
        `;
        lastSubject = q.subject;
      }

      output += `
        <div class="question-block">
          <div class="question-number">${idx + 1}.</div>
          <div class="question-main">
            <div class="question-text">${q.question_text}</div>
            ${q.options ? `
              <div class="options-block">
                ${Object.entries(q.options).map(
                  ([key, value]) => `
                    <div class="option-row${q.correctanswer && q.correctanswer.toLowerCase() === key.toLowerCase() ? ' correct' : ''}">
                      <span class="option-letter">${key.toUpperCase()})</span>
                      <span>${value}</span>
                    </div>
                  `
                ).join("")}
              </div>
            ` : ""}
            ${showMarks ? `<div class="marks-label">[${q.marks || 4} Mark${(q.marks || 4) > 1 ? "s" : ""}]</div>` : ""}
            ${showSolutions ? `
              <div class="solution-block">
                <div class="solution-title">Solution & Answer</div>
                ${q.correctanswer ? `<div class="correct-answer"><strong>Correct Answer:</strong> ${q.correctanswer.toUpperCase()}</div>` : ""}
                ${q.solution ? `<div class="solution-text"><strong>Explanation:</strong><br>${q.solution}</div>` : ""}
              </div>
            ` : ""}
          </div>
        </div>
      `;
    });
    return output;
  };

  const printContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${paperTitle || "Answer Key"}</title>
    <style>
      @page {
        size: A4;
        margin: 1.5cm;
      }
      body {
        font-family: 'Times New Roman', serif;
        font-size: 10pt;
        margin: 0;
        padding: 0;
        color: #000;
        background: #fff;
        position: relative;
      }
      .page {
        page-break-after: always;
        padding: 20px;
        position: relative;
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #222;
        padding-bottom: 10px;
        margin-bottom: 10px;
        position: relative;
      }
      .title {
        font-size: 20pt;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        flex: 1;
      }
      .subtitle {
        font-size: 11pt;
        font-style: italic;
        color: #555;
        text-align: center;
        margin-top: 3px;
      }
      .question-columns {
        column-count: 2;
        column-gap: 42px;
        column-rule: 1px solid #eee;
      }
      .subject-header {
        background: #ede9fe;
        color: #5b21b6;
        font-weight: bold;
        font-size: 10pt;
        text-transform: uppercase;
        border-bottom: 1px solid #a78bfa;
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 8px 8px 4px 0;
        break-inside: avoid;
      }
      .question-block {
        margin-bottom: 18px;
        break-inside: avoid;
        display: flex;
        gap: 12px;
        border-left: 3px solid #ede9fe;
        padding-left: 10px;
        min-height: 32px;
      }
      .question-number {
        font-weight: bold;
        min-width: 30px;
        color: #222;
      }
      .question-main {
        flex: 1;
      }
      .question-text {
        font-weight: 500;
        margin-bottom: 2px;
        line-height: 1.4;
      }
      .options-block {
        margin: 5px 0 8px 15px;
      }
      .option-row {
        display: flex;
        align-items: start;
        margin-bottom: 2px;
        padding: 2px 0;
        font-size: 10pt;
      }
      .option-row.correct {
        background: #e0fae4;
        border-left: 3px solid #16a34a;
        border-radius: 3px;
      }
      .option-letter {
        font-weight: bold;
        margin-right: 8px;
        min-width: 18px;
        color: #2563eb;
      }
      .marks-label {
        text-align: right;
        color: #b91c1c;
        font-style: italic;
        font-size: 9pt;
        margin-top: 2px;
        margin-bottom: 2px;
        display: none;
      }
      .solution-block {
        background: #f0f9ff;
        border: 1px solid #38bdf8;
        border-radius: 4px;
        padding: 8px;
        margin-top: 7px;
        font-size: 10pt;
      }
      .solution-title {
        font-weight: bold;
        color: #0369a1;
        margin-bottom: 4px;
        border-bottom: 1px solid #bae6fd;
        padding-bottom: 2px;
      }
      .correct-answer {
        background: #e0fae4;
        padding: 4px;
        border-radius: 3px;
        margin-bottom: 3px;
        border-left: 2px solid #22c55e;
      }
      .solution-text {
        color: #444;
        line-height: 1.3;
        margin-bottom: 2px;
      }
      .footer {
        text-align: center;
        font-size: 10pt;
        margin-top: 30px;
        border-top: 1px solid #eee;
        padding-top: 10px;
        color: #666;
      }
      .watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-30deg);
        font-size: 70px;
        color: rgba(91, 33, 182, 0.07);
        font-weight: bold;
        z-index: 0;
        pointer-events: none;
        font-family: Arial, sans-serif;
        user-select: none;
        text-align: center;
        width: 100vw;
      }
    </style>
  </head>
  <body>
    ${showWatermark ? `<div class="watermark">NEXCORE</div>` : ""}
    <div class="page">
      <div class="header">
        <div class="title">${paperTitle}</div>
      </div>
      <div class="question-columns">
        ${renderQuestions(questions, showSubjects)}
      </div>
      <div class="footer">--- End of Answer Key ---</div>
    </div>
  </body>
  </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
};


  
const handleOMRSheet = () => {
  const printWindow = window.open("", "_blank");

  const allQuestions = questions.map((q, index) => ({
    ...q,
    number: index + 1,
  }));

  const questionsPerPage = 180;
  const questionsPerColumn = 45;
  const pages = [];
for (let i = 0; i < allQuestions.length; i += questionsPerPage) {
  pages.push(allQuestions.slice(i, i + questionsPerPage));
}


  const omrContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>OMR Answer Sheet - ${paperTitle}</title>
    <style>
      @page {
        size: A4;
        margin: 1.5cm;
      }
      body {
        font-family: 'Arial', sans-serif;
        font-size: 10pt;
        margin: 0;
        padding: 0;
        background: white;
        color: #000;
      }

      .omr-page {
        page-break-after: always;
        padding: 0;
      }

      .omr-header {
        text-align: center;
        margin-bottom: 20px;
      }

      .omr-box {
        border: 2px solid #000;
        padding: 12px;
        display: inline-block;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
      }

      .omr-title {
        font-size: 16pt;
        font-weight: bold;
        text-align: center;
        margin: 4px 0;
      }

      .omr-subtitle {
        font-size: 11pt;
        color: #444;
        text-align: center;
        margin-bottom: 10px;
      }

      .omr-info {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        font-size: 10pt;
      }

      .omr-info div {
        flex: 1;
      }

      .info-line {
        display: inline-block;
        border-bottom: 1px solid #000;
        width: 120px;
        margin-left: 5px;
      }

      .omr-table {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.omr-table td {
  padding: 2px 6px;
  vertical-align: middle;
  white-space: nowrap;
}

.column {
  flex: 1;
  justify: space-between;
  border: 1px solid black;
  max-width: fit;
  padding: 10px;
}

      .question-row {
        display: flex;
        align-items: center;
        margin-bottom: 3px;
        font-size: 6pt;
      }
        
      .question-number {
        min-width: 20px;
        font-weight: bold;
        font-size: 7pt;
      }

      .options-bubbles {
        display: flex;
        gap: 10px;
        margin-left: 10px;
      }


     .bubble-option {
        width: 14px;
        height: 14px;
        border: 1px solid #000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6pt;
        font-weight: bold;
        line-height: 1;
        text-align: center;
        padding: 0;
      }

      .bubble-option.filled {
        background-color: #000 !important;
        color: transparent;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }



            
      .filled {
        background-color: #000 !important;
        color: transparent;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .bubble {
  display: inline-block;
  width: 12px;
  height: 12px;
  line-height: 12px;
  border: 1px solid #000;
  border-radius: 50%;
  text-align: center;
  font-size: 6pt;
  font-weight: bold;
  margin: 0 1px;
}

      .bubble.filled {
        background-color: #000 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .option-label {
        font-size: 9pt;
      }
    </style>
  </head>
<body>
  ${(() => {
    const renderColumn = (columnQuestions) =>
      columnQuestions
        .map((q) => {
          const correctText = q.correctanswer?.trim().toLowerCase();
          const options = q.options || {};
          const correctKey = Object.keys(options).find(
            (key) => options[key]?.trim().toLowerCase() === correctText
          );

          return `
            <div class="question-row">
              <div class="question-number">${q.number}.</div>
              <div class="options-bubbles">
                ${["0", "1", "2", "3"]
  .map((opt) => `
    <div class="bubble-option ${correctKey?.toUpperCase() === opt ? "filled" : ""}">
      ${opt}
    </div>
  `)

                  .join("")}
              </div>
            </div>
          `;
        })
        .join("");

    return pages
      .map((pageQuestions) => {
        const col1 = pageQuestions.slice(0, 45);
        const col2 = pageQuestions.slice(45, 90);
        const col3 = pageQuestions.slice(90, 135);
        const col4 = pageQuestions.slice(135, 180);

        return `
          <div class="omr-page">
            <div class="omr-header">
              <div class="omr-box">
                <h1 class="omr-title">OMR ANSWER SHEET</h1>
                <p class="omr-subtitle">${paperTitle}</p>
                <div class="omr-info">
                  <div>Name: <span class="info-line"></span></div>
                  <div>Roll No: <span class="info-line"></span></div>
                  <div>Date: <span class="info-line"></span></div>
                </div>
              </div>
            </div>
            <div class="omr-table" style="display: flex; gap: 12px;">
              <div class="column">${renderColumn(col1)}</div>
              <div class="column">${renderColumn(col2)}</div>
              <div class="column">${renderColumn(col3)}</div>
              <div class="column">${renderColumn(col4)}</div>
            </div>
          </div>
        `;
      })
      .join("");
  })()}
</body>

  </html>
  `;

  printWindow.document.write(omrContent);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
  

  const handleOMRPreview = () => {
    setShowOMRPreview(true);
    setTimeout(() => {
      document.getElementById("omrPreviewSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="flex-1 flex max-w-4xl ml-65 justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-lg">
            <Link href="/offline_mode">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl transform hover:scale-105">
                <IoIosArrowBack size={20} />
              </button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                <FaFileAlt className="text-purple-600" />
                Answer Paper Generator
              </h1>
              <p className="text-gray-600">
                Generate answer keys with solutions and explanations
              </p>
            </div>
            <div className="w-12"></div>
          </div>

          {/* Configuration Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <FaCog className="text-purple-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">
                Configuration Options
              </h2>
            </div>

            {/* Paper Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Answer Paper Title
              </label>
              <input
                type="text"
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="E.g., Mathematics Answer Key - Final Exam"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Display Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700 border-b border-gray-200 pb-2">
                  Display Options
                </h3>

                <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    checked={showWatermark}
                    onChange={(e) => setShowWatermark(e.target.checked)}
                  />
                  <span className="font-medium">Show Watermark</span>
                  <span className="text-sm text-gray-500">
                    (Adds "ANSWER KEY" watermark)
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    checked={showSubjects}
                    onChange={(e) => setShowSubjects(e.target.checked)}
                  />
                  <span className="font-medium">Show Subject Headers</span>
                  <span className="text-sm text-gray-500">
                    (Groups questions by subject)
                  </span>
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700 border-b border-gray-200 pb-2">
                  Content Options
                </h3>

                <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    checked={showSolutions}
                    onChange={(e) => setShowSolutions(e.target.checked)}
                  />
                  <span className="font-medium">Show Solutions</span>
                  <span className="text-sm text-gray-500">
                    (Includes detailed explanations)
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                    checked={showMarks}
                    onChange={(e) => setShowMarks(e.target.checked)}
                  />
                  <span className="font-medium">Show Marks</span>
                  <span className="text-sm text-gray-500">
                    (Displays mark allocation)
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleProceed}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaEye /> Generate Preview
              </button>
              <button
                onClick={handleOMRPreview}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaClipboardList /> OMR Preview
              </button>
              <button className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Reset Options
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {proceedClicked && (
            <div id="previewSection" className="mb-10">
              <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-2xl shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Answer Paper Preview
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Review your answer key before printing
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <FaPrint /> Print Answer Key
                </button>
              </div>

              {/* Preview Content */}
              <div className="bg-white mx-auto p-10 shadow-xl rounded-2xl max-w-4xl border border-gray-200 relative">
                {showWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-200 text-8xl font-bold transform rotate-[-30deg] select-none">
                      ANSWER KEY
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center border-b-2 border-gray-800 pb-6 mb-8 relative z-10">
                  <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">
                    {paperTitle}
                  </h1>
                 
                </div>

                {/* Questions */}
                <div className="questions-container relative z-10">
                  {(() => {
                    let currentSubject = null;
                    return questions.map((q, index) => (
                      <div
                        key={index}
                        className="mb-8 border-l-3 border-gray-200 pl-4 ml-2"
                      >
                        {showSubjects &&
                          q.subject !== currentSubject &&
                          (() => {
                            currentSubject = q.subject;
                            return (
                              <h3 className="text-lg font-bold text-center uppercase border-b border-purple-400 pb-2 mb-4 mt-6 text-purple-600">
                                {q.subject}
                              </h3>
                            );
                          })()}

                        <div className="flex mb-4 items-start">
                          <span className="font-bold mr-3 mt-1 min-w-[30px] text-gray-800">
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <div className="font-medium mb-3 leading-relaxed">
                              {q.question_text}
                            </div>

                            {q.options && (
                              <div className="ml-4 space-y-2 mb-4">
                                {Object.entries(q.options).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className={`flex items-start p-2 rounded ${
                                        q.correctanswer &&
                                        q.correctanswer.toLowerCase() ===
                                          key.toLowerCase()
                                          ? "bg-green-100 border-l-4 border-green-500"
                                          : "hover:bg-gray-50"
                                      }`}
                                    >
                                      <span className="font-medium mr-3 min-w-[20px]">
                                        {key.toUpperCase()})
                                      </span>
                                      <span className="leading-relaxed">
                                        {value}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}

                            {showMarks && (
                              <div className="text-right text-sm text-red-600 mb-3 italic">
                                [{q.marks || 4} Mark
                                {(q.marks || 4) > 1 ? "s" : ""}]
                              </div>
                            )}

                            {showSolutions && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                <div className="font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">
                                  Solution & Answer
                                </div>
                                {q.correctanswer && (
                                  <div className="bg-green-100 p-3 rounded mb-3 border-l-4 border-green-500">
                                    <strong className="text-green-800">
                                      Correct Answer:
                                    </strong>
                                    <span className="ml-2 font-semibold">
                                      {q.correctanswer.toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                {q.solution && (
                                  <div className="text-gray-700 leading-relaxed">
                                    <strong>Explanation:</strong>
                                    <br />
                                    {q.solution}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                <div className="text-center mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600 relative z-10">
                  --- End of Answer Key ---
                </div>
              </div>
            </div>
          )}

          {/* OMR Preview Section */}
          {showOMRPreview && (
            <div id="omrPreviewSection" className="mb-10">
              <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-2xl shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FaClipboardList className="text-orange-600" />
                    OMR Answer Sheet Preview
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Review the OMR sheet before printing
                  </p>
                </div>
                <button
                  onClick={handleOMRSheet}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <FaPrint /> Print OMR Sheet
                </button>
              </div>

              {/* OMR Preview Content */}
              <div className="bg-white mx-auto p-8 shadow-xl rounded-2xl max-w-4xl border border-gray-200">
                {/* OMR Header */}
                <div className="border-2 border-black p-6 text-center mb-6">
                  <h1 className="text-2xl font-bold mb-2 uppercase">
                    OMR Answer Sheet
                  </h1>
                  <p className="text-lg text-gray-700 mb-4">{paperTitle}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      Name:{" "}
                      <span className="border-b border-black inline-block w-48 ml-2"></span>
                    </div>
                    <div>
                      Roll No:{" "}
                      <span className="border-b border-black inline-block w-32 ml-2"></span>
                    </div>
                    <div>
                      Date:{" "}
                      <span className="border-b border-black inline-block w-32 ml-2"></span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-100 border border-gray-300 p-4 mb-6 text-sm">
                  <h4 className="font-bold mb-2">Instructions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Use only black or blue pen to fill the bubbles completely
                    </li>
                    <li>Fill only one bubble per question</li>
                    <li>Make dark marks that fill the circle completely</li>
                    <li>Do not make any stray marks on this sheet</li>
                  </ul>
                </div>

                {/* OMR Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {questions.map((q, index) => {
                    const questionNumber = index + 1;
                    const options = q.options || {}; // In case it's undefined
                    const correctAnswerText = q.correctanswer
                      ?.trim()
                      .toLowerCase();

                    // 🔍 Find the correct option key (a/b/c/d) by matching the value
                    const correctOptionKey = Object.keys(options).find(
                      (key) =>
                        options[key]?.trim().toLowerCase() === correctAnswerText
                    );

                    // 🔧 Debug output
                    // console.log(`Q${questionNumber}: Correct Answer Text =`, correctAnswerText);
                    // console.log(`Q${questionNumber}: Options =`, options);
                    // console.log(`Q${questionNumber}: Matched Key =`, correctOptionKey);

                    return (
                      <div
                        key={index}
                        className="flex items-center py-2 border-b border-dotted border-gray-300"
                      >
                        <span className="font-bold min-w-[40px] text-sm">
                          {questionNumber}.
                        </span>
                        <div className="flex gap-4 ml-3">
                          {["0", "1", "2", "3"].map((option) => (
                            <div
                              key={option}
                              className="flex items-center gap-1"
                            >
                              <span className="text-xs font-medium">
                                {option.toUpperCase()}
                              </span>
                              <div
                                className={`w-4 h-4 border-2 border-black rounded-full flex items-center justify-center ${
                                  correctOptionKey === option
                                    ? "bg-black"
                                    : "bg-white"
                                }`}
                              >
                                {correctOptionKey === option && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600">
                  --- End of OMR Answer Sheet ---
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
