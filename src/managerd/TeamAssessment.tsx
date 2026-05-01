import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  gradeCode: string;
  position: string;
  level: number;
  avatarColor: string;
  initials: string;
  competencyScore: number;
  weeklyGain: number;
  evaluated: boolean;
}

interface CompetencyRow {
  name: string;
  expected: number;
  managerScore: number;
}

interface CompetencySection {
  label: string;
  badgeColor: string;
  rows: CompetencyRow[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GEO = { fontFamily: '"Geometrica", sans-serif' };

const TEAM: TeamMember[] = [
  {
    id: "tarin",
    firstName: "Tarin",
    lastName: "Chon",
    gradeCode: "EN 2",
    position: "Full Stack Dev",
    level: 2,
    avatarColor: "#e05c4b",
    initials: "TC",
    competencyScore: 3.6,
    weeklyGain: 2.5,
    evaluated: false,
  },
  {
    id: "emma",
    firstName: "Emma",
    lastName: "Horg",
    gradeCode: "EN 1",
    position: "UX/UI",
    level: 1,
    avatarColor: "#c4956a",
    initials: "EH",
    competencyScore: 3.2,
    weeklyGain: 2.5,
    evaluated: false,
  },
  {
    id: "sarah",
    firstName: "Sarah",
    lastName: "Nigh",
    gradeCode: "EN 2",
    position: "Business Analyst",
    level: 3,
    avatarColor: "#4a8fa8",
    initials: "SN",
    competencyScore: 3.8,
    weeklyGain: 2.5,
    evaluated: true,
  },
  {
    id: "jessica",
    firstName: "Jessica",
    lastName: "Kenn",
    gradeCode: "EN 1",
    position: "UX/UI",
    level: 2,
    avatarColor: "#7a5c4f",
    initials: "JK",
    competencyScore: 3.2,
    weeklyGain: 2.5,
    evaluated: false,
  },
  {
    id: "dustin",
    firstName: "Dustin",
    lastName: "Avia",
    gradeCode: "EN 1",
    position: "Full Stack Dev",
    level: 3,
    avatarColor: "#b08050",
    initials: "DA",
    competencyScore: 3.6,
    weeklyGain: 2.5,
    evaluated: false,
  },
  {
    id: "jacob",
    firstName: "Jacob",
    lastName: "Mola",
    gradeCode: "EN 1",
    position: "Full Stack Dev",
    level: 2,
    avatarColor: "#5a7260",
    initials: "JM",
    competencyScore: 3.2,
    weeklyGain: 2.5,
    evaluated: true,
  },
];

const DEFAULT_SECTIONS: CompetencySection[] = [
  {
    label: "Core",
    badgeColor: "bg-purple-100 text-purple-600",
    rows: [
      { name: "Create Impact", expected: 3, managerScore: 0 },
      { name: "Take Ownership", expected: 3, managerScore: 0 },
      { name: "Adaptive", expected: 3, managerScore: 0 },
      { name: "Collaboration", expected: 3, managerScore: 0 },
    ],
  },
  {
    label: "Managerial",
    badgeColor: "bg-amber-100 text-amber-600",
    rows: [
      { name: "Process", expected: 3, managerScore: 0 },
      { name: "Purpose", expected: 3, managerScore: 0 },
      { name: "People", expected: 3, managerScore: 0 },
      { name: "Result", expected: 3, managerScore: 0 },
    ],
  },
  {
    label: "Functional",
    badgeColor: "bg-blue-100 text-blue-600",
    rows: [
      { name: "FC01 · Data Analysis", expected: 3, managerScore: 0 },
      {
        name: "FC02 · Stakeholder Communication",
        expected: 3,
        managerScore: 0,
      },
      { name: "FC03 · Strategic Thinking", expected: 3, managerScore: 0 },
      { name: "FC04 · Project Execution", expected: 3, managerScore: 0 },
      { name: "FC05 · Process Improvement", expected: 3, managerScore: 0 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDevelopmentTag(gap: number) {
  if (gap > 0)
    return {
      label: "Strength",
      icon: "↗",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    };
  if (gap === 0)
    return {
      label: "Competency Fit",
      icon: "—",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    };
  return {
    label: "Critical",
    icon: "↘",
    color: "text-rose-600 bg-rose-50 border-rose-200",
  };
}

function getGapColor(gap: number) {
  if (gap > 0) return "text-emerald-600 font-bold";
  if (gap < 0) return "text-rose-600 font-bold";
  return "text-blue-500 font-bold";
}

// Dot rating component
function DotRating({
  value,
  max = 5,
  interactive = false,
  color = "#fc4c02",
  onClick,
}: {
  value: number;
  max?: number;
  interactive?: boolean;
  color?: string;
  onClick?: (v: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered !== null ? hovered : value;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          disabled={!interactive}
          onClick={() => onClick?.(i + 1)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(null)}
          className={`w-4 h-4 rounded-full transition-all duration-150 ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          style={{
            background:
              i < display
                ? interactive && hovered !== null
                  ? i < hovered
                    ? "#fc4c02"
                    : "#e5e7eb"
                  : color
                : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

// Medal badge
function MedalBadge({ level }: { level: number }) {
  const colors = ["", "#CD7F32", "#C0C0C0", "#FFD700"];
  const c = colors[Math.min(level, 3)] ?? "#FFD700";
  return (
    <div className="flex flex-col items-center gap-0 shrink-0">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shadow-md relative"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${c}ee, ${c}88)`,
          border: `2px solid ${c}`,
        }}
      >
        <div
          className="absolute inset-[2px] rounded-full"
          style={{ border: `1px solid ${c}aa` }}
        />
        <Award className="w-4 h-4 text-white drop-shadow" />
      </div>
      <div className="flex gap-0.5 -mt-0.5">
        <div
          className="w-2 h-3 rounded-b-sm"
          style={{ background: "#f43f5e" }}
        />
        <div
          className="w-2 h-3 rounded-b-sm"
          style={{ background: "#fb7185" }}
        />
      </div>
    </div>
  );
}

// ─── Assessment Form View ─────────────────────────────────────────────────────

function AssessmentForm({
  member,
  onBack,
  onSubmit,
}: {
  member: TeamMember;
  onBack: () => void;
  onSubmit: (memberId: string) => void;
}) {
  const [sections, setSections] = useState<CompetencySection[]>(
    JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  );
  const [comments, setComments] = useState<string[]>([""]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("assessment:subpage", {
        detail: { page: "Team Assessment" },
      }),
    );
    const handleBack = () => onBack();
    window.addEventListener("assessment:back", handleBack);
    return () => {
      window.dispatchEvent(
        new CustomEvent("assessment:subpage", { detail: { page: null } }),
      );
      window.removeEventListener("assessment:back", handleBack);
    };
  }, []); // eslint-disable-line

  const setScore = (sIdx: number, rIdx: number, score: number) => {
    setSections((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CompetencySection[];
      next[sIdx].rows[rIdx].managerScore = score;
      return next;
    });
  };

  const addComment = () => setComments((c) => [...c, ""]);
  const removeComment = (i: number) =>
    setComments((c) => c.filter((_, idx) => idx !== i));
  const updateComment = (i: number, val: string) =>
    setComments((c) => c.map((v, idx) => (idx === i ? val : v)));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(member.id);
    }, 1600);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-9 h-9 text-emerald-500" />
        </div>
        <p className="text-[18px] font-semibold text-gray-800" style={GEO}>
          Assessment submitted!
        </p>
        <p className="text-[13px] text-gray-400" style={GEO}>
          Redirecting back…
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-[#f8fafc] dark:bg-transparent min-h-screen"
      style={GEO}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-fit px-4 py-2 mb-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-sm text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer"
        style={GEO}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Team
      </button>

      {/* Profile card */}
      <div className="flex items-center gap-4 p-5 mb-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-[22px] font-bold shrink-0"
          style={{ background: member.avatarColor }}
        >
          {member.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[17px] font-bold text-gray-900 dark:text-white"
              style={GEO}
            >
              {member.firstName}.{member.lastName}
            </span>
            <span className="text-[12px] text-gray-400" style={GEO}>
              ({member.gradeCode})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
              style={{ background: "#fc4c02" }}
            >
              Level {member.level}
            </span>
            <span
              className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-[11px] font-medium"
              style={GEO}
            >
              {member.position}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span
            className="text-[22px] font-bold text-blue-600 dark:text-blue-400"
            style={GEO}
          >
            {member.competencyScore.toFixed(1)}
          </span>
          <span className="text-[12px] text-gray-400" style={GEO}>
            / 5.0
          </span>
        </div>
      </div>

      {/* Competency sections */}
      <div className="space-y-8 mb-8">
        {sections.map((section, sIdx) => (
          <div key={section.label}>
            {/* Section badge */}
            <div className="flex justify-center mb-4">
              <span
                className={`px-4 py-1 rounded-full text-[13px] font-semibold ${section.badgeColor}`}
                style={GEO}
              >
                {section.label}
              </span>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_160px_160px_70px_140px] gap-2 px-5 py-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/60 dark:bg-gray-900/30">
                {[
                  "Competency",
                  "Expected",
                  "Manager",
                  "GAP",
                  "Development",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-left"
                    style={GEO}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {section.rows.map((row, rIdx) => {
                const gap = row.managerScore - row.expected;
                const tag = getDevelopmentTag(gap);
                return (
                  <div
                    key={row.name}
                    className={`grid grid-cols-[1fr_160px_160px_70px_140px] gap-2 items-center px-5 py-3.5 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/[0.02] ${rIdx < section.rows.length - 1 ? "border-b border-gray-100 dark:border-white/5" : ""}`}
                  >
                    {/* Name */}
                    <span
                      className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 text-left"
                      style={GEO}
                    >
                      {row.name}
                    </span>

                    {/* Expected */}
                    <div className="flex items-center gap-2">
                      <DotRating value={row.expected} />
                      <span
                        className="text-[13px] font-semibold text-gray-700 dark:text-gray-300"
                        style={GEO}
                      >
                        {row.expected}
                      </span>
                    </div>

                    {/* Manager (interactive) */}
                    <div className="flex items-center gap-2">
                      <DotRating
                        value={row.managerScore}
                        interactive
                        onClick={(v) => setScore(sIdx, rIdx, v)}
                      />
                      <span
                        className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 min-w-[16px]"
                        style={GEO}
                      >
                        {row.managerScore > 0 ? row.managerScore : ""}
                      </span>
                    </div>

                    {/* GAP */}
                    <span
                      className={`text-[13px] ${row.managerScore > 0 ? getGapColor(gap) : "text-gray-300"}`}
                      style={GEO}
                    >
                      {row.managerScore > 0 ? (gap > 0 ? `+${gap}` : gap) : "—"}
                    </span>

                    {/* Development */}
                    {row.managerScore > 0 ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border w-fit ${tag.color}`}
                        style={GEO}
                      >
                        <span>{tag.icon}</span>
                        {tag.label}
                      </span>
                    ) : (
                      <span
                        className="text-[11px] text-gray-300 italic"
                        style={GEO}
                      >
                        Set score
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Comments section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[16px] font-semibold text-gray-900 dark:text-white"
            style={GEO}
          >
            Manager Comments
          </h3>
          <button
            onClick={addComment}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[12px] font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer border border-blue-200/60 dark:border-blue-800/40"
            style={GEO}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Comment Block
          </button>
        </div>

        <div className="space-y-3">
          {comments.map((comment, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-white/5">
                <span
                  className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"
                  style={GEO}
                >
                  Comment {i + 1}
                </span>
                {comments.length > 1 && (
                  <button
                    onClick={() => removeComment(i)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <textarea
                value={comment}
                onChange={(e) => updateComment(i, e.target.value)}
                placeholder="Write your feedback here…"
                rows={3}
                className="w-full px-4 py-3 text-[13px] text-gray-700 dark:text-gray-200 bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none focus:outline-none"
                style={GEO}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#006bff] hover:bg-blue-700 active:scale-[0.97] text-white text-[14px] font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 cursor-pointer"
          style={GEO}
        >
          <Send className="w-4 h-4" />
          Submit Assessment
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TeamAssessment() {
  const [team, setTeam] = useState<TeamMember[]>(TEAM);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const notEvaluated = team.filter((m) => !m.evaluated).length;
  const total = team.length;

  const handleSubmit = (memberId: string) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, evaluated: true } : m)),
    );
    setSelected(null);
  };

  if (selected) {
    return (
      <AssessmentForm
        member={selected}
        onBack={() => setSelected(null)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div
      className="p-6 bg-[#f8fafc] dark:bg-transparent min-h-screen"
      style={GEO}
    >
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-[20px] font-semibold text-[#08060d] dark:text-white mb-1"
          style={GEO}
        >
          Team Assessment
        </h1>
        <p className="text-[13px] text-gray-400 dark:text-gray-500" style={GEO}>
          Select a team member to evaluate their competencies
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Haven't evaluated */}
        <div className="flex text-left items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <p
              className="text-[28px] font-bold text-rose-500 leading-none"
              style={GEO}
            >
              {notEvaluated}
            </p>
            <p
              className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5"
              style={GEO}
            >
              Haven't Evaluated
            </p>
          </div>
        </div>

        {/* Total people */}
        <div className="flex text-left items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p
              className="text-[28px] font-bold text-blue-500 leading-none"
              style={GEO}
            >
              {total}
            </p>
            <p
              className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5"
              style={GEO}
            >
              Total Team Members
            </p>
          </div>
        </div>
      </div>

      {/* Member list */}
      <div className="flex flex-col gap-3">
        {team.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group ${m.evaluated ? "border-emerald-200/60 dark:border-emerald-800/30" : "border-gray-200/60 dark:border-white/5"}`}
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
                <span
                  className="text-[14px] font-semibold text-gray-900 dark:text-white"
                  style={GEO}
                >
                  {m.firstName}.{m.lastName}
                </span>
                <span
                  className="text-[11px] text-gray-400 dark:text-gray-500 font-medium"
                  style={GEO}
                >
                  ({m.gradeCode})
                </span>
                {m.evaluated && (
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/30"
                    style={GEO}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Evaluated
                  </span>
                )}
              </div>
              <p
                className="text-[11px] text-gray-500 dark:text-gray-400 mb-1"
                style={GEO}
              >
                {m.position}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[12px] font-medium text-gray-700 dark:text-gray-300"
                  style={GEO}
                >
                  Overall Competency Score{" "}
                  <strong>{m.competencyScore.toFixed(1)}</strong>
                </span>
                <span className="text-[12px] font-semibold text-emerald-500">
                  + {m.weeklyGain.toFixed(1)} This week
                </span>
              </div>
            </div>

            {/* Level + Medal */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <span
                className="text-[12px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap"
                style={GEO}
              >
                Level {m.level}
              </span>
              <MedalBadge level={m.level} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
