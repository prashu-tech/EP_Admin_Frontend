"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiSearch, FiChevronLeft } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { AiOutlineEye, AiOutlineFileText, AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";

const SidebarMenu = ({ menuOpen, setMenuOpen }) => {
  const [isPaperGeneratorOpen, setIsPaperGeneratorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const togglePaperGenerator = () => {
    setIsPaperGeneratorOpen(!isPaperGeneratorOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    menuOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
        <div className="bg-[#007AFF] w-[65%] max-w-sm p-4 h-full flex flex-col text-white">
          {/* Back Button */}
          <button
            className="text-gray-200 mb-4"
            onClick={() => setMenuOpen(false)}
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
              <img
                src="/logo.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">Basim Thakur</h2>
            <p className="text-sm text-gray-300">basimthakur3@gmail.com</p>
          </div>

          {/* Navigation Menu */}
          <div className="mt-14 space-y-6">
            <div className="hover:text-gray-300">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <FaTachometerAlt className="text-xl" />
                <span className="text-lg">Dashboard</span>
              </Link>
            </div>
            <div className="hover:text-gray-300">
              <Link href="/practicetest" className="flex items-center space-x-3">
                <AiOutlineFileText className="text-xl" />
                <span className="text-lg">Practice Test</span>
              </Link>
            </div>
            <div className="hover:text-gray-300">
              <Link href="/customizetest" className="flex items-center space-x-3">
                <GiTestTubes className="text-xl" />
                <span className="text-lg">Customized Test</span>
              </Link>
            </div>
            <div>
              <div
                onClick={togglePaperGenerator}
                className="hover:text-gray-300 cursor-pointer flex items-center space-x-3"
              >
                <FaCog className="text-xl" />
                <span className="text-lg">Paper Generator</span>
              </div>
              {isPaperGeneratorOpen && (
                <div className="pl-8 space-y-4 mt-2">
                  <div className="hover:text-gray-300">
                    <Link
                      href="/papergenerator"
                      className="flex items-center space-x-3"
                    >
                      <AiOutlineFileText className="text-lg" />
                      <span className="text-md">Test</span>
                    </Link>
                  </div>
                  <div className="hover:text-gray-300">
                    <Link
                      href="/batches"
                      className="flex items-center space-x-3"
                    >
                      <AiOutlineSetting className="text-lg" />
                      <span className="text-md">Batches</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div
                onClick={toggleSettings}
                className="hover:text-gray-300 cursor-pointer flex items-center space-x-3"
              >
                <FaCogs className="text-xl" />
                <span className="text-lg">Settings</span>
              </div>
              {isSettingsOpen && (
                <div className="pl-8 space-y-4 mt-2">
                  <div className="hover:text-gray-300">
                    <Link href="/settings/papercandidate" className="flex items-center space-x-3">
                      <AiOutlineFileText className="text-lg" />
                      <span className="text-md"> Paper Config</span>
                    </Link>
                  </div>
                  <div className="hover:text-gray-300">
                    <Link href="/addwatermark" className="flex items-center space-x-3">
                      <AiOutlineSetting className="text-lg" />
                      <span className="text-md">Theme</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="hover:text-gray-300">
              <Link href="/view-students" className="flex items-center space-x-3">
                <AiOutlineEye className="text-xl" />
                <span className="text-lg">View Students</span>
              </Link>
            </div>
            <div className="hover:text-gray-300 flex items-center space-x-3">
              <FaSignOutAlt className="text-xl" />
              <Link href="/" className="text-lg">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const MobileTopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Extract the page name from the pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter((seg) => seg);
    return segments.length > 0
      ? segments[segments.length - 1].replace(/-/g, " ").toUpperCase()
      : "Overview";
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="sm:flex md:hidden w-full bg-[#007AFF] p-4 h-20 text-white">
        <div className="flex items-center justify-between w-full">
          {/* Toggle Button */}
          <button
            className="text-gray-200"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          {/* Center Text */}
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>

          {/* Profile Picture */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="/logo.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden w-full flex justify-center p-1 mt-3">
          <div className="w-full max-w-screen-lg flex items-center h-[50px] mx-3">
            <div className="flex items-center bg-gray-200 h-9 rounded-full flex-grow">
              <button className="pl-5 text-gray-400">
                <FiSearch size={20} />
              </button>
              <input
                type="text"
                placeholder="Search for something"
                className="flex-grow p-2 text-sm bg-transparent focus:outline-none rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <SidebarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default MobileTopBar;
