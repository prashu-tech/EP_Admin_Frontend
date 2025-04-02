"use client";
import Home from "@/components/Action_offline_mode/Office_mode";
import MobileNavbar from "C:/Users/user/Desktop/EP_Admin_Frontend/src/components/moblieadminnav/nav.jsx";
import Nav from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useState } from "react";
import Mobile_office_mode from "@/components/Moblie/moblie_office_mode";
import MobileOfficeMode from "@/components/Action_test_preview/Test_preview";


const Page = () => {
  const [selectedMode, setSelectedMode] = useState("Practice"); // State to track selected mode


  return (
    <div className="min-h-screen md:flex bg-white">
    <div className="md:hidden block">
      < MobileNavbar />
      <MobileOfficeMode/>
     
    </div>  

      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Nav />
        

        <main className="hidden md:block">
          <div className="flex items-center justify-center p-4">
            <Home />
          </div>
        </main>

    
    </div>
    </div>
  );
};

export default Page;