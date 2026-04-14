import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom'
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate('/');
  };

  const handleLogin = (role: 'employee' | 'manager' | 'admin', user: string) => {
    setUserRole(role);
    setUsername(user);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername("");
    navigate('/');
  };

  // Redirect to login if not authenticated and trying to access dashboard
  useEffect(() => {
    if (!isLoading && !userRole && location.pathname !== '/') {
      navigate('/');
    }
  }, [isLoading, userRole, location.pathname, navigate]);

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
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>,
)
