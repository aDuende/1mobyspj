import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import dashboardBannerImg from "../assets/dashboard_banner.png";
import LanguageSelector from "../components/LanguageSelector";
import AppearanceSelector from "../components/AppearanceSelector";
import AlertSelector from "../components/AlertSelector";
import ExperiencePoints from "../components/ExperiencePoints";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import HelpPage from "../HelpPage";
import ManagerAssessmentPage from "./ManagerAssessmentPage";
import TeamProfilePage from "./TeamProfilePage";
import CompetencyProfilePage from "../CompetencyProfilePage";
import MyIDPLearningPage from "../MyIDPLearningPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  TrendingUp,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  ArrowRight,
  Users,
  UserCheck,
} from "lucide-react";
import { Card } from "../components/ui/card";
import {
  ContributionGraph,
  type ContributionData,
} from "../components/smoothui/contribution-graph";
import BackToTop from "../components/smoothui/back-to-top";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart";
import efficientLearnerIcon from "../assets/Award.png";
import keepUpIcon from "../assets/Flame.png";

// ─── Data ───────────────────────────────────────────────────────────────────

const coreRadarData = [
  { subject: "Create Impact",  actual: 82, expected: 80 },
  { subject: "Take Ownership", actual: 74, expected: 90 },
  { subject: "Adaptive",       actual: 78, expected: 75 },
  { subject: "Collaboration",  actual: 88, expected: 85 },
];

const managerialRadarData = [
  { subject: "Process", actual: 80, expected: 85 },
  { subject: "Purpose", actual: 85, expected: 80 },
  { subject: "People",  actual: 88, expected: 85 },
  { subject: "Result",  actual: 74, expected: 80 },
];

const functionalRadarData = [
  { subject: "FC01", actual: 72, expected: 80 },
  { subject: "FC02", actual: 78, expected: 85 },
  { subject: "FC03", actual: 68, expected: 80 },
  { subject: "FC04", actual: 84, expected: 75 },
  { subject: "FC05", actual: 62, expected: 80 },
];

const radarChartConfig = {
  actual:   { label: "Team Avg", color: "#fc4c02" },
  expected: { label: "Target",   color: "#3b82f6" },
} satisfies ChartConfig;

const teamMembers = [
  {
    name: "Tarin",
    initials: "T",
    color: "#e8a598",
    overall: 3.6,
    scores: { createImpact: 3.6, collaboration: 2.2, problemSolving: 1.2, adaptive: 0.8 },
  },
  {
    name: "Emma",
    initials: "E",
    color: "#c4956a",
    overall: 3.6,
    scores: { createImpact: 3.8, collaboration: 3.5, problemSolving: 2.8, adaptive: 1.7 },
  },
  {
    name: "Sarah",
    initials: "S",
    color: "#8baec4",
    overall: 3.6,
    scores: { createImpact: 3.2, collaboration: 3.8, problemSolving: 2.9, adaptive: 2.8 },
  },
  {
    name: "Jessica",
    initials: "J",
    color: "#8b6f5a",
    overall: 3.6,
    scores: { createImpact: 3.1, collaboration: 3.5, problemSolving: 3.6, adaptive: 2.5 },
  },
];

const heatColumns: { key: keyof typeof teamMembers[0]["scores"]; label: string }[] = [
  { key: "createImpact",   label: "Create Impact"   },
  { key: "collaboration",  label: "Collaboration"   },
  { key: "problemSolving", label: "Problem Solving" },
  { key: "adaptive",       label: "Adaptive"        },
];

function heatColor(score: number): string {
  if (score >= 3.5) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
  if (score >= 2.5) return "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300";
  if (score >= 1.5) return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";
  return "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";
}

const generateMockContributions = (): ContributionData[] => {
  const data: ContributionData[] = [];
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1);
  const endDate   = new Date(year, 11, 31);
  const current   = new Date(startDate);
  const logoPattern = [
    "                                                   ",
    "  ###     #       #   #####    ####   #     #  ",
    "    #     ##     ##  #     #  #    #  #     #  ",
    "    #     # #   # #  #     #  #####   #     #  ",
    "    #     #  # #  #  #     #  #    #   #### #  ",
    "          #   #   #  #     #  #    #        #  ",
    " #######  #       #   #####    ####   ######   ",
  ];
  const startWeek  = 1;
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());
  while (current <= endDate) {
    const diffDays = Math.floor((current.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24));
    const weekNum  = Math.floor(diffDays / 7);
    const dayOfWeek = diffDays % 7;
    const logoWeek  = weekNum - startWeek;
    const isLogo =
      logoWeek >= 0 &&
      logoWeek < logoPattern[0].length &&
      logoPattern[dayOfWeek][logoWeek] === "#";
    data.push({
      date:  current.toISOString().split("T")[0],
      count: isLogo ? 15 : (Math.random() < 0.6 ? 1 : 0),
      level: isLogo ? 4  : (Math.random() < 0.6 ? 1 : 0),
    });
    current.setDate(current.getDate() + 1);
  }
  return data;
};

const mockContributions = generateMockContributions();

// ─── AnimatedNumber ──────────────────────────────────────────────────────────

const AnimatedNumber = ({
  value, decimals = 0, prefix = "", suffix = "",
}: { value: number; decimals?: number; prefix?: string; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const end   = value;
    if (start === end) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / 1000, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <>{prefix}{display.toFixed(decimals)}{suffix}</>;
};

// ─── ManagerDashboardContent ─────────────────────────────────────────────────

function ManagerDashboardContent({ username }: { username: string }) {
  const GEO = { fontFamily: '"Geometrica", sans-serif' };
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Core");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const brandColors = [
      { main: "#006BFF", bg: "rgba(0, 107, 255, 0.15)" },
      { main: "#FC4C02", bg: "rgba(252, 76, 2, 0.15)" },
      { main: "#FFA400", bg: "rgba(255, 164, 0, 0.15)" },
    ];
    const handleSelection = () => {
      const c = brandColors[Math.floor(Math.random() * brandColors.length)];
      document.documentElement.style.setProperty("--moby-selection", c.main);
      document.documentElement.style.setProperty("--moby-selection-bg", c.bg);
    };
    window.addEventListener("selectstart", handleSelection);
    return () => window.removeEventListener("selectstart", handleSelection);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node))
        setIsCategoryOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="p-6 space-y-4 bg-[#f8fafc] dark:bg-transparent min-h-screen">

      {/* ── Row 1: Welcome + Metrics ── */}
      <div className="flex flex-col xl:flex-row gap-3 items-stretch">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden w-full xl:w-[400px] h-[140px] shrink-0 group rounded-lg p-0">
          <img
            src={dashboardBannerImg}
            alt="Sunrise"
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/15 via-white/5 to-transparent" />
          <div className="relative p-6 h-full flex flex-col justify-start pt-6 text-left">
            <p className="text-[11px] font-normal mb-1" style={{ ...GEO, color: "#723434" }}>
              Welcome back
            </p>
            <p className="!text-[18px] font-normal text-gray-900 dark:text-white leading-tight whitespace-nowrap" style={GEO}>
              Good Morning, {username}!
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Team Avg Score",        value: "3.6", trend: "Team Performing Well",  color: "blue",    icon: TrendingUp,   bgColor: "bg-blue-50 dark:bg-blue-900/30",     textColor: "text-blue-500 dark:text-blue-400" },
            { label: "Team Members",           value: "4",   trend: "All Active",            color: "orange",  icon: Users,        bgColor: "bg-orange-50 dark:bg-orange-900/30", textColor: "text-orange-500 dark:text-orange-400" },
            { label: "Pending Assessments",    value: "3",   trend: "Due in 5 days",         color: "rose",    icon: AlertCircle,  bgColor: "bg-rose-50 dark:bg-rose-900/30",     textColor: "text-rose-500 dark:text-rose-400" },
            { label: "Team Learning Hours",    value: "48",  trend: "+8 This Week",          color: "emerald", icon: Clock,        bgColor: "bg-emerald-50 dark:bg-emerald-900/30", textColor: "text-emerald-500 dark:text-emerald-400" },
          ].map((item, i) => (
            <Card key={i} className="p-4 rounded-lg bg-white dark:bg-gray-800 transition-all flex flex-col justify-between h-[140px] text-left border-none shadow-none">
              <div className="space-y-1">
                <div className="flex justify-between items-start w-full">
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-normal leading-tight" style={GEO}>{item.label}</p>
                  <item.icon className={`w-4.5 h-4.5 ${item.textColor} shrink-0 ml-2`} />
                </div>
                <h3 className="text-[24px] font-bold text-gray-700 dark:text-white leading-none" style={GEO}>
                  {item.label === "Team Avg Score" ? (
                    <><AnimatedNumber value={isMounted ? parseFloat(item.value) : 0} decimals={1} /><span className="text-gray-400 font-medium ml-1.5 text-[18px]">/ 4.0</span></>
                  ) : (
                    <AnimatedNumber value={isMounted ? parseInt(item.value) : 0} />
                  )}
                </h3>
              </div>
              <p className={`text-[11px] font-normal ${item.textColor}`} style={GEO}>{item.trend}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Row 2: Competency / Focus / Team Stats ── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">

        {/* Competency Overview */}
        <Card className="col-span-12 xl:col-span-5 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative">
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006BFF]/5 dark:bg-[#006BFF]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          </div>
          <div className="flex items-baseline justify-between mb-2 relative z-20">
            <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight" style={GEO}>
              Team Competency
            </h2>
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 active:scale-[0.96] cursor-pointer text-[12px] font-normal ${isCategoryOpen ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300" : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-200/60 dark:hover:border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"}`}
                style={GEO}
              >
                {selectedCategory}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryOpen ? "rotate-180 text-[#FC4C02]" : "rotate-0 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-38 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-transparent p-1 z-50 transition-all duration-300 origin-top-right shadow-xl ${isCategoryOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                <div className="flex flex-col gap-1">
                  {["Core", "Managerial", "Functional"].map(cat => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal transition-all duration-200 cursor-pointer ${selectedCategory === cat ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60"}`}
                      style={GEO}
                    >
                      <span className="flex-1 text-left">{cat}</span>
                      {selectedCategory === cat && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start relative z-10 -mt-4">
            <div className="w-full lg:w-1/2 aspect-square flex items-center justify-start -mt-10">
              <ChartContainer config={radarChartConfig} className="w-full h-full max-h-[260px] outline-none focus:outline-none [&_*]:outline-none">
                <RadarChart data={selectedCategory === "Functional" ? functionalRadarData : selectedCategory === "Managerial" ? managerialRadarData : coreRadarData} margin={{ top: 0, right: 40, bottom: 10, left: 30 }} outerRadius="70%">
                  <ChartTooltip cursor={false} content={<ChartTooltipContent className="border-none ring-0" />} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#4b5563", fontSize: 11, fontFamily: '"Geometrica", sans-serif', fontWeight: 400, opacity: 0.9 }} />
                  <PolarGrid gridType="polygon" stroke="currentColor" strokeOpacity={0.1} />
                  <Radar dataKey="expected" fill="var(--color-expected)" fillOpacity={0.05} stroke="var(--color-expected)" strokeWidth={1.5} strokeDasharray="4 4" />
                  <Radar dataKey="actual"   fill="var(--color-actual)"   fillOpacity={0.4}  stroke="var(--color-actual)"   strokeWidth={2.5} />
                </RadarChart>
              </ChartContainer>
            </div>
            <div className="flex-1 w-full flex flex-col items-end">
              <div className="w-fit ml-auto space-y-2.5">
                <div className="py-3.5 px-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between gap-6 mb-2">
                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Team Avg</span>
                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-[11px]">
                      <TrendingUp className="w-3 h-3" />
                      <AnimatedNumber value={isMounted ? 4 : 0} prefix="+" suffix="%" />
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-[24px] font-bold text-gray-700 dark:text-white leading-none tracking-tight" style={GEO}>
                      <AnimatedNumber value={isMounted ? 3.6 : 0} decimals={1} />
                    </span>
                    <span className="text-[14px] font-bold text-gray-400 dark:text-gray-600 mb-0.5">/ 4.0</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-5 justify-start px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fc4c02]" />
                    <span className="text-[12px] font-normal text-gray-500 dark:text-gray-400">Team Avg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                    <span className="text-[12px] font-normal text-gray-500 dark:text-gray-400">Target</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="-mt-10 relative z-10 text-left w-full">
            <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2 leading-tight" style={GEO}>Activity</h3>
            <div className="w-full overflow-hidden">
              <ContributionGraph data={mockContributions} year={new Date().getFullYear()} showLegend={true} showTooltips={true} className="w-full" />
            </div>
          </div>
        </Card>

        {/* Team Focus */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full text-left">
          <div className="flex flex-col gap-4 items-start">
            <section className="w-full">
              <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 leading-tight" style={GEO}>Team Strengths</h3>
              <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                {["Collaboration & Teamwork", "Strategic Thinking", "Stakeholder Communication"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#32bea6] flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium leading-tight" style={GEO}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="w-full">
              <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 leading-tight" style={GEO}>Areas to Improve</h3>
              <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                {["Adaptive Leadership", "Conflict Resolution", "Data-Driven Decisions"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#f4c300] flex items-center justify-center shrink-0">
                      <svg className="w-1.6 h-1.6 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="10.7" y="5" width="2.6" height="9" rx="1.3" /><circle cx="12" cy="17" r="1.4" /></svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium leading-tight" style={GEO}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Card>

        {/* Team Engagement */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full">
          <div className="flex flex-col gap-3.5">
            <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight" style={GEO}>Team Engagement</h3>
            <div className="space-y-2.5">
              {/* Team Points */}
              <div className="flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer rounded-2xl relative">
                <div className="flex items-center gap-4 text-left pr-12">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <div className="relative flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-linear-to-br from-yellow-300 via-orange-400 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                        <div className="absolute inset-[1.5px] rounded-full border border-yellow-200/50 shadow-inner" />
                      </div>
                      <Star className="absolute w-3.5 h-3.5 text-white fill-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.15)]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight" style={GEO}>Team Points</p>
                    <p className="mt-1 text-[11px] font-normal text-gray-500 dark:text-gray-400" style={GEO}>+80 This week</p>
                  </div>
                </div>
                <span className="text-2xl font-semibold text-[#2ecc71] absolute right-2.5 top-1/2 -translate-y-1/2" style={GEO}>
                  <AnimatedNumber value={isMounted ? 80 : 0} prefix="+" />
                </span>
              </div>
              {/* Top Achiever */}
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer rounded-2xl">
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <img src={efficientLearnerIcon} className="w-full h-full object-contain" alt="Top Achiever" />
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight" style={GEO}>Top Achiever</p>
                  <p className="mt-1 text-[11px] font-normal text-gray-500 dark:text-gray-400" style={GEO}>Sarah · This Month</p>
                </div>
              </div>
              {/* Streak */}
              <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 rounded-2xl relative overflow-hidden h-[74px] cursor-pointer group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <img src={keepUpIcon} className="w-full h-full object-contain" alt="Streak" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight" style={GEO}>Team 5 Day Streak</p>
                    <p className="mt-1 text-[11px] font-normal text-gray-500 dark:text-gray-400" style={GEO}>Keep the momentum!</p>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center bg-[#006bff] dark:bg-blue-600 hover:bg-[#0056cc] group-hover:bg-[#0056cc] text-white rounded-full shadow-sm transition-all active:scale-95 absolute bottom-2.5 right-2.5 cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Row 3: HeatMap + Team Progress ── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">

        {/* Team Competency HeatMap */}
        <Card className="col-span-12 xl:col-span-8 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none">
          <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-4 leading-tight" style={GEO}>Team Competency HeatMap</h2>

          {/* Header row */}
          <div className="flex items-center gap-2 mb-2 px-2">
            <div className="w-[180px] shrink-0">
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium" style={GEO}>member</span>
            </div>
            {heatColumns.map(col => (
              <div key={col.key} className="flex-1 text-center">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium" style={GEO}>{col.label}</span>
              </div>
            ))}
            <div className="w-[90px] shrink-0" />
          </div>

          {/* Member rows */}
          <div className="flex flex-col gap-2">
            {teamMembers.map(member => {
              const isExpanded = expandedMember === member.name;
              return (
                <div key={member.name} className="rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
                  {/* Main row */}
                  <div
                    className="flex items-center gap-2 px-2 py-2.5 hover:bg-gray-50/60 dark:hover:bg-gray-700/20 transition-colors duration-150 cursor-pointer"
                    onClick={() => setExpandedMember(isExpanded ? null : member.name)}
                  >
                    {/* Avatar + Name */}
                    <div className="w-[180px] shrink-0 flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                        style={{ background: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200 truncate" style={GEO}>{member.name}</span>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300" style={GEO}>{member.overall.toFixed(1)}</span>
                          {isExpanded
                            ? <ChevronUp className="w-3 h-3 text-gray-400" />
                            : <ChevronDown className="w-3 h-3 text-gray-400" />}
                        </div>
                      </div>
                    </div>

                    {/* Score cells */}
                    {heatColumns.map(col => {
                      const score = member.scores[col.key];
                      return (
                        <div key={col.key} className="flex-1 flex justify-center">
                          <span className={`inline-block min-w-[40px] text-center px-2 py-1 rounded-lg text-[12px] font-semibold ${heatColor(score)}`} style={GEO}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}

                    {/* Badge */}
                    <div className="w-[90px] shrink-0 flex justify-center">
                      <span className="px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 text-[11px] text-gray-500 dark:text-gray-400 font-medium" style={GEO}>
                        Adaptive
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-white/5 px-4 py-3 bg-gray-50/50 dark:bg-gray-700/10">
                      <div className="flex flex-col gap-2">
                        {heatColumns.map(col => {
                          const score = member.scores[col.key];
                          const pct = Math.round((score / 4) * 100);
                          return (
                            <div key={col.key} className="flex items-center gap-3">
                              <span className="text-[11px] text-gray-500 dark:text-gray-400 w-[120px] shrink-0" style={GEO}>{col.label}</span>
                              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#fc4c02] rounded-full transition-all duration-700"
                                  style={{ width: `${isMounted ? pct : 0}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 w-8 text-right shrink-0" style={GEO}>{score.toFixed(1)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            {[
              { label: "Excellent (≥3.5)", cls: "bg-emerald-100 dark:bg-emerald-900/30" },
              { label: "Good (≥2.5)",      cls: "bg-teal-50 dark:bg-teal-900/20" },
              { label: "Fair (≥1.5)",      cls: "bg-yellow-50 dark:bg-yellow-900/20" },
              { label: "Needs Work (<1.5)", cls: "bg-orange-50 dark:bg-orange-900/20" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${l.cls}`} />
                <span className="text-[10px] text-gray-500 dark:text-gray-400" style={GEO}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Progress */}
        <Card className="col-span-12 xl:col-span-4 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden">
          <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white !mb-[-4px] px-4 text-left leading-none" style={GEO}>Team Progress</h2>
          <div className="relative">
            <div className="space-y-4 max-h-[360px] overflow-y-auto px-4 -mt-2 pt-2 pb-10 no-scrollbar">
              {[
                { name: "Tarin",   title: "Project Management Basics",   progress: 72, color: "#8baec4" },
                { name: "Emma",    title: "Leadership Fundamentals",      progress: 55, color: "#c4956a" },
                { name: "Sarah",   title: "Agile Methodology",            progress: 88, color: "#8baec4" },
                { name: "Jessica", title: "Communication Skills",         progress: 40, color: "#8b6f5a" },
                { name: "Tarin",   title: "Data-Driven Decision Making",  progress: 20, color: "#e8a598" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-[20px] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer flex flex-col gap-3 group">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ background: item.color }}>
                      {item.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800 dark:text-white leading-tight truncate" style={GEO}>{item.title}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5" style={GEO}>{item.name}</p>
                    </div>
                    <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300 shrink-0" style={GEO}>{item.progress}%</span>
                  </div>
                  <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.1)]">
                    <div
                      className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                      style={{ width: `${isMounted ? item.progress : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>
      </div>

      {/* ── Row 4: Learning Progress + Recommended + Team Leaderboard ── */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* Team Learning Progress */}
        <Card className="col-span-12 xl:col-span-5 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden">
          <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white !mb-[-4px] px-4 text-left leading-none" style={GEO}>Learning Progress</h2>
          <div className="relative">
            <div className="space-y-4 max-h-[360px] overflow-y-auto px-4 -mt-2 pt-2 pb-10 no-scrollbar">
              {[
                { title: "Project Management Basics", date: "2027-06-15", progress: 60,  status: "Resume Course" },
                { title: "Leadership Essentials",     date: "2027-07-01", progress: 0,   status: "Start Course"  },
                { title: "Agile Methodology",         date: "2027-07-10", progress: 85,  status: "Resume Course" },
                { title: "Team Communication",        date: "2027-08-01", progress: 30,  status: "Resume Course" },
                { title: "Conflict Resolution",       date: "2027-08-15", progress: 45,  status: "Resume Course" },
              ].map((course, i) => (
                <div key={i} className="p-5 rounded-[24px] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer flex flex-col gap-4 group">
                  <div className="flex items-start justify-between gap-4 text-left">
                    <div className="flex flex-col items-start gap-2.5 flex-1">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="8.5" cy="8.5" r="5.2" /><circle cx="15.5" cy="8.5" r="5.2" />
                          <circle cx="8.5" cy="15.5" r="5.2" /><circle cx="15.5" cy="15.5" r="5.2" />
                        </svg>
                        Course
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight mt-1" style={GEO}>{course.title}</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-1" style={GEO}>Due {course.date}</p>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 text-[#006bff] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shrink-0 pointer-events-none group-hover:pointer-events-auto">
                      <span className="text-[12px] font-bold relative z-10" style={GEO}>{course.status}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.1)]">
                      <div className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${isMounted ? course.progress : 0}%` }} />
                    </div>
                    <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200 shrink-0 min-w-[36px] text-right" style={GEO}>
                      <AnimatedNumber value={isMounted ? course.progress : 0} />%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Recommended */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden">
          <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white !mb-[-4px] px-4 text-left leading-none" style={GEO}>Recommended for Team</h2>
          <div className="relative">
            <div className="space-y-2 max-h-[360px] overflow-y-auto px-4 -mt-2 pt-2 pb-10 no-scrollbar">
              {[
                { title: "Advanced Team Leadership",   date: "2027-06-15", duration: "2 hours 30 minutes" },
                { title: "Adaptive Management",        date: "2027-06-20", duration: "1 hour 15 minutes"  },
                { title: "Conflict Resolution Skills", date: "2027-06-25", duration: "3 hours 45 minutes" },
              ].map((rec, i) => (
                <div key={i} className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group text-left relative min-h-[110px]">
                  <div className="flex flex-col items-start gap-1.5 text-left pr-8 flex-1">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="8.5" cy="8.5" r="5.2" /><circle cx="15.5" cy="8.5" r="5.2" />
                        <circle cx="8.5" cy="15.5" r="5.2" /><circle cx="15.5" cy="15.5" r="5.2" />
                      </svg>
                      Course
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-gray-800 dark:text-gray-200 leading-tight" style={GEO}>{rec.title}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-1 leading-tight" style={GEO}>Due {rec.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                      <Clock className="w-[19px] h-[19px] opacity-80 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-normal leading-[1.2]" style={GEO}>{rec.duration.split(" minutes")[0]}</span>
                        <span className="text-[12px] font-normal leading-[1.2]" style={GEO}>minutes</span>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#006bff] dark:bg-blue-600 flex items-center justify-center active:scale-95 hover:bg-[#0056cc] group-hover:bg-[#0056cc] transition-all shrink-0 cursor-pointer shadow-sm">
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Team Leaderboard */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none">
          <div className="flex items-center justify-between mb-4">
            <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight" style={GEO}>Team Leaderboard</h2>
            <UserCheck className="w-4.5 h-4.5 text-gray-400" />
          </div>
          <div className="flex flex-col gap-2">
            {[
              { rank: 1, name: "Sarah",   score: 3.8, hrs: "14h", color: "#8baec4",  medal: "#FFD700" },
              { rank: 2, name: "Emma",    score: 3.6, hrs: "12h", color: "#c4956a",  medal: "#C0C0C0" },
              { rank: 3, name: "Tarin",   score: 3.6, hrs: "11h", color: "#e8a598",  medal: "#CD7F32" },
              { rank: 4, name: "Jessica", score: 3.4, hrs: "9h",  color: "#8b6f5a",  medal: undefined },
            ].map(member => (
              <div key={member.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
                <span className="w-5 text-center text-[12px] font-bold text-gray-400 shrink-0" style={GEO}>{member.rank}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0" style={{ background: member.color }}>
                  {member.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-white truncate" style={GEO}>{member.name}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500" style={GEO}>{member.hrs} this week</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {member.medal && (
                    <div className="w-4 h-4 rounded-full" style={{ background: member.medal }} />
                  )}
                  <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300" style={GEO}>{member.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

interface ManagerDashboardProps {
  onLogout: () => void;
  username: string;
}

function ManagerDashboard({ onLogout, username }: ManagerDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isScrolled, setIsScrolled] = useState(false);
  const [assessmentSubPage, setAssessmentSubPage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSubPage = (e: Event) => {
      setAssessmentSubPage((e as CustomEvent).detail.page);
    };
    window.addEventListener("assessment:subpage", handleSubPage);
    return () => window.removeEventListener("assessment:subpage", handleSubPage);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/assessment") setAssessmentSubPage(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollTop > 0);
      }
    };
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden fixed inset-0">
        <AppSidebar
          onNavigate={handleNavigate}
          username={username}
          position="Manager"
          role="manager"
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-hidden w-full h-full relative bg-gray-50 dark:bg-gray-900">
          <header
            className={`
                absolute top-0 left-0 right-0 z-50 transition-all duration-200 flex items-center justify-between px-6 py-4 shrink-0
                ${
                  isScrolled
                    ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl backdrop-saturate-150 border-b  dark:border-transparent shadow-sm surface-glass"
                    : "bg-transparent border-b border-transparent shadow-none"
                }
              `}
          >
            <div className="flex items-center gap-3">
              <Breadcrumb>
                <BreadcrumbList>
                  {location.pathname === "/dashboard" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/assessment" && !assessmentSubPage && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Assessment
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/assessment" && assessmentSubPage && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => window.dispatchEvent(new CustomEvent("assessment:back"))}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Assessment
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage style={{ fontFamily: "Geometrica, sans-serif" }}>
                          {assessmentSubPage}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname === "/competency-profile" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Competency Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/settings" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Settings
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/profile" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/help" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Help
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/my-idp-learning" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        My IDP & Learning
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname.startsWith("/my-idp-learning/course/") && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigate("/my-idp-learning")}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP & Learning
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Course Details
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname.startsWith("/my-idp-learning/series/") && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigate("/my-idp-learning")}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP & Learning
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Series
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname.startsWith("/my-idp-learning/reading/") && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigate("/my-idp-learning")}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP & Learning
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Reading Hub
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname === "/my-idp-learning/my-idp" && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigate("/my-idp-learning")}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP & Learning
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname === "/team-profile" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Team Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/help/history" && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          onClick={() => navigate("/help")}
                          className="cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Help
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          History
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <ExperiencePoints points={120} />
              <AlertSelector />
              <AppearanceSelector
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
              <LanguageSelector
                currentLang={language}
                onLangChange={setLanguage}
              />
            </div>
          </header>

          <div
            ref={scrollRef}
            className="h-full w-full overflow-y-auto relative"
          >
            <div className="pt-16">
              <Routes>
                <Route path="/assessment" element={<ManagerAssessmentPage />} />
                <Route path="/team-profile" element={<TeamProfilePage />} />
                <Route path="/competency-profile" element={<CompetencyProfilePage role="manager" />} />
                <Route path="/my-idp-learning/*" element={<MyIDPLearningPage role="manager" />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/help/*"
                  element={<HelpPage username={username} role="manager" />}
                />
                <Route
                  path="/dashboard"
                  element={<ManagerDashboardContent username={username} />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
      <BackToTop />
    </SidebarProvider>
  );
}

export default ManagerDashboard;
