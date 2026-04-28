import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Bookmark,
  Share2,
  Download,
} from "lucide-react";

const GEO: React.CSSProperties = { fontFamily: '"Geometrica", sans-serif' };

// Simulated "pages" of book content
const MOCK_PAGES: string[] = [
  `Chapter 1: Clean Code\n\nWriting clean code is not just about making it work. It's about making it readable, maintainable, and extensible.\n\nThe most important rule of clean code is that it should read like well-written prose. Every line should tell a story. Every function should do one thing and do it well.\n\nWhy does clean code matter? Because code is read far more often than it's written. A thoughtful developer spends 10 minutes writing a function that other developers might read 100 times over the next 5 years.`,
  `Chapter 2: Meaningful Names\n\nUse intention-revealing names. The name of a variable, function, or class should answer all the big questions. It should tell you why it exists, what it does, and how it is used.\n\nIf a name requires a comment, then the name does not reveal its intent.\n\n❌ int d; // elapsed time in days\n✅ int elapsedTimeInDays;\n\nAvoid disinformation. Avoid leaving false clues that obscure the meaning of code.`,
  `Chapter 3: Functions\n\nFunctions should be small. They should do one thing. They should do it well. They should do it only.\n\nThe first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that.\n\nFunctions should not be 100 lines long. Functions should hardly ever be 20 lines long. Ideally a function is 5–10 lines.\n\nUse descriptive names. A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment.`,
  `Chapter 4: Comments\n\nNothing can be quite so helpful as a well-placed comment. Nothing can clutter up a module more than frivolous dogmatic comments.\n\nThe proper use of comments is to compensate for our failure to express ourselves in code. Note that I use the word failure.\n\nEvery time you write a comment, you should grimace and feel the failure of your ability to express yourself in code.\n\nTruth can only be found in one place: the code. Only the code can tell you what it truly does.`,
  `Chapter 5: Formatting\n\nCode formatting is about communication, and communication is the professional developer's first order of business.\n\nThe newspaper metaphor: A well-written newspaper article is organized like a pyramid — the higher up you go, the more important the concept. The fine-grained details should appear below.\n\nVertical openness: Use blank lines to separate concepts. This is a good signal for where one concept ends and another begins.\n\nHorizontal openness: Use whitespace to associate things that are strongly related.`,
];

interface ReadingItem {
  id: string;
  title: string;
  author: string;
  pages: number;
  category: string;
  thumbnail: string;
  pdfUrl?: string;
}

interface ReadingLayoutProps {
  item: ReadingItem;
}

export default function ReadingLayout({ item }: ReadingLayoutProps) {
  const navigate = useNavigate();
  const [reading, setReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const totalPages = MOCK_PAGES.length;
  const progress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;

  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div
      className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#08060d] min-h-screen"
      style={GEO}
    >
      {/* ── overview / hero ── */}
      {!reading && (
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-4 lg:p-8">
            {/* Book hero card */}
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden mb-6">
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Cover */}
                <div className="sm:w-50 shrink-0 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover sm:max-h-70"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#fc4c02] text-[11px] font-semibold">
                      <FileText className="w-3 h-3" />
                      PDF · {item.pages} pages
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      {item.category}
                    </div>
                  </div>
                  <h1 className="text-[20px] font-semibold text-gray-900 dark:text-white mb-1.5" style={GEO}>
                    {item.title}
                  </h1>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-4" style={GEO}>
                    by {item.author}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Pages", value: item.pages },
                      { label: "Category", value: item.category },
                      { label: "Format", value: "PDF / eBook" },
                      { label: "Language", value: "English" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide" style={GEO}>
                          {label}
                        </span>
                        <span className="text-[12px] font-medium text-gray-700 dark:text-gray-200" style={GEO}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => { setCurrentPage(0); setReading(true); }}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#fc4c02] hover:bg-[#e04400] text-white text-[12px] font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.97]"
                      style={GEO}
                    >
                      <BookOpen className="w-4 h-4" />
                      Start Reading
                    </button>
                    <button
                      onClick={() => setBookmarked((v) => !v)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                        bookmarked
                          ? "bg-[#fc4c02]/10 border-[#fc4c02]/30 text-[#fc4c02]"
                          : "border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      style={GEO}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      {bookmarked ? "Saved" : "Save"}
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-[12px] font-medium transition-all duration-200 cursor-pointer"
                      style={GEO}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 text-[12px] font-medium transition-all duration-200 cursor-pointer"
                      style={GEO}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of contents (simulated) */}
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-5">
              <h2 className="text-[13px] font-semibold text-gray-800 dark:text-white mb-4" style={GEO}>
                Table of Contents
              </h2>
              <div className="flex flex-col gap-1">
                {MOCK_PAGES.map((page, i) => {
                  const titleLine = page.split("\n")[0];
                  return (
                    <button
                      key={i}
                      onClick={() => { setCurrentPage(i); setReading(true); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors duration-150 text-left group cursor-pointer"
                    >
                      <span className="w-5 text-[10px] text-gray-400 dark:text-gray-600 shrink-0 tabular-nums" style={GEO}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[12px] text-gray-700 dark:text-gray-300 group-hover:text-[#fc4c02] transition-colors duration-150" style={GEO}>
                        {titleLine}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-[#fc4c02] transition-colors duration-150 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── reader ── */}
      {reading && (
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Progress */}
          <div className="px-4 pt-3 pb-0">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500" style={GEO}>
                  Reading progress
                </span>
                <span className="text-[10px] font-semibold text-[#fc4c02]" style={GEO}>
                  {progress}%
                </span>
              </div>
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#fc4c02] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 flex items-start justify-center p-4 lg:p-8">
            <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] p-6 lg:p-10 min-h-100">
              <p
                className="text-[13px] text-gray-700 dark:text-gray-200 leading-[1.9] whitespace-pre-line"
                style={GEO}
              >
                {MOCK_PAGES[currentPage]}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="sticky bottom-0 px-4 pb-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-white/5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] px-4 py-3">
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-[12px] font-medium transition-all duration-200 cursor-pointer"
                style={GEO}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              {/* Page indicator */}
              <div className="flex items-center gap-1.5">
                {MOCK_PAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      i === currentPage
                        ? "w-5 bg-[#fc4c02]"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-[12px] font-medium transition-all duration-200 cursor-pointer"
                style={GEO}
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
