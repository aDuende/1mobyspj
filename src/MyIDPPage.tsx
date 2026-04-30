import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "./components/ui/card";

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
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: <Minus className="w-3.5 h-3.5" />,
  };
}

const AnimatedNumber = ({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 1000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function for smooth animation
      const easedProgress = progress * (2 - progress);
      const current = start + (end - start) * easedProgress;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </>
  );
};

function ScoreDot({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i <= score ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
      <span
        className="text-[12px] font-semibold text-gray-700 dark:text-gray-200 tabular-nums"
        style={{ fontFamily: '"Geometrica", sans-serif' }}
      >
        {score}
      </span>
    </div>
  );
}


function CompetencyTable({ title, rows, color }: { title: string; rows: CompetencyRow[]; color: string }) {
  return (
    <Card className="overflow-hidden border border-gray-200/60 dark:border-white/5 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-900/20 border-b border-gray-200/60 dark:border-white/5">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold ${color}`}
          style={{ fontFamily: '"Geometrica", sans-serif' }}>
          {title}
        </div>
      </div>

      {/* Table Grid */}
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50/50 dark:bg-gray-900/30">
          {["Competency", "Expected", "Manager", "GAP", "Development"].map((h) => (
            <div key={h} className="text-[11px] font-semibold text-gray-500 dark:text-gray-400"
              style={{ fontFamily: '"Geometrica", sans-serif' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {rows.map((row, i) => {
          const gap = getGap(row);
          const dev = getDevelopment(gap);
          return (
            <div
              key={i}
              className="grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-4 bg-white dark:bg-gray-800/50 hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors duration-150 items-center"
            >
              <div className="flex flex-col sm:block">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 sm:hidden mb-1"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>Competency</span>
                <div className="text-[13px] font-medium text-gray-800 dark:text-gray-200"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {row.name}
                </div>
              </div>
              
              <div className="flex flex-col sm:block">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 sm:hidden mb-1"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>Expected</span>
                <ScoreDot score={row.expected} />
              </div>
              
              <div className="flex flex-col sm:block">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 sm:hidden mb-1"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>Manager</span>
                <ScoreDot score={row.manager} />
              </div>
              
              <div className="flex flex-col sm:block">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 sm:hidden mb-1"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>GAP</span>
                <span className={`text-[13px] font-bold tabular-nums ${gap < 0 ? "text-rose-500" : gap > 0 ? "text-emerald-500" : "text-blue-500"}`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {gap > 0 ? `+${gap}` : gap}
                </span>
              </div>
              
              <div className="flex flex-col sm:block">
                <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 sm:hidden mb-1"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>Development</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${dev.color} ${dev.bg}`}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {dev.icon}
                  <span className="hidden sm:inline">{dev.label}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

interface MyIDPPageProps {
  role?: "employee" | "manager" | "admin";
}

export default function MyIDPPage({ role = "employee" }: MyIDPPageProps) {
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
    <div className="flex-1 overflow-auto bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="p-4 md:p-8 max-w-6xl mx-auto">

        {/* Header Section */}
        <div style={fadeUp(0)} className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                My IDP
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Track your development progress and identify areas for growth
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8" style={fadeUp(80)}>
          {[
            { 
              label: "Critical", 
              count: critical, 
              color: "text-rose-600 dark:text-rose-400", 
              bg: "from-rose-50 to-rose-50/50 dark:from-rose-900/20 dark:to-rose-900/10", 
              border: "border-rose-200/60 dark:border-rose-500/20", 
              icon: <TrendingDown className="w-5 h-5" /> 
            },
            { 
              label: "Strength", 
              count: strength, 
              color: "text-emerald-600 dark:text-emerald-400", 
              bg: "from-emerald-50 to-emerald-50/50 dark:from-emerald-900/20 dark:to-emerald-900/10", 
              border: "border-emerald-200/60 dark:border-emerald-500/20", 
              icon: <TrendingUp className="w-5 h-5" /> 
            },
            { 
              label: "Competency Fit", 
              count: fit, 
              color: "text-blue-600 dark:text-blue-400", 
              bg: "from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10", 
              border: "border-blue-200/60 dark:border-blue-500/20", 
              icon: <Minus className="w-5 h-5" /> 
            },
          ].map((s) => (
            <Card 
              key={s.label} 
              className={`bg-linear-to-br ${s.bg} border ${s.border} hover:shadow-md transition-all duration-300 p-6`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 ${s.color}`}>
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-3xl font-bold ${s.color} mb-1`}
                    style={{ fontFamily: '"Geometrica", sans-serif' }}>
                    <AnimatedNumber value={isMounted ? s.count : 0} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}>
                    {s.label}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Score Legend */}
        <div className="mb-8" style={fadeUp(120)}>
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 md:p-6 border border-gray-200/60 dark:border-white/5">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider"
              style={{ fontFamily: '"Geometrica", sans-serif' }}>
              Score Reference
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className={`w-2.5 h-2.5 rounded-full ${i <= s ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}>
                    Level {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competency Tables */}
        <div className="space-y-6" style={fadeUp(160)}>
          <CompetencyTable
            title="Core Competencies"
            rows={coreItems}
            color="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
          />
          {role === "manager" && (
            <CompetencyTable
              title="Managerial Competencies"
              rows={managerialItems}
              color="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
            />
          )}
          <CompetencyTable
            title="Functional Competencies"
            rows={functionalItems}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
          />
        </div>

      </div>
    </div>
  );
}
