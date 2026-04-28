import { useRef, useState } from "react";
import defaultBanner from "./assets/8-bit-pixel-forest-landscape-and-mountains-palms-vector.jpg";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Black Banner */}
      <div
        className="w-full h-52 relative z-0"
        style={{
          backgroundImage: bannerImage
            ? `url(${bannerImage})`
            : `url(${defaultBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Edit Icon Button */}
        <div className="absolute top-6 right-8">
          <button
            onClick={handleEditClick}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-8 -mt-10 relative z-10">
        {/* Hidden Avatar File Input */}
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />

        {/* Profile Header */}
        <div className="flex items-start justify-between mb-8">
          {/* Left Side - Avatar and Info */}
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              onClick={handleAvatarClick}
              className="relative w-32 h-32 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shrink-0 group cursor-pointer overflow-hidden"
              style={{
                backgroundImage: avatarImage ? `url(${avatarImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!avatarImage && (
                <span className="text-4xl font-bold text-gray-900 group-hover:opacity-50 transition-opacity">
                  TC
                </span>
              )}
              {/* Hover Overlay with Pencil Icon */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>

            {/* Name and Role */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-0">
                <h1 className="text-m font-bold text-gray-900 text-left">
                  Tarin Chongprajert
                </h1>
                <div className="flex items-center gap-1.5 px-2 py-1  text-gray-600 text-sm rounded">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>24/0/2026</span>
                </div>
              </div>
              <p className="text-m text-left text-gray-600">
                Fullstack Developer
              </p>
            </div>
          </div>

          {/* Right Side - Active Badge */}
          <div className="mt-16">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Blue Line Separator */}
        <div className="h-1 rounded bg-blue-500 mb-8"></div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Professional Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-left">
                Passionate Fullstack Developer with expertise in building
                scalable web applications. Focused on creating efficient,
                user-friendly solutions using modern technologies. Strong
                believer in continuous learning and collaborative
                problem-solving.
              </p>
            </div>

            {/* Skills & Competencies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">
                Skills & Competencies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "React", level: 90 },
                  { name: "TypeScript", level: 85 },
                  { name: "Node.js", level: 80 },
                  { name: "Python", level: 75 },
                  { name: "SQL", level: 70 },
                  { name: "AWS", level: 65 },
                ].map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">
                Recent Projects
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "E-Commerce Platform",
                    description:
                      "Built a full-stack e-commerce solution with real-time inventory management",
                    tech: ["React", "Node.js", "MongoDB"],
                    status: "Completed",
                  },
                  {
                    title: "Analytics Dashboard",
                    description:
                      "Developed interactive data visualization dashboard for business metrics",
                    tech: ["TypeScript", "D3.js", "PostgreSQL"],
                    status: "In Progress",
                  },
                  {
                    title: "Mobile API Gateway",
                    description:
                      "Designed and implemented RESTful API gateway for mobile applications",
                    tech: ["Python", "FastAPI", "Redis"],
                    status: "Completed",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Badges */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-left">
                Certifications & Badges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "AWS Certified Developer",
                    issuer: "Amazon Web Services",
                    date: "Mar 2026",
                    icon: "☁️",
                  },
                  {
                    title: "React Professional Certificate",
                    issuer: "Meta",
                    date: "Jan 2026",
                    icon: "⚛️",
                  },
                  {
                    title: "TypeScript Expert",
                    issuer: "Microsoft",
                    date: "Dec 2025",
                    icon: "📘",
                  },
                  {
                    title: "Agile Scrum Master",
                    issuer: "Scrum Alliance",
                    date: "Nov 2025",
                    icon: "🎯",
                  },
                ].map((cert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3">
                    <div className="text-3xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  April 2026
                </h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-2">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Dates */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for alignment */}
                  <div></div>
                  <div></div>

                  {/* Dates */}
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                  ].map((date) => (
                    <div key={date} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                          date === 24
                            ? "bg-blue-600 text-white font-bold"
                            : date < 24
                              ? "text-gray-400"
                              : "text-gray-900 hover:bg-gray-100 cursor-pointer"
                        }`}
                      >
                        {date}
                      </div>
                      {/* Dots for special dates */}
                      {date === 26 && (
                        <div className="w-1 h-1 rounded-full bg-purple-500 mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
