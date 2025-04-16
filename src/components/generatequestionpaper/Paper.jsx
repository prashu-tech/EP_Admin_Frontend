"use client";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";

export default function Paper() {
  const [formData, setFormData] = useState({
    duration: "",
    marks: "",
    date: "",
    instruction: "",
    batch: "",
  });

  const [questionsBySubject, setQuestionsBySubject] = useState({});

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
          });
        });

        setQuestionsBySubject(grouped);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const PAGE_HEIGHT = 1000;
  const QUESTION_HEIGHT = 140;

  const paginateQuestions = () => {
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    Object.entries(questionsBySubject).forEach(([subject, questions]) => {
      questions.forEach((q, index) => {
        const block = { subject, ...q, index: index + 1 };
        if (currentHeight + QUESTION_HEIGHT > PAGE_HEIGHT) {
          pages.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
        currentPage.push(block);
        currentHeight += QUESTION_HEIGHT;
      });
    });

    if (currentPage.length > 0) pages.push(currentPage);
    return pages;
  };

  const pages = paginateQuestions();

  return (
    <div className="overflow-hidden">
      {/* Top Controls */}
      <div className="flex px-6 w-full relative mt-10">
        <div className="relative left-94">
          <div className="top-4 hidden md:block">
            <Link href="/offline_mode">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow flex items-center justify-center">
                <IoIosArrowBack size={15} />
              </button>
            </Link>
          </div>
        </div>

        <div className="ml-180 hidden md:block">
          <button className="px-10 py-5 text-gray-400 font-light border border-gray-100 rounded-lg hover:bg-gray-100 shadow-md text-sm md:text-base">
            Generate Test
          </button>
        </div>
      </div>

      {/* Input Form Section */}
      <div className="bg-white p-6 rounded-lg w-full md:w-2/3 md:ml-100 mt-12 ml-4 max-w-[calc(100%-2rem)] shadow-sm shadow-gray-500">
        <h2 className="font-bold mb-4 text-xl">Details to Generate Test</h2>
        <div className="space-y-6">
          <input
            type="text"
            name="duration"
            placeholder="Question Paper Duration"
            className="w-full p-2 border border-gray-500 rounded text-xl"
            onChange={handleChange}
          />
          <input
            type="text"
            name="marks"
            placeholder="Question Paper Marks"
            className="w-full p-2 border border-gray-500 rounded text-xl"
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="w-full p-2 border border-gray-500 rounded text-xl text-gray-500 font-medium"
            onChange={handleChange}
          />
          <input
            type="text"
            name="instruction"
            placeholder="Instruction for candidate"
            className="w-full p-2 border border-gray-500 rounded text-xl"
            onChange={handleChange}
          />
          <p className="mt-5 text-gray-500 text-medium font-semibold text-xl">
            Candidate Detail Field
          </p>
          <select
            name="batch"
            className="w-full p-2 border border-gray-500 rounded text-xl text-gray-500 font-medium"
            onChange={handleChange}
          >
            <option value="">Batch No</option>
            <option value="Batch 1">Batch 1</option>
            <option value="Batch 2">Batch 2</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center md:ml-60 gap-6 mt-6 print:hidden">
        <button className="bg-[#007AFF] text-white px-20 py-2 text-lg rounded">
          Proceed
        </button>
        <button className="bg-[#F93535] text-white px-20 py-2 text-lg rounded">
          Close
        </button>
      </div>

      {/* Paginated Print View */}
      {pages.map((page, pageIndex) => {
        let lastSubject = null;

        return (
          <div
            key={pageIndex}
            className="relative w-[850px] h-[1200px] bg-white mx-auto my-10 p-10 shadow print:break-after-page"
          >
            <img
              src="/sample-question-paper.png"
              alt="Sample Background"
              className="absolute top-0 left-0 w-full h-full z-0"
            />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <p>Duration: {formData.duration}</p>
                <p>Marks: {formData.marks}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <p>Date: {formData.date}</p>
                <p>Batch: {formData.batch}</p>
              </div>
              {formData.instruction && (
                <p className="text-base font-medium">
                  Instruction: {formData.instruction}
                </p>
              )}

              {page.map((q, i) => {
                const showSubjectHeading = q.subject !== lastSubject;
                lastSubject = q.subject;

                return (
                  <div key={i} className="mt-4">
                    {showSubjectHeading && (
                      <h3 className="text-[17px] font-bold underline mb-2">
                        {q.subject}
                      </h3>
                    )}
                    <p className="font-semibold text-base">
                      Q{q.index}. {q.question}
                    </p>
                    <ul className="list-disc ml-6">
                      {q.options.map((opt, optIdx) => (
                        <li key={optIdx} className="text-sm">
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Print Button */}
      <div className="text-center print:hidden my-10">
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg"
          onClick={() => window.print()}
        >
          Print Question Paper
        </button>
      </div>
    </div>
  );
}
