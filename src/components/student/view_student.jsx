"use client";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import axios from 'axios';
import * as XLSX from "xlsx";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast"
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
        addedByAdminId,  // Send the decoded admin ID
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

      <main className="max-w-6xl mx-auto">
        <div className="flex justify-end pt-6 mb-4">
          <div className="space-x-3 relative">
            <button
              onClick={openAddStudentModal}
              disabled={students.length >= STUDENT_LIMIT || isSubmitting}
              className={`bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 cursor-pointer ${
                students.length >= STUDENT_LIMIT ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              Add Student
            </button>
            <button
              ref={importButtonRef}
              onClick={openModal}
              disabled={students.length >= STUDENT_LIMIT}
              className={`text-white py-2 px-4 rounded-lg ${students.length >= STUDENT_LIMIT ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`}
            >
              Import Excel
            </button>
          </div>
        </div>

        <div>
          <p className="font-bold text-xl text-red-400">Warning!</p>
          <p className="text-sm text-gray-500">The excel file should contain STUDENT NAME, EMAIL, PHONE NUMBER, GENDER, DOB</p>
        </div>

        <div className="bg-white mt-16 shadow-md border rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-white text-gray-600 text-center border-b-2 uppercase text-xs leading-tight">
                <th className="py-4 px-2">Sr.No</th>
                <th className="py-4 px-2">Student Name</th>
                <th className="py-4 px-2">Email</th>
                <th className="py-4 px-2">Phone Number</th>
                <th className="py-4 px-2">Gender</th>
                <th className="py-4 px-2">DOB</th>
                <th className="py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-xs font-light">
            {students.map((student, index) => (
              <tr key={student.id || index} className="border-b text-center hover:bg-gray-100">
                <td className="py-4 px-2 text-black border-r-2">{index + 1}</td>
                <td
                  className="py-4 px-2 border-r-2 cursor-pointer text-blue-500"
                  onClick={() => handleStudentClick(student.id)} // Adding the click handler here
                >
                  {student.fullName || "N/A"}
                </td>
                <td className="py-4 px-2 border-r-2">{student.email || "N/A"}</td>
                <td className="py-4 px-2 border-r-2">{student.phoneNumber || "N/A"}</td>
                <td className="py-4 px-2 border-r-2">{student.gender || "N/A"}</td>
                <td className="py-4 px-2 border-r-2">{student.dateOfBirth || "N/A"}</td>
                <td className="py-4 px-2 flex items-center">
                  <span>{student.status || "N/A"}</span>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </main>

      {/* Import Excel Modal */}
      {isModalOpen && (
        <div className="absolute top-20 right-3 mt-30 bg-white p-6 rounded-lg shadow-lg z-50">
          <div className="flex flex-col items-center">
            <label className="bg-[#7ADC8CC4] text-gray-700 py-4 px-4 rounded-lg mb-4 flex flex-col items-center space-y-1">
              <IoDownloadOutline className="h-6 w-6 text-gray-700" />
              <span className="text-base font-semibold">Import File</span>
              <input
                id="importFileInput"
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleExcelUpload}
                style={{ display: 'none' }}
              />
            </label>
            <div className="w-full border border-gray-300 border-t my-4"></div>
            <div className="flex space-x-4 mx-6 justify-end">
              <button onClick={closeModal} className="bg-gray-300 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleFileUpload} className="bg-red-500 text-white text-xs py-2 px-3 rounded-lg hover:bg-red-600">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold text-center py-2" style={{ background: "linear-gradient(to right, #FFF9E5, #E5F0FF)" }}>
              Add Student
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-black">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required className="w-full px-3 py-2 border border-gray-400 rounded-md" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-black">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required className="w-full px-3 py-2 border border-gray-400 rounded-md" />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-semibold text-black">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required className="w-full px-3 py-2 border border-gray-400 rounded-md" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-black">Phone Number:</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your Phone Number" required className="w-full px-3 py-2 border border-gray-400 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black">Gender:</label>
                <div className="flex space-x-4 mt-1">
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="Male" className="form-radio" required />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="Female" className="form-radio" />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="Other" className="form-radio" />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button type="button" onClick={closeAddStudentModal} className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop_student;
