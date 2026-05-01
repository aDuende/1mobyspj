import { useState, useEffect, useRef } from "react";
import {
  Users,
  PenLine,
  Bell,
  AlertTriangle,
  ShieldCheck,
  Info,
  X,
  ChevronRight,
  ArrowRight,
  UserCheck,
  UserX,
  Plus,
  Megaphone,
  ChevronDown,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";

// ── types ──────────────────────────────────────────────────────────────────────
interface SystemAlert {
  id: number;
  level: "critical" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  dismissed?: boolean;
}

// ── constants ──────────────────────────────────────────────────────────────────
const GEO = { fontFamily: "Geometrica, sans-serif" };

// ── AnimatedNumber ─────────────────────────────────────────────────────────────
const AnimatedNumber = ({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = 0,
      end = value;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
};

// ── mock data ──────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  {
    id: 1,
    name: "Tarin Chon",
    email: "tarin.chon@1moby.com",
    role: "Employee",
    department: "Engineering",
    status: "active" as const,
    initials: "TC",
    color: "#ec4899",
  },
  {
    id: 2,
    name: "Sam Frea",
    email: "sam.frea@1moby.com",
    role: "Manager",
    department: "Engineering",
    status: "active" as const,
    initials: "SF",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Alex Nguyen",
    email: "alex.nguyen@1moby.com",
    role: "Employee",
    department: "Tech",
    status: "active" as const,
    initials: "AN",
    color: "#3b82f6",
  },
  {
    id: 4,
    name: "Jess Park",
    email: "jess.park@1moby.com",
    role: "Employee",
    department: "Product",
    status: "active" as const,
    initials: "JP",
    color: "#f97316",
  },
  {
    id: 5,
    name: "Leon Vu",
    email: "leon.vu@1moby.com",
    role: "Manager",
    department: "Finance",
    status: "active" as const,
    initials: "LV",
    color: "#8b5cf6",
  },
  {
    id: 6,
    name: "Maya Sorn",
    email: "maya.sorn@1moby.com",
    role: "Employee",
    department: "Marketing",
    status: "inactive" as const,
    initials: "MS",
    color: "#f59e0b",
  },
  {
    id: 7,
    name: "Chris Dana",
    email: "chris.dana@1moby.com",
    role: "",
    department: "Sales",
    status: "active" as const,
    initials: "CD",
    color: "#6366f1",
  },
  {
    id: 8,
    name: "Pat Linh",
    email: "pat.linh@1moby.com",
    role: "",
    department: "HR",
    status: "active" as const,
    initials: "PL",
    color: "#14b8a6",
  },
];

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    topic: "Increase Salary",
    details:
      "Request for salary adjustment based on performance evaluation, reviewed and approved for Q2.",
    department: "Tech",
    role: "Engineer",
    date: "Feb 25",
    type: "info" as const,
  },
  {
    id: 2,
    topic: "New Policy Update",
    details:
      "Certain policies have been updated to ensure better alignment with company goals and compliance.",
    department: "BU",
    role: "Team Lead",
    date: "Feb 22",
    type: "warning" as const,
  },
  {
    id: 3,
    topic: "System Maintenance",
    details:
      "Scheduled maintenance to improve platform performance. Downtime expected: Apr 30, 02:00–04:00.",
    department: "HR",
    role: "Engineer",
    date: "Feb 12",
    type: "critical" as const,
  },
  {
    id: 4,
    topic: "New Feature Launch",
    details:
      "Excited to introduce new features to enhance your learning experience on ConteX Skills.",
    department: "Tech",
    role: "Director",
    date: "Jan 29",
    type: "info" as const,
  },
  {
    id: 5,
    topic: "Upcoming Team Event",
    details:
      "We are pleased to announce an all-hands event scheduled for May 10th at the HQ auditorium.",
    department: "Tech",
    role: "Team Lead",
    date: "Jan 24",
    type: "info" as const,
  },
  {
    id: 6,
    topic: "Security Account Update",
    details:
      "All users must update passwords by May 1st to comply with the new security policy.",
    department: "HR",
    role: "Engineer",
    date: "Jan 14",
    type: "warning" as const,
  },
];

const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 1,
    level: "critical",
    title: "System Maintenance Scheduled",
    message: "Platform will be down Apr 30, 02:00–04:00 UTC. Notify all users.",
    time: "2h ago",
  },
  {
    id: 2,
    level: "warning",
    title: "2 Users Without Assigned Role",
    message: "Chris Dana and Pat Linh have no role assigned. Action required.",
    time: "5h ago",
  },
  {
    id: 3,
    level: "warning",
    title: "3 Unread Policy Acknowledgements",
    message: "Some employees have not acknowledged the latest policy update.",
    time: "1d ago",
  },
  {
    id: 4,
    level: "info",
    title: "New Competency Cycle Starting",
    message:
      "Q2 2026 assessment cycle opens May 1. Ensure IDPs are up-to-date.",
    time: "2d ago",
  },
  {
    id: 5,
    level: "info",
    title: "Platform Update v2.4 Released",
    message: "New dashboard features deployed. See changelog for details.",
    time: "3d ago",
  },
];

const ROLE_DIST = [
  { role: "Employee", count: 5, color: "#3b82f6" },
  { role: "Manager", count: 2, color: "#8b5cf6" },
  { role: "Admin", count: 1, color: "#f97316" },
  { role: "Unassigned", count: 2, color: "#d1d5db" },
];

const DEPT_DIST = [
  { name: "Engineering", count: 3 },
  { name: "Finance", count: 1 },
  { name: "Marketing", count: 1 },
  { name: "Product", count: 1 },
  { name: "HR", count: 1 },
  { name: "Sales", count: 1 },
];

const ANN_TYPE_ICON = {
  critical: <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
  info: <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />,
};
const ANN_TYPE_BG = {
  critical: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  warning:
    "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
};
const ALERT_ICON = {
  critical: <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
  info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
};
const ALERT_BORDER = {
  critical: "border-l-4 border-red-400 bg-red-50 dark:bg-red-900/20",
  warning: "border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20",
  info: "border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20",
};

// ── component ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [alertFilter, setAlertFilter] = useState<
    "all" | "critical" | "warning" | "info"
  >("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [annTab, setAnnTab] = useState<"all" | "critical" | "warning" | "info">(
    "all",
  );

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setFilterOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const dismissAlert = (id: number) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "active").length;
  const unassigned = MOCK_USERS.filter((u) => !u.role).length;
  const totalAnn = MOCK_ANNOUNCEMENTS.length;
  const criticalAnn = MOCK_ANNOUNCEMENTS.filter(
    (a) => a.type === "critical",
  ).length;
  const activeAlerts = alerts.length;

  const filteredAlerts =
    alertFilter === "all"
      ? alerts
      : alerts.filter((a) => a.level === alertFilter);
  const filteredAnn =
    annTab === "all"
      ? MOCK_ANNOUNCEMENTS
      : MOCK_ANNOUNCEMENTS.filter((a) => a.type === annTab);

  const maxDept = Math.max(...DEPT_DIST.map((d) => d.count));

  return (
    <div
      className="p-6 space-y-4 bg-[#f8fafc] dark:bg-transparent min-h-screen"
      style={GEO}
    >
      {/* ── Row 1: Metric Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "Total Users",
            value: totalUsers,
            icon: <Users className="w-4 h-4 text-blue-500" />,
            trend: "+3 this month",
            trendColor: "text-blue-500 dark:text-blue-400",
          },
          {
            label: "Active Users",
            value: activeUsers,
            icon: <UserCheck className="w-4 h-4 text-emerald-500" />,
            trend: `${activeUsers} online`,
            trendColor: "text-emerald-500 dark:text-emerald-400",
          },
          {
            label: "Unassigned Roles",
            value: unassigned,
            icon: <UserX className="w-4 h-4 text-rose-500" />,
            trend: "Needs action",
            trendColor: "text-rose-500 dark:text-rose-400",
          },
          {
            label: "Announcements",
            value: totalAnn,
            icon: <Megaphone className="w-4 h-4 text-purple-500" />,
            trend: "Published",
            trendColor: "text-purple-500 dark:text-purple-400",
          },
          {
            label: "Critical Notices",
            value: criticalAnn,
            icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
            trend: "High priority",
            trendColor: "text-amber-500 dark:text-amber-400",
          },
          {
            label: "Active Alerts",
            value: activeAlerts,
            icon: <Bell className="w-4 h-4 text-orange-500" />,
            trend: "Need review",
            trendColor: "text-orange-500 dark:text-orange-400",
          },
        ].map((c, i) => (
          <Card
            key={i}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none flex flex-col gap-2 text-left"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(12px)",
              transition: `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                {c.label}
              </p>
              {c.icon}
            </div>
            <p className="text-[26px] font-bold text-gray-800 dark:text-white leading-none">
              <AnimatedNumber value={isMounted ? c.value : 0} />
            </p>
            <p className={`text-[10px] font-medium ${c.trendColor}`}>
              {c.trend}
            </p>
          </Card>
        ))}
      </div>

      {/* ── Row 2: System Alerts + Role Management ───────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* System Alerts */}
        <Card
          className="col-span-12 xl:col-span-5 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none"
          style={{
            opacity: isMounted ? 1 : 0,
            transition: "opacity .6s ease 200ms",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">
                System Alerts
              </h2>
              {activeAlerts > 0 && (
                <span className="text-[10px] font-bold bg-red-500 text-white rounded-full px-2 py-0.5">
                  {activeAlerts}
                </span>
              )}
            </div>
            {/* Filter dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${filterOpen ? "bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-200" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              >
                {alertFilter === "all"
                  ? "All"
                  : alertFilter.charAt(0).toUpperCase() + alertFilter.slice(1)}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${filterOpen ? "rotate-180 text-[#fc4c02]" : ""}`}
                />
              </button>
              <div
                className={`absolute top-full right-0 mt-1.5 w-32 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl p-1 shadow-xl z-50 transition-all duration-200 origin-top-right ${filterOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
              >
                {(["all", "critical", "warning", "info"] as const).map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setAlertFilter(opt);
                        setFilterOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${alertFilter === opt ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/60"}`}
                    >
                      <span className="flex-1 text-left capitalize">{opt}</span>
                      {alertFilter === opt && (
                        <Check className="w-3 h-3 text-orange-500" />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
            {filteredAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <ShieldCheck className="w-10 h-10 mb-2 text-emerald-400" />
                <p className="text-[13px] font-medium">All clear — no alerts</p>
              </div>
            ) : (
              filteredAlerts.map((alert, i) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-2xl ${ALERT_BORDER[alert.level]} transition-all duration-300`}
                  style={{
                    opacity: isMounted ? 1 : 0,
                    transition: `opacity .4s ease ${0.25 + i * 0.06}s`,
                  }}
                >
                  <div className="mt-0.5">{ALERT_ICON[alert.level]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold text-gray-800 dark:text-white leading-tight truncate">
                        {alert.title}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 transition-all shrink-0 mt-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Alert footer */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              {filteredAlerts.length} alert
              {filteredAlerts.length !== 1 ? "s" : ""} showing
            </span>
            {alerts.length > 0 && (
              <button
                onClick={() => setAlerts([])}
                className="text-[11px] text-rose-400 hover:text-rose-600 font-medium transition-colors"
              >
                Dismiss all
              </button>
            )}
          </div>
        </Card>

        {/* Role Management Summary */}
        <Card
          className="col-span-12 md:col-span-6 xl:col-span-4 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none"
          style={{
            opacity: isMounted ? 1 : 0,
            transition: "opacity .6s ease 300ms",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">
                Manage Roles
              </h2>
            </div>
            <button
              onClick={() => navigate("/manage-role")}
              className="text-[11px] text-[#006bff] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Role distribution */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {ROLE_DIST.map((r, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-50 dark:bg-gray-700/50 text-center"
                style={{
                  opacity: isMounted ? 1 : 0,
                  transition: `opacity .4s ease ${0.35 + i * 0.07}s`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ background: r.color }}
                >
                  <AnimatedNumber value={isMounted ? r.count : 0} />
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {r.role}
                </span>
              </div>
            ))}
          </div>

          {/* Recent users list */}
          <h3 className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Recent Members
          </h3>
          <div className="space-y-1.5">
            {MOCK_USERS.slice(0, 5).map((u, i) => (
              <div
                key={u.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/manage-role")}
                style={{
                  opacity: isMounted ? 1 : 0,
                  transition: `opacity .4s ease ${0.4 + i * 0.07}s`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ background: u.color }}
                >
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 dark:text-white truncate leading-tight">
                    {u.name}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {u.department}
                  </p>
                </div>
                {u.role ? (
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full px-2 py-0.5 shrink-0">
                    {u.role}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-rose-50 text-rose-500 rounded-full px-2 py-0.5 shrink-0">
                    No Role
                  </span>
                )}
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${u.status === "active" ? "bg-emerald-400" : "bg-gray-300"}`}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/manage-role")}
            className="mt-3 flex items-center justify-between w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-[12px] font-semibold"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Manage All Users &amp; Roles
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* Department distribution */}
        <Card
          className="col-span-12 md:col-span-6 xl:col-span-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none"
          style={{
            opacity: isMounted ? 1 : 0,
            transition: "opacity .6s ease 400ms",
          }}
        >
          <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight mb-3">
            By Department
          </h2>
          <div className="space-y-3">
            {DEPT_DIST.map((d, i) => (
              <div
                key={i}
                style={{
                  opacity: isMounted ? 1 : 0,
                  transition: `opacity .4s ease ${0.4 + i * 0.06}s`,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
                    {d.name}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {d.count} member{d.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                    style={{
                      width: `${isMounted ? (d.count / maxDept) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 3: Announcements ─────────────────────────────────────────────── */}
      <Card
        className="p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none"
        style={{
          opacity: isMounted ? 1 : 0,
          transition: "opacity .6s ease 500ms",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
              <PenLine className="w-4 h-4 text-purple-500" />
            </div>
            <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">
              Announcements
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Tab filters */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              {(["all", "critical", "warning", "info"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAnnTab(tab)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${annTab === tab ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`}
                >
                  {tab === "all"
                    ? "All"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("/announcement")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 transition-colors text-[12px] font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Compose
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAnn.map((ann, i) => (
            <div
              key={ann.id}
              className={`p-3.5 rounded-2xl border cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${ANN_TYPE_BG[ann.type]}`}
              onClick={() => navigate("/announcement")}
              style={{
                opacity: isMounted ? 1 : 0,
                transition: `opacity .4s ease ${0.5 + i * 0.07}s`,
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                {ANN_TYPE_ICON[ann.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white leading-tight truncate">
                    {ann.topic}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {ann.date} · {ann.department} · {ann.role}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {ann.details}
              </p>
              <div className="mt-2.5 flex items-center justify-end">
                <span className="text-[11px] text-[#006bff] font-medium flex items-center gap-1 hover:underline">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredAnn.length === 0 && (
          <div className="flex flex-col items-center py-10 text-gray-400">
            <Bell className="w-10 h-10 mb-2 opacity-30" />
            <p className="text-[13px]">No announcements in this category</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            {filteredAnn.length} announcement
            {filteredAnn.length !== 1 ? "s" : ""} showing
          </span>
          <button
            onClick={() => navigate("/announcement")}
            className="text-[11px] text-[#006bff] hover:underline font-medium flex items-center gap-1"
          >
            View all announcements <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </Card>
    </div>
  );
}
