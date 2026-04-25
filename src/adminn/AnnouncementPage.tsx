import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLine, Search } from "lucide-react";

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
    details:
      "Request for salary adjustment based on performance evaluation, increased...",
    department: "Tech",
    role: "Engineer",
    date: "Feb 25",
  },
  {
    id: 2,
    topic: "New Policy Update",
    details:
      "Please be informed that certain policies have been updated to ensure better...",
    department: "BU",
    role: "Team Lead",
    date: "Feb 22",
  },
  {
    id: 3,
    topic: "System Maintenance",
    details:
      "The system will undergo scheduled maintenance to improve performance...",
    department: "HR",
    role: "Engineer",
    date: "Feb 12",
  },
  {
    id: 4,
    topic: "New Feature Launch",
    details:
      "We are excited to introduce new features designed to enhance your experi...",
    department: "Tech",
    role: "Director",
    date: "Jan 29",
  },
  {
    id: 5,
    topic: "Upcoming Event",
    details: "We are pleased to announce an upcoming event for all members...",
    department: "Tech",
    role: "Team Lead",
    date: "Jan 24",
  },
  {
    id: 6,
    topic: "Security & Account Update Notice",
    details: "To enhance account security and protect member information...",
    department: "HR",
    role: "Engineer",
    date: "Jan 14",
  },
  {
    id: 7,
    topic: "Monthly Performance",
    details: "This announcement provides a summary of recent activities...",
    department: "Tech",
    role: "Engineer",
    date: "Jan 01",
  },
];

export default function AnnouncementPage() {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedAnnouncements, setSelectedAnnouncements] = useState<number[]>(
    [],
  );
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    topic: "",
    details: "",
    department: "",
    role: "",
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAnnouncements(announcements.map((a) => a.id));
    } else {
      setSelectedAnnouncements([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedAnnouncements([...selectedAnnouncements, id]);
    } else {
      setSelectedAnnouncements(
        selectedAnnouncements.filter((aid) => aid !== id),
      );
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Engineer":
        return "bg-blue-100 text-blue-700";
      case "Team Lead":
        return "bg-yellow-100 text-yellow-700";
      case "Director":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || announcement.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New announcement:", newAnnouncement);
    // Here you would typically send this to your backend API
    setShowComposeModal(false);
    setNewAnnouncement({ topic: "", details: "", department: "", role: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Compose and Filters */}
      <div className="flex justify-between items-center gap-4">
        {/* Compose Button */}
        <Button onClick={() => setShowComposeModal(true)} className="gap-2">
          <PenLine size={16} />
          Compose
        </Button>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Engineer">Engineer</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Director">Director</option>
          </select>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Compose New Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleComposeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic
                  </label>
                  <Input
                    value={newAnnouncement.topic}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        topic: e.target.value,
                      })
                    }
                    placeholder="Enter announcement topic"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Details
                  </label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={newAnnouncement.details}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        details: e.target.value,
                      })
                    }
                    placeholder="Enter announcement details"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Department
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newAnnouncement.department}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          department: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Tech">Tech</option>
                      <option value="HR">HR</option>
                      <option value="BU">BU</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target Role
                    </label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newAnnouncement.role}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          role: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Director">Director</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowComposeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Publish Announcement</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Announcements Table */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedAnnouncements.length === announcements.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="p-4 text-left font-semibold text-sm">TOPIC</th>
                <th className="p-4 text-left font-semibold text-sm">Details</th>
                <th className="p-4 text-left font-semibold text-sm">
                  DEPARTMENT
                </th>
                <th className="p-4 text-left font-semibold text-sm">ROLE</th>
                <th className="p-4 text-left font-semibold text-sm">DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.map((announcement) => (
                <tr key={announcement.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedAnnouncements.includes(announcement.id)}
                      onChange={(e) =>
                        handleSelectOne(announcement.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-4 font-medium">{announcement.topic}</td>
                  <td className="p-4 text-gray-600 max-w-md truncate">
                    {announcement.details}
                  </td>
                  <td className="p-4">{announcement.department}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        announcement.role,
                      )}`}
                    >
                      {announcement.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{announcement.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
