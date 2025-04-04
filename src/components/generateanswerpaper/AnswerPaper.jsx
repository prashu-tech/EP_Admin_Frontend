import Image from 'next/image';
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoIosArrowBack } from 'react-icons/io';

export default function AnswerPaper() {
  return (
    <div className="flex justify-center items-start min-h-screen pt-2 ">
      <div className="w-[1000px] bg-white  rounded-lg p-6">
        {/* Top Section with Icon and Generate Test Button */}
        <div className="flex items-center justify-between mb-4">
   
        <div className="relative left-24">
      {/* Top Left Blue Button */}
      <div className=" top-2 hidden md:block" >
        <button className="bg-blue-600 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <IoIosArrowBack size={15} />
        </button>
      </div>
    </div>


          <div className="flex-1 flex justify-center">
            <button className=" px-6 py-4 rounded-md text-gray-500 ml-16 border-1 border-gray-200 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
              Generate Test
            </button>
          </div>
        </div>

        {/* Checkbox Section with Action Buttons */}
        <div className="border border-gray-400  shadow-[0_4px_10px_rgba(0,0,0,0.4)]  p-6 rounded-lg mt-13 w-[970px] md:ml-25 md:h-[240px]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 w-5 h-5 text-blue-500 bg-white border-gray-300 rounded-+xl focus:ring-blue-500 checked:bg-blue-500 checked:border-transparent" /> Show Watermark
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 w-5 h-5 text-blue-500 bg-white border-gray-300 rounded-lg focus:ring-blue-500 checked:bg-blue-500 checked:border-transparent" /> Enable header (Logo) in the Question paper
            </label>
            <label className="flex items-center mt-5">
              <input type="checkbox" className="mr-2 w-5 h-5 text-blue-500 bg-white border-gray-300 rounded-lg focus:ring-blue-500 checked:bg-blue-500 checked:border-transparent" /> Show Solutions
            </label>
            <label className="flex items-center mt-5">
              <input type="checkbox" className="mr-2 w-5 h-5 text-blue-500 bg-white border-gray-300 rounded-lg focus:ring-blue-500 checked:bg-blue-500 checked:border-transparent" /> Enable chapter details for the test
            </label>
          </div>
          <div className="flex gap-8 md:ml-54 mt-15 relative">
            <button className="bg-blue-500 text-white px-16 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-600">Proceed</button>
            <button className="bg-red-500 text-white px-16 py-1 rounded-md cursor-pointer transition duration-300 hover:bg-red-600">Close</button>
          </div>
        </div>

        {/* Print Preview Section */}
        <div className="mt-8 md:ml-46">
  <h3 className="font-semibold italic text-2xl">Print Preview</h3>
  <div className="border-4 border-gray-300 border-dashed h-70 w-[96%] mt-1 rounded-md bg-gray-"></div>
  <button className="bg-red-500 text-white w-[96%] py-2 mt-4 rounded-md cursor-pointer transition duration-300 hover:bg-red-600 shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
    Print
  </button>
</div>
      </div>
    </div>
  );
}



