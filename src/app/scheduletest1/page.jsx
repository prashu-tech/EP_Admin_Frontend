"use client";
import React, { useState } from "react";

import MobileNavbar from "@/components/mobilenavbar/mobilenavbar";
import Nav from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";
import Scheduletest1 from "@/components/scheduletest1/scheduletest1";


function Page() {
  
    return (
      <div className=" md:flex bg-white">
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

            <div className="-mt-52">
            <Scheduletest1 />
          </div>
          
     </div>
    </div>
  );
};

export default Page;
