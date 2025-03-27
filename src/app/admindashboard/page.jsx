"use client";

import MobileTopBar from "@/components/mobiletopbar/mobiletopbar";
import Nav from "@/components/nav/nav";
import Sidebar from "@/components/sidebar/sidebar";


const Page = () => {

  return (
    <div className="min-h-screen md:flex bg-white">
      <MobileTopBar />

      {/* Sidebar Section */}
      <div className="md:w-1/6 bg-[#007AFF]">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-full md:w-5/6 md:flex-1 h-screen bg-white">
        {/* Navigation Bar */}
        <Nav />

        
      </div>

      
    </div>
  );
};

export default Page;
