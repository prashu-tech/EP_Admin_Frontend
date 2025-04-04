import React from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function BioLastnavDesktop() {
  const router = useRouter();

  return (
    <div className="hidden md:flex justify-between items-center w-full p-4">
      <button
        onClick={() => router.push("/select_chapters_physics")}
        className="flex items-center px-10 py-2 mt-8 ml-10 font-Poppins text-lg bg-[#FFBB38] text-white rounded-full shadow-md hover:bg-yellow-500 transition"
      >
        <HiOutlineArrowLeft className="mr-3 text-xl" /> Back
      </button>
      <button
        onClick={() => router.push("/select_chapters_chemistry")}
        className="flex items-center px-6 py-2 mt-8 mr-17 font-Poppins text-lg bg-[#007AFF] text-white rounded-full shadow-md hover:bg-blue-600 transition"
      >
        Continue <HiOutlineArrowRight className="ml-3 text-xl" />
      </button>
    </div>
  );
}
