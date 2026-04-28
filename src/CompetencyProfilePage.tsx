import {
  TrendingUp, CheckCircle2, AlertCircle, Award,
  AlertTriangle, Sparkles, Target, BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceDot,
} from "recharts";

// ── Animated Number ───────────────────────────────────────────
const AnimatedNumber = ({
  value, decimals = 0, prefix = "", suffix = "",
}: {
  value: number; decimals?: number; prefix?: string; suffix?: string;
}) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display, end = value;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]); // eslint-disable-line
  return <>{prefix}{display.toFixed(decimals)}{suffix}</>;
};

// ── Page ──────────────────────────────────────────────────────
export default function CompetencyProfilePage() {
  const [isMounted, setIsMounted]           = useState(false);
  const [coreType, setCoreType]             = useState<"Core" | "Functional">("Core");
  const [showCoreDropdown, setShowCoreDropdown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ── Static data ──
  const competencyData = [
    { subject: "Adaptive",      actual: 85, expected: 75 },
    { subject: "Technical",     actual: 70, expected: 80 },
    { subject: "Collaboration", actual: 90, expected: 85 },
    { subject: "Ownership",     actual: 75, expected: 85 },
    { subject: "Solving",       actual: 80, expected: 70 },
    { subject: "Impact",        actual: 85, expected: 80 },
  ];

  const growthData = [
    { month: "Jan", score: 2.5 },
    { month: "Feb", score: 2.8 },
    { month: "Mar", score: 3.0 },
    { month: "Apr", score: 3.2 },
    { month: "Jun", score: 3.5 },
  ];

  const topStrengths   = ["Strategic Leadership Workshop", "Team Communication", "Mentoring Junior Devs"];
  const areasToImprove = ["Project Management", "Conflict Resolution", "Data Analysis"];

  // ── Definition lists ──
  const coreDefinitions = [
    { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
    { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
    { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
    { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
  ];

  const functionalDefinitions = [
    { title: "FC01 · Data Analysis",            description: "วิเคราะห์ข้อมูลเพื่อสกัด insight และสนับสนุนการตัดสินใจทางธุรกิจได้อย่างมีประสิทธิภาพ" },
    { title: "FC02 · Stakeholder Communication", description: "สื่อสารได้ชัดเจนและมีประสิทธิผลกับทุกระดับของ stakeholder ทั้งภายในและภายนอกองค์กร" },
    { title: "FC03 · Strategic Thinking",        description: "เชื่อมโยงงานประจำวันเข้ากับเป้าหมายระยะยาวขององค์กร มองภาพรวมและวางแผนเชิงกลยุทธ์" },
    { title: "FC04 · Project Execution",         description: "ส่งมอบโปรเจกต์ตรงเวลา ตรงขอบเขต และได้มาตรฐานคุณภาพที่กำหนด" },
    { title: "FC05 · Process Improvement",       description: "ระบุและนำการปรับปรุง workflow ที่มีความหมายมาใช้งาน เพื่อเพิ่มประสิทธิภาพของทีม" },
  ];

  // ✅ Single source of truth — switches on coreType
  const activeDefinitions = coreType === "Core" ? coreDefinitions : functionalDefinitions;

  // ── Animation helpers ──
  const fadeUp    = (ms: number) => ({ opacity: isMounted ? 1 : 0, transform: isMounted ? "translateY(0)" : "translateY(20px)",  transition: `opacity .6s ease-out ${ms}ms, transform .6s ease-out ${ms}ms` });
  const fadeRight = (ms: number) => ({ opacity: isMounted ? 1 : 0, transform: isMounted ? "translateX(0)" : "translateX(20px)",  transition: `opacity .6s ease-out ${ms}ms, transform .6s ease-out ${ms}ms` });
  const fadeLeft  = (ms: number) => ({ opacity: isMounted ? 1 : 0, transform: isMounted ? "translateX(0)" : "translateX(-20px)", transition: `opacity .6s ease-out ${ms}ms, transform .6s ease-out ${ms}ms` });

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">

        {/* Top Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Competency Score",    icon: <TrendingUp className="h-5 w-5 text-white" />,  grad: "from-blue-500 to-blue-600",     value: 3.2,  dec: 1, sub: <><Sparkles className="h-3 w-3 animate-pulse" /> Excellent Progress</>, delay: 0   },
            { label: "Active IDPs",         icon: <Target     className="h-5 w-5 text-white" />,  grad: "from-amber-500 to-orange-500",  value: 1,    dec: 0, sub: "2 Due Next Week",                                                      delay: 100 },
            { label: "Pending Assessments", icon: <AlertCircle className="h-5 w-5 text-white" />, grad: "from-rose-500 to-pink-500",     value: 1,    dec: 0, sub: "Due in 5 days",                                                        delay: 200 },
            { label: "Learning Hours",      icon: <BookOpen   className="h-5 w-5 text-white" />,  grad: "from-emerald-500 to-teal-500",  value: 12.5, dec: 1, sub: "+2.5 This Week",                                                       delay: 300 },
          ].map((c) => (
            <Card key={c.label} className={`relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group bg-gradient-to-br ${c.grad}`} style={fadeUp(c.delay)}>
              <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-white/90">{c.label}</CardTitle>
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">{c.icon}</div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-white mb-1">
                  <AnimatedNumber value={isMounted ? c.value : 0} decimals={c.dec} />
                </div>
                <p className="text-sm text-white/80 font-medium flex items-center gap-1">{c.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">

          {/* ── Left col ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Profile */}
            <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" style={fadeUp(400)}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <CardContent className="pt-4 pb-4 px-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-500" />
                    <Avatar className="h-14 w-14 rounded-lg relative ring-2 ring-white dark:ring-gray-800 group-hover:scale-105 transition-transform duration-500">
                      <AvatarImage src="/placeholder-profile.jpg" alt="Tarin.Chon" className="rounded-lg" />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold rounded-lg">TC</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Tarin.Chon (EN 2)</h2>
                      <Award className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-xs font-semibold shadow-md">Level 2</span>
                      <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Full Stack Dev</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">85%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000" style={{ width: isMounted ? "85%" : "0%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 shrink-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">120</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">85%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths + Areas */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Top Strengths */}
              <Card className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-none shadow-sm h-full text-left" style={fadeLeft(500)}>
                <div className="flex flex-col gap-4 items-start">
                  <section className="w-full text-left">
                    <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight flex items-center gap-2"
                style={{ fontFamily: '"Geometrica", sans-serif' }}>
                      <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      Top Strengths
                    </h3>
                    <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                      {topStrengths.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 text-left"
                          style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease-out ${0.6 + i * 0.1}s` }}
                        >
                          <div className="w-[18px] h-[18px] rounded-full bg-[#32bea6] flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium text-left leading-tight" style={{ fontFamily: '"Geometrica", sans-serif' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </Card>

              {/* Areas to Improve */}
              <Card className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-none shadow-sm h-full text-left" style={fadeRight(500)}>
                <div className="flex flex-col gap-4 items-start">
                  <section className="w-full text-left">
                    <h3 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white mb-2.5 text-left leading-tight flex items-center gap-2"
                style={{ fontFamily: '"Geometrica", sans-serif' }}>
                      <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                      </div>
                      Areas to Improve
                    </h3>
                    <div className="w-full rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer p-3 space-y-2.5">
                      {areasToImprove.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 text-left"
                          style={{ opacity: isMounted ? 1 : 0, transition: `opacity .4s ease-out ${0.6 + i * 0.1}s` }}
                        >
                          <div className="w-[18px] h-[18px] rounded-full bg-[#f4c300] flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="10.7" y="5" width="2.6" height="9" rx="1.3" />
                              <circle cx="12" cy="17" r="1.4" />
                            </svg>
                          </div>
                          <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium text-left leading-tight" style={{ fontFamily: '"Geometrica", sans-serif' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </Card>

            </div>

            {/* Radar */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-800 relative overflow-hidden" style={fadeUp(700)}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-blue-400/10 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center"><Target className="h-4 w-4 text-white" /></div>
                  Competency Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={competencyData}>
                      <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                      <Radar name="Actual"   dataKey="actual"   stroke="#FC4C02" fill="#FC4C02" fillOpacity={0.4}  strokeWidth={3} dot={{ fill: "#FC4C02", r: 5, strokeWidth: 2, stroke: "#fff" }} />
                      <Radar name="Expected" dataKey="expected" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }} />
                      <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right col ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Core Definition card */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-800" style={fadeRight(600)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  {coreType} Definition
                </CardTitle>

                {/* Dropdown */}
                <div className="relative">
                  <button
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                    onClick={() => setShowCoreDropdown((v) => !v)}
                  >
                    {coreType} ▾
                  </button>
                  {showCoreDropdown && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10">
                      {(["Core", "Functional"] as const).map((opt) => (
                        <button
                          key={opt}
                          className={`w-full text-left px-4 py-2 text-sm first:rounded-t-xl last:rounded-b-xl transition-colors
                            hover:bg-purple-50 dark:hover:bg-purple-900/30
                            ${coreType === opt
                              ? "font-bold text-purple-600 dark:text-purple-300"
                              : "text-gray-700 dark:text-gray-300"
                            }`}
                          onClick={() => {
                            setCoreType(opt);
                            setShowCoreDropdown(false);
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* ✅ Renders Core (4 items) or Functional (FC01–FC05) based on coreType */}
              <CardContent className="space-y-4">
                {activeDefinitions.map((def, i) => (
                  <div
                    key={`${coreType}-${i}`}   // forces re-animation when tab switches
                    className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 py-2 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 rounded-r-lg hover:from-purple-100/50 dark:hover:from-purple-900/20 transition-all duration-300 hover:translate-x-1 group"
                    style={{ opacity: 1, animation: `fadeSlideIn .35s ease-out ${i * 0.07}s both` }}
                  >
                    <h3 className="font-semibold text-sm mb-1.5 text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      {def.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {def.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Growth Timeline */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-800 relative overflow-hidden" style={fadeRight(800)}>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"><TrendingUp className="h-4 w-4 text-white" /></div>
                  Growth Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                        </linearGradient>
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
                        </filter>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis domain={[2.5, 4.0]} ticks={[2.5, 3.0, 3.2, 3.5, 4.0]} tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                      <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)", padding: "8px 12px" }} cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }} />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 5, strokeWidth: 2, stroke: "#fff", filter: "url(#shadow)" }} activeDot={{ r: 8, strokeWidth: 3, stroke: "#fff" }} fill="url(#colorScore)" />
                      {[{ x: "Mar", y: 3.0, b: "0s" }, { x: "Apr", y: 3.2, b: "0.5s" }, { x: "Jun", y: 3.5, b: "1s" }].map((r) => (
                        <ReferenceDot key={r.x} x={r.x} y={r.y} r={10} fill="#fbbf24" stroke="#fff" strokeWidth={3} filter="url(#shadow)">
                          <animate attributeName="r" values="8;12;8" dur="2s" begin={r.b} repeatCount="indefinite" />
                        </ReferenceDot>
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Keyframe for definition items re-animating on tab switch */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0);   }
        }
      `}</style>
    </div>
  );
}