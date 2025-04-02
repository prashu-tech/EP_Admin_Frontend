"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";

export default function PhyFirstPart() {
  return (
    <section className="flex flex-col p-4 gap-2 font-['Segoe_UI']">
      {/* Search Bar - Visible only in Mobile View */}
      <div className="flex flex-col sm:hidden items-center gap-4 mb-6 w-full px-4">
        <div className="relative w-full max-w-xl bg-[#F5F7FA] text-[] font-medium py-2 rounded-full">
          <input
            type="text"
            placeholder="Search Tests"
            className="w-full pl-12 pr-6 py-1 sm:py-3 text-lg font-medium sm:text-2xl bg-transparent focus:outline-none tracking-wider"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg sm:text-xl ml-2">
            <BsSearch />
          </span>
        </div>
      </div>


      {/* Top Section - Generate Test Button and Title */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <div
          className="bg-white text-[#979797] px-6 py-4 rounded-lg border border-[#BBBBBB] shadow-[0_4px_6px_0_rgba(0,0,0,0.25)] hover:bg-gray-100 transition cursor-pointer hidden sm:block -mt-4"
        >
          Generate Test
        </div>

        {/* Centered Heading */}
        <h1 className="text-xl sm:text-2xl md:mt-4 md:mr-29 font-medium font-SegoeUI  sm:mt-0 text-center sm:text-left whitespace-nowrap w-full sm:w-auto">
          Select Physics Chapters
        </h1>

        <div className="w-16 hidden sm:block"></div>
      </div>

      {/* Subject-wise Marks Section */}
      <div className="flex justify-center sm:justify-center items-center gap-4 sm:gap-10 mt-3 flex-wrap ">
        <h2 className="text-lg sm:text-xl font-medium font-SegoeUI">
          Subject-wise Marks
        </h2>
        <div className="bg-[#EEF5FF] text-[#718EBF] text-sm sm:text-base font-normal px-4 py-2 md:py-2.5 sm:px-6 sm:py-4 rounded-lg">
          Subject-wise Marks
        </div>
      </div>

      {/* Select Chapters and Search Bar Section */}
      {/* Select Chapters and Search Bar Section */}
      {/* Select Chapters and Search Bar Section */}
      <div className="flex items-center justify-between w-full mt-4 gap-15 ">
        {/* Select Chapters */}
        <div className="flex items-center gap-2 ml-0 sm:ml-4 md:ml-25">
          <h2 className="text-base sm:text-xl font-medium whitespace-nowrap">
            Select Chapters
          </h2>
        </div>

        {/* Search Bar with Icon */}
        <div className="flex items-center rounded-full px-4 py-1 bg-[#EEF5FF] text-[#8BA3CB]  hover:bg-blue-200 transition w-3/5 sm:w-1/3 ml-4 sm:ml-0 md:py-2 md:mr-15">
          <BsSearch className=" mr-2 text-sm sm:text-lg text-[#718EBF]" />
          <input
            type="text"
            placeholder="Search Tests"
            className="bg-transparent outline-none w-full text-xs sm:text-base pr-2"
          />
        </div>
      </div>


    </section>
  );
}
