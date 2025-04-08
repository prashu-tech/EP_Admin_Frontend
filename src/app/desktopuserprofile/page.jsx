"use client";
import React, { useState } from "react";
import DesktopNavbar from "@/components/desktopnav/nav";
import Sidebar from "@/components/desktopsidebar/sidebar";
import AttendanceComponent from "@/components/desktopuserprofile/AttendanceComponent";
import ModeSwitcheruserProfile from "@/components/desktopuserprofile/ModeSwitcher";
import ProfileCard from "@/components/desktopuserprofile/ProfileCard";
import StatsCarddesktop from "@/components/desktopuserprofile/StatsCard";
import ModeSwitcherChart from "@/components/desktopuserprofile/Subjectwiseperformance";
import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import MobileNavbar from "@/components/mobilenav/mobilenav";
import AttendanceComponentmobile from "@/components/mobileuserprofile/AttendanceComponent";
import ModeSwitcheruserProfileMobile from "@/components/mobileuserprofile/ModeSwitcher";
import ProfileCardmobile from "@/components/mobileuserprofile/ProfileCard";
import StatsCardmobile from "@/components/mobileuserprofile/StatsCard";
import ChapterWisePerformance from "@/components/desktopuserprofile/ChapterWisePerformance";
import TestResultDownload from "@/components/desktopuserprofile/testresultdownload";
import TestResultDownloadmobile from "@/components/mobileuserprofile/testresultdownload";
import ModeSwitcherChartMobile from "@/components/mobileuserprofile/ModeSwitcherChartMobile";
import ChapterWisePerformancemobile from "@/components/mobileuserprofile/ChapterWisePerformance";

export default function Page() {
  const [selectedMode, setSelectedMode] = useState("Practice");

  return (
    <div className="min-h-screen md:flex bg-white">
      {/* Desktop Sidebar Section (visible on md+) */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Desktop navbar Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Desktop Navbar (hidden on mobile) */}
        <DesktopNavbar />

        {/* Page Content */}
        <main className="hidden md:block">
          {/* Mode Switcher Buttons Component */}
          <ModeSwitcheruserProfile
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />

          {/* Main Content */}
          <div className="max-w-6xl mx-auto bg-white shadow-[1px_1px_5px_lightgray] rounded-lg mt-14">
            <ProfileCard />
            <StatsCarddesktop />
            <AttendanceComponent selectedMode={selectedMode} />

            <div className="flex justify-center items-center mt-5 mb-5 pr-[8rem] pl-[8rem] gap-10">
              <TestResultDownload />

              <div className="shadow-lg pb-9 mb-9">
                {/* ModeSwitcherChart Component */}
                <ModeSwitcherChart selectedMode={selectedMode} />
              </div>
            </div>
          </div>

          <div className="mt-9 mb-6">
            <ChapterWisePerformance selectedMode={selectedMode} />
          </div>
        </main>

        {/* Mobile View */}
        <main className="block md:hidden">
          <MobileNavbar />
          <MobilebottomNavbar />

          <ModeSwitcheruserProfileMobile
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />

          <div className="block mr-5 ml-5 mb-5 mt-15 sm:hidden mx-auto bg-white shadow-[1px_1px_5px_gray] rounded-lg justify-center">
            <ProfileCardmobile />
            <StatsCardmobile />
            <AttendanceComponentmobile selectedMode={selectedMode} />
            < TestResultDownloadmobile />
            < ModeSwitcherChartMobile selectedMode={selectedMode} />
          </div>
          <div className="block mr-5 ml-5 pb-25 mt-15 sm:hidden mx-auto bg-white rounded-lg justify-center">
            < ChapterWisePerformancemobile selectedMode={selectedMode} />
          </div>
        </main>
      </div>
    </div>
  );
}
