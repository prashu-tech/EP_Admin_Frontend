"use client";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosEye, IoIosListBox, IoIosPaper, IoIosClock } from "react-icons/io";

const Scheduletest1 = () => {
  const [testDetails, setTestDetails] = useState([]);
  const [formData, setFormData] = useState({
    testName: "",
    duration: "",
    scheduledAt: "",
    endsAt: "",
    batch: "",
    showResults: "Yes",
    shuffleQuestions: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleScheduleTest = () => {
    if (formData.testName && formData.scheduledAt && formData.endsAt) {
      setTestDetails([
        ...testDetails,
        { ...formData, id: testDetails.length + 1 },
      ]);
      setFormData({
        testName: "",
        duration: "",
        scheduledAt: "",
        endsAt: "",
        batch: "",
        showResults: "Yes",
        shuffleQuestions: false,
      });
    } else {
      alert("Please fill all required fields!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => console.log("Back button pressed")}
        className="bg-[#007AFF] text-white p-2 rounded-full mb-6 w-10 h-10 flex items-center justify-center"
      >
        <IoIosArrowBack size={24} />
      </button>

      {/* Generate Test Box */}
      <div className="bg-[#007AFF] text-white rounded-lg mb-8 text-center w-full max-w-[200px] mx-auto py-2">
        Schedule Test
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a
          href="viewtestdetails"
          className="bg-[#ffbb38] text-white py-2 px-4 md:px-8 rounded-lg w-full max-w-[200px] text-center flex items-center justify-center gap-2 text-[24px] "
        >
          <IoIosListBox size={20} /> View Test Details
        </a>
        <a
          href="testpreviewpage"
          className="bg-[#ffbb38] text-white py-2 px-4 md:px-8 rounded-lg w-full max-w-[200px] text-center flex items-center justify-center gap-2"
        >
          <IoIosEye size={20} /> Test Preview
        </a>
        <a
          href="GenerateQuestionPaperPage"
          className="bg-[#FFBB38] text-white py-2 px-4 md:px-8 rounded-lg w-full max-w-[200px] text-center flex items-center justify-center gap-2"
        >
          <IoIosPaper size={20} /> View Test Questions
        </a>
        <a
          href="scheduletest"
          className="bg-[#007AFF] text-white py-2 px-4 md:px-6 rounded-lg w-full max-w-[200px] text-center flex items-center justify-center gap-2"
        >
          <IoIosClock size={8} /> Schedule Testh
        </a>
      </div>


        {/* Top Section */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Schedule Test for Batch
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-blue-100 text-blue-800 p-4 rounded">
              <h3 className="font-semibold">Total Marks:</h3>
              <p className="text-lg">16</p>
            </div>
            <div className="flex-1 bg-blue-100 text-blue-800 p-4 rounded">
              <h3 className="font-semibold">Question Count:</h3>
              <p className="text-lg">4</p>
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-black ">
                Test Name
              </label>
              <input
                type="text"
                name="testName"
                value={formData.testName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black "
                placeholder="Enter test name"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-semibold mb-1">
                Test Duration (in Minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                placeholder="Enter duration"
              />
            </div>
            <div>
              <label className="block text-sm text-black font-semibold mb-1">
                Scheduled At
              </label>
              <input
                type="date"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black  "
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-black">
                Ends At
              </label>
              <input
                type="date"
                name="endsAt"
                value={formData.endsAt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black "
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-black">
                Show Test Results Instantly
              </label>
              <select
                name="showResults"
                value={formData.showResults}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black "
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-black ">
                Select Batch
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black "
                placeholder="Enter batch"
              />
            </div>
          </form>

          {/* Shuffle Questions */}
          <div className="flex items-center mt-4 text-black ">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="shuffleQuestions"
                checked={formData.shuffleQuestions}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span>Shuffle Questions</span>
            </label>
          </div>

          {/* Schedule Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleScheduleTest}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Schedule Test
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg overflow-x-auto rounded-lg">
          <table className="w-full  border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-blue-500 text-white rounded-t-lg">
                <th className="py-2 px-4 rounded-tl-3xl ">ID</th>
                <th className="py-2">Test Name</th>
                <th className="py-2">Batch Name</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Schedule From</th>
                <th className="py-2">Ends At</th>
                <th className="py-2">Result Status</th>
                <th className="py-2 rounded-tr-3xl pr-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testDetails.map((test) => (
                <tr key={test.id}>
                  <td className="border py-2 text-black">{test.id}</td>
                  <td className="border py-2 px-4 text-black ">{test.testName}</td>
                  <td className="border py-2 px-4 text-black ">{test.batch}</td>
                  <td className="border py-2 px-4 text-black ">{test.duration} mins</td>
                  <td className="border py-2 px-4 text-black ">{test.scheduledAt}</td>
                  <td className="border py-2 px-4 text-black ">{test.endsAt}</td>
                  <td className="border py-2 px-4 text-black ">{test.showResults}</td>
                  <td className="border py-2 px-4 text-black ">
                    <button
                      onClick={() => handleEdit(test)}
                      className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mb-[28px] ">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-black ">Edit Schedule Detail</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-black ">Schedule At</label>
                  <input
                    type="date"
                    name="scheduledAt"
                    value={editData.scheduledAt || ""}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-black "
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-black ">Ends At</label>
                  <input
                    type="date"
                    name="endsAt"
                    value={editData.endsAt || ""}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded text-black "
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black "
                >
                  Close
                </button>
                <button
                  onClick={saveChanges}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Scheduletest1;
  