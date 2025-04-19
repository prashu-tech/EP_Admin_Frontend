"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { MdOutlineSchedule } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios"; // Import axios for making API calls
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import toast from "react-hot-toast";

const Schedule_test = () => {
  const router = useRouter();
  const currentDate = "2025-04-03";

  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    testName1: "",          // Default to empty string
    testName2: "",          // Default to empty string
    scheduledAt: "",        // Default to empty string
    endsAt: "",             // Default to empty string
    showResults: "",        // Default to empty string
    duration: "",           // Default to empty string
  });

  // Fetch the test data from the backend
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-data`);
        setTestData(response.data.tests); // Set the test data to state
      } catch (err) {
        console.error("Failed to fetch test data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle row edit
  const handleEditClick = (row) => {
    setEditingRow(row.id);

console.log(row)
    localStorage.setItem("testid", row.id);

    const [firstName, secondName] = row.testName ? row.testName.split(" ") : ["", ""]; // Default to empty if testName is undefined
    setFormData({
      testName1: firstName,
      testName2: secondName || "",
      scheduledAt: row.scheduleFrom || "", // Ensure it's not undefined
      endsAt: row.endsAt || "", // Ensure it's not undefined
      showResults: row.resultStatus || "", // Ensure valid value
      duration: row.duration || "", // Ensure it's not undefined
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      // Get testId from localStorage
      const testId = localStorage.getItem('testid');
  
      // Merge the test name fields (testName1 and testName2)
      const testName = `${formData.testName1} ${formData.testName2}`;
  
      // Create the payload object for the API call
      const payload = {
        testid: testId, // Test ID from localStorage
        testname: testName, // Combined Test Name
        batch_name: formData.showResults, // Replacing "Show Results Instantly" with batch name
        duration: formData.duration, // Duration
        exam_start_date: formData.scheduledAt, // Scheduled at
        exam_end_date: formData.endsAt, // Ends at
        status: "active", // Or any default status if necessary
      };
  
      // Send PUT or PATCH request to the backend API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/update-test`,
        payload
      );
  
      // Handle the response accordingly
      if (response.status === 200) {
        // Success: Handle the success response
        toast.success("Test updated successfully",{
          duration: 5000
        });
        // You may want to update the testData in the state or navigate elsewhere
      }
    } catch (error) {
      console.error("Failed to update test", error);
      toast.error("Error updating test",{
        duration: 5000
      });
    }
  };
  

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            onClick={() => router.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
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
                className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 border border-gray-300 rounded-lg text-gray-400 text-sm py-3 px-6 font-['Segoe_UI'] cursor-pointer"
              >
                Generate Test
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-10 items-center">
            <div className="bg-white p-6 rounded-md filter drop-shadow-lg shadow-[0_0_15px_5px,rgba(0,0,0,0.1)] w-full max-w-4xl">
              <h2 className="text-lg -mt-3 font-semibold">Schedule Test for Batch</h2>
              <div className="-mx-6 w-192 border border-gray-300 mb-3"></div>

              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Test Name</label>
                  <input
                    type="text"
                    name="testName1"
                    value={formData.testName1 || ""}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="invisible text-sm font-medium text-gray-700">Hidden</span>
                  <input
                    type="text"
                    name="testName2"
                    value={formData.testName2 || ""}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Scheduled at:</label>
                  <input
                    type="date"
                    name="scheduledAt"
                    value={formData.scheduledAt || ""}
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
                    value={formData.endsAt || ""}
                    onChange={handleInputChange}
                    min={currentDate}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm text-gray-500"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Batch name:</label>
                  <input
                    type="text"
                    name="showResults"
                    value={formData.showResults || ""}
                    onChange={handleInputChange}
                    className="mt-1 block -mx-3 w-full p-1 border border-gray-300 rounded-sm"
                    placeholder="Batch"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm -mx-3 font-medium text-gray-700">Duration:</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full -mx-3 p-1 border border-gray-300 rounded-sm"
                    placeholder=""
                    style={{ backgroundColor: "#D9D9D9" }}
                  />
                </div>
              </div>
            </div>

            {editingRow ? (
              <div className="flex justify-end mt-4 bg-gray-100 p-4 space-x-4">
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-black px-8 py-2 rounded-md cursor-pointer"
                  style={{ backgroundColor: "#D9D9D9" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-red-500 text-white px-4 mr-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            ) : null}

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
                      {testData.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b text-center text-black border-black hover:bg-gray-100"
                        >
                          <td className="py-4 px-2 border-r-2 w-12 font-roboto">{row.id}</td>
                          <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.testname}</td>
                          <td className="py-4 px-2 border-r-2 w-32 truncate font-roboto">{row.batch_name}</td>
                          <td className="py-4 px-2 border-r-2 w-28 font-roboto">{row.duration}</td>
                          <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.exam_start_date}</td>
                          <td className="py-4 px-2 border-r-2 w-36 font-roboto">{row.exam_end_date}</td>
                          <td className="py-4 px-2 border-r-2 w-32 font-roboto">{row.status}</td>
                          <td className="py-4 px-2 w-28 font-roboto">
                            <button
                              onClick={() => handleEditClick(row)} // Trigger edit and set testid in localStorage
                              className="border w-20 text-black px-4 rounded-sm hover:bg-gray-300 whitespace-nowrap text-xs cursor-pointer"
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
      </div>
    </>
  );
};

export default Schedule_test;
