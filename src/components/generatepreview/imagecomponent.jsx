"use client";
import React from 'react';
import Image from 'next/image';

const ImageComponent = () => {
  return (
   
      <div className="flex justify-center space-x-4 ml-[120vh] mr-12 bg-white  p-4 rounded-xl shadow-md mt-6 mb-8">
      {/* Timer Icon and text */}
      <div className="flex flex-col items-center space-x-2 ">
        <Image
          src="/hourglass_6290515.svg"
          alt="Time"
          width={35}
          height={35}
        />
        <span className="text-black text-lg">50 mins</span>
      </div>

      {/* Question Icon and text */}
      <div className="flex  flex-col items-center space-x-2 ">
        <Image
          src="/question_13077967.svg"
          alt="Questions"
          width={40}
          height={40}
        />
        <span className="text-black text-lg">30 Qts</span>
      </div>

      {/* Medal Icon and text */}
      <div className="flex flex-col items-center space-x-2 ">
        <Image
          src="/gold-medal_5406582.svg"
          alt="Marks"
          width={40}
          height={40}
        />
        <span className="text-black text-lg">120 mks</span>
      </div>
    </div>
   
  );
};
export default ImageComponent;