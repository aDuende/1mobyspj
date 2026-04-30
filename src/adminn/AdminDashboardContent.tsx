import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, TrendingDown, Users, BookOpen,
  AlertTriangle, CheckCircle2, ChevronDown, Check,
  ArrowRight, Plus, BarChart2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import {
  ContributionGraph,
  type ContributionData,
} from "../components/smoothui/contribution-graph";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart";
import efficientLearnerIcon from "../assets/Award.png";

// ── Animated Number ────────────────────────────────────────────────────────────
const AnimatedNumber = ({
  value, decimals = 0, prefix = "", suffix = "",
}: {
  value: number; decimals?: number; prefix?: string; suffix?: string;
}) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display, end = value;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]); // eslint-disable-line
  return <>{prefix}{display.toFixed(decimals)}{suffix}</>;
};

// ── Mock data ──────────────────────────────────────────────────────────────────
const GEO = { fontFamily: "Geometrica, sans-serif" };

const coreRadarData = [
  { subject: "Create Impact",  actual: 60, expected: 75 },
  { subject: "Take Ownership", actual: 55, expected: 75 },
  { subject: "Adaptive",       actual: 65, expected: 75 },
  { subject: "Collaboration",  actual: 70, expected: 75 },
];
const functionalRadarData = [
  { subject: "FC01", actual: 65, expected: 75 },
  { subject: "FC02", actual: 60, expected: 75 },
  { subject: "FC03", actual: 55, expected: 75 },
  { subject: "FC04", actual: 70, expected: 75 },
  { subject: "FC05", actual: 50, expected: 75 },
];
const managerialRadarData = [
  { subject: "Process", actual: 60, expected: 75 },
  { subject: "Purpose", actual: 55, expected: 75 },
  { subject: "People",  actual: 65, expected: 75 },
  { subject: "Result",  actual: 58, expected: 75 },
];

const radarChartConfig = {
  actual:   { label: "Org Avg", color: "#fc4c02" },
  expected: { label: "Target",  color: "#3b82f6" },
} satisfies ChartConfig;

const CRITICAL_GAPS = [
  { name: "Jess Park",   role: "Product Manager",  team: "Product",  gaps: 7, initials: "JP", color: "#f97316" },
  { name: "Leon Vu",     role: "Finance Lead",      team: "Finance",  gaps: 6, initials: "LV", color: "#8b5cf6" },
  { name: "Maya Sorn",   role: "Marketing Spec.",   team: "Marketing",gaps: 5, initials: "MS", color: "#ec4899" },
  { name: "Sam Frea",    role: "Sales Lead",        team: "Sales",    gaps: 3, initials: "SF", color: "#10b981" },
];

const ORG_GAPS = [
  { name: "Strategic Thinking",        track: "Functional",  pct: 62, users: 14 },
  { name: "Process Improvement",       track: "Functional",  pct: 58, users: 12 },
  { name: "Create Impact",             track: "Core",        pct: 55, users: 11 },
  { name: "Purpose",                   track: "Managerial",  pct: 52, users: 10 },
  { name: "People",                    track: "Managerial",  pct: 50, users: 9  },
];

const TOP_COURSES = [
  { title: "Outcome-driven planning",           assigned: 8,  completed: 3, track: "Core"       },
  { title: "Data analysis foundations",          assigned: 7,  completed: 5, track: "Functional" },
  { title: "Strategic vision for leaders",       assigned: 6,  completed: 2, track: "Managerial" },
  { title: "Coaching conversations",             assigned: 5,  completed: 4, track: "Managerial" },
  { title: "Process mapping fundamentals",       assigned: 5,  completed: 1, track: "Functional" },
];

const TRACK_COLOR: Record<string, string> = {
  Core: "text-gray-500", Functional: "text-green-600", Managerial: "text-purple-500",
};
const TRACK_BG: Record<string, string> = {
  Core: "bg-gray-100 text-gray-600", Functional: "bg-green-50 text-green-700", Managerial: "bg-purple-50 text-purple-700",
};

// ── Mock contribution data ─────────────────────────────────────────────────────
const generateMockContributions = (): ContributionData[] => {
  const data: ContributionData[] = [];
  const year = new Date().getFullYear();
  const current = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  while (current <= end) {
    const has = Math.random() < 0.55;
    data.push({
      date: current.toISOString().split("T")[0],
      count: has ? Math.ceil(Math.random() * 4) : 0,
      level: has ? Math.ceil(Math.random() * 4) : 0,
    });
    current.setDate(current.getDate() + 1);
  }
  return data;
};
const mockContributions = generateMockContributions();

// ── Component ──────────────────────────────────────────────────────────────────
export default function AdminDashboardContent({ username }: { username: string }) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [radarTrack, setRadarTrack] = useState("Core");
  const [trackOpen, setTrackOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (trackRef.current && !trackRef.current.contains(e.target as Node)) setTrackOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const radarData =
    radarTrack === "Functional" ? functionalRadarData
    : radarTrack === "Managerial" ? managerialRadarData
    : coreRadarData;

  const metricCards = [
    { label: "Total Users",      value: "42",  trend: "+3 this month",  icon: Users,          textColor: "text-blue-500 dark:text-blue-400",    isScore: false, isFloat: false },
    { label: "Org Avg Score",    value: "2.8", trend: "Across 13 comps", icon: TrendingUp,     textColor: "text-orange-500 dark:text-orange-400", isScore: true,  isFloat: true  },
    { label: "Members w/ Gaps",  value: "18",  trend: "Need attention",  icon: AlertTriangle,  textColor: "text-rose-500 dark:text-rose-400",    isScore: false, isFloat: false },
    { label: "Active IDPs",      value: "35",  trend: "8 due this week", icon: BookOpen,       textColor: "text-emerald-500 dark:text-emerald-400", isScore: false, isFloat: false },
  ];

  return (
    <div className="p-6 space-y-4 bg-[#f8fafc] dark:bg-transparent min-h-screen" style={GEO}>

      {/* ── Row 1: Welcome + Metrics ──────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row gap-3 items-stretch">

        {/* Welcome Banner */}
        <div className="relative overflow-hidden w-full xl:w-100 h-35 shrink-0 group rounded-lg border-none shadow-none p-0">
          <img
            src="/src/assets/dashboard_banner.png"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/15 via-white/5 to-transparent" />
          <div className="relative p-6 h-full flex flex-col justify-start pt-6 text-left">
            <p className="text-[11px] font-normal mb-1" style={{ color: "#723434" }}>Admin Portal</p>
            <p className="text-[18px] font-normal text-gray-900 dark:text-white leading-tight whitespace-nowrap">
              Good Morning, {username}!
            </p>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-2">Platform overview — all teams</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {metricCards.map((item, i) => (
            <Card
              key={i}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col justify-between h-35 text-left border-none shadow-none"
              style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? "translateY(0)" : "translateY(16px)", transition: `opacity .5s ease ${i * 80}ms, transform .5s ease ${i * 80}ms` }}
            >
              <div className="space-y-1">
                <div className="flex justify-between items-start w-full">
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-normal leading-tight">{item.label}</p>
                  <item.icon className={`w-4 h-4 ${item.textColor} shrink-0 ml-2`} />
                </div>
                <h3 className="text-[24px] font-bold text-gray-700 dark:text-white leading-none">
                  {item.isScore ? (
                    <>
                      <AnimatedNumber value={isMounted ? parseFloat(item.value) : 0} decimals={1} />
                      <span className="text-gray-400 font-medium ml-1.5 text-[18px]">/ 4.0</span>
                    </>
                  ) : (
                    <AnimatedNumber value={isMounted ? parseInt(item.value) : 0} decimals={item.isFloat ? 1 : 0} />
                  )}
                </h3>
              </div>
              <p className={`text-[11px] font-normal ${item.textColor}`}>{item.trend}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Row 2: Org Competency + Critical Gaps + Activity ─────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">

        {/* Org Competency Radar */}
        <Card className="col-span-12 xl:col-span-5 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 200ms" }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006BFF]/5 dark:bg-[#006BFF]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          </div>

          <div className="flex items-baseline justify-between mb-2 relative z-20">
            <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">Org Competency</h2>
            <div className="relative" ref={trackRef}>
              <button
                onClick={() => setTrackOpen((v) => !v)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[12px] font-normal ${
                  trackOpen
                    ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 shadow-xl text-gray-700 dark:text-gray-300"
                    : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
                }`}
              >
                {radarTrack}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${trackOpen ? "rotate-180 text-[#FC4C02]" : "text-gray-500"}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-38 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-1 z-50 shadow-xl transition-all duration-300 origin-top-right ${trackOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <div className="flex flex-col gap-1">
                  {["Core", "Functional", "Managerial"].map((cat) => (
                    <button key={cat} onClick={() => { setRadarTrack(cat); setTrackOpen(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal transition-all cursor-pointer ${radarTrack === cat ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60"}`}
                    >
                      <span className="flex-1 text-left">{cat}</span>
                      {radarTrack === cat && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start relative z-10 -mt-4">
            <div className="w-full lg:w-1/2 aspect-square flex items-center justify-start -mt-10">
              <ChartContainer config={radarChartConfig} className="w-full h-full max-h-65 outline-none focus:outline-none **:outline-none">
                <RadarChart data={radarData} margin={{ top: 0, right: 40, bottom: 10, left: 30 }} outerRadius="70%">
                  <ChartTooltip cursor={false} content={<ChartTooltipContent className="border-none ring-0" />} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#4b5563", fontSize: 11, fontFamily: "Geometrica, sans-serif", fontWeight: 400, opacity: 0.9 }} />
                  <PolarGrid gridType="polygon" stroke="currentColor" strokeOpacity={0.1} />
                  <Radar dataKey="expected" fill="var(--color-expected)" fillOpacity={0.05} stroke="var(--color-expected)" strokeWidth={1.5} strokeDasharray="4 4" />
                  <Radar dataKey="actual"   fill="var(--color-actual)"   fillOpacity={0.4}  stroke="var(--color-actual)"   strokeWidth={2.5} />
                </RadarChart>
              </ChartContainer>
            </div>
            <div className="flex-1 w-full flex flex-col items-end">
              <div className="w-fit ml-auto space-y-2.5">
                <div className="py-3.5 px-3.5 rounded-2xl bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between gap-6 mb-2">
                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Org Avg</span>
                    <div className="flex items-center gap-1 text-rose-500 font-bold text-[11px]">
                      <TrendingDown className="w-3 h-3" />
                      <span>−2%</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-[24px] font-bold text-gray-700 dark:text-white leading-none tracking-tight">
                      <AnimatedNumber value={isMounted ? 2.8 : 0} decimals={1} />
                    </span>
                    <span className="text-[14px] font-bold text-gray-400 dark:text-gray-600 mb-0.5">/ 4.0</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-5 justify-start px-1">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#fc4c02]" /><span className="text-[12px] text-gray-500 dark:text-gray-400">Org Avg</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /><span className="text-[12px] text-gray-500 dark:text-gray-400">Target</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="-mt-10 relative z-10 text-left w-full">
            <h3 className="text-[18px] font-medium text-[#08060d] dark:text-white mb-2 leading-tight">Platform Activity</h3>
            <div className="w-full overflow-hidden">
              <ContributionGraph data={mockContributions} year={new Date().getFullYear()} showLegend={true} showTooltips={true} className="w-full" />
            </div>
          </div>
        </Card>

        {/* Critical Gaps + Top Org Gaps */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full text-left"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 300ms" }}
        >
          <div className="flex flex-col gap-4">

            {/* Members with most gaps */}
            <section className="w-full">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">Needs Attention</h3>
                <button
                  onClick={() => navigate("/competency-profile")}
                  className="text-[11px] text-[#006bff] hover:underline font-medium flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {CRITICAL_GAPS.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/competency-profile")}
                    style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + i * 0.08}s` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: u.color }}
                    >
                      {u.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-800 dark:text-white truncate">{u.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{u.role}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-red-50 text-red-500 rounded-full px-2 py-0.5 shrink-0">
                      {u.gaps} gaps
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Top org-wide gaps */}
            <section className="w-full">
              <h3 className="text-[18px] font-medium text-[#08060d] dark:text-white mb-2.5 leading-tight">Top Org Gaps</h3>
              <div className="space-y-2.5">
                {ORG_GAPS.map((g, i) => (
                  <div key={i} style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.5 + i * 0.08}s` }}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold ${TRACK_COLOR[g.track]}`}>{g.track[0]}</span>
                        <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium">{g.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{g.users} members</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#fc4c02] rounded-full transition-all duration-1000"
                        style={{ width: `${isMounted ? g.pct : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Card>

        {/* Platform stats + quick actions */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 400ms" }}
        >
          <div className="flex flex-col gap-3.5 h-full">
            <h3 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">Platform Stats</h3>

            <div className="space-y-2.5">
              {[
                { icon: <BarChart2 className="w-4 h-4 text-blue-500" />, label: "Courses Published",     value: "27",  sub: "4 drafts pending",    bg: "bg-blue-50 dark:bg-blue-900/20"    },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, label: "Completed IDPs",  value: "12",  sub: "this quarter",         bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                { icon: <Users className="w-4 h-4 text-purple-500" />, label: "Teams Covered",          value: "6",   sub: "all departments",      bg: "bg-purple-50 dark:bg-purple-900/20" },
                { icon: <BookOpen className="w-4 h-4 text-orange-500" />, label: "Avg Learning Hours",  value: "8.4", sub: "per member / month",   bg: "bg-orange-50 dark:bg-orange-900/20" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + i * 0.08}s` }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                    {s.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 font-normal">{s.label}</p>
                    <p className="text-[18px] font-bold text-gray-800 dark:text-white leading-tight">{s.value}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mt-auto pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate("/admin-add-course")}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors text-[12px] font-semibold"
              >
                <span className="flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Add New Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate("/competency-profile")}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-[12px] font-semibold"
              >
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Manage Competencies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Row 3: IDP Progress + Top Courses + Leaderboard ──────────────────── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">

        {/* IDP Progress */}
        <Card className="col-span-12 xl:col-span-5 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 400ms" }}
        >
          <div className="flex items-center justify-between px-4 mb-0">
            <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-none">IDP Progress</h2>
            <button onClick={() => navigate("/my-idp-learning")} className="text-[11px] text-[#006bff] hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="relative">
            <div className="space-y-3 max-h-90 overflow-y-auto px-4 mt-3 pb-10 no-scrollbar">
              {[
                { name: "Jess Park",   role: "Product Manager", initials: "JP", color: "#f97316", progress: 38, courses: 13, status: "In Progress" },
                { name: "Leon Vu",     role: "Finance Lead",    initials: "LV", color: "#8b5cf6", progress: 55, courses: 9,  status: "In Progress" },
                { name: "Tarin Chon",  role: "HR Manager",      initials: "TC", color: "#ec4899", progress: 72, courses: 8,  status: "On Track"    },
                { name: "Sam Frea",    role: "Sales Lead",      initials: "SF", color: "#10b981", progress: 40, courses: 6,  status: "In Progress" },
                { name: "Alex Nguyen", role: "Tech Lead",       initials: "AN", color: "#3b82f6", progress: 88, courses: 5,  status: "On Track"    },
                { name: "Maya Sorn",   role: "Marketing Spec.", initials: "MS", color: "#f59e0b", progress: 25, courses: 7,  status: "At Risk"     },
              ].map((u, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[20px] bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col gap-3 group"
                  onClick={() => navigate("/my-idp-learning")}
                  style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + i * 0.06}s` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: u.color }}>
                        {u.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 dark:text-white leading-tight">{u.name}</p>
                        <p className="text-[10px] text-gray-400">{u.role} · {u.courses} courses</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold rounded-full px-2.5 py-0.5 shrink-0 ${
                      u.status === "On Track"    ? "bg-green-50 text-green-600"
                      : u.status === "At Risk"   ? "bg-red-50 text-red-500"
                      : "bg-blue-50 text-blue-500"
                    }`}>
                      {u.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.08)]">
                      <div
                        className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${isMounted ? u.progress : 0}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300 shrink-0 min-w-9 text-right">
                      <AnimatedNumber value={isMounted ? u.progress : 0} />%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Top Assigned Courses */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 500ms" }}
        >
          <div className="flex items-center justify-between px-4 mb-0">
            <h2 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-none">Top Assigned Courses</h2>
            <button onClick={() => navigate("/admin-add-course")} className="text-[11px] text-[#006bff] hover:underline font-medium flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="relative">
            <div className="space-y-2 max-h-90 overflow-y-auto px-4 mt-3 pb-10 no-scrollbar">
              {TOP_COURSES.map((c, i) => {
                const pct = Math.round((c.completed / c.assigned) * 100);
                return (
                  <div
                    key={i}
                    className="p-4 rounded-[20px] bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                    style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + i * 0.07}s` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 ${TRACK_BG[c.track]}`}>{c.track}</span>
                        <p className="text-[13px] font-semibold text-gray-800 dark:text-white leading-tight">{c.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[12px] font-bold text-gray-700 dark:text-white">{c.completed}/{c.assigned}</p>
                        <p className="text-[10px] text-gray-400">completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-[#fc4c02] rounded-full transition-all duration-1000"
                          style={{ width: `${isMounted ? pct : 0}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300 shrink-0">
                        <AnimatedNumber value={isMounted ? pct : 0} />%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full"
          style={{ opacity: isMounted ? 1 : 0, transition: "opacity .6s ease 600ms" }}
        >
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-medium text-[#08060d] dark:text-white leading-tight">Top Performers</h3>
              <img src={efficientLearnerIcon} className="w-6 h-6 object-contain" alt="Award" />
            </div>
            <div className="space-y-2">
              {[
                { name: "Alex Nguyen", score: 3.8, team: "Engineering", initials: "AN", color: "#3b82f6", rank: 1 },
                { name: "Tarin Chon",  score: 3.5, team: "HR",          initials: "TC", color: "#ec4899", rank: 2 },
                { name: "Leon Vu",     score: 3.2, team: "Finance",     initials: "LV", color: "#8b5cf6", rank: 3 },
                { name: "Sam Frea",    score: 3.0, team: "Sales",       initials: "SF", color: "#10b981", rank: 4 },
                { name: "Jess Park",   score: 2.8, team: "Product",     initials: "JP", color: "#f97316", rank: 5 },
                { name: "Maya Sorn",   score: 2.5, team: "Marketing",   initials: "MS", color: "#f59e0b", rank: 6 },
              ].map((u, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease ${0.4 + i * 0.07}s` }}
                  onClick={() => navigate("/competency-profile")}
                >
                  <span className={`text-[11px] font-bold w-5 text-center shrink-0 ${u.rank <= 3 ? "text-amber-500" : "text-gray-400"}`}>
                    {u.rank <= 3 ? ["🥇","🥈","🥉"][u.rank - 1] : `#${u.rank}`}
                  </span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: u.color }}>
                    {u.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-800 dark:text-white truncate">{u.name}</p>
                    <p className="text-[10px] text-gray-400">{u.team}</p>
                  </div>
                  <span className="text-[12px] font-bold text-[#fc4c02] shrink-0">{u.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
