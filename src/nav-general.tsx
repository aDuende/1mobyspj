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
    <SidebarGroup className="px-4 group-data-[collapsible=icon]:px-0 transition-all duration-300">
      <SidebarGroupLabel
        className="px-3 py-2 text-xs font-normal text-gray-500 dark:text-gray-400 tracking-wider"
        style={{ fontFamily: "Geometrica, sans-serif" }}
      >
        General
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.isActive}
              className="px-3 py-2.5 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 data-[active=true]:bg-blue-50 dark:data-[active=true]:bg-blue-900/20 data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-400"
            >
              <a
                href={item.url}
                onClick={item.onClick}
                className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                <item.icon
                  className="!w-[18px] !h-[18px]"
                  strokeWidth={2.0}
                />
                <span className="font-normal group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
