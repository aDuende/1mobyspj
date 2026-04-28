import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Lock,
  CheckCircle2,
  Layers,
  Terminal,
  AppWindow,
  FileText,
} from "lucide-react";

const GEO: React.CSSProperties = { fontFamily: '"Geometrica", sans-serif' };

interface Episode {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

interface Module {
  id: string;
  title: string;
  episodes: Episode[];
}

interface SeriesItem {
  id: string;
  title: string;
  description: string;
  modules: number;
  videos: number;
  category: string;
  thumbnail: string;
}

interface SeriesLayoutProps {
  item: SeriesItem;
}

// Generate mock module/episode data from item
function buildModules(item: SeriesItem): Module[] {
  const ytIds = [
    "PkZNo7MFNFg", "fBNz5xF-Kx4", "O6P86uwfdR0", "HXV3zeQKqGY",
    "BwuLxPH8IDs", "6OA9AjzX4k4", "7Q17ubqLfaM", "w7ejDZ8SWv8",
    "1Rs2ND1ryYc", "_uQrJ0TkZlc", "USjZcfj8yxE", "JJSoEo8JSnc",
    "SLwpqD8n3d0", "f2EqECiTBL8",
  ];
  const episodeTitles = [
    "Introduction & Setup",
    "Core Concepts",
    "Hands-on Practice",
    "Advanced Patterns",
    "Real-World Project",
  ];
  const durations = ["12:30", "18:45", "22:10", "15:55", "30:00", "08:20", "25:40"];

  let ytIdx = 0;
  return Array.from({ length: item.modules }, (_, mi) => {
    const epCount = Math.ceil(item.videos / item.modules) + (mi === 0 ? 0 : -1);
    return {
      id: `mod-${mi}`,
      title: `Module ${mi + 1}: ${episodeTitles[mi % episodeTitles.length]}`,
      episodes: Array.from({ length: Math.max(2, epCount) }, (__, ei) => {
        const yt = ytIds[ytIdx++ % ytIds.length];
        return {
          id: `ep-${mi}-${ei}`,
          title: `${mi + 1}.${ei + 1} ${episodeTitles[(mi + ei) % episodeTitles.length]}`,
          duration: durations[(mi + ei) % durations.length],
          videoUrl: `https://www.youtube.com/embed/${yt}`,
        };
      }),
    };
  });
}

export default function SeriesLayout({ item }: SeriesLayoutProps) {
  const modules = buildModules(item);

  // track which modules are expanded
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["mod-0"]));
  // track completed episodes — a user must finish ep N before ep N+1
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  // currently playing
  const [playing, setPlaying] = useState<Episode | null>(null);

  const toggleExpand = (modId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  // flatten all episodes in order for lock logic
  const allEpisodes = modules.flatMap((m) => m.episodes);

  const isUnlocked = (ep: Episode) => {
    const idx = allEpisodes.findIndex((e) => e.id === ep.id);
    if (idx === 0) return true;
    return completed.has(allEpisodes[idx - 1].id);
  };

  const markDone = (epId: string) => {
    setCompleted((prev) => new Set([...prev, epId]));
  };

  const CategoryIcon =
    item.category === "BACKEND"
      ? Terminal
      : item.category === "DATABASE"
      ? FileText
      : AppWindow;

  const totalCompleted = completed.size;
  const totalEps = allEpisodes.length;
  const progress = totalEps > 0 ? Math.round((totalCompleted / totalEps) * 100) : 0;

  return (
    <div
      className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#08060d] min-h-screen"
      style={GEO}
    >
      {/* ── video player overlay ── */}
      {playing && (
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="p-4 lg:p-6">
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] mb-4">
              <iframe
                key={playing.id}
                src={`${playing.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                title={playing.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
            <h1 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-4" style={GEO}>
              {playing.title}
            </h1>
            {/* Mark done button */}
            {!completed.has(playing.id) && (
              <button
                onClick={() => markDone(playing.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] font-medium transition-all duration-200 cursor-pointer shadow-sm"
                style={GEO}
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as complete
              </button>
            )}
            {completed.has(playing.id) && (
              <div className="flex items-center gap-2 text-emerald-500 text-[12px] font-medium" style={GEO}>
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── overview + modules ── */}
      {!playing && (
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            {/* Thumbnail hero */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] mb-6 group cursor-pointer"
              onClick={() => { const first = allEpisodes[0]; if (first) setPlaying(first); }}
            >
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  Series · {item.modules} modules · {item.videos} videos
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                <Layers className="w-3.5 h-3.5" /> Series
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                <CategoryIcon className="w-3.5 h-3.5" />
                {item.category.charAt(0) + item.category.slice(1).toLowerCase()}
              </div>
            </div>

            <h3 className="text-[22px] text-left font-semibold text-gray-900 dark:text-white mb-2" style={GEO}>
              {item.title}
            </h3>
            <p className="text-[13px] text-left text-gray-600 dark:text-gray-300 leading-relaxed mb-4" style={GEO}>
              {item.description}
            </p>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-gray-500 dark:text-gray-400" style={GEO}>
                  Progress
                </span>
                <span className="text-[11px] font-semibold text-[#fc4c02]" style={GEO}>
                  {totalCompleted}/{totalEps} complete · {progress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#fc4c02] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => { const first = allEpisodes[0]; if (first) setPlaying(first); }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#fc4c02] hover:bg-[#e04400] text-white text-[13px] font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.97] mb-6"
              style={GEO}
            >
              <Play className="w-4 h-4 fill-white" />
              Start Series
            </button>

            {/* Modules */}
            <div className="flex flex-col gap-3">
              {modules.map((mod) => {
                const modDone = mod.episodes.every((ep) => completed.has(ep.id));
                const isOpen = expanded.has(mod.id);
                const firstUnlocked = mod.episodes.find((ep) => !completed.has(ep.id) && isUnlocked(ep));

                return (
                  <div
                    key={mod.id}
                    className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    {/* Module header */}
                    <button
                      onClick={() => toggleExpand(mod.id)}
                      className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-gray-50/60 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        modDone
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}>
                        {modDone
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <Layers className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-gray-800 dark:text-white" style={GEO}>
                          {mod.title}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5" style={GEO}>
                          {mod.episodes.length} episodes
                          {firstUnlocked ? ` · next: ${firstUnlocked.title}` : ""}
                        </p>
                      </div>
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                    </button>

                    {/* Episodes */}
                    {isOpen && (
                      <div className="border-t border-gray-100 dark:border-white/5">
                        {mod.episodes.map((ep) => {
                          const unlocked = isUnlocked(ep);
                          const done = completed.has(ep.id);
                          return (
                            <button
                              key={ep.id}
                              disabled={!unlocked}
                              onClick={() => unlocked && setPlaying(ep)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 dark:border-white/5 last:border-b-0 transition-all duration-150 ${
                                unlocked
                                  ? "cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-700/30"
                                  : "cursor-not-allowed opacity-50"
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                done
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500"
                                  : unlocked
                                  ? "bg-[#fc4c02]/10 text-[#fc4c02]"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                              }`}>
                                {done
                                  ? <CheckCircle2 className="w-3.5 h-3.5" />
                                  : unlocked
                                  ? <Play className="w-3 h-3 fill-current ml-0.5" />
                                  : <Lock className="w-3 h-3" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[12px] font-medium leading-tight ${
                                  done
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-gray-800 dark:text-gray-200"
                                }`} style={GEO}>
                                  {ep.title}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5" style={GEO}>
                                  {ep.duration}
                                </p>
                              </div>
                              {!unlocked && (
                                <span className="text-[10px] text-gray-400 shrink-0" style={GEO}>
                                  Locked
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
