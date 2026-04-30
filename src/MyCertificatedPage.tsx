import { useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const certificates = [
  {
    id: "cert-1",
    title: "Design Thinking",
    issuer: "1Moby Learning Academy",
    category: "Core",
    issuedDate: "24 Oct 2025",
    credentialId: "MOBY-DT-2025-001",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-[#006BFF] via-[#4F8DFF] to-[#9CCBFF]",
  },
  {
    id: "cert-2",
    title: "Full-Stack Developer",
    issuer: "1Moby Learning Academy",
    category: "Functional",
    issuedDate: "12 Sep 2025",
    credentialId: "MOBY-FS-2025-014",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-[#FC4C02] via-[#FF7A1A] to-[#FFA400]",
  },
  {
    id: "cert-3",
    title: "JWT Authentication",
    issuer: "1Moby Learning Academy",
    category: "Backend",
    issuedDate: "30 Aug 2025",
    credentialId: "MOBY-JWT-2025-032",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
  },
];

export default function MyCertificatedPage() {
  const [search, setSearch] = useState("");

  const filteredCertificates = certificates.filter((cert) =>
    cert.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-transparent">
      <div className="mx-auto max-w-6xl p-6">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-[28px] bg-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] dark:bg-gray-800">
          <div className="relative min-h-[220px] p-6 md:p-8">
            <div className="absolute inset-0 bg-linear-to-br from-[#006BFF]/10 via-transparent to-[#FC4C02]/10" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#006BFF]/10 px-3 py-1 text-[11px] font-semibold text-[#006BFF]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Achievement Center
                </div>

                <h1
                  className="text-[30px] font-semibold text-gray-900 dark:text-white"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  My Certificated
                </h1>

                <p
                  className="mt-2 max-w-xl text-[13px] leading-6 text-gray-500 dark:text-gray-400"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  View your completed learning certificates, verify credential IDs,
                  and download official achievement documents.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total", value: certificates.length },
                  { label: "Verified", value: certificates.length },
                  { label: "Completed", value: certificates.length },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/80 p-4 text-center shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] backdrop-blur dark:bg-gray-900/50"
                  >
                    <div className="text-[24px] font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-[18px] font-medium text-gray-900 dark:text-white">
            Certificates
          </h2>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certificate"
              className="h-10 w-[240px] rounded-full border border-gray-200 bg-white pl-9 pr-4 text-[12px] text-gray-700 outline-none transition focus:border-[#006BFF] focus:ring-2 focus:ring-[#006BFF]/10 dark:border-white/10 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="group overflow-hidden rounded-[26px] bg-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className={`absolute inset-0 bg-linear-to-br ${cert.gradient} opacity-75`} />

                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
                  <Award className="h-5 w-5" />
                </div>

                <div className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {cert.category}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="line-clamp-1 text-[19px] font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/80">
                    Issued by {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      Status
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Completed
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      Verification
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-800 dark:text-gray-200">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#006BFF]" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      Issued Date
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-800 dark:text-gray-200">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {cert.issuedDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      Credential ID
                    </span>

                    <div className="mt-1 rounded-xl bg-gray-50 px-3 py-2 text-[12px] font-medium text-gray-700 dark:bg-gray-900/50 dark:text-gray-300">
                      {cert.credentialId}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#006BFF] px-3 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#0058d6]">
                    <Download className="h-4 w-4" />
                    Download
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}