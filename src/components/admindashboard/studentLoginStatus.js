import React from "react";

const StudentLoginStatus = () => {
  return (
    <div className="bg-red-500 p-6 rounded-xl shadow-lg">
  <h2 className="text-white text-3xl font-bold mb-2">
    Students That Have Not Logged In Since Last 7 Days
  </h2>
  <div className="flex justify-between">
    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md gap-2">
      <span className="bg-yellow-400 text-white px-4 py-2 rounded-full">P</span>
      <span className="bg-blue-500 text-white px-4 py-2 rounded-full">T</span>
      <span className="bg-blue-600 text-white px-4 py-2 rounded-full">T</span>
      <span className="bg-blue-300 text-white px-4 py-2 rounded-full">T</span>
      <span className="bg-yellow-300 text-white px-4 py-2 rounded-full">T</span>
      <span className="bg-black text-white px-4 py-2 rounded-full">26+</span>
    </div>
  



      {/* Footer with "30 Students" box */}
      <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM0 14s1-3 7-3 7 3 7 3H0zm11.5-5A1.5 1.5 0 0 1 13 8.5 1.5 1.5 0 0 1 14.5 7a1.5 1.5 0 0 1 0 3zM8 7a1 1 0 0 1-1 1H7V6a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <span className="text-gray-700 text-2xl font-semibold">30 Students</span>
        </div>
      </div>
      </div>
    </div>
  );
};
  
export default StudentLoginStatus;
