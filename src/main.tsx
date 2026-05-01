/* eslint-disable react-refresh/only-export-components */
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage.tsx";
import LoadingPage from "./LoadingPage.tsx";
import EmployeeDashboard from "./employee/EmployeeDashboardPage.tsx";
import ManagerDashboard from "./managerd/ManagerDashboardPage.tsx";
import AdminDashboard from "./adminn/AdminDashboardPage.tsx";

type UserRole = "employee" | "manager" | "admin" | null;

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (sessionStorage.getItem("userRole") as UserRole) ?? null;
  });
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem("username") ?? "";
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    const savedRole = sessionStorage.getItem("userRole");
    if (savedRole) {
      if (location.pathname === "/" || location.pathname === "") {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  };

  const handleLogin = (
    role: "employee" | "manager" | "admin",
    user: string,
  ) => {
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("username", user);
    setUserRole(role);
    setUsername(user);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("username");
    setUserRole(null);
    setUsername("");
    navigate("/");
  };

  // Redirect to login if not authenticated and trying to access dashboard
  useEffect(() => {
    if (!isLoading && !userRole && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoading, userRole, location.pathname, navigate]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      document.documentElement.classList.add("scrolling-active");

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("scrolling-active");
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Route to appropriate dashboard based on user role
  const renderContent = () => {
    if (userRole === "employee") {
      return <EmployeeDashboard onLogout={handleLogout} username={username} />;
    }

    if (userRole === "manager") {
      return <ManagerDashboard onLogout={handleLogout} username={username} />;
    }

    if (userRole === "admin") {
      return <AdminDashboard onLogout={handleLogout} username={username} />;
    }

    return <LoginPage onLogin={handleLogin} />;
  };

  return (
    <>
      {renderContent()}

      {isLoading && <LoadingPage onLoadingComplete={handleLoadingComplete} />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>,
);
