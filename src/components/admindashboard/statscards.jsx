"use client";
import React from "react";
import { FaRegImage } from "react-icons/fa";

const StatsCards = () => {
  // Data for each card
  const stats = [
    {
      id: 1,
      title: "Student Count",
      image: "/dashboardimg1.svg", // Update with actual image URL
    },
    {
      id: 2,
      title: "Practice Test Given",
      image: "/dashboardimg2.svg", // Update with actual image URL
    },
    {
      id: 3,
      title: "Batch Count",
      image: "/dashboardimg3.svg", // Update with actual image URL
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 pr-70 pl-70 drop-shadow-2xl">
      {stats.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg p-4 border border-gray-200"
        >
          {/* Title */}
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaRegImage className="text-lg" />
            <h2>{item.title}</h2>
          </div>

          {/* Image */}
          <div className="mt-2">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-25 object-cover rounded-lg" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
