import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import HistoryViewDetailsPage from "./HistoryViewDetailsPage";

interface Complaint {
  id: string;
  subject: string;
  details: string;
  date: string;
  status: "Pending" | "In Progress" | "Resolved" | "Closed";
  fileCount: number;
  attachments?: string[];
  response?: string;
  responseDate?: string;
  respondedBy?: string;
  resolvedDate?: string;
  responseTime?: string;
  category?: string;
}

function HelpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"submit" | "history">(
    location.pathname === '/help/history' ? 'history' : 'submit'
  );
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "In Progress" | "Resolved">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sync activeTab with URL
  useEffect(() => {
    if (location.pathname === '/help/history') {
      setActiveTab('history');
    } else {
      setActiveTab('submit');
    }
  }, [location.pathname]);
  
  // Mock complaint history - in production, this would come from backend
  const [complaints] = useState<Complaint[]>([
    {
      id: "CMP-2024-001",
      subject: "Technical issue",
      details: "Unable to access the performance review module after the latest platform update. The page returns a 403 error when navigating from the dashboard. Issue started on 14 Apr 2024 following the v3.2 deployment. Both Chrome and Edge browsers were affected.",
      date: "2024-04-15",
      status: "Resolved",
      fileCount: 2,
      category: "Technical",
      resolvedDate: "2024-04-17",
      responseTime: "2 days",
      respondedBy: "Admin"
    },
    {
      id: "CMP-2024-002",
      subject: "Leave request delay",
      details: "My annual leave request for May 2024 is still pending approval for 2 weeks.",
      date: "2024-04-10",
      status: "In Progress",
      fileCount: 0,
      category: "HR",
      respondedBy: "Admin"
    },
    {
      id: "CMP-2024-003",
      subject: "Account problem",
      details: "Cannot reset my password. The email verification link is not arriving.",
      date: "2024-04-05",
      status: "Pending",
      fileCount: 1,
      category: "Account"
    }
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !details) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle form submission here
    console.log({
      subject,
      details,
      files
    });

    // Reset form
    setSubject("");
    setDetails("");
    setFiles([]);
    
    alert("Your complaint has been submitted. We will get back to you as soon as possible.");
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
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

  const filteredComplaints = complaints.filter(complaint => {
    const matchesFilter = statusFilter === "All" || complaint.status === statusFilter;
    const matchesSearch = complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // If a complaint is selected, show the details page
  if (selectedComplaint) {
    return (
      <HistoryViewDetailsPage
        complaint={selectedComplaint}
        onBack={() => setSelectedComplaint(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto relative">
        {/* History Icon - Fixed to top right */}
        {activeTab === "submit" && (
          <div className="absolute top-0 right-0">
            <button
              onClick={() => navigate('/help/history')}
              className="p-3 rounded-lg font-semibold transition-colors bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
              title="View Complaint History"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
        
        {activeTab === "history" && (
          <div className="absolute top-0 right-0">
            <button
              onClick={() => navigate('/help')}
              className="p-3 rounded-lg font-semibold transition-colors bg-white text-blue-600 hover:bg-gray-100 border-2 border-blue-600"
              title="Back to Submit Complaint"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}
        
        {/* Submit New Complaint Tab */}
        {activeTab === "submit" && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 text-left">
                How can we help you?
              </h1>
              <p className="text-gray-500 text-base text-left">
                Please fill out the information below, and we will get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Complaint Subject */}
            <div>
              <label className="block text-s text-left font-bold text-gray-900 mb-2">
                Complaint Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-500 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">--- Select Subject ---</option>
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Problem</option>
                  <option value="performance">Performance Review</option>
                  <option value="leave">Leave Request</option>
                  <option value="training">Training & Development</option>
                  <option value="benefits">Benefits & Compensation</option>
                  <option value="workplace">Workplace Environment</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-s text-left font-bold text-gray-900 mb-2">
                Details <span className="text-red-500">*</span>
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue you encountered..."
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                rows={6}
                required
              />
            </div>

            {/* Attach Images */}
            <div>
              <label className="block text-s font-bold text-gray-900 mb-2 text-left">
                Attach images (optional)
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClickUpload}
                className={`bg-white border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <svg
                    className="w-16 h-16 text-blue-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-400">
                    Click to upload or drag and drop files here
                  </p>
                </div>
              </div>

              {/* Display selected files */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Submit Complaint
              </Button>
            </div>
          </form>
          </div>
        )}

        {/* My History Tab */}
        {activeTab === "history" && (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 text-left">
                My Complaint History
              </h1>
              <p className="text-gray-500 text-base text-left">
                Track the status of your submitted complaints and requests.
              </p>
            </div>

            {/* Filter Buttons and Search */}
            <div className="mb-6 flex gap-3 items-center">
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
                  onClick={() => setStatusFilter("Resolved")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === "Resolved"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Resolved
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
                  onClick={() => setStatusFilter("Pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === "Pending"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Pending
                </button>
              </div>
              <div className="flex-1 max-w-md ml-auto">
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

            {complaints.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-16 w-16 text-gray-300 mb-4"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No complaints yet
                </h3>
                <p className="text-gray-500">
                  You haven't submitted any complaints. Click "Submit New Complaint" to get started.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-semibold text-gray-500 uppercase text-left  tracking-wide mb-4">RECENT</h2>
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
                      No {statusFilter === "All" ? "" : statusFilter.toLowerCase()} complaints found
                    </h3>
                    <p className="text-sm text-gray-500">
                      Try selecting a different filter to view other complaints.
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
                          <h3 className="text-base font-bold text-gray-900 mb-1 text-left">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HelpPage;
