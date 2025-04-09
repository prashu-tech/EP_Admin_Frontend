"use client";
import Head from "next/head";
import { useState, useRef } from "react";
import { IoDownloadOutline } from "react-icons/io5";

const Desktop_student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLimitExceededModalOpen, setIsLimitExceededModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const importButtonRef = useRef(null);
  const fileInputRef = useRef(null);

  const maxStudents = 80;

  const [students, setStudents] = useState([
    { id: 1, name: "Ayaan Raje", email: "ayaan@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
    { id: 2, name: "Tanvi Sawant", email: "tanvi@gmail.com", phone: "8246578567", gender: "Female", dob: "07/07/2000", status: "Active" },
    { id: 3, name: "Wajiha Jafri", email: "wajiha@gmail.com", phone: "8246578567", gender: "Female", dob: "07/07/2000", status: "Active" },
    { id: 4, name: "Najeeb Sayeed", email: "najeeb@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
    { id: 5, name: "Saad Shaikh", email: "saad@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
    { id: 6, name: "Ibrahim Mulla", email: "ibrahim@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
    { id: 7, name: "Arfat Shaikh", email: "arfat@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
    { id: 8, name: "Sandesh Dagade", email: "sandesh@gmail.com", phone: "8246578567", gender: "Male", dob: "07/07/2000", status: "Active" },
  ]);

  const getNextId = () => {
    const maxId = students.length > 0 ? Math.max(...students.map(student => student.id)) : 0;
    return maxId + 1;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAddStudentModal = () => setIsAddStudentModalOpen(true);
  const closeAddStudentModal = () => setIsAddStudentModalOpen(false);
  const openViewModal = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);
  const openLimitExceededModal = () => setIsLimitExceededModalOpen(true);
  const closeLimitExceededModal = () => setIsLimitExceededModalOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (students.length >= maxStudents) {
      openLimitExceededModal();
      closeAddStudentModal();
      return;
    }

    const formData = new FormData(e.target);
    const newStudent = {
      id: getNextId(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      dob: formatDate(formData.get("dob")),
      status: "Active",
    };
    setStudents([...students, newStudent]);
    closeAddStudentModal();
  };

  const handleExport = () => {
    const headers = ["Sr.No,Student Name,Email,Phone Number,Gender,DOB,Status"];
    const rows = students.map(student => 
      `${student.id},${student.name},${student.email},${student.phone},${student.gender},${student.dob},${student.status}`
    );
    const csvContent = [...headers, ...rows].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    closeModal();
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map(row => row.split(","));

      const data = rows.slice(1).map((row) => {
        return {
          id: getNextId(),
          name: row[1] || "",
          email: row[2] || "",
          phone: row[3] || "",
          gender: row[4] || "",
          dob: row[5]?.trim() || "",
          status: row[6]?.trim() || "Active",
        };
      }).filter(student => student.name && student.email);

      const remainingCapacity = maxStudents - students.length;
      if (data.length > remainingCapacity) {
        openLimitExceededModal();
        setStudents([...students, ...data.slice(0, remainingCapacity)]);
      } else {
        setStudents([...students, ...data]);
      }
      closeModal();
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-white p-6 relative">
      <Head>
        <title>Student Management</title>
        <meta name="description" content="Student management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => {/* Add navigation logic here */}}
          className="bg-white justify-center shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-14 w-35 mx-17 border border-gray-300 rounded-lg text-gray-400 text-sm py-3 px-6 font-['Segoe_UI'] cursor-pointer"
        >
          Student
        </button>
      </div>

      <div className={`transition-all duration-300 ${isModalOpen || isAddStudentModalOpen || isViewModalOpen || isLimitExceededModalOpen ? "blur-[2px]" : ""}`}>
        <main className="max-w-6xl mx-auto">
          <div className="flex justify-end pt-6 -mx-6 items-center mb-4">
            <div className="space-x-3 relative">
              <button 
                onClick={openAddStudentModal} 
                className="bg-yellow-500 text-white w-V2 w-50 py-2 px-4 rounded-lg hover:bg-yellow-600 cursor-pointer"
              >
                Add Student
              </button>
              <button 
                ref={importButtonRef} 
                onClick={openModal} 
                className="text-white py-2 w-50 px-4 rounded-lg hover:bg-[#3DAF6B] cursor-pointer" 
                style={{ backgroundColor: "#47BE7D" }}
              >
                Import Excel
              </button>
            </div>
          </div>

          <div className="bg-white mt-16 ml-0 mr-34 shadow-md border rounded-lg overflow-hidden w-full max-w-3xl">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-white text-gray-600 -mx-12 text-center border-b-2 uppercase text-xs leading-tight">
                  <th className="py-4 px-2 w-8">Sr.No</th>
                  <th className="py-4 px-2 w-24">Student Name</th>
                  <th className="py-4 px-2 w-32">Email</th>
                  <th className="py-4 px-2 w-28">Phone Number</th>
                  <th className="py-4 px-2 w-20">Gender</th>
                  <th className="py-4 px-2 w-24">DOB</th>
                  <th className="py-4 px-2 w-28">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs font-light">
                {students.map((student) => (
                  <tr key={student.id} className="border-b text-center border-black hover:bg-gray-100">
                    <td className="py-4 px-2 text-black border-r-2 w-8">{student.id}</td>
                    <td className="py-4 px-2 border-r-2 w-24 truncate">{student.name}</td>
                    <td className="py-4 px-2 border-r-2 w-32 truncate">{student.email}</td>
                    <td className="py-4 px-2 border-r-2 w-28">{student.phone}</td>
                    <td className="py-4 px-2 border-r-2 w-20">{student.gender}</td>
                    <td className="py-4 px-2 border-r-2 w-24">{student.dob}</td>
                    <td className="py-4 px-2 w-28 flex items-center space-x-2">
                      <span className="text-black truncate">{student.status}</span>
                      <button 
                        onClick={() => openViewModal(student)}
                        className="bg-yellow-400 text-white px-4 rounded-sm hover:bg-yellow-500 whitespace-nowrap text-xs cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Import Excel Modal */}
      {isModalOpen && (
        <div className="absolute top-20 right-3 mt-30 bg-white p-6 rounded-lg shadow-lg w-50 z-50">
          <div className="flex flex-col items-center">
            <label className="bg-[#7ADC8CC4] text-gray-700 py-4 px-4 rounded-lg mb-4 flex flex-col items-center space-y-1 border border-gray-300 hover:bg-[#7ADC8C] cursor-pointer">
              <IoDownloadOutline className="h-6 w-6 text-gray-700" />
              <span className="text-base font-semibold">Import File</span>
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                className="hidden"
              />
            </label>
            <div className="w-50 border border-gray-300 border-t my-4"></div>
            <div className="flex space-x-4 mx-6 justify-end">
              <button 
                onClick={closeModal} 
                className="bg-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleFileUpload} 
                className="bg-red-500 text-white text-xs py-2 px-3 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">Student Details</h2>
            <div className="space-y-3">
              <p><strong>ID:</strong> {selectedStudent.id}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob}</p>
              <p><strong>Status:</strong> {selectedStudent.status}</p>
            </div>
            <button 
              onClick={closeViewModal}
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2
              className="text-xl font-semibold text-center py-2"
              style={{
                background: "linear-gradient(to right, #FFF9E5, #E5F0FF)",
                width: "200px",
                margin: "0 auto",
              }}
            >
              Add Student
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-black">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-semibold text-black">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="mm/dd/yyyy"
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-black">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Gender:</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="form-radio h-4 w-4 text-blue-600"
                      required
                    />
                    <span className="ml-2 text-sm text-black">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-black">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-black">Other</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={closeAddStudentModal}
                  className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                  style={{ backgroundColor: "#007AFF" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Limit Exceeded Modal */}
      {isLimitExceededModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4 text-red-600">Limit Exceeded</h2>
            <p className="text-center text-gray-700 mb-6">
              The maximum limit of {maxStudents} students has been reached. You cannot add more students at this time.
            </p>
            <button
              onClick={closeLimitExceededModal}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Desktop_student;