import Head from "next/head";
import React from "react";
import { MdOutlineSchedule } from "react-icons/md";
import { CiPen } from "react-icons/ci";
import { LuBookCheck } from "react-icons/lu";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FaEye, FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter(); 

  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex items-center justify-center p-4">
        <Head>
          <title>Office Mode - Test Generator</title>
          <meta
            name="description"
            content="Generate and manage tests in office mode"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="bg-[#007AFF] top-4 left-4 hidden md:block">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => router.back()}
          >
            <IoIosArrowBack size={20} />
          </button>
        </div>

        <div className="bg-white w-full">
          {/* Header Section */}
          <div className="bg-white w-full flex justify-center -mt-3 items-center h-20">
            <button className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 border border-gray-300 rounded-lg text-gray-400 hidden md:block text-sm py-3 px-6 font-['Segoe_UI'] cursor-pointer">
              Generate Test
            </button>
          </div>

          {/* Test Questions Heading */}
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-semibold">Test Questions</h2>
          </div>

          {/* Main Options with React Icons */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 my-4">
            <button
              onClick={() => router.push("/test_preview")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 cursor-pointer"
            >
              <FaEye size={20} /> Test Preview
            </button>
            <button
              onClick={() => router.push("/offline_mode")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
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

            

          {/* Action Buttons with Icons */}
          <div className="flex w-full justify-center gap-6 sm:gap-6 my-6 overflow-x-auto">
            <button
              onClick={() => router.push("/generatequestionpaper")}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 text-[10px] pr-6 rounded flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaRegCircleQuestion size={12} /> Generate Question Paper
            </button>
          
            <button 
              onClick={() => router.push("/generateanswerpaper")}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 text-[10px] pr-6 rounded flex items-center justify-center gap-2 cursor-pointer"
            >
              <CiPen size={15} /> Generate Answer Key
            </button>
        
           
          </div>

          {/* Display Area - Centered */}
          <div className="flex justify-center my-8">
            <div className="rounded p-4 text-center w-full max-w-1/2 h-auto">
              <img
                src="/sample-question-paper.png"
                alt="Sample Question Paper"
                className="w-full h-auto rounded shadow-md object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;