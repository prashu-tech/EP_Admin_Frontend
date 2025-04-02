<<<<<<<< HEAD:src/components/nav/nav.jsx
/*navbar*/
'use client';
========
"use client";
>>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770:src/components/desktopnav/nav.jsx

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

<<<<<<<< HEAD:src/components/nav/nav.jsx
const Nav = () => {
  const router = useRouter(); // Initialize useRouter for navigation
========
/* -------------------------------------------
   DESKTOP NAVBAR
-------------------------------------------- */
const DesktopNavbar = () => {
  const router = useRouter();
>>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770:src/components/desktopnav/nav.jsx
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

<<<<<<<< HEAD:src/components/nav/nav.jsx


export default Nav;
========
export default DesktopNavbar;
>>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770:src/components/desktopnav/nav.jsx
