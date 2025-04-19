import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi"; // Importing the filter icon
import axios from "axios"; // Import axios for API calls
import { FaRegClipboard, FaUserAlt, FaCog } from 'react-icons/fa';


const AttendanceComponent = ({ selectedMode }) => {
  const [attendanceData, setAttendanceData] = useState([]); // Store the attendance data
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  // Filter state for dropdown options
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("yearly");

  // Toggle filter dropdown visibility
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Handle filter selection
  const handleFilterSelection = (filterType) => {
    setSelectedFilter(filterType);
    setShowFilterOptions(false); // Close the dropdown after selection
  };

  // Fetch the attendance data when the component is mounted or when filter changes
  useEffect(() => {
    const studentId = localStorage.getItem("studentId"); // Retrieve studentId from localStorage
    if (!studentId) {
      setError("Student ID not found in local storage.");
      setLoading(false);
      return;
    }

    const fetchAttendanceData = async () => {
      try {
        // Ensure the API URL is correct
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/test`, {
          studentId: Number(studentId), // Send studentId as a parameter
          filterType: selectedFilter,   // Pass the selected filter to the backend
        });

        // Update the state with the fetched data
        setAttendanceData(response.data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data"); // Handle errors if the API call fails
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [selectedMode, selectedFilter]); // Re-run when selectedMode or selectedFilter changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if API call fails
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Attendance Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">
          <h2 className="text-xl text-Montserrat font-semibold">Accuracy</h2>
          {/* Attendance Percentage Circle */}
          <div className="flex justify-center items-center w-20 h-18 shadow-2xl rounded-full bg-blue-500 text-white text-xl font-semibold">
            {/* Dynamically render percentage here */}
            {attendanceData.length > 0
              ? `${((attendanceData.reduce((acc, data) => acc + data.totalAccuracy, 0) / attendanceData.length).toFixed(2))}%`
              : "0%"}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Filter Options Button */}
          <button
            onClick={toggleFilterOptions}
            className="px-6 py-2 bg-white border border-gray-300 shadow hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
          >
            <FiFilter className="text-xl text-gray-700" /> <span className="ml-2">Filter</span>
          </button>

          {/* Filter Options Dropdown */}
          {showFilterOptions && (
            <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2 border border-gray-300 right-0">
              <button
                onClick={() => handleFilterSelection("yearly")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Yearly
              </button>
              <button
                onClick={() => handleFilterSelection("monthly")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Monthly
              </button>
              <button
                onClick={() => handleFilterSelection("weekly")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Weekly
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Test Results */}
      <div className="space-y-10 mt-10">
        {attendanceData.length > 0 &&
          attendanceData.map((data, index) => (
            <div key={index} className="space-y-4">
              {/* Full Test */}
              <div className="flex gap-15 items-center">
                <div className="flex items-center">
                  {/* Full Test Icon */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <FaRegClipboard className="text-blue-500" size={40} />
                  </div>
                </div>
                <div className="flex-col w-full">
                  <span className="text-md font-semibold">Full Test: {data?.FullTestCount}</span>
                  <div className="bg-gray-200 rounded-full h-2 relative">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${data?.accuracyFull}%`,
                        backgroundColor: data?.accuracyFull > 80 ? "#16DBCC" : "#FE5C73",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm pl-6 text-gray-500">
                  {data?.highestMarkFull}/{data?.totalMarksFull}
                </span>
              </div>

              {/* Me Test */}
              <div className="flex gap-15 items-center">
                <div className="flex items-center">
                  {/* Me Test Icon */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <FaUserAlt className="text-green-500" size={40} />
                  </div>
                </div>
                <div className="flex-col w-full">
                  <span className="text-md font-semibold">Me Test: {data?.MeTestCount}</span>
                  <div className="bg-gray-200 rounded-full h-2 relative">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${data?.accuracyMe}%`,
                        backgroundColor: data?.accuracyMe > 80 ? "#16DBCC" : "#FE5C73",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm pl-6 text-gray-500">
                  {data?.highestMarkMe}/{data?.totalMarksMe}
                </span>
              </div>

              {/* Generate Test */}
              <div className="flex gap-15 items-center">
                <div className="flex items-center">
                  {/* Generate Test Icon */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <FaCog className="text-red-500" size={40} />
                  </div>
                </div>
                <div className="flex-col w-full">
                  <span className="text-md font-semibold">Generate Test: {data?.GenerateTestCount}</span>
                  <div className="bg-gray-200 rounded-full h-2 relative">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${data?.accuracyGenerate}%`,
                        backgroundColor: data?.accuracyGenerate > 80 ? "#16DBCC" : "#FE5C73",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm pl-6 text-gray-500">
                  {data?.highestMarkGenerate}/{data?.totalMarksGenerate}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AttendanceComponent;
