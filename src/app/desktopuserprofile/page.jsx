"use client";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
import DesktopNavbar from "@/components/desktopnav/nav";
import Sidebar from "@/components/desktopsidebar/sidebar";
import AttendanceComponent from "@/components/desktopuserprofile/AttendanceComponent";
import ModeSwitcheruserProfile from "@/components/desktopuserprofile/ModeSwitcher";
import ProfileCard from "@/components/desktopuserprofile/ProfileCard";
<<<<<<< HEAD
import StatsCarddesktop from "@/components/desktopuserprofile/StatsCards";
import ModeSwitcherChart from "@/components/desktopuserprofile/Subjectwiseperformance";
import MobilebottomNavbar from "@/components/mobilenav/MobileBottomNavbar";
import MobileNavbar from "@/components/mobilenav/mobilenav";
import ChapterWisePerformance from "@/components/desktopuserprofile/ChapterWisePerformance";
import TestResultDownload from "@/components/desktopuserprofile/testresultdownload";
import axios from "axios";

export default function Page() {
  const [selectedMode, setSelectedMode] = useState("Practice");
  const [subjectTotals, setSubjectTotals] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch subject totals data from the backend
  useEffect(() => {
    const fetchSubjectTotals = async () => {
      try {
        const studentId = localStorage.getItem("studentId"); // Get studentId from localStorage
        if (!studentId) {
          console.log("Student ID is missing");
          setLoading(false);
          return;
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-result`, { studentId });
        const totals = response.data.data.subjectTotals; // Assuming the API returns subjectTotals
        setSubjectTotals(totals); // Set subject totals in state
      } catch (error) {
        console.error("Error fetching subject totals:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchSubjectTotals();
  }, []);

  // Handle mode change (Practice vs Customized)
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }
=======
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
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb

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
<<<<<<< HEAD
                <ModeSwitcherChart selectedMode={selectedMode} subjectTotals={subjectTotals} />
=======
                <ModeSwitcherChart selectedMode={selectedMode} />
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
              </div>
            </div>
          </div>

<<<<<<< HEAD
=======
          <div className="mt-9 mb-6">
            <ChapterWisePerformance selectedMode={selectedMode} />
          </div>
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
        </main>

        {/* Mobile View */}
        <main className="block md:hidden">
          <MobileNavbar />
          <MobilebottomNavbar />

<<<<<<< HEAD
          <div className="block mr-5 ml-5 pb-25 mt-15 sm:hidden mx-auto bg-white rounded-lg justify-center">
            {/* Mobile content can be added here if needed */}
=======
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
>>>>>>> d853b2cede67c6e209a6dc53592ca0d8bb4354eb
          </div>
        </main>
      </div>
    </div>
  );
}
