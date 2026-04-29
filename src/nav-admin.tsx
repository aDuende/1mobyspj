"use client";

import { useState } from "react";
import { type LucideIcon, ChevronDown, UserCog } from "lucide-react";
import { useSidebar } from "./hooks/use-sidebar";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "./components/ui/sidebar";
import { cn } from "./lib/utils";

export function NavAdmin({
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
  const [isOpen, setIsOpen] = useState(false);
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const hasActiveItem = items.some((item) => item.isActive);

  return (
    <SidebarGroup className="p-0 px-1 mt-4">
      <SidebarMenu className={isCollapsed ? "gap-2 items-stretch" : "gap-1"}>
        <SidebarMenuItem className="relative list-none w-full">
          {/* Main Dropdown Header */}
          <div
            onClick={() => {
              if (isCollapsed) {
                setOpen(true);
                setIsOpen(true);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            className={
              isCollapsed
                ? /* Collapsed */
                  `group relative flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-2xl w-full transition-all duration-200 cursor-pointer ${
                    hasActiveItem
                      ? "text-[var(--moby-blue)]"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`
                : /* Expanded */
                  `group flex items-center gap-2 px-2 py-2 rounded-xl w-full transition-all duration-200 cursor-pointer ${
                    isOpen || hasActiveItem
                      ? "bg-transparent text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                  }`
            }
            style={{ fontFamily: '"Geometrica", sans-serif' }}
          >
            <div
              className={cn(
                "absolute left-[-5px] -translate-y-1/2 w-[5px] rounded-r-full z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                hasActiveItem || (!isCollapsed && isOpen)
                  ? "h-10 opacity-100"
                  : "h-0 opacity-0",
                hasActiveItem && isCollapsed
                  ? "bg-[var(--moby-blue)]"
                  : "bg-gray-900 dark:bg-white",
              )}
              style={{ top: isCollapsed ? "36px" : "28px" }}
            />
            {isCollapsed ? (
              <>
                <div className="relative w-full flex items-center justify-center">
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-200 ${
                      hasActiveItem ? "bg-transparent" : "bg-transparent"
                    }`}
                  >
                    <UserCog
                      className={`w-[22px] h-[22px] transition-colors duration-200 ${
                        hasActiveItem
                          ? "text-[var(--moby-blue)]"
                          : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                      strokeWidth={hasActiveItem ? 2.2 : 1.8}
                    />
                  </div>
                  <ChevronDown
                    className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-all duration-200",
                      hasActiveItem
                        ? "text-[var(--moby-blue)]"
                        : "text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                      isOpen && "rotate-180",
                    )}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <UserCog
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      isOpen || hasActiveItem
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}
                    strokeWidth={isOpen || hasActiveItem ? 2.2 : 1.8}
                  />
                </div>
                <span className={`text-[14px] flex-1 text-left font-normal`}>
                  Admin
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[var(--moby-gray-1)] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isOpen && "rotate-180",
                  )}
                />
              </>
            )}

            {isCollapsed && (
              <span
                className={`text-[11px] leading-tight text-center ${isOpen || hasActiveItem ? "font-semibold" : "font-normal"}`}
              >
                Admin
              </span>
            )}
          </div>

          {/* Sub Items - Expanded mode */}
          {!isCollapsed && (
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 mt-1 ml-0 pb-2 mx-[-5px] px-[5px]">
                  {items.map((item) => (
                    <div key={item.title} className="relative w-full group">
                      <div
                        className={cn(
                          "absolute left-[-5px] top-1/2 -translate-y-1/2 w-[5px] bg-[var(--moby-blue)] rounded-r-full z-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                          item.isActive ? "h-10 opacity-100" : "h-0 opacity-0",
                        )}
                      />
                      <a
                        href={item.url}
                        onClick={item.onClick}
                        className={cn(
                          "flex items-center py-2 px-2 rounded-xl transition-all duration-200 cursor-pointer text-[14px]",
                          item.isActive
                            ? "bg-transparent text-[var(--moby-blue)] font-normal hover:bg-gray-100/60 dark:hover:bg-gray-700/60"
                            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100/60 dark:hover:bg-gray-700/60",
                        )}
                        style={{
                          fontFamily: '"Geometrica", sans-serif',
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{ marginLeft: "52px" }}
                          className="text-left w-full"
                        >
                          {item.title}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
