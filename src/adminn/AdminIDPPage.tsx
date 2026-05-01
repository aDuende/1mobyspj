import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Download,
  Search,
  TrendingDown,
  TrendingUp,
  Minus,
  X,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Track = "Core" | "Functional" | "Managerial";

interface CompetencyGap {
  code: string;
  track: Track;
  name: string;
  description: string;
  actual: number;
  expected: number;
}

interface SuggestedCourse {
  id: string;
  forCode: string;
  forName: string;
  title: string;
  hours: number;
  track: Track;
}

interface UserIDP {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  isManager: boolean;
  critical: number;
  strength: number;
  fit: number;
  totalCompetencies: number;
  tenure: string;
  tracks: Track[];
  trend: number;
  worstGap: number;
  gaps: CompetencyGap[];
  courses: SuggestedCourse[];
  strengths: { code: string; name: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────

const TARIN_GAPS: CompetencyGap[] = [
  {
    code: "FC02",
    track: "Functional",
    name: "Stakeholder Communication",
    description: "Communicates clearly with stakeholders at every level.",
    actual: 1,
    expected: 3,
  },
  {
    code: "CC01",
    track: "Core",
    name: "Create Impact",
    description:
      "Drives meaningful work for the team and organization; clear ownership of role.",
    actual: 2,
    expected: 3,
  },
  {
    code: "CC02",
    track: "Core",
    name: "Take Ownership",
    description:
      "Owns work end-to-end; solves problems instead of escalating prematurely.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC03",
    track: "Functional",
    name: "Strategic Thinking",
    description: "Connects daily work to long-term organizational goals.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC05",
    track: "Functional",
    name: "Process Improvement",
    description: "Identifies and implements meaningful workflow improvements.",
    actual: 2,
    expected: 3,
  },
];

const TARIN_COURSES: SuggestedCourse[] = [
  {
    id: "CRS-310",
    forCode: "FC02",
    forName: "STAKEHOLDER COMMUNICATION",
    title: "Communicating with stakeholders",
    hours: 4,
    track: "Functional",
  },
  {
    id: "CRS-318",
    forCode: "FC02",
    forName: "STAKEHOLDER COMMUNICATION",
    title: "Executive presence on calls",
    hours: 3,
    track: "Functional",
  },
  {
    id: "CRS-118",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Outcome-driven planning",
    hours: 4,
    track: "Core",
  },
  {
    id: "CRS-204",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Defining team-level impact",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-077",
    forCode: "CC02",
    forName: "TAKE OWNERSHIP",
    title: "Owning the problem, not the task",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-091",
    forCode: "CC02",
    forName: "TAKE OWNERSHIP",
    title: "Decision frameworks under ambiguity",
    hours: 5,
    track: "Core",
  },
  {
    id: "CRS-340",
    forCode: "FC03",
    forName: "STRATEGIC THINKING",
    title: "Thinking strategically",
    hours: 6,
    track: "Functional",
  },
  {
    id: "CRS-345",
    forCode: "FC03",
    forName: "STRATEGIC THINKING",
    title: "From OKRs to weekly work",
    hours: 4,
    track: "Functional",
  },
];

// ── Jess Park ──────────────────────────────────────────────────────────────
const JESS_GAPS: CompetencyGap[] = [
  {
    code: "CC01",
    track: "Core",
    name: "Create Impact",
    description:
      "Drives meaningful work for the team and organization; clear ownership of role.",
    actual: 2,
    expected: 3,
  },
  {
    code: "CC02",
    track: "Core",
    name: "Take Ownership",
    description:
      "Owns work end-to-end; solves problems instead of escalating prematurely.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC01",
    track: "Functional",
    name: "Data Analysis",
    description: "Extracts insight from data to support business decisions.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC03",
    track: "Functional",
    name: "Strategic Thinking",
    description: "Connects daily work to long-term organizational goals.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC05",
    track: "Functional",
    name: "Process Improvement",
    description: "Identifies and implements meaningful workflow improvements.",
    actual: 2,
    expected: 3,
  },
  {
    code: "MC01",
    track: "Managerial",
    name: "Process",
    description:
      "Designs workflows and improves process efficiency across the team.",
    actual: 2,
    expected: 3,
  },
  {
    code: "MC03",
    track: "Managerial",
    name: "People",
    description:
      "Develops talent, manages performance, and builds team culture.",
    actual: 2,
    expected: 3,
  },
];

const JESS_COURSES: SuggestedCourse[] = [
  {
    id: "CRS-118",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Outcome-driven planning",
    hours: 4,
    track: "Core",
  },
  {
    id: "CRS-204",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Defining team-level impact",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-077",
    forCode: "CC02",
    forName: "TAKE OWNERSHIP",
    title: "Owning the problem, not the task",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-091",
    forCode: "CC02",
    forName: "TAKE OWNERSHIP",
    title: "Decision frameworks under ambiguity",
    hours: 5,
    track: "Core",
  },
  {
    id: "CRS-301",
    forCode: "FC01",
    forName: "DATA ANALYSIS",
    title: "Data analysis foundations",
    hours: 8,
    track: "Functional",
  },
  {
    id: "CRS-322",
    forCode: "FC01",
    forName: "DATA ANALYSIS",
    title: "Insight to recommendation",
    hours: 5,
    track: "Functional",
  },
  {
    id: "CRS-340",
    forCode: "FC03",
    forName: "STRATEGIC THINKING",
    title: "Thinking strategically",
    hours: 6,
    track: "Functional",
  },
  {
    id: "CRS-345",
    forCode: "FC03",
    forName: "STRATEGIC THINKING",
    title: "From OKRs to weekly work",
    hours: 4,
    track: "Functional",
  },
  {
    id: "CRS-411",
    forCode: "FC05",
    forName: "PROCESS IMPROVEMENT",
    title: "Process mapping fundamentals",
    hours: 4,
    track: "Functional",
  },
  {
    id: "CRS-415",
    forCode: "FC05",
    forName: "PROCESS IMPROVEMENT",
    title: "Lean workflow design",
    hours: 3,
    track: "Functional",
  },
  {
    id: "CRS-501",
    forCode: "MC01",
    forName: "PROCESS",
    title: "Operating rhythm for managers",
    hours: 3,
    track: "Managerial",
  },
  {
    id: "CRS-521",
    forCode: "MC03",
    forName: "PEOPLE",
    title: "Coaching conversations",
    hours: 4,
    track: "Managerial",
  },
  {
    id: "CRS-525",
    forCode: "MC03",
    forName: "PEOPLE",
    title: "Building high-performance teams",
    hours: 5,
    track: "Managerial",
  },
];

// ── Leon Vu ───────────────────────────────────────────────────────────────────
const LEON_GAPS: CompetencyGap[] = [
  {
    code: "CC01",
    track: "Core",
    name: "Create Impact",
    description:
      "Drives meaningful work for the team and organization; clear ownership of role.",
    actual: 2,
    expected: 3,
  },
  {
    code: "CC03",
    track: "Core",
    name: "Adaptive",
    description: "Strong problem solver; learns continuously; embraces change.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC02",
    track: "Functional",
    name: "Stakeholder Communication",
    description: "Communicates clearly with stakeholders at every level.",
    actual: 2,
    expected: 3,
  },
  {
    code: "FC04",
    track: "Functional",
    name: "Project Execution",
    description: "Delivers projects on time, on scope, and to quality.",
    actual: 2,
    expected: 3,
  },
  {
    code: "MC02",
    track: "Managerial",
    name: "Purpose",
    description: "Sets vision, thinks strategically, manages risk.",
    actual: 2,
    expected: 3,
  },
  {
    code: "MC04",
    track: "Managerial",
    name: "Result",
    description: "Drives outcomes, raises efficiency, holds standards.",
    actual: 2,
    expected: 3,
  },
];

const LEON_COURSES: SuggestedCourse[] = [
  {
    id: "CRS-118",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Outcome-driven planning",
    hours: 4,
    track: "Core",
  },
  {
    id: "CRS-204",
    forCode: "CC01",
    forName: "CREATE IMPACT",
    title: "Defining team-level impact",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-156",
    forCode: "CC03",
    forName: "ADAPTIVE",
    title: "Learning agility in practice",
    hours: 4,
    track: "Core",
  },
  {
    id: "CRS-188",
    forCode: "CC03",
    forName: "ADAPTIVE",
    title: "Navigating organizational change",
    hours: 3,
    track: "Core",
  },
  {
    id: "CRS-310",
    forCode: "FC02",
    forName: "STAKEHOLDER COMMUNICATION",
    title: "Communicating with stakeholders",
    hours: 4,
    track: "Functional",
  },
  {
    id: "CRS-318",
    forCode: "FC02",
    forName: "STAKEHOLDER COMMUNICATION",
    title: "Executive presence on calls",
    hours: 3,
    track: "Functional",
  },
  {
    id: "CRS-360",
    forCode: "FC04",
    forName: "PROJECT EXECUTION",
    title: "Project execution playbook",
    hours: 6,
    track: "Functional",
  },
  {
    id: "CRS-540",
    forCode: "MC02",
    forName: "PURPOSE",
    title: "Strategic vision for leaders",
    hours: 4,
    track: "Managerial",
  },
  {
    id: "CRS-555",
    forCode: "MC04",
    forName: "RESULT",
    title: "Driving results with accountability",
    hours: 3,
    track: "Managerial",
  },
];

const USERS_IDP: UserIDP[] = [
  {
    id: 1,
    name: "Jess Park",
    email: "jess.park@1moby.com",
    team: "Product",
    role: "Product Manager",
    isManager: true,
    critical: 7,
    strength: 0,
    fit: 6,
    totalCompetencies: 13,
    tenure: "1y 8m",
    tracks: ["Core", "Functional", "Managerial"],
    trend: -0.5,
    worstGap: -1,
    gaps: JESS_GAPS,
    courses: JESS_COURSES,
    strengths: [],
  },
  {
    id: 2,
    name: "Leon Vu",
    email: "leon.vu@1moby.com",
    team: "Finance",
    role: "Finance Lead",
    isManager: true,
    critical: 6,
    strength: 1,
    fit: 6,
    totalCompetencies: 13,
    tenure: "4y 6m",
    tracks: ["Core", "Functional", "Managerial"],
    trend: -0.3,
    worstGap: -1,
    gaps: LEON_GAPS,
    courses: LEON_COURSES,
    strengths: [{ code: "FC01", name: "Data Analysis" }],
  },
  {
    id: 3,
    name: "Tarin Chon",
    email: "tarin.chon@1moby.com",
    team: "Engineering",
    role: "Senior Analyst",
    isManager: false,
    critical: 5,
    strength: 2,
    fit: 2,
    totalCompetencies: 9,
    tenure: "2y 4m",
    tracks: ["Core", "Functional"],
    trend: -0.2,
    worstGap: -2,
    gaps: TARIN_GAPS,
    courses: TARIN_COURSES,
    strengths: [
      { code: "CC04", name: "Collaboration" },
      { code: "FC01", name: "Data Analysis" },
    ],
  },
  {
    id: 4,
    name: "Sam Frea",
    email: "sam.frea@1moby.com",
    team: "Engineering",
    role: "Engineering Manager",
    isManager: true,
    critical: 0,
    strength: 8,
    fit: 5,
    totalCompetencies: 13,
    tenure: "5y 0m",
    tracks: ["Core", "Functional", "Managerial"],
    trend: 0.4,
    worstGap: 0,
    gaps: [],
    courses: [],
    strengths: [],
  },
  {
    id: 5,
    name: "Alex Nguyen",
    email: "alex.nguyen@1moby.com",
    team: "Design",
    role: "Senior Designer",
    isManager: false,
    critical: 0,
    strength: 6,
    fit: 3,
    totalCompetencies: 9,
    tenure: "3y 6m",
    tracks: ["Core", "Functional"],
    trend: 0.6,
    worstGap: 0,
    gaps: [],
    courses: [],
    strengths: [],
  },
  {
    id: 6,
    name: "Maya Sorn",
    email: "maya.sorn@1moby.com",
    team: "HR",
    role: "HR Specialist",
    isManager: false,
    critical: 0,
    strength: 0,
    fit: 9,
    totalCompetencies: 9,
    tenure: "1y 8m",
    tracks: ["Core", "Functional"],
    trend: 0.0,
    worstGap: 0,
    gaps: [],
    courses: [],
    strengths: [],
  },
];

interface CoverageItem {
  code: string;
  name: string;
  level: number;
  max: number;
}

const ORG_COVERAGE: {
  track: Track;
  critical: number;
  fit: number;
  strength: number;
  items: CoverageItem[];
}[] = [
  {
    track: "Core",
    critical: 6,
    fit: 11,
    strength: 7,
    items: [
      { code: "CC01", name: "Create Impact", level: 5, max: 6 },
      { code: "CC02", name: "Take Ownership", level: 5, max: 6 },
      { code: "CC03", name: "Adaptive", level: 4, max: 6 },
      { code: "CC04", name: "Collaboration", level: 4, max: 6 },
    ],
  },
  {
    track: "Functional",
    critical: 8,
    fit: 15,
    strength: 7,
    items: [
      { code: "FC01", name: "Data Analysis", level: 5, max: 6 },
      { code: "FC02", name: "Stakeholder Comm…", level: 4, max: 6 },
      { code: "FC03", name: "Strategic Thinking", level: 5, max: 6 },
      { code: "FC04", name: "Project Execution", level: 5, max: 6 },
      { code: "FC05", name: "Process Improvem…", level: 5, max: 6 },
    ],
  },
  {
    track: "Managerial",
    critical: 4,
    fit: 5,
    strength: 3,
    items: [
      { code: "MC01", name: "Process", level: 2, max: 3 },
      { code: "MC02", name: "Purpose", level: 3, max: 3 },
      { code: "MC03", name: "People", level: 2, max: 3 },
      { code: "MC04", name: "Result", level: 2, max: 3 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

type StatusKey = "needs-attention" | "on-track" | "high-performer";
type FilterKey = "all" | StatusKey;
type SortKey = "worst" | "az" | "team";

function getStatus(u: UserIDP): StatusKey {
  if (u.critical >= 3) return "needs-attention";
  if (u.strength >= 4) return "high-performer";
  return "on-track";
}

const STATUS_LABEL: Record<StatusKey, string> = {
  "needs-attention": "Needs attention",
  "on-track": "On track",
  "high-performer": "High performer",
};

const STATUS_PILL: Record<StatusKey, string> = {
  "needs-attention":
    "border-blue-300 text-[#006BFF] dark:border-blue-500/60 dark:text-blue-300",
  "on-track":
    "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300",
  "high-performer":
    "border-gray-800 text-gray-900 dark:border-gray-200 dark:text-gray-100",
};

const TRACK_TAG: Record<Track, string> = {
  Core: "text-[#006BFF] dark:text-blue-400",
  Functional: "text-[#006BFF] dark:text-blue-400",
  Managerial: "text-[#006BFF] dark:text-blue-400",
};

const fontGeo = { fontFamily: "Geometrica, sans-serif" } as const;

// ── Animated Number ───────────────────────────────────────────────────────────
const AnimatedNumber = ({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display,
      end = value;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      setDisplay(start + (end - start) * p * (2 - p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]); // eslint-disable-line
  return <>{display.toFixed(decimals)}</>;
};

// Tiny inline trend sparkline
function TrendSpark({ trend }: { trend: number }) {
  const up = trend >= 0;
  const points = up
    ? "0,14 8,11 16,12 24,8 32,9 40,4"
    : "0,4 8,7 16,5 24,9 32,8 40,13";
  return (
    <div className="flex items-center gap-1.5">
      <svg width="44" height="18" viewBox="0 0 44 18" className="shrink-0">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-700 dark:text-gray-300"
        />
      </svg>
      <span className="text-[10px] text-gray-500 dark:text-gray-400 tabular-nums">
        {trend > 0 ? "▲" : trend < 0 ? "▼" : "·"}
        {Math.abs(trend).toFixed(1)}
      </span>
    </div>
  );
}

function GapBar({
  critical,
  fit,
  strength,
  total,
}: {
  critical: number;
  fit: number;
  strength: number;
  total: number;
}) {
  const c = total > 0 ? (critical / total) * 100 : 0;
  const f = total > 0 ? (fit / total) * 100 : 0;
  const s = total > 0 ? (strength / total) * 100 : 0;
  return (
    <div className="w-32 h-2 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex">
      <div
        className="bg-[#006BFF]"
        style={{ width: `${c}%` }}
        title={`Critical: ${critical}`}
      />
      <div
        className="bg-gray-300 dark:bg-gray-500"
        style={{ width: `${f}%` }}
        title={`Fit: ${fit}`}
      />
      <div
        className="bg-emerald-500"
        style={{ width: `${s}%` }}
        title={`Strength: ${strength}`}
      />
    </div>
  );
}

function MiniGapDots({
  actual,
  expected,
}: {
  actual: number;
  expected: number;
}) {
  const slots = 4;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: slots }).map((_, i) => {
        const filled = i < actual;
        const isExpected = i === expected - 1;
        return (
          <div
            key={i}
            className={`h-2.5 w-5 rounded-sm border ${
              filled
                ? "bg-[#006BFF] border-[#006BFF]"
                : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            } ${isExpected ? "ring-1 ring-gray-900/40 dark:ring-white/40" : ""}`}
          />
        );
      })}
    </div>
  );
}

function CoverageBar({ level, max }: { level: number; max: number }) {
  const pct = max > 0 ? (level / max) * 100 : 0;
  return (
    <div className="w-24 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
      <div className="h-full bg-[#006BFF]" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function AdminIDPPage() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [team, setTeam] = useState<string>("All teams");
  const [sort, setSort] = useState<SortKey>("worst");
  const [selectedId, setSelectedId] = useState<number>(3);

  type AssignTarget = {
    user: UserIDP;
    course: SuggestedCourse;
    gap: CompetencyGap | undefined;
  };
  const [assignTarget, setAssignTarget] = useState<AssignTarget | null>(null);

  function openAssign(user: UserIDP, course: SuggestedCourse) {
    const gap = user.gaps.find((g) => g.code === course.forCode);
    setAssignTarget({ user, course, gap });
  }

  const teams = useMemo(
    () => ["All teams", ...Array.from(new Set(USERS_IDP.map((u) => u.team)))],
    [],
  );

  const counts = useMemo(() => {
    const all = USERS_IDP.length;
    let needs = 0;
    let track = 0;
    let high = 0;
    USERS_IDP.forEach((u) => {
      const s = getStatus(u);
      if (s === "needs-attention") needs++;
      else if (s === "on-track") track++;
      else high++;
    });
    return { all, needs, track, high };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = USERS_IDP.filter((u) => {
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.team.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);
      const matchTeam = team === "All teams" || u.team === team;
      const matchFilter = filter === "all" || getStatus(u) === filter;
      return matchSearch && matchTeam && matchFilter;
    });

    if (sort === "worst") {
      list = [...list].sort((a, b) => b.critical - a.critical);
    } else if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort((a, b) => a.team.localeCompare(b.team));
    }
    return list;
  }, [search, team, filter, sort]);

  const attentionQueue = useMemo(
    () =>
      USERS_IDP.filter((u) => getStatus(u) === "needs-attention").sort(
        (a, b) => b.critical - a.critical,
      ),
    [],
  );

  const selected = USERS_IDP.find((u) => u.id === selectedId) ?? USERS_IDP[2];

  return (
    <>
      {assignTarget && (
        <AssignCourseModal
          user={assignTarget.user}
          course={assignTarget.course}
          gap={assignTarget.gap}
          onClose={() => setAssignTarget(null)}
        />
      )}
      <div className="min-h-screen p-6 bg-[#f8fafc] dark:bg-transparent">
        <div className="max-w-350 mx-auto space-y-6">
          {/* ───── Header ───── */}
          <div className="space-y-3">
            {/* Metric cards full width */}
            <div className="grid grid-cols-3 gap-3">
              <MetricCard
                label="Needs attention"
                hint="3+ critical gaps"
                icon={<TrendingDown className="w-4 h-4" />}
                value={counts.needs}
                total={counts.all}
                iconColor="text-[#006BFF] dark:text-blue-400"
                hintColor="text-[#006BFF] dark:text-blue-400"
                isMounted={isMounted}
                index={0}
              />
              <MetricCard
                label="On track"
                hint="Meeting expectations"
                icon={<Minus className="w-4 h-4" />}
                value={counts.track}
                total={counts.all}
                iconColor="text-gray-400 dark:text-gray-500"
                hintColor="text-gray-500 dark:text-gray-400"
                isMounted={isMounted}
                index={1}
              />
              <MetricCard
                label="High performers"
                hint="4+ strengths"
                icon={<TrendingUp className="w-4 h-4" />}
                value={counts.high}
                total={counts.all}
                iconColor="text-emerald-500 dark:text-emerald-400"
                hintColor="text-emerald-600 dark:text-emerald-400"
                isMounted={isMounted}
                index={2}
              />
            </div>

            {/* Action buttons below cards */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate("/admin-add-course")}
                className="bg-[#006BFF] hover:bg-[#0057d9] text-white dark:bg-[#006BFF] dark:text-white dark:hover:bg-[#0057d9] h-9"
                style={fontGeo}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                New course
              </Button>
              <Button
                variant="outline"
                className="h-9 border-gray-300 dark:border-gray-600"
                style={fontGeo}
              >
                <Download className="w-4 h-4 mr-1.5" />
                Export cycle report
              </Button>
            </div>
          </div>

          {/* ───── Toolbar ───── */}
          <div className="rounded-2xl bg-white dark:bg-gray-800/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border-none px-4 py-3 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-65 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search people, teams, courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
                style={fontGeo}
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <FilterPill
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="All"
                count={counts.all}
              />
              <FilterPill
                active={filter === "needs-attention"}
                onClick={() => setFilter("needs-attention")}
                label="Needs attention"
                count={counts.needs}
              />
              <FilterPill
                active={filter === "on-track"}
                onClick={() => setFilter("on-track")}
                label="On track"
                count={counts.track}
              />
              <FilterPill
                active={filter === "high-performer"}
                onClick={() => setFilter("high-performer")}
                label="High performer"
                count={counts.high}
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="h-8 text-xs border border-gray-200 dark:border-gray-600 rounded-md px-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                style={fontGeo}
              >
                {teams.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <SortPill
                active={sort === "worst"}
                onClick={() => setSort("worst")}
                label="Worst first"
              />
              <SortPill
                active={sort === "az"}
                onClick={() => setSort("az")}
                label="A-Z"
              />
              <SortPill
                active={sort === "team"}
                onClick={() => setSort("team")}
                label="By team"
              />
            </div>
          </div>

          {/* ───── Main grid: table + right rail ───── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white dark:bg-gray-800/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border-none overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        <th
                          className="px-4 py-3 text-left font-semibold"
                          style={fontGeo}
                        >
                          Person
                        </th>
                        <th
                          className="px-4 py-3 text-left font-semibold"
                          style={fontGeo}
                        >
                          Team
                        </th>
                        <th
                          className="px-4 py-3 text-center font-semibold"
                          style={fontGeo}
                        >
                          Crit
                        </th>
                        <th
                          className="px-4 py-3 text-center font-semibold"
                          style={fontGeo}
                        >
                          Strg
                        </th>
                        <th
                          className="px-4 py-3 text-center font-semibold"
                          style={fontGeo}
                        >
                          Fit
                        </th>
                        <th
                          className="px-4 py-3 text-left font-semibold"
                          style={fontGeo}
                        >
                          Distribution
                        </th>
                        <th
                          className="px-4 py-3 text-left font-semibold"
                          style={fontGeo}
                        >
                          6-cycle trend
                        </th>
                        <th
                          className="px-4 py-3 text-left font-semibold"
                          style={fontGeo}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u) => {
                        const s = getStatus(u);
                        const isSelected = u.id === selectedId;
                        return (
                          <tr
                            key={u.id}
                            onClick={() => setSelectedId(u.id)}
                            className={`border-b border-gray-50 dark:border-gray-700/60 cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-50/50 dark:bg-blue-900/10"
                                : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                                  <span
                                    className="text-xs font-semibold text-gray-700 dark:text-gray-200"
                                    style={fontGeo}
                                  >
                                    {u.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p
                                      className="font-semibold text-gray-900 dark:text-white text-sm truncate"
                                      style={fontGeo}
                                    >
                                      {u.name}
                                    </p>
                                    {u.isManager && (
                                      <span
                                        className="text-[9px] uppercase tracking-wider border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded px-1 py-0.5"
                                        style={fontGeo}
                                      >
                                        Manager
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className="text-xs text-gray-400 dark:text-gray-500 truncate"
                                    style={fontGeo}
                                  >
                                    {u.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              className="px-4 py-3 text-gray-600 dark:text-gray-300"
                              style={fontGeo}
                            >
                              {u.team}
                            </td>
                            <td
                              className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white tabular-nums"
                              style={fontGeo}
                            >
                              {u.critical || "·"}
                            </td>
                            <td
                              className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white tabular-nums"
                              style={fontGeo}
                            >
                              {u.strength || "·"}
                            </td>
                            <td
                              className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white tabular-nums"
                              style={fontGeo}
                            >
                              {u.fit || "·"}
                            </td>
                            <td className="px-4 py-3">
                              <GapBar
                                critical={u.critical}
                                fit={u.fit}
                                strength={u.strength}
                                total={u.totalCompetencies}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <TrendSpark trend={u.trend} />
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-white dark:bg-gray-800 ${STATUS_PILL[s]}`}
                                style={fontGeo}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    s === "needs-attention"
                                      ? "bg-[#006BFF]"
                                      : s === "high-performer"
                                        ? "bg-emerald-500"
                                        : "bg-gray-400"
                                  }`}
                                />
                                {STATUS_LABEL[s]}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div
                      className="py-12 text-center text-sm text-gray-400"
                      style={fontGeo}
                    >
                      No people match these filters.
                    </div>
                  )}
                </div>

                {/* ───── Selected detail panel ───── */}
                {selected && (
                  <div className="border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Critical gaps */}
                    <div className="p-5 border-r border-gray-100 dark:border-gray-700">
                      <div className="flex items-baseline gap-2 mb-4">
                        <h3
                          className="text-sm font-semibold text-gray-900 dark:text-white"
                          style={fontGeo}
                        >
                          Critical gaps
                        </h3>
                        <span className="text-xs text-gray-400" style={fontGeo}>
                          {selected.gaps.length}
                        </span>
                      </div>
                      {selected.gaps.length === 0 ? (
                        <p className="text-xs text-gray-400" style={fontGeo}>
                          No critical gaps for this person.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {selected.gaps.map((g) => (
                            <div key={g.code}>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="text-[10px] font-mono text-gray-500 dark:text-gray-400"
                                  style={fontGeo}
                                >
                                  {g.code}
                                </span>
                                <span
                                  className={`text-[10px] uppercase tracking-wider ${TRACK_TAG[g.track]}`}
                                  style={fontGeo}
                                >
                                  {g.track}
                                </span>
                              </div>
                              <p
                                className="text-sm font-semibold text-gray-900 dark:text-white"
                                style={fontGeo}
                              >
                                {g.name}
                              </p>
                              <p
                                className="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                                style={fontGeo}
                              >
                                {g.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <MiniGapDots
                                  actual={g.actual}
                                  expected={g.expected}
                                />
                                <div
                                  className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400"
                                  style={fontGeo}
                                >
                                  <span>
                                    {g.actual} vs expected {g.expected}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-[#006BFF] dark:bg-blue-900/30 dark:text-blue-300 font-mono">
                                    GAP {g.actual - g.expected}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggested courses */}
                    <div className="p-5 border-r border-gray-100 dark:border-gray-700">
                      <div className="flex items-baseline gap-2 mb-4">
                        <h3
                          className="text-sm font-semibold text-gray-900 dark:text-white"
                          style={fontGeo}
                        >
                          Suggested courses
                        </h3>
                        <span className="text-xs text-gray-400" style={fontGeo}>
                          {selected.courses.length}
                        </span>
                      </div>
                      {selected.courses.length === 0 ? (
                        <p className="text-xs text-gray-400" style={fontGeo}>
                          Nothing to assign right now.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {selected.courses.map((c) => (
                            <div
                              key={c.id}
                              className="flex items-start justify-between gap-3"
                            >
                              <div className="min-w-0 flex-1">
                                <p
                                  className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500"
                                  style={fontGeo}
                                >
                                  For {c.forCode} · {c.forName}
                                </p>
                                <p
                                  className="text-sm font-semibold text-gray-900 dark:text-white"
                                  style={fontGeo}
                                >
                                  {c.title}
                                </p>
                                <p
                                  className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"
                                  style={fontGeo}
                                >
                                  {c.id} · {c.hours}h · {c.track}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openAssign(selected, c)}
                                className="h-7 text-xs"
                                style={fontGeo}
                              >
                                Assign
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Profile */}
                    <div className="p-5">
                      <h3
                        className="text-sm font-semibold text-gray-900 dark:text-white mb-4"
                        style={fontGeo}
                      >
                        Profile
                      </h3>
                      <dl className="space-y-2.5 text-xs" style={fontGeo}>
                        <ProfileRow label="Role" value={selected.role} />
                        <ProfileRow label="Team" value={selected.team} />
                        <ProfileRow label="Tenure" value={selected.tenure} />
                        <ProfileRow
                          label="Tracks"
                          value={`${selected.tracks.length} (${selected.tracks.join(" · ")})`}
                        />
                        <ProfileRow
                          label="Total competencies"
                          value={String(selected.totalCompetencies)}
                        />
                      </dl>
                      {selected.strengths.length > 0 && (
                        <div className="mt-5">
                          <p
                            className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2"
                            style={fontGeo}
                          >
                            Strengths ({selected.strengths.length})
                          </p>
                          <div className="space-y-1.5">
                            {selected.strengths.map((st) => (
                              <div
                                key={st.code}
                                className="flex items-center justify-between text-xs"
                                style={fontGeo}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5">
                                    {st.code}
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-200">
                                    {st.name}
                                  </span>
                                </div>
                                <span className="text-gray-400">+1</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right rail */}
            <aside className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-gray-800/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border-none p-4">
                <div className="flex items-baseline justify-between mb-3">
                  <h3
                    className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400"
                    style={fontGeo}
                  >
                    Attention queue
                  </h3>
                  <span className="text-xs text-gray-400" style={fontGeo}>
                    {attentionQueue.length}
                  </span>
                </div>
                <ul className="space-y-3">
                  {attentionQueue.map((u) => (
                    <li
                      key={u.id}
                      onClick={() => setSelectedId(u.id)}
                      className={`flex items-center gap-3 cursor-pointer rounded-lg p-1 -mx-1 transition-colors ${
                        u.id === selectedId
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/40"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                        <span
                          className="text-[11px] font-semibold text-gray-700 dark:text-gray-200"
                          style={fontGeo}
                        >
                          {u.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold text-gray-900 dark:text-white truncate"
                          style={fontGeo}
                        >
                          {u.name}
                        </p>
                        <p
                          className="text-[11px] text-gray-500 dark:text-gray-400 truncate"
                          style={fontGeo}
                        >
                          {u.team} · worst gap {u.worstGap}
                        </p>
                      </div>
                      <span
                        className="text-[11px] font-semibold text-[#006BFF] dark:text-blue-400 tabular-nums"
                        style={fontGeo}
                      >
                        {u.critical} crit
                      </span>
                    </li>
                  ))}
                  {attentionQueue.length === 0 && (
                    <li
                      className="text-xs text-gray-400 py-4 text-center"
                      style={fontGeo}
                    >
                      No one needs attention.
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl bg-white dark:bg-gray-800/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border-none p-4">
                <div className="flex items-baseline justify-between mb-3">
                  <h3
                    className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400"
                    style={fontGeo}
                  >
                    Org coverage
                  </h3>
                  <span
                    className="text-[10px] text-gray-400 uppercase tracking-wider"
                    style={fontGeo}
                  >
                    13 competencies
                  </span>
                </div>
                <div className="space-y-4">
                  {ORG_COVERAGE.map((group) => (
                    <div key={group.track}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p
                          className="text-xs font-semibold text-gray-900 dark:text-white"
                          style={fontGeo}
                        >
                          {group.track}
                        </p>
                        <p
                          className="text-[10px] text-gray-400"
                          style={fontGeo}
                        >
                          {group.critical} crit · {group.fit} fit ·{" "}
                          {group.strength} str
                        </p>
                      </div>
                      <ul className="space-y-1">
                        {group.items.map((it) => (
                          <li
                            key={it.code}
                            className="flex items-center justify-between text-xs gap-2"
                            style={fontGeo}
                          >
                            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 w-10 shrink-0">
                              {it.code}
                            </span>
                            <span className="text-gray-700 dark:text-gray-200 flex-1 truncate">
                              {it.name}
                            </span>
                            <CoverageBar level={it.level} max={it.max} />
                            <span className="text-[10px] text-gray-400 w-3 text-right tabular-nums">
                              {it.max}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-gray-800/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] border-none p-4">
                <h3
                  className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-3"
                  style={fontGeo}
                >
                  How to read
                </h3>
                <div className="space-y-2 text-xs" style={fontGeo}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-20 rounded-full overflow-hidden">
                      <div className="bg-[#006BFF] w-1/3" />
                      <div className="bg-gray-300 dark:bg-gray-600 w-1/3" />
                      <div className="bg-emerald-500 w-1/3" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      Gap distribution per person
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006BFF]" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Critical</span> —
                      evaluated below expected (gap &lt; 0)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Fit</span> — meeting
                      expected (gap = 0)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">Strength</span> —
                      exceeding expected (gap &gt; 0)
                    </span>
                  </div>
                </div>
                <p
                  className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 leading-relaxed"
                  style={fontGeo}
                >
                  GAP = manager evaluation − admin expected. Scored 1–4.
                  Managers also evaluated on the Managerial track.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Assign Course Modal
// ─────────────────────────────────────────────────────────────────────────────

function AssignCourseModal({
  user,
  course,
  gap,
  onClose,
}: {
  user: UserIDP;
  course: SuggestedCourse;
  gap: CompetencyGap | undefined;
  onClose: () => void;
}) {
  const [dueBy, setDueBy] = useState("In 6 weeks");
  const [note, setNote] = useState("Recommended after IDP review.");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <span
            className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
            style={fontGeo}
          >
            Assign course
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">
            {/* TO */}
            <div className="flex gap-6">
              <span
                className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 w-20 pt-1 shrink-0"
                style={fontGeo}
              >
                To
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <span
                    className="text-xs font-semibold text-gray-700 dark:text-gray-200"
                    style={fontGeo}
                  >
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900 dark:text-white"
                    style={fontGeo}
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-[11px] text-gray-500 dark:text-gray-400"
                    style={fontGeo}
                  >
                    {user.role} · {user.team}
                  </p>
                </div>
              </div>
            </div>

            {/* COURSE */}
            <div className="flex gap-6">
              <span
                className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 w-20 pt-1 shrink-0"
                style={fontGeo}
              >
                Course
              </span>
              <div>
                <p
                  className="text-sm font-semibold text-gray-900 dark:text-white"
                  style={fontGeo}
                >
                  {course.title}
                </p>
                <p
                  className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"
                  style={fontGeo}
                >
                  {course.id} · {course.hours} hours · {course.track}
                </p>
              </div>
            </div>

            {/* CLOSES GAP */}
            {gap && (
              <div className="flex gap-6">
                <span
                  className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 w-20 pt-1 shrink-0"
                  style={fontGeo}
                >
                  Closes gap
                </span>
                <div>
                  <p
                    className="text-sm font-semibold text-gray-900 dark:text-white"
                    style={fontGeo}
                  >
                    {gap.code} · {gap.name}
                  </p>
                  <p
                    className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"
                    style={fontGeo}
                  >
                    Currently {gap.actual} / expected {gap.expected} · GAP{" "}
                    {gap.actual - gap.expected}
                  </p>
                </div>
              </div>
            )}

            {/* DUE BY */}
            <div className="flex gap-6 items-center">
              <span
                className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 w-20 shrink-0"
                style={fontGeo}
              >
                Due by
              </span>
              <input
                type="text"
                value={dueBy}
                onChange={(e) => setDueBy(e.target.value)}
                className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                style={fontGeo}
              />
            </div>

            {/* NOTE */}
            <div className="flex gap-6">
              <span
                className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 w-20 pt-1 shrink-0"
                style={fontGeo}
              >
                Note
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 resize-none"
                style={fontGeo}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9"
              style={fontGeo}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 bg-[#006BFF] hover:bg-[#0057d9] text-white dark:bg-[#006BFF] dark:text-white dark:hover:bg-[#0057d9]"
              style={fontGeo}
            >
              Assign course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Small subcomponents
// ─────────────────────────────────────────────────────────────────────────────

function MetricCard({
  label,
  hint,
  icon,
  value,
  total,
  iconColor,
  hintColor,
  isMounted,
  index,
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  value: number;
  total: number;
  iconColor: string;
  hintColor: string;
  isMounted: boolean;
  index: number;
}) {
  return (
    <Card
      className="p-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col justify-between h-35 text-left border-none shadow-none"
      style={{
        ...fontGeo,
        opacity: isMounted ? 1 : 0,
        transform: isMounted ? "translateY(0)" : "translateY(16px)",
        transition: `opacity .5s ease ${index * 80}ms, transform .5s ease ${index * 80}ms`,
      }}
    >
      <div className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <p className="text-[11px] text-gray-600 dark:text-gray-400 font-normal leading-tight">
            {label}
          </p>
          <span className={`${iconColor} shrink-0 ml-2`}>{icon}</span>
        </div>
        <h3 className="text-[24px] font-bold text-gray-700 dark:text-white leading-none">
          <AnimatedNumber value={isMounted ? value : 0} />
          <span className="text-gray-400 font-medium ml-1 text-[16px]">
            / {total}
          </span>
        </h3>
      </div>
      <p className={`text-[11px] font-normal ${hintColor}`}>{hint}</p>
    </Card>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 border ${
        active
          ? "bg-[#006BFF] text-white border-[#006BFF] dark:bg-[#006BFF] dark:text-white dark:border-[#006BFF]"
          : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
      }`}
      style={fontGeo}
    >
      {label}
      <span
        className={`text-[10px] tabular-nums ${
          active ? "text-white/70" : "text-gray-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function SortPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-md text-xs font-medium transition-colors border ${
        active
          ? "bg-[#006BFF] text-white border-[#006BFF] dark:bg-[#006BFF] dark:text-white dark:border-[#006BFF]"
          : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
      }`}
      style={fontGeo}
    >
      {label}
    </button>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </dt>
      <dd className="text-gray-800 dark:text-gray-200 text-right">{value}</dd>
    </div>
  );
}

export default AdminIDPPage;
