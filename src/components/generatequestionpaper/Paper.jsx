"use client";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaPrint, FaCheck, FaEye } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

export default function Paper() {
  const [formData, setFormData] = useState({
    duration: "",
    marks: "",
    date: "",
    instruction: "",
    batch: "",
    title: "Question Paper",
  });

  const [questionsBySubject, setQuestionsBySubject] = useState({});
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const printContentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const testid = localStorage.getItem("testid");
      if (!testid) return;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/get-questions`,
          { testid }
        );

        const data = response.data.data;

        const grouped = {};
        data.forEach((q) => {
          if (!grouped[q.subject]) grouped[q.subject] = [];
          grouped[q.subject].push({
            question: q.question_text,
            options: q.options || [],
            marks: q.marks || 4,
          });
        });

        setQuestionsBySubject(grouped);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleProceed = () => {
    setIsPreviewReady(true);
    setTimeout(() => {
      document.getElementById("previewSection")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Get all questions in a continuous format
    const allQuestions = [];
    let questionCounter = 1;
    
    Object.entries(questionsBySubject).forEach(([subject, questions]) => {
      questions.forEach((q) => {
        allQuestions.push({
          ...q,
          subject,
          number: questionCounter++
        });
      });
    });
    
    // Create print content with continuous questions
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.title || "Question Paper"}</title>
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
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 25px;
            page-break-after: avoid;
          }
          
          .paper-title {
            font-size: 20pt;
            font-weight: bold;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .paper-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 15px;
            text-align: left;
          }
          
          .info-left, .info-right {
            font-size: 11pt;
          }
          
          .info-right {
            text-align: right;
          }
          
          .info-item {
            margin-bottom: 5px;
          }
          
          .instructions {
            border: 1px solid #333;
            background-color: #f8f8f8;
            padding: 15px;
            margin-top: 15px;
            font-size: 11pt;
            text-align: left;
            border-radius: 3px;
          }
          
          .instructions-title {
            font-weight: bold;
            margin-bottom: 8px;
            text-decoration: underline;
          }
          
          .questions-section {
            margin-top: 25px;
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
          }
          
          .question-container {
            margin-bottom: 20px;
            page-break-inside: avoid;
            display: flex;
            align-items: flex-start;
          }
          
          .question-number {
            font-weight: bold;
            margin-right: 12px;
            min-width: 30px;
            flex-shrink: 0;
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
          }
          
          .option-item {
            display: flex;
            margin-bottom: 6px;
            align-items: flex-start;
          }
          
          .option-letter {
            margin-right: 10px;
            font-weight: 500;
            min-width: 20px;
          }
          
          .option-text {
            flex: 1;
            line-height: 1.4;
          }
          
          .question-marks {
            text-align: right;
            font-size: 10pt;
            color: #555;
            margin-top: 8px;
            font-style: italic;
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
        <div class="paper-container">
          <!-- Header - only on first page -->
          <div class="header">
            <h1 class="paper-title">${formData.title || "Question Paper"}</h1>
            
            <div class="paper-info-grid">
              <div class="info-left">
                <div class="info-item"><strong>Duration:</strong> ${formData.duration} minutes</div>
                <div class="info-item"><strong>Date:</strong> ${formData.date || 'Not specified'}</div>
              </div>
              <div class="info-right">
                <div class="info-item"><strong>Total Marks:</strong> ${formData.marks}</div>
                <div class="info-item"><strong>Batch:</strong> ${formData.batch || 'Not specified'}</div>
              </div>
            </div>
            
            ${formData.instruction ? `
              <div class="instructions">
                <div class="instructions-title">Instructions:</div>
                <div>${formData.instruction}</div>
              </div>
            ` : ''}
          </div>

          <!-- Questions Section -->
          <div class="questions-section">
            ${(() => {
              let html = '';
              let currentSubject = null;
              
              allQuestions.forEach((q, index) => {
                // Add subject heading when subject changes
                if (q.subject !== currentSubject) {
                  currentSubject = q.subject;
                  html += `<h3 class="subject-heading">${q.subject}</h3>`;
                }
                
                html += `
                  <div class="question-container">
                    <div class="question-number">${q.number}.</div>
                    <div class="question-content">
                      <div class="question-text">${q.question}</div>
                      
                      ${q.options && q.options.length > 0 ? `
                        <div class="options-container">
                          ${q.options.map((opt, optIndex) => `
                            <div class="option-item">
                              <span class="option-letter">${String.fromCharCode(65 + optIndex)})</span>
                              <span class="option-text">${opt}</span>
                            </div>
                          `).join('')}
                        </div>
                      ` : ''}
                      
                      <div class="question-marks">[${q.marks} Mark${q.marks > 1 ? 's' : ''}]</div>
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

  // Get all questions for preview
  const getAllQuestions = () => {
    const allQuestions = [];
    let questionCounter = 1;
    
    Object.entries(questionsBySubject).forEach(([subject, questions]) => {
      questions.forEach((q) => {
        allQuestions.push({
          ...q,
          subject,
          number: questionCounter++
        });
      });
    });
    
    return allQuestions;
  };

  const allQuestions = getAllQuestions();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 px-4 ml-16 md:ml-20 lg:ml-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/offline_mode">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl transform hover:scale-105">
              <IoIosArrowBack size={20} />
            </button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Question Paper Generator</h1>
            <p className="text-gray-600">Create professional question papers with ease</p>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Input Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 max-w-4xl mx-auto border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
            <h2 className="font-bold text-2xl text-gray-800">Paper Configuration</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Paper Title</label>
              <input
                type="text"
                name="title"
                placeholder="E.g., Mid-Term Mathematics Examination"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                placeholder="E.g., 90"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                value={formData.duration}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Total Marks</label>
              <input
                type="number"
                name="marks"
                placeholder="E.g., 100"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                value={formData.marks}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Test Date</label>
              <input
                type="date"
                name="date"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                value={formData.date}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Batch</label>
              <select
                name="batch"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                value={formData.batch}
              >
                <option value="">Select Batch</option>
                <option value="Batch A">Batch A</option>
                <option value="Batch B">Batch B</option>
                <option value="Batch C">Batch C</option>
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Instructions for Candidates</label>
              <textarea
                name="instruction"
                placeholder="Enter detailed instructions for the candidates taking this examination..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px] bg-gray-50 focus:bg-white resize-none"
                onChange={handleChange}
                value={formData.instruction}
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={handleProceed}
            >
              <FaEye /> Generate Preview
            </button>
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Reset Form
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {isPreviewReady && (
          <div id="previewSection" className="mb-10">
            <div className="flex max-w-4xl mx-auto justify-between items-center mb-6 bg-white p-6 rounded-2xl shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Paper Preview</h2>
                <p className="text-gray-600 mt-1">Review your question paper before printing</p>
              </div>
              <button
                onClick={handlePrint}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <FaPrint /> Print Paper
              </button>
            </div>

            {/* Preview Content */}
            <div ref={printContentRef} className="print-content">
              <div className="bg-white mx-auto p-10 shadow-xl rounded-2xl max-w-4xl border border-gray-200">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                  <h1 className="text-3xl font-bold mb-4 uppercase tracking-wide">{formData.title || "Question Paper"}</h1>
                  
                  <div className="grid grid-cols-2 gap-8 text-left text-sm">
                    <div className="space-y-2">
                      <p><strong>Duration:</strong> {formData.duration} minutes</p>
                      <p><strong>Date:</strong> {formData.date || 'Not specified'}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p><strong>Total Marks:</strong> {formData.marks}</p>
                      <p><strong>Batch:</strong> {formData.batch || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  {formData.instruction && (
                    <div className="border border-gray-300 bg-gray-50 p-4 mt-4 rounded-lg text-left">
                      <p className="font-semibold mb-2 underline">Instructions:</p>
                      <p className="text-sm leading-relaxed">{formData.instruction}</p>
                    </div>
                  )}
                </div>

                {/* Questions */}
                <div className="questions-container">
                  {(() => {
                    let currentSubject = null;
                    return allQuestions.map((q, index) => (
                      <div key={index}>
                        {q.subject !== currentSubject && (() => {
                          currentSubject = q.subject;
                          return (
                            <h3 className="text-lg font-bold text-center uppercase border-b border-gray-600 pb-2 mb-4 mt-6">
                              {q.subject}
                            </h3>
                          );
                        })()}
                        
                        <div className="flex mb-6 items-start">
                          <span className="font-bold mr-3 mt-1 min-w-[30px]">{q.number}.</span>
                          <div className="flex-1">
                            <div className="font-medium mb-3 leading-relaxed">{q.question}</div>
                            
                            {q.options && q.options.length > 0 && (
                              <div className="ml-4 space-y-2">
                                {q.options.map((opt, optIndex) => (
                                  <div key={optIndex} className="flex items-start">
                                    <span className="font-medium mr-3 min-w-[20px]">{String.fromCharCode(65 + optIndex)})</span>
                                    <span className="leading-relaxed">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="text-right text-sm text-gray-600 mt-2 italic">
                              [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                            </div>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                
                {/* <div className="text-center mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600">
                  --- End of Question Paper ---
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}