'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

const Nav = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect clicks outside

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleLogoutClick = () => {
    localStorage.clear(); // Clear all data from localStorage
    router.push('/'); // Redirect to home page after logout
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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden md:flex h-[90px] bg-gradient-to-r from-blue-100 to-yellow-100 p-4 items-center justify-end relative">
      {/* Right Section with Profile Image */}
      <div className="flex items-center space-x-4 mr-4">
        <img
          src="/profilphoto.png" // Update with your profile image path
          alt="Profile"
          className="w-16 h-16 rounded-2xl border border-gray-300 cursor-pointer"
          onClick={toggleDropdown} // Toggle dropdown on click
        />
        {isDropdownOpen && (
          <div
            ref={dropdownRef} // Attach ref to the dropdown
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

export default Nav;
