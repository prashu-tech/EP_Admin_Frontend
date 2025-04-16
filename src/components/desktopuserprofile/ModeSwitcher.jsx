"use client";
import React from "react";

const ModeSwitcheruserProfile = ({ selectedMode, setSelectedMode }) => {
  return (
    <div className="flex justify-between w-full my-10 px-10">
      {/* Title */}
      <h2 className="text-xl font-semi">User Profile</h2>

      {/* Button Section */}
      <div className="flex space-x-6">
        <button
          className={`px-6 py-2 rounded-xl drop-shadow-lg text-white ${
<<<<<<< HEAD
            selectedMode === "Practice" ? "bg-white-500" : "bg-white-300"
          }`}
          onClick={() => setSelectedMode("Practice")}
        >
          
=======
            selectedMode === "Practice" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setSelectedMode("Practice")}
        >
          Practice
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        </button>

        <button
          className={`px-6 py-2 rounded-xl drop-shadow-lg text-white ${
<<<<<<< HEAD
            selectedMode === "Customized" ? "bg-white-500" : "bg-white-300"
          }`}
          onClick={() => setSelectedMode("Customized")}
        >
          
=======
            selectedMode === "Customized" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setSelectedMode("Customized")}
        >
          Customized
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        </button>
      </div>
    </div>
  );
};

export default ModeSwitcheruserProfile;
