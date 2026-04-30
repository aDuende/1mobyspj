import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type CompetencyCategory = "Core" | "Managerial" | "Functional";
type ViewCategory = "Core" | "Managerial" | "Functional";

interface CompetencyRow {
  category: CompetencyCategory;
  name: string;
  expected: number;
  manager: number;
}

const coreItems: CompetencyRow[] = [
  { category: "Core", name: "Create Impact", expected: 3, manager: 2 },
  { category: "Core", name: "Take Ownership", expected: 3, manager: 3 },
  { category: "Core", name: "Adaptive", expected: 3, manager: 4 },
  { category: "Core", name: "Collaboration", expected: 3, manager: 2 },
];

const managerialItems: CompetencyRow[] = [
  { category: "Managerial", name: "Process", expected: 3, manager: 2 },
  { category: "Managerial", name: "Purpose", expected: 3, manager: 3 },
  { category: "Managerial", name: "People", expected: 3, manager: 4 },
  { category: "Managerial", name: "Result", expected: 3, manager: 2 },
];

const functionalItems: CompetencyRow[] = [
  { category: "Functional", name: "FC01 · Data Analysis", expected: 3, manager: 2 },
  { category: "Functional", name: "FC02 · Stakeholder Communication", expected: 3, manager: 3 },
  { category: "Functional", name: "FC03 · Strategic Thinking", expected: 3, manager: 3 },
  { category: "Functional", name: "FC04 · Project Execution", expected: 4, manager: 4 },
  { category: "Functional", name: "FC05 · Process Improvement", expected: 3, manager: 2 },
];

function getGap(row: CompetencyRow) {
  return row.manager - row.expected;
}

function getDevelopment(gap: number): { label: string; color: string; bg: string; icon: React.ReactNode } {
  if (gap < 0) return { label: "Critical", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", icon: <TrendingDown className="w-3.5 h-3.5" /> };
  if (gap > 0) return { label: "Strength", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: <TrendingUp className="w-3.5 h-3.5" /> };
  return { label: "Competency Fit", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", icon: <Minus className="w-3.5 h-3.5" /> };
}

function ScoreDot({ score }: { score: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= score ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"}`} />
      ))}
      <span className="ml-1 min-w-[14px] text-[12px] font-semibold text-gray-700 dark:text-gray-200 tabular-nums" style={{ fontFamily: '"Geometrica", sans-serif' }}>
        {score}
      </span>
    </div>
  );
}

function CompetencyTable({ title, rows, color, extra }: { title: string; rows: CompetencyRow[]; color: string; extra?: React.ReactNode }) {
  const columns = "grid-cols-[minmax(340px,1.2fr)_140px_140px_100px_180px]";

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ${color}`} style={{ fontFamily: '"Geometrica", sans-serif' }}>
          {title}
        </div>
        {extra}
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] dark:border-white/5 dark:bg-gray-800">
        <div className={`grid ${columns} items-center border-b border-gray-200/60 bg-gray-50/80 dark:border-white/5 dark:bg-gray-900/60`}>
          <div className="px-5 py-4 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>Competency</div>
          <div className="px-5 py-4 text-center text-[11px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>Expected</div>
          <div className="px-5 py-4 text-center text-[11px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>Manager</div>
          <div className="px-5 py-4 text-center text-[11px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>GAP</div>
          <div className="px-5 py-4 text-left text-[11px] font-semibold text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>Development</div>
        </div>

        {rows.map((row, i) => {
          const gap = getGap(row);
          const dev = getDevelopment(gap);

          return (
            <div key={i} className={`grid ${columns} min-h-[64px] items-center border-b border-gray-100 bg-white transition-colors duration-150 last:border-b-0 hover:bg-gray-50/60 dark:border-white/5 dark:bg-gray-800 dark:hover:bg-gray-700/30`}>
              <div className="px-5 py-4 text-left text-[12px] font-medium text-gray-800 dark:text-gray-200" style={{ fontFamily: '"Geometrica", sans-serif' }}>
                {row.name}
              </div>

              <div className="px-5 py-4 flex items-center justify-center">
                <ScoreDot score={row.expected} />
              </div>

              <div className="px-5 py-4 flex items-center justify-center">
                <ScoreDot score={row.manager} />
              </div>

              <div className="px-5 py-4 flex items-center justify-center">
                <span className={`min-w-[24px] text-center text-[12px] font-bold tabular-nums ${gap < 0 ? "text-rose-500" : gap > 0 ? "text-emerald-500" : "text-blue-500"}`} style={{ fontFamily: '"Geometrica", sans-serif' }}>
                  {gap > 0 ? `+${gap}` : gap}
                </span>
              </div>

              <div className="px-5 py-4 flex items-center justify-start">
                <span className={`inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${dev.color} ${dev.bg}`} style={{ fontFamily: '"Geometrica", sans-serif' }}>
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
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ViewCategory>("Core");

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (ms: number) => ({
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity .5s ease-out ${ms}ms, transform .5s ease-out ${ms}ms`,
  });

  const allRows = role === "manager" ? [...coreItems, ...managerialItems, ...functionalItems] : [...coreItems, ...functionalItems];
  const critical = allRows.filter((r) => getGap(r) < 0).length;
  const strength = allRows.filter((r) => getGap(r) > 0).length;
  const fit = allRows.filter((r) => getGap(r) === 0).length;

  const categoryOptions: { label: ViewCategory; rows: CompetencyRow[]; color: string }[] = [
    { label: "Core", rows: coreItems, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
    ...(role === "manager" ? [{ label: "Managerial" as ViewCategory, rows: managerialItems, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" }] : []),
    { label: "Functional", rows: functionalItems, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  ];

  const selectedOption = categoryOptions.find((c) => c.label === selectedCategory) ?? categoryOptions[0];

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-transparent">
      <div className="mx-auto max-w-5xl p-6">
        <div style={fadeUp(0)}>
          <h1 className="mb-1 text-left text-[22px] font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '"Geometrica", sans-serif' }}>
            My IDP
          </h1>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4" style={fadeUp(80)}>
          {[
            { label: "Critical", count: critical, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", border: "border-rose-200/60 dark:border-rose-500/20", icon: <TrendingDown className="h-5 w-5" /> },
            { label: "Strength", count: strength, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200/60 dark:border-emerald-500/20", icon: <TrendingUp className="h-5 w-5" /> },
            { label: "Competency Fit", count: fit, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200/60 dark:border-blue-500/20", icon: <Minus className="h-5 w-5" /> },
          ].map((s) => (
            <div key={s.label} className={`flex items-center gap-3 rounded-2xl border p-4 ${s.bg} ${s.border}`}>
              <div className={s.color}>{s.icon}</div>
              <div>
                <div className={`text-[22px] font-bold leading-none ${s.color}`} style={{ fontFamily: '"Geometrica", sans-serif' }}>{s.count}</div>
                <div className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400" style={{ fontFamily: '"Geometrica", sans-serif' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400" style={fadeUp(120)}>
          <span style={{ fontFamily: '"Geometrica", sans-serif' }}>Score:</span>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i <= s ? "bg-[#fc4c02]" : "bg-gray-200 dark:bg-gray-700"}`} />
                ))}
              </div>
              <span style={{ fontFamily: '"Geometrica", sans-serif' }}>= {s}</span>
            </div>
          ))}
        </div>

        <div style={fadeUp(160)}>
          <CompetencyTable
            title={selectedOption.label}
            rows={selectedOption.rows}
            color={selectedOption.color}
            extra={
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ViewCategory)}
                className="h-9 min-w-[160px] rounded-xl border border-gray-200 bg-white px-3 text-[12px] font-semibold text-gray-700 shadow-sm outline-none transition focus:border-[#fc4c02] focus:ring-2 focus:ring-[#fc4c02]/20 dark:border-white/10 dark:bg-gray-900 dark:text-gray-200"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {categoryOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            }
          />
        </div>
      </div>
    </div>
  );
}