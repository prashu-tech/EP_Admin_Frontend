import { CiSearch } from "react-icons/ci";
import { BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { ArrowRightCircle } from 'lucide-react';  // Add this import

import axios from 'axios';  // Axios for fetching data

export default function StudentTestTable() {
  const [students, setStudents] = useState([]); // State to store student data
  const [overallSummary, setOverallSummary] = useState({
    totalPhysicsTests: 0,
    totalChemistryTests: 0,
    totalBiologyTests: 0,
    totalCount: 0  // Add totalCount to overall summary
  }); // State for overall summary
  const [searchTerm, setSearchTerm] = useState(""); // State for search query
  const [filterType, setFilterType] = useState(""); // State for filter type
  const [showFilterOptions, setShowFilterOptions] = useState(false); // State to show/hide filter options
  const [stats, setStats] = useState({
    totalTests: 0,
    highestMarks: 0, // Updated from averageMarks to highestMarks
    physicsCount: 0,  // Physics Count
    chemistryCount: 0,  // Chemistry Count
    biologyCount: 0,    // Biology Count
  });
  const [sortOrder, setSortOrder] = useState('ascending');  // Sorting order (ascending or descending)
  const [sortType, setSortType] = useState('score'); // Sort by 'score' or 'id'
  const[totalTest, setTotalTest] = useState(0);
  const router = useRouter(); // Router for navigation

  // Fetch overall summary and student data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/generatetest/customize`, {
          params: { filterType, studentId: searchTerm }  // Pass the searchTerm as studentId if it's a valid ID
        });

        // Set the overall summary (total tests by subject)
        const overallSummary = response.data.overallSummary;  // Assuming the API returns this part
        // Calculate totalCount
        const totalCount = overallSummary.totalPhysicsTests + overallSummary.totalChemistryTests + overallSummary.totalBiologyTests;

        setOverallSummary({
          totalPhysicsTests: overallSummary.totalPhysicsTests,
          totalChemistryTests: overallSummary.totalChemistryTests,
          totalBiologyTests: overallSummary.totalBiologyTests,
          totalCount: totalCount  // Add totalCount here
        });

        setStudents(response.data.results); // Set the student data
        // Update stats accordingly
        if (response.data.results.length > 0) {
          const studentStats = response.data.results[0]; // Assuming stats are for the first student, modify accordingly
          setStats({
            totalTests: studentStats.totalTests,
            highestMarks: studentStats.highestScore, // Use highestScore for the stats
            physicsCount: studentStats.physicsCount,  // Physics Count
            chemistryCount: studentStats.chemistryCount,  // Chemistry Count
            biologyCount: studentStats.biologyCount,    // Biology Count
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);  // Re-run the fetch data when searchTerm or filterType changes

  // Filter students based on search query (ID or Name)
    // ——————————————————————————————————————————————————————————
  // 1) Your existing filtered list
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const q = searchTerm.toLowerCase();
      return (
        student.fullName.toLowerCase().includes(q) ||
        String(student.studentId).toLowerCase().includes(q)
      );
    });
  }, [students, searchTerm]);
  
  // 2) Now this effect will only fire when students *or* searchTerm change:
  useEffect(() => {
    const physicsCount   = filteredStudents.filter(s => (s.subjects||[]).includes('Physics')).length;
    const chemistryCount = filteredStudents.filter(s => (s.subjects||[]).includes('Chemistry')).length;
    const biologyCount   = filteredStudents.filter(s => (s.subjects||[]).includes('Biology')).length;
  
    setOverallSummary({
      totalPhysicsTests: physicsCount,
      totalChemistryTests: chemistryCount,
      totalBiologyTests: biologyCount,
      totalCount: physicsCount + chemistryCount + biologyCount
    });
  
    if (filteredStudents.length) {
      const first = filteredStudents[0];
      setStats({
        totalTests: first.totalTests,
        highestMarks: first.highestScore,
        physicsCount: first.physicsCount,
        chemistryCount: first.chemistryCount,
        biologyCount: first.biologyCount,
      });
    } else {
      setStats({ totalTests:0, highestMarks:0, physicsCount:0, chemistryCount:0, biologyCount:0 });
    }
  }, [filteredStudents]);  // now stable
  // ——————————————————————————————————————————————————————————


  // Set totalTest dynamically whenever the student list changes
  useEffect(() => {
    setTotalTest(filteredStudents.length);
  }, [filteredStudents]);  // This effect will run whenever filteredStudents changes

  // Function to download student data as CSV
  const downloadCSV = () => {
    const headers = ['SR.NO', 'STUDENT NAME', 'STUDENT ID', 'TEST NAME', 'SUBJECTS', 'SCORE', 'TOTAL MARKS'];
    const rows = students.map((student, index) => [
      index + 1,
      student.fullName,
      student.studentId,
      student.testName,
      (student.subjects || []).join(", "), // Ensure subjects is an array
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

  // Sorting the students based on the selected filter (score or ID)
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortType === 'score') {
      // Sort by score
      if (sortOrder === 'ascending') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    } else {
      // Sort by student ID
      if (sortOrder === 'ascending') {
        return a.studentId - b.studentId;
      } else {
        return b.studentId - a.studentId;
      }
    }
  });

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };

  // Handle toggle for filter options
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Handle filter option selection (sorting by score or ID)
  const handleFilterSelection = (filter) => {
    if (filter === 'ascending-descending') {
      setSortType('score');
      toggleSortOrder();  // Toggle between ascending and descending order for scores
    }
    else if (filter === 'descending-ascending') {
      setSortType('score');
      toggleSortOrder();  // Toggle between ascending and descending order for scores
    }
    else if (filter === 'by-id') {
      setSortType('id');  // Sort by ID
      setSortOrder('ascending');  // Default order for IDs is ascending
    }
    setShowFilterOptions(false); // Close the filter options after selection
  };

  return (
    <div className="py-6 w-full mx-auto px-4 lg:px-6">
      {/* Search & Buttons Section */}
      <div className="flex lg:flex-row flex-col justify-between items-center gap-5 mb-6 w-full mt-2">
        <div className="relative flex-1 w-full max-w-full">
          <input
            type="text"
            placeholder="Search Name, Student ID..."
            className="lg:w-full w-[400px] pr-7 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md text-sm placeholder:text-gray-500 pl-19"
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
            className=" w-full lg:px-6 lg:py-3 px-4 py-3 bg-white text-gray-400 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition flex justify-center active:scale-95"
          >
            Download Test <BsDownload className="ml-2 text-xl" />
          </button>
        </div>
      </div>
      {/* Filter Bar with Boxed Stats */}
      <div className="lg:flex grid grid-cols-2 lg:flex-wrap gap-2 mb-6 p-3 bg-white rounded-lg drop-shadow hover:bg-white-100 w-full max-w-6xl mx-auto lg:justify-between">
        {[ 
          `Total Tests: ${totalTest}`,
          `Highest Marks: ${stats.highestMarks}`, // Replaced Average Marks with Highest Marks
          `Physics Tests: ${overallSummary.totalPhysicsTests}`,
          `Chemistry Tests: ${overallSummary.totalChemistryTests}`,
          `Biology Tests: ${overallSummary.totalBiologyTests}`
           // Display total count

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
      <div className="border-2 overflow-x-auto rounded-xl lg:rounded-4xl w-full mx-auto">
        <table className="w-full border border-black shadow-md overflow-hidden">
          <thead className="bg-white-100 border-b rounded-xl">
            <tr className="text-center text-sm font-bold text-[2B313E]">
              <th className="p-4 border border-r-white rounded-tl-lg">SR.NO</th>
              <th className="p-4 border border-r-white">STUDENT NAME</th>
              <th className="p-4 border border-r-white">STUDENT ID</th>
              <th className="p-4 border border-r-white">TEST NAME</th>
              <th className="p-4 border border-r-white">SUBJECTS</th>
              <th className="p-4 border border-r-white">SCORE</th>
              <th className="p-4 border border-r-white">TOTAL MARKS</th>
              <th className="p-4 border border-r-white">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-center"> 
            {sortedStudents.map((student, index) => (
              <tr key={`${student.studentId}-${student.testName}`} className="border-b hover:bg-gray-50">
                <td className="p-4 border text-left font-bold">{index + 1}</td>
                <td className="p-4 border">{student.fullName}</td>
                <td className="p-4 border">{student.studentId}</td>
                <td className="p-4 border">{student.testName}</td>
                <td className="p-4 border-b border-black text-[#00B0FF]">{(student.subjects || []).join(", ")}</td>
                <td className="p-4 border-l-1">{student.score}</td>
                <td className="p-4 border-l-1">{student.totalMarks}</td>
                <td className="p-4 border text-center">
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
