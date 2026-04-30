import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "../components/ui/card";
import SelfAssessmentPage from "../SelfAssessmentPage";

interface Assessment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  submittedDate?: string;
  courseCode?: string;
  type?: "self" | "other";
}

function EmployeeAssessmentPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "pastdue" | "completed">("upcoming");
  const [openSelfAssessment, setOpenSelfAssessment] = useState(false);

  if (openSelfAssessment) {
    return (
      <SelfAssessmentPage
        role="employee"
        assessmentTitle="Self Assessment"
        assignedBy="jadi.vort"
        onBack={() => setOpenSelfAssessment(false)}
      />
    );
  }

  const assessments: Assessment[] = [
    {
      id: "1",
      title: "Self Assessment",
      description: "Assign by jadi.vort",
      dueDate: "2026-05-06",
      status: "pending",
      type: "self",
    },
    {
      id: "2",
      title: "February 2026 Test",
      description: "Assign 2 Feb by honkh.arc",
      dueDate: "2026-02-05",
      status: "overdue",
    },
    {
      id: "3",
      title: "February 2026 Test",
      description: "Submitted on 4 Feb 2026 at 1:04 pm",
      dueDate: "2026-02-04",
      submittedDate: "2026-02-04",
      status: "completed",
    },
    {
      id: "4",
      title: "January 2026 Assessment",
      description: "Submitted on 15 Jan 2026 at 2:30 pm",
      dueDate: "2026-01-15",
      submittedDate: "2026-01-15",
      status: "completed",
    },
  ];

  const getFilteredAssessments = () => {
    switch (activeTab) {
      case "upcoming":
        return assessments.filter((a) => a.status === "pending");
      case "pastdue":
        return assessments.filter((a) => a.status === "overdue");
      case "completed":
        return assessments.filter((a) => a.status === "completed");
      default:
        return assessments;
    }
  };

  const getTabCount = (tab: "upcoming" | "pastdue" | "completed") => {
    switch (tab) {
      case "upcoming":
        return assessments.filter((a) => a.status === "pending").length;
      case "pastdue":
        return assessments.filter((a) => a.status === "overdue").length;
      case "completed":
        return assessments.filter((a) => a.status === "completed").length;
      default:
        return 0;
    }
  };

  const formatDateParts = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const ordinal =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";

    return { day, month, weekday, ordinal };
  };

  const filteredAssessments = getFilteredAssessments();

  const tabClass = (tab: "upcoming" | "pastdue" | "completed") =>
    `px-6 py-3 font-medium transition-all relative ${
      activeTab === tab
        ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    }`;

  const cardClass =
    "p-6 bg-white text-gray-900 border border-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:text-white dark:border-gray-700";

  const emptyCardClass =
    "text-center py-12 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700";

  const renderAssessmentList = (
    colorClass: string,
    dateKey: "dueDate" | "submittedDate" = "dueDate",
  ) => (
    <div className="space-y-6">
      {filteredAssessments.map((assessment) => {
        const selectedDate =
          dateKey === "submittedDate"
            ? assessment.submittedDate || assessment.dueDate
            : assessment.dueDate;

        const { day, month, weekday, ordinal } = formatDateParts(selectedDate);

        return (
          <div key={assessment.id}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-left">
              {month} {day}
              {ordinal}{" "}
              <span className="text-gray-500 dark:text-gray-400 font-normal">
                {weekday}
              </span>
            </h3>

            <Card
              className={`${cardClass} ${assessment.type === "self" ? "cursor-pointer hover:border-teal-400" : ""}`}
              onClick={assessment.type === "self" ? () => setOpenSelfAssessment(true) : undefined}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${colorClass} rounded flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-lg">{day}</span>
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 text-left">
                    {assessment.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-left">
                    {assessment.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white">
      <div className="w-full">
        <div className="mb-6 px-8 pt-8">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setActiveTab("upcoming")} className={tabClass("upcoming")}>
              Upcoming
            </button>

            <button onClick={() => setActiveTab("pastdue")} className={`${tabClass("pastdue")} flex items-center gap-2`}>
              Past due
              {getTabCount("pastdue") > 0 && (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <button onClick={() => setActiveTab("completed")} className={tabClass("completed")}>
              Completed
            </button>
          </div>
        </div>

        {activeTab === "upcoming" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className={emptyCardClass}>
                <Clock className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  No upcoming assessments
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You're all caught up!
                </p>
              </div>
            ) : (
              renderAssessmentList("bg-teal-500")
            )}
          </div>
        )}

        {activeTab === "pastdue" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className={emptyCardClass}>
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  No overdue assessments
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Great job staying on track!
                </p>
              </div>
            ) : (
              renderAssessmentList("bg-orange-500")
            )}
          </div>
        )}

        {activeTab === "completed" && (
          <div className="px-8 pb-8">
            {filteredAssessments.length === 0 ? (
              <div className={emptyCardClass}>
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  No completed assessments
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed assessments will appear here.
                </p>
              </div>
            ) : (
              renderAssessmentList("bg-green-500", "submittedDate")
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeAssessmentPage;