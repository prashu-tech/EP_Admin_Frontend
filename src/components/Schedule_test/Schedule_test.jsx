"use client";
import Head from "next/head";
import { MdOutlineSchedule } from "react-icons/md";
import React from "react";
import { IoIosArrowBack } from "react-icons/io"; // Back arrow icon
import { FaEye } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import Table from "@/components/Schedule_test/Table"; // Import the Table component
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Schedule_test = () => {
  const router = useRouter(); // Initialize the router

  // Handler for form submission (for the SCHEDULE TEST button)
  const handleScheduleTestSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    // Optionally navigate after form submission
    router.push("/test-scheduled"); // Example route after scheduling
  };

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
        {/* Top Left Blue Button (Back Arrow) */}
        <div className="absolute top-4 left-4 z-50 hidden md:block">
          <button
            onClick={() => router.push("/dashboard")} // Navigate to dashboard
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-lg flex items-center justify-center"
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
              <button
                onClick={() => router.push("/generate-test")} // Navigate to generate test page
                className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 border border-gray-300 rounded-lg text-gray-400 text-sm py-3 px-6 font-['Segoe_UI']"
              >
                Generate Test
              </button>
            </div>
          </div>
          {/* Main Options with React Icons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 my-4">
            <button
              onClick={() => router.push("./test_preview")} // Navigate to test preview page
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaEye size={20} /> Test Preview
            </button>
            <button
              onClick={() => router.push("./office_mode")} // Navigate to offline mode page
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaQuestionCircle size={20} /> Offline Mode
            </button>
            <button
              onClick={() => router.push("/schedule_test")} // Navigate to schedule test page (already here, can be optional)
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2"
            >
              <MdOutlineSchedule size={20} /> Schedule Test
            </button>
          </div>

          <div className="flex flex-col mt-10 items-center">
            {/* Main Container */}
            <div className="bg-white p-6 rounded-md filter drop-shadow-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] w-full max-w-4xl">
              <h2 className="text-lg -mt-3 font-semibold">
                Schedule test for Batch
              </h2>
              {/* Border below the title */}
              <div className="-mx-6 w-192 border border-gray-300 mb-3"></div>

              {/* Total Marks and Question Count */}
              <div className="flex space-x-4 mb-4">
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 text-sm text-white px-1 py-1 rounded-sm"
                >
                  Total Question:16
                </button>
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 -mx-3 text-sm text-white px-1 py-1 rounded-sm"
                >
                  Question Count:4
                </button>
              </div>

              {/* First Row: Test Name (split into two) and Scheduled at */}
              <div className="grid grid-cols-3 gap-6">
                {/* Test Name */}
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">
                    Test Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                {/* Test Name Part 2 (Without Label but Aligned) */}
                <div className="flex flex-col">
                  <span className="invisible text-sm font-medium text-gray-700">
                    Hidden
                  </span>
                  <input
                    type="text"
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                {/* Scheduled At */}
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">
                    Scheduled at:
                  </label>
                  <input
                    type="date"
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm text-gray-500"
                    placeholder="Pick a date"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>
              </div>

              {/* Second Row: Ends at, Show Test Results Instantly, Select Batch */}
              <div className="grid grid-cols-3 gap-6 mt-4">
                {/* Ends At */}
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">
                    Ends at:
                  </label>
                  <input
                    type="date"
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm text-gray-500"
                    placeholder="Pick a date"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                {/* Show Test Results Instantly */}
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">
                    Show Test Results Instantly:
                  </label>
                  <input
                    type="text"
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                {/* Select Batch */}
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">
                    Select Batch:
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full -mx-3 p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Test Button - Centered */}
            <button
              onClick={handleScheduleTestSubmit} // Handle form submission
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              SCHEDULE TEST
            </button>

            {/* Add the Table Component Here */}
            <div className="mt-8 w-full max-w-4xl">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule_test;