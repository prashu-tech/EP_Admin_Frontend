"use client";

import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { AiOutlineEye, AiOutlineFileText } from "react-icons/ai";
import Link from "next/link";

const Adminsidebar = () => {
  const [AdminId, setAdminId] = useState(""); // State to hold admin ID
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin"); // Retrieve the 'admin' object from localStorage
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin); // Parse the stored JSON string
      setAdminId(parsedAdmin.AdminId); // Set adminId if it exists in the parsed object
    } else {
      console.error("Admin data is not available in localStorage.");
    }
  }, []);
 
  return (
    <div className="hidden md:block overflow-x-auto fixed top-0 left-0 h-screen bg-[#007AFF] text-white w-1/6 z-50 shadow-md">
      {/* Logo Section */}
      <div className="p-4 flex justify-center items-center py-10">
        <img
          src="/signinlogo.svg"
          alt="Nexcore Logo"
          className="w-40 h-24"
        />
      </div>

      {/* Navigation Menu */}
      <ul className="space-y-8 p-10">
        {/* View Students */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href={`/viewstudents?addedByAdminId=${AdminId}`} className="flex items-center space-x-3">
            <AiOutlineEye className="text-xl" />
            <span className="text-lg">View Students</span>
          </Link>
        </li>

        {/* Dashboard */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <FaTachometerAlt className="text-xl" />
            <span className="text-lg">Dashboard</span>
          </Link>
        </li>

        {/* Batches */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href={`/batches?addedByAdminId=${AdminId}`} className="flex items-center space-x-3">
            <AiOutlineFileText className="text-xl" />
            <span className="text-lg">Batches</span>
          </Link>
        </li>

        {/* Practice Test */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href="/practicetest" className="flex items-center space-x-3">
            <AiOutlineFileText className="text-xl" />
            <span className="text-lg">Practice Test</span>
          </Link>
        </li>

        {/* Customized Test */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href="/customizetest" className="flex items-center space-x-3">
            <GiTestTubes className="text-xl" />
            <span className="text-lg">Customized Test</span>
          </Link>
        </li>

        {/* Generate Test */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href="/papergenerator" className="flex items-center space-x-3">
            <FaTachometerAlt className="text-xl" />
            <span className="text-lg">Generate Test</span>
          </Link>
        </li>

        {/* Settings */}
        <li className="hover:text-gray-500 hover:bg-gradient-to-r from-white/90 to-white/0 rounded-sm">
          <Link href="/settings/papercandidate" className="flex items-center space-x-3">
            <FaCogs className="text-xl" />
            <span className="text-lg">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Adminsidebar;
