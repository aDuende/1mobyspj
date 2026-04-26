import { Button } from "./components/ui/button";

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

interface HistoryViewDetailsPageProps {
  complaint: Complaint;
  onBack: () => void;
}

interface TimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress";
}

function HistoryViewDetailsPage({
  complaint,
  onBack,
}: HistoryViewDetailsPageProps) {
  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
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

  const getTimelineDotColor = (status: "completed" | "in-progress") => {
    return status === "completed" ? "bg-green-500" : "bg-blue-500";
  };

  // Mock timeline events - in production, this would come from backend
  const timelineEvents: TimelineEvent[] = [
    {
      title: "Complaint resolved",
      description:
        "Module access restored. Permissions misconfiguration corrected by Admin following v3.2 rollback patch.",
      timestamp: "17 Apr 2024 - 14:32",
      status: "completed",
    },
    {
      title: "Under investigation",
      description:
        "Assigned to Admin. Root cause identified as a role-permission migration error during the v3.2 deployment.",
      timestamp: "16 Apr 2024 - 09:10",
      status: "in-progress",
    },
    {
      title: "Complaint acknowledged",
      description: "Received and logged by the helpdesk team.",
      timestamp: "15 Apr 2024 - 08:45",
      status: "in-progress",
    },
    {
      title: "Complaint submitted",
      description: "Submitted via LMS Help portal with 2 attachments.",
      timestamp: "15 Apr 2024 - 07:00",
      status: "in-progress",
    },
  ];

  // Mock attachments
  const mockAttachments = [
    { name: "error-screenshot.png", size: "248 KB", type: "png" },
    { name: "browser-console-log.txt", size: "12 KB", type: "txt" },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back to History</span>
        </button>

        {/* Complaint ID */}
        <p className="text-gray-500 text-sm mb-3">#{complaint.id}</p>

        {/* Title and Badges */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {complaint.subject}
          </h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
              {complaint.category || "Technical"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}
            >
              {complaint.status}
            </span>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 text-left">
              SUBMITTED
            </p>
            <p className="text-gray-900 font-medium text-left">
              {new Date(complaint.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-600 text-left">
              {new Date(complaint.date).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              {new Date(complaint.date)
                .toLocaleTimeString("en-GB", {
                  hour12: true,
                })
                .slice(-2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 text-left">
              RESOLVED
            </p>
            <p className="text-gray-900 font-medium text-left">
              {complaint.resolvedDate
                ? new Date(complaint.resolvedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "17 Apr 2024"}
            </p>
            <p className="text-sm text-gray-600 text-left">
              {complaint.resolvedDate
                ? new Date(complaint.resolvedDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) + " PM"
                : "14:32 PM"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 text-left">
              RESPONSE TIME
            </p>
            <p className="text-gray-900 font-medium text-left">
              {complaint.responseTime || "2 days"}
            </p>
            <p className="text-sm text-gray-500 text-left">Within SLA</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 text-left">
              HANDLED BY
            </p>
            <p className="text-gray-900 font-medium text-left">
              {complaint.respondedBy || "Admin"}
            </p>
            <p className="text-sm text-gray-600 text-left">Team</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-4 text-left">
            DESCRIPTION
          </h2>
          <p className="text-gray-700 leading-relaxed text-left">
            {complaint.details}
          </p>
        </div>

        {/* Attachments */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-4 text-left">
            ATTACHMENTS
          </h2>
          <div className="space-y-3">
            {mockAttachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold ${
                      file.type === "png"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {file.type.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">
                      {file.name}
                    </p>
                    <p className="text-gray-500 text-xs">{file.size}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-900 transition-colors">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div>
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-6 text-left">
            ACTIVITY TIMELINE
          </h2>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${getTimelineDotColor(event.status)}`}
                  ></div>
                  {index < timelineEvents.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="font-semibold text-gray-900 mb-1 text-left">
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2 text-left">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryViewDetailsPage;
