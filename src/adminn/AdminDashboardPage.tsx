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
import AdminIDPPage from "./AdminIDPPage";
import AdminAddCourse from "./AdminAddCourse";
import AdminCompetencyProfilePage from "./AdminCompetencyProfilePage";
import AdminDashboardContent from "./AdminDashboardContent";
import HomePage from "./HomePage";
import BackToTop from "../components/smoothui/back-to-top";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  const [helpSubPage, setHelpSubPage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSubPage = (e: Event) => {
      setHelpSubPage((e as CustomEvent).detail.page);
    };
    window.addEventListener("help:subpage", handleSubPage);
    return () => window.removeEventListener("help:subpage", handleSubPage);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/help") {
      // Use a microtask to avoid synchronous setState in effect body
      queueMicrotask(() => setHelpSubPage(null));
    }
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
                    ? "bg-[#fcfcfd]/80 dark:bg-[#0c0e12]/80 backdrop-blur-xl backdrop-saturate-150 surface-glass border-none"
                    : "bg-transparent border-none shadow-none"
                }
              `}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
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
                  {location.pathname === "/help" && !helpSubPage && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Help
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/help" && helpSubPage && (
                    <>
                      <BreadcrumbItem>
                        <button
                          onClick={() =>
                            window.dispatchEvent(new CustomEvent("help:back"))
                          }
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Help
                        </button>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          {helpSubPage}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
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

                  {location.pathname === "/competency-profile" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        Competency Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/my-idp-learning" && (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        My IDP &amp; Learning
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === "/admin-add-course" && (
                    <>
                      <BreadcrumbItem>
                        <button
                          onClick={() => navigate("/my-idp-learning")}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          My IDP &amp; Learning
                        </button>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          Add New Course
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
                <Route path="/home" element={<HomePage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route
                  path="/competency-profile"
                  element={<AdminCompetencyProfilePage />}
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/help" element={<AdminHelpPage />} />
                <Route path="/manage-role" element={<ManageRolePage />} />
                <Route path="/announcement" element={<AnnouncementPage />} />
                <Route path="/my-idp-learning" element={<AdminIDPPage />} />
                <Route path="/admin-add-course" element={<AdminAddCourse />} />
                <Route
                  path="/dashboard"
                  element={<AdminDashboardContent username={username} />}
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

export default AdminDashboard;
