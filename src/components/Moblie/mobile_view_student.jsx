"use client";
import Head from "next/head";
import { useState, useRef } from "react";
import { IoDownloadOutline } from "react-icons/io5";

const Mobile_desktop_student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLimitExceededModalOpen, setIsLimitExceededModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const importButtonRef = useRef(null);
  const fileInputRef = useRef(null);

  const maxStudents = 80; // Maximum number of students allowed

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

  // Function to get the next available ID
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
      id: getNextId(), // Use the next available ID
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
          id: getNextId(), // Generate a new ID for each imported student
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
    <div className="min-h-screen bg-white p-4 relative">
      <Head>
        <title>Student Management</title>
        <meta name="description" content="Student management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center mb-4">
        <button
          className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.2)] h-12 w-32 border border-gray-300 rounded-lg text-gray-400 text-sm py-2 px-4"
        >
          Student
        </button>
      </div>

      {/* Main content with blur effect when modals are open */}
      <div className={`transition-all duration-300 ${isModalOpen || isAddStudentModalOpen || isViewModalOpen || isLimitExceededModalOpen ? "blur-[2px]" : ""}`}>
        <main className="mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={openAddStudentModal} 
              className="bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 text-sm"
            >
              Add Student
            </button>
            <button 
              onClick={openModal} 
              className="text-white py-2 px-3 rounded-lg hover:bg-[#3DAF6B] text-sm" 
              style={{ backgroundColor: "#47BE7D" }}
            >
              Import Excel
            </button>
          </div>

          <div className="bg-white mt-4 shadow-md border rounded-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-white text-gray-600 text-center border-b-2 uppercase text-xs leading-tight">
                  <th className="py-3 px-2">Sr.No</th>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs font-light">
                {students.map((student) => (
                  <tr key={student.id} className="border-b text-center border-black hover:bg-gray-100">
                    <td className="py-3 px-2 text-black border-r-2">{student.id}</td>
                    <td className="py-3 px-2 border-r-2 truncate">{student.name}</td>
                    <td className="py-3 px-2 flex items-center justify-center space-x-1">
                      <span className="text-black truncate">{student.status}</span>
                      <button 
                        onClick={() => openViewModal(student)}
                        className="bg-yellow-400 text-white px-2 rounded-sm hover:bg-yellow-500 whitespace-nowrap text-xs"
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

      {/* Modals - now without the black background overlay */}
      {/* Import Excel Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm">
            <div className="flex flex-col items-center">
              <label className="bg-[#7ADC8CC4] text-gray-700 py-3 px-4 rounded-lg mb-3 flex flex-col items-center space-y-1 border border-gray-300 hover:bg-[#7ADC8C] cursor-pointer w-full">
                <IoDownloadOutline className="h-5 w-5 text-gray-700" />
                <span className="text-sm font-semibold">Import File</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv"
                  className="hidden"
                />
              </label>
              <div className="w-full border border-gray-300 border-t my-3"></div>
              <div className="flex space-x-3 w-full justify-end">
                <button onClick={closeModal} className="bg-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={handleFileUpload} className="bg-red-500 text-white text-xs py-2 px-3 rounded-lg hover:bg-red-600">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold text-center mb-3">Student Details</h2>
            <div className="space-y-2 text-sm">
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
              className="mt-3 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold text-center py-2 bg-gradient-to-r from-[#FFF9E5] to-[#E5F0FF] mx-auto mb-3">
              Add Student
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-black">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="mt-1 block w-full px-2 py-1 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-black">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-2 py-1 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-xs font-semibold text-black">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  placeholder="mm/dd/yyyy"
                  className="mt-1 block w-full px-2 py-1 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-black">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  className="mt-1 block w-full px-2 py-1 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-black">Gender:</label>
                <div className="mt-1 flex space-x-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="form-radio h-3 w-3 text-blue-600"
                      required
                    />
                    <span className="ml-1 text-xs text-black">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="form-radio h-3 w-3 text-blue-600"
                    />
                    <span className="ml-1 text-xs text-black">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      className="form-radio h-3 w-3 text-blue-600"
                    />
                    <span className="ml-1 text-xs text-black">Other</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={closeAddStudentModal}
                  className="w-full bg-gray-300 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-400 focus:outline-none text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 focus:outline-none text-sm"
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold text-center mb-3 text-red-600">Limit Exceeded</h2>
            <p className="text-center text-gray-700 text-sm mb-4">
              The maximum limit of {maxStudents} students has been reached. You cannot add more students at this time.
            </p>
            <button
              onClick={closeLimitExceededModal}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mobile_desktop_student;