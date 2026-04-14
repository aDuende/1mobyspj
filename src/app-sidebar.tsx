"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ClipboardCheck,
  UserCircle,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
} from "lucide-react"

import { NavGeneral } from "./nav-general"
import { NavSetting } from "./nav-setting"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
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
  username?: string;
  position?: string;
  onLogout?: () => void;
}

export function AppSidebar({ onNavigate, username = "Tarin.Chon", position = "Fullstack Dev", onLogout, ...props }: AppSidebarProps) {
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
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 h-auto">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {username.split('.').map(n => n[0].toUpperCase()).join('')}
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate w-full" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        {username}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full" style={{ fontFamily: 'Geometrica, sans-serif' }}>
                        {position}
                      </span>
                    </div>
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onNavigate?.('/profile')} className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Geometrica, sans-serif' }}>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Geometrica, sans-serif' }}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
