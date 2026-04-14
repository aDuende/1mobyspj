import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import SettingPage from "../SettingPage";

interface EmployeeDashboardProps {
  onLogout: () => void;
  username: string;
}

function EmployeeDashboard({ onLogout, username }: EmployeeDashboardProps) {
  const [currentPage, setCurrentPage] = useState<string>('/');

  const handleNavigate = (path: string) => {
    setCurrentPage(path);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden fixed inset-0">
        <AppSidebar onNavigate={handleNavigate} />
        <main className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                {currentPage === '/settings' ? 'Settings' : 'Employee Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                Welcome, {username}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                style={{ fontFamily: 'Geometrica, sans-serif' }}
              >
                Logout
              </button>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
            {currentPage === '/settings' ? (
              <SettingPage />
            ) : (
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
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default EmployeeDashboard;
