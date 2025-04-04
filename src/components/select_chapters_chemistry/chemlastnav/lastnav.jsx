import React, { useState, useEffect } from "react";  // <-- Add this import
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function ChemLastnav() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState([]);

   // Load selected subjects from localStorage
   useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];
    setSelectedSubjects(savedSubjects);
  }, []);

 
//continue button
  const handleContinueClick = () => {
    const currentIndex = selectedSubjects.indexOf("Chemistry");
    const nextSubject = selectedSubjects[currentIndex + 1]?.toLowerCase();

    if (nextSubject) {
      router.push(`/select_chapters_${nextSubject}`);
    } else {
      router.push("/test_preview");
    }
  };








  return (
    <div className="hidden md:flex justify-between items-center w-full p-4">
      <button
        onClick={() => router.push("/select_chapters_physics")}
        className="flex items-center px-10 py-2 mt-8 ml-10 font-Poppins text-lg bg-[#FFBB38] text-white rounded-full shadow-md hover:bg-yellow-500 transition"
      >
        <HiOutlineArrowLeft className="mr-3 text-xl" /> Back
      </button>
      <button
        onClick={handleContinueClick} 
        className="flex items-center px-6 py-2 mt-8 mr-17 font-Poppins text-lg bg-[#007AFF] text-white rounded-full shadow-md hover:bg-blue-600 transition"
      >
        Continue <HiOutlineArrowRight className="ml-3 text-xl" />
      </button>
    </div>
  );
}
