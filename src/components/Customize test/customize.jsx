'use client';

import { CiSearch } from "react-icons/ci";
import { BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';

export default function StudentTestTable() {
  const [students, setStudents] = useState([]);
  const [overallSummary, setOverallSummary] = useState({
    totalPhysicsTests: 0,
    totalChemistryTests: 0,
    totalBiologyTests: 0,
    totalCount: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [stats, setStats] = useState({
    totalTests: 0,
    highestMarks: 0,
    physicsCount: 0,
    chemistryCount: 0,
    biologyCount: 0,
  });
  const [sortOrder, setSortOrder] = useState('ascending');
  const [sortType, setSortType] = useState('score');
  const [totalTest, setTotalTest] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch data with localStorage caching
  useEffect(() => {
    const storedStudents = localStorage.getItem('customTestStudentsData');
    
    if (storedStudents) {
      const parsedData = JSON.parse(storedStudents);
      setStudents(parsedData);
      updateStats(parsedData);
    } else {
      fetchData();
    }
    setIsLoading(false);
  }, [filterType]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generatetest/customize`, {
        params: { filterType, studentId: searchTerm }
      });

      const fetchedStudents = response.data.results;
      setStudents(fetchedStudents);
      localStorage.setItem('customTestStudentsData', JSON.stringify(fetchedStudents));
      updateStats(fetchedStudents);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = (studentsData) => {
    const physicsCount = studentsData.filter(s => 
      (s.subjects || []).includes('Physics') || s.subject === 'Physics'
    ).length;
    
    const chemistryCount = studentsData.filter(s => 
      (s.subjects || []).includes('Chemistry') || s.subject === 'Chemistry'
    ).length;
    
    const biologyCount = studentsData.filter(s => 
      (s.subjects || []).includes('Biology') || s.subject === 'Biology'
    ).length;

    const totalCount = physicsCount + chemistryCount + biologyCount;
    const highestScore = studentsData.length > 0 
      ? Math.max(...studentsData.map(s => s.score || 0))
      : 0;

    setOverallSummary({
      totalPhysicsTests: physicsCount,
      totalChemistryTests: chemistryCount,
      totalBiologyTests: biologyCount,
      totalCount
    });

    setStats({
      totalTests: studentsData.length,
      highestMarks: highestScore,
      physicsCount,
      chemistryCount,
      biologyCount,
    });

    setTotalTest(studentsData.length);
  };

  // Filter and sort students
  const sortedStudents = useMemo(() => {
    const filtered = students.filter((student) => {
      const q = searchTerm.toLowerCase();
      return (
        student.fullName?.toLowerCase().includes(q) ||
        String(student.studentId).toLowerCase().includes(q) ||
        student.testName?.toLowerCase().includes(q) ||
        student.subject?.toLowerCase().includes(q) ||
        (student.subjects || []).some(subject => 
          subject.toLowerCase().includes(q)
        )
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortType === 'score') {
        return sortOrder === 'ascending' ? a.score - b.score : b.score - a.score;
      } else {
        return sortOrder === 'ascending' ? a.studentId - b.studentId : b.studentId - a.studentId;
      }
    });
  }, [students, searchTerm, sortType, sortOrder]);

  // Update totalTest when sortedStudents changes
  useEffect(() => {
    setTotalTest(sortedStudents.length);
  }, [sortedStudents]);

  const downloadCSV = () => {
    const headers = ['SR.NO', 'STUDENT NAME', 'STUDENT ID', 'TEST NAME', 'SUBJECT', 'SCORE', 'TOTAL MARKS'];
    const rows = sortedStudents.map((student, index) => [
      index + 1,
      student.fullName,
      student.studentId,
      student.testName,
      student.subject || (student.subjects || []).join(", "),
      student.score,
      student.totalMarks
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'students_test_data.csv');
    link.click();
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterSelection = (filter) => {
    if (filter === 'low-performers') {
      setSortType('score');
      setSortOrder('ascending');
    } else if (filter === 'top-performers') {
      setSortType('score');
      setSortOrder('descending');
    } else if (filter === 'by-id') {
      setSortType('id');
      setSortOrder('ascending');
    } else if (filter === 'physics') {
      setFilterType('Physics');
    } else if (filter === 'chemistry') {
      setFilterType('Chemistry');
    } else if (filter === 'biology') {
      setFilterType('Biology');
    } else if (filter === 'all-subjects') {
      setFilterType('');
    }
    setShowFilterOptions(false);
  };

  const handleStudentClick = (studentId) => {
    router.push(`/desktopuserprofile`);
    localStorage.setItem("studentId", studentId);
  };

  const getScoreColorClass = (score, totalMarks) => {
    const percentage = (score / totalMarks) * 100;
    if (percentage >= 80) return "text-green-600 font-medium";
    if (percentage >= 60) return "text-blue-600 font-medium";
    if (percentage >= 40) return "text-orange-500 font-medium";
    return "text-red-500 font-medium";
  };

  return (
    <div className="py-6 w-full mx-auto px-4 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Student Test Dashboard</h1>
          <p className="text-gray-500">Manage and analyze student test performances</p>
        </div>
        
        {/* Search & Action Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full max-w-xl">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by name, ID, test name or subject..."
                  className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search students"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <CiSearch size={24} />
                </span>
              </div>
              <button 
                onClick={fetchData}
                className="ml-2 px-4 py-3 bg-white text-gray-600 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                aria-label="Refresh data"
              >
                Refresh
              </button>
            </div>
          </div>
          
          <div className="flex gap-3 w-full lg:w-auto">
            <button 
              className="flex-1 lg:flex-none px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all active:scale-95 font-medium"
            >
              Customized Test
            </button>
            <button
              onClick={downloadCSV}
              className="flex-1 lg:flex-none px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center active:scale-95 font-medium"
              aria-label="Download test data as CSV"
            >
              Download <BsDownload className="ml-2" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Tests", value: totalTest, icon: "📊" },
            { label: "Highest Score", value: stats.highestMarks, icon: "🏆" },
            { label: "Physics Tests", value: overallSummary.totalPhysicsTests, icon: "⚛️" },
            { label: "Chemistry Tests", value: overallSummary.totalChemistryTests, icon: "🧪" },
            { label: "Biology Tests", value: overallSummary.totalBiologyTests, icon: "🔬" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{stat.icon}</span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Button & Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">Student Test Results</h2>
          
          <div className="relative">
            <button
              onClick={toggleFilterOptions}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95"
              aria-expanded={showFilterOptions}
              aria-haspopup="true"
            >
              <FiFilter className="text-gray-500" /> 
              <span>Filter & Sort</span>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${showFilterOptions ? 'rotate-180' : ''}`} />
            </button>

            {showFilterOptions && (
              <div className="absolute right-0 mt-2 z-10 bg-white rounded-lg shadow-lg border border-gray-200 w-56 py-1 overflow-hidden">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">SORT BY</div>
                <button
                  onClick={() => handleFilterSelection('low-performers')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2"
                >
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Low Performers First
                </button>
                <button
                  onClick={() => handleFilterSelection('top-performers')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2"
                >
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Top Performers First
                </button>
                <button
                  onClick={() => handleFilterSelection('by-id')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2"
                >
                  <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                  By Student ID
                </button>

                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-t border-gray-100 mt-1">FILTER BY SUBJECT</div>
                <button
                  onClick={() => handleFilterSelection('all-subjects')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  All Subjects
                </button>
                <button
                  onClick={() => handleFilterSelection('physics')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  Physics Only
                </button>
                <button
                  onClick={() => handleFilterSelection('chemistry')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  Chemistry Only
                </button>
                <button
                  onClick={() => handleFilterSelection('biology')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                >
                  Biology Only
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sortedStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No test data found</h3>
              <p className="text-gray-500 max-w-md">
                {searchTerm ? `No results matching "${searchTerm}"` : "There are no test records available at the moment"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Marks</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200"> 
                  {sortedStudents.map((student, index) => (
                    <tr 
                      key={`${student.studentId}-${student.testName}-${student.subject || student.subjects?.join('-')}-${index}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.fullName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.studentId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.testName}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                          {student.subject || (student.subjects || []).join(", ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={getScoreColorClass(student.score, student.totalMarks)}>
                          {student.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{student.totalMarks}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                          className="text-gray-700 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                          onClick={() => handleStudentClick(student.studentId)}
                          aria-label={`View details for ${student.fullName}`}
                        >
                          <ArrowRightCircle size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Table Footer with Pagination (placeholder for future implementation) */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedStudents.length}</span> of{" "}
                  <span className="font-medium">{sortedStudents.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}