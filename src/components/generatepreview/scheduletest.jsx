"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Scheduletest() {
  return (
    <div className="flex justify-between items-center w-full p-4">
      <button className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500 transition">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
        Create <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
}
export default Scheduletest;
