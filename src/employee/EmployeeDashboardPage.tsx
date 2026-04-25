import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import LanguageSelector from "../components/LanguageSelector";
import AppearanceSelector from "../components/AppearanceSelector";
import AlertSelector from "../components/AlertSelector";
import ExperiencePoints from "../components/ExperiencePoints";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import HelpPage from "../HelpPage";
import MyIDPLearningPage from "../MyIDPLearningPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card } from "../components/ui/card";
import {
  ContributionGraph,
  type ContributionData,
} from "../components/smoothui/contribution-graph";
import BackToTop from "../components/smoothui/back-to-top";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart";

const radarChartData = [
  { subject: "Adaptive", actual: 80, expected: 100 },
  { subject: "Technical", actual: 65, expected: 85 },
  { subject: "Collaboration", actual: 90, expected: 85 },
  { subject: "Ownership", actual: 70, expected: 90 },
  { subject: "Solving", actual: 85, expected: 75 },
  { subject: "Impact", actual: 85, expected: 80 },
];

const radarChartConfig = {
  actual: {
    label: "Actual",
    color: "#fc4c02",
  },
  expected: {
    label: "Target",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

import efficientLearnerIcon from "../assets/Award.png";
import keepUpIcon from "../assets/Flame.png";
import BookOpenPng from "../assets/BookOpen.png";
import BriefcasePng from "../assets/Briefcase.png";

// Mock contribution data for the current year
const generateMockContributions = (): ContributionData[] => {
  const data: ContributionData[] = [];
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    // Higher activity on weekdays
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const baseChance = isWeekday ? 0.7 : 0.3;
    const hasActivity = Math.random() < baseChance;

    if (hasActivity) {
      const count = Math.floor(Math.random() * 12) + 1;
      let level = 0;
      if (count >= 9) level = 4;
      else if (count >= 6) level = 3;
      else if (count >= 3) level = 2;
      else level = 1;

      data.push({
        date: current.toISOString().split("T")[0],
        count,
        level,
      });
    }

    current.setDate(current.getDate() + 1);
  }
  return data;
};

const mockContributions = generateMockContributions();

// Dashboard Content Component
function DashboardContent({ username }: { username: string }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Core");
  const categoryRef = useRef<HTMLDivElement>(null);

  // Random Selection Color
  useEffect(() => {
    const brandColors = [
      { main: "#006BFF", bg: "rgba(0, 107, 255, 0.15)" },
      { main: "#FC4C02", bg: "rgba(252, 76, 2, 0.15)" },
      { main: "#FFA400", bg: "rgba(255, 164, 0, 0.15)" },
    ];

    const handleSelection = () => {
      const randomColor =
        brandColors[Math.floor(Math.random() * brandColors.length)];
      document.documentElement.style.setProperty(
        "--moby-selection",
        randomColor.main,
      );
      document.documentElement.style.setProperty(
        "--moby-selection-bg",
        randomColor.bg,
      );
    };

    window.addEventListener("selectstart", handleSelection);
    return () => window.removeEventListener("selectstart", handleSelection);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 space-y-4 bg-[#f8fafc] dark:bg-transparent min-h-screen">
      {/* Top Row: Welcome & Metrics */}
      <div className="flex flex-col xl:flex-row gap-3 items-stretch">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden w-full xl:w-[400px] h-[140px] shrink-0 group rounded-lg border-none shadow-none p-0">
          <img
            src="/src/assets/dashboard_banner.png"
            alt="Sunrise"
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-100 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/15 via-white/5 to-transparent"></div>
          <div className="relative p-6 h-full flex flex-col justify-start pt-6 text-left">
            <p
              className="text-[11px] font-normal mb-1 text-left"
              style={{
                fontFamily: '"Geometrica", sans-serif',
                color: "#723434",
              }}
            >
              Welcome back
            </p>
            <p
              className="!text-[18px] font-normal text-gray-900 dark:text-white leading-tight text-left whitespace-nowrap"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              Good Morning, {username}!
            </p>
          </div>
        </div>

        {/* Metrics Group */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Competency Score",
              value: "3.2",
              trend: "Excellent Progress",
              color: "blue",
              icon: TrendingUp,
              bgColor: "bg-blue-50 dark:bg-blue-900/30",
              textColor: "text-blue-500 dark:text-blue-400",
            },
            {
              label: "1 Active IDPs",
              value: "1",
              trend: "2 Due Next Week",
              color: "orange",
              icon: CheckCircle2,
              bgColor: "bg-orange-50 dark:bg-orange-900/30",
              textColor: "text-orange-500 dark:text-orange-400",
            },
            {
              label: "Pending Assessments",
              value: "1",
              trend: "Due in 5 day",
              color: "rose",
              icon: AlertCircle,
              bgColor: "bg-rose-50 dark:bg-rose-900/30",
              textColor: "text-rose-500 dark:text-rose-400",
            },
            {
              label: "Learning Hours",
              value: "12.5",
              trend: "+2.5 This Week",
              color: "emerald",
              icon: Clock,
              bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
              textColor: "text-emerald-500 dark:text-emerald-400",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 transition-all flex flex-col justify-between h-[140px] text-left border-none shadow-none"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-start text-left w-full">
                  <p
                    className="text-[11px] text-gray-600 dark:text-gray-400 font-normal text-left leading-tight"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    {item.label}
                  </p>
                  <item.icon
                    className={`w-4.5 h-4.5 ${item.textColor} shrink-0 ml-2`}
                  />
                </div>
                <h3
                  className="text-[24px] font-bold text-gray-700 dark:text-white leading-none text-left"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  {item.value}
                </h3>
              </div>

              <p
                className={`text-[11px] font-normal ${item.textColor} text-left`}
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {item.trend}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Middle Row: Competency, Strengths, Engagement */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* Competency Overview */}
        <Card className="col-span-12 xl:col-span-5 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative">
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006BFF]/5 dark:bg-[#006BFF]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </div>

          <div className="flex items-baseline justify-between mb-2 relative z-20">
            <div className="flex items-center gap-3">
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Competency Overview
              </h2>
            </div>
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`
                  group flex items-center gap-2 px-4 py-2 rounded-full border
                  transition-all duration-300 active:scale-[0.96] cursor-pointer text-[12px] font-normal
                  ${
                    isCategoryOpen
                      ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300"
                      : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-200/60 dark:hover:border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
                  }
                `}
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {selectedCategory}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isCategoryOpen
                      ? "rotate-180 text-[#FC4C02] dark:text-[#FC4C02]"
                      : "rotate-0 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-2 w-38 
                  bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-transparent p-1 z-50 
                  transition-all duration-300 origin-top-right shadow-xl surface-glass
                  ${
                    isCategoryOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  {["Core", "Technical", "Leadership", "Soft Skills"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryOpen(false);
                        }}
                        className={`
                        flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal 
                        transition-all duration-200 cursor-pointer
                        ${
                          selectedCategory === cat
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        <span className="flex-1 text-left">{cat}</span>
                        {selectedCategory === cat && (
                          <Check className="w-4 h-4 text-orange-600" />
                        )}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start relative z-10 -mt-4">
            {/* Radar Chart */}
            <div className="w-full lg:w-1/2 aspect-square flex items-center justify-start -mt-10">
              <ChartContainer
                config={radarChartConfig}
                className="w-full h-full max-h-[260px] outline-none focus:outline-none [&_*]:outline-none"
              >
                <RadarChart
                  data={radarChartData}
                  margin={{ top: 0, right: 40, bottom: 10, left: 30 }}
                  outerRadius="70%"
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent className="border-none" />}
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "#4b5563",
                      fontSize: 11,
                      fontFamily: '"Geometrica", sans-serif',
                      fontWeight: 400,
                      opacity: 0.9,
                    }}
                  />
                  <PolarGrid
                    gridType="polygon"
                    stroke="currentColor"
                    strokeOpacity={0.1}
                  />
                  <Radar
                    dataKey="expected"
                    fill="var(--color-expected)"
                    fillOpacity={0.05}
                    stroke="var(--color-expected)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  <Radar
                    dataKey="actual"
                    fill="var(--color-actual)"
                    fillOpacity={0.4}
                    stroke="var(--color-actual)"
                    strokeWidth={2.5}
                  />
                </RadarChart>
              </ChartContainer>
            </div>

            <div className="flex-1 w-full flex flex-col items-end">
              <div className="w-fit ml-auto space-y-2.5">
                <div className="py-3.5 px-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between gap-6 mb-2">
                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                      Current Rating
                    </span>
                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-[11px]">
                      <TrendingUp className="w-3 h-3" />
                      +6%
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span
                      className="text-[24px] font-bold text-gray-700 dark:text-white leading-none tracking-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      3.2
                    </span>
                    <span className="text-[14px] font-bold text-gray-400 dark:text-gray-600 mb-0.5">
                      / 5.0
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 justify-start px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fc4c02]"></div>
                    <span className="text-[12px] font-normal text-gray-500 dark:text-gray-400">
                      Actual
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-[12px] font-normal text-gray-500 dark:text-gray-400">
                      Target
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="-mt-10 relative z-10 text-left w-full">
            <h3
              className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2 leading-tight text-left"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              Activity
            </h3>
            <div className="w-full overflow-hidden">
              <ContributionGraph
                data={mockContributions}
                year={new Date().getFullYear()}
                showLegend={true}
                showTooltips={true}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Top Strengths & Areas to Improve */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full text-left">
          <div className="flex flex-col gap-4 items-start">
            <section className="w-full text-left">
              <h3
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Top Strengths
              </h3>
              <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                {[
                  "Strategic Leadership Workshop",
                  "Team Communication",
                  "Mentoring Junior Devs",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-left">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#32bea6] flex items-center justify-center shrink-0 mt-0">
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span
                      className="text-[11px] text-gray-700 dark:text-gray-200 font-medium text-left leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="w-full text-left">
              <h3
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Areas to Improve
              </h3>
              <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                {[
                  "Project Management",
                  "Conflict Resolution",
                  "Data Analysis",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-left">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#f4c300] flex items-center justify-center shrink-0 mt-0">
                      <svg
                        className="w-1.6 h-1.6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect x="10.7" y="5" width="2.6" height="9" rx="1.3" />
                        <circle cx="12" cy="17" r="1.4" />
                      </svg>
                    </div>
                    <span
                      className="text-[11px] text-gray-700 dark:text-gray-200 font-medium text-left leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Card>

        {/* Engagement Overview */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none h-full">
          <div className="flex flex-col gap-3.5">
            <h3
              className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              Engagement Overview
            </h3>
            <div className="space-y-2.5">
              {/* Points */}
              <div className="flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer rounded-2xl relative">
                <div className="flex items-center gap-4 text-left pr-12">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <div className="relative flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-linear-to-br from-yellow-300 via-orange-400 to-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                        <div className="absolute inset-[1.5px] rounded-full border border-yellow-200/50 shadow-inner"></div>
                      </div>
                      <Star className="absolute w-3.5 h-3.5 text-white fill-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.15)]" />
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Points
                    </p>
                    <p
                      className="mt-1 text-[11px] font-normal text-gray-500 dark:text-gray-400"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      +20 This week
                    </p>
                  </div>
                </div>
                <span
                  className="text-2xl font-semibold text-[#2ecc71] absolute right-2.5 top-1/2 -translate-y-1/2"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  +20
                </span>
              </div>

              {/* Efficient Learner */}
              <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer rounded-2xl">
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <img
                    src={efficientLearnerIcon}
                    className="w-full h-full object-contain"
                    alt="Efficient Learner"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Efficient Learner
                  </p>
                  <p
                    className="mt-1 text-[11px] font-normal text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Level 2
                  </p>
                </div>
              </div>

              {/* Streak */}
              <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 rounded-2xl relative overflow-hidden h-[74px] cursor-pointer group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <img
                      src={keepUpIcon}
                      className="w-full h-full object-contain"
                      alt="Streak"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Keep Up 8 Day Streak
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <img
                        src={BookOpenPng}
                        className="w-3 h-3 object-contain opacity-40 grayscale"
                        alt="Book"
                      />
                      <img
                        src={BriefcasePng}
                        className="w-3 h-3 object-contain opacity-40 grayscale"
                        alt="Briefcase"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-[#006bff] dark:bg-blue-600 hover:bg-[#0056cc] group-hover:bg-[#0056cc] text-white rounded-full shadow-sm transition-all active:scale-95 absolute bottom-2.5 right-2.5 cursor-pointer"
                  title="Start Course"
                >
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Progress and Recommended */}
      <div className="grid grid-cols-12 gap-4 items-stretch">
        {/* Learning Progress */}
        <Card className="col-span-12 xl:col-span-5 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden">
          <h2
            className="!text-[18px] font-medium !text-[#08060d] dark:!text-white !mb-[-4px] px-4 text-left leading-none"
            style={{ fontFamily: '"Geometrica", sans-serif' }}
          >
            Learning Progress
          </h2>
          <div className="relative">
            <div className="space-y-4 max-h-[360px] overflow-y-auto px-4 -mt-2 pt-2 pb-10 no-scrollbar">
              {[
                {
                  title: "Project Management Basics",
                  date: "2027-06-15",
                  progress: 60,
                  status: "Resume Course",
                },
                {
                  title: "Mentoring Junior Devs",
                  date: "2027-07-01",
                  progress: 0,
                  status: "Start Course",
                },
                {
                  title: "Leadership Fundamentals",
                  date: "2027-07-10",
                  progress: 85,
                  status: "Resume Course",
                },
                {
                  title: "Agile Methodology",
                  date: "2027-08-01",
                  progress: 30,
                  status: "Resume Course",
                },
                {
                  title: "Communication Skills",
                  date: "2027-08-15",
                  progress: 45,
                  status: "Resume Course",
                },
              ].map((course, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[24px] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer flex flex-col gap-4 group"
                >
                  <div className="flex items-start justify-between gap-4 text-left">
                    <div className="flex flex-col items-start gap-2.5 flex-1">
                      {/* Course Badge */}
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="8.5" cy="8.5" r="5.2" />
                          <circle cx="15.5" cy="8.5" r="5.2" />
                          <circle cx="8.5" cy="15.5" r="5.2" />
                          <circle cx="15.5" cy="15.5" r="5.2" />
                        </svg>
                        Course
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3
                          className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight mt-1"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          {course.title}
                        </h3>
                        <p
                          className="text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-1"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          Due {course.date}
                        </p>
                      </div>
                    </div>

                    {/* Hover Action Label */}
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 text-[#006bff] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shrink-0 pointer-events-none group-hover:pointer-events-auto">
                      <div className="relative group/text">
                        <span
                          className="text-[12px] font-bold relative z-10"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          {course.status}
                        </span>
                        {/* Animated Underline */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006bff] transition-all duration-300 group-hover:w-full rounded-full"></div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.1)]">
                      <div
                        className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span
                      className="text-[14px] font-medium text-gray-800 dark:text-gray-200 shrink-0 min-w-[36px] text-right"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Fade Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Recommended for You */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 pt-4 pb-0 px-0 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none relative overflow-hidden">
          <h2
            className="!text-[18px] font-medium !text-[#08060d] dark:!text-white !mb-[-4px] px-4 text-left leading-none"
            style={{ fontFamily: '"Geometrica", sans-serif' }}
          >
            Recommended for You
          </h2>
          <div className="relative">
            <div className="space-y-2 max-h-[360px] overflow-y-auto px-4 -mt-2 pt-2 pb-10 no-scrollbar">
              {[
                {
                  title: "Advanced Project Planning",
                  date: "2027-06-15",
                  duration: "2 hours 30 minutes",
                },
                {
                  title: "Effective Team Collaboration",
                  date: "2027-06-20",
                  duration: "1 hour 15 minutes",
                },
                {
                  title: "Data-Driven Decision Making",
                  date: "2027-06-25",
                  duration: "3 hours 45 minutes",
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group text-left relative min-h-[110px]"
                >
                  <div className="flex flex-col items-start gap-1.5 text-left pr-8 flex-1">
                    {/* Course Badge */}
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="8.5" cy="8.5" r="5.2" />
                        <circle cx="15.5" cy="8.5" r="5.2" />
                        <circle cx="8.5" cy="15.5" r="5.2" />
                        <circle cx="15.5" cy="15.5" r="5.2" />
                      </svg>
                      Course
                    </div>

                    <div>
                      <p
                        className="text-[14px] font-semibold text-gray-800 dark:text-gray-200 transition-colors leading-tight"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {rec.title}
                      </p>
                      <p
                        className="text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-1 leading-tight"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        Due {rec.date}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Duration & Action Button */}
                  <div className="flex items-center justify-between w-full mt-auto">
                    <div className="flex items-start gap-1.5 text-gray-700 dark:text-gray-300">
                      <Clock className="w-5 h-5 opacity-80 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span
                          className="text-[12px] font-normal leading-[1.2]"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          {rec.duration.split(" minutes")[0]}
                        </span>
                        <span
                          className="text-[12px] font-normal leading-[1.2]"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          minutes
                        </span>
                      </div>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-[#006bff] dark:bg-blue-600 flex items-center justify-center active:scale-95 hover:bg-[#0056cc] group-hover:bg-[#0056cc] transition-all shrink-0 cursor-pointer shadow-sm">
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Fade Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none z-10" />
          </div>
        </Card>

        {/* Fox - Gamification */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-4 p-0 overflow-hidden rounded-lg bg-[#fcfcfd] dark:bg-gray-800/90 border-none shadow-none transition-all duration-300">
          <div className="relative h-64 overflow-hidden group">
            <div className="absolute inset-x-0 top-0 pt-4 px-4 z-20 flex items-center justify-between">
              <h2
                className="!text-[18px] font-bold !text-[#08060d] dark:!text-white"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Your Fox
              </h2>
              <span
                className="px-3 py-1 rounded-full text-[12px] font-normal bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border border-gray-200/40 cursor-default"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Lucy Lv.2
              </span>
            </div>

            <img
              src="/src/assets/dashboard_fox.png"
              alt="Lucy the Fox"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fcfcfd] via-[#fcfcfd]/50 to-transparent z-10"></div>
          </div>

          <div className="px-4 pb-6 pt-0">
            <div className="flex items-center gap-4">
              <span
                className="text-[11px] font-normal text-gray-900 dark:text-white shrink-0"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                EXP
              </span>
              <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.1)] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-orange-400 via-yellow-400 to-orange-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(251,146,60,0.3)]"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <span
                className="text-[11px] font-normal text-gray-900 dark:text-white shrink-0"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                60/100
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

interface EmployeeDashboardProps {
  onLogout: () => void;
  username: string;
}

function EmployeeDashboard({ onLogout, username }: EmployeeDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Update document title based on current route
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/assessment": "Assessment",
      "/competency-profile": "Competency",
      "/my-idp-learning": "Learning",
      "/short-learning": "Short Learning",
      "/team-profile": "Team Profile",
      "/settings": "Settings",
      "/profile": "Profile",
      "/help": "Help",
      "/home": "Admin Home",
      "/manage-role": "Manage Role",
      "/announcement": "Announcement",
    };

    const currentPage = pageTitles[location.pathname] || "Dashboard";
    document.title = `${currentPage} | Moby Skills`;
  }, [location.pathname]);

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
          position="Employee"
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-hidden w-full h-full relative bg-gray-50 dark:bg-gray-900">
          <header
            className={`
                absolute top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 py-4 shrink-0
                ${
                  isScrolled
                    ? "bg-[#fcfcfd]/80 dark:bg-[#0c0e12]/80 backdrop-blur-xl backdrop-saturate-150 surface-glass border-none"
                    : "bg-transparent border-none shadow-none"
                }
              `}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  {location.pathname === "/dashboard" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        Dashboard
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
                  {location.pathname === '/help/history' && (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink 
                          onClick={() => navigate('/help')}
                          className="cursor-pointer"
                          style={{ fontFamily: 'Geometrica, sans-serif' }}
                        >
                          Help
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                          History
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {location.pathname === '/my-idp-learning' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        My IDP & Learning
                      </BreadcrumbPage>
                    </BreadcrumbItem>
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
                <Route
                  path="/my-idp-learning"
                  element={<MyIDPLearningPage />}
                />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/help/*"
                  element={<HelpPage username={username} role="employee" />}
                />
                <Route
                  path="/dashboard"
                  element={<DashboardContent username={username} />}
                />
              </Routes>
            </div>
          </div>
        </main>
        <BackToTop />
      </div>
    </SidebarProvider>
  );
}

export default EmployeeDashboard;
