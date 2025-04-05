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
  const [AdminId, setAdminId] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("admin");

      if (storedAdmin) {
        try {
          const parsedAdmin = JSON.parse(storedAdmin);
          if (parsedAdmin?.AdminId) {
            setAdminId(parsedAdmin.AdminId);
          } else {
            console.warn("AdminId is missing in admin object.");
          }
        } catch (err) {
          console.error("Failed to parse admin from localStorage:", err);
        }
      } else {
        console.warn("Admin data is not available in localStorage.");
      }
    }
  }, []);

  const menuItems = [
    {
      label: "View Students",
      icon: <AiOutlineEye className="text-xl" />,
      href: "/view_student",
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
      href: "/Practisetest",
    },
    {
      label: "Customized Test",
      icon: <GiTestTubes className="text-xl" />,
      href: "/Customize",
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
      href: "/paper_candidate_field",
    },
  ];

  return (
    <div className="hidden md:block fixed top-0 left-0 h-screen bg-[#007AFF] text-white w-1/6 z-50 shadow-md">
      {/* Logo Section */}
      <div className="pt-4 pr-4 pl-4 flex justify-center items-center">
        <img
          src="/signinlogomobileview.svg"
          alt="Nexcore Logo"
          className="w-40 h-24"
        />
      </div>

      {/* Navigation Menu */}
      <ul className="space-y-1 px-4 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 transparent-scrollbar">
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

        {/* Conditional Rendering: Only show if AdminId exists */}
        {AdminId && (
          <li>
            <Link
              href={`/batches?addedByAdminId=${AdminId}`}
              className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition duration-200 hover:bg-gradient-to-r hover:from-white/80 hover:to-white/0 hover:text-white"
            >
              <PiStudent className="text-xl" />
              <span className="text-lg">Batches</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
