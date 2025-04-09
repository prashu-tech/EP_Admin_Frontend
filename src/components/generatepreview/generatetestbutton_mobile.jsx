"use client";
import React from 'react';

const GenerateTestButton_mobile = () => {
  return (
    <div className=" flex-col items-center space-y-6 sm:space-y-4 mt-6 sm:mt-10 px-4 sm:px-0">
      <button 
        className=" w-full sm:w-auto bg-[#007AFF] text-white 
        text-base sm:text-lg font-semibold py-3 sm:py-2 
        px-6 sm:px-11 rounded-lg shadow-md 
        hover:bg-[#0069CC] active:scale-95 
        transition-all duration-200"
      >
        Generate Test
      </button>
      
      <span className="font-bold text-xl sm:text-2xl text-center">
        Preview
      </span>
    </div>
  );
};

export default GenerateTestButton_mobile;