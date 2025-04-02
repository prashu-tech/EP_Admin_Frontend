"use client";
import React from 'react';

const GenerateTestButton = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
        Generate Test
      </button>
      <span className="font-bold">Preview</span>
    </div>
  );
};

export default GenerateTestButton;