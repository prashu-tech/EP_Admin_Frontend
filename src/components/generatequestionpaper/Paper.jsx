"use client";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaPrint, FaCheck } from "react-icons/fa";
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
    // Scroll to the preview
    setTimeout(() => {
      document.getElementById("previewSection")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Get the preview content HTML
    const contentToPrint = printContentRef.current.innerHTML;
    
    // Create a complete HTML document with proper CSS
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.title || "Question Paper"}</title>
        <style>
          @page {
            size: A4;
            margin: 1.5cm;
          }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: black;
            background: white;
            margin: 0;
            padding: 0;
          }
          .paper-page {
            padding: 0;
            max-width: 100%;
            margin: 0 auto;
            page-break-after: always;
          }
          .paper-page:last-child {
            page-break-after: auto;
          }
          .header {
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .paper-title {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .paper-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 11pt;
          }
          .instructions {
            border: 1px solid #ddd;
            background-color: #f9f9f9;
            padding: 10px;
            margin-top: 10px;
            font-size: 11pt;
          }
          .subject-heading {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
          }
          .question-container {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .question-number {
            font-weight: bold;
            margin-right: 10px;
            display: inline-block;
            min-width: 25px;
            vertical-align: top;
          }
          .question-content {
            display: inline-block;
            width: calc(100% - 40px);
            vertical-align: top;
          }
          .question-text {
            font-weight: 500;
            margin-bottom: 8px;
          }
          .options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-left: 20px;
            margin-top: 10px;
          }
          .option-item {
            display: flex;
          }
          .option-letter {
            margin-right: 8px;
            font-weight: 500;
          }
          .question-marks {
            text-align: right;
            font-size: 10pt;
            color: #555;
            margin-top: 5px;
          }
          .page-number {
            text-align: center;
            font-size: 10pt;
            color: #777;
            margin-top: 30px;
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
          }
          @media print {
            body {
              background: white;
            }
            .paper-page {
              box-shadow: none;
              border: none;
            }
          }
        </style>
      </head>
      <body>
        ${contentToPrint}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Print after everything has loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // A more intelligent pagination algorithm that accounts for actual content
  const paginateQuestions = () => {
    const pages = [];
    let currentPage = [];
    let currentSubject = null;
    let questionCounter = 1;
    
    // Process each subject's questions
    Object.entries(questionsBySubject).forEach(([subject, questions]) => {
      // Check if we need a new page for a new subject
      if (currentPage.length > 0 && 
         (currentPage.length >= 5 || currentSubject !== subject)) {
        pages.push({
          questions: currentPage,
          startNumber: questionCounter - currentPage.length
        });
        currentPage = [];
      }
      
      currentSubject = subject;
      
      // Process each question in this subject
      questions.forEach((q) => {
        // If page has 5 questions or more, start a new page
        if (currentPage.length >= 5) {
          pages.push({
            questions: currentPage,
            startNumber: questionCounter - currentPage.length
          });
          currentPage = [];
        }
        
        // Add the question to the current page
        currentPage.push({
          ...q,
          subject,
          number: questionCounter++
        });
      });
    });
    
    // Add the last page if there are any questions left
    if (currentPage.length > 0) {
      pages.push({
        questions: currentPage,
        startNumber: questionCounter - currentPage.length
      });
    }
    
    return pages;
  };

  const pages = paginateQuestions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content - shifted right to avoid sidebar overlap */}
      <div className="container mx-auto py-8 px-4 ml-16 md:ml-20 lg:ml-24">
        <div className="flex justify-between items-center mb-6">
          <Link href="/offline_mode">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow flex items-center justify-center transition-colors">
              <IoIosArrowBack size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-center text-gray-800">Question Paper Generator</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        {/* Input Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 text-xl text-gray-800 border-b pb-2">Paper Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title</label>
              <input
                type="text"
                name="title"
                placeholder="E.g., Mid-Term Mathematics Test"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                value={formData.title}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="text"
                name="duration"
                placeholder="E.g., 90"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                value={formData.duration}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
              <input
                type="text"
                name="marks"
                placeholder="E.g., 100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                value={formData.marks}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                onChange={handleChange}
                value={formData.date}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <textarea
                name="instruction"
                placeholder="Instructions for candidates..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
                onChange={handleChange}
                value={formData.instruction}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <select
                name="batch"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700"
                onChange={handleChange}
                value={formData.batch}
              >
                <option value="">Select Batch</option>
                <option value="Batch 1">Batch 1</option>
                <option value="Batch 2">Batch 2</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 text-lg rounded-lg transition-colors flex items-center gap-2"
              onClick={handleProceed}
            >
              <FaCheck /> Generate Preview
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 text-lg rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {isPreviewReady && (
          <div id="previewSection" className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Paper Preview</h2>
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaPrint /> Print Paper
              </button>
            </div>

            {/* Print Preview - This div contains what will be printed */}
            <div ref={printContentRef} className="print-content">
              {pages.map((page, pageIndex) => (
                <div 
                  key={pageIndex}
                  className="paper-page bg-white mx-auto my-8 p-8 shadow-lg rounded-lg print:shadow-none print:my-0 print:rounded-none max-w-4xl"
                >
                  {/* Header */}
                  <div className="header">
                    <h1 className="paper-title">{formData.title || "Question Paper"}</h1>
                    
                    <div className="paper-info">
                      <div>
                        <p><strong>Duration:</strong> {formData.duration} minutes</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p><strong>Total Marks:</strong> {formData.marks}</p>
                        <p><strong>Batch:</strong> {formData.batch}</p>
                      </div>
                    </div>
                    
                    {formData.instruction && (
                      <div className="instructions">
                        <p className="font-semibold">Instructions:</p>
                        <p>{formData.instruction}</p>
                      </div>
                    )}
                  </div>

                  {/* Questions Section */}
                  <div className="questions-container">
                    {page.questions.map((q, qIndex) => {
                      const questionNumber = page.startNumber + qIndex;
                      let currentSubject = q.subject;
                      const showSubjectHeading = qIndex === 0 || 
                                               page.questions[qIndex - 1].subject !== currentSubject;
                      
                      return (
                        <div key={qIndex} className="question-container">
                          {showSubjectHeading && (
                            <h3 className="subject-heading">
                              {q.subject}
                            </h3>
                          )}
                          
                          <div className="question">
                            <span className="question-number">{questionNumber}.</span>
                            <div className="question-content">
                              <div className="question-text">{q.question}</div>
                              
                              {q.options && q.options.length > 0 && (
                                <div className="options-grid">
                                  {q.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="option-item">
                                      <span className="option-letter">{String.fromCharCode(65 + optIndex)})</span>
                                      <span>{opt}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="question-marks">
                                [{q.marks} Marks]
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Page Number */}
                  <div className="page-number">
                    Page {pageIndex + 1} of {pages.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}