"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaClipboardCheck, FaLayerGroup } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

const StatsCards = () => {
  // Mock data - in a real implementation, this would come from an API
  const [statsData, setStatsData] = useState({
    studentCount: { total: 0, growth: 0 },
    testsTaken: { total: 0, growth: 0 },
    batchCount: { total: 0, growth: 0 }
  });
  
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // In a real implementation, replace with actual API call
    setTimeout(() => {
      setStatsData({
        studentCount: { total: 1245, growth: 12 },
        testsTaken: { total: 5678, growth: -3 },
        batchCount: { total: 42, growth: 8 }
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Data for each card
  const stats = [
    {
      id: 1,
      title: "Total Students",
      description: "Active students enrolled in the platform",
      icon: <FaUsers className="text-2xl md:text-3xl" />,
      image: "/dashboardimg1.svg",
      value: statsData.studentCount.total,
      growth: statsData.studentCount.growth,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Tests Taken",
      description: "Practice tests completed by students",
      icon: <FaClipboardCheck className="text-2xl md:text-3xl" />,
      image: "/dashboardimg2.svg",
      value: statsData.testsTaken.total,
      growth: statsData.testsTaken.growth,
      color: "from-green-500 to-green-600",
      textColor: "text-green-700",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Active Batches",
      description: "Current ongoing batches in system",
      icon: <FaLayerGroup className="text-2xl md:text-3xl" />,
      image: "/dashboardimg3.svg",
      value: statsData.batchCount.total,
      growth: statsData.batchCount.growth,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 px-4 md:px-16 lg:px-24 max-w-7xl mx-auto">
      {stats.map((item) => (
        <div
          key={item.id}
          className={`${item.bgColor} rounded-xl p-6 border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]`}
        >
          {/* Header with Icon and Title */}
          <div className="flex items-center justify-between mb-4">
            <div className={`${item.textColor} flex items-center gap-3`}>
              {item.icon}
              <h2 className="font-bold text-lg md:text-xl">{item.title}</h2>
            </div>
            <div className={`${
              item.growth >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            } flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium`}>
              {item.growth >= 0 ? <HiTrendingUp /> : <HiTrendingDown />}
              <span>{Math.abs(item.growth)}%</span>
            </div>
          </div>
          
          {/* Main value */}
          <div className="flex flex-col mb-4">
            <h3 className="text-gray-800 text-3xl md:text-4xl font-bold">
              {loading ? "-" : item.value.toLocaleString()}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
          </div>

          {/* Image section */}
          <div className="mt-4 relative h-32 overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className={`bg-[#007AFF] inset-0 bg-gradient-to-r ${item.color} opacity-20`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;