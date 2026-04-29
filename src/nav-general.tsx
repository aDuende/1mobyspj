"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/ui/sidebar";

export function NavGeneral({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className="px-6 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        style={{ fontFamily: "Geometrica, sans-serif" }}
      >
        General
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.isActive}
              className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/20 data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-400"
            >
              <a
                href={item.url}
                onClick={item.onClick}
                className="flex items-center gap-3"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
