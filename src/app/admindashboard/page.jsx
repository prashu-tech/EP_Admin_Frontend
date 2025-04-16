<<<<<<< HEAD
"use client";

import React, { useState } from "react";

// Import your nav components
=======
import React, { useState } from "react";// Import your nav components
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
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
import ModeSwitchermobile from "@/components/mobileadmindashboard/modeswitcher";
import StatsCardsmobile from "@/components/mobileadmindashboard/statscards";
import TopPerformersTablemobile from "@/components/mobileadmindashboard/TopPerformersTable";
import SpotlightOnImprovementTablemobile from "@/components/desktopadmindashboard/spotlightonImprovementtable";
import TestResultDownloadmobile from "@/components/mobileadmindashboard/testresultdownload";
import StudentActivityCardmobile from "@/components/mobileadmindashboard/studentLoginStatus";

// Import the rest of your components



export default function Page() {
  const [selectedMode, setSelectedMode] = useState("Practice");

  return (
    <div className="min-h-screen md:flex bg-white">

      {/* Desktop Sidebar Section (visible on md+) */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Desktop Navbar (hidden on mobile) */}
        <DesktopNavbar />

        {/* Page Content */}
        <main className="hidden md:block"> 

        {/* Mode Switcher */}
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
          <div className="md:mr-94 md:pl-0">
            <TestResultDownload />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <LoginAttendance />
        </div>

        </main>

        {/* Mobile View */}
        <main className="block md:hidden">

        {/* Mobile Navs */}
        <MobileNavbar />

        {/* Mobile Navs */}  
        
        <MobilebottomNavbar />
       

        {/* Page Content */}

        < ModeSwitchermobile selectedMode={selectedMode} setSelectedMode={setSelectedMode} />    
        < StatsCardsmobile />
        < TopPerformersTablemobile selectedMode={selectedMode} />
        < SpotlightOnImprovementTablemobile selectedMode={selectedMode} />
        < StudentActivityCardmobile />
        < TestResultDownloadmobile />
    

     

        </main>
      </div>

      
    </div>
  );
}
