import React from "react";
import { CiImageOn } from "react-icons/ci";
import { PiDownloadSimpleBold } from "react-icons/pi";

export default function TestManagementPart1() {
  return (
    <div className="flex flex-col items-center w-full pt-[30px] max-w-screen-lg mx-auto">
      {/* Top Buttons Container */}
      <div className="flex flex-col items-center w-full max-w-[600px] md:max-w-none mb-6 space-y-4 px-4 md:px-0">

            <div className="flex flex-col items-center w-full max-w-[600px] md:max-w-none mb-6 space-y-4 px-4 md:px-0">

        {/* Generate Test Button */}
        <button className="w-[110px] h-[45px] md:w-[171px] md:h-[66px] border-[1px] border-[#BBBBBB] rounded-[10px] 
                      shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] text-[#979797] -mt-2 md:-mt-5 md:mr-30
                      text-center flex justify-center items-center">
          Generate Test
        </button>

        {/* Download Test Button */}
        <div className="flex md:justify-end justify-center w-full">
          <button className="w-[180px] h-[43px] md:w-[190px] md:h-[66px] border-[1px] border-[#BBBBBB] rounded-[10px] 
          shadow-[0px_4px_6px_0px_rgba(0,0,0,0.26)] font-Open Sans text-[#979797] -mt-15 text-sm md:-mt-18 md:-mr-20 px-3 ml-69
          flex items-center justify-center space-x-2 whitespace-nowrap">
            <span>Download Test</span>
            <PiDownloadSimpleBold className="w-4 h-4" />
          </button>
        </div>

        {/* Test Created Card */}
        <div className="flex md:justify-start justify-center w-full mt-2 ">
          <div className="relative w-64 h-44 bg-white rounded-2xl p-4 shadow-lg">
            <span className="absolute top-2 right-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded mt-3">
              22
            </span>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <CiImageOn className="w-5 h-5 mr-2 text-[#000000]" />
              Test Created
            </h3>
            <div className="overflow-hidden rounded-lg">
              <img
                src="dashboardimg2.svg"
                alt="A visual representation of the created test"
                className="w-full h-28 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex md:justify-end justify-center w-full mt-4">
          <button className="w-[238px] h-[43px] bg-[#4880FF] text-white rounded-lg shadow-md flex items-center justify-center space-x-2">
            <span>+ Generate</span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
