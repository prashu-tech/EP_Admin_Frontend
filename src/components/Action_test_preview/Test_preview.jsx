import Head from "next/head";
import React from "react";
import { MdOutlineSchedule } from "react-icons/md";
import { CiPen } from "react-icons/ci";
import { LuBookCheck } from "react-icons/lu";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaEye, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const MobileOfficeMode = () => {
  const router = useRouter(); 

  return (
    <div className="relative min-h-screen bg-white">
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta
          name="description"
          content="Generate and manage tests in office mode"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center px-4 pt-8 pb-4">
        {/* Test Questions Heading */}
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold text-center text-gray-900">
            Test Questions
          </h2>
        </div>

        {/* Main Options with React Icons */}
        <div className="flex flex-col w-full space-y-3 my-4">
          <button
            onClick={() => router.push("/test_preview")} // Navigate to test preview page
            style={{ backgroundColor: "#FFBB38" }}
            className="text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
          >
            <FaEye size={18} /> Test Preview
          </button>
          <button
            onClick={() => router.push("/office_mode")} // Navigate to offline mode page
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <FaQuestionCircle size={18} /> Offline Mode
          </button>
          <button
            onClick={() => router.push("./schedule_test")} // Navigate to schedule test page
            style={{ backgroundColor: "#FFBB38" }}
            className="text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
          >
            <MdOutlineSchedule size={18} /> Schedule Test
          </button>
        </div>

        {/* Search Question Input */}
        <div className="w-full my-4">
          <input
            type="text"
            placeholder="Search question..."
            className="w-full border rounded-lg p-3 text-sm text-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Action Buttons with Icons */}
        <div className="flex w-full justify-between gap-2 my-6">
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 text-xs rounded flex items-center justify-center gap-1 flex-1">
            <FaRegCircleQuestion size={12} /> Generate Question Paper
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 text-xs rounded flex items-center justify-center gap-1 flex-1">
            <CiPen size={12} /> Generate Answer Key
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 text-xs rounded flex items-center justify-center gap-1 flex-1">
            <LuBookCheck size={12} /> Generate OMR
          </button>
        </div>

        {/* Display Area */}
        <div className="w-full my-8">
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center h-48 flex items-center justify-center">
            <p className="text-gray-900 font-medium text-lg italic">
              Test Paper will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOfficeMode;