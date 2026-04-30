import { useState } from "react";
import { complaintsStore, type Complaint } from "./lib/complaintsStore";

interface HistoryViewDetailsPageProps {
  complaint: Complaint;
  onBack: () => void;
  isAdmin?: boolean;
}

interface TimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress";
}

function HistoryViewDetailsPage({
  complaint,
}: HistoryViewDetailsPageProps) {
  const [currentStatus, setCurrentStatus] = useState<Complaint["status"]>(complaint.status);

  const handleStatusChange = (newStatus: Complaint["status"]) => {
    complaintsStore.update(complaint.id, { status: newStatus });
    setCurrentStatus(newStatus);
  };
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Complaint ID */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          #{complaint.id}
        </p>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {complaint.subject}
          </h1>

          <div className="flex gap-2 flex-wrap items-center">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
              {complaint.category || "Technical"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentStatus)} dark:bg-opacity-20`}
            >
              {currentStatus}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-left">
              SUBMITTED
            </p>
            <p className="text-gray-900 dark:text-gray-100 text-left">
              {complaint.date}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-left">
            DESCRIPTION
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-left">
            {complaint.details}
          </p>
        </div>

        {/* Attachments */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-left">
            ATTACHMENTS
          </h2>

          <div className="space-y-3">
            {mockAttachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-white bg-blue-500 px-2 py-1 rounded text-xs">
                    {file.type}
                  </div>

                  <div>
                    <p className="text-gray-900 dark:text-gray-100 text-sm">
                      {file.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {file.size}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs text-gray-500 dark:text-gray-400 mb-6 text-left">
            ACTIVITY TIMELINE
          </h2>

          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${getTimelineDotColor(event.status)}`}
                  ></div>
                  <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-2"></div>
                </div>

                <div className="flex-1 pb-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-left">
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {currentStatus !== "Resolved" && currentStatus !== "Closed" && (
          <div className="flex gap-3 mt-2 mb-8">
            {currentStatus === "Pending" && (
              <button
                onClick={() => handleStatusChange("In Progress")}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                In Progress
              </button>
            )}
            <button
              onClick={() => handleStatusChange("Resolved")}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Resolve
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default HistoryViewDetailsPage;
