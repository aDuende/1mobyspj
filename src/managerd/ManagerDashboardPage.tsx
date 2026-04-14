import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import SettingPage from "../SettingPage";
import ProfilePage from "../ProfilePage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

interface ManagerDashboardProps {
  onLogout: () => void;
  username: string;
}

function ManagerDashboard({ onLogout, username }: ManagerDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar onNavigate={handleNavigate} username={username} position="Manager" onLogout={onLogout} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      onClick={() => handleNavigate('/dashboard')}
                      className="cursor-pointer"
                      style={{ fontFamily: 'Geometrica, sans-serif' }}
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {location.pathname === '/settings' && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage style={{ fontFamily: 'Geometrica, sans-serif' }}>
                          Settings
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
            <Routes>
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Manager Portal
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                    Manage your team, assign courses, and track employee progress.
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

export default ManagerDashboard;
