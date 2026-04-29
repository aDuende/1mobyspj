import { useState } from "react";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";

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
  notificationType?: "pending" | "expiring" | "expired"; // notification type
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
    notificationType: "expiring",
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
    notificationType: "expired",
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
    notificationType: "pending",
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

  // Get all certificates
  const allCount = mockCertificates.length;

  const filteredCertificates = mockCertificates.filter(cert => 
    selectedCategory === "All" || cert.category === selectedCategory
  );

  const getNotificationBadgeColor = (type?: string) => {
    switch(type) {
      case "expired":
        return "bg-red-500/20 text-red-100 border border-red-500/30";
      case "expiring":
        return "bg-yellow-500/20 text-yellow-100 border border-yellow-500/30";
      case "pending":
        return "bg-blue-500/20 text-blue-100 border border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-100 border border-gray-500/30";
    }
  };

  // const getNotificationBadgeText = (type?: string) => {
  //   switch(type) {
  //     case "expired":
  //       return "หมดอายุแล้ว";
  //     case "expiring":
  //       return "ใกล้หมดอายุ";
  //     case "pending":
  //       return "รออยู่";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
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
              </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => {
            return (
              <div
                key={cert.id}
                className="group relative bg-gray-900 dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-800 dark:border-gray-700"
              >
                {/* Certificate Header with Gradient - Takes up 40% */}
                <div
                  className="relative h-64 flex flex-col justify-between p-8 text-white overflow-hidden"
                  style={{
                    background: cert.gradient,
                  }}
                >
                  {/* Background pattern - Vertical lines */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <pattern id={`lines-${cert.id}`} x="0" y="0" width="4" height="100" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="0" x2="0" y2="100" stroke="white" strokeWidth="1.2" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill={`url(#lines-${cert.id})`} />
                    </svg>
                  </div>

                  {/* Title and Subtitle at the bottom of header */}
                  <div className="relative z-10 mt-auto">
                    <h3 
                      className="text-3xl font-bold text-white mb-2"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-90">
                      {cert.subtitle}
                    </p>
                  </div>
                </div>

                {/* Certificate Body - Dark section */}
                <div className="bg-gray-900 dark:bg-gray-900 px-8 pt-6 pb-8 flex flex-col gap-4">
                  {/* Duration/Meta Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800">
                      <Clock className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">{cert.duration}</span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-linear-to-r from-gray-700 to-transparent"></div>

                  {/* Action Button */}
                  <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    ดูเกียรติบัตร
                  </button>
                </div>
              </div>
              );
            })}
          </div>

        {/* Empty State for Grid */}
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
