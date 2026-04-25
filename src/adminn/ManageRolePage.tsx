import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  avatar: string;
  competencyScore?: string;
}

const API_URL = "http://localhost:3000/api";

function ManageRolePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const unassignedRole = users.filter((u) => !u.role || u.role === "").length;
  const activeUsers = users.filter((u) => u.status === "active").length;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleResetPassword = async (userId: number) => {
    try {
      // You can implement password reset API later
      console.log("Reset password for user:", userId);
      alert("Password reset functionality will be implemented");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleRemoveUser = async (userId: number) => {
    if (!confirm("Are you sure you want to remove this user?")) return;

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error removing user:", error);
      alert("Error removing user");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === "Team Lead")
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
  };

  if (loading) {
    return (
      <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p
          className="text-gray-600 dark:text-gray-400"
          style={{ fontFamily: "Geometrica, sans-serif" }}
        >
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with All User and Stats Cards */}
        <div className="flex items-center justify-between gap-16">
          <div>
            <h2
              className="text-2xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              All User
            </h2>
            <p
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Manage All User
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4 flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex-1">
              <p
                className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Total Users
              </p>
              <p
                className="text-3xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                {totalUsers}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex-1">
              <p
                className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                UnAssignRole
              </p>
              <p
                className="text-3xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                {unassignedRole}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex-1">
              <p
                className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Active Users
              </p>
              <p
                className="text-3xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                {activeUsers}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    ROLE
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    DEPARTMENT
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    STATUS
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p
                            className="font-semibold text-gray-900 dark:text-white"
                            style={{ fontFamily: "Geometrica, sans-serif" }}
                          >
                            {user.name}
                          </p>
                          <p
                            className="text-sm text-gray-600 dark:text-gray-400"
                            style={{ fontFamily: "Geometrica, sans-serif" }}
                          >
                            {user.email}
                          </p>
                          {user.competencyScore && (
                            <p
                              className="text-xs text-gray-500 dark:text-gray-500 mt-1"
                              style={{ fontFamily: "Geometrica, sans-serif" }}
                            >
                              {user.competencyScore}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                        style={{ fontFamily: "Geometrica, sans-serif" }}
                      >
                        {user.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span
                          className={`font-medium ${user.status === "active" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          {user.status === "active" ? "Active" : "InActive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleResetPassword(user.id)}
                          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Reset Password
                        </button>
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1"
                          style={{ fontFamily: "Geometrica, sans-serif" }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRolePage;
