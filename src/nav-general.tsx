"use client";

import { type LucideIcon } from "lucide-react";
import { useSidebar } from "./hooks/use-sidebar";
import { cn } from "./lib/utils";

import {
  SidebarGroup,
  SidebarMenu,
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
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup className="p-0 px-1">
      <SidebarMenu className={isCollapsed ? "gap-2 items-stretch" : "gap-1"}>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="relative list-none w-full"
          >
            <div
              className={cn(
                "absolute left-[-5px] top-1/2 -translate-y-1/2 w-[5px] bg-[var(--moby-blue)] rounded-r-full z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                item.isActive ? "h-10 opacity-100" : "h-0 opacity-0",
              )}
            />

            <a
              href={item.url}
              onClick={item.onClick}
              className={
                isCollapsed
                  ? /* Collapsed */
                    `group/item flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-2xl w-full transition-all duration-200 cursor-pointer ${
                      item.isActive
                        ? "text-[var(--moby-blue)]"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`
                  : /* Expanded */
                    `group/item flex items-center gap-2 px-2 py-2 rounded-xl w-full transition-all duration-200 cursor-pointer ${
                      item.isActive
                        ? "bg-transparent text-[var(--moby-blue)] hover:bg-gray-100/60 dark:hover:bg-gray-700/60"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                    }`
              }
              style={{
                fontFamily: '"Geometrica", sans-serif',
                textDecoration: "none",
              }}
            >
              {isCollapsed ? (
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                    item.isActive ? "bg-transparent" : "bg-transparent"
                  }`}
                >
                  <item.icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      item.isActive
                        ? "text-[var(--moby-blue)]"
                        : "text-gray-500 group-hover/item:text-gray-900 dark:group-hover/item:text-white"
                    }`}
                    strokeWidth={item.isActive ? 2.2 : 1.6}
                  />
                </div>
              ) : (
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <item.icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      item.isActive
                        ? "text-[var(--moby-blue)]"
                        : "text-gray-500 group-hover/item:text-gray-900 dark:group-hover/item:text-white"
                    }`}
                    strokeWidth={item.isActive ? 2.2 : 1.6}
                  />
                </div>
              )}

              {/* Label */}
              <span
                className={
                  isCollapsed
                    ? `text-[11px] leading-tight text-center transition-colors duration-200 ${item.isActive ? "font-normal text-[var(--moby-blue)]" : "font-normal text-gray-500 group-hover/item:text-gray-900"}`
                    : `text-[14px] transition-colors duration-200 ${item.isActive ? "font-normal text-[var(--moby-blue)]" : "font-normal text-gray-700 group-hover/item:text-gray-900"}`
                }
              >
                {item.title}
              </span>
            </a>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
