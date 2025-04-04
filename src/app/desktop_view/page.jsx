"use client";

import MobileNavbar from "C:/Users/user/Desktop/EP_Admin_Frontend/src/components/moblieadminnav/nav.jsx";

import React, { useState } from "react";


import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import Sidebar from "@/components/desktopsidebar/sidebar";
import DesktopNavbar from "@/components/desktopnav/nav";
import Desktop_student from "@/components/student/desktop_student";
import Mobile_desktop_student from "@/components/Moblie/mobile_desktop_student";


const Page = () => {
  const [selectedMode, setSelectedMode] = useState("Practice"); // State to track selected mode


  return (
    <div className="min-h-screen md:flex bg-white">
    <div className="md:hidden block">
      
      <MobileNavbar/>
      <Mobile_desktop_student/>
      <MobilebottomNavbar/>
     
    </div>  

      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar/>
      </div>
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <DesktopNavbar/>
        

        <main className="hidden md:block">
          <div className="flex items-center justify-center p-4">
            <Desktop_student />
          </div>
        </main>

    
    </div>
    </div>
  );
};

export default Page;