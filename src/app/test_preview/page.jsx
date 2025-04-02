"use client";

import TestPreview from "@/components/Action_test_preview/Test_preview";
import MobileNavbar from "@/components/moblieadminnav/nav";
import Nav from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useState } from "react";


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

        <TestPreview/>

        

      

          

        
      </div>

      
    </div>
  );
};

export default Page;
