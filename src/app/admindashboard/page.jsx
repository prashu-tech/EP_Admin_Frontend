"use client";
import ModeSwitcher from "@/components/admindashboard/modeswitcher";
import SpotlightOnImprovementTable from "@/components/admindashboard/spotlightonImprovementtable";

import StatsCards from "@/components/admindashboard/statscards";
import TopPerformersTable from "@/components/admindashboard/TopPerformersTable";
import Adminnav from "@/components/adminnav/adminnav";
import Adminsidebar from "@/components/adminsidebar/adminsidebar";
import React, { useState } from "react";


function Page() {
  const [selectedMode, setSelectedMode] = useState("Practice"); // State to track selected mode

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Adminsidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Adminnav />

        {/* Mode Switcher Buttons */}
        <div className="flex justify-center mt-4">
          <ModeSwitcher selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        </div>

        < StatsCards />
        < TopPerformersTable selectedMode={selectedMode} />
        < SpotlightOnImprovementTable selectedMode={selectedMode} />
        
        <div className="flex justify-between mt-4">
        
        </div>

      </div>
    </div>
  );
}

export default Page;
