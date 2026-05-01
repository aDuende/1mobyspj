"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Search, Star, X } from "lucide-react";

interface Announcement {
  id: number;
  topic: string;
  details: string;
  department: string;
  role: string;
  date: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    topic: "Increase Salary",
    details: "Request for salary adjustment based on performance evaluation...",
    department: "Tech",
    role: "Engineer",
    date: "Feb 25",
  },
  {
    id: 2,
    topic: "New Policy Update",
    details: "Please be informed that certain policies have been updated...",
    department: "BU",
    role: "Team Lead",
    date: "Feb 22",
  },
  {
    id: 3,
    topic: "System Maintenance",
    details: "The system will undergo scheduled maintenance...",
    department: "HR",
    role: "Engineer",
    date: "Feb 12",
  },
  {
    id: 4,
    topic: "New Feature Launch",
    details: "We are excited to introduce new features...",
    department: "Tech",
    role: "Director",
    date: "Jan 29",
  },
  {
    id: 5,
    topic: "Upcoming Event",
    details: "We are pleased to announce an upcoming event...",
    department: "Tech",
    role: "Team Lead",
    date: "Jan 24",
  },
];

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const [form, setForm] = useState({
    topic: "",
    details: "",
    department: "Tech",
    role: "Engineer",
  });

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesSearch =
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = !selectedRole || item.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    const newItem: Announcement = {
      id: Date.now(),
      topic: form.topic,
      details: form.details,
      department: form.department,
      role: form.role,
      date,
    };

    setAnnouncements([newItem, ...announcements]);
    setForm({
      topic: "",
      details: "",
      department: "Tech",
      role: "Engineer",
    });
    setShowCompose(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-foreground dark:bg-gray-900">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Announcements</h1>
            <p className="text-left text-sm text-muted-foreground">
              Company updates and messages
            </p>
          </div>

          <Button
            onClick={() => setShowCompose(true)}
            className="gap-2 rounded-full bg-[#006BFF] px-5 text-white hover:bg-[#0057d9] dark:bg-[#006BFF] dark:text-white dark:hover:bg-[#0057d9]"
          >
            <PenLine size={16} />
            Compose
          </Button>
        </div>

        <div className="rounded-2xl bg-white shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="relative w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full border-0 bg-gray-100 pl-10 dark:bg-gray-700"
              />
            </div>

            <select
              className="rounded-full bg-gray-100 px-4 py-2 text-foreground outline-none dark:bg-gray-700"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All roles</option>
              <option value="Engineer">Engineer</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Director">Director</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <input type="checkbox" className="h-4 w-4" />

                <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="w-48 truncate font-medium">{item.topic}</p>
                    <p className="truncate text-muted-foreground">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.department} • {item.role}
                  </div>
                </div>

                <span className="text-sm text-muted-foreground">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handlePublish}
            className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl dark:bg-gray-800"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">New Announcement</h2>
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Topic"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                required
              />

              <textarea
                placeholder="Write announcement details..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                required
                className="min-h-32 w-full resize-none rounded-xl bg-gray-100 p-3 text-sm outline-none dark:bg-gray-700"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-gray-700"
                >
                  <option value="Tech">Tech</option>
                  <option value="HR">HR</option>
                  <option value="BU">BU</option>
                </select>

                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="rounded-xl bg-gray-100 px-3 py-2 text-sm outline-none dark:bg-gray-700"
                >
                  <option value="Engineer">Engineer</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Director">Director</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowCompose(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#006BFF] text-white hover:bg-[#0057d9]"
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
