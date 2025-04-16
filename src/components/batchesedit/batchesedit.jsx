"use client";
import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse"; // To parse CSV files

const UpdateBatchForm = () => {
  const [batchId, setBatchId] = useState("");
  const [batchName, setBatchName] = useState("");
  const [noOfStudents, setNoOfStudents] = useState(""); // New state for number of students
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleBatchIdChange = (e) => setBatchId(e.target.value);
  const handleBatchNameChange = (e) => setBatchName(e.target.value);
  const handleNoOfStudentsChange = (e) => setNoOfStudents(e.target.value); // Handle the number of students input
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate the fields
    if (!batchId || !batchName || !noOfStudents) {
      setError("Batch ID, Batch Name, and Number of Students are required");
      return;
    }

    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    // Read the CSV file
    Papa.parse(file, {
      complete: async (result) => {
        const emailAddresses = result.data.map((row) => row[0]); // Assuming email is in the first column of the CSV

        if (emailAddresses.length === 0) {
          setError("No email addresses found in the CSV file");
          return;
        }

        try {
          // Send the emails, batchId, and batchName to the backend
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/update`, {
            emails: emailAddresses,
            batchId: batchId,
            batchName: batchName,
          });

          setSuccessMessage(response.data.message); // Assuming backend sends a message in response
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || "Error updating batch";
          setError(errorMessage);
        }
      },
      header: false, // We don't expect headers in the CSV
    });
  };

  // Adding a batch with just batchId, batchName, and noOfStudents
  const handleAddBatch = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate if batch details are provided
    if (!batchId || !batchName || !noOfStudents) {
      setError("Batch ID, Batch Name, and Number of Students are required");
      return;
    }

    try {
      // Send the batch details to the backend to create a new batch
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/batch`, {
        batchId: batchId,
        batchName: batchName,
        no_of_students: noOfStudents,
      });

      setSuccessMessage(response.data.message); // Assuming backend sends a message in response
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error creating batch";
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Batch</h2>
      <form onSubmit={handleSubmit}>
        {/* Batch ID */}
        <div className="mb-4">
          <label htmlFor="batchId" className="block text-sm font-semibold text-black">Batch ID</label>
          <input
            type="text"
            id="batchId"
            name="batchId"
            value={batchId}
            onChange={handleBatchIdChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Batch Name */}
        <div className="mb-4">
          <label htmlFor="batchName" className="block text-sm font-semibold text-black">Batch Name</label>
          <input
            type="text"
            id="batchName"
            name="batchName"
            value={batchName}
            onChange={handleBatchNameChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Number of Students */}
        <div className="mb-4">
          <label htmlFor="noOfStudents" className="block text-sm font-semibold text-black">Number of Students</label>
          <input
            type="number"
            id="noOfStudents"
            name="noOfStudents"
            value={noOfStudents}
            onChange={handleNoOfStudentsChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-semibold text-black">Upload CSV File</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Submit Button for Update */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Batch
          </button>
        </div>

        {/* Add Batch Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddBatch} // Directly call the batch creation logic on click
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Batch
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {/* Success Message */}
      {successMessage && <p className="mt-4 text-green-600 text-center">{successMessage}</p>}
    </div>
  );
};

export default UpdateBatchForm;
