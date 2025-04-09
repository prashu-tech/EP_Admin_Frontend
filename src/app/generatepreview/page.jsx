"use client";
import React, { useState } from "react";

//Desktop components
import GenerateTestButton from "@/components/generatepreview/generatetestbutton";
import ImageComponent from "@/components/generatepreview/imagecomponent";
import PhysicsCard from "@/components/generatepreview/physicscard";
import ChemistryCard from "@/components/generatepreview/chemistrycard";
import Scheduletest from "@/components/generatepreview/scheduletest";

//Navigation components
import DesktopNavbar from "@/components/desktopnav/nav";
import Sidebar from "@/components/desktopsidebar/sidebar";
import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import MobileNavbar from "@/components/mobilenav/mobilenav";

//Mobile components
import GenerateTestButton_mobile from "@/components/generatepreview/generatetestbutton";
import ImageComponent_mobile from "@/components/generatepreview/imagecomponent_mobile";
import PhysicsCard_mobile from "@/components/generatepreview/physicscard_mobile";
import ChemistryCard_mobile from "@/components/generatepreview/chemistrycard_mobile";
import Scheduletest_mobile from "@/components/generatepreview/scheduletest_mobile";

function Page() {
  return (
    <div className="min-h-screen md:flex bg-white overflow-x-hidden">
      {/* Desktop Sidebar Section (visible on md+) */}
      <div className="md:w-1/6">
        <Sidebar />
      </div>

      {/* Desktop navbar Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Desktop Navbar (hidden on mobile) */}
        <DesktopNavbar />

        {/* Page Content */}
        <main className="hidden md:block">
          {/* Scrollable Content Section */}
          <div className="flex-1  space-y-4">
            <GenerateTestButton />

            <div>
              <ImageComponent />
            </div>

            <div className="flex justify-between ">
              <div className="min-h-screen flex justify-start items-center">
                <PhysicsCard />
              </div>
              <div className="min-h-screen  flex justify-center items-center">
                <ChemistryCard />
              </div>
            </div>
            <div className="-mt-52">
              <Scheduletest />
            </div>
          </div>
        </main>

        {/* Mobile View */}
        <main className="block md:hidden">
          {/* Mobile Navs */}
          <MobileNavbar />

          {/* Mobile Navs */}
          <MobilebottomNavbar />

          {/* Page Content */}
          <div className=" hidden ">
            <GenerateTestButton_mobile />
          </div>
          <div className="block">
            <ImageComponent_mobile />
          </div>
          <div className="md:hidden">
            <PhysicsCard_mobile />
          </div>
          <div className="md:hidden">
            <ChemistryCard_mobile />
          </div>
          <div className="md:hidden">
            <Scheduletest_mobile />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
