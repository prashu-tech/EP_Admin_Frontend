"use client";


import LoginAttendance from "@/components/admindashboard/loginattendance";
import ModeSwitcher from "@/components/admindashboard/modeswitcher";
import SpotlightOnImprovementTable from "@/components/admindashboard/spotlightonImprovementtable";
import StatsCards from "@/components/admindashboard/statscards";
import StudentLoginStatus from "@/components/admindashboard/studentLoginStatus";
import TestResultDownload from "@/components/admindashboard/testresultdownload";
import TopPerformersTable from "@/components/admindashboard/TopPerformersTable";
import MobileNavbar from "@/components/mobileadminnav/nav";
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

      {/* Mode Switcher Buttons */}
      <div className="flex justify-center mt-4">
          <ModeSwitcher selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        </div>

        <StatsCards />
        <TopPerformersTable selectedMode={selectedMode} />
        <SpotlightOnImprovementTable selectedMode={selectedMode} />
        
        <div className="flex justify-between gap-8 mt-4">
          <div className="md:pl-44 md:pr-0">
            <StudentLoginStatus />
          </div>
         
          <div className="md:pr-64 md:pl-0">
            <TestResultDownload />
          </div>                
        </div>

        <div className="flex justify-center mt-4">
          <LoginAttendance />  
        </div>

          

        
      </div>

      
    </div>
  );
};

export default Page;
