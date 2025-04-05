import Head from "next/head";
import React from "react";
import { MdOutlineSchedule } from "react-icons/md";
import { CiPen } from "react-icons/ci";
import { LuBookCheck } from "react-icons/lu";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaEye, FaQuestionCircle, FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Mobile_offline_mode = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-white md:hidden">
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta name="description" content="Generate and manage tests in office mode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Search Bar */}
  <div className="flex justify-center mt-4">
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Tests"
        className="w-full px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium "
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>
     

      {/* Header Section */}
      <div className="w-full flex  justify-center items-center h-16">
        <h2 className="text-lg font-semibold">Test Questions</h2>
      </div>

      {/* Main Options */}
      <div className="flex flex-col items-center space-y-4 my-4">
        <button
          onClick={() => router.push("/test_preview")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 w-4/5 justify-center"
        >
          <FaEye size={20} /> Test Preview
        </button>
        <button
          onClick={() => router.push("/office_mode")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 w-4/5 justify-center"
        >
          <FaQuestionCircle size={20} /> Offline Mode
        </button>
        <button
          onClick={() => router.push("/schedule_test")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 w-4/5 justify-center"
        >
          <MdOutlineSchedule size={20} /> Schedule Test
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-11/12 mx-auto my-4">
        <input
          type="text"
          placeholder="Search question..."
          className="w-full border shadow-sm rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 items-center my-4">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 w-4/5 justify-center">
          <FaRegCircleQuestion size={15} /> Generate Question Paper
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 w-4/5 justify-center">
          <CiPen size={15} /> Generate Answer Key
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 w-4/5 justify-center">
          <LuBookCheck size={15} /> Generate OMR
        </button>
      </div>

      {/* Display Area */}
      <div className="flex justify-center my-6">
        <div className="border-2 border-dashed border-gray-400 rounded p-4 text-center h-48 w-11/12 flex items-center justify-center">
          <p className="text-black font-semibold italic">Test Paper will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Mobile_offline_mode;
