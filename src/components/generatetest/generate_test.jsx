"use client";
import React, { useState, useEffect } from "react";
import { 
  ArrowRightCircle, 
  Download, 
  Search, 
  Plus, 
  FileText, 
  Calendar,
  CheckCircle, 
  Loader,
  Filter,
  ChevronLeft,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import * as XLSX from "xlsx";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TestDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testCount, setTestCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Fixed items per page
  const router = useRouter();
  
  // For determining if a test is completed based on date
  const currentDate = new Date();

  // Fetch the test data from the backend
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/test-data`);
        setTestData(response.data.tests);
        setTestCount(response.data.tests.length);
      } catch (err) {
        // Instead of setting error, we'll just set empty test data
        setTestData([]);
        setTestCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  // Filtered data based on search with filter criteria
  const filteredRows = testData.filter((row) => {
    if (searchQuery === "") return true;
    
    switch (searchFilter) {
      case "testName":
        return row.testname?.toLowerCase().includes(searchQuery.toLowerCase());
      case "testId":
        return row.id?.toString().includes(searchQuery);
      case "batch":
        return row.batch_name?.toLowerCase().includes(searchQuery.toLowerCase());
      case "marks":
        return row.marks?.toLowerCase().includes(searchQuery.toLowerCase());
      case "all":
      default:
        return (
          row.batch_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.marks?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.testname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.id?.toString().includes(searchQuery)
        );
    }
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  
  // Check if test is completed based on date
  const isTestCompleted = (testDate) => {
    const date = new Date(testDate);
    return date < currentDate;
  };

  const downloadExcel = () => {
    // Enhanced Excel download with better formatting
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    
    // Format headers
    const headerStyle = {
      font: { bold: true, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "E9ECEF" } }
    };
    
    // Apply some formatting to columns
    const columnWidths = [
      { wch: 10 }, // SR.NO
      { wch: 15 }, // Test ID
      { wch: 30 }, // Test Name
      { wch: 20 }, // Batches
      { wch: 10 }, // Marks
      { wch: 15 }, // Status
      { wch: 20 }, // Created At
      { wch: 18 }, // Total Questions
    ];
    
    worksheet['!cols'] = columnWidths;
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Data");
    XLSX.writeFile(workbook, "test_data.xlsx");
  };

  const handleGenerate = () => {
    // Clear all test-related local storage
    localStorage.removeItem("Biology");
    localStorage.removeItem("Chemistry");
    localStorage.removeItem("Physics");
    localStorage.removeItem("marks");
    localStorage.removeItem("selectedSubjects");
    localStorage.removeItem("testName");
    localStorage.removeItem("ScheduleTest");
  };

  const handleActionClick = (testId) => {
    localStorage.setItem("testid", testId);
    router.push("/test_preview");
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">Loading test data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-20">
      {/* Simplified Header with Centered Text */}
      <div className="bg-white px-8 py-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Test Management Dashboard</h1>
          <p className="text-gray-500">Manage and monitor all your student tests in one place</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Summary - Simpler cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Test Count Card */}
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tests</p>
                <p className="text-2xl font-bold text-gray-800">{testCount}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <FileText size={20} />
              </div>
            </div>
          </div>

          {/* Active Tests Card */}
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Tests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {testData.filter(test => !isTestCompleted(test.createdAt)).length}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* Completed Tests Card */}
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Tests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {testData.filter(test => isTestCompleted(test.createdAt)).length}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <CheckCircle size={20} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal Create Test Card */}
        <div className="mb-8">
          <Link href="/subjectselect">
            <div 
              className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
              onClick={handleGenerate}
            >
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Create New Test</h3>
                  <p className="text-sm text-gray-500">Design a custom assessment for your students</p>
                </div>
              </div>
              <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                Get Started
              </button>
            </div>
          </Link>
        </div>

        {/* Search Bar with Simpler Filter Dropdown */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="relative flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Test Name, Test ID, Batch or Marks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 pr-4 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <select
                className="block rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              >
                <option value="all">All Fields</option>
                <option value="testName">Test Name</option>
                <option value="testId">Test ID</option>
                <option value="batch">Batch</option>
                <option value="marks">Marks</option>
              </select>
            </div>
          </div>

          <button
            onClick={downloadExcel}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={testData.length === 0}
          >
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>

        {/* Test Table with Borders and Centered Text */}
        <div className="overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">No.</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Test ID</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Test Name</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Batches</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Marks</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Status</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Created</th>
                  <th className="border-b-2 border-r-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Questions</th>
                  <th className="border-b-2 border-gray-300 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => {
                    // Determine if test is completed based on date
                    const completed = isTestCompleted(row.createdAt);
                    const displayStatus = completed ? "Completed" : row.status || "Active";
                    const statusColor = completed ? "bg-blue-100 text-blue-800" : getStatusBadge(row.status);
                    
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-900">{indexOfFirstItem + index + 1}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm font-medium text-blue-600">{row.id}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-900">{row.testname}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm text-gray-700">{row.batch_name}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-900">{row.marks}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}>
                            {displayStatus}
                          </span>
                        </td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm text-gray-700">{formatDate(row.createdAt)}</td>
                        <td className="border-b border-r border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-900">{row.no_of_questions}</td>
                        <td className="border-b border-gray-300 px-6 py-4 text-center">
                          <button
                            onClick={() => handleActionClick(row.id)}
                            className="rounded-md bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 hover:shadow-md"
                            title="View test details"
                          >
                            <ArrowRightCircle size={20} strokeWidth={2} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <ClipboardList className="h-16 w-16 text-blue-300" />
                        <p className="mt-4 text-xl font-medium text-gray-700">No Tests Created Yet</p>
                        <p className="mt-2 text-sm text-gray-500">Start creating your first test by clicking the "Create New Test" button above</p>
                        <Link href="/subjectselect">
                          <button
                            onClick={handleGenerate}
                            className="mt-6 flex items-center rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <Plus className="mr-2 h-5 w-5" />
                            Create Your First Test
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {filteredRows.length > 0 && (
            <div className="border-t-2 border-gray-300 bg-gray-50 px-6 py-4 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </div>
                
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 