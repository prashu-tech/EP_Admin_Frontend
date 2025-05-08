"use client";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { IoDownloadOutline, IoPersonAddOutline, IoCloudUploadOutline, IoDocumentTextOutline, IoSchoolOutline } from "react-icons/io5";
import axios from 'axios';
import * as XLSX from "xlsx";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Link from "next/link";

const Desktop_student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const importButtonRef = useRef(null);
  const fileInputRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [localAdmin, setLocalAdmin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STUDENT_LIMIT = 100; // Set student limit

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;

      try {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(sheet);

        const processedStudents = json.map(student => {
          const firstName = student["STUDENT NAME"] || "";
          const dob = student["DOB "] || "";
          const yearOfBirth = dob ? (dob instanceof Date ? dob.getFullYear() : new Date(dob).getFullYear()) : "";

          const password = `${firstName.charAt(0)}${yearOfBirth}`;

          return {
            firstName: firstName,
            emailAddress: student["EMAIL"] || "",
            mobileNumber: student["PHONE NUMBER"] || "",
            gender: student["GENDER"] || "",
            dateOfBirth: dob || "",
            password: password, // Auto-generated password
            addedByAdminId: localAdmin,
          };
        });

        console.log(processedStudents);
        setStudents(processedStudents); 

      } catch (error) {
        console.error("Error processing the Excel file:", error);
      }
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get the admin token from localStorage
        const token = localStorage.getItem("adminAuthToken");
  
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
  
        // Decode the token to extract the admin ID
        const decodedToken = jwtDecode(token);
        const addedByAdminId = decodedToken.id;
        console.log(addedByAdminId)
        setLocalAdmin(addedByAdminId);
  
        // Send the addedByAdminId in the request body
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/info`,
          {
            addedByAdminId: addedByAdminId, // Send the addedByAdminId in the request body
          }
        );
  
        if (response.data.studentInfo) {
          setStudents(response.data.studentInfo);
        }
  
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchStudentData(); 
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAddStudentModal = () => setIsAddStudentModalOpen(true);
  const closeAddStudentModal = () => setIsAddStudentModalOpen(false);
  const openViewModal = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  //to send the admin to the userprofile page
  const handleStudentClick = (studentId) => {
    // Save the student ID to localStorage
    localStorage.setItem('studentId', studentId);
  
    // Redirect to the desktopuserprofile page
    window.location.href = '/desktopuserprofile';  // This will navigate the user to the profile page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const firstName = formData.get("name");
    const email = formData.get("email");
    const dateOfBirth = formData.get("dob");
    const phoneNumber = formData.get("phone");
    const gender = formData.get("gender");
  
    // Get the JWT token from localStorage
    const token = localStorage.getItem("adminAuthToken");
  
    // Decode the token to extract the admin ID
    let addedByAdminId = null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        addedByAdminId = decodedToken.id;
         // Assuming the admin ID is stored in the "id" field of the token
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token",{
          duration: 5000
        });
        return;
      }
    }
  
    // Validate if all required fields are present
    if (!email || !firstName || !dateOfBirth || !phoneNumber || !gender) {
      toast.error("All fields are required",{
        duration: 5000
      });
      return;
    }
  
    // Prevent adding more students if the limit is reached
    if (students.length >= STUDENT_LIMIT) {
      toast.error("Student limit of 100 has been reached. Cannot add more students.",{
        duration: 5000
      });
      return;
    }
  
    // Validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format",{
        duration: 5000
      });
      return;
    }
  
    const birthYear = new Date(dateOfBirth).getFullYear();
    const password = `${firstName.charAt(0)}${birthYear}`;
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/save`, {
        email,
        password, 
        firstName,
        dateOfBirth,
        phoneNumber,
        gender,
        addedByAdminId,  
      });

      setIsSubmitting(false);
  
      if (response.status === 201) {
        await sendEmail(email, password);
        setStudents((prevStudents) => [...prevStudents, response.data.student]);
        toast.success("Student added successfully and email sent!",{
          duration: 5000
        });
        
        closeAddStudentModal();
      }
    } catch (error) {
      console.error("Error saving student data:", error);
      setIsSubmitting(false);
      toast.error("Error saving student data",{
        duration: 5000
      });
    }
  };
  

  const sendEmail = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/email`, {
        to: email,
        subject: 'Congratulations, you were added to the Exam Portal',
        text: `Hello, \n\nCongratulations! You have been successfully added to the Exam Portal.\nYour login credentials are:\n\nEmail: ${email}\nPassword: ${password}\n\nBest regards,\nThe Exam Portal Team`
      });

      if (response.status === 200) {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleDownloadTemplate = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Define the headers
    const headers = ["STUDENT NAME", "EMAIL", "PHONE NUMBER", "GENDER", "DOB"];
    
    // Create example data (one row with empty cells)
    const data = [headers, ["", "", "", "", ""]];
    
    // Create a worksheet from the data
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    
    // Generate the Excel file
    XLSX.writeFile(wb, "student_template.xlsx");
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

  const handleFileUpload = async (e) => {
    e.preventDefault();
  
    try {
      const currentCount = students.length;
      const spaceLeft = STUDENT_LIMIT - currentCount;
  
      if (spaceLeft <= 0) {
        toast.error("Student limit of 100 has been reached. Cannot upload more students.", {
          duration: 5000,
        });
        return;
      }
  
      let studentsToAdd = students.slice(0, spaceLeft);
  
      if (students.length > spaceLeft) {
        toast.success(`Only ${spaceLeft} students were added. Student limit of 100 reached.`, {
          duration: 5000,
        });
      }
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/studentdata/bulk-save`,
        { students: studentsToAdd }
      );
  
      const existingEmails = response.data.existingEmails || [];
  
      // If there are existing emails, display them in the toast message
      if (existingEmails.length > 0) {
        toast.error(
          `Some students were not added due to existing emails: ${existingEmails.join(', ')}`,
          {
            duration: 10000,
          }
        );
      } else {
        toast.success("Students added successfully!", {
          duration: 5000,
        });
      }
  
      setStudents((prev) => [...prev, ...studentsToAdd]); // Update state
      console.log("Backend Response:", response.data);
  
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error occurred while uploading students.", {
        duration: 5000,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 relative">
      <Head>
        <title>Student Management</title>
        <meta name="description" content="Student management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Top navigation button */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <button
            onClick={() => {/* Add navigation logic here */}}
            className="flex items-center justify-center gap-2 h-14 w-48 text-gray-700 text-sm py-3 px-8 font-medium transition-all hover:bg-gray-50"
          >
            <IoSchoolOutline className="text-yellow-500 text-xl" />
            <span>Student</span>
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto">
        {/* Template download button */}
        <div className="mb-8">
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 bg-white shadow-md border border-gray-100 text-gray-700 py-3 px-5 rounded-xl hover:shadow-lg transition-all"
          >
            <IoDocumentTextOutline className="text-blue-500 text-xl" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Download Excel Template</span>
              <span className="text-xs text-gray-500">Contains: STUDENT NAME, EMAIL, PHONE NUMBER, GENDER, DOB</span>
            </div>
          </button>
        </div>

        {/* Title and action buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">Student Management</h1>
            <div className="ml-4 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <span className="text-sm text-yellow-700">{students.length}/{STUDENT_LIMIT} Students</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={openAddStudentModal}
              disabled={students.length >= STUDENT_LIMIT || isSubmitting}
              className={`flex items-center gap-2 py-2.5 px-5 rounded-xl shadow-sm transition-all ${
                students.length >= STUDENT_LIMIT 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow"
              }`}
            >
              <IoPersonAddOutline className="text-lg" />
              <span>Add Student</span>
            </button>
            
            <button
              ref={importButtonRef}
              onClick={openModal}
              disabled={students.length >= STUDENT_LIMIT}
              className={`flex items-center gap-2 py-2.5 px-5 rounded-xl shadow-sm transition-all ${
                students.length >= STUDENT_LIMIT 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-green-500 text-white hover:bg-green-600 hover:shadow"
              }`}
            >
              <IoCloudUploadOutline className="text-lg" />
              <span>Import Excel</span>
            </button>
          </div>
        </div>

        {/* Export button */}
        {students.length > 0 && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <IoDownloadOutline className="text-lg" />
              <span>Export Student List</span>
            </button>
          </div>
        )}

        {/* Students Table with Enhanced Borders */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-b-2 border-gray-200 uppercase text-xs font-semibold tracking-wider">
                  <th className="py-4 px-6 text-left border-r border-gray-200">Sr.No</th>
                  <th className="py-4 px-6 text-left border-r border-gray-200">Student Name</th>
                  <th className="py-4 px-6 text-left border-r border-gray-200">Email</th>
                  <th className="py-4 px-6 text-left border-r border-gray-200">Phone Number</th>
                  <th className="py-4 px-6 text-left border-r border-gray-200">Gender</th>
                  <th className="py-4 px-6 text-left border-r border-gray-200">DOB</th>
                  <th className="py-4 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.id || index} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                      <td className="py-4 px-6 text-gray-800 font-medium border-r border-gray-200">{index + 1}</td>
                      <td
                        className="py-4 px-6 cursor-pointer text-blue-600 hover:text-blue-800 hover:underline font-medium border-r border-gray-200"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        {student.fullName || "N/A"}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-200">{student.email || "N/A"}</td>
                      <td className="py-4 px-6 border-r border-gray-200">{student.phoneNumber || "N/A"}</td>
                      <td className="py-4 px-6 border-r border-gray-200">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          student.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                          student.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {student.gender || "N/A"}
                        </span>
                      </td>
                      <td className="py-4 px-6 border-r border-gray-200 whitespace-nowrap">{student.dateOfBirth || "N/A"}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <IoSchoolOutline className="text-gray-300 text-5xl mb-3" />
                        <p className="text-gray-500 mb-1">No students found</p>
                        <p className="text-gray-400 text-xs">Add students individually or import from Excel</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Import Excel Modal - with blur background */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 transition-all">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-100 transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Import Students</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <label className="w-full bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-green-200 text-gray-700 py-10 px-6 rounded-xl mb-6 flex flex-col items-center space-y-3 cursor-pointer hover:border-green-400 transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <IoCloudUploadOutline className="h-8 w-8 text-green-500" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Select Excel File</span>
                <span className="text-sm text-gray-500 text-center">Click to browse or drag and drop your file here</span>
                <input
                  id="importFileInput"
                  ref={fileInputRef}
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleExcelUpload}
                  style={{ display: 'none' }}
                />
              </label>
              
              <div className="w-full flex space-x-4 justify-end">
                <button 
                  onClick={closeModal} 
                  className="bg-white border border-gray-200 text-gray-700 py-2.5 px-5 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFileUpload} 
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal - with blur background and fixed gender options */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg border border-gray-100">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg"></div>
              <h2 className="relative text-xl font-semibold text-center py-4 text-gray-800">
                Add New Student
              </h2>
              <button 
                onClick={closeAddStudentModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Enter student's name" 
                      required 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm" 
                    />
                    <div className="absolute left-3 top-3.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="example@email.com" 
                      required 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm" 
                    />
                    <div className="absolute left-3 top-3.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      id="dob" 
                      name="dob" 
                      required 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm" 
                    />
                    <div className="absolute left-3 top-3.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter phone number" 
                      required 
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm" 
                    />
                    <div className="absolute left-3 top-3.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="flex items-center space-x-6 bg-gray-50 p-3 rounded-lg">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Male" 
                      className="form-radio h-4 w-4 text-blue-500 focus:ring-blue-500" 
                      required 
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Female" 
                      className="form-radio h-4 w-4 text-pink-500 focus:ring-pink-500" 
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Other" 
                      className="form-radio h-4 w-4 text-purple-500 focus:ring-purple-500" 
                    />
                    <span className="ml-2 text-gray-700">Other</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <button 
                  type="button" 
                  onClick={closeAddStudentModal} 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Adding Student...' : 'Add Student'}
                </button>
              </div>
              
              <div className="mt-4 text-xs text-center text-gray-500">
                A welcome email with login credentials will be sent to the student
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop_student;