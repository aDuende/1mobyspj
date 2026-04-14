import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './LoginPage.tsx'
import LoadingPage from './LoadingPage.tsx'
import EmployeeDashboard from './employee/EmployeeDashboardPage.tsx'
import ManagerDashboard from './managerd/ManagerDashboardPage.tsx'
import AdminDashboard from './adminn/AdminDashboardPage.tsx'




type UserRole = 'employee' | 'manager' | 'admin' | null;

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState("");

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleLogin = (role: 'employee' | 'manager' | 'admin', user: string) => {
    setUserRole(role);
    setUsername(user);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername("");
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  // Route to appropriate dashboard based on user role
  if (userRole === 'employee') {
    return <EmployeeDashboard onLogout={handleLogout} username={username} />;
  }

  if (userRole === 'manager') {
    return <ManagerDashboard onLogout={handleLogout} username={username} />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={handleLogout} username={username} />;
  }

  // Show login page
  return <LoginPage onLogin={handleLogin} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />

  </StrictMode>,
)
