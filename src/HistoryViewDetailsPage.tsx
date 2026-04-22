import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

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
}

interface HistoryViewDetailsPageProps {
  complaint: Complaint;
  onBack: () => void;
}

function HistoryViewDetailsPage({ complaint, onBack }: HistoryViewDetailsPageProps) {
  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Complaint Details
          </h1>
          <p className="text-gray-500 text-base">
            View detailed information about your complaint.
          </p>
        </div>

        {/* Complaint Details Card */}
        <Card className="p-8 bg-white shadow-sm mb-6">
          {/* Header with Status */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {complaint.subject}
              </h2>
              <p className="text-sm text-gray-500">
                Complaint ID: <span className="font-semibold">{complaint.id}</span>
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Submission Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Submission Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Submitted Date</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(complaint.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Status</p>
                <p className="text-base font-medium text-gray-900">
                  {complaint.status}
                </p>
              </div>
            </div>
          </div>

          {/* Complaint Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Complaint Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {complaint.details}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {complaint.fileCount > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Attachments ({complaint.fileCount})
              </h3>
              <div className="space-y-2">
                {complaint.attachments ? (
                  complaint.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
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
                        <span className="text-sm text-gray-700">{file}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Download
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      {complaint.fileCount} file(s) attached
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin Response */}
          {complaint.response && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Admin Response
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {complaint.respondedBy || "HR Administrator"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {complaint.responseDate
                        ? new Date(complaint.responseDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "Response provided"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {complaint.response}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to History
            </Button>
            {complaint.status !== "Closed" && (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send Follow-up
              </Button>
            )}
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-8 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Activity Timeline
          </h3>
          <div className="space-y-6">
            {/* Timeline Item */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-semibold text-gray-900">
                  {complaint.status === "Resolved" ? "Complaint Resolved" : `Status: ${complaint.status}`}
                </p>
                <p className="text-sm text-gray-500">Current status</p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-semibold text-gray-900">Complaint Submitted</p>
                <p className="text-sm text-gray-500">
                  {new Date(complaint.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HistoryViewDetailsPage;
