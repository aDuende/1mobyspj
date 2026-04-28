import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "../components/ui/card";

interface Assessment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  submittedDate?: string;
  courseCode?: string;
}

function EmployeeAssessmentPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "pastdue" | "completed">("upcoming");

  // Mock assessment data
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
      description: "Submitted on 4 Feb 2026 at 1:04 pm",
      dueDate: "2026-02-04",
      submittedDate: "2026-02-04",
      status: "completed"
    },
    {
      id: "4",
      title: "January 2026 Assessment",
      description: "Submitted on 15 Jan 2026 at 2:30 pm",
      dueDate: "2026-01-15",
      submittedDate: "2026-01-15",
      status: "completed"
    }
  ];

  const getFilteredAssessments = () => {
    switch (activeTab) {
      case "upcoming":
        return assessments.filter(a => a.status === "pending");
      case "pastdue":
        return assessments.filter(a => a.status === "overdue");
      case "completed":
        return assessments.filter(a => a.status === "completed");
      default:
        return assessments;
    }
  };

  const getTabCount = (tab: "upcoming" | "pastdue" | "completed") => {
    switch (tab) {
      case "upcoming":
        return assessments.filter(a => a.status === "pending").length;
      case "pastdue":
        return assessments.filter(a => a.status === "overdue").length;
      case "completed":
        return assessments.filter(a => a.status === "completed").length;
      default:
        return 0;
    }
  };

  const filteredAssessments = getFilteredAssessments();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Tabs */}
        <div className="mb-6 px-8 pt-8">
          <div className="flex gap-1 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("pastdue")}
              className={`px-6 py-3 font-medium transition-all relative flex items-center gap-2 ${
                activeTab === "pastdue"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past due
              {getTabCount("pastdue") > 0 && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "upcoming" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  No upcoming assessments
                </h3>
                <p className="text-sm text-gray-500">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAssessments.map((assessment) => {
                  const dueDate = new Date(assessment.dueDate);
                  const day = dueDate.getDate();
                  const month = dueDate.toLocaleDateString("en-US", { month: "short" });
                  const weekday = dueDate.toLocaleDateString("en-US", { weekday: "long" });
                  const ordinal = day === 1 || day === 21 || day === 31 ? "st" : 
                                  day === 2 || day === 22 ? "nd" : 
                                  day === 3 || day === 23 ? "rd" : "th";
                  
                  return (
                    <div key={assessment.id}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-left">
                        {month} {day}{ordinal} <span className="text-gray-500 font-normal">{weekday}</span>
                      </h3>
                      <Card className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-teal-500 rounded flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">
                              {day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1 text-left">
                              {assessment.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 text-left">
                              {assessment.description}
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
        )}

        {activeTab === "pastdue" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  No overdue assessments
                </h3>
                <p className="text-sm text-gray-500">
                  Great job staying on track!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAssessments.map((assessment) => {
                  const dueDate = new Date(assessment.dueDate);
                  const day = dueDate.getDate();
                  const month = dueDate.toLocaleDateString("en-US", { month: "short" });
                  const weekday = dueDate.toLocaleDateString("en-US", { weekday: "long" });
                  const ordinal = day === 1 || day === 21 || day === 31 ? "st" : 
                                  day === 2 || day === 22 ? "nd" : 
                                  day === 3 || day === 23 ? "rd" : "th";
                  
                  return (
                    <div key={assessment.id}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-left">
                        {month} {day}{ordinal} <span className="text-gray-500 font-normal">{weekday}</span>
                      </h3>
                      <Card className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">
                              {day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1 text-left">
                              {assessment.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 text-left">
                              {assessment.description}
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
        )}

        {activeTab === "completed" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  No completed assessments
                </h3>
                <p className="text-sm text-gray-500">
                  Completed assessments will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAssessments.map((assessment) => {
                  const submittedDate = assessment.submittedDate ? new Date(assessment.submittedDate) : new Date(assessment.dueDate);
                  const day = submittedDate.getDate();
                  const month = submittedDate.toLocaleDateString("en-US", { month: "short" });
                  const weekday = submittedDate.toLocaleDateString("en-US", { weekday: "long" });
                  const ordinal = day === 1 || day === 21 || day === 31 ? "st" : 
                                  day === 2 || day === 22 ? "nd" : 
                                  day === 3 || day === 23 ? "rd" : "th";
                  
                  return (
                    <div key={assessment.id}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-left">
                        {month} {day}{ordinal} <span className="text-gray-500 font-normal">{weekday}</span>
                      </h3>
                      <Card className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg">
                              {day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1 text-left">
                              {assessment.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 text-left">
                              {assessment.description}
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
        )}
      </div>
    </div>
  );
}

export default EmployeeAssessmentPage;
