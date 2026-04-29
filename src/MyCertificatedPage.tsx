import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  duration: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  icon: string;
  gradient: string;
  category: "Technical" | "Leadership" | "Business";
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "React Professional Certificate",
    subtitle: "เรียนรู้ React พื้นฐานและขั้นสูง",
    issuer: "Udemy",
    duration: "2-3 ชั่วโมง",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    category: "Technical",
    icon: "⚛️",
    gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  },
  {
    id: "2",
    title: "Full-Stack Developer Certification",
    subtitle: "สร้างเว็บไซต์แบบ Full-Stack อย่างเชี่ยวชาญ",
    issuer: "Coursera",
    duration: "2-3 ชั่วโมง",
    issueDate: "2023-11-20",
    expiryDate: "2024-11-20",
    category: "Technical",
    icon: "💻",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "3",
    title: "Leadership Excellence Program",
    subtitle: "พัฒนาทักษะการนำและจัดการคน",
    issuer: "LinkedIn Learning",
    duration: "2-3 ชั่วโมง",
    issueDate: "2024-03-10",
    category: "Leadership",
    icon: "👔",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "4",
    title: "Project Management Professional",
    subtitle: "การจัดการโครงการอย่างมีประสิทธิภาพ",
    issuer: "PMI",
    duration: "2-3 ชั่วโมง",
    issueDate: "2023-06-05",
    expiryDate: "2026-06-05",
    category: "Business",
    icon: "📊",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "5",
    title: "Advanced TypeScript",
    subtitle: "เรียนรู้ TypeScript ขั้นสูงสำหรับโปรแกรมเมอร์",
    issuer: "egghead",
    duration: "2-3 ชั่วโมง",
    issueDate: "2024-02-28",
    category: "Technical",
    icon: "📘",
    gradient: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
  },
  {
    id: "6",
    title: "Data Analytics Fundamentals",
    subtitle: "ทำความเข้าใจการวิเคราะห์ข้อมูล",
    issuer: "Google",
    duration: "2-3 ชั่วโมง",
    issueDate: "2023-09-12",
    category: "Technical",
    icon: "📈",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export default function MyCertificatedPage() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Technical" | "Leadership" | "Business">("All");

  const handleGoBack = () => {
    window.history.back();
  };

  const filteredCertificates = selectedCategory === "All" 
    ? mockCertificates 
    : mockCertificates.filter(cert => cert.category === selectedCategory);

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  My Certificated
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your professional achievements
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#FC4C02]" style={{ fontFamily: '"Geometrica", sans-serif' }}>
                {filteredCertificates.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedCategory === "All" ? "Total" : selectedCategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {(["All", "Technical", "Leadership", "Business"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 active:scale-95 ${
                selectedCategory === category
                  ? "bg-[#FC4C02] text-white shadow-lg shadow-[#FC4C02]/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#FC4C02] dark:hover:border-[#FC4C02]"
              }`}
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => {
            const expired = isExpired(cert.expiryDate);

            return (
              <div
                key={cert.id}
                className="group relative bg-white dark:bg-neutral-950 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-white/10"
              >
                {/* Certificate Header with Gradient */}
                <div
                  className="relative h-48 flex flex-col justify-between p-6 text-white overflow-hidden"
                  style={{
                    background: cert.gradient,
                  }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="lines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="4" stroke="white" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#lines)" />
                    </svg>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md ${
                      expired
                        ? "bg-red-500/20 text-red-100"
                        : "bg-emerald-500/20 text-emerald-100"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${expired ? "bg-red-400" : "bg-emerald-400"}`} />
                      <span className="text-xs font-semibold">
                        {expired ? "Expired" : "Active"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <div className="text-4xl">{cert.icon}</div>
                    <div>
                      <h3 
                        className="text-lg font-bold line-clamp-2"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10 flex items-center gap-2 text-sm opacity-90 mt-auto">
                    <Clock className="w-4 h-4" />
                    <span>{cert.duration}</span>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="p-6 bg-white dark:bg-neutral-950">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {cert.subtitle}
                  </p>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 rounded-full bg-[#FC4C02]" />
                      <span className="text-gray-600 dark:text-gray-400">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 rounded-full bg-[#FC4C02]" />
                      <span className="text-gray-600 dark:text-gray-400">{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 px-4 bg-linear-to-r from-[#FC4C02] to-[#FF6B35] hover:from-[#E63E00] hover:to-[#FF5520] text-white rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-[#FC4C02]/20 hover:shadow-xl hover:shadow-[#FC4C02]/40"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    ดูใบรับรอง
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              No certificates yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start your learning journey to earn certificates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
