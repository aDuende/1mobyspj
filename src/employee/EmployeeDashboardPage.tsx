import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import HelpPage from "../HelpPage";
import MyIDPLearningPage from "../MyIDPLearningPage";
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

interface EmployeeDashboardProps {
  onLogout: () => void;
  username: string;
}

function EmployeeDashboard({ onLogout, username }: EmployeeDashboardProps) {
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
        <AppSidebar onNavigate={handleNavigate} username={username} position="Employee" onLogout={onLogout} />
        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
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
                  {location.pathname === '/help' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        Help
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                  {location.pathname === '/my-idp-learning' && (
                    <BreadcrumbItem>
                      <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        My IDP & Learning
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
          
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
            <Routes>
              <Route path="/my-idp-learning" element={<MyIDPLearningPage />} />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/help" element={<HelpPage username={username} role="employee" />} />
              <Route path="/dashboard" element={
                <div className="min-h-full flex items-center justify-center p-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-2xl w-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                      Employee Portal
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                      Access your courses, assignments, and training materials.
                    </p>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default EmployeeDashboard;
