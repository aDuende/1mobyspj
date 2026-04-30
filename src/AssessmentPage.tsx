"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "./components/ui/card";

interface Assessment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  submittedDate?: string;
}

function AssessmentPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "pastdue" | "completed">("upcoming");

  const assessments: Assessment[] = [
    {
      id: "1",
      title: "Self Assessment",
      description: "Assign by jadi.vort",
      dueDate: "2026-05-06",
      status: "pending"
    },
    {
      id: "2",
      title: "February 2026 Test",
      description: "Assign 2 Feb by honkh.arc",
      dueDate: "2026-02-05",
      status: "overdue"
    },
    {
      id: "3",
      title: "February 2026 Test",
      description: "Submitted on 4 Feb 2026",
      dueDate: "2026-02-04",
      submittedDate: "2026-02-04",
      status: "completed"
    }
  ];

  const getFilteredAssessments = () => {
    if (activeTab === "upcoming") return assessments.filter(a => a.status === "pending");
    if (activeTab === "pastdue") return assessments.filter(a => a.status === "overdue");
    return assessments.filter(a => a.status === "completed");
  };

  const getTabCount = (tab: "upcoming" | "pastdue" | "completed") => {
    if (tab === "upcoming") return assessments.filter(a => a.status === "pending").length;
    if (tab === "pastdue") return assessments.filter(a => a.status === "overdue").length;
    return assessments.filter(a => a.status === "completed").length;
  };

  const filtered = getFilteredAssessments();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 text-foreground">
      <div className="w-full">

        {/* Tabs */}
        <div className="mb-6 px-8">
          <div className="flex gap-1 border-b border-border">
            {[
              { key: "upcoming", label: "Upcoming" },
              { key: "pastdue", label: "Past due" },
              { key: "completed", label: "Completed" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 font-medium transition relative flex items-center gap-2 ${
                  activeTab === tab.key
                    ? "text-[#006BFF] border-b-2 border-[#006BFF]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {tab.key === "pastdue" && getTabCount("pastdue") > 0 && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">

          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">
                No assessments
              </h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((a) => {
                const date = new Date(a.dueDate);
                const day = date.getDate();
                const month = date.toLocaleDateString("en-US", { month: "short" });

                return (
                  <div key={a.id}>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-left">
                      {month} {day}
                    </h3>

                    <Card className="p-6 bg-card border border-border hover:shadow-md transition">
                      <div className="flex items-start gap-4">

                        <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${
                          a.status === "pending"
                            ? "bg-teal-500"
                            : a.status === "overdue"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}>
                          <span className="text-white font-bold text-lg">
                            {day}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground mb-1 text-left">
                            {a.title}
                          </h4>
                          <p className="text-sm text-muted-foreground text-left">
                            {a.description}
                          </p>
                        </div>

                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;