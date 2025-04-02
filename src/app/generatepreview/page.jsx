"use client";
import React, { useState } from "react";

import GenerateTestButton from "@/components/generatepreview/generatetestbutton";
import ImageComponent from "@/components/generatepreview/imagecomponent";
import PhysicsCard from "@/components/generatepreview/physicscard";
import ChemistryCard from "@/components/generatepreview/chemistrycard";
import Scheduletest from "@/components/generatepreview/scheduletest";

import Nav,{MobileNavbar,MobilebottomNavbar} from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";


function Page() {
  
    return (
      // <div className=" md:flex bg-white">
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
        <div className="flex-1 overflow-y-auto overflow:hidden  p-4 space-y-4">

          <GenerateTestButton />
          <ImageComponent />
          < div className="flex justify-between p-4">
          <div className="min-h-screen flex justify-start items-center">
            <PhysicsCard />
          </div>
          <div className="min-h-screen  flex justify-center items-center">
            <ChemistryCard />
            </div>
      </div>
            <div className="-mt-52">
            <Scheduletest/>
          </div>
          </div>
     </div>
    </div>
  );
};

export default Page;
