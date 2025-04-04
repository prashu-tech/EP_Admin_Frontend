"use client";

import TestResultDownload from "@/components/admindashboard/testresultdownload";
import TestManagementPart1 from "@/components/generate_test/generate_test";
import CenterText from "@/components/generate_test/generate_test";
import TestManagementTable from "@/components/generate_test/testtable";
import Nav, { MobilebottomNavbar, MobileNavbar } from "@/components/nav/nav";

import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white flex flex-col">
        {/* Navigation Bar */}
        <div className="flex-shrink-0">
          <Nav />
        </div>
        <div>
          <MobileNavbar />
        </div>
        <div>
          <MobilebottomNavbar />
        </div>
        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* FirstPart Section */}
          <div className="w-full">
            <TestManagementPart1/>
          </div>
          <div>
            <TestManagementTable/>
          </div>

         
        </div>
      </div>
    </div>
  );
}
