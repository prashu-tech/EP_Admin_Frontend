'use client';

import { CiSearch } from "react-icons/ci";
import { BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightCircle } from 'lucide-react';
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
  }, [filterType]);

  const fetchData = async () => {
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
    link.setAttribute('download', 'students_data.csv');
    link.click();
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterSelection = (filter) => {
    if (filter === 'ascending-descending' || filter === 'descending-ascending') {
      setSortType('score');
      toggleSortOrder();
    } else if (filter === 'by-id') {
      setSortType('id');
      setSortOrder('ascending');
    }
    setShowFilterOptions(false);
  };

  const handleStudentClick = (studentId) => {
    router.push(`/desktopuserprofile`);
    localStorage.setItem("studentId", studentId);
  };

  return (
    <div className="py-6 w-full mx-auto px-4 lg:px-6">
      {/* Search & Buttons Section */}
      <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-6 w-full mt-2">
        <div className="relative flex-1 w-full max-w-full">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            className="lg:w-full w-[400px] pr-7 py-3 rounded-lg border border-gray-300 outline-none shadow-md text-sm placeholder:text-gray-500 pl-19"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-4xl">
            <CiSearch />
          </span>
        </div>
        <div className="flex justify-end lg:w-fit w-full gap-2 px-6 mt-4 lg:mt-0">
          <button className="lg:w-64 w-full lg:px-6 lg:py-3 px-4 py-3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition active:scale-95 ml-[-11px]">
            Customized Test
          </button>
          <button
            onClick={downloadCSV}
            className="w-full lg:px-6 lg:py-3 px-4 py-3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex justify-center active:scale-95"
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>

      {/* Filter Bar with Boxed Stats */}
      <div className="lg:flex grid grid-cols-2 lg:flex-wrap gap-2 mb-6 p-3 bg-white rounded-lg drop-shadow hover:bg-white-100 w-full max-w-6xl mx-auto lg:justify-between">
        {[ 
          `Total Tests: ${totalTest}`,
          `Highest Marks: ${stats.highestMarks}`,
          `Physics Tests: ${overallSummary.totalPhysicsTests}`,
          `Chemistry Tests: ${overallSummary.totalChemistryTests}`,
          `Biology Tests: ${overallSummary.totalBiologyTests}`
        ].map((item, index) => (
          <div
            key={index}
            className="px-6 py-2 min-w-[150px] bg-White-500 border border-gray-300 shadow text-base font-Regular text-center text-gray"
          >
            {item}
          </div>
        ))}

        {/* Filter Options Button */}
        <button
          onClick={toggleFilterOptions}
          className="px-6 py-2 bg-white border border-gray-300 shadow hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
        >
          <FiFilter className="text-xl text-gray-700" /> <span className="ml-2">Filter</span>
        </button>

        {/* Filter Options Dropdown */}
        {showFilterOptions && (
          <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2 border border-gray-300 right-0">
            <button
              onClick={() => handleFilterSelection('ascending-descending')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              Show Low Performers
            </button>
            <button
              onClick={() => handleFilterSelection('descending-ascending')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              Show Top Performers
            </button>
            <button
              onClick={() => handleFilterSelection('by-id')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              Show All
            </button>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="border-1 overflow-x-auto rounded-xl lg:rounded-4xl w-full mx-auto">
        <table className="w-full shadow-md overflow-hidden">
          <thead className="bg-white-100 border-b rounded-xl">
            <tr className="text-center text-sm font-bold text-[2B313E]">
              <th className="p-4 border border-l-white border-t-white border-r-white rounded-tl-lg">SR.NO</th>
              <th className="p-4 border border-r-white border-t-white">STUDENT NAME</th>
              <th className="p-4 border border-r-white border-t-white">STUDENT ID</th>
              <th className="p-4 border border-r-white border-t-white">TEST NAME</th>
              <th className="p-4 border border-r-white border-t-white">SUBJECT</th>
              <th className="p-4 border border-r-white border-t-white">SCORE</th>
              <th className="p-4 border border-r-white border-t-white">TOTAL MARKS</th>
              <th className="p-4 border border-r-white border-t-white">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-center"> 
            {sortedStudents.map((student, index) => (
              <tr 
                key={`${student.studentId}-${student.testName}-${student.subject || student.subjects?.join('-')}-${index}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 border text-left font-bold border-l-white">{index + 1}</td>
                <td className="p-4 border">{student.fullName}</td>
                <td className="p-4 border">{student.studentId}</td>
                <td className="p-4 border">{student.testName}</td>
                <td className="p-4 border-b border-black text-[#00B0FF]">
                  {student.subject || (student.subjects || []).join(", ")}
                </td>
                <td className="p-4 border-l-1">{student.score}</td>
                <td className="p-4 border-l-1">{student.totalMarks}</td>
                <td className="p-4 border text-center border-r-white">
                  <button
                    className="text-black hover:text-black font-bold"
                    onClick={() => handleStudentClick(student.studentId)}  
                  >
                    <ArrowRightCircle size={24} strokeWidth={3.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}