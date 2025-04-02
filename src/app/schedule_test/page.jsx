"use client";
import MobileNavbar from "C:/Users/user/Desktop/EP_Admin_Frontend/src/components/moblieadminnav/nav.jsx";
import Nav from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useState } from "react";
import Schedule_test from "@/components/Schedule_test/Schedule_test";


const Page = () => {
  const [selectedMode, setSelectedMode] = useState("Practice"); // State to track selected mode


  return (
    <div className="min-h-screen md:flex bg-white">
    <div className="md:hidden block">
      < MobileNavbar />
    </div>  

      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Nav />

    <div>
      <Schedule_test/>
    </div>

          

        
      </div>

      
    </div>
  );
};

export default Page;