"use client";
import React from 'react';
<<<<<<< HEAD
import { BsSearch } from 'react-icons/bs';
=======
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb

const GenerateTestButton_mobile = () => {
  return (
    <div className=" flex-col items-center space-y-6 sm:space-y-4 mt-6 sm:mt-10 px-4 sm:px-0">
<<<<<<< HEAD
      
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

      <button 
        className="hidden md:block w-full sm:w-auto bg-[#007AFF] text-white 
=======
      <button 
        className=" w-full sm:w-auto bg-[#007AFF] text-white 
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        text-base sm:text-lg font-semibold py-3 sm:py-2 
        px-6 sm:px-11 rounded-lg shadow-md 
        hover:bg-[#0069CC] active:scale-95 
        transition-all duration-200"
      >
        Generate Test
      </button>
      
<<<<<<< HEAD
      <span className="font-bold text-xl sm:text-2xl ml-3 text-center">
       <h1>Preview</h1> 
=======
      <span className="font-bold text-xl sm:text-2xl text-center">
        Preview
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
      </span>
    </div>
  );
};

<<<<<<< HEAD
export default GenerateTestButton_mobile;
=======
export default GenerateTestButton_mobile;
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
