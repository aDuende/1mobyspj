"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  UserCircle,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
  Home,
  Shield,
  Megaphone,
  PanelLeft,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import { NavGeneral } from "./nav-general";
import { NavSetting } from "./nav-setting";
import { NavAdmin } from "./nav-admin";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from "./components/ui/sidebar";
import { useSidebar } from "./hooks/use-sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

import logoWhite from "./assets/1Moby-Logo (white).png";

// ---------------- DATA ----------------

const generalItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Assessment", url: "/assessment", icon: ClipboardCheck },
  { title: "Competency Profile", url: "/competency-profile", icon: UserCircle },
  { title: "My IDP & Learning", url: "/my-idp-learning", icon: BookOpen },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

const adminItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Manage Role", url: "/manage-role", icon: Shield },
  { title: "Announcement", url: "/announcement", icon: Megaphone },
];

// ---------------- COMPONENT ----------------

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
  const { toggleSidebar } = useSidebar();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(url);
    }
  };

  // -------- ROLE LOGIC --------

  let generalItemsForRole;
  if (role === "admin") {
    generalItemsForRole = generalItems.filter(
      (item) => item.title !== "Assessment"
    );
  } else if (role === "manager") {
    generalItemsForRole = [
      ...generalItems,
      { title: "Team Profile", url: "/team-profile", icon: Users },
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

  const settingsItemsWithHandler = settingsItems.map((item) => ({
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

  // -------- UI --------

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="relative z-50 border-r border-gray-200 dark:border-gray-700"
    >
      {/* HEADER (expanded) */}
      <SidebarHeader className="group/header flex-row items-center justify-between px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700 group-data-[collapsible=icon]:hidden transition-all duration-200">
        <img
          src={logoWhite}
          alt="1Moby"
          className="h-auto w-32 dark:hidden"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(35%) sepia(90%) saturate(3500%) hue-rotate(200deg) brightness(100%) contrast(105%)",
          }}
        />
        <img
          src={logoWhite}
          alt="1Moby"
          className="h-auto w-32 hidden dark:block mt-1"
        />
        <SidebarTrigger
          className="ml-2 h-9 w-9 rounded-full border border-transparent bg-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm hover:scale-105 dark:hover:border-gray-700 dark:hover:bg-gray-900 transition-all duration-200 shrink-0"
        />
      </SidebarHeader>

      {/* HEADER (collapsed) - favicon morphs to sidebar icon on hover */}
      <SidebarHeader className="hidden group-data-[collapsible=icon]:flex items-center justify-center px-2 pt-5 pb-3 transition-all duration-200">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="group/trigger relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          <img
            src="/favicon.svg"
            alt="1Moby"
            className="absolute h-7 w-7 transition-all duration-200 ease-out opacity-100 scale-100 group-hover/trigger:opacity-0 group-hover/trigger:scale-75"
          />
          <PanelLeft className="absolute h-5 w-5 text-gray-700 dark:text-gray-300 transition-all duration-200 ease-out opacity-0 scale-75 group-hover/trigger:opacity-100 group-hover/trigger:scale-100" />
        </button>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="relative z-10 transition-all duration-200">
        <SidebarSeparator className="hidden group-data-[collapsible=icon]:block my-2 mx-3" />

        {role === "admin" ? (
          <>
            <NavGeneral items={generalItemsWithHandler} />
            <NavAdmin items={adminItemsWithHandler} />
          </>
        ) : (
          <NavGeneral items={generalItemsWithHandler} />
        )}

        <SidebarSeparator className="my-3 group-data-[collapsible=icon]:mx-3" />

        <NavSetting items={settingsItemsWithHandler} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 h-auto group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-3 flex-1 group-data-[collapsible=icon]:justify-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shrink-0 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8">
                      {username
                        .split(".")
                        .map((n) => n[0].toUpperCase())
                        .join("")}
                    </div>

                    <div className="flex flex-col items-start flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate w-full">
                        {username}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                        {position}
                      </span>
                    </div>

                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 group-data-[collapsible=icon]:hidden" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate?.("/profile")}>
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}