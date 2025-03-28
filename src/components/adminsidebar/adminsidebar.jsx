"use client";

import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { AiOutlineEye, AiOutlineFileText } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { MdOutlineQuiz, MdOutlineScanner } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { LuFileInput } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [AdminId, setAdminId] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdminId(parsedAdmin.AdminId);
    } else {
      console.error("Admin data is not available in localStorage.");
    }
  }, []);

  const menuItems = [
    {
      label: "View Students",
      icon: <AiOutlineEye className="text-xl" />,
      href: `/viewstudents?addedByAdminId=${AdminId}`,
    },
    {
      label: "Batches",
      icon: <PiStudent className="text-xl" />,
      href: `/batches?addedByAdminId=${AdminId}`,
    },
    {
      label: "Dashboard",
      icon: <BiSolidDashboard className="text-xl" />,
      href: "/dashboard",
    },
    {
      label: "Student Test",
      icon: <MdOutlineQuiz className="text-xl" />,
      href: "/studenttest",
    },
    {
      label: "Practise Test",
      icon: <AiOutlineFileText className="text-xl" />,
      href: "/practicetest",
    },
    {
      label: "Customized Test",
      icon: <GiTestTubes className="text-xl" />,
      href: "/customizetest",
    },
    {
      label: "Generate Test",
      icon: <LuFileInput className="text-xl" />,
      href: "/papergenerator",
    },
    {
      label: "Result Page",
      icon: <FaTachometerAlt className="text-xl" />,
      href: "/resultpage",
    },
    {
      label: "Settings",
      icon: <FaCogs className="text-xl" />,
      href: "/settings/papercandidate",
    },
  ];

  return (
    <div className="hidden md:block fixed top-0 left-0 h-screen bg-[#007AFF] text-white w-1/6 z-50 shadow-md">
      {/* Logo Section */}
      <div className="pt-4 pr-4 pl-4 flex justify-center items-center py-">
        <img
          src="/signinlogomobileview.svg"
          alt="Nexcore Logo"
          className="w-40 h-24"
        />
      </div>

      {/* Navigation Menu */}
      <ul className="space-y-3 px-4 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-white/80 to-white/0 text-white"
                    : "hover:bg-gradient-to-r hover:from-white/80 hover:to-white/0 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
