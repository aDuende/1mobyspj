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

interface EmployeeDashboardProps {
  onLogout: () => void;
  username: string;
}

function EmployeeDashboard({ onLogout, username }: EmployeeDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden fixed inset-0">
        <AppSidebar onNavigate={handleNavigate} username={username} position="Employee" onLogout={onLogout} />
        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center shrink-0">
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
          
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
            <Routes>
              <Route path="/settings" element={<SettingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
