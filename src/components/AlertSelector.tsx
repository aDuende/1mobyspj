import React, { useState, useRef, useEffect } from "react";
import { Bell, X, AlertTriangle, Info, ShieldCheck } from "lucide-react";

const GEO = { fontFamily: "Geometrica, sans-serif" };

// ── Notification data based on actual app data ────────────────────────────────
type NotifLevel = "critical" | "warning" | "info" | "success";

interface Notif {
  id: number;
  level: NotifLevel;
  title: string;
  message: string;
  time: string;
  read: boolean;
  initials: string;
  color: string;
}

const INITIAL_NOTIFS: Notif[] = [
  {
    id: 1, level: "critical",
    title: "Jess Park — 7 critical gaps",
    message: "Product Manager in the Product team has 7 competencies below expected. IDP review recommended.",
    time: "5 min ago", read: false, initials: "JP", color: "#f97316",
  },
  {
    id: 2, level: "critical",
    title: "Leon Vu — 6 critical gaps",
    message: "Finance Lead has 6 competencies below expected including Stakeholder Communication and Project Execution.",
    time: "12 min ago", read: false, initials: "LV", color: "#8b5cf6",
  },
  {
    id: 3, level: "warning",
    title: "Tarin Chon — 5 critical gaps",
    message: "Senior Analyst has the worst gap score of −2 on Stakeholder Communication. Courses have been suggested.",
    time: "30 min ago", read: false, initials: "TC", color: "#ec4899",
  },
  {
    id: 4, level: "info",
    title: "New announcement posted",
    message: "\"Q2 Learning Goals\" announcement has been published to all employees.",
    time: "1h ago", read: false, initials: "AD", color: "#006BFF",
  },
  {
    id: 5, level: "success",
    title: "Sam Frea — High performer",
    message: "Engineering Manager achieved 8 strengths this cycle. Recognised as a top performer.",
    time: "2h ago", read: true, initials: "SF", color: "#10b981",
  },
  {
    id: 6, level: "warning",
    title: "2 users have no role assigned",
    message: "Chris Dana and Pat Linh do not have a role assigned. Please update in Manage Role.",
    time: "3h ago", read: true, initials: "MR", color: "#6366f1",
  },
  {
    id: 7, level: "info",
    title: "Alex Nguyen — High performer",
    message: "Senior Designer achieved 6 strengths with a positive +0.6 trend this cycle.",
    time: "5h ago", read: true, initials: "AN", color: "#3b82f6",
  },
];

const LEVEL_ICON: Record<NotifLevel, React.ReactNode> = {
  critical: <AlertTriangle className="w-3 h-3" />,
  warning:  <AlertTriangle className="w-3 h-3" />,
  info:     <Info className="w-3 h-3" />,
  success:  <ShieldCheck className="w-3 h-3" />,
};

const LEVEL_BADGE: Record<NotifLevel, string> = {
  critical: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  warning:  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  info:     "bg-blue-100 text-[#006BFF] dark:bg-blue-900/30 dark:text-blue-400",
  success:  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

// ── Component ────────────────────────────────────────────────────────────────
const AlertSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL_NOTIFS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;
  const displayed = tab === "unread" ? notifs.filter((n) => !n.read) : notifs;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: number) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  function markRead(id: number) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center w-11 h-11 rounded-full
          transition-all duration-300 active:scale-[0.96] cursor-pointer border-transparent group
          bg-transparent hover:bg-white dark:hover:bg-gray-800
          text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
          hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]
        `}
        title="Notifications"
      >
        <div className={`relative ${isHovered ? "animate-alert-ring" : ""}`}>
          <Bell className="w-5 h-5 transition-colors duration-300 group-hover:text-[#006BFF]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
          )}
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-13 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-200 overflow-hidden"
          style={GEO}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <button
              onClick={markAllRead}
              className="text-[11px] text-[#006BFF] hover:underline font-medium"
            >
              Mark all as read
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-5 pt-3 pb-1">
            <button
              onClick={() => setTab("all")}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                tab === "all"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              All Notifications
            </button>
            <button
              onClick={() => setTab("unread")}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors flex items-center gap-1.5 ${
                tab === "unread"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${tab === "unread" ? "bg-white/20 dark:bg-gray-900/20" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Notification list */}
          <ul className="overflow-y-auto max-h-96 divide-y divide-gray-50 dark:divide-gray-800 px-2 py-2">
            {displayed.length === 0 && (
              <li className="py-10 text-center text-sm text-gray-400">
                No notifications.
              </li>
            )}
            {displayed.map((n) => (
              <li
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`relative flex items-start gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors group ${
                  !n.read ? "bg-blue-50/60 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: n.color }}
                >
                  {n.initials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${LEVEL_BADGE[n.level]}`}>
                      {LEVEL_ICON[n.level]}
                      {n.level}
                    </span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#006BFF] shrink-0" />
                    )}
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-snug">{n.title}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0 mt-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertSelector;
