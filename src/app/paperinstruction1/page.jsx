"use client";
import React from "react";

import Nav,{MobileNavbar,MobilebottomNavbar} from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import PaperInstruction1 from "@/components/paperinstruction1/paperinstruction1";

function Page() {
  
    return (
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex h-screen bg-white flex flex-col">
        {/* Navigation Bar */}
        <div className="flex-shrink-0">
        <Nav />
        </div>
        <div className="md:hidden block">
          <MobileNavbar />
        </div>
        <div className="md:hidden block">
          <MobilebottomNavbar />
        </div>
        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <PaperInstruction1/>
        </div>
     </div>
     </div>
  );
};

export default Page;
