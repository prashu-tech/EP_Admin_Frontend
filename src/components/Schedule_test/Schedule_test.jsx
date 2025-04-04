"use client";
import Head from "next/head";
import { MdOutlineSchedule } from "react-icons/md";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Schedule_test = () => {
  const router = useRouter();
  const currentDate = "2025-04-03"; // Current date as per system instruction (April 03, 2025)

  // State for form inputs
  const [formData, setFormData] = useState({
    testName1: "",
    testName2: "",
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
    {
      id: 4,
      testName: "Chem Mock",
      batchName: "Morning B1",
      duration: "90 Mins",
      scheduleFrom: "2025-04-04",
      endsAt: "2025-04-06",
      resultStatus: "Instantly",
    },
    {
      id: 5,
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

    const fullTestName = `${formData.testName1} ${formData.testName2}`.trim();
    const resultStatus = formData.showResults.toLowerCase() === "yes" ? "Instantly" : "Not-Instantly";

    const newRow = {
      id: tableData.length + 1,
      testName: fullTestName,
      batchName: formData.selectBatch,
      duration: "90 Mins",
      scheduleFrom: formData.scheduledAt,
      endsAt: formData.endsAt,
      resultStatus: resultStatus,
    };

    setTableData((prev) => [...prev, newRow]);
    setFormData({
      testName1: "",
      testName2: "",
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
      <Head>
        <title>Office Mode - Test Generator</title>
        <meta name="description" content="Generate and manage tests in office mode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative">
        <div className="absolute top-4 left-4 z-50 hidden md:block">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-lg flex items-center justify-center"
          >
            <IoIosArrowBack size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl">
          <div className="flex justify-center mb-4">
            <div className="flex justify-center hidden md:block mb-4 pt-0">
              <button
                onClick={() => router.push("/generate-test")}
                className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 border border-gray-300 rounded-lg text-gray-400 text-sm py-3 px-6 font-['Segoe_UI']"
              >
                Generate Test
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 my-4">
            <button
              onClick={() => router.push("./test_preview")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaEye size={20} /> Test Preview
            </button>
            <button
              onClick={() => router.push("./office_mode")}
              style={{ backgroundColor: "#FFBB38" }}
              className="text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600"
            >
              <FaQuestionCircle size={20} /> Offline Mode
            </button>
            <button
              onClick={() => router.push("/schedule_test")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2"
            >
              <MdOutlineSchedule size={20} /> Schedule Test
            </button>
          </div>

          <div className="flex flex-col mt-10 items-center">
            <div className="bg-white p-6 rounded-md filter drop-shadow-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] w-full max-w-4xl">
              <h2 className="text-lg -mt-3 font-semibold">Schedule test for Batch</h2>
              <div className="-mx-6 w-192 border border-gray-300 mb-3"></div>

              <div className="flex space-x-4 mb-4">
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 text-sm text-white px-1 py-1 rounded-sm"
                >
                  Total Question:16
                </button>
                <button
                  style={{ backgroundColor: "#007AFF80" }}
                  className="bg-blue-100 -mx-3 text-sm text-white px-1 py-1 rounded-sm"
                >
                  Question Count:4
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Test Name</label>
                  <input
                    type="text"
                    name="testName1"
                    value={formData.testName1}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="invisible text-sm font-medium text-gray-700">Hidden</span>
                  <input
                    type="text"
                    name="testName2"
                    value={formData.testName2}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Scheduled at:</label>
                  <input
                    type="date"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleInputChange}
                    min={currentDate}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm text-gray-500"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Ends at:</label>
                  <input
                    type="date"
                    name="endsAt"
                    value={formData.endsAt}
                    onChange={handleInputChange}
                    min={currentDate}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm text-gray-500"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Show Test Results Instantly:</label>
                  <input
                    type="text"
                    name="showResults"
                    value={formData.showResults}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder="Yes/No"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Select Batch:</label>
                  <input
                    type="text"
                    name="selectBatch"
                    value={formData.selectBatch}
                    onChange={handleInputChange}
                    className="mt-1 block w-full -mx-3 p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleScheduleTestSubmit}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              SCHEDULE TEST
            </button>

            <div className="mt-8 w-full min-w-[950px]">
              <div className="p-4">
                <div className="bg-white shadow-md border rounded-lg overflow-hidden w-full mx-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-white text-black text-center border-b-2 uppercase text-xs leading-tight">
                        <th className="py-4 px-2 w-12">ID</th>
                        <th className="py-4 px-2 w-32">TEST NAME</th>
                        <th className="py-4 px-2 w-32">BATCH NAME</th>
                        <th className="py-4 px-2 w-28">DURATION</th>
                        <th className="py-4 px-2 w-36">SCHEDULE FROM</th>
                        <th className="py-4 px-2 w-36">ENDS AT</th>
                        <th className="py-4 px-2 w-32">RESULT STATUS</th>
                        <th className="py-4 px-2 w-28">RESCHEDULE</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-xs font-light">
                      {tableData.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b text-center text-black border-black hover:bg-gray-100"
                        >
                          <td className="py-4 px-2 border-r-2 w-12 font-roboto">{row.id}</td>
                          <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.testName}</td>
                          <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.batchName}</td>
                          <td className="py-4 px-2 border-r-2 w-28 font-roboto">{row.duration}</td>
                          <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.scheduleFrom}</td>
                          <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.endsAt}</td>
                          <td className="py-4 px-2 border-r-2 w-32 font-roboto">{row.resultStatus}</td>
                          <td className="py-4 px-2 w-28 font-roboto">
                            <button
                              onClick={() => handleEditClick(row)}
                              className="border w-20 text-black px-4 rounded-sm hover:bg-gray-300 whitespace-nowrap text-xs"
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
          <div className="fixed inset-0  bg-opacity-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white  rounded-lg shadow-lg w-full max-w-md">
              <div style={{ backgroundColor: "#007AFF" }} className="py-2 px-4 ">
                <h2 className="text-lg font-semibold text-white">Edit Schedule Detail</h2>
              </div>
              <div className="grid p4 grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium ml-4 text-gray-700">Schedule at:</label>
                  <input
                    type="date"
                    name="scheduledAt"
                    value={editFormData.scheduledAt}
                    onChange={handleEditInputChange}
                    min={currentDate}
                    className="mt-1 block w-[190px] ml-4 p-1 border border-gray-300 rounded-sm "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium ml-2 text-gray-700">End at:</label>
                  <input
                    type="date"
                    name="endsAt"
                    value={editFormData.endsAt}
                    onChange={handleEditInputChange}
                    min={currentDate}
                    className="mt-1 block w-[190px] ml-2 p-1 border border-gray-300 rounded-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-12   bg-gray-100  p-4  space-x-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-gray-300 text-black px-8 py-2 rounded-md"style={{ backgroundColor: "#D9D9D9" }}
                >
                  Close
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-red-500 text-white px-4 mr-6  py-2 rounded-md hover:bg-red-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Schedule_test;