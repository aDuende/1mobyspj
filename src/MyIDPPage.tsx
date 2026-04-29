import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";

type CompetencyCategory = "Core" | "Managerial" | "Functional";

interface CompetencyRow {
  category: CompetencyCategory;
  name: string;
  expected: number; // set by Admin
  manager: number;  // set by Manager
}

const coreItems: CompetencyRow[] = [
  { category: "Core", name: "Create Impact",  expected: 3, manager: 2 },
  { category: "Core", name: "Take Ownership", expected: 3, manager: 3 },
  { category: "Core", name: "Adaptive",       expected: 3, manager: 4 },
  { category: "Core", name: "Collaboration",  expected: 3, manager: 2 },
];

const managerialItems: CompetencyRow[] = [
  { category: "Managerial", name: "Process", expected: 3, manager: 2 },
  { category: "Managerial", name: "Purpose", expected: 3, manager: 3 },
  { category: "Managerial", name: "People",  expected: 3, manager: 4 },
  { category: "Managerial", name: "Result",  expected: 3, manager: 2 },
];

const functionalItems: CompetencyRow[] = [
  { category: "Functional", name: "FC01 · Data Analysis",             expected: 3, manager: 2 },
  { category: "Functional", name: "FC02 · Stakeholder Communication", expected: 3, manager: 3 },
  { category: "Functional", name: "FC03 · Strategic Thinking",        expected: 3, manager: 3 },
  { category: "Functional", name: "FC04 · Project Execution",         expected: 4, manager: 4 },
  { category: "Functional", name: "FC05 · Process Improvement",       expected: 3, manager: 2 },
];

function getGap(row: CompetencyRow) {
  return row.manager - row.expected;
}

function getDevelopment(gap: number): { label: string; color: string; bg: string; icon: React.ReactNode } {
  if (gap < 0) return {
    label: "Critical",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    icon: <TrendingDown className="w-3.5 h-3.5" />,
  };
  if (gap > 0) return {
    label: "Strength",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
  };
  return {
    label: "Competency Fit",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: <Minus className="w-3.5 h-3.5" />,
  };
}

function ScoreDot({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i <= score ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
      ))}
      <span
        className="ml-1.5 text-[12px] font-semibold text-gray-700 dark:text-gray-200 tabular-nums"
        style={{ fontFamily: '"Geometrica", sans-serif' }}
      >
        {score}
      </span>
    </div>
  );
}

function CompetencyTable({ title, rows, color }: { title: string; rows: CompetencyRow[]; color: string }) {
  return (
    <div className="mb-6">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-3 ${color}`}
        style={{ fontFamily: '"Geometrica", sans-serif' }}>
        {title}
      </div>
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 bg-gray-50/80 dark:bg-black/60 border-b border-gray-200/60 dark:border-white/5">
          {["Competency", "Expected", "Manager", "GAP", "Development"].map((h) => (
            <div key={h} className="px-4 py-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 text-left"
              style={{ fontFamily: '"Geometrica", sans-serif' }}>
              {h}
            </div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, i) => {
          const gap = getGap(row);
          const dev = getDevelopment(gap);
          return (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 border-b last:border-b-0 border-gray-100 dark:border-white/5 bg-white dark:bg-neutral-950 hover:bg-gray-50/60 dark:hover:bg-neutral-800/30 transition-colors duration-150`}
            >
              <div className="px-4 py-3 text-[12px] font-medium text-gray-800 dark:text-gray-200 text-left"
                style={{ fontFamily: '"Geometrica", sans-serif' }}>
                {row.name}
              </div>
              <div className="px-4 py-3 flex items-center">
                <ScoreDot score={row.expected} />
              </div>
              <div className="px-4 py-3 flex items-center">
                <ScoreDot score={row.manager} />
              </div>
              <div className="px-4 py-3 flex items-center">
                <span className={`text-[12px] font-bold tabular-nums ${gap < 0 ? "text-rose-500" : gap > 0 ? "text-emerald-500" : "text-blue-500"}`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {gap > 0 ? `+${gap}` : gap}
                </span>
              </div>
              <div className="px-4 py-3 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${dev.color} ${dev.bg}`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {dev.icon}
                  {dev.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MyIDPPageProps {
  role?: "employee" | "manager" | "admin";
}

export default function MyIDPPage({ role = "employee" }: MyIDPPageProps) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (ms: number) => ({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity .5s ease-out ${ms}ms, transform .5s ease-out ${ms}ms`,
  });

  // Summary counts
  const allRows = role === "manager"
    ? [...coreItems, ...managerialItems, ...functionalItems]
    : [...coreItems, ...functionalItems];

  const critical = allRows.filter((r) => getGap(r) < 0).length;
  const strength = allRows.filter((r) => getGap(r) > 0).length;
  const fit      = allRows.filter((r) => getGap(r) === 0).length;

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-transparent">
      <div className="p-6 max-w-5xl mx-auto">

        {/* Title */}
        <div style={fadeUp(0)}>
          <h1
            className="text-[22px] font-semibold text-left text-gray-900 dark:text-white mb-1"
            style={{ fontFamily: '"Geometrica", sans-serif' }}
          >
            My IDP
          </h1>
          
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8" style={fadeUp(80)}>
          {[
            { label: "Critical", count: critical, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200/60 dark:border-rose-500/20", icon: <TrendingDown className="w-5 h-5" /> },
            { label: "Strength", count: strength, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200/60 dark:border-emerald-500/20", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Competency Fit", count: fit, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200/60 dark:border-blue-500/20", icon: <Minus className="w-5 h-5" /> },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-2xl border  ${s.bg} ${s.border} flex items-center gap-3`}>
              <div className={`${s.color}`}>{s.icon}</div>
              <div>
                <div className={`text-[22px] font-bold leading-none ${s.color}`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>{s.count}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-[11px] text-gray-500 dark:text-gray-400" style={fadeUp(120)}>
          <span style={{ fontFamily: '"Geometrica", sans-serif' }}>Score:</span>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= s ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"}`} />
                ))}
              </div>
              <span style={{ fontFamily: '"Geometrica", sans-serif' }}>= {s}</span>
            </div>
          ))}
        </div>

        {/* Tables */}
        <div style={fadeUp(160)}>
          <CompetencyTable
            title="Core"
            rows={coreItems}
            color="bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
          />
          {role === "manager" && (
            <CompetencyTable
              title="Managerial"
              rows={managerialItems}
              color="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
            />
          )}
          <CompetencyTable
            title="Functional"
            rows={functionalItems}
            color="bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
          />
        </div>

      </div>
    </div>
  );
}
