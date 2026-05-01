"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  Radar,
  BookOpen,
  Users,
  Settings,
  LifeBuoy,
  LogOut,
  Home,
  Shield,
  Megaphone,
  UserCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import { NavGeneral } from "./nav-general";
import { NavAdmin } from "./nav-admin";
import { useSidebar } from "./hooks/use-sidebar";
import { cn } from "./lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "./components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import iconMoby from "./assets/icon1moby.svg";
import logoMobyBlue from "./assets/Logo-1Moby-Blue.png";

// Navigation data
const generalItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assessment",
    url: "/assessment",
    icon: ClipboardCheck,
  },
  {
    title: "Competency Profile",
    url: "/competency-profile",
    icon: Radar,
  },
  {
    title: "My IDP & Learning",
    url: "/my-idp-learning",
    icon: BookOpen,
  },
];

const adminItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Manage Role",
    url: "/manage-role",
    icon: Shield,
  },
  {
    title: "Announcement",
    url: "/announcement",
    icon: Megaphone,
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (path: string) => void;
  username?: string;
  position?: string;
  role?: "employee" | "manager" | "admin";
  onLogout?: () => void;
}

export function AppSidebar({
  onNavigate,
  username = "Tarin.Chon",
  position = "Fullstack Dev",
  role = "employee",
  onLogout,
  ...props
}: AppSidebarProps) {
  const location = useLocation();
  const { state, setOpenMobile, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleClick = (e: React.MouseEvent, url: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(url);
      // Close sidebar on mobile after nav
      setOpenMobile(false);
    }
  };

  React.useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      const scrollables = document.querySelectorAll(".overflow-y-auto");
      scrollables.forEach((el) => {
        el.scrollTop = 0;
      });
    };

    resetScroll();

    const rafId = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(rafId);
  }, [location.pathname]);

  // Customize general items based on role
  let generalItemsForRole;
  if (role === "admin") {
    generalItemsForRole = generalItems.filter(
      (item) => item.title !== "Assessment",
    );
  } else if (role === "manager") {
    generalItemsForRole = [
      ...generalItems,
      {
        title: "Team Profile",
        url: "/team-profile",
        icon: Users,
      },
    ];
  } else {
    generalItemsForRole = generalItems;
  }

  const generalItemsWithHandler = generalItemsForRole.map((item) => ({
    ...item,
    isActive: location.pathname === item.url,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
      handleClick(e, item.url),
  }));

  const adminItemsWithHandler = adminItems.map((item) => ({
    ...item,
    isActive: location.pathname === item.url,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
      handleClick(e, item.url),
  }));

  const initials = username
    .split(".")
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <Sidebar
      {...props}
      collapsible="icon"
      className="border-r border-[var(--moby-gray-3)] dark:border-gray-700"
    >
      {/* Header — Logo & Toggle Swap */}
      <SidebarHeader className="px-0 pt-4 pb-5 group-data-[state=expanded]:pb-1 border-none">
        <div className="flex items-center justify-between w-full px-4 group-data-[collapsible=icon]:px-0 group/header relative mt-1.5 h-9">
          {/* Logo Area */}
          <div
            className="relative flex items-center w-full h-full cursor-pointer"
            onClick={(e) => handleClick(e, "/dashboard")}
          >
            {isMobile ? (
              <img src={iconMoby} alt="1Moby" className="h-9 w-9 ml-0" />
            ) : (
              <>
                {/* Logo text */}
                <img
                  src={logoMobyBlue}
                  alt="1MOBY"
                  className="absolute left-0 h-7 top-1/2"
                  style={{
                    transform: "translateY(-50%)",
                    clipPath:
                      state === "expanded"
                        ? "inset(0 0% 0 0)"
                        : "inset(0 100% 0 0)",
                    opacity: state === "expanded" ? 1 : 0,
                    transition:
                      state === "expanded"
                        ? "clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s"
                        : "clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s 0.3s",
                    pointerEvents: state === "expanded" ? "auto" : "none",
                  }}
                />
                {/* Round rolling icon */}
                <img
                  src={iconMoby}
                  alt="1Moby Icon"
                  className={cn(
                    "absolute top-1/2 z-10 transition-all duration-300",
                    state === "expanded" ? "h-9 w-9" : "h-8 w-8"
                  )}
                  style={{
                    left: state === "expanded" ? "0" : "50%",
                    transform:
                      state === "expanded"
                        ? "translate(7rem, -50%) rotate(540deg) scale(0)"
                        : "translate(-50%, -50%) rotate(0deg) scale(1)",
                    opacity: state === "expanded" ? 0 : 1,
                    transition:
                      state === "expanded"
                        ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out 0.2s, left 0.6s"
                        : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s, left 0.5s",
                    pointerEvents: state === "expanded" ? "none" : "auto",
                  }}
                />
              </>
            )}
          </div>

          <SidebarTrigger
            title={isCollapsed ? "Open sidebar" : "Close sidebar"}
            className={cn(
              "flex transition-all duration-300 relative z-20",
              "group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:top-1/2 group-data-[collapsible=icon]:left-1/2 group-data-[collapsible=icon]:-translate-x-1/2 group-data-[collapsible=icon]:-translate-y-1/2 group-data-[collapsible=icon]:!m-0 group-data-[collapsible=icon]:!ml-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:group-hover/header:opacity-100",
              "group-data-[collapsible=expanded]:ml-auto",
            )}
          />
        </div>
      </SidebarHeader>

      {/* Content — Nav items */}
      <SidebarContent className="px-0 pt-1 group-data-[state=expanded]:pt-0 overflow-visible group-data-[collapsible=icon]:overflow-visible">
        {role === "admin" ? (
          <>
            <NavGeneral items={generalItemsWithHandler} />
            <NavAdmin
              items={adminItemsWithHandler}
              className="mt-3.5 group-data-[state=expanded]:mt-1"
            />
          </>
        ) : (
          <NavGeneral items={generalItemsWithHandler} />
        )}
      </SidebarContent>

      {/* Footer — Avatar & Popup menu */}
      <SidebarFooter className="px-0 py-3 border-none">
        <SidebarMenu className={cn(isCollapsed && "items-center")}>
          <SidebarMenuItem className="flex justify-center w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    "group w-full rounded-xl hover:bg-gray-100/60 dark:hover:bg-gray-700/60 data-[state=open]:bg-gray-100/60 dark:data-[state=open]:bg-gray-100/60 focus-visible:ring-0 cursor-pointer transition-all duration-200 overflow-visible",
                    isCollapsed
                      ? "w-8 h-8 p-0 justify-center"
                      : "h-auto pl-4 pr-4 py-2",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      isCollapsed ? "justify-center" : "gap-3 w-full",
                    )}
                  >
                    <div
                      className={cn(
                        "aspect-square !rounded-full flex items-center justify-center text-white font-normal shrink-0 overflow-hidden transition-all duration-300",
                        isCollapsed ? "w-8 h-8 min-w-[32px] min-h-[32px] text-xs" : "w-9 h-9 min-w-[36px] min-h-[36px] text-xs"
                      )}
                      style={{
                        fontFamily: '"Geometrica", sans-serif',
                        backgroundColor: position
                          .toLowerCase()
                          .includes("admin")
                          ? "#fc4c02"
                          : position.toLowerCase().includes("manager")
                            ? "#ffa400"
                            : "#006bff",
                      }}
                    >
                      {initials}
                    </div>
                    <div className="flex flex-col items-start min-w-0 group-data-[collapsible=icon]:hidden">
                      <span
                        className="text-[14px] font-normal text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white transition-colors duration-200 truncate w-full text-left"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {username}
                      </span>
                      <span
                        className="text-[12px] text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors duration-200 truncate w-full text-left"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {position}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                alignOffset={8}
                sideOffset={12}
                className="w-44 rounded-xl p-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-none ring-0 transition-all duration-300 origin-bottom-left"
              >
                <DropdownMenuItem
                  onClick={() => onNavigate?.("/profile")}
                  className="group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-normal tracking-tight text-gray-700 dark:text-gray-300 focus:bg-gray-100/60 hover:bg-gray-100/60 dark:focus:bg-gray-700/60 dark:hover:bg-gray-700/60 !focus:text-gray-900 !hover:text-gray-900 dark:!focus:text-white dark:!hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  <UserCircle className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white shrink-0" />
                  <span className="group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white transition-colors duration-200">
                    Profile
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onNavigate?.("/settings")}
                  className="group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-normal tracking-tight text-gray-700 dark:text-gray-300 focus:bg-gray-100/60 hover:bg-gray-100/60 dark:focus:bg-gray-700/60 dark:hover:bg-gray-700/60 !focus:text-gray-900 !hover:text-gray-900 dark:!focus:text-white dark:!hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  <Settings className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white shrink-0" />
                  <span className="group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white transition-colors duration-200">
                    Settings
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="mx-2 my-1 bg-gray-100/60 dark:bg-gray-700/40" />

                <DropdownMenuItem
                  onClick={() => onNavigate?.("/help")}
                  className="group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-normal tracking-tight text-gray-700 dark:text-gray-300 focus:bg-gray-100/60 hover:bg-gray-100/60 dark:focus:bg-gray-700/60 dark:hover:bg-gray-700/60 !focus:text-gray-900 !hover:text-gray-900 dark:!focus:text-white dark:!hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  <LifeBuoy className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white shrink-0" />
                  <span className="group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white transition-colors duration-200">
                    Help
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onLogout}
                  className="group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-normal tracking-tight text-gray-700 dark:text-gray-300 focus:bg-gray-100/60 hover:bg-gray-100/60 dark:focus:bg-gray-700/60 dark:hover:bg-gray-700/60 !focus:text-gray-900 !hover:text-gray-900 dark:!focus:text-white dark:!hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  <LogOut className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white shrink-0" />
                  <span className="group-hover:text-gray-900 group-focus:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white transition-colors duration-200">
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail title={isCollapsed ? "Open sidebar" : "Close sidebar"} />
    </Sidebar>
  );
}
