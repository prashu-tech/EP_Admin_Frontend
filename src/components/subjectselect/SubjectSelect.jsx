"use client";

import React, { useState,useEffect } from "react";
import { FaFlask, FaDumbbell, FaArrowRight } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { useRouter } from "next/navigation";




const SelectSubjectPage = () => {
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

// load marks in local storgae
useEffect(() => {
  const savedMarks = JSON.parse(localStorage.getItem("selectedMarks")) || [];
  setMarks(savedMarks);
}, []);

const handleMarksChange = (marksOption) => {
  setMarks((prev) => {
    let updatedMarks;
    if (prev.includes(marksOption)) {
      updatedMarks = prev.filter((m) => m !== marksOption);
    } else {
      updatedMarks = [...prev, marksOption];
    }
    localStorage.setItem("selectedMarks", JSON.stringify(updatedMarks));
    return updatedMarks;
  });
};



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




  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  // const handleContinueClick = () => {
  //   router.push("/viewtestdetails");
  // };

  //continue button
  const handleContinueClick = () => {
    if (selectedSubjects.length > 0) {
      const subject = selectedSubjects[0].toLowerCase(); // Get the first subject and convert it to lowercase
      router.push(`/${subject}`); // Dynamically route to the subject-specific page (e.g., /physics, /chemistry)
    } else {
      alert("Please select at least one subject!");
    }
  };
  

  return (
    <div className="w-full  max-w-7xl mx-auto p-6">
   <button className="absolute lg:block hidden left-80 px-10 py-5 text-gray-400 border-[#BBBBBB] border-1 rounded-lg bg-transparent hover:bg-gray-100 shadow-[0_4px_6px_rgba(0,0,0,0.3)] ">
    Generate Test
   </button>
      {/* Top Section: Create Test */}
      <div className="text-center mb-8 md:ml-50">
      <h3 className="text-base font-extrabold text-black text-center mb-2 sm:text-lg md:text-xl">Create Test</h3>
<h2 className=" text-2xl text-black-500 text-center mt-7  ">
  Name your Test
</h2>
<input
  type="text"
  placeholder="Mock Test 1"
  value={testName}
  onChange={handleTestNameChange}
  className=" mt-4 px-9 py-2 border-none rounded-xl bg-[#D1E3FF] text-black font-bold text-lg w-full md:w-2/5  placeholder:text-gray-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]"
/>
      </div>



      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start text-black ">
        {/* Left Section */}
  <div className=" relative w-[100%]  ml-[148px]">
  {/* Difficulty */}
  <div className="relative mb-8">
    <h3 className="text-2xl font-semibold">Select Difficulty</h3>
    <p className="mt-5">Select atleast 1 difficulty for each subject</p>
    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="p-2 mt-5 w-[480px] h-[54px] rounded-[15px] bg-[#007AFF] text-white  appearance-none px-9 text-lg   outline-none focus:ring-0 shadow-lg font-normal ml-[-10px]"
    >
      <option value="Easy" >Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>

    <img 
      src="Vector 1.png"  // Replace with the actual path of your arrow image
      alt="Dropdown Arrow" 
      className="absolute top-1/2 left-110  w-4 h-3 pointer-events-none mt-11"
    />

  </div>

  {/* Subjects */}
  <div className="mb-8">
  <h3 className="text-lg font-semibold ">Select Subjects</h3>
  <div className="flex flex-col gap-4 mt-2">
    {[
      { name: "Physics", img: "physic.png" },
      { name: "Chemistry", img: "chemistry.png" },
      { name: "Botany", img: "botany.png" },
      { name: "Zoology", img: "botany.png" }
    ].map((subject) => (
      <div
        key={subject.name}
        onClick={() => handleSubjectChange(subject.name)}
        className={`cursor-pointer p-4 w-[357px] font-[700] h-[50px] drop-shadow-md rounded-2xl text-center ${
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



  {/* Marks checkbox*/}
  <div className="mt-6 hidden lg:flex flex-col gap-4">
  {/* Heading */}
  <p className="text-xl text-black-200  whitespace-nowrap">Select how many marks should be test created for?</p>

  {/* Top Row */}
  <div className="flex gap-4">
    <div className="w-[146px] h-[48px] shadow-lg shadow-gray-300 rounded-lg flex items-center px-4">

      <input type="checkbox" id="marks10" className="w-4 h-4"checked={marks.includes("10 Marks")}
  onChange={() => handleMarksChange("10 Marks")}/>
      <label htmlFor="marks10" className="ml-2 font-semibold">10 Marks</label>
    </div>
    <div className="w-[146px] h-[48px] shadow-lg shadow-gray-300 rounded-lg flex items-center px-4">

      <input type="checkbox" id="marks20"  className="w-4 h-4"       checked={marks.includes("20 Marks")}
  onChange={() => handleMarksChange("20 Marks")}/>
      <label htmlFor="marks20" className="ml-2 font-semibold">20 Marks</label>
    </div>
    <div className="w-[146px] h-[48px]  shadow-lg shadow-gray-300  rounded-lg flex items-center px-4">

      <input type="checkbox" id="marks30"  className="w-4 h-4"    checked={marks.includes("30 Marks")}
  onChange={() => handleMarksChange("30 Marks")} />
      <label htmlFor="marks30" className="ml-2 font-semibold">30 Marks</label>
    </div>
  </div>

  {/* Bottom Row */}
  <div className="flex gap-4">
    <div className="w-[146px] h-[48px] shadow-lg shadow-gray-300  rounded-lg flex items-center px-4">

      <input type="checkbox" id="marks40"  className="w-4 h-4"    checked={marks.includes("40 Marks")}
  onChange={() => handleMarksChange("40 Marks")} />
      <label htmlFor="marks40" className="ml-2 font-semibold">40 Marks</label>
    </div>
    <div className="w-[146px] h-[48px] shadow-lg shadow-gray-300  rounded-lg flex items-center px-4">
      <input type="checkbox" id="marks50"  className="w-4 h-4"    checked={marks.includes("50 Marks")}
  onChange={() => handleMarksChange("50 Marks")} />
      <label htmlFor="marks50" className="ml-2 font-semibold">50 Marks</label>
    </div>
    <div className="w-[146px] h-[48px] shadow-lg shadow-gray-300  rounded-lg flex items-center px-4">

      <input type="checkbox" id="marks60"  className="w-4 h-4"  checked={marks.includes("60 Marks")}
  onChange={() => handleMarksChange("60 Marks")}/>
      <label htmlFor="marks60" className="ml-2 font-semibold">60 Marks</label>
    </div>
  </div>
</div>

</div>


        {/* Right Section: Step Indicator & Cards in 2 Columns */}
        <div className="grid grid-cols-2 gap-2 md:w-[800px]">
          {/* Step Indicator */}
          <div className="flex flex-col items-center gap-0 mt-9 md:w-[10px] pl-80 ">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-white text-lg">
              1
            </div>
            <div className="w-1 h-34 bg-blue-500 "></div>
            <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg">
              2
            </div>
            <div className="w-1 h-34 bg-blue-500"></div>
            <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg">
              3
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
                <h3 className="text-xl font-semibold ">
                  Please select chapters and other Details
                </h3>
                <p className="text-sm">
                  You can select chapters of different subjects and select
                  dedicated questions of each chapter
                </p>
              </div>
              <img src="book.png" alt="Books Icon" className="w-20" />
            </div>

            <div className="flex justify-between w-full h-40  bg-yellow-400 rounded-4xl p-5 text-white">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold">Completed!!</h3>
                <p className="font-semibold">Woah you have created a new Test</p>
              </div>
              <img src="book.png" alt="Books Icon" className="w-20 h-22" />
            </div>


          </div>
        </div>
      </div>




      {/* form section */}
<div 
  className="absolute lg:block hidden left-[55%] transform -translate-x-[45%] top-[995px] w-[583px] h-fit bg-[#FFBB38]
 rounded-[38px] p-6 shadow-lg border border-[#FBB03B]"
>
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
      value={negativeMarks} 
      onChange={handleNegativeMarksChange}
      className="w-full mt-2 p-3 border border-white rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FBB03B]"
     
    />
  </div>
</div>

      {/* Continue Button */}
      <div className="mt-[360px] mb-5  flex justify-end text-center pr-8 ">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-full flex items-center"
          onClick={handleContinueClick}
        >
          Continue
          <FaArrowRight className="ml-2 text-white text-xl" />
        </button>
      </div>
    </div>

    
  );
};

export default SelectSubjectPage;

