"use client";

import Nav, { MobilebottomNavbar, MobileNavbar } from "@/components/nav/nav";


import DesktopFirstPart from "@/components/select_chapters_bio/firstpart/firstpart";
import MobileFirstPart from "@/components/select_chapters_bio/firstpart/mobilefirstpart";
import BioLastnavDesktop from "@/components/select_chapters_bio/lastnav/lastnav";
import BioLastnavMobile from "@/components/select_chapters_bio/lastnav/mobilelastnav";





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
        <div className="flex-1 overflow-y-auto  ">
          <div className="w-full">
            <DesktopFirstPart />
          </div>
       
        <div className=" block md:hidden ">
          <MobileFirstPart />
        </div>
       
        <div className=" block md:hidden ">
          <BioLastnavMobile />
        </div>
      </div>
    </div>
</div>
  );
}
