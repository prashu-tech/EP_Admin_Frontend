import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaDownload, FaExclamationTriangle, FaEye, FaEyeSlash } from "react-icons/fa";
import * as XLSX from 'xlsx';

const StudentActivityCard = () => {
  const [studentData, setStudentData] = useState({ studentCount: 0, studentProfiles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false); // State to handle showing more profiles
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Define a set of letters to display as initials
  const initialsSet = ["P", "R", "S", "V", "T", "A", "B", "C", "D", "E"];

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout/studentslogged`);
        const data = await response.json();

        if (data.success) {
          setStudentData({
            studentCount: data.data.studentCount,
            studentProfiles: data.data.studentProfiles,
          });
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const circleColors = [
    "bg-red-500", "bg-blue-600", "bg-green-600", "bg-yellow-500", "bg-purple-600",
    "bg-pink-500", "bg-indigo-600", "bg-teal-500", "bg-orange-500", "bg-cyan-600"
  ];  // Define vibrant colors for cycling

  // Function to download student data as Excel
  const downloadExcel = () => {
    setDownloadLoading(true);
    
    try {
      // Prepare data for Excel
      const data = studentData.studentProfiles.map((profile) => ({
        "Student ID": profile.studentId || "N/A",
        "Name": profile.fullName || "N/A",
        "Email": profile.email || "N/A",
        "Last Login Date": profile.lastLoginDate || "Never",
        "Days Inactive": profile.daysInactive || "N/A",
        "Batch": profile.batchName || "N/A"
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Inactive Students");

      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      const filename = `inactive_students_${date}.xlsx`;

      // Download the Excel file
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error("Failed to download Excel:", err);
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative p-6 shadow-lg w-full sm:w-[30rem] max-w-4xl mx-auto mt-8 bg-white rounded-xl flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative p-6 shadow-lg w-full sm:w-[30rem] max-w-4xl mx-auto mt-8 bg-red-50 rounded-xl">
        <div className="flex items-center justify-center flex-col gap-3 text-red-500 py-6">
          <FaExclamationTriangle className="text-4xl" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // Show 10 profiles by default
  const profilesToDisplay = showMore ? studentData.studentProfiles : studentData.studentProfiles.slice(0, 10);
  
  // Calculate remaining profiles count
  const remainingProfiles = studentData.studentProfiles.length - 10;

  return (
    <div
      className="relative p-6 shadow-lg w-full sm:w-[30rem] max-w-4xl mx-auto mt-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl overflow-hidden"
    >
      <div className="bg-[#007AFF] top-0 right-0 left-0 h-full opacity-10" 
           style={{ backgroundImage: `url('/Vector 1.svg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      
      {/* Header with title and download button */}
      <div className="flex justify-between items-start mb-16 relative z-10">
        <h2 className="text-white text-2xl font-bold">
          Inactive Students
          <p className="text-white text-sm font-normal opacity-80 mt-1">Not logged in for last 7 days</p>
        </h2>
        
        <button 
          onClick={downloadExcel}
          disabled={downloadLoading}
          className="bg-white hover:bg-red-50 text-red-500 px-3 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md"
        >
          {downloadLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
          ) : (
            <FaDownload />
          )}
          <span className="font-medium">Export</span>
        </button>
      </div>

      {/* Profile Icons Row */}
      <div className="flex items-center relative z-10">
        <div className="flex items-center bg-white p-2 px-3 rounded-lg shadow-lg flex-wrap gap-y-2">
          {profilesToDisplay.map((profile, index) => {
            const randomLetter = initialsSet[index % initialsSet.length]; // Get letter for initials
            const circleColor = circleColors[index % circleColors.length]; // Cycle through colors dynamically
            return (
              <div
                key={index}
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold -mr-2 border-2 border-white ${circleColor} relative group`}
                style={{ backgroundImage: profile.profileImage ? `url(${profile.profileImage})` : "none", backgroundSize: 'cover' }}
              >
                {/* Display a letter if no profile image */}
                {!profile.profileImage && randomLetter}
                
                {/* Tooltip on hover */}
                <div className="bg-[#007AFF] bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-800 text-white text-xs py-1 px-2 rounded hidden group-hover:block z-20">
                  {profile.fullName || "Unknown Student"}
                </div>
              </div>
            );
          })}
          
          {/* Show "+ more" indicator if there are remaining profiles */}
          {!showMore && remainingProfiles > 0 && (
            <div 
              onClick={() => setShowMore(true)}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-xs font-semibold border-2 border-white cursor-pointer hover:bg-gray-200 transition-all"
            >
              +{remainingProfiles}
            </div>
          )}
        </div>
      </div>

      {/* Total count box */}
      <div className="bg-[#007AFF] right-6 top-24 flex items-center space-x-3 bg-white p-4 rounded-lg shadow-xl transform translate-y-1/2 z-10">
        <span className="text-red-500 text-3xl"><AiOutlineUserAdd /></span>
        <div className="flex flex-col">
          <h3 className="text-3xl font-semibold text-gray-800 flex justify-center">{studentData.studentCount}</h3>
          <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
        </div>
      </div>

      {/* Toggle button */}
      {studentData.studentProfiles.length > 10 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full transition-all shadow-md"
          >
            {showMore ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
            <span>{showMore ? "Show Less" : "View All Students"}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentActivityCard;