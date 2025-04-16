'use client';

import React, { useState, useEffect } from "react";
import { FaFlask, FaDumbbell, FaArrowRight } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { useRouter } from "next/navigation";

const SelectSubjectPage = () => {
  const [difficulty, setDifficulty] = useState("Medium");
  const [marks, setMarks] = useState([]);
  const [testName, setTestName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [positiveMarks, setPositiveMarks] = useState("");
  const [negativeMarks, setNegativeMarks] = useState("");
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

  // Load marks in localStorage
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

  // Handle input change and save positive and negative marks to localStorage at once
  const handlePositiveMarksChange = (e) => {
    const value = e.target.value;
    setPositiveMarks(value);
    saveMarksToLocalStorage(value, negativeMarks, difficulty); // Save all values together
  };

  const handleNegativeMarksChange = (e) => {
    const value = e.target.value;
    setNegativeMarks(value);
    saveMarksToLocalStorage(positiveMarks, value, difficulty); // Save all values together
  };

  // Function to save positive, negative marks and difficulty in localStorage
  const saveMarksToLocalStorage = (positive, negative, difficulty) => {
    const marksData = {
      positiveMarks: positive,
      negativeMarks: negative,
      difficultyLevel: difficulty,
    };
    localStorage.setItem("marks", JSON.stringify(marksData));
  };

  // Handle Test Name change and save to localStorage
  const handleTestNameChange = (e) => {
    const value = e.target.value;
    setTestName(value);
    localStorage.setItem("testName", value); // Save test name to localStorage whenever it changes
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

  return (
    <div className="max-w-[1000px] m-auto">
      <div className="w-full  max-w-7xl  mx-auto p-6">
        <button className="absolute lg:block hidden left-80 px-10 py-5 text-gray-400 border-[#BBBBBB]  rounded-lg bg-transparent hover:bg-gray-100 shadow-[0_4px_6px_rgba(0,0,0,0.3)] ">
          Generate Test
        </button>

        {/* Top Section: Create Test */}
        <div className="text-center mb-8 md:ml-50">
          <h3 className="text-base font-extrabold text-black text-center mb-2 sm:text-lg md:text-xl">
            Create Test
          </h3>
          <input
            type="text"
            placeholder="Test Name"
            value={testName}
            onChange={handleTestNameChange}
            className=" mt-4 px-9 py-2 border-none rounded-xl bg-[#D1E3FF] text-black font-bold text-lg w-full md:w-2/5  placeholder:text-gray-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 max-w-full  md:grid-cols-3 gap-2 items-start text-black ml-35">
          {/* Left Section */}
          <div className=" relative w-[100%]  ">
            {/* Difficulty */}
            <div className="relative mb-8">
              <h3 className="text-2xl font-semibold">Select Difficulty</h3>
              <p className="mt-5">Select at least 1 difficulty for each subject</p>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  saveMarksToLocalStorage(positiveMarks, negativeMarks, e.target.value); // Save difficulty along with marks
                }}
                className="p-2 mt-5 w-[480px] h-[54px] rounded-[15px] bg-[#007AFF] text-white  appearance-none px-9 text-lg   outline-none focus:ring-0 shadow-lg font-normal ml-[-10px]"
              >
                <option value="Easy" className="bg-white text-black">Easy</option>
                <option value="Medium" className="bg-white text-black">Medium</option>
                <option value="Hard" className="bg-white text-black">Hard</option>
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
                  { name: "Biology", img: "botany.png" },
                ].map((subject) => (
                  <div
                    key={subject.name}
                    onClick={() => handleSubjectChange(subject.name)}
                    className={`cursor-pointer p-4 w-[357px] font-[700] h-[50px] drop-shadow-md rounded-2xl text-center ${
                      selectedSubjects.includes(subject.name)
                        ? "bg-blue-500 text-white  border-purple-500"
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

          {/* Right Section: Step Indicator & Cards in 2 Columns */}
          <div className="grid grid-cols-2 w-[650px] ">
            {/* Step Indicator */}
            <div className="flex flex-col items-center gap-0 mt-9 md:w-[10px] pl-60">
              <div className="w-13 h-13 rounded-full border-4 border-blue-500 flex justify-center items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center text-white text-lg"></div>
              </div>
              <div className="w-1 h-34 bg-blue-500 "></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg"></div>
              <div className="w-1 h-34 bg-blue-500"></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white text-lg"></div>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 ">
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

        {/* Positive and Negative Marks Section */}
        <div className="absolute lg:block hidden left-[55%] transform -translate-x-[45%] top-[830px] w-[583px] h-fit bg-[#FFBB38] rounded-[38px] p-6 shadow-lg border border-[#FBB03B]">
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
        <div className="mt-[440px] mb-5  flex justify-end text-center pr-6 ">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-full flex items-center"
            onClick={handleContinueClick}
          >
            Continue
            <FaArrowRight className="ml-2 text-white text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSubjectPage;
