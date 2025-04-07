"use client";

import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaClipboardList } from "react-icons/fa";

/* -------------------------------------------
   MOBILE BOTTOM NAVBAR
-------------------------------------------- */
const MobilebottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10 sm:hidden">
      <div className="flex justify-around py-2">
        <a href="/dashboard" className="flex flex-col items-center text-gray-700 hover:text-blue-500">
          <FaTachometerAlt className="text-2xl text-black hover:text-black" />
          <span className="text-xs">Dashboard</span>
        </a>

        <a href="/batches" className="flex flex-col items-center text-gray-700 hover:text-blue-500">
          <PiStudentFill className="text-2xl text-black hover:text-black" />
          <span className="text-xs">View Students</span>
        </a>

        <a href="/papergenerator" className="flex flex-col items-center text-gray-700 hover:text-blue-500">
          <FaClipboardList className="text-2xl text-black hover:text-black" />
          <span className="text-xs">Test</span>
        </a>
      </div>
    </div>
  );
};

export default MobilebottomNavbar;
