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
            selectedMode === "Practice" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setSelectedMode("Practice")}
        >
          Practice
        </button>

        <button
          className={`px-6 py-2 rounded-xl drop-shadow-lg text-white ${
            selectedMode === "Customized" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setSelectedMode("Customized")}
        >
          Customized
        </button>
      </div>
    </div>
  );
};

export default ModeSwitcheruserProfile;
