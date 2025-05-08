"use client";

import MobileNavbar from "@/components/mobilenav/mobilenav";
import Desktopnav from "@/components/desktopnav/nav";
import Sidebar from "@/components/desktopsidebar/sidebar";
import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import React, { useState } from "react";

import Batchesmobile from "@/components/batches/batchesmobile"
import Batches from "@/components/batches/batches";

export default function page() {
  return (
    <div className="min-h-screen md:flex bg-white">
    <div className="md:hidden block">
      < MobileNavbar />
      <MobilebottomNavbar/>
    </div>  

      {/* Sidebar Section */}
      <div className="md:w-1/6 absolute">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Desktopnav />
        <div className="hidden md:block">
          <Batches/>
                </div>
                <div className="md:hidden">
                  <Batchesmobile/>
                </div>
        





    
                
      </div>

      
    </div>
  );
};

