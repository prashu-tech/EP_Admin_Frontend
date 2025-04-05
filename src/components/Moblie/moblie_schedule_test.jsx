"use client";
import Head from "next/head";
import { MdOutlineSchedule } from "react-icons/md";
import React, { useState } from "react";
import { FaEye, } from "react-icons/fa6";
import { FaQuestionCircle, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Schedule_test = () => {
  const router = useRouter();
  const currentDate = "2025-04-03"; // Current date as per system instruction (April 03, 2025)

  // State for form inputs
  const [formData, setFormData] = useState({
    testDuration: "",
    scheduledAt: "",
    endsAt: "",
    showResults: "",
    selectBatch: "",
  });

  // State for table data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "2025-04-04",
      endsAt: "2025-04-06",
      resultStatus: "Instantly",
    },
    {
      id: 2,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "2025-04-04",
      endsAt: "2025-04-06",
      resultStatus: "Instantly",
    },
    {
      id: 3,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "2025-04-04",
      endsAt: "2025-04-06",
      resultStatus: "Instantly",
    },
  ]);

  // State for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    scheduledAt: "",
    endsAt: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleScheduleTestSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const resultStatus = formData.showResults.toLowerCase() === "yes" ? "Instantly" : "Not-Instantly";

    const newRow = {
      id: tableData.length + 1,
      testName: "New Test", // Since testName1 and testName2 are removed, using a default name
      batchName: formData.selectBatch,
      duration: `${formData.testDuration} Mins`,
      scheduleFrom: formData.scheduledAt,
      endsAt: formData.endsAt,
      resultStatus: resultStatus,
    };

    setTableData((prev) => [...prev, newRow]);
    setFormData({
      testDuration: "",
      scheduledAt: "",
      endsAt: "",
      showResults: "",
      selectBatch: "",
    });
  };

  // Open popup and set selected row data
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditFormData({
      scheduledAt: row.scheduleFrom,
      endsAt: row.endsAt,
    });
    setIsPopupOpen(true);
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes and update table
  const handleSaveChanges = () => {
    if (selectedRow) {
      const updatedTableData = tableData.map((row) =>
        row.id === selectedRow.id
          ? { ...row, scheduleFrom: editFormData.scheduledAt, endsAt: editFormData.endsAt }
          : row
      );
      setTableData(updatedTableData);
      setIsPopupOpen(false);
    }
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
     <div className="relative min-h-screen bg-white md:hidden">
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta name="description" content="Generate and manage tests in office mode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

          {/* Search Bar */}
        <div className="flex justify-center mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Tests"
              className="w-full px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-medium "
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

      <div className="flex flex-col items-center p-4">
        <div className="bg-white w-full">
          <div className="flex flex-col space-y-2 my-4">
            <button
              onClick={() => router.push("./test_preview")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaEye size={16} /> Test Preview
            </button>
            <button
              onClick={() => router.push("./office_mode")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaQuestionCircle size={16} /> Offline Mode
            </button>
            <button
              onClick={() => router.push("/schedule_test")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <MdOutlineSchedule size={16} /> Schedule Test
            </button>
          </div>

          <div className="flex flex-col mt-6 items-center">
            <div className="bg-white p-6 border border-[#D9D9D9] rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] w-full max-w-3xl">
              <h2 className="text-xl font-semibold mb-4 mt-2">Schedule test for Batch</h2>
              <div className="w-full border-b border-gray-300 mb-4"></div>

              <div className="flex space-x-4 mb-6">
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 text-sm text-white px-2 py-1 rounded-sm"
                >
                  Total Question: 16
                </button>
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 text-sm text-white px-2 py-1 rounded-sm"
                >
                  Question Count: 4
                </button>
              </div>

              <form onSubmit={handleScheduleTestSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Test Duration (in Minutes):</label>
                    <input
                      type="text"
                      name="testDuration"
                      value={formData.testDuration}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </div>

                  <div className="flex pt-5 flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Scheduled at:</label>
                    <input
                      type="date"
                      name="scheduledAt"
                      value={formData.scheduledAt}
                      onChange={handleInputChange}
                      min={currentDate}
                      className="block w-full p-2 border border-gray-300 rounded-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </div>

                  <div className="flex pt-5 flex-col">
                    <label className="text-sm font-medium  text-gray-700 mb-1">Ends at:</label>
                    <input
                      type="date"
                      name="endsAt"
                      value={formData.endsAt}
                      onChange={handleInputChange}
                      min={currentDate}
                      className="block w-full p-2 border border-gray-300 rounded-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Show Test Results Instantly:</label>
                    <input
                      type="text"
                      name="showResults"
                      value={formData.showResults}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Select Batch:</label>
                    <input
                      type="text"
                      name="selectBatch"
                      value={formData.selectBatch}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder=""
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setFormData({ testDuration: "", scheduledAt: "", endsAt: "", showResults: "", selectBatch: "" })}
                    className="bg-[#CEDFFC] text-black py-2 px-8 rounded-full hover:bg-[#BFD1FA] transition-colors" style={{ backgroundColor: "#D9D9D9" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#EB3D3C] text-white py-2 px-8 rounded-full hover:bg-[#D32F2F] transition-colors"
                  >
                    Create Test
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 w-full">
              <div className="p-2">
                <div className="bg-white shadow-md border rounded-lg overflow-x-auto w-full">
                  <table className="w-full table-auto min-w-[600px]">
                    <thead>
                      <tr className="bg-white text-black text-center border-b-2 uppercase text-xs">
                        <th className="py-2 px-1 w-10">ID</th>
                        <th className="py-2 px-1 w-20">TEST NAME</th>
                        <th className="py-2 px-1 w-20">BATCH</th>
                        <th className="py-2 px-1 w-16">DUR.</th>
                        <th className="py-2 px-1 w-24">FROM</th>
                        <th className="py-2 px-1 w-24">ENDS</th>
                        <th className="py-2 px-1 w-20">RESULT</th>
                        <th className="py-2 px-1 w-16">EDIT</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-xs font-light">
                      {tableData.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b text-center text-black border-black hover:bg-gray-100"
                        >
                          <td className="py-2 px-1 border-r-2 w-10">{row.id}</td>
                          <td className="py-2 px-1 border-r-2 w-20 truncate">{row.testName}</td>
                          <td className="py-2 px-1 border-r-2 w-20 truncate">{row.batchName}</td>
                          <td className="py-2 px-1 border-r-2 w-16">{row.duration}</td>
                          <td className="py-2 px-1 border-r-2 w-24">{row.scheduleFrom}</td>
                          <td className="py-2 px-1 border-r-2 w-24">{row.endsAt}</td>
                          <td className="py-2 px-1 border-r-2 w-20 truncate">{row.resultStatus}</td>
                          <td className="py-2 px-1 w-16">
                            <button
                              onClick={() => handleEditClick(row)}
                              className="border w-12 text-black px-1 rounded-sm hover:bg-gray-300 text-xs"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
  <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className=" bg-white  shadow-lg w-11/12 max-w-sm">
      <div style={{ backgroundColor: "#007AFF" }} className="py-5 px-4">
        <h2 className="text-lg font-semibold text-white ">Edit Schedule Detail</h2>
      </div>
      <div className="grid grid-cols-2  bg-white gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-xs font-medium  text-gray-700 ">Schedule at</label>
          <input
            type="date"
            name="scheduledAt"
            value={editFormData.scheduledAt}
            onChange={handleEditInputChange}
            min={currentDate}
            className="mt-1 block  p-2 border w-[160px] ml-4 border-black rounded-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: "#ffff" }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium  text-gray-700 ">End at</label>
          <input
            type="date"
            name="endsAt"
            value={editFormData.endsAt}
            onChange={handleEditInputChange}
            min={currentDate}
            className="mt-1 block w-[160px] p-2 border border-black  rounded-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: "#ffff" }}
          />
        </div>
      </div>
      
      <div className="flex justify-end bg-gray-100 p-4 mt-12 space-x-3">
        <button
          onClick={handleClosePopup}
          className="bg-gray-300 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
        <button
          onClick={handleSaveChanges}
          className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
      </div>
      </div>
    </>
  );
};

export default Schedule_test;