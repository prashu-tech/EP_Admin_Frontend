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

    // Get all questions for continuous printing
    const allQuestions = questions.map((q, index) => ({
      ...q,
      number: index + 1,
    }));

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${paperTitle}</title>
        <style>
          @page {
            size: A4;
            margin: 2cm 1.5cm;
          }
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #000;
            background: white;
            margin: 0;
            padding: 0;
            font-size: 12pt;
          }
          
          .paper-container {
            max-width: 100%;
            margin: 0 auto;
            position: relative;
          }
          
          ${
            showWatermark
              ? `
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 120px;
              color: rgba(0,0,0,0.05);
              font-weight: bold;
              z-index: 0;
              pointer-events: none;
              font-family: Arial, sans-serif;
            }
          `
              : ""
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 25px;
            page-break-after: avoid;
            position: relative;
            z-index: 1;
          }
          
          .paper-title {
            font-size: 20pt;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .paper-subtitle {
            font-size: 14pt;
            color: #555;
            font-style: italic;
          }
          
          .questions-section {
            margin-top: 25px;
            position: relative;
            z-index: 1;
          }
          
          .subject-heading {
            font-size: 14pt;
            font-weight: bold;
            margin: 25px 0 15px 0;
            text-align: center;
            text-transform: uppercase;
            border-bottom: 1px solid #000;
            padding-bottom: 8px;
            page-break-after: avoid;
            color: #2563eb;
          }
          
          .question-container {
            margin-bottom: 25px;
            page-break-inside: avoid;
            border-left: 3px solid #e5e7eb;
            padding-left: 15px;
            margin-left: 10px;
          }
          
          .question-header {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
          }
          
          .question-number {
            font-weight: bold;
            margin-right: 12px;
            min-width: 30px;
            flex-shrink: 0;
            color: #1f2937;
          }
          
          .question-content {
            flex: 1;
          }
          
          .question-text {
            font-weight: 500;
            margin-bottom: 12px;
            line-height: 1.5;
          }
          
          .options-container {
            margin-left: 15px;
            margin-top: 10px;
            margin-bottom: 15px;
          }
          
          .option-item {
            display: flex;
            margin-bottom: 8px;
            align-items: flex-start;
          }
          
          .option-letter {
            margin-right: 10px;
            font-weight: 500;
            min-width: 25px;
          }
          
          .option-text {
            flex: 1;
            line-height: 1.4;
          }
          
          .correct-option {
            background-color: #dcfce7;
            padding: 2px 6px;
            border-radius: 4px;
            border-left: 3px solid #16a34a;
          }
          
          .question-marks {
            font-size: 10pt;
            color: #dc2626;
            margin-top: 8px;
            font-style: italic;
            text-align: right;
          }
          
          .solution-container {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 6px;
            padding: 12px;
            margin-top: 15px;
            position: relative;
          }
          
          .solution-header {
            font-weight: bold;
            color: #0369a1;
            margin-bottom: 8px;
            border-bottom: 1px solid #bae6fd;
            padding-bottom: 4px;
          }
          
          .correct-answer {
            background: #dcfce7;
            padding: 8px;
            border-radius: 4px;
            margin-bottom: 10px;
            border-left: 4px solid #16a34a;
          }
          
          .solution-text {
            color: #374151;
            line-height: 1.5;
          }
          
          .footer {
            position: fixed;
            bottom: 1cm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9pt;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 5px;
          }
          
          @media print {
            body {
              background: white !important;
              -webkit-print-color-adjust: exact;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        ${showWatermark ? '<div class="watermark">ANSWER KEY</div>' : ""}
        
        <div class="paper-container">
          <!-- Header - only on first page -->
          <div class="header">
            <h1 class="paper-title">${paperTitle}</h1>
            <p class="paper-subtitle">Complete Solutions & Answer Key</p>
          </div>

          <!-- Questions Section -->
          <div class="questions-section">
            ${(() => {
              let html = "";
              let currentSubject = null;

              allQuestions.forEach((q, index) => {
                // Add subject heading when subject changes
                if (showSubjects && q.subject !== currentSubject) {
                  currentSubject = q.subject;
                  html += `<h3 class="subject-heading">${q.subject}</h3>`;
                }

                html += `
                  <div class="question-container">
                    <div class="question-header">
                      <div class="question-number">${q.number}.</div>
                      <div class="question-content">
                        <div class="question-text">${q.question_text}</div>
                        
                        ${
                          q.options
                            ? `
                          <div class="options-container">
                            ${Object.entries(q.options)
                              .map(
                                ([key, value]) => `
                              <div class="option-item ${
                                q.correctanswer &&
                                q.correctanswer.toLowerCase() ===
                                  key.toLowerCase()
                                  ? "correct-option"
                                  : ""
                              }">
                                <span class="option-letter">${key.toUpperCase()})</span>
                                <span class="option-text">${value}</span>
                              </div>
                            `
                              )
                              .join("")}
                          </div>
                        `
                            : ""
                        }
                        
                        ${
                          showMarks
                            ? `
                          <div class="question-marks">[${q.marks || 4} Mark${
                                (q.marks || 4) > 1 ? "s" : ""
                              }]</div>
                        `
                            : ""
                        }
                        
                        ${
                          showSolutions
                            ? `
                          <div class="solution-container">
                            <div class="solution-header">Solution & Answer</div>
                            ${
                              q.correctanswer
                                ? `
                              <div class="correct-answer">
                                <strong>Correct Answer:</strong> ${q.correctanswer.toUpperCase()}
                              </div>
                            `
                                : ""
                            }
                            ${
                              q.solution
                                ? `
                              <div class="solution-text">
                                <strong>Explanation:</strong><br>
                                ${q.solution}
                              </div>
                            `
                                : ""
                            }
                          </div>
                        `
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                `;
              });

              return html;
            })()}
          </div>
        </div>
        
        
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

const handleOMRSheet = () => {
  const printWindow = window.open("", "_blank");

  // Get all questions for OMR sheet
  const allQuestions = questions.map((q, index) => ({
    ...q,
    number: index + 1,
  }));

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
          line-height: 1.4;
          color: #000;
          background: white;
          margin: 0;
          padding: 0;
          font-size: 11pt;
        }
        
        .omr-container {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .omr-header {
          text-align: center;
          border: 2px solid #000;
          padding: 15px;
          margin-bottom: 20px;
        }
        
        .omr-title {
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        
        .omr-subtitle {
          font-size: 12pt;
          color: #333;
          margin-bottom: 10px;
        }
        
        .student-info {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 10pt;
        }
        
        .info-field {
          border-bottom: 1px solid #000;
          padding-bottom: 2px;
          min-width: 200px;
        }
        
        .instructions {
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 20px;
          font-size: 9pt;
        }
        
        .instructions h4 {
          margin: 0 0 5px 0;
          font-size: 10pt;
        }
        
        .questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .question-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          padding: 4px;
          border-bottom: 1px dotted #ccc;
        }
        
        .question-number {
          font-weight: bold;
          min-width: 35px;
          margin-right: 10px;
          font-size: 10pt;
        }
        
        .options-bubbles {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .bubble-option {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        
        .bubble {
          width: 16px;
          height: 16px;
          border: 2px solid #000;
          border-radius: 50%;
          display: inline-block;
          position: relative;
        }
        
        .bubble.filled {
          background-color: #000;
        }
        
        .option-label {
          font-weight: 500;
          font-size: 10pt;
        }
        
        .section-break {
          page-break-before: always;
        }
        
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="omr-container">
        <!-- Header -->
        <div class="omr-header">
          <h1 class="omr-title">OMR Answer Sheet</h1>
          <p class="omr-subtitle">${paperTitle}</p>
          <div class="student-info">
            <div>Name: <span class="info-field"></span></div>
            <div>Roll No: <span class="info-field"></span></div>
            <div>Date: <span class="info-field"></span></div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="instructions">
          <h4>Instructions:</h4>
          • Use only black or blue pen to fill the bubbles completely<br>
          • Fill only one bubble per question<br>
          • Make dark marks that fill the circle completely<br>
          • Do not make any stray marks on this sheet
        </div>

        <!-- Questions Grid -->
        <div class="questions-grid">
          ${(() => {
            let html = "";
            const questionsPerColumn = 25;

            for (
              let i = 0;
              i < allQuestions.length;
              i += questionsPerColumn
            ) {
              const columnQuestions = allQuestions.slice(
                i,
                i + questionsPerColumn
              );

              html += '<div class="question-column">';

              columnQuestions.forEach((q) => {
                // Get the correct answer text and find matching option key
                const correctAnswerText = q.correctanswer?.trim().toLowerCase();
                const options = q.options || {};
                
                // Find the correct option key by matching the value
                const correctOptionKey = Object.keys(options).find(
                  (key) => options[key]?.trim().toLowerCase() === correctAnswerText
                );

                html += `
                  <div class="question-row">
                    <span class="question-number">${q.number}.</span>
                    <div class="options-bubbles">
                      ${["0", "1", "2", "3"]
                        .map(
                          (option) => `
                        <div class="bubble-option">
                          <span class="option-label">${option}</span>
                          <div class="bubble ${
                            correctOptionKey === option ? "filled" : ""
                          }"></div>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `;
              });

              html += "</div>";
            }

            return html;
          })()}
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 9pt; color: #666;">
          --- End of Answer Sheet ---
        </div>
      </div>
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
                  <p className="text-lg text-gray-600 italic">
                    Complete Solutions & Answer Key
                  </p>
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
