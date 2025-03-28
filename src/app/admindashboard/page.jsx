"use client";

import React, { useState } from "react";

// Import your nav components
import Nav, { MobileNavbar, MobilebottomNavbar } from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import ModeSwitcher from "@/components/admindashboard/modeswitcher";
import StatsCards from "@/components/admindashboard/statscards";
import TopPerformersTable from "@/components/admindashboard/TopPerformersTable";
import SpotlightOnImprovementTable from "@/components/admindashboard/spotlightonImprovementtable";
import StudentLoginStatus from "@/components/admindashboard/studentLoginStatus";
import TestResultDownload from "@/components/admindashboard/testresultdownload";
import LoginAttendance from "@/components/admindashboard/loginattendance";

// Import the rest of your components



export default function Page() {
  const [selectedMode, setSelectedMode] = useState("Practice");

  return (
    <div className="min-h-screen md:flex bg-white">
      {/* Mobile Navs */}
      <div className="md:hidden block">
        <MobileNavbar />
      </div>
      <div className="md:hidden block">
        <MobilebottomNavbar />
      </div>

      {/* Sidebar Section (visible on md+) */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Desktop Navbar (hidden on mobile) */}
        <Nav />

        {/* Mode Switcher */}
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
}
