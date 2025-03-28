"use client";
import React from "react";
import Sidebar from "@/components/adminsidebar/adminsidebar";
import Nav from "@/components/adminnav/adminnav";
import MobileNavbar from "@/components/mobilenavbar/mobilenavbar";

import GenerateTestButton from "@/components/generatepreview/generatetestbutton";
import ImageComponent from '../../components/generatepreview/imagecomponent';
import PhysicsCard from "@/components/generatepreview/physicscard";
import ChemistryCard from "@/components/generatepreview/chemistrycard";
import Scheduletest from "@/components/generatepreview/scheduletest";

function Page() {
  
    return (
      <div className="flex min-h-screen">
        {/* Sidebar Section */}
        <div className="md:w-1/6 bg-[#007AFF]">
          <Sidebar />
        </div>
  
        {/* Main Content Section */}
        <div className="w-full md:flex-1 h-screen bg-white">
          {/* Navigation Bar */}
          <Nav />
          <MobileNavbar/>
          
          <GenerateTestButton />
          <ImageComponent />
          < div className="flex justify-between">
          <div className="min-h-screen flex justify-start items-center">
            <PhysicsCard />
          </div>
          <div className="min-h-screen  flex justify-center items-center">
            <ChemistryCard />
            </div>
            </div>

          
        </div> 
        </div> 
 );
};

export default Page;