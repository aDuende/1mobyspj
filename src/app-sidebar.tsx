"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ClipboardCheck,
  UserCircle,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react"

import { NavGeneral } from "./nav-general"
import { NavSetting } from "./nav-setting"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./components/ui/sidebar"
import logo from './assets/1Moby-Logo (white).png'

// Navigation data
const generalItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Assessment",
    url: "/assessment",
    icon: ClipboardCheck,
  },
  {
    title: "Competency Profile",
    url: "/competency-profile",
    icon: UserCircle,
  },
  {
    title: "My IDP & Learning",
    url: "/my-idp-learning",
    icon: BookOpen,
  },
]

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (path: string) => void;
}

export function AppSidebar({ onNavigate, ...props }: AppSidebarProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(url);
    }
  };

  const generalItemsWithHandler = generalItems.map(item => ({
    ...item,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, item.url)
  }));

  const settingsItemsWithHandler = settingsItems.map(item => ({
    ...item,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, item.url)
  }));

  return (
    <Sidebar {...props} className="border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
        <img 
          src={logo} 
          alt="1Moby" 
          className="h-8 w-auto"
          style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2842%) hue-rotate(207deg) brightness(102%) contrast(101%)' }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavGeneral items={generalItemsWithHandler} />
        <NavSetting items={settingsItemsWithHandler} />
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Geometrica, sans-serif' }}>
          © 2026 1Moby LMS
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
