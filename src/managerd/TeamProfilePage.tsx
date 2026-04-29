import { useState, useEffect, useRef } from "react";
import {
  TrendingUp, AlertCircle, BookOpen, CheckCircle2, AlertTriangle,
  Sparkles, Target, ChevronDown, Check, ArrowLeft, Clock, Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceDot,
} from "recharts";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "../components/ui/chart";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  gradeCode: string;   // e.g. "EN 2"
  position: string;
  level: number;
  avatarColor: string;
  initials: string;
  competencyScore: number;
  weeklyGain: number;
  learningHours: number;
  activeIDPs: number;
  pendingAssessments: number;
  xp: number;
  progress: number;
  strengths: string[];
  areasToImprove: string[];
  coreRadar: { subject: string; actual: number; expected: number }[];
  functionalRadar: { subject: string; actual: number; expected: number }[];
  growthData: { month: string; score: number }[];
  coreDefinitions: { title: string; description: string }[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TEAM: TeamMember[] = [
  {
    id: "tarin",
    firstName: "Tarin", lastName: "Chon", gradeCode: "EN 2",
    position: "Full Stack Dev", level: 2,
    avatarColor: "#e05c4b", initials: "TC",
    competencyScore: 3.6, weeklyGain: 2.5, learningHours: 14,
    activeIDPs: 2, pendingAssessments: 1, xp: 120, progress: 85,
    strengths: ["Strategic Leadership Workshop", "Team Communication", "Mentoring Junior Devs"],
    areasToImprove: ["Project Management", "Conflict Resolution", "Data Analysis"],
    coreRadar: [
      { subject: "Create Impact",  actual: 85, expected: 80 },
      { subject: "Take Ownership", actual: 70, expected: 90 },
      { subject: "Adaptive",       actual: 80, expected: 75 },
      { subject: "Collaboration",  actual: 90, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 75, expected: 80 },
      { subject: "FC02", actual: 80, expected: 85 },
      { subject: "FC03", actual: 70, expected: 80 },
      { subject: "FC04", actual: 85, expected: 75 },
      { subject: "FC05", actual: 65, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.5 }, { month: "Feb", score: 2.8 },
      { month: "Mar", score: 3.0 }, { month: "Apr", score: 3.2 },
      { month: "Jun", score: 3.6 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
  {
    id: "emma",
    firstName: "Emma", lastName: "Horg", gradeCode: "EN 1",
    position: "UX/UI", level: 1,
    avatarColor: "#c4956a", initials: "EH",
    competencyScore: 3.2, weeklyGain: 2.5, learningHours: 12,
    activeIDPs: 1, pendingAssessments: 2, xp: 95, progress: 62,
    strengths: ["User Research", "Wireframing & Prototyping", "Design Systems"],
    areasToImprove: ["Frontend Implementation", "Stakeholder Presentations", "Data Visualization"],
    coreRadar: [
      { subject: "Create Impact",  actual: 78, expected: 80 },
      { subject: "Take Ownership", actual: 65, expected: 85 },
      { subject: "Adaptive",       actual: 82, expected: 75 },
      { subject: "Collaboration",  actual: 88, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 80, expected: 80 },
      { subject: "FC02", actual: 70, expected: 85 },
      { subject: "FC03", actual: 65, expected: 80 },
      { subject: "FC04", actual: 78, expected: 75 },
      { subject: "FC05", actual: 60, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.2 }, { month: "Feb", score: 2.5 },
      { month: "Mar", score: 2.8 }, { month: "Apr", score: 3.0 },
      { month: "Jun", score: 3.2 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
  {
    id: "sarah",
    firstName: "Sarah", lastName: "Nigh", gradeCode: "EN 2",
    position: "Business Analyst", level: 3,
    avatarColor: "#4a8fa8", initials: "SN",
    competencyScore: 3.8, weeklyGain: 2.5, learningHours: 16,
    activeIDPs: 3, pendingAssessments: 0, xp: 180, progress: 92,
    strengths: ["Requirements Analysis", "Stakeholder Communication", "Process Mapping"],
    areasToImprove: ["Technical Documentation", "SQL Queries", "Agile Facilitation"],
    coreRadar: [
      { subject: "Create Impact",  actual: 92, expected: 80 },
      { subject: "Take Ownership", actual: 88, expected: 90 },
      { subject: "Adaptive",       actual: 85, expected: 75 },
      { subject: "Collaboration",  actual: 90, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 85, expected: 80 },
      { subject: "FC02", actual: 90, expected: 85 },
      { subject: "FC03", actual: 78, expected: 80 },
      { subject: "FC04", actual: 88, expected: 75 },
      { subject: "FC05", actual: 72, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.8 }, { month: "Feb", score: 3.0 },
      { month: "Mar", score: 3.2 }, { month: "Apr", score: 3.5 },
      { month: "Jun", score: 3.8 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
  {
    id: "jessica",
    firstName: "Jessica", lastName: "Kenn", gradeCode: "EN 1",
    position: "UX/UI", level: 2,
    avatarColor: "#7a5c4f", initials: "JK",
    competencyScore: 3.2, weeklyGain: 2.5, learningHours: 10,
    activeIDPs: 1, pendingAssessments: 1, xp: 105, progress: 70,
    strengths: ["Visual Design", "User Testing", "Component Libraries"],
    areasToImprove: ["Project Management", "Accessibility Standards", "Motion Design"],
    coreRadar: [
      { subject: "Create Impact",  actual: 80, expected: 80 },
      { subject: "Take Ownership", actual: 68, expected: 85 },
      { subject: "Adaptive",       actual: 75, expected: 75 },
      { subject: "Collaboration",  actual: 82, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 70, expected: 80 },
      { subject: "FC02", actual: 75, expected: 85 },
      { subject: "FC03", actual: 68, expected: 80 },
      { subject: "FC04", actual: 80, expected: 75 },
      { subject: "FC05", actual: 60, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.0 }, { month: "Feb", score: 2.4 },
      { month: "Mar", score: 2.8 }, { month: "Apr", score: 3.0 },
      { month: "Jun", score: 3.2 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
  {
    id: "dustin",
    firstName: "Dustin", lastName: "Avia", gradeCode: "EN 1",
    position: "Full Stack Dev", level: 3,
    avatarColor: "#b08050", initials: "DA",
    competencyScore: 3.6, weeklyGain: 2.5, learningHours: 15,
    activeIDPs: 2, pendingAssessments: 1, xp: 160, progress: 88,
    strengths: ["React & TypeScript", "API Design", "Code Review"],
    areasToImprove: ["DevOps Practices", "System Design", "Database Optimization"],
    coreRadar: [
      { subject: "Create Impact",  actual: 88, expected: 80 },
      { subject: "Take Ownership", actual: 82, expected: 85 },
      { subject: "Adaptive",       actual: 78, expected: 75 },
      { subject: "Collaboration",  actual: 84, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 82, expected: 80 },
      { subject: "FC02", actual: 78, expected: 85 },
      { subject: "FC03", actual: 72, expected: 80 },
      { subject: "FC04", actual: 90, expected: 75 },
      { subject: "FC05", actual: 68, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.6 }, { month: "Feb", score: 2.9 },
      { month: "Mar", score: 3.1 }, { month: "Apr", score: 3.4 },
      { month: "Jun", score: 3.6 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
  {
    id: "jacob",
    firstName: "Jacob", lastName: "Mola", gradeCode: "EN 1",
    position: "Full Stack Dev", level: 2,
    avatarColor: "#5a7260", initials: "JM",
    competencyScore: 3.2, weeklyGain: 2.5, learningHours: 9,
    activeIDPs: 1, pendingAssessments: 2, xp: 85, progress: 55,
    strengths: ["Node.js", "Database Design", "Unit Testing"],
    areasToImprove: ["Frontend Performance", "CI/CD Pipelines", "Security Practices"],
    coreRadar: [
      { subject: "Create Impact",  actual: 75, expected: 80 },
      { subject: "Take Ownership", actual: 72, expected: 85 },
      { subject: "Adaptive",       actual: 70, expected: 75 },
      { subject: "Collaboration",  actual: 80, expected: 85 },
    ],
    functionalRadar: [
      { subject: "FC01", actual: 68, expected: 80 },
      { subject: "FC02", actual: 72, expected: 85 },
      { subject: "FC03", actual: 65, expected: 80 },
      { subject: "FC04", actual: 78, expected: 75 },
      { subject: "FC05", actual: 62, expected: 80 },
    ],
    growthData: [
      { month: "Jan", score: 2.0 }, { month: "Feb", score: 2.3 },
      { month: "Mar", score: 2.6 }, { month: "Apr", score: 2.9 },
      { month: "Jun", score: 3.2 },
    ],
    coreDefinitions: [
      { title: "Create Impact",   description: "มุ่งผลงานที่มีนัยสำคัญต่อทีม ในสิ่งที่มีคุณค่าต่อองค์กร เข้าใจบทบาทที่โดดเด่น และรับผิดชอบ" },
      { title: "Take Ownership",  description: "Own ผลงานแบบ end-to-end พร้อม solve ปัญหาเมื่อเจอแบบไม่หนีความรับผิดชอบต้นเรื่อง" },
      { title: "Adaptive",        description: "สามารถแก้ไขปัญหาได้ดี รักการเรียนรู้ เปิดรับการเปลี่ยนแปลง" },
      { title: "Collaboration",   description: "การทำงานเป็นทีมและร่วมมือมีวินัยมีความรับผิดชอบให้เกิดประโยชน์ เข้าใจบทบาทของตัวเอง" },
    ],
  },
];

const radarChartConfig = {
  actual:   { label: "Actual", color: "#fc4c02" },
  expected: { label: "Target", color: "#3b82f6" },
} satisfies ChartConfig;

const GEO = { fontFamily: '"Geometrica", sans-serif' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AnimatedNumber = ({
  value, decimals = 0, prefix = "", suffix = "",
}: { value: number; decimals?: number; prefix?: string; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display, end = value;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]); // eslint-disable-line
  return <>{prefix}{display.toFixed(decimals)}{suffix}</>;
};

// Medal badge component
function MedalBadge({ level }: { level: number }) {
  const colors = ["", "#CD7F32", "#C0C0C0", "#FFD700"];
  const c = colors[Math.min(level, 3)] ?? "#FFD700";
  return (
    <div className="flex flex-col items-center gap-0 shrink-0">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shadow-md relative"
        style={{ background: `radial-gradient(circle at 35% 35%, ${c}ee, ${c}88)`, border: `2px solid ${c}` }}
      >
        <div className="absolute inset-[2px] rounded-full" style={{ border: `1px solid ${c}aa` }} />
        <Award className="w-4 h-4 text-white drop-shadow" />
      </div>
      <div className="flex gap-0.5 -mt-0.5">
        <div className="w-2 h-3 rounded-b-sm" style={{ background: "#f43f5e" }} />
        <div className="w-2 h-3 rounded-b-sm" style={{ background: "#fb7185" }} />
      </div>
    </div>
  );
}

// ─── Member Card (list row) ───────────────────────────────────────────────────

function MemberCard({ m, onClick }: { m: TeamMember; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-[18px] font-bold shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ background: m.avatarColor }}
      >
        {m.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[14px] font-semibold text-gray-900 dark:text-white" style={GEO}>
            {m.firstName}.{m.lastName}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium" style={GEO}>
            ({m.gradeCode})
          </span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1" style={GEO}>{m.position}</p>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300" style={GEO}>
            Overall Competency Score{" "}
            <span className="font-bold text-gray-900 dark:text-white">{m.competencyScore.toFixed(1)}</span>
          </span>
          <span className="text-[12px] font-semibold text-emerald-500">
            + {m.weeklyGain.toFixed(1)} This week
          </span>
        </div>
      </div>

      {/* Level */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap" style={GEO}>
          Level {m.level}
        </span>
        <MedalBadge level={m.level} />
      </div>
    </button>
  );
}

// ─── Member Detail View ───────────────────────────────────────────────────────

function MemberDetail({ m, onBack }: { m: TeamMember; onBack: () => void }) {
  const [isMounted, setIsMounted]           = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Core");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [coreType, setCoreType]             = useState<"Core" | "Functional">("Core");
  const [showCoreDropdown, setShowCoreDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node))
        setIsCategoryOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const fadeUp = (ms: number) => ({
    opacity:   isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .5s ease-out ${ms}ms, transform .5s ease-out ${ms}ms`,
  });

  const activeDefinitions = coreType === "Core" ? m.coreDefinitions : [
    { title: "FC01 · Data Analysis",             description: "วิเคราะห์ข้อมูลเพื่อสกัด insight และสนับสนุนการตัดสินใจทางธุรกิจได้อย่างมีประสิทธิภาพ" },
    { title: "FC02 · Stakeholder Communication", description: "สื่อสารได้ชัดเจนและมีประสิทธิผลกับทุกระดับของ stakeholder ทั้งภายในและภายนอกองค์กร" },
    { title: "FC03 · Strategic Thinking",        description: "เชื่อมโยงงานประจำวันเข้ากับเป้าหมายระยะยาวขององค์กร มองภาพรวมและวางแผนเชิงกลยุทธ์" },
    { title: "FC04 · Project Execution",         description: "ส่งมอบโปรเจกต์ตรงเวลา ตรงขอบเขต และได้มาตรฐานคุณภาพที่กำหนด" },
    { title: "FC05 · Process Improvement",       description: "ระบุและนำการปรับปรุง workflow ที่มีความหมายมาใช้งาน เพื่อเพิ่มประสิทธิภาพของทีม" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#f8fafc] dark:bg-transparent min-h-screen">

      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-sm text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer"
        style={GEO}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Team
      </button>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4" style={fadeUp(0)}>
        {[
          { label: "Competency Score",    icon: <TrendingUp className="h-5 w-5 text-white" />, grad: "from-blue-500 to-blue-600",    value: m.competencyScore, dec: 1, sub: "Excellent Progress" },
          { label: "Active IDPs",         icon: <Target     className="h-5 w-5 text-white" />, grad: "from-amber-500 to-orange-500", value: m.activeIDPs,      dec: 0, sub: "In Progress" },
          { label: "Pending Assessments", icon: <AlertCircle className="h-5 w-5 text-white" />, grad: "from-rose-500 to-pink-500",   value: m.pendingAssessments, dec: 0, sub: "Due this week" },
          { label: "Learning Hours",      icon: <BookOpen   className="h-5 w-5 text-white" />, grad: "from-emerald-500 to-teal-500", value: m.learningHours,  dec: 0, sub: "+2.5 This Week" },
        ].map((c, ci) => (
          <Card
            key={c.label}
            className={`relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group bg-gradient-to-br ${c.grad}`}
            style={fadeUp(ci * 60)}
          >
            <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] " />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-white/90" style={GEO}>{c.label}</CardTitle>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">{c.icon}</div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-white mb-1" style={GEO}>
                <AnimatedNumber value={isMounted ? c.value : 0} decimals={c.dec} />
              </div>
              <p className="text-sm text-white/80 font-medium" style={GEO}>{c.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-7">

        {/* ── Left (4 col) ── */}
        <div className="lg:col-span-4 space-y-6">

          {/* Profile card */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative hover:shadow-2xl transition-all duration-500" style={fadeUp(200)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <CardContent className="pt-5 pb-5 px-5 relative z-10">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-75 blur" />
                  <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center text-white text-[20px] font-bold ring-2 ring-white dark:ring-gray-800"
                    style={{ background: m.avatarColor }}
                  >
                    {m.initials}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h2 className="text-[16px] font-bold text-gray-900 dark:text-white" style={GEO}>
                      {m.firstName}.{m.lastName} ({m.gradeCode})
                    </h2>
                    <Award className="h-4 w-4 text-amber-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: "#fc4c02" }}>
                      Level {m.level}
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium" style={GEO}>
                      {m.position}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400" style={GEO}>Progress</span>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400" style={GEO}>{m.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: isMounted ? `${m.progress}%` : "0%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* XP / Complete */}
                <div className="flex items-start gap-4 shrink-0">
                  <div className="text-center">
                    <div className="text-[22px] font-bold text-purple-600 dark:text-purple-400" style={GEO}>{m.xp}</div>
                    <div className="text-[10px] text-gray-400" style={GEO}>XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[22px] font-bold text-emerald-600 dark:text-emerald-400" style={GEO}>{m.progress}%</div>
                    <div className="text-[10px] text-gray-400" style={GEO}>Complete</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3" style={fadeUp(280)}>
            {[
              { label: "Learning Hours", value: m.learningHours, icon: Clock,      color: "text-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/20" },
              { label: "Active IDPs",    value: m.activeIDPs,    icon: Target,     color: "text-orange-500",  bg: "bg-orange-50 dark:bg-orange-900/20" },
              { label: "Pending",        value: m.pendingAssessments, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
            ].map((s, si) => (
              <div key={si} className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-[18px] font-bold text-gray-800 dark:text-white leading-none" style={GEO}>{s.value}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5" style={GEO}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Strengths + Areas */}
          <div className="grid gap-4 md:grid-cols-2" style={fadeUp(320)}>
            <Card className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border-none shadow-sm">
              <h3 className="text-[16px] font-medium text-[#08060d] dark:text-white mb-3 flex items-center gap-2" style={GEO}>
                <div className="h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                Top Strengths
              </h3>
              <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-3 space-y-2.5">
                {m.strengths.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#32bea6] flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium leading-tight" style={GEO}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border-none shadow-sm">
              <h3 className="text-[16px] font-medium text-[#08060d] dark:text-white mb-3 flex items-center gap-2" style={GEO}>
                <div className="h-7 w-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                </div>
                Areas to Improve
              </h3>
              <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-3 space-y-2.5">
                {m.areasToImprove.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f4c300] flex items-center justify-center shrink-0">
                      <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="10.7" y="5" width="2.6" height="9" rx="1.3" /><circle cx="12" cy="17" r="1.4" /></svg>
                    </div>
                    <span className="text-[11px] text-gray-700 dark:text-gray-200 font-medium leading-tight" style={GEO}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Competency Overview radar */}
          <Card className="p-4 rounded-lg bg-white dark:bg-neutral-950 border-none shadow-none relative" style={fadeUp(400)}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006BFF]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            </div>
            <div className="flex items-baseline justify-between mb-2 relative z-20">
              <h2 className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight" style={GEO}>Competency Overview</h2>
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 active:scale-[0.96] cursor-pointer text-[12px] font-normal ${isCategoryOpen ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-gray-200/50 shadow-xl text-gray-700 dark:text-gray-300" : "bg-transparent hover:bg-white dark:hover:bg-neutral-800 text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-200/60"}`}
                  style={GEO}
                >
                  {selectedCategory}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryOpen ? "rotate-180 text-[#FC4C02]" : "rotate-0"}`} />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-36 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-transparent p-1 z-50 transition-all duration-300 origin-top-right shadow-xl ${isCategoryOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                  <div className="flex flex-col gap-1">
                    {["Core", "Functional"].map(cat => (
                      <button key={cat} onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                        className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal transition-all duration-200 cursor-pointer ${selectedCategory === cat ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-neutral-800/60"}`}
                        style={GEO}
                      >
                        <span className="flex-1 text-left">{cat}</span>
                        {selectedCategory === cat && <Check className="w-4 h-4 text-orange-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start relative z-10 -mt-4">
              <div className="w-full lg:w-1/2 aspect-square flex items-center justify-start -mt-10">
                <ChartContainer config={radarChartConfig} className="w-full h-full max-h-[260px] outline-none focus:outline-none [&_*]:outline-none">
                  <RadarChart data={selectedCategory === "Functional" ? m.functionalRadar : m.coreRadar} margin={{ top: 0, right: 40, bottom: 10, left: 30 }} outerRadius="70%">
                    <ChartTooltip cursor={false} content={<ChartTooltipContent className="border-none ring-0" />} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#4b5563", fontSize: 11, fontFamily: '"Geometrica", sans-serif', fontWeight: 400, opacity: 0.9 }} />
                    <PolarGrid gridType="polygon" stroke="currentColor" strokeOpacity={0.1} />
                    <Radar dataKey="expected" fill="var(--color-expected)" fillOpacity={0.05} stroke="var(--color-expected)" strokeWidth={1.5} strokeDasharray="4 4" />
                    <Radar dataKey="actual"   fill="var(--color-actual)"   fillOpacity={0.4}  stroke="var(--color-actual)"   strokeWidth={2.5} />
                  </RadarChart>
                </ChartContainer>
              </div>
              <div className="flex-1 w-full flex flex-col items-end">
                <div className="w-fit ml-auto space-y-2.5">
                  <div className="py-3.5 px-3.5 rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between gap-6 mb-2">
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Current Rating</span>
                      <div className="flex items-center gap-1 text-emerald-500 font-bold text-[11px]">
                        <TrendingUp className="w-3 h-3" />
                        <AnimatedNumber value={isMounted ? 6 : 0} prefix="+" suffix="%" />
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-[24px] font-bold text-gray-700 dark:text-white leading-none tracking-tight" style={GEO}>
                        <AnimatedNumber value={isMounted ? m.competencyScore : 0} decimals={1} />
                      </span>
                      <span className="text-[14px] font-bold text-gray-400 dark:text-gray-600 mb-0.5">/ 5.0</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-start px-1">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#fc4c02]" /><span className="text-[12px] text-gray-500 dark:text-gray-400" style={GEO}>Actual</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /><span className="text-[12px] text-gray-500 dark:text-gray-400" style={GEO}>Target</span></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Right (3 col) ── */}
        <div className="lg:col-span-3 space-y-6">

          {/* Core Definition */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-neutral-950" style={fadeUp(300)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-[15px]" style={GEO}>
                <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                </div>
                {coreType} Definition
              </CardTitle>
              <div className="relative">
                <button
                  className="text-[11px] px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium cursor-pointer"
                  onClick={() => setShowCoreDropdown(v => !v)}
                  style={GEO}
                >
                  {coreType} ▾
                </button>
                {showCoreDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-neutral-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10">
                    {(["Core", "Functional"] as const).map(opt => (
                      <button key={opt}
                        className={`w-full text-left px-4 py-2 text-[12px] first:rounded-t-xl last:rounded-b-xl transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer ${coreType === opt ? "font-bold text-purple-600 dark:text-purple-300" : "text-gray-700 dark:text-gray-300"}`}
                        onClick={() => { setCoreType(opt); setShowCoreDropdown(false); }}
                        style={GEO}
                      >{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {activeDefinitions.map((def, i) => (
                <div
                  key={`${coreType}-${i}`}
                  className="border-l-4 border-purple-500 dark:border-purple-400 pl-3 py-2 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 rounded-r-lg hover:from-purple-100/50 dark:hover:from-purple-900/20 transition-all duration-300 hover:translate-x-1 group"
                  style={{ animation: `fadeSlideIn .3s ease-out ${i * 0.07}s both` }}
                >
                  <h3 className="font-semibold text-left text-[12px] mb-1 text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" style={GEO}>{def.title}</h3>
                  <p className="text-[11px] text-left text-gray-500 dark:text-gray-400 leading-relaxed" style={GEO}>{def.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Growth Timeline */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-neutral-950 relative overflow-hidden" style={fadeUp(400)}>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-[15px]" style={GEO}>
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5 text-white" />
                </div>
                Growth Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={m.growthData}>
                    <defs>
                      <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} />
                    <YAxis domain={[2.0, 4.0]} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={{ stroke: "#e5e7eb" }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: "12px" }}
                      cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "5 5" }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5}
                      dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 7, strokeWidth: 2, stroke: "#fff" }}
                    />
                    {m.growthData.slice(-2).map((r, i) => (
                      <ReferenceDot key={i} x={r.month} y={r.score} r={8} fill="#fbbf24" stroke="#fff" strokeWidth={2} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0);   }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TeamProfilePage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [search, setSearch] = useState("");

  const topPerformers = [...TEAM].sort((a, b) => b.competencyScore - a.competencyScore).slice(0, 2);
  const filtered = TEAM.filter(m =>
    `${m.firstName} ${m.lastName} ${m.position}`.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedMember) {
    return <MemberDetail m={selectedMember} onBack={() => setSelectedMember(null)} />;
  }

  return (
    <div className="p-6 bg-[#f8fafc] dark:bg-transparent min-h-screen" style={GEO}>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-[#08060d] text-left dark:text-white mb-1" style={GEO}>Team Profile</h1>
        <p className="text-[13px] text-left text-gray-500 dark:text-gray-400" style={GEO}>
          {TEAM.length} members · Click any member to view their full competency profile
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">

        {/* ── Left: member list ── */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-3">

          {/* Search */}
          <div className="relative mb-1">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or position…"
              className="w-full pl-4 pr-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-neutral-950 text-[13px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006bff]/30 shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)] transition-all"
              style={GEO}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[13px] text-gray-400" style={GEO}>No members found</div>
          ) : (
            filtered.map(m => (
              <MemberCard key={m.id} m={m} onClick={() => setSelectedMember(m)} />
            ))
          )}
        </div>

        {/* ── Right: top performers + summary ── */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-4">

          {/* Top Performer */}
          <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-4">
            <h2 className="text-[16px] font-semibold text-[#08060d] dark:text-white mb-3" style={GEO}>Top Performer</h2>
            <div className="flex flex-col gap-3">
              {topPerformers.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[15px] font-bold shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: m.avatarColor }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[13px] font-semibold text-gray-900 dark:text-white" style={GEO}>{m.firstName}.{m.lastName}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-1" style={GEO}>{m.position}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-gray-600 dark:text-gray-300" style={GEO}>
                        Overall Competency Score <strong>{m.competencyScore.toFixed(1)}</strong>
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-500">+ {m.weeklyGain.toFixed(1)} This week</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap" style={GEO}>Level {m.level}</span>
                    <MedalBadge level={m.level} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Team summary stats */}
          <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-4">
            <h2 className="text-[16px] font-semibold text-[#08060d] dark:text-white mb-3" style={GEO}>Team Summary</h2>
            <div className="space-y-3">
              {[
                { label: "Avg Competency Score", value: (TEAM.reduce((s, m) => s + m.competencyScore, 0) / TEAM.length).toFixed(1), sub: "/ 5.0", color: "text-blue-600 dark:text-blue-400"    },
                { label: "Total Learning Hours",  value: TEAM.reduce((s, m) => s + m.learningHours, 0).toString(),                    sub: "hrs",   color: "text-emerald-600 dark:text-emerald-400" },
                { label: "Active IDPs",           value: TEAM.reduce((s, m) => s + m.activeIDPs, 0).toString(),                       sub: "plans", color: "text-orange-500 dark:text-orange-400"  },
                { label: "Pending Assessments",   value: TEAM.reduce((s, m) => s + m.pendingAssessments, 0).toString(),               sub: "due",   color: "text-rose-500 dark:text-rose-400"       },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5 last:border-b-0">
                  <span className="text-[12px] text-gray-500 dark:text-gray-400" style={GEO}>{s.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[16px] font-bold ${s.color}`} style={GEO}>{s.value}</span>
                    <span className="text-[11px] text-gray-400" style={GEO}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Position breakdown */}
          <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-4">
            <h2 className="text-[16px] font-semibold text-[#08060d] dark:text-white mb-3" style={GEO}>Position Breakdown</h2>
            <div className="space-y-2.5">
              {Array.from(new Set(TEAM.map(m => m.position))).map(pos => {
                const count = TEAM.filter(m => m.position === pos).length;
                const pct = Math.round((count / TEAM.length) * 100);
                return (
                  <div key={pos}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-600 dark:text-gray-300" style={GEO}>{pos}</span>
                      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300" style={GEO}>{count} · {pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#006bff] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
