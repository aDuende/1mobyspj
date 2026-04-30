import { useState, useRef, useEffect } from "react";
import {
  Search, ChevronDown, Save, RotateCcw, TrendingUp, TrendingDown,
  Minus, Check, AlertTriangle, Sparkles, Users, BarChart2,
  ShieldCheck, ClipboardList,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from "recharts";
import { Card } from "../components/ui/card";

// ── Types ──────────────────────────────────────────────────────────────────────
type Track = "Core" | "Functional" | "Managerial";

interface Competency {
  code: string; track: Track; name: string; description: string;
}
interface UserScore {
  code: string; actual: number; expected: number;
}
interface UserProfile {
  id: number; name: string; initials: string; role: string;
  team: string; tenure: string; level: string; scores: UserScore[];
}

// ── Animated Number ────────────────────────────────────────────────────────────
const AnimatedNumber = ({
  value, decimals = 0, suffix = "",
}: { value: number; decimals?: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const end = value;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      setDisplay(end * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]); // eslint-disable-line
  return <>{display.toFixed(decimals)}{suffix}</>;
};

// ── Constants ──────────────────────────────────────────────────────────────────
const GEO = { fontFamily: "Geometrica, sans-serif" };

const COMPETENCIES: Competency[] = [
  { code: "CC01", track: "Core",       name: "Create Impact",             description: "Drives meaningful work with clear ownership of role and organizational value." },
  { code: "CC02", track: "Core",       name: "Take Ownership",            description: "Owns work end-to-end; solves problems without escalating prematurely." },
  { code: "CC03", track: "Core",       name: "Adaptive",                  description: "Strong problem solver; continuous learner; embraces change." },
  { code: "CC04", track: "Core",       name: "Collaboration",             description: "Works effectively in teams; understands own role and responsibilities." },
  { code: "FC01", track: "Functional", name: "Data Analysis",             description: "Extracts insights from data to support business decisions." },
  { code: "FC02", track: "Functional", name: "Stakeholder Communication", description: "Communicates clearly and effectively with all stakeholder levels." },
  { code: "FC03", track: "Functional", name: "Strategic Thinking",        description: "Connects daily work to long-term organizational goals." },
  { code: "FC04", track: "Functional", name: "Project Execution",         description: "Delivers projects on time, on scope, and to quality standards." },
  { code: "FC05", track: "Functional", name: "Process Improvement",       description: "Identifies and implements meaningful workflow improvements." },
  { code: "MC01", track: "Managerial", name: "Process",                   description: "Plans, organizes, delegates, and keeps work running smoothly." },
  { code: "MC02", track: "Managerial", name: "Purpose",                   description: "Sets vision, thinks strategically, and manages risk." },
  { code: "MC03", track: "Managerial", name: "People",                    description: "Develops talent, coaches, and builds high-performing teams." },
  { code: "MC04", track: "Managerial", name: "Result",                    description: "Drives outcomes, raises efficiency, and holds standards." },
];

const USER_COLORS: Record<number, string> = {
  1: "#f97316", 2: "#8b5cf6", 3: "#ec4899",
  4: "#10b981", 5: "#3b82f6", 6: "#f59e0b",
};

const USERS: UserProfile[] = [
  {
    id: 1, name: "Jess Park", initials: "JP", role: "Product Manager", team: "Product", tenure: "1y 8m", level: "L3",
    scores: [
      { code: "CC01", actual: 2, expected: 3 }, { code: "CC02", actual: 2, expected: 3 },
      { code: "CC03", actual: 3, expected: 3 }, { code: "CC04", actual: 3, expected: 4 },
      { code: "FC01", actual: 2, expected: 3 }, { code: "FC02", actual: 3, expected: 3 },
      { code: "FC03", actual: 2, expected: 3 }, { code: "FC04", actual: 3, expected: 3 },
      { code: "FC05", actual: 2, expected: 3 }, { code: "MC01", actual: 2, expected: 3 },
      { code: "MC02", actual: 3, expected: 3 }, { code: "MC03", actual: 2, expected: 3 },
      { code: "MC04", actual: 3, expected: 3 },
    ],
  },
  {
    id: 2, name: "Leon Vu", initials: "LV", role: "Finance Lead", team: "Finance", tenure: "4y 6m", level: "L4",
    scores: [
      { code: "CC01", actual: 2, expected: 3 }, { code: "CC02", actual: 3, expected: 3 },
      { code: "CC03", actual: 2, expected: 3 }, { code: "CC04", actual: 4, expected: 4 },
      { code: "FC01", actual: 4, expected: 4 }, { code: "FC02", actual: 2, expected: 3 },
      { code: "FC03", actual: 3, expected: 4 }, { code: "FC04", actual: 2, expected: 3 },
      { code: "FC05", actual: 3, expected: 3 }, { code: "MC01", actual: 3, expected: 3 },
      { code: "MC02", actual: 2, expected: 3 }, { code: "MC03", actual: 3, expected: 4 },
      { code: "MC04", actual: 2, expected: 3 },
    ],
  },
  {
    id: 3, name: "Tarin Chon", initials: "TC", role: "HR Manager", team: "HR", tenure: "3y 2m", level: "L3",
    scores: [
      { code: "CC01", actual: 3, expected: 4 }, { code: "CC02", actual: 4, expected: 4 },
      { code: "CC03", actual: 3, expected: 3 }, { code: "CC04", actual: 4, expected: 4 },
      { code: "FC01", actual: 3, expected: 3 }, { code: "FC02", actual: 4, expected: 4 },
      { code: "FC03", actual: 3, expected: 4 }, { code: "FC04", actual: 3, expected: 3 },
      { code: "FC05", actual: 2, expected: 3 }, { code: "MC01", actual: 4, expected: 4 },
      { code: "MC02", actual: 3, expected: 4 }, { code: "MC03", actual: 4, expected: 4 },
      { code: "MC04", actual: 3, expected: 4 },
    ],
  },
  {
    id: 4, name: "Sam Frea", initials: "SF", role: "Sales Lead", team: "Sales", tenure: "2y 4m", level: "L3",
    scores: [
      { code: "CC01", actual: 3, expected: 3 }, { code: "CC02", actual: 3, expected: 3 },
      { code: "CC03", actual: 2, expected: 3 }, { code: "CC04", actual: 4, expected: 4 },
      { code: "FC01", actual: 2, expected: 3 }, { code: "FC02", actual: 4, expected: 4 },
      { code: "FC03", actual: 3, expected: 3 }, { code: "FC04", actual: 3, expected: 3 },
      { code: "FC05", actual: 2, expected: 3 }, { code: "MC01", actual: 3, expected: 3 },
      { code: "MC02", actual: 3, expected: 3 }, { code: "MC03", actual: 2, expected: 3 },
      { code: "MC04", actual: 3, expected: 3 },
    ],
  },
  {
    id: 5, name: "Alex Nguyen", initials: "AN", role: "Tech Lead", team: "Engineering", tenure: "5y 1m", level: "L5",
    scores: [
      { code: "CC01", actual: 4, expected: 4 }, { code: "CC02", actual: 4, expected: 4 },
      { code: "CC03", actual: 4, expected: 4 }, { code: "CC04", actual: 4, expected: 4 },
      { code: "FC01", actual: 4, expected: 4 }, { code: "FC02", actual: 3, expected: 4 },
      { code: "FC03", actual: 4, expected: 4 }, { code: "FC04", actual: 4, expected: 4 },
      { code: "FC05", actual: 4, expected: 4 }, { code: "MC01", actual: 4, expected: 4 },
      { code: "MC02", actual: 3, expected: 4 }, { code: "MC03", actual: 3, expected: 4 },
      { code: "MC04", actual: 4, expected: 4 },
    ],
  },
  {
    id: 6, name: "Maya Sorn", initials: "MS", role: "Marketing Specialist", team: "Marketing", tenure: "1y 3m", level: "L2",
    scores: [
      { code: "CC01", actual: 2, expected: 3 }, { code: "CC02", actual: 2, expected: 3 },
      { code: "CC03", actual: 3, expected: 3 }, { code: "CC04", actual: 3, expected: 3 },
      { code: "FC01", actual: 2, expected: 3 }, { code: "FC02", actual: 3, expected: 3 },
      { code: "FC03", actual: 2, expected: 3 }, { code: "FC04", actual: 2, expected: 3 },
      { code: "FC05", actual: 2, expected: 3 }, { code: "MC01", actual: 1, expected: 2 },
      { code: "MC02", actual: 1, expected: 2 }, { code: "MC03", actual: 1, expected: 2 },
      { code: "MC04", actual: 2, expected: 2 },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
const LEVEL_BG = [
  "", "bg-gray-100 text-gray-600", "bg-blue-100 text-blue-700",
  "bg-amber-100 text-amber-700", "bg-orange-100 text-orange-600",
  "bg-rose-100 text-rose-600",
];

function ScoreDots({ value, max = 4, color = "#FC4C02" }: { value: number; max?: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full" style={{ background: i < value ? color : "#e5e7eb" }} />
      ))}
    </div>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-colors text-sm font-bold leading-none"
      >−</button>
      <span className="w-5 text-center text-sm font-bold text-gray-800 tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(4, value + 1))}
        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-colors text-sm font-bold leading-none"
      >+</button>
    </div>
  );
}

function StatPill({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <div>
        <p className={`text-base font-bold leading-none ${color}`}>{value}</p>
        <p className="text-[10px] text-gray-400">{label}</p>
      </div>
    </div>
  );
}

const TRACK_COLOR: Record<Track, string> = {
  Core: "text-gray-500", Functional: "text-green-600", Managerial: "text-purple-500",
};

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AdminCompetencyProfilePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [teamOpen, setTeamOpen] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState(3);
  const [track, setTrack] = useState<Track>("Core");

  const [edits, setEdits] = useState<Record<number, Record<string, number>>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (teamRef.current && !teamRef.current.contains(e.target as Node)) setTeamOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const teams = ["All", ...Array.from(new Set(USERS.map((u) => u.team)))];

  const filtered = USERS.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.team.toLowerCase().includes(q)) &&
      (teamFilter === "All" || u.team === teamFilter)
    );
  });

  const user = USERS.find((u) => u.id === selectedId)!;

  const getScore = (code: string, uid = user.id): UserScore => {
    const u = USERS.find((x) => x.id === uid)!;
    const base = u.scores.find((s) => s.code === code)!;
    const editedExp = edits[uid]?.[code];
    return editedExp !== undefined ? { ...base, expected: editedExp } : base;
  };

  const setExpected = (code: string, value: number) => {
    setSaved((prev) => ({ ...prev, [user.id]: false }));
    setEdits((prev) => ({
      ...prev,
      [user.id]: { ...(prev[user.id] ?? {}), [code]: value },
    }));
  };

  const resetUser = () => {
    setEdits((prev) => { const n = { ...prev }; delete n[user.id]; return n; });
    setSaved((prev) => ({ ...prev, [user.id]: false }));
  };

  const saveUser = () => setSaved((prev) => ({ ...prev, [user.id]: true }));

  const hasEdits = Object.keys(edits[user.id] ?? {}).length > 0;
  const isSaved = saved[user.id];

  // ── Stat calculations ──────────────────────────────────────────────────────
  const savedCount = USERS.filter((u) => saved[u.id]).length;
  const notSavedCount = USERS.length - savedCount;

  // org-wide gaps
  const orgTotalGaps = USERS.reduce((acc, u) =>
    acc + COMPETENCIES.filter((c) => {
      const s = getScore(c.code, u.id);
      return s.expected > s.actual;
    }).length, 0
  );

  // org avg actual
  const orgAvgActual = (
    USERS.reduce((acc, u) =>
      acc + COMPETENCIES.reduce((a, c) => a + getScore(c.code, u.id).actual, 0), 0
    ) / (USERS.length * COMPETENCIES.length)
  );

  // current user
  const trackComps = COMPETENCIES.filter((c) => c.track === track);
  const scores = trackComps.map((c) => getScore(c.code));
  const gaps = scores.filter((s) => s.expected > s.actual).length;
  const strengths = scores.filter((s) => s.actual >= s.expected).length;
  const avgActual = scores.reduce((s, x) => s + x.actual, 0) / scores.length;
  const avgExpected = scores.reduce((s, x) => s + x.expected, 0) / scores.length;

  const allScores = COMPETENCIES.map((c) => getScore(c.code));
  const totalGaps = allScores.filter((s) => s.expected > s.actual).length;
  const totalStr  = allScores.filter((s) => s.actual >= s.expected).length;

  const radarData = trackComps.map((c) => {
    const s = getScore(c.code);
    return { subject: c.name.split(" ")[0], actual: s.actual * 25, expected: s.expected * 25 };
  });

  // ── Metric cards ───────────────────────────────────────────────────────────
  const metricCards = [
    { label: "Total Members",        value: USERS.length,  icon: <Users        className="w-4 h-4 text-blue-500" />,   trend: "All tracked",         trendColor: "text-blue-500 dark:text-blue-400"     },
    { label: "Users With Gaps",       value: USERS.filter((u) => COMPETENCIES.some((c) => { const s = getScore(c.code, u.id); return s.expected > s.actual; })).length,
                                                            icon: <AlertTriangle className="w-4 h-4 text-rose-500" />,  trend: "Across org",          trendColor: "text-rose-500 dark:text-rose-400"      },
    { label: "Org Avg Score",         value: orgAvgActual, decimals: 1, suffix: " /4",
                                                            icon: <BarChart2    className="w-4 h-4 text-orange-500" />, trend: "All competencies",    trendColor: "text-orange-500 dark:text-orange-400"  },
    { label: "Total Gaps (Org)",      value: orgTotalGaps, icon: <ShieldCheck  className="w-4 h-4 text-amber-500" />,  trend: "Needs attention",     trendColor: "text-amber-500 dark:text-amber-400"   },
    { label: "Expected Not Set",      value: notSavedCount,icon: <ClipboardList className="w-4 h-4 text-purple-500" />,trend: notSavedCount === 0 ? "All configured!" : "Users pending",
                                                                                                                        trendColor: notSavedCount === 0 ? "text-emerald-500" : "text-purple-500 dark:text-purple-400" },
    { label: "Expected Configured",   value: savedCount,   icon: <Sparkles     className="w-4 h-4 text-emerald-500" />,trend: `of ${USERS.length} members`,  trendColor: "text-emerald-500 dark:text-emerald-400" },
  ];

  return (
    <div className="p-6 space-y-4 bg-[#f8fafc] dark:bg-transparent min-h-screen" style={GEO}>

      {/* ── Row 1: Metric Cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metricCards.map((c, i) => (
          <Card key={i} className="p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none flex flex-col gap-2 text-left"
            style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? "translateY(0)" : "translateY(12px)", transition: `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{c.label}</p>
              {c.icon}
            </div>
            <p className="text-[26px] font-bold text-gray-800 dark:text-white leading-none">
              <AnimatedNumber value={isMounted ? c.value : 0} decimals={(c as any).decimals ?? 0} suffix={(c as any).suffix ?? ""} />
            </p>
            <p className={`text-[10px] font-medium ${c.trendColor}`}>{c.trend}</p>
          </Card>
        ))}
      </div>

      {/* ── Row 2: User list + Detail ─────────────────────────────────────────── */}
      <div className="flex gap-4 items-start">

        {/* ── Left: User list ─────────────────────────────────────────────────── */}
        <Card
          className="w-72 shrink-0 bg-white dark:bg-gray-800 rounded-2xl border-none shadow-none flex flex-col overflow-hidden"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 300ms" }}
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-[13px] font-bold text-gray-800 dark:text-white mb-3">All Members</p>
            <div className="relative mb-2">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, role, team…"
                className="w-full pl-8 pr-3 py-2 text-[12px] border border-gray-200 dark:border-gray-600 rounded-xl outline-none focus:border-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div ref={teamRef} className="relative">
              <button
                onClick={() => setTeamOpen((v) => !v)}
                className="flex items-center justify-between w-full px-3 py-2 text-[12px] border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 transition-colors"
              >
                <span>{teamFilter === "All" ? "All Teams" : teamFilter}</span>
                <ChevronDown size={12} className={`transition-transform ${teamOpen ? "rotate-180 text-[#fc4c02]" : ""}`} />
              </button>
              {teamOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-30 py-1 overflow-hidden">
                  {teams.map((t) => (
                    <button key={t} onClick={() => { setTeamFilter(t); setTeamOpen(false); }}
                      className={`flex items-center justify-between w-full px-3 py-1.5 text-[12px] text-left transition-colors ${
                        teamFilter === t ? "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {t}
                      {teamFilter === t && <Check size={11} className="text-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/50">
            {filtered.map((u, i) => {
              const uGaps = COMPETENCIES.filter((c) => {
                const s = getScore(c.code, u.id);
                return s.expected > s.actual;
              }).length;
              const isActive = u.id === selectedId;
              return (
                <button key={u.id} onClick={() => { setSelectedId(u.id); setTrack("Core"); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 ${isActive ? "bg-orange-50 dark:bg-orange-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
                  style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.3 + i * 0.06}s` }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                    style={{ background: isActive ? "#fc4c02" : USER_COLORS[u.id] }}
                  >
                    {u.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-[12px] font-semibold truncate ${isActive ? "text-orange-700 dark:text-orange-400" : "text-gray-800 dark:text-white"}`}>{u.name}</p>
                      {uGaps > 0 && (
                        <span className="text-[10px] font-bold bg-red-50 text-red-500 rounded-full px-1.5 py-0.5 shrink-0">{uGaps} gap{uGaps !== 1 ? "s" : ""}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 truncate">{u.role} · {u.team}</p>
                  </div>
                  {saved[u.id] && (
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check size={9} className="text-emerald-600" />
                    </div>
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-[12px] text-gray-400">No members found</div>
            )}
          </div>
        </Card>

        {/* ── Right: Detail panel ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* Profile header */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-none px-5 py-4 rounded-2xl"
            style={{ opacity: isMounted ? 1 : 0, transition: "opacity .5s ease 350ms" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md"
                style={{ background: `linear-gradient(135deg, ${USER_COLORS[user.id]}, ${USER_COLORS[user.id]}bb)` }}
              >
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-[20px] font-bold text-gray-900 dark:text-white">{user.name}</h1>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_BG[parseInt(user.level.replace("L",""))]}`}>{user.level}</span>
                  {isSaved && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                      <Check size={10} /> Saved
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-500 dark:text-gray-400">{user.role} · {user.team} · {user.tenure}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <StatPill icon={<AlertTriangle size={13} className="text-red-400" />} value={totalGaps} label="Gaps" color="text-red-500" />
                <StatPill icon={<Sparkles size={13} className="text-emerald-500" />} value={totalStr} label="Met" color="text-emerald-600" />
                <div className="w-px h-8 bg-gray-100 dark:bg-gray-700" />
                {hasEdits && !isSaved && (
                  <button onClick={resetUser}
                    className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-1.5 transition-colors"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                )}
                <button onClick={saveUser} disabled={!hasEdits || isSaved}
                  className={`flex items-center gap-1.5 text-[12px] font-semibold rounded-xl px-4 py-1.5 transition-colors ${
                    hasEdits && !isSaved ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700" : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Save size={12} /> Save
                </button>
              </div>
            </div>
          </Card>

          {/* Track tabs */}
          <div className="flex gap-2">
            {(["Core", "Functional", "Managerial"] as Track[]).map((t) => {
              const tGaps = COMPETENCIES.filter((c) => c.track === t).filter((c) => {
                const s = getScore(c.code); return s.expected > s.actual;
              }).length;
              const active = track === t;
              return (
                <button key={t} onClick={() => setTrack(t)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                    active ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {t}
                  {tGaps > 0 && (
                    <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${active ? "bg-white/20 text-white dark:bg-black/20 dark:text-white" : "bg-red-50 text-red-500"}`}>
                      {tGaps}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main grid: radar + cards */}
          <div className="grid grid-cols-5 gap-4 items-start">

            {/* Radar */}
            <Card className="col-span-2 bg-white dark:bg-gray-800 border-none shadow-none p-4 rounded-2xl"
              style={{ opacity: isMounted ? 1 : 0, transition: "opacity .5s ease 400ms" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300">{track} Overview</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FC4C02] inline-block" />Actual</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6] inline-block" />Expected</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }} outerRadius="65%">
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Geometrica, sans-serif" }} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb", fontFamily: "Geometrica, sans-serif" }}
                    formatter={(v) => [String(Math.round(Number(v) / 25)) + " / 4"]}
                  />
                  <Radar dataKey="expected" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 3" fill="#3b82f6" fillOpacity={0.05} />
                  <Radar dataKey="actual" stroke="#FC4C02" strokeWidth={2} fill="#FC4C02" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { label: "Avg Actual",    value: avgActual.toFixed(1),    bg: "bg-gray-50 dark:bg-gray-700",   textColor: "text-gray-800 dark:text-white" },
                  { label: "Avg Expected",  value: avgExpected.toFixed(1),  bg: "bg-gray-50 dark:bg-gray-700",   textColor: "text-gray-800 dark:text-white" },
                  { label: "Gaps",          value: String(gaps),            bg: "bg-red-50 dark:bg-red-900/20",  textColor: "text-red-500" },
                  { label: "Met / Exceeded",value: String(strengths),       bg: "bg-emerald-50 dark:bg-emerald-900/20", textColor: "text-emerald-600" },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-xl px-3 py-2`}>
                    <p className="text-[10px] text-gray-400 mb-0.5">{s.label}</p>
                    <p className={`text-[18px] font-bold ${s.textColor} leading-none`}>
                      {s.value}<span className="text-[11px] text-gray-400 font-normal">{i < 2 ? " /4" : ""}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Competency cards */}
            <div className="col-span-3 space-y-2.5">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-4 py-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Competency</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold w-20 text-center">Actual</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold w-28 text-center">Expected (set)</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold w-12 text-center">Gap</p>
              </div>

              {trackComps.map((comp, ci) => {
                const s = getScore(comp.code);
                const gap = s.expected - s.actual;
                const isEdited = edits[user.id]?.[comp.code] !== undefined;
                return (
                  <div key={comp.code}
                    className={`bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 transition-all duration-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-0.5 ${
                      gap > 0 ? "border-l-2 border-red-300" : "border-l-2 border-transparent"
                    } ${isEdited ? "ring-1 ring-orange-200" : ""}`}
                    style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + ci * 0.06}s` }}
                  >
                    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 items-center">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold ${TRACK_COLOR[comp.track]}`}>{comp.code}</span>
                          <span className="text-[13px] font-semibold text-gray-800 dark:text-white">{comp.name}</span>
                          {isEdited && <span className="text-[9px] font-semibold text-orange-500 bg-orange-50 rounded-full px-1.5 py-0.5">edited</span>}
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug line-clamp-1">{comp.description}</p>
                      </div>
                      <div className="w-20 flex flex-col items-center gap-1">
                        <ScoreDots value={s.actual} color="#FC4C02" />
                        <span className="text-[10px] font-semibold text-gray-600">{s.actual} / 4</span>
                      </div>
                      <div className="w-28 flex flex-col items-center gap-1">
                        <ScoreDots value={s.expected} color="#3b82f6" />
                        <Stepper value={s.expected} onChange={(v) => setExpected(comp.code, v)} />
                      </div>
                      <div className="w-12 flex flex-col items-center">
                        {gap > 0 ? (
                          <><TrendingDown size={14} className="text-red-400" /><span className="text-[10px] font-bold text-red-500">−{gap}</span></>
                        ) : gap < 0 ? (
                          <><TrendingUp size={14} className="text-emerald-500" /><span className="text-[10px] font-bold text-emerald-500">+{Math.abs(gap)}</span></>
                        ) : (
                          <><Minus size={14} className="text-gray-300" /><span className="text-[10px] font-bold text-gray-300">0</span></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Save bar */}
              {hasEdits && !isSaved && (
                <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-2xl px-4 py-3">
                  <p className="text-[12px] text-orange-700 dark:text-orange-300">
                    <span className="font-semibold">{Object.keys(edits[user.id] ?? {}).length}</span> expected score{Object.keys(edits[user.id] ?? {}).length !== 1 ? "s" : ""} changed for <span className="font-semibold">{user.name}</span>
                  </p>
                  <div className="flex gap-2">
                    <button onClick={resetUser} className="text-[12px] text-orange-600 hover:text-orange-800 border border-orange-200 rounded-xl px-3 py-1.5 transition-colors">Reset</button>
                    <button onClick={saveUser} className="text-[12px] font-semibold bg-gray-900 text-white rounded-xl px-4 py-1.5 hover:bg-gray-700 transition-colors flex items-center gap-1.5">
                      <Save size={12} /> Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
