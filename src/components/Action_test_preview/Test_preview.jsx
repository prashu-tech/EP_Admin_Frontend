"use client";
import Head from "next/head";
import {
  FaEye,
  FaQuestionCircle,
  FaClock,
  FaQuestion,
  FaTrophy,
} from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import Image from "next/image";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const TestPreview = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta
          name="description"
          content="Generate and manage tests in office mode"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative">
        {/* Top Left Blue Button */}
        <div className="absolute top-4 left-4 z-50">
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
                      2232
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
                      Mock Test 1
                    </div>
                  </div>
                </div>

                {/* Row 2: No. of Questions and Created At */}
                <div className="flex flex-col md:flex-row gap-3 max-h-[50px]">
                  <div className="flex-1 flex rounded-md border-1 overflow-hidden text-[13px]">
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4 font-semibold border-r border-black">
                      No. of Questions
                    </div>
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4">
                      50
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
                      Mon, Jan 20, 2025 1:38 PM
                    </div>
                  </div>
                </div>

                {/* Row 3: Marks and No. of Questions */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4 font-semibold border-r border-black">
                      Marks
                    </div>
                    <div className="w-1/2 bg-blue-500 text-white py-2 px-4">
                      50
                    </div>
                  </div>
                  <div className="flex-1 flex rounded-md overflow-hidden">
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4 font-semibold border-r border-black"
                    >
                      No. of Questions
                    </div>
                    <div
                      style={{ backgroundColor: "#FFBB38" }}
                      className="w-1/2 text-white py-2 px-4"
                    >
                      50
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
              <div className="absolute top-0 right-1 bg-white p-4 rounded-xl drop-shadow-md flex space-x-4">
                {/* Timer */}
                <div className="flex flex-col justify-between items-center">
                  <Image src="/timer.png" alt="Time" width={30} height={30} />
                  <span className="text-black pt-2 text-center text-lg">
                    50 mins
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
                    30 Qts
                  </span>
                </div>

                {/* Marks */}
                <div className="flex flex-col gap-1 items-center">
                  <Image src="/medal.png" alt="Marks" width={30} height={30} />
                  <span className="text-black pt-2 text-center text-lg">
                    120 mks
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 rounded-tl-2xl rounded-tr-2xl mt-24">
              {/* Physics Section */}
              <div
                style={{ backgroundColor: "#B1CEFB" }}
                className="p-4 rounded-lg shadow-lg w-full"
              >
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/react.png"
                      alt="Physics Icon"
                      className="w-15 h-15"
                    />
                  </div>
                  <div className="flex flex-col space-x-2 mt-2">
                    <h3 className="font-semibold text-lg text-black">
                      Physics
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        style={{ backgroundColor: "#007AFF80" }}
                        className="text-white w-fit text-[10px] font-medium px-3 py-1 rounded-md hover:bg-[#007AFF] transition cursor-pointer"
                      >
                        Total Questions: 11
                      </button>
                      <button
                        style={{ backgroundColor: "#007AFF80" }}
                        className="text-white w-fit text-[10px] font-medium px-3 py-1 rounded-md hover:bg-[#007AFF] transition cursor-pointer"
                      >
                        Total Marks: 44
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg mt-3 shadow">
                  <h4 className="text-xl px-6 pt-5 font-semibold mb-4">
                    Selected Chapters
                  </h4>
                  <table className="w-full text-center font-[500] border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-gray-300 border-b text-center">
                        <th className="p-2 rounded-tl-lg font-[500]">Sr.No</th>
                        <th className="p-2 font-[500]">Chapter Name</th>
                        <th className="p-2 font-[500] rounded-tr-lg">
                          Question
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 font-[500] py-2">1</td>
                        <td className="px-2 font-[500] py-2">Gravitation</td>
                        <td className="px-2 font-[500] py-2">3</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">2</td>
                        <td className="px-2 py-2">Semiconductor</td>
                        <td className="px-2 py-2">2</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">3</td>
                        <td className="px-2 py-2">Rational Dynamic</td>
                        <td className="px-2 py-2">6</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">4</td>
                        <td className="px-2 py-2">Gravitation</td>
                        <td className="px-2 py-2">3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chemistry Section */}
              <div
                style={{ backgroundColor: "#B1CEFB" }}
                className="p-4 rounded-lg shadow-lg w-full"
              >
                <div className="flex space-x-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/chemistry.png"
                      alt="Chemistry Icon"
                      className="w-15 h-15"
                    />
                  </div>
                  <div className="flex flex-col space-x-2 mt-2">
                    <h3 className="font-semibold text-lg text-black">
                      Chemistry
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        style={{ backgroundColor: "#007AFF80" }}
                        className="text-white w-fit text-[10px] font-medium px-3 py-1 rounded-md hover:bg-[#007AFF] transition cursor-pointer"
                      >
                        Total Questions: 11
                      </button>
                      <button
                        style={{ backgroundColor: "#007AFF80" }}
                        className="text-white w-fit text-[10px] font-medium px-3 py-1 rounded-md hover:bg-[#007AFF] transition cursor-pointer"
                      >
                        Total Marks: 44
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg mt-3 shadow">
                  <h4 className="text-xl px-6 pt-5 font-semibold mb-4">
                    Selected Chapters
                  </h4>
                  <table className="w-full text-center font-[500] border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-gray-300 border-b text-center">
                        <th className="p-2 rounded-tl-lg font-[500]">Sr.No</th>
                        <th className="p-2 font-[500]">Chapter Name</th>
                        <th className="p-2 font-[500] rounded-tr-lg">
                          Question
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 font-[500] py-2">1</td>
                        <td className="px-2 font-[500] py-2">Solutions</td>
                        <td className="px-2 font-[500] py-2">3</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">2</td>
                        <td className="px-2 py-2">Electrochemistry</td>
                        <td className="px-2 py-2">3</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">3</td>
                        <td className="px-2 py-2">Chemical Kinetics</td>
                        <td className="px-2 py-2">5</td>
                      </tr>
                      <tr className="border-gray-300 border-b text-center">
                        <td className="px-2 py-2">4</td>
                        <td className="px-2 py-2">Chemical Kinetics</td>
                        <td className="px-2 py-2">5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPreview;