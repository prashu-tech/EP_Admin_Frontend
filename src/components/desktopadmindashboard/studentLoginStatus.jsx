<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const StudentActivityCard = () => {
  const [studentData, setStudentData] = useState({ studentCount: 0, studentProfiles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false); // State to handle showing more profiles

  // Define a set of letters to display as initials
  const initialsSet = ["P", "R", "S", "V", "T"];

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout/studentslogged`);
        const data = await response.json();

        if (data.success) {
          setStudentData({
            studentCount: data.data.studentCount,
            studentProfiles: data.data.studentProfiles,
          });
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const circleColors = [
    "bg-[#6B4F3A]", "bg-green-800", "bg-violet-800", "bg-green-800", "bg-[#6B4F3A]",
    "bg-red-500", "bg-blue-400", "bg-purple-600", "bg-orange-400", "bg-yellow-600"
  ];  // Define additional colors for cycling

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const profilesToDisplay = showMore ? studentData.studentProfiles : studentData.studentProfiles.slice(0, 5);
=======
"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
// You can import Axios or use fetch later for actual API calls

const StudentActivityCard = () => {
  // Dummy data for now
  const [studentData, setStudentData] = useState({
    studentCount: 30,
    tags: ["P", "T", "T", "T", "26+"],
  });

  // Simulating data fetch using useEffect (can be replaced with real API calls later)
  useEffect(() => {
    // Simulate a delay (replace with actual API call logic later)
    setTimeout(() => {
      setStudentData({
        studentCount: 30, // This can come from the backend later
        tags: ["P", "T", "T", "T", "26+"], // This can come from the backend later
      });
    }, 1000); // 1-second delay for simulation
  }, []);

  // Predefined background colors based on index or tag
  const circleColors = ["bg-yellow-400", "bg-blue-500", "bg-yellow-400", "bg-blue-500", "bg-black"];
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb

  return (
    <div
      className="relative p-6 shadow-lg w-[24rem] max-w-4xl mx-auto mt-8 bg-[#F54E60]"
<<<<<<< HEAD
      style={{ backgroundImage: `url('/Vector 1.svg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
=======
      style={{
        backgroundImage: `url('/Vector 1.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title */}
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
      <h2 className="text-gray-100 text-2xl font-semibold mb-22">
        Students That Have Not Logged In Since Last 7 Days
      </h2>

      <div className="flex items-center justify-between">
<<<<<<< HEAD
        <div className="absolute top-26 mt-10 shadow-lg flex items-center bg-white p-2 rounded-sm translate-y-1/2">
          {profilesToDisplay.map((profile, index) => {
            const randomLetter = initialsSet[index % initialsSet.length]; // Get letter for initials
            const circleColor = circleColors[index % circleColors.length]; // Cycle through colors dynamically
            return (
              <span
                key={index}
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold z-[${index}] -ml-4 first:ml-0 ${circleColor}`}
                style={{ backgroundImage: profile.profileImage ? `url(${profile.profileImage})` : "none", backgroundSize: 'cover' }}
              >
                {/* Display a letter if no profile image */}
                {!profile.profileImage && randomLetter}
              </span>
            );
          })}
        </div>

        <div className="absolute right-5 top-24 flex items-center space-x-4 bg-[#E1F0FF] p-4 rounded-lg shadow-md transform translate-y-1/2">
          <span className="text-blue-500 text-5xl"><AiOutlineUserAdd /></span>
          <div className="flex flex-col">
=======

        {/* Tag Section */}
        <div className="absolute top-26 mt-10 shadow-lg flex items-center bg-[#E7E7E7] p-2 rounded-sm translate-y-1/2">
          {/* Dynamically render tags */}
          {studentData.tags.map((tag, index) => (
            <span
              key={index}
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold z-[${index}] -ml-4 first:ml-0 ${
                circleColors[index] || "bg-blue-300"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Student Info Box */}
        <div className="absolute right-5 top-24 flex items-center space-x-4 bg-[#E1F0FF] p-4 rounded-lg shadow-md transform translate-y-1/2">
          <span className="text-blue-500 text-5xl">
            <AiOutlineUserAdd />
          </span>
          <div className="flex flex-col">
            {/* Dynamically render student count */}
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
            <h3 className="text-3xl font-semibold text-gray-800 flex justify-center">{studentData.studentCount}</h3>
            <h3 className="text-sm font-semi text-gray-800">Students</h3>
          </div>
        </div>
<<<<<<< HEAD
      </div>

      {/* Show the "See More" button if there are more than 5 profiles */}
      {studentData.studentProfiles.length > 5 && (
        <div className="absolute top-48 right-43">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-white font-semibold"
          >
            {showMore ? "Show Less" : `+${studentData.studentCount - 5} More`}
          </button>
        </div>
      )}
=======

      </div>
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
    </div>
  );
};

export default StudentActivityCard;
