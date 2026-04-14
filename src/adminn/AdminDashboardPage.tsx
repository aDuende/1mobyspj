import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Bell, Moon, Sun, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
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
  const [language, setLanguage] = useState('EN');

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'TH' : 'EN');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden fixed inset-0">
        <AppSidebar onNavigate={handleNavigate} username={username} position="Administrator" role="admin" onLogout={onLogout} />
        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  {location.pathname === '/home' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        Home
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === '/dashboard' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === '/settings' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        Settings
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === '/profile' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        Profile
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={toggleTheme}
                title={isDarkMode ? 'Light mode' : 'Dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </Button>
              <Button
                variant="ghost"
                className="h-10 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                onClick={toggleLanguage}
                title="Change language"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                  {language}
                </span>
              </Button>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            <Routes>
              <Route path="/home" element={
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Admin Home
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Welcome to the admin portal. Manage roles and announcements from the sidebar.
                  </p>
                </div>
              } />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Admin Portal
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Manage the entire LMS system, users, courses, and settings.
                  </p>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminDashboard;
