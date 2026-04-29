import { useState } from "react";
import { CheckCircle2, Clock, Users } from "lucide-react";
import { Card } from "../components/ui/card";

interface Assessment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  submittedDate?: string;
  courseCode?: string;
  employeeName?: string;
}

function ManagerAssessmentPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "pastdue" | "completed">("upcoming");
  const [viewMode, setViewMode] = useState<"my" | "team">("my");

  // Mock assessment data for manager
  const myAssessments: Assessment[] = [
    {
      id: "m1",
      title: "Leadership Assessment Q2",
      description: "Due at 11:59 PM",
      dueDate: "2026-06-30",
      status: "pending",
      courseCode: "MGMT_401_2026"
    },
    {
      id: "m2",
      title: "Team Performance Review",
      description: "Assign 1 Apr by hr.dept",
      dueDate: "2026-04-15",
      status: "overdue"
    },
    {
      id: "m3",
      title: "Q1 Management Review",
      description: "Submitted on 31 Mar 2026 at 3:45 pm",
      dueDate: "2026-03-31",
      submittedDate: "2026-03-31",
      status: "completed"
    }
  ];

  // Mock team assessments
  const teamAssessments: Assessment[] = [
    {
      id: "t1",
      title: "Self Assessment",
      description: "Assign by jadi.vort",
      dueDate: "2026-05-06",
      status: "pending",
      employeeName: "John Smith"
    },
    {
      id: "t2",
      title: "Technical Skills Assessment",
      description: "Pending submission",
      dueDate: "2026-04-20",
      status: "overdue",
      employeeName: "Sarah Johnson"
    },
    {
      id: "t3",
      title: "February 2026 Test",
      description: "Submitted on 4 Feb 2026 at 1:04 pm",
      dueDate: "2026-02-04",
      submittedDate: "2026-02-04",
      status: "completed",
      employeeName: "Mike Chen"
    },
    {
      id: "t4",
      title: "Customer Service Training",
      description: "Submitted on 10 Mar 2026 at 10:15 am",
      dueDate: "2026-03-10",
      submittedDate: "2026-03-10",
      status: "completed",
      employeeName: "Emily Davis"
    }
  ];

  const getFilteredAssessments = () => {
    const assessments = viewMode === "my" ? myAssessments : teamAssessments;
    
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
    const assessments = viewMode === "my" ? myAssessments : teamAssessments;
    
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
    <div className="min-h-screen bg-red-50">
      <div className="w-full">
        {/* View Mode Toggle */}
        <div className="mb-6 px-8 pt-8">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("my")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === "my"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              My Assessments
            </button>
            <button
              onClick={() => setViewMode("team")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                viewMode === "team"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              Team Assessments
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 px-8">
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
                  {viewMode === "my" ? "You're all caught up!" : "Your team is all caught up!"}
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
                            {assessment.employeeName && (
                              <p className="text-xs text-gray-500 text-left">
                                {assessment.employeeName}
                              </p>
                            )}
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
                  {viewMode === "my" ? "Great job staying on track!" : "Your team is on track!"}
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
                            {assessment.employeeName && (
                              <p className="text-xs text-gray-500 text-left">
                                Employee: {assessment.employeeName}
                              </p>
                            )}
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
                            {assessment.employeeName && (
                              <p className="text-xs text-gray-500 text-left">
                                Employee: {assessment.employeeName}
                              </p>
                            )}
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

export default ManagerAssessmentPage;
