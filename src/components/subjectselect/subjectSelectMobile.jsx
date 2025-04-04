"use client";

import React, { useState, useEffect } from "react";
import { FaFlask, FaDumbbell, FaArrowRight } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { FaSearch } from "react-icons/fa";  // Import the search icon
import { useRouter } from "next/navigation";

const SubjectSelectMobile = () => {
  const [difficulty, setDifficulty] = useState("Medium");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [testName, setTestName] = useState("");
  const router = useRouter();

  // Load selected subjects from localStorage when the component mounts
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];
    setSelectedSubjects(savedSubjects);
  }, []);

  // Function to update selected subjects and store them in localStorage
  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) => {
      let updatedSubjects;
      if (prev.includes(subject)) {
        updatedSubjects = prev.filter((s) => s !== subject);
      } else {
        updatedSubjects = [...prev, subject];
      }
      localStorage.setItem("selectedSubjects", JSON.stringify(updatedSubjects));
      return updatedSubjects;
    });
  };


// Handle "Continue" button click (route to first subject's page)
const handleContinueClick = () => {
  if (selectedSubjects.length > 0) {
    const subject = selectedSubjects[0].toLowerCase(); // Get the first selected subject and convert it to lowercase
    router.push(`/select_chapters_${subject}`); // Route to the first selected subject's page
  } else {
    alert("Please select at least one subject!");
  }
};






  // load marks in local storgae
  useEffect(() => {
    const savedMarks = JSON.parse(localStorage.getItem("selectedMarks")) || [];
    setMarks(savedMarks);
  }, []);
  
 


  // local storage form data
  const [positiveMarks, setPositiveMarks] = useState("");
  const [negativeMarks, setNegativeMarks] = useState("");
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedPositiveMarks = localStorage.getItem("positiveMarks") || "";
    const savedNegativeMarks = localStorage.getItem("negativeMarks") || "";
  
    setPositiveMarks(savedPositiveMarks);
    setNegativeMarks(savedNegativeMarks);
  }, []);
  
  // Handle input change and save to localStorage
  const handlePositiveMarksChange = (e) => {
    const value = e.target.value;
    setPositiveMarks(value);
    localStorage.setItem("positiveMarks", value);
  };
  
  const handleNegativeMarksChange = (e) => {
    const value = e.target.value;
    setNegativeMarks(value);
    localStorage.setItem("negativeMarks", value);
  };
  
  
  const handleMarksChange = (marksOption) => {
    setMarks([marksOption]);
  };

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  // const handleContinueClick = () => {
  //   router.push("/viewtestdetails");
  // };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Generate Button (Hidden on Mobile) */}
      <button className="lg:block hidden left-80 px-10 py-5 text-gray-400 border-[#BBBBBB] border-1 rounded-lg bg-transparent hover:bg-gray-100 shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
        Generate Test
      </button>


      {/* Search Bar */}
  <div className="flex justify-center mt-4">
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Tests"
        className="w-full px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium "
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>




      {/* Top Section: Create Test */}
      <div className="text-center mb-8 md:ml-50 mt-2">
        <h3 className="text-2xl  font-medium text-black text-center mb-2 sm:text-lg md:text-xl mt-12">Create Test</h3>
        <h2 className="text-2xl text-black-500 text-center mt-3">Name your Test</h2>
        <input
          type="text"
          placeholder="Mock Test 1"
          value={testName}
          onChange={handleTestNameChange}
          className="mt-4 px-9 py-2 border-none rounded-xl bg-[#D1E3FF] text-black font-bold text-lg w-full md:w-2/5 placeholder:text-gray-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start text-black">

        {/* Right Section: Step Indicator & Cards */}
        <div className="lg:col-span-1 flex flex-row gap-6 items-center mt-4 lg:mt-0">
         {/* Step Indicator */}
<div className="flex flex-col items-center gap-0">
  <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-white text-lg">
    
  </div>
  <div className="w-1 h-32 bg-blue-500"></div>
  <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg">
    
  </div>
  <div className="w-1 h-32 bg-blue-500"></div>
  <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg">
    
  </div>
</div>


          {/* Cards */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between w-full h-40 bg-[#007AFF] rounded-4xl p-5 text-white">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold">Choose Subjects</h3>
                <p className="font-semibold">Select the Subjects and Difficulty</p>
              </div>
              <img src="book.png" alt="Books Icon" className="w-20 h-22" />
            </div>

            <div className="p-4 bg-yellow-400 text-white flex justify-between items-center w-full h-40 rounded-[25px]">
              <div>
                <h3 className="text-xl font-semibold">
                  Please select chapters and other Details
                </h3>
                <p className="text-sm">
                  You can select chapters of different subjects and select dedicated questions of each chapter
                </p>
              </div>
              <img src="book.png" alt="Books Icon" className="w-20" />
            </div>

            <div className="flex justify-between w-full h-40 bg-yellow-400 rounded-4xl p-5 text-white">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold">Completed!!</h3>
                <p className="font-semibold">Woah you have created a new Test</p>
              </div>
              <img src="book.png" alt="Books Icon" className="w-20 h-22" />
            </div>
          </div>
        </div>

        {/* Left Section: Select Difficulty and Subjects */}
        <div className="lg:col-span-2 flex flex-col gap-6 mt-4">
          {/* Difficulty */}
          <div className="relative mb-8">
            <h3 className="text-2xl font-semibold">Select Difficulty</h3>
            <p className="mt-5">Select at least 1 difficulty for each subject</p>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-2 mt-5 w-full lg:w-[480px] h-[54px] rounded-[15px] bg-[#007AFF] text-white appearance-none px-9 text-lg outline-none focus:ring-0 shadow-lg font-normal"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <img
              src="Vector 1.png"  // Replace with the actual path of your arrow image
              alt="Dropdown Arrow"
              className="absolute top-1/2 right-4 w-4 h-3 pointer-events-none mt-11"
            />
          </div>

          {/* Subjects */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mt-1">Select Subjects</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              {[
                { name: "Physics", img: "physic.png" },
                { name: "Chemistry", img: "chemistry.png" },
                { name: "Biology", img: "botany.png" },
           
              ].map((subject) => (
                <div
                  key={subject.name}
                  onClick={() => handleSubjectChange(subject.name)}
                  className={`cursor-pointer p-4 w-full lg:w-[357px] font-[700] h-[50px] drop-shadow-md rounded-2xl text-center ${
                    selectedSubjects.includes(subject.name)
                      ? "bg-blue-500 text-white border-2 border-purple-500"
                      : "bg-white border-gray-400"
                  } flex items-center justify-start gap-4 transition-colors duration-300`}
                >
                  <img src={subject.img} alt={subject.name} className="w-8 h-8" />
                  <span>{subject.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Continue Button */}
      <div className="w-full flex justify-end mt-5 mb-15 ">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-full flex items-center"
          onClick={handleContinueClick}
        >
          Continue
          <FaArrowRight className="ml-2 text-white text-xl" />
        </button>
      </div>

      {/* Form Section (Hidden on Mobile) */}
      <div className="hidden lg:block absolute left-[55%] transform -translate-x-[45%] top-[995px] w-[583px] h-fit bg-[#FFBB38] rounded-[38px] p-6 shadow-lg border border-[#FBB03B]">
        <h2 className="text-2xl font-medium text-center text-white">Select Marks per Question</h2>

        {/* Positive Marks Input */}
        <div className="mt-6">
          <label className="block text-xl font-light text-white">Positive marks (per question)</label>
          <input
            type="text"
            value={positiveMarks} 
            onChange={handlePositiveMarksChange}
            className="w-full mt-2 p-3 border border-white rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FBB03B]"
          />
        </div>

        {/* Negative Marks Input */}
        <div className="mt-4">
          <label className="block text-xl font-light text-white">Negative marks (per question)</label>
          <input
            type="text"
            value={positiveMarks} 
            onChange={handlePositiveMarksChange}
            className="w-full mt-2 p-3 border border-white rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FBB03B]"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectSelectMobile;

