import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { AlertCircle, CheckCircle, Clock, History } from "lucide-react";

interface HelpRequest {
  id: number;
  user: string;
  role: string;
  subject: string;
  description: string;
  status: "pending" | "resolved";
  timestamp: string;
  createdAt: number; // Unix timestamp for automatic archiving
  archived?: boolean;
}

interface HelpPageProps {
  username: string;
  role: "employee" | "manager" | "admin";
}

// Load requests from localStorage
const loadRequestsFromStorage = (): HelpRequest[] => {
  try {
    const stored = localStorage.getItem("helpRequests");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save requests to localStorage
const saveRequestsToStorage = (requests: HelpRequest[]) => {
  localStorage.setItem("helpRequests", JSON.stringify(requests));
};

// Check if request is older than 1 minute (for testing)
// const isOlderThan1Minute = (createdAt: number): boolean => {
//   const oneMinuteInMs = 1 * 60 * 1000;
//   return Date.now() - createdAt > oneMinuteInMs;
// };

// Check if request is older than 30 days
const isOlderThan30Days = (createdAt: number): boolean => {
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  return Date.now() - createdAt > thirtyDaysInMs;
};

function HelpPage({ username, role }: HelpPageProps) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [requests, setRequests] = useState<HelpRequest[]>(() => {
    const loadedRequests = loadRequestsFromStorage();

    // Auto-archive requests older than 30 days
    const updatedRequests = loadedRequests.map((req) => ({
      ...req,
      archived: isOlderThan30Days(req.createdAt),
    }));

    // Persist if any changes were made
    if (JSON.stringify(loadedRequests) !== JSON.stringify(updatedRequests)) {
      saveRequestsToStorage(updatedRequests);
    }

    return updatedRequests;
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: HelpRequest = {
      id: Date.now(),
      user: username,
      role: role === "employee" ? "Employee" : "Manager",
      subject,
      description,
      status: "pending",
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      createdAt: Date.now(),
      archived: false,
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    saveRequestsToStorage(updatedRequests);
    setSubject("");
    setDescription("");
    setSubmitSuccess(true);

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleStatusChange = (id: number) => {
    const updatedRequests = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status:
              req.status === "pending"
                ? ("resolved" as const)
                : ("pending" as const),
          }
        : req,
    );
    setRequests(updatedRequests);
    saveRequestsToStorage(updatedRequests);
  };

  // Filter active (non-archived) requests
  const activeRequests = requests.filter(
    (req) => !req.archived && (role === "admin" || req.user === username),
  );

  // Filter archived requests
  const archivedRequests = requests.filter(
    (req) => req.archived && (role === "admin" || req.user === username),
  );

  return (
    <div className="min-h-full p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Help & Support
            </h1>
            <p
              className="text-gray-600 dark:text-gray-400 mt-2"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              {role === "admin"
                ? "View and manage help requests from users"
                : "Submit help requests about system issues or platform problems"}
            </p>
          </div>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="outline"
            className="flex items-center gap-2"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            <History className="w-4 h-4" />
            {showHistory ? "Show Active" : "Show History"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submit Help Request Form - For Employee & Manager */}
          {role !== "admin" && !showHistory && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2
                className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Submit Help Request
              </h2>

              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p
                    className="text-sm text-green-600 dark:text-green-400"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Help request submitted successfully!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="e.g., System crash, Cannot open platform"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Submit Request
                </Button>
              </form>
            </div>
          )}

          {/* Help Requests List */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${role === "admin" || showHistory ? "lg:col-span-2" : ""}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-semibold text-gray-900 dark:text-white"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                {showHistory
                  ? role === "admin"
                    ? "Archived Requests (30+ days old)"
                    : "Your Archived Requests"
                  : role === "admin"
                    ? "All Help Requests"
                    : "Your Requests"}
              </h2>
              {!showHistory && (
                <span
                  className="text-sm text-gray-500 dark:text-gray-400"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Automatically archived after 30 days
                </span>
              )}
            </div>

            <div className="space-y-4">
              {(showHistory ? archivedRequests : activeRequests).map(
                (request) => (
                  <div
                    key={request.id}
                    className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 ${showHistory ? "opacity-75" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-semibold text-gray-900 dark:text-white"
                            style={{ fontFamily: "Geometrica, sans-serif" }}
                          >
                            {request.subject}
                          </h3>
                          {showHistory && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                              Archived
                            </span>
                          )}
                          {request.status === "pending" ? (
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Resolved
                            </span>
                          )}
                        </div>
                        <p
                          className="text-sm text-gray-600 dark:text-gray-400"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          {role === "admin" &&
                            `${request.user} (${request.role}) • `}
                          {request.timestamp}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <p
                      className="text-gray-700 dark:text-gray-300"
                      style={{ fontFamily: "Geometrica, sans-serif" }}
                    >
                      {request.description}
                    </p>

                    {role === "admin" && !showHistory && (
                      <Button
                        onClick={() => handleStatusChange(request.id)}
                        variant={
                          request.status === "pending" ? "default" : "outline"
                        }
                        size="sm"
                        className="mt-2"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        {request.status === "pending"
                          ? "Mark as Resolved"
                          : "Mark as Pending"}
                      </Button>
                    )}
                  </div>
                ),
              )}

              {(showHistory ? archivedRequests : activeRequests).length ===
                0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p
                    className="text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    {showHistory
                      ? "No archived requests"
                      : "No help requests yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
