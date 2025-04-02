"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUserAlt, FaTachometerAlt, FaClipboardList } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import {
  Menu,
  ChevronLeft,
  FileText,
  Edit,
  Layers,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  File,
  Archive,
} from "lucide-react";

/* -------------------------------------------
   DESKTOP NAVBAR
-------------------------------------------- */
const Nav = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.clear(); 
    router.push("/"); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden md:flex h-[90px] bg-gradient-to-r from-blue-200 to-yellow-100 p-4 items-center justify-end relative">
      {/* Right Section with Profile Image */}
      <div className="flex items-center space-x-4 mr-4">
        <img
          src="/profilphoto.png"
          alt="Profile"
          className="w-16 h-16 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-4 top-24 bg-white shadow-lg rounded-lg w-48 py-2 z-50"
          >
            <ul className="text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 text-[#007AFF] cursor-pointer flex items-center space-x-2"
                onClick={handleProfileClick}
              >
                <FaUserAlt />
                <span>Profile</span>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 text-[#F02222] cursor-pointer flex items-center space-x-2"
                onClick={handleLogoutClick}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------
   MOBILE SIDEBAR NAV
-------------------------------------------- */
function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative w-full block sm:hidden md:hidden lg:hidden xl:hidden">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-blue-700">Dashboard</h1>
        <img
          src="/mobilenavprofile.png"
          alt="Logo"
          className="w-10 h-10 rounded-full shadow-md"
        />
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Back Icon */}
        <div className="absolute top-4 left-4">
          <button onClick={() => setIsOpen(false)}>
            <ChevronLeft className="w-6 h-6 text-gray-900 font-bold" />
          </button>
        </div>

        {/* Logo and Title */}
        <div className="flex flex-col justify-center items-center p-4 mt-10">
          <img
            src="/mobilenavprofile.png"
            alt="Nexcore Logo"
            className="w-16 h-16 rounded-full drop-shadow-lg"
          />
          <h2 className="text-xl font-bold mt-2">Nexcore</h2>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-700 font-semibold transition-all">
            <FileText className="w-5 h-5" />
            Practise Test
          </button>
          <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-700 font-semibold transition-all">
            <Edit className="w-5 h-5" />
            Customized Test
          </button>

          {/* Paper Generator Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-700 font-semibold transition-all"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5" />
                Paper Generator
              </div>
              {isDropdownOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="ml-8 flex flex-col gap-2">
                <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-100 transition-all">
                  <File className="w-5 h-5" />
                  Tests
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-100 transition-all">
                  <Archive className="w-5 h-5" />
                  Batches
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-700 font-semibold transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button className="flex items-center gap-3 p-2 rounded-lg hover:text-yellow-700 hover:bg-yellow-700 font-semibold transition-all">
            <User className="w-5 h-5" />
            Profile
          </button>
          <button className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:text-zinc-900 hover:bg-red-700 font-semibold transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------
   MOBILE BOTTOM NAVBAR
-------------------------------------------- */


function MobilebottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-10 block  md:hidden lg:hidden xl:hidden">
     <div className="flex justify-around py-2">
        <a
          href="/dashboard"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaTachometerAlt className="text-2xl text-black hover:text-black" />
          <span className="text-xs">Dashboard</span>
        </a>

        <a
          href="/batches"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <PiStudentFill className="text-2xl text-black hover:text-black" />
          <span className="text-xs">View Students</span>
        </a>

        <a
          href="/papergenerator"
          className="flex flex-col items-center text-gray-700 hover:text-blue-500"
        >
          <FaClipboardList className="text-2xl text-black hover:text-black" />
          <span className="text-xs">Test</span>
        </a>
      </div>
    </div>
  );
}




export default Nav;
export { MobileNavbar, MobilebottomNavbar };
