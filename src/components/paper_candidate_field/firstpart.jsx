"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import CandidateTable from "./Candidatepage";
import InstructionTable from "./InstructionTable";

const FirstPart = () => {
  const [active, setActive] = useState("Paper Candidate Field");

  return (
    <div className="flex flex-col items-center w-full md:min-h-0 justify-center md:justify-start pt-10 md:pt-0 px-4">
      <div className="flex flex-col items-center w-full md:min-h-0 pt-1">
        {/* Search Bar - Visible Only in Mobile View */}
        <div className="flex flex-col sm:hidden items-center gap-4 mb-6 w-full px-4">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search Name, Student ID..."
              className="w-full pl-12 pr-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg sm:text-xl">
              <BsSearch />
            </span>
          </div>
        </div>

        {/* Settings Button - Hidden on Small Screens */}
        <button className="hidden sm:block   bg-white text-[#979797] px-12 py-4 rounded-lg border-1 border-[#BBBBBB] shadow-[0_4px_4px_#00000040] hover:bg-gray-100 transition cursor-pointer  md:bolck   mr-4 ">
      
        Settings
      </button>


        {/* Full-width Tab Container with Margin and Padding */}
        <div className="w-full md:max-w-[90%] rounded-lg flex justify-center bg-white shadow-[0_1px_2px_rgba(0,0,0,0.14),0_-1px_2px_rgba(0,0,0,0.14)] md:mt-15 sm:mt-15 mx-2 md:mx-4 mb-2 md:mb-4 px-12 py-1">
    <button
            className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base  font-Nunito Sans  font-normal transition-all rounded-md ${
              active === "Paper Candidate Field"
                ? "bg-[#007AFF]  text-white"
                : "text-black hover:bg-blue-100"
            }`}
            onClick={() => setActive("Paper Candidate Field")}
          >
            Paper Candidate Field
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base  font-Nunito Sans  font-normal transition-all rounded-md s ${
              active === "Paper Instruction"
                ? "bg-[#007AFF]  text-white"
                : "text-black hover:bg-blue-100"
            }`}
            onClick={() => setActive("Paper Instruction")}
          >
            Paper Instruction
          </button>
        </div>

        {/* Render Tables Based on Active Tab */}
        <div className="w-full">
          {active === "Paper Candidate Field" ? (
            <CandidateTable />
          ) : (
            <InstructionTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstPart;
