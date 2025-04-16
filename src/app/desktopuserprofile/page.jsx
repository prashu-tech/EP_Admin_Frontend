"use client";
import React, { useEffect, useState } from "react";
import DesktopNavbar from "@/components/desktopnav/nav";
import Sidebar from "@/components/desktopsidebar/sidebar";
import AttendanceComponent from "@/components/desktopuserprofile/AttendanceComponent";
import ModeSwitcheruserProfile from "@/components/desktopuserprofile/ModeSwitcher";
import ProfileCard from "@/components/desktopuserprofile/ProfileCard";
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
                <ModeSwitcherChart selectedMode={selectedMode} subjectTotals={subjectTotals} />
              </div>
            </div>
          </div>

        </main>

        {/* Mobile View */}
        <main className="block md:hidden">
          <MobileNavbar />
          <MobilebottomNavbar />

          <div className="block mr-5 ml-5 pb-25 mt-15 sm:hidden mx-auto bg-white rounded-lg justify-center">
            {/* Mobile content can be added here if needed */}
          </div>
        </main>
      </div>
    </div>
  );
}
