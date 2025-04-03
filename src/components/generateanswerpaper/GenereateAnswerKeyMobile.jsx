// "use client"
// import React from 'react'
// import { FaChevronCircleLeft } from "react-icons/fa";
// import { useState } from "react";
// const GenerateAnswerKeyMobile = () => {
//     const [toggleStates, setToggleStates] = useState({
//         watermark: false,
//         solutions: false,
//         chapterDetails: false,
//         logoHeader: false,
//       });
    
//       const handleToggle = (toggle) => {
//         setToggleStates((prev) => ({ ...prev, [toggle]: !prev[toggle] }));
//       };
    
//       return (
//         <div className="flex justify-center items-start h-screen pt-2 bg-gray-100">
//           <div className="w-[470px] bg-white rounded-lg p-6 shadow-lg h-screen ">
//             {/* Top Section with Icon and Generate Test Button */}
//             <div className="flex items-center justify-between mb-4">
//               <div className="text-blue-700 text-3xl hidden md:block">
//                 <FaChevronCircleLeft />
//               </div>
//               <div className="flex-1 flex justify-center">
//                 <button className="hidden bg-gray-200 px-4 py-2 rounded-md text-gray-600 shadow-md ">
//                   Generate Test
//                 </button>
//               </div>
//             </div>
    
//             {/* Toggle Section with Action Buttons */}
//             <div className="border border-gray-100 shadow-md p-6 rounded-lg mt-5 h-98 ">
//               <h3 className="font-semibold mb-4">Details to Generate Answer Key</h3>
//               <div className="flex flex-col gap-4 mb-4 ">
//                 {[
//                   { label: "Show Watermark", key: "watermark" },
//                   { label: "Show Solutions", key: "solutions" },
//                   { label: "Enable Chapter Details for Test", key: "chapterDetails" },
//                   { label: "Enable header (Logo) in the Question paper", key: "logoHeader" },
//                 ].map(({ label, key }) => (
//                   <label key={key} className="flex items-center">
//                     <div
//                       className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${toggleStates[key] ? "bg-red-500" : ""}`}
//                       onClick={() => handleToggle(key)}
//                     >
//                       <div
//                         className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggleStates[key] ? "translate-x-6" : ""}`}
//                       ></div>
//                     </div>
//                     <span className="ml-3">{label}</span>
//                   </label>
//                 ))}
//               </div>
//               <div className="flex justify-between mt-4 gap-3">
//                 <button className="bg-blue-500 text-white px-16 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-600">
//                   Proceed
//                 </button>
//                 <button className="bg-red-500 text-white  px-16 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-red-600">
//                   Close
//                 </button>
//               </div>
//             </div>
    
//             {/* Print Preview Section */}
//             <div className="mt-6 text-center  ">
//                <h3 className="font-semibold italic text-left">Print Preview</h3>
//                <div className="border border-dashed h-64  mt-2 rounded-md"></div>
//                <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-md cursor-pointer transition duration-300 hover:bg-red-600">
//             Print
//           </button>
//         </div>
//           </div>
//         </div>
//   )
// }

// export default GenerateAnswerKeyMobile;








"use client";
import React, { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

const GenerateAnswerKeyMobile = () => {
  const [toggleStates, setToggleStates] = useState({
    watermark: false,
    solutions: false,
    chapterDetails: false,
    logoHeader: false,
  });

  const handleToggle = (toggle) => {
    setToggleStates((prev) => ({ ...prev, [toggle]: !prev[toggle] }));
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-2 overflow-hidden ">
      <div className="w-full max-w-[470px] mx-4 bg-white rounded-lg p-6 ">
        {/* Top Section with Icon and Generate Test Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-700 text-3xl hidden md:block">
            <FaChevronCircleLeft />
          </div>
          <div className="flex-1 flex justify-center">
            <button className="hidden bg-gray-200 px-4 py-2 rounded-md text-gray-600 shadow-md">
              Generate Test
            </button>
          </div>
        </div>

        {/* Toggle Section with Action Buttons */}
        <div className="border border-gray-100 shadow-md p-4 rounded-lg mt-5 ">
          <h3 className="font-semibold mb-4">Details to Generate Answer Key</h3>
          <div className="flex flex-col gap-4 mb-12 ">
            {[
              { label: "Show Watermark", key: "watermark" },
              { label: "Show Solutions", key: "solutions" },
              { label: "Enable Chapter Details for Test", key: "chapterDetails" },
              { label: "Enable header (Logo) in the Question paper", key: "logoHeader" },
            ].map(({ label, key }) => (
              <label key={key} className="flex items-center">
                <div
                  className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                    toggleStates[key] ? "bg-red-500" : ""
                  }`}
                  onClick={() => handleToggle(key)}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      toggleStates[key] ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-3">{label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-4 gap-3">
            <button className="bg-blue-500 text-white w-full py-2 rounded-md cursor-pointer transition duration-300 hover:bg-blue-600">
              Proceed
            </button>
            <button className="bg-red-500 text-white w-full py-2 rounded-md cursor-pointer transition duration-300 hover:bg-red-600">
              Close
            </button>
          </div>
        </div>

        {/* Print Preview Section */}
        <div className="mt-8 text-center">
          <h3 className="font-semibold italic text-left">Print Preview</h3>
          <div className="border-2 border-dashed h-74 mt-2 rounded-md"></div>
          <button className="bg-red-500 text-white w-full py-2 mt-4 rounded-md cursor-pointer transition duration-300 hover:bg-red-600">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateAnswerKeyMobile;


















































