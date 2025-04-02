import React from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

export default function BioLastnavMobile() {
  return (
    <div className="flex justify-between items-center w-full p-4 sm:hidden">
      <button className="flex items-center px-6 py-2 mt-4 font-Poppins text-sm bg-[#FFBB38] text-white rounded-full shadow-md hover:bg-yellow-500 transition">
        <HiOutlineArrowLeft className="mr-2 text-lg" /> Back
      </button>
      <button className="flex items-center px-6 py-2 mt-4 font-Poppins text-sm bg-[#007AFF] text-white rounded-full shadow-md hover:bg-blue-600 transition">
        Continue <HiOutlineArrowRight className="ml-2 text-lg" />
      </button>
    </div>
  );
}
