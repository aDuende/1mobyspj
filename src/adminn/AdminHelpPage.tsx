"use client";

import { useState, useEffect } from "react";
import { complaintsStore, type Complaint } from "../lib/complaintsStore";
import HistoryViewDetailsPage from "../HistoryViewDetailsPage";

type StatusFilter = "All" | "Pending" | "In Progress" | "Resolved";

function AdminHelpPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [complaints, setComplaints] = useState<Complaint[]>(() =>
    complaintsStore.getAll(),
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("help:subpage", {
        detail: { page: selectedComplaint ? "Details" : null },
      }),
    );
  }, [selectedComplaint]);

  useEffect(() => {
    const handleBack = () => setSelectedComplaint(null);
    window.addEventListener("help:back", handleBack);
    return () => window.removeEventListener("help:back", handleBack);
  }, []);

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "Resolved":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusDotColor = (status: Complaint["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      complaint.subject.toLowerCase().includes(query) ||
      complaint.details.toLowerCase().includes(query) ||
      complaint.id.toLowerCase().includes(query) ||
      complaint.submittedBy.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const statusOptions: StatusFilter[] = [
    "All",
    "Pending",
    "In Progress",
    "Resolved",
  ];

  const statCards = [
    {
      label: "Pending",
      value: complaints.filter((c) => c.status === "Pending").length,
      border: "border-yellow-500",
      filter: "Pending" as StatusFilter,
    },
    {
      label: "In Progress",
      value: complaints.filter((c) => c.status === "In Progress").length,
      border: "border-blue-500",
      filter: "In Progress" as StatusFilter,
    },
    {
      label: "Resolved",
      value: complaints.filter((c) => c.status === "Resolved").length,
      border: "border-green-500",
      filter: "Resolved" as StatusFilter,
    },
    {
      label: "Total",
      value: complaints.length,
      border: "border-gray-400 dark:border-gray-600",
      filter: "All" as StatusFilter,
    },
  ];

  if (selectedComplaint) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-6 pb-6 pt-3 text-foreground dark:bg-gray-900">
        <div className="mx-auto max-w-6xl space-y-4">
          <HistoryViewDetailsPage
            complaint={selectedComplaint}
            onBack={() => {
              setSelectedComplaint(null);
              setComplaints(complaintsStore.getAll());
            }}
            isAdmin
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 pb-6 pt-3 text-foreground dark:bg-gray-900">
      <div className="mx-auto max-w-6xl space-y-4">
        <div>
          <h1 className="text-left text-2xl font-semibold text-gray-900 dark:text-white">
            All Help Requests
          </h1>
          <p className="mt-1 text-left text-sm text-muted-foreground">
            Manage and respond to help requests
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {statCards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => setStatusFilter(card.filter)}
              className={`rounded-lg border-l-4 ${card.border} bg-card p-4 text-left shadow-sm transition hover:bg-muted/50 dark:bg-gray-800 dark:hover:bg-gray-700`}
            >
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                {card.value}
              </div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                statusFilter === status
                  ? "bg-[#006BFF] text-white hover:bg-[#0057d9]"
                  : "bg-card text-muted-foreground shadow-sm hover:bg-muted dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-md bg-card px-4 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-[#006BFF] dark:bg-gray-800"
          />
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="rounded-lg bg-card py-12 text-center shadow-sm dark:bg-gray-800">
            <p className="text-muted-foreground">No complaints found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                className="cursor-pointer rounded-lg bg-card p-4 shadow-sm transition hover:bg-muted/50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${getStatusDotColor(
                      complaint.status,
                    )}`}
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-left font-semibold text-gray-900 dark:text-white">
                      {complaint.subject}
                    </h3>
                    <p className="truncate text-left text-sm text-muted-foreground">
                      {complaint.details}
                    </p>
                    <p className="mt-1 truncate text-left text-xs text-muted-foreground">
                      {complaint.submittedBy}
                    </p>
                  </div>

                  <div className="shrink-0 space-y-1 text-right">
                    <div className="text-xs text-muted-foreground">
                      {new Date(complaint.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <span
                      className={`inline-flex rounded-sm px-2 py-1 text-xs font-medium ${getStatusColor(
                        complaint.status,
                      )}`}
                    >
                      {complaint.status}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      {complaint.id}
                    </div>
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
