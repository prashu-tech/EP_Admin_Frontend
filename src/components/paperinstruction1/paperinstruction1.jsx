"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GrAddCircle } from "react-icons/gr";

const PaperInstruction1 = () => {
  const [active, setActive] = useState("Paper Instruction");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [instructions, setInstructions] = useState("");

  // Load selected template and instructions from localStorage
  useEffect(() => {
    const storedTemplate = localStorage.getItem("selectedTemplate");
    const storedInstructions = localStorage.getItem("instructions");
    if (storedTemplate && storedInstructions) {
      setSelectedTemplate(storedTemplate);
      setInstructions(storedInstructions);
    }
  }, []);

  // Handle template selection
  const handleTemplateSelection = (templateId) => {
    setSelectedTemplate(templateId);
    localStorage.setItem("selectedTemplate", templateId);

    const newInstructions = `Instructions for ${templateId}`;
    setInstructions(newInstructions);
    localStorage.setItem("instructions", newInstructions);
  };

  return (
    
    <div className="flex flex-col items-center mt-2 w-full bg-white  rounded-lg p-2
        border: 1px solid #BBBBBB;
        width: 171;
        height: 66;
        mt-97px;
        ml-740px;
        border-radius: 10px;
        border-width: 1px;">
        
      {/* Settings Button */}
      <button className="bg-white text-gray-400 text-lg w-[15%] font-open sans px-10 py-4 rounded-xl mb-8 border border-gray-300"
        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
        Settings
      </button>

      {/* Full-width tab container */}
      <div className="p-1 w-[1004px] max-w-6xl border border-gray-300 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex justify-between sm:justify-center bg-white mb-5">
        <button
          className={`px-6 py-3 w-[181px] font-Nunito Sans font-semibold transition-all rounded-lg  sm:w-auto ${
            active === "Paper Candidate Field"
              ? "bg-blue-600 text-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              : "text-gray-800 hover:bg-blue-100"
          }`}
          onClick={() => setActive("Paper Candidate Field")}
        >
          Paper Candidate Field
        </button>

        <button
          className={`px-6 py-3 w-[214px] font-semibold transition-all rounded-lg  sm:w-auto ${
            active === "Paper Instruction"
              ? "bg-blue-500 text-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
              : "text-gray-800 hover:bg-blue-100"
          }`}
          onClick={() => setActive("Paper Instruction")}
        >
          Paper Instruction
        </button>
      </div>
      
          <div className=" w-[990px] font-bold text-xl">
            Select Templates
          </div>

      {/* Templates Selection Section */}
      <div className="w-full flex flex-wrap justify-center sm:space-x-4 gap-4 mt-5 
        width: 180;
        height: 229;
        top: 317px;
        left: 459px;
">
        {/* Template 1 */}
        <div
          className={`w-[190px] h-[232px] left-[459px] box-shadow: 0px 4px 4px 0px #00000040 ${selectedTemplate === "template1" ? "border-blue-800" : "border-gray-300"} rounded-lg overflow-hidden cursor-pointer`}
            onClick={() => handleTemplateSelection("template1")}
        >
          <Image
            src="/image1.svg" // Replace with your uploaded images path
            alt="Template 1"
            className="w-full h-full object-cover"
            width={190}
            height={232}
          />
        </div>

        {/* Template 2 */}
        <div
          className={`w-[190px] h-[232px] left-[684px] border-blue-500 box-shadow: 0px 4px 4px 0px #00000040 ${selectedTemplate === "template2" ? "border-blue-500" : "border-gray-300"} rounded-lg overflow-hidden cursor-pointer`}
           onClick={() => handleTemplateSelection("template2") }
        >
          <Image
            src="/image2.svg" // Replace with your uploaded images path
            alt="Template 2"
            className="w-full h-full object-cover"
            width={190}
            height={232}
          />
        </div>

        {/* Template 3 */}
        <div
          className={`w-[180px] h-[229px] left-[909px] box-shadow: 0px 4px 4px 0px #00000040 ${selectedTemplate === "template3" ? "border-blue-500" : "border-gray-300"} rounded-lg overflow-hidden cursor-pointer`}
           onClick={() => handleTemplateSelection("template3")}
        >
          <Image
            src="/image3.svg" // Replace with your uploaded images path
            alt="Template 3"
            className="w-full h-full object-cover"
            width={190}
            height={232}
          />
        </div>

        {/* Template 4 */}
        <div
          className={`w-[180px] h-[229px] left-[1134px] box-shadow: 0px 4px 4px 0px #00000040 ${selectedTemplate === "template4" ? "border-blue-500" : "border-gray-300"} rounded-lg overflow-hidden  cursor-pointer`}
           onClick={() => handleTemplateSelection("template4")}
        >
          <Image
            src="/image4.svg" // Replace with your uploaded images path
            alt="Template 4"
            className="w-full h-full object-cover"
            width={190}
            height={232}
          />
        </div>  
      </div>

      <div className=" w-[1004px] max-w-6xl  bg-white shadow-[0px_0px_4px_0px_#00000040] rounded-2xl p-6 mt-10 mb-5 ">
      {/* Flex container for Candidate Field and Add New Button */}
      <div className="flex justify-between items-center mb-4">
        {/* Candidate Field Header */}
        <h3 className="text-2xl font-semibold text-black">Candidate Field</h3>
        
        {/* Add New Candidate Button with Icon */}
        <div className="flex items-center space-x-2">
          
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md flex items-center space-x-2 mr-31">
          <GrAddCircle className="text-white" /><span>Add New Candidate Details</span>
          </button>
        </div>
      </div>
      

      {/* Table Section */}
      <div className="overflow-x-hidden">
  <table className="w-[95%] border-collapse border-[0.4px] border-[#000000] mb-6 border-spacing-y-2">
    <thead className="">
      <tr className="bg-gray-200 font-semibold">
        <th className="px-6 py-3 text-left text-lg">Sr.No</th>
        <th className="px-6 py-3 text-left ">Name</th>
        <th className="px-6 py-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-8 py-4 text-lg align-top">1</td>
        <td className="px-1 py-4 text-lg align-top whitespace-nowrap">Test Instruction</td>
        <td className="px-2 py-4 text-sm w-[391px] h-[184px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
        cupidatat non proident,sunt in culpa qui officia deserunt 
        mollit anim id est laborum.
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
    </div>
  );
};

export default PaperInstruction1;
