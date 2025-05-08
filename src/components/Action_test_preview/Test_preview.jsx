"use client";
import Head from "next/head";
import { FaEye, FaQuestionCircle, FaClock, FaQuestion, FaTrophy } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../Loading/Loading";

const TestPreview = () => {
  const router = useRouter();
  const [testData, setTestData] = useState(null);
  const [subjectTopics, setSubjectTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testid = localStorage.getItem("testid");

    if (!testid) {
      setError("No test ID found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchTestData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-data-by-id`,
          { testid }
        );
        setTestData(response.data.test);

        // Process question_ids to get subject-wise topic distribution
        if (response.data.test.question_ids) {
          try {
            const questionData = JSON.parse(response.data.test.question_ids);
            
            // Group by subject and topic
            const subjectsMap = new Map();
            
            questionData.forEach(item => {
              if (!subjectsMap.has(item.subject)) {
                subjectsMap.set(item.subject, {
                  subject: item.subject,
                  topics: []
                });
              }
              
              const subjectEntry = subjectsMap.get(item.subject);
              subjectEntry.topics.push({
                topic: item.topic,
                questionCount: item.ids.length
              });
            });

            setSubjectTopics(Array.from(subjectsMap.values()));
          } catch (parseError) {
            console.error("Error parsing question_ids:", parseError);
            setError("Failed to parse question distribution data.");
          }
        }
      } catch (err) {
        console.error("Error fetching test data:", err.response ? err.response.data : err);
        setError("Failed to fetch test data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#007AFF] top-[50%] left-[50%]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta name="description" content="Generate and manage tests in office mode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative">
        {/* Top Left Blue Button */}
        <div className="bg-[#007AFF] top-4 left-4 z-50">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => router.back()}
          >
            <IoIosArrowBack size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl">
          {/* Header Section */}
          <div className="flex justify-center mb-4">
            <div className="flex justify-center hidden md:block mb-4 pt-0">
              <button className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 border border-gray-300 rounded-lg text-gray-400 text-sm py-3 px-6 font-['Segoe_UI'] cursor-pointer">
                Generate Test
              </button>
            </div>
          </div>

          {/* Main Options with React Icons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 my-4">
            <button
              onClick={() => router.push("./test_preview")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaEye size={20} /> Test Preview
            </button>
            <button
              onClick={() => router.push("./offline_mode")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 cursor-pointer"
            >
              <FaQuestionCircle size={20} /> Offline Mode
            </button>
            <button
              onClick={() => router.push("./schedule_test")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 cursor-pointer"
            >
              <MdOutlineSchedule size={20} /> Schedule Test
            </button>
          </div>

          {/* Test Details Heading */}
          <div className="flex justify-center mb-4 pt-6">
            <h2 className="text-xl hidden md:block font-semibold">
              Test Details
            </h2>
          </div>

          <div className="space-y-4">
            {/* Test Details Section */}
            <div className="rounded-lg w-full hidden md:block mx-auto overflow-hidden">
              <div className="flex flex-col gap-3 p-2">
                {/* Row 1: Test ID and Test Name */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4 font-semibold border-r border-black">
                      Test_id
                    </div>
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4">
                      {testData.id}
                    </div>
                  </div>
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4 font-semibold border-r border-black"
                    >
                      Test_Name
                    </div>
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4"
                    >
                      {testData.testname}
                    </div>
                  </div>
                </div>

                {/* Row 2: Batch Name and Created At */}
                <div className="flex flex-col md:flex-row gap-3 max-h-[50px]">
                  <div className="flex-1 flex rounded-md border-1 overflow-hidden text-[13px]">
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4 font-semibold border-r border-black">
                      Batch Name
                    </div>
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4">
                      {testData.batch_name}
                    </div>
                  </div>
                  <div className="flex-1 flex rounded-md overflow-hidden text-[13px]">
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4 font-semibold border-r border-black"
                    >
                      Created at
                    </div>
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4"
                    >
                      {testData.exam_start_date}
                    </div>
                  </div>
                </div>

                {/* Row 3: Marks and Difficulty */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4 font-semibold border-r border-black">
                      Marks
                    </div>
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4">
                      {testData.marks}
                    </div>
                  </div>
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4 font-semibold border-r border-black"
                    >
                      Difficulty
                    </div>
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4"
                    >
                      {testData.difficulty}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="relative mt-6">
              <h2 className="text-xl font-semibold w-full justify-center text-center">
                Preview
              </h2>
              {/* Preview Box */}
              <div className="bg-[#007AFF] top-0 right-1 bg-white p-4 rounded-xl drop-shadow-md flex space-x-4">
                {/* Timer */}
                <div className="flex flex-col justify-between items-center">
                  <Image src="/timer.png" alt="Time" width={30} height={30} />
                  <span className="text-black pt-2 text-center text-lg">
                    {testData.duration} mins 
                  </span>
                </div>

                {/* Questions */}
                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src="/question.png"
                    alt="Questions"
                    width={30}
                    height={30}
                  />
                  <span className="text-black pt-2 text-center text-lg">
                    {testData.no_of_questions} Qts
                  </span>
                </div>

                {/* Marks */}
                <div className="flex flex-col gap-1 items-center">
                  <Image src="/medal.png" alt="Marks" width={30} height={30} />
                  <span className="text-black pt-2 text-center text-lg">
                    {testData.marks} mks
                  </span>
                </div>
              </div>
            </div>

            {/* Subjects and Topics Section */}
            <div className="grid grid-cols-2 gap-3 space-y-6 mt-25">
              {subjectTopics.map((subjectData, index) => (
                <div key={index} className="bg-[#E1CFFF] w-fit space-y-3 px-6 py-3 rounded-[5px_5px_0_0] shadow-sm">
                  <div className="flex space-x-3">
                    <Image src="/Logo.png" alt="Subject" width={60} height={40} />
                    <div className="flex flex-col gap-2">
                      <h1 className="text-xl font-bold">{subjectData.subject}</h1>
                      <div className="flex gap-2">
                        <p className="bg-[#007AFF80] px-2 py-1 rounded-lg text-white text-[10px]">
                          Total Questions: {subjectData.topics.reduce((sum, topic) => sum + topic.questionCount, 0)}
                        </p>
                        <p className="bg-[#007AFF80] px-2 py-1 rounded-lg text-white text-[10px]">
                          Total Marks: {subjectData.topics.reduce((sum, topic) => sum + (topic.questionCount)*4, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-sm shadow-sm">
                    <h1 className="px-6 py-2 font-semibold text-xl">
                      Selected Chapters
                    </h1>

                    <div className="w-full pb-6 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-center border-b border-gray-300">Sr.No</th>
                            <th className="py-2 px-4 text-center border-b border-gray-300">Topic Name</th>
                            <th className="py-2 px-4 text-center border-b border-gray-300">Questions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjectData.topics.map((topic, topicIndex) => (
                            <tr key={topicIndex} className="border-b text-sm text-center border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-4">{topicIndex + 1}</td>
                              <td className="py-3 px-4">{topic.topic}</td>
                              <td className="py-3 px-4">{topic.questionCount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPreview;