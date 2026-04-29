import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingDown, TrendingUp, Minus, Plus, Search, ChevronDown } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface UserIDP {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar: string;
  critical: number;
  strength: number;
  competencyFit: number;
  totalCompetencies: number;
}

const USERS_IDP: UserIDP[] = [
  {
    id: 1,
    name: "Tarin",
    email: "tarin.chon@1moby.com",
    department: "Engineering",
    role: "Employee",
    avatar: "",
    critical: 4,
    strength: 2,
    competencyFit: 7,
    totalCompetencies: 13,
  },
  {
    id: 2,
    name: "Sam",
    email: "sam.frea@1moby.com",
    department: "Engineering",
    role: "Manager",
    avatar: "",
    critical: 2,
    strength: 5,
    competencyFit: 6,
    totalCompetencies: 13,
  },
  {
    id: 3,
    name: "Jess",
    email: "jess.park@1moby.com",
    department: "Product",
    role: "Employee",
    avatar: "",
    critical: 6,
    strength: 1,
    competencyFit: 6,
    totalCompetencies: 13,
  },
  {
    id: 4,
    name: "Alex",
    email: "alex.nguyen@1moby.com",
    department: "Design",
    role: "Employee",
    avatar: "",
    critical: 1,
    strength: 7,
    competencyFit: 5,
    totalCompetencies: 13,
  },
  {
    id: 5,
    name: "Maya",
    email: "maya.sorn@1moby.com",
    department: "HR",
    role: "Manager",
    avatar: "",
    critical: 3,
    strength: 3,
    competencyFit: 7,
    totalCompetencies: 13,
  },
  {
    id: 6,
    name: "Leon",
    email: "leon.vu@1moby.com",
    department: "Finance",
    role: "Employee",
    avatar: "",
    critical: 5,
    strength: 2,
    competencyFit: 6,
    totalCompetencies: 13,
  },
];

function getOverallStatus(user: UserIDP): { label: string; color: string; bg: string } {
  if (user.critical >= 4) {
    return {
      label: "Needs Attention",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
    };
  }
  if (user.strength >= 5) {
    return {
      label: "High Performer",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    };
  }
  return {
    label: "On Track",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  };
}

function AdminIDPPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Needs Attention" | "On Track" | "High Performer">("All");
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const totalCritical = USERS_IDP.filter((u) => u.critical >= 4).length;
  const totalStrength = USERS_IDP.filter((u) => u.strength >= 5).length;
  const totalFit = USERS_IDP.filter(
    (u) => u.critical < 4 && u.strength < 5,
  ).length;

  const filtered = USERS_IDP.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const status = getOverallStatus(u).label;
    const matchesFilter = filterStatus === "All" || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              IDP Overview
            </h2>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Monitor all users' Individual Development Plans
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin-add-course")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Critical */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-rose-500 cursor-pointer transition-all hover:shadow-md ${filterStatus === "Needs Attention" ? "ring-2 ring-rose-400" : ""}`}
            onClick={() =>
              setFilterStatus(
                filterStatus === "Needs Attention" ? "All" : "Needs Attention",
              )
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span
                className="text-xs text-gray-400 dark:text-gray-500 font-medium"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Needs Attention
              </span>
            </div>
            <p
              className="text-3xl font-bold text-rose-600 dark:text-rose-400"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              {totalCritical}
            </p>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Users with critical gaps
            </p>
          </div>

          {/* Strength */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-emerald-500 cursor-pointer transition-all hover:shadow-md ${filterStatus === "High Performer" ? "ring-2 ring-emerald-400" : ""}`}
            onClick={() =>
              setFilterStatus(
                filterStatus === "High Performer" ? "All" : "High Performer",
              )
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span
                className="text-xs text-gray-400 dark:text-gray-500 font-medium"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                High Performer
              </span>
            </div>
            <p
              className="text-3xl font-bold text-emerald-600 dark:text-emerald-400"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              {totalStrength}
            </p>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Users with strong scores
            </p>
          </div>

          {/* Competency Fit */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-blue-500 cursor-pointer transition-all hover:shadow-md ${filterStatus === "On Track" ? "ring-2 ring-blue-400" : ""}`}
            onClick={() =>
              setFilterStatus(filterStatus === "On Track" ? "All" : "On Track")
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Minus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span
                className="text-xs text-gray-400 dark:text-gray-500 font-medium"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                On Track
              </span>
            </div>
            <p
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              {totalFit}
            </p>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Users meeting expectations
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {/* Table toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              />
            </div>
            {filterStatus !== "All" && (
              <button
                onClick={() => setFilterStatus("All")}
                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    User
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Department
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-rose-500 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Critical
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-emerald-500 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Strength
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-blue-500 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Comp. Fit
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Gap Bar
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const status = getOverallStatus(user);
                  const criticalPct = (user.critical / user.totalCompetencies) * 100;
                  const fitPct = (user.competencyFit / user.totalCompetencies) * 100;
                  const strengthPct = (user.strength / user.totalCompetencies) * 100;
                  const isExpanded = expandedUser === user.id;

                  return (
                    <Fragment key={user.id}>
                      <tr
                        className="border-b border-gray-50 dark:border-gray-700/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium" style={{ fontFamily: "Geometrica, sans-serif" }}>
                            {user.department}
                          </span>
                        </td>

                        {/* Critical */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-rose-600 dark:text-rose-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                            {user.critical}
                          </span>
                        </td>

                        {/* Strength */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                            {user.strength}
                          </span>
                        </td>

                        {/* Competency Fit */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                            {user.competencyFit}
                          </span>
                        </td>

                        {/* Gap Bar */}
                        <td className="px-6 py-4">
                          <div className="w-32 mx-auto">
                            <div className="flex h-2 rounded-full overflow-hidden gap-px">
                              <div className="bg-rose-400 dark:bg-rose-500 rounded-l-full" style={{ width: `${criticalPct}%` }} title={`Critical: ${user.critical}`} />
                              <div className="bg-blue-400 dark:bg-blue-500" style={{ width: `${fitPct}%` }} title={`Fit: ${user.competencyFit}`} />
                              <div className="bg-emerald-400 dark:bg-emerald-500 rounded-r-full" style={{ width: `${strengthPct}%` }} title={`Strength: ${user.strength}`} />
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}
                            style={{ fontFamily: "Geometrica, sans-serif" }}
                          >
                            {status.label}
                          </span>
                        </td>

                        {/* Expand */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setExpandedUser(isExpanded ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-transform duration-200"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExpanded && (
                        <tr className="bg-gray-50 dark:bg-gray-700/20">
                          <td colSpan={8} className="px-8 py-5">
                            <div className="flex items-start gap-10">
                              <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                  IDP Summary
                                </p>
                                <div className="flex gap-6">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                      {user.critical} Critical gap{user.critical !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                      {user.competencyFit} Competency fit
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                      {user.strength} Strength{user.strength !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                  Role
                                </p>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                                  {user.role}
                                </span>
                              </div>
                              <div className="ml-auto">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate("/admin-add-course")}
                                  className="flex items-center gap-1.5 text-xs"
                                  style={{ fontFamily: "Geometrica, sans-serif" }}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  Assign Course
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gray-400 dark:text-gray-500 text-sm" style={{ fontFamily: "Geometrica, sans-serif" }}>
                  No users found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminIDPPage;
