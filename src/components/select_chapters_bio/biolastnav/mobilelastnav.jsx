import React, { useState, useEffect } from "react"; 
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi"; 
import { useRouter } from "next/navigation";

export default function BioLastnavMobile() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Load selected subjects from localStorage
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];
    setSelectedSubjects(savedSubjects);
  }, []);

  // Handle back navigation (to the previous subject)
  const handleBackClick = () => {
    if (selectedSubjects.indexOf("Biology") > 0) {
      const previousSubject = selectedSubjects[selectedSubjects.indexOf("Biology") - 1].toLowerCase();
      router.push(`/select_chapters_${previousSubject}`);
    }else {
      // If there's no previous subject, navigate to the first subject page or any fallback page
      router.push("/subjectselect"); // Replace with your fallback subject selection page URL
    }
  };

  // Handle continue navigation (to the next subject)
  const handleContinueClick = () => {
    const currentIndex = selectedSubjects.indexOf("Biology");
    const nextSubject = selectedSubjects[currentIndex + 1]?.toLowerCase();

    if (nextSubject) {
      router.push(`/select_chapters_${nextSubject}`);
    } else {
      router.push("/test_preview");
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-4 md:hidden"> {/* Show only on mobile */}
      <button
        onClick={handleBackClick}
        className="flex items-center px-6 py-2 mt-8 font-Poppins text-lg bg-[#FFBB38] text-white rounded-full shadow-md hover:bg-yellow-500 transition w-[48%] mb-3"
      >
        <HiOutlineArrowLeft className="mr-3 text-xl" /> Back
      </button>
      <button
        onClick={handleContinueClick}
        className="flex items-center px-6 py-2 mt-6 font-Poppins text-lg bg-[#007AFF] text-white rounded-full shadow-md hover:bg-blue-600 transition w-[48%]"
      >
        Continue <HiOutlineArrowRight className="ml-3 text-xl" />
      </button>
    </div>
  );
}
