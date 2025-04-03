"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";

export default function MobileChemistryFirstPart() {
  return (
    <section className="hidden md:block p-4 gap-2 font-['Segoe_UI']">
      {/* Top Section - Generate Test Button and Title */}
      <div className="w-full flex flex-row justify-between items-center">
        <div className="bg-white text-[#979797] px-6 py-4 mt-1  rounded-lg border border-[#BBBBBB] shadow-[0_4px_6px_0_rgba(0,0,0,0.25)]  hover:bg-gray-100 transition cursor-pointer">
          Generate Test
        </div>

        {/* Centered Heading */}
        <h1 className="text-2xl font-medium font-SegoeUI whitespace-nowrap mr-36 mt-8">
          Select Chemistry Chapters
        </h1>

        <div className="w-16"></div>
      </div>

      {/* Subject-wise Marks Section */}
      <div className="flex justify-center items-center gap-10 mt-7 flex-wrap ">
        <h2 className="text-xl font-medium font-SegoeUI">Subject-wise Marks</h2>
        <div className="bg-[#EEF5FF] text-[#718EBF] text-base font-normal px-6 py-3 rounded-lg">
          Subject-wise Marks
        </div>
      </div>

      {/* Select Chapters and Search Bar Section */}
      <div className="flex items-center justify-between w-full mt-8">
        {/* Select Chapters */}
        <div className="flex items-center gap-2 ml-33">
          <h2 className="text-xl font-medium whitespace-nowrap">Select Chapters</h2>
        </div>

        {/* Search Bar */}
        <div className="flex items-center rounded-full px-4 py-2 bg-[#EEF5FF] text-[#8BA3CB] hover:bg-blue-200 transition w-1/3 mr-15">
          <BsSearch className="mr-2 text-lg text-[#718EBF]" />
          <input
            type="text"
            placeholder="Search Tests"
            className="bg-transparent outline-none w-full text-base pr-2"
          />
        </div>
      </div>
    </section>
  );
}
