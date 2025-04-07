"use client";


<<<<<<< HEAD
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
=======
// Import your nav components

import ModeSwitcher from "@/components/desktopadmindashboard/modeswitcher";
import StatsCards from "@/components/desktopadmindashboard/statscards";
import TopPerformersTable from "@/components/desktopadmindashboard/TopPerformersTable";
import SpotlightOnImprovementTable from "@/components/desktopadmindashboard/spotlightonImprovementtable";
import StudentLoginStatus from "@/components/desktopadmindashboard/studentLoginStatus";
import TestResultDownload from "@/components/desktopadmindashboard/testresultdownload";
import LoginAttendance from "@/components/desktopadmindashboard/loginattendance";
import MobileNavbar from "@/components/mobilenav/mobilenav";
import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import Sidebar from "@/components/desktopsidebar/sidebar";
import DesktopNavbar from "@/components/desktopnav/nav";

// Import the rest of your components
>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770


const Page = () => {
  const [selectedMode, setSelectedMode] = useState("Practice"); // State to track selected mode


  return (
    <div className="min-h-screen md:flex bg-white">
<<<<<<< HEAD
    <div className="md:hidden block">
      < MobileNavbar />
    </div>  

      {/* Sidebar Section */}
=======

      {/* Desktop Sidebar Section (visible on md+) */}
>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Desktop navbar Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
<<<<<<< HEAD
        {/* Navigation Bar */}
        <Nav />
=======
        {/* Desktop Navbar (hidden on mobile) */}
        <DesktopNavbar />

        {/* Page Content */}
        <main className="hidden md:block"> 
>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770

      {/* Mode Switcher Buttons */}
      <div className="flex justify-center mt-4">
          <ModeSwitcher selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        </div>

        <StatsCards />
        <TopPerformersTable selectedMode={selectedMode} />
        <SpotlightOnImprovementTable selectedMode={selectedMode} />
        
        <div className="flex justify-between gap-8 mt-4">
          <div className="md:ml-60 md:pr-0 md:mr-7">
            <StudentLoginStatus />
          </div>
<<<<<<< HEAD
         
          <div className="md:pr-64 md:pl-0">
=======
          <div className="md:mr-94 md:pl-0">
>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770
            <TestResultDownload />
          </div>                
        </div>

        <div className="flex justify-center mt-4">
          <LoginAttendance />  
        </div>

<<<<<<< HEAD
          

        
=======
        </main>


        {/* Mobile View */}
        <main className="block md:hidden">

        {/* Mobile Navs */}
        <MobileNavbar />

        {/* Mobile Navs */}  
        <MobilebottomNavbar />

        {/* Page Content */}
     

        </main>
>>>>>>> e6bc994be5901469b6c5b6faa1b4cd8886929770
      </div>

      
    </div>
  );
};

export default Page;
