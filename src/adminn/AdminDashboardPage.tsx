import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import LanguageSelector from "../components/LanguageSelector";
import AppearanceSelector from "../components/AppearanceSelector";
import AlertSelector from "../components/AlertSelector";
import ExperiencePoints from "../components/ExperiencePoints";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import AdminHelpPage from "./AdminHelpPage";
import ManageRolePage from "./ManageRolePage";
import AnnouncementPage from "./AnnouncementPage";
import CompetencyProfilePage from "../CompetencyProfilePage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";

interface AdminDashboardProps {
  onLogout: () => void;
  username: string;
}

function AdminDashboard({ onLogout, username }: AdminDashboardProps) {
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
          position="Administrator"
          role="admin"
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
                  {location.pathname === "/home" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Home
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/dashboard" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
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
                  {location.pathname === "/manage-role" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Manage Role
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/announcement" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Announcement
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
            <div className="pt-16 p-6">
              <Routes>
                <Route
                  path="/home"
                  element={
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Admin Home
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Welcome to the admin portal. Manage roles and
                        announcements from the sidebar.
                      </p>
                    </div>
                  }
                />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/competency-profile" element={<CompetencyProfilePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/help" element={<AdminHelpPage />} />
                <Route path="/manage-role" element={<ManageRolePage />} />
                <Route path="/announcement" element={<AnnouncementPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Admin Portal
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Manage the entire ConteX Skills platform, users,
                        courses, and settings.
                      </p>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminDashboard;
