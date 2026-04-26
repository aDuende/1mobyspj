import { useState, useEffect } from "react";
import { complaintsStore, type Complaint } from "../lib/complaintsStore";
import HistoryViewDetailsPage from "../HistoryViewDetailsPage";

function AdminHelpPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "In Progress" | "Resolved">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<"All" | string>("All");

  // Load all complaints from store
  useEffect(() => {
    const allComplaints = complaintsStore.getAll();
    setComplaints(allComplaints);
  }, []);

  const handleStatusUpdate = (complaintId: string, newStatus: Complaint["status"]) => {
    complaintsStore.update(complaintId, { 
      status: newStatus,
      respondedBy: "Admin",
      responseDate: new Date().toISOString().split('T')[0]
    });
    
    // Reload complaints
    setComplaints(complaintsStore.getAll());
  };

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDotColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-orange-500";
      case "In Progress":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-500";
      case "Closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleBadgeColor = (role: "employee" | "manager" | "admin") => {
    switch (role) {
      case "employee":
        return "bg-blue-100 text-blue-700";
      case "manager":
        return "bg-purple-100 text-purple-700";
      case "admin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // All available subject categories
  const allSubjects = [
    "Technical Issue",
    "Account Problem",
    "Performance Review",
    "Leave Request",
    "Training & Development",
    "Benefits & Compensation",
    "Workplace Environment",
    "Other"
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatusFilter = statusFilter === "All" || complaint.status === statusFilter;
    const matchesSubjectFilter = subjectFilter === "All" || complaint.category === subjectFilter || complaint.subject === subjectFilter;
    const matchesSearch = complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatusFilter && matchesSubjectFilter && matchesSearch;
  });

  // If a complaint is selected, show the details page
  if (selectedComplaint) {
    return (
      <HistoryViewDetailsPage
        complaint={selectedComplaint}
        onBack={() => {
          setSelectedComplaint(null);
          // Reload to get any updates
          setComplaints(complaintsStore.getAll());
        }}
        isAdmin={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-left">
            All Help Requests
          </h1>
          <p className="text-gray-500 text-base text-left">
            Manage and respond to help requests from all users.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">
              {complaints.filter(c => c.status === "Pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">
              {complaints.filter(c => c.status === "In Progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">
              {complaints.filter(c => c.status === "Resolved").length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
            <div className="text-2xl font-bold text-gray-900">
              {complaints.length}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Filter Buttons and Search */}
        <div className="mb-6 space-y-3">
          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "All"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("Pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "Pending"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("In Progress")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "In Progress"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter("Resolved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "Resolved"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Resolved
            </button>
          </div>

          {/* Subject Filter and Search */}
          <div className="flex gap-3 items-center">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Subjects</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              No complaints found
            </h3>
            <p className="text-sm text-gray-500">
              Try selecting different filters to view other complaints.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  {/* Status Dot */}
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${getStatusDotColor(complaint.status)}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 text-left mb-1">
                      {complaint.subject}
                    </h3>
                    <p className="text-sm text-gray-600 text-left">
                      {complaint.details}
                    </p>
                  </div>
                  
                  {/* Right Side Info */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-sm text-gray-600">
                      {new Date(complaint.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {complaint.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHelpPage;
