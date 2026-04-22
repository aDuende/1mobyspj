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
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";

// Dashboard Content Component
function DashboardContent({ username }: { username: string }) {
  return (
    <div className=" p-6 space-y-6">
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden border-0 shadow-lg">
        <div className="absolute inset-0 bg-linear-to-r from-orange-300 via-yellow-200 to-orange-200"></div>
        <div className="relative p-6">
          <p
            className="text-sm text-orange-600 font-medium"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Welcome back
          </p>
          <h1
            className="text-2xl font-bold text-gray-900 mt-1"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Good Morning, {username}!
          </h1>
        </div>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Competency Score
              </p>
              <h3
                className="text-3xl font-bold text-gray-900 mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                3.2
              </h3>
              <p
                className="text-xs text-blue-600 font-medium mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Excellent Progress
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                1 Active IEPs
              </p>
              <h3
                className="text-3xl font-bold text-gray-900 mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                1
              </h3>
              <p
                className="text-xs text-orange-600 font-medium mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                2 Due Next Week
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Pending Assessments
              </p>
              <h3
                className="text-3xl font-bold text-gray-900 mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                1
              </h3>
              <p
                className="text-xs text-orange-600 font-medium mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Due in 5 day
              </p>
            </div>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Learning Hours
              </p>
              <h3
                className="text-3xl font-bold text-gray-900 mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                12.5
              </h3>
              <p
                className="text-xs text-green-600 font-medium mt-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                +2.5 This Week
              </p>
            </div>
            <Clock className="w-5 h-5 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competency Overview */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Competency Overview
            </h2>
            <Button variant="outline" size="sm" className="text-xs">
              View →
            </Button>
          </div>

          <div className="relative h-48 flex items-center justify-center">
            {/* Radar Chart Placeholder */}
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Grid */}
                <polygon
                  points="100,20 160,60 160,140 100,180 40,140 40,60"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <polygon
                  points="100,45 140,75 140,125 100,155 60,125 60,75"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <polygon
                  points="100,70 120,90 120,110 100,130 80,110 80,90"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />

                {/* Axes */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="20"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="160"
                  y2="60"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="160"
                  y2="140"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="180"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="40"
                  y2="140"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="100"
                  x2="40"
                  y2="60"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />

                {/* Data polygon - Expected (blue) */}
                <polygon
                  points="100,50 145,70 145,130 100,150 55,130 55,70"
                  fill="#93c5fd"
                  fillOpacity="0.3"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Data polygon - Actual (orange) */}
                <polygon
                  points="100,60 135,80 135,120 100,140 65,120 65,80"
                  fill="#fbbf24"
                  fillOpacity="0.4"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </svg>

              {/* Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <span className="text-[10px] text-gray-600">Adaptive</span>
              </div>
              <div className="absolute top-[20%] right-0 translate-x-8">
                <span className="text-[10px] text-gray-600">Collaboration</span>
              </div>
              <div className="absolute bottom-[20%] right-0 translate-x-4">
                <span className="text-[10px] text-gray-600">
                  Take Ownership
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                <span className="text-[10px] text-gray-600">Create Impact</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Overall
            </p>
            <h3
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              3.2
            </h3>
            <p
              className="text-xs text-green-600 font-medium mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              +0.2 this month
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 justify-center text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Expected</span>
            </div>
          </div>
        </Card>

        {/* Middle Column - Strengths and Areas to Improve */}
        <Card className="lg:col-span-1 p-6">
          {/* Top Strengths */}
          <div className="mb-6">
            <h2
              className="text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Top Strengths
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Strategic Leadership Workshop
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Team Communication
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Mentoring Junior Devs
                </span>
              </div>
            </div>
          </div>

          {/* Areas to Improve */}
          <div>
            <h2
              className="text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Areas to Improve
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Project Management
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Conflict Resolution
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Geometrica, sans-serif" }}
                >
                  Data Analysis
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Engagement Overview */}
        <Card className="lg:col-span-1 p-6">
          <h2
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Engagement Overview
          </h2>

          <div className="space-y-4">
            {/* Points */}
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Points
                  </p>
                  <p
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    +20 This week
                  </p>
                </div>
              </div>
              <span
                className="text-xl font-bold text-green-600"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                +20
              </span>
            </div>

            {/* Efficient Learner */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Efficient Learner
                  </p>
                  <p
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Level 2
                  </p>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Keep Up 8 Day Streak
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-orange-400 rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
              >
                Start Course
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid - Learning Progress, Recommendations, Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Card className="lg:col-span-1 p-6">
          <h2
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Learning Progress
          </h2>

          <div className="space-y-4">
            {/* Course 1 */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Project Management Basics
                  </h3>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Course · Due 2024-06-15
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-blue-600 border-blue-600"
                >
                  Resume Course
                </Button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p
                className="text-xs text-gray-600 mt-1 text-right"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                60%
              </p>
            </div>

            {/* Course 2 */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Mentoring Junior Devs
                  </h3>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Course · Due 2024-07-01
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-blue-600 border-blue-600"
                >
                  Start Course
                </Button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <p
                className="text-xs text-gray-600 mt-1 text-right"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                0%
              </p>
            </div>
          </div>
        </Card>

        {/* Recommended for You */}
        <Card className="lg:col-span-1 p-6">
          <h2
            className="text-lg font-semibold text-gray-900 mb-4"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Recommended for You
          </h2>

          <div className="space-y-4">
            <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h3
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Advanced Project Planning
                  </h3>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Due 2024-06-15
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <h3
                    className="text-sm font-medium text-gray-900"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Effective Conflict Management
                  </h3>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Due 2024-07-01
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Fox - Gamification */}
        <Card className="lg:col-span-1 p-6 bg-linear-to-br from-green-50 to-blue-50">
          <div className="flex items-center justify-between mb-2">
            <h2
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Your Fox
            </h2>
            <span
              className="text-sm text-gray-600"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Lucy Lv.2
            </span>
          </div>

          <div className="flex items-center justify-center my-6">
            <div className="text-6xl">🦊</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span
                className="text-gray-600"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                EXP
              </span>
              <span
                className="text-gray-900 font-medium"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                60/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-linear-to-r from-orange-400 to-yellow-400 h-3 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white bg-opacity-60 rounded-lg">
            <p
              className="text-xs text-gray-700 text-center"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Complete more courses to level up your fox!
            </p>
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
                absolute top-0 left-0 right-0 z-50 transition-all duration-200 flex items-center justify-between px-6 py-4 shrink-0
                ${
                  isScrolled
                    ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/50 dark:border-transparent shadow-sm surface-glass"
                    : "bg-transparent border-b border-transparent shadow-none"
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
                  {location.pathname === "/my-idp-learning" && (
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
                  path="/help"
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
      </div>
    </SidebarProvider>
  );
}

export default EmployeeDashboard;
