import React, { useState } from "react";
import { Bell, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  date: string;
  time: string;
  icon: string;
  image?: string;
  type: "pending" | "completed";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "คุณได้สอบเสร็จ Introduction to Quantum Computing",
    date: "16 มีนายน 2568",
    time: "19:22:38 น.",
    icon: "📚",
    image: "🔬",
    type: "pending",
  },
  {
    id: "2",
    title: "คุณได้สอบเสร็จ GitHub for Developer",
    date: "21 พฤษภาคม 2568",
    time: "20:28:07 น.",
    icon: "💻",
    image: "🐙",
    type: "pending",
  },
];

const mockCompletions: Notification[] = [
  {
    id: "3",
    title: "เสร็จสิ้นการฝึกอบรม TypeScript Basics",
    date: "15 มีนายน 2568",
    time: "14:30:00 น.",
    icon: "✅",
    type: "completed",
  },
  {
    id: "4",
    title: "ได้รับใบรับรอง React Professional",
    date: "10 มีนายน 2568",
    time: "10:15:00 น.",
    icon: "🎓",
    type: "completed",
  },
];

const AlertSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"notifications" | "completions">("notifications");

  const notifications = activeTab === "notifications" ? mockNotifications : mockCompletions;
  const unreadCount = mockNotifications.length;

  return (
    <>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center justify-center w-11 h-11 rounded-full 
          transition-all duration-300 active:scale-[0.96] cursor-pointer border-transparent group
          ${isOpen
            ? "bg-white dark:bg-neutral-900 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
            : "bg-transparent hover:bg-white dark:hover:bg-neutral-900"
          }
          text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white 
          hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]
        `}
        title="Notifications"
      >
        <div className={`relative ${isOpen ? "" : ""}`}>
          <Bell className="w-5 h-5 transition-colors duration-300 group-hover:text-amber-500" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-neutral-900" />
          )}
        </div>
      </button>

      {/* Notification Sidebar - Slide in from right */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed right-0 top-0 h-screen w-96 bg-gray-900 dark:bg-black border-l border-gray-800 dark:border-gray-700 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3
                className="text-lg font-semibold text-white"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-800 px-4 pt-4">
              <button
                onClick={() => setActiveTab("notifications")}
                className="relative pb-3 px-2 font-medium text-sm transition-colors"
              >
                <span
                  className={`flex items-center gap-2 ${
                    activeTab === "notifications"
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-400"
                  }`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  การแจ้งเตือน{" "}
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </span>
                {activeTab === "notifications" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("completions")}
                className="relative pb-3 px-2 font-medium text-sm transition-colors"
              >
                <span
                  className={`flex items-center gap-2 ${
                    activeTab === "completions"
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-400"
                  }`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  ประมาณ{" "}
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full">
                    5
                  </span>
                </span>
                {activeTab === "completions" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-800">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-800/50 transition-colors cursor-pointer group border-l-4 border-yellow-400"
                    >
                      <div className="flex gap-3">
                        {/* Image/Icon */}
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center shrink-0 text-lg">
                          {notif.image || notif.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold text-white line-clamp-2"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {notif.title}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {notif.date}
                            </span>
                            <span className="text-xs text-gray-600">
                              {notif.time}
                            </span>
                          </div>
                        </div>

                        {/* Status Dot */}
                        {notif.type === "pending" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 text-sm">
                    {activeTab === "notifications" ? "ไม่มีแจ้งเตือน" : "ไม่มีรายการประมาณ"}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Message */}
            {notifications.length === 0 && (
              <div className="border-t border-gray-800 p-4 text-center">
                <p className="text-gray-500 text-xs">
                  แจ้งเตือนที่อ่านแล้ว
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AlertSelector;
