import { useState, useEffect } from "react";
import { Plus, Trash2, Send, CheckCircle2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompetencyRow {
  name: string;
  selfScore: number;
}

interface CompetencySection {
  label: string;
  badgeColor: string;
  rows: CompetencyRow[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GEO = { fontFamily: '"Geometrica", sans-serif' };

const CORE_SECTION: CompetencySection = {
  label: "Core",
  badgeColor: "bg-purple-100 text-purple-600",
  rows: [
    { name: "Create Impact",  selfScore: 0 },
    { name: "Take Ownership", selfScore: 0 },
    { name: "Adaptive",       selfScore: 0 },
    { name: "Collaboration",  selfScore: 0 },
  ],
};

const MANAGERIAL_SECTION: CompetencySection = {
  label: "Managerial",
  badgeColor: "bg-amber-100 text-amber-600",
  rows: [
    { name: "Process", selfScore: 0 },
    { name: "Purpose", selfScore: 0 },
    { name: "People",  selfScore: 0 },
    { name: "Result",  selfScore: 0 },
  ],
};

const FUNCTIONAL_SECTION: CompetencySection = {
  label: "Functional",
  badgeColor: "bg-blue-100 text-blue-600",
  rows: [
    { name: "FC01 · Data Analysis",             selfScore: 0 },
    { name: "FC02 · Stakeholder Communication", selfScore: 0 },
    { name: "FC03 · Strategic Thinking",        selfScore: 0 },
    { name: "FC04 · Project Execution",         selfScore: 0 },
    { name: "FC05 · Process Improvement",       selfScore: 0 },
  ],
};

// ─── Dot Rating ───────────────────────────────────────────────────────────────

function DotRating({
  value, max = 5, interactive = false, color = "#fc4c02", onClick,
}: {
  value: number; max?: number; interactive?: boolean; color?: string;
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
                  ? i < hovered ? "#fc4c02" : "#e5e7eb"
                  : color
                : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}

// ─── Sub-page effect (notifies dashboard breadcrumb) ─────────────────────────

function SubPageEffect({ name, onBack }: { name: string; onBack?: () => void }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("assessment:subpage", { detail: { page: name } }));
    const handleBack = () => onBack?.();
    window.addEventListener("assessment:back", handleBack);
    return () => {
      window.dispatchEvent(new CustomEvent("assessment:subpage", { detail: { page: null } }));
      window.removeEventListener("assessment:back", handleBack);
    };
  }, [name]); // eslint-disable-line
  return null;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SelfAssessmentPage({
  role = "employee",
  assessmentTitle = "Self Assessment",
  assignedBy = "jadi.vort",
  onBack,
}: {
  role?: "employee" | "manager";
  assessmentTitle?: string;
  assignedBy?: string;
  onBack?: () => void;
}) {
  const initialSections: CompetencySection[] = (() => {
    const base = [CORE_SECTION, FUNCTIONAL_SECTION];
    if (role === "manager") {
      return [CORE_SECTION, MANAGERIAL_SECTION, FUNCTIONAL_SECTION];
    }
    return base;
  })().map(s => JSON.parse(JSON.stringify(s)));

  const [sections, setSections] = useState<CompetencySection[]>(initialSections);
  const [comments, setComments] = useState<string[]>([""]);
  const [submitted, setSubmitted] = useState(false);

  const setScore = (sIdx: number, rIdx: number, score: number) => {
    setSections(prev => {
      const next: CompetencySection[] = JSON.parse(JSON.stringify(prev));
      next[sIdx].rows[rIdx].selfScore = score;
      return next;
    });
  };

  const addComment    = () => setComments(c => [...c, ""]);
  const removeComment = (i: number) => setComments(c => c.filter((_, idx) => idx !== i));
  const updateComment = (i: number, val: string) =>
    setComments(c => c.map((v, idx) => (idx === i ? val : v)));

  const handleSubmit = () => setSubmitted(true);

  // ── Submitted state ──
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" style={GEO}>
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-9 h-9 text-emerald-500" />
        </div>
        <p className="text-[18px] font-semibold text-gray-800 dark:text-white" style={GEO}>
          Self Assessment submitted!
        </p>
        <p className="text-[13px] text-gray-400" style={GEO}>
          Your responses have been recorded.
        </p>

      </div>
    );
  }

  // ── Form ──
  return (
    <div className="p-6 bg-[#f8fafc] dark:bg-gray-900 min-h-screen" style={GEO}>

      {/* Notify dashboard of sub-page */}
      <SubPageEffect name={assessmentTitle} onBack={onBack} />

      {/* Header */}
      <div className="mb-6 text-left">
        <h1 className="text-[20px] font-semibold text-[#08060d] dark:text-white mb-1" style={GEO}>
          {assessmentTitle}
        </h1>
        <p className="text-[13px] text-gray-400 dark:text-gray-500" style={GEO}>
          Assign by {assignedBy}
        </p>
      </div>

      {/* Role badge */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
            role === "manager"
              ? "bg-amber-100 text-amber-700"
              : "bg-purple-100 text-purple-700"
          }`}
          style={GEO}
        >
          {role === "manager" ? "Manager" : "Employee"} Self-Assessment
        </span>
        <span className="text-[12px] text-gray-400" style={GEO}>
          {role === "manager"
            ? "Evaluate Core, Managerial & Functional competencies"
            : "Evaluate Core & Functional competencies"}
        </span>
      </div>

      {/* Competency sections */}
      <div className="space-y-8 mb-8">
        {sections.map((section, sIdx) => (
          <div key={section.label}>
            {/* Section badge */}
            <div className="flex justify-start mb-4">
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
              <div className="grid grid-cols-[1fr_200px] gap-2 px-5 py-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/60 dark:bg-gray-900/30">
                {["Competency", "Self"].map(h => (
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
              {section.rows.map((row, rIdx) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-[1fr_200px] gap-2 items-center px-5 py-3.5 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/2 ${
                    rIdx < section.rows.length - 1
                      ? "border-b border-gray-100 dark:border-white/5"
                      : ""
                  }`}
                >
                  {/* Name */}
                  <span
                    className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 text-left"
                    style={GEO}
                  >
                    {row.name}
                  </span>

                  {/* Self score (interactive) */}
                  <div className="flex items-center gap-2">
                    <DotRating
                      value={row.selfScore}
                      interactive
                      onClick={(v) => setScore(sIdx, rIdx, v)}
                    />
                    <span
                      className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 min-w-4"
                      style={GEO}
                    >
                      {row.selfScore > 0 ? row.selfScore : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white" style={GEO}>
            Self-Reflection Comments
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
                onChange={e => updateComment(i, e.target.value)}
                placeholder="Write your self-reflection here…"
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
          Submit Self Assessment
        </button>
      </div>
    </div>
  );
}
