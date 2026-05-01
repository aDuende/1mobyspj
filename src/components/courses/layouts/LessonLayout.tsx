import { useState, useRef, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const GEO: React.CSSProperties = { fontFamily: '"Geometrica", sans-serif' };

// ─── lesson data shape ─────────────────────────────────────────────────────
interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  watched?: boolean;
}

interface LessonLayoutProps {
  course: {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    videoUrl: string;
    thumbnail: string;
    rating: number;
    reviews: number;
    instructor: string;
    duration: string;
    lessons: number;
    modules: number;
    isFree: boolean;
    tags: string[];
    highlights: string[];
  };
}

// generate sidebar lesson list from the course
function buildLessons(course: LessonLayoutProps["course"]): Lesson[] {
  const ids = [
    "7Q17ubqLfaM",
    "BwuLxPH8IDs",
    "qw--VYLpxG4",
    "w7ejDZ8SWv8",
    "f2EqECiTBL8",
    "1Rs2ND1ryYc",
    "_uQrJ0TkZlc",
    "USjZcfj8yxE",
    "JJSoEo8JSnc",
    "SLwpqD8n3d0",
    "O6P86uwfdR0",
    "PkZNo7MFNFg",
  ];
  const durations = [
    "15:02",
    "22:18",
    "38:45",
    "12:30",
    "28:00",
    "19:55",
    "45:12",
    "10:08",
    "33:40",
    "18:25",
    "27:50",
    "14:10",
  ];
  return Array.from({ length: Math.min(course.lessons, 12) }, (_, i) => {
    const ytId = ids[i % ids.length];
    const videoUrl =
      i === 0 ? course.videoUrl : `https://www.youtube.com/embed/${ytId}`;
    const thumbId = i === 0 ? course.videoUrl.split("/embed/")[1] : ytId;
    return {
      id: `lesson-${i + 1}`,
      title:
        i === 0
          ? course.title
          : `${i + 1}. ${course.highlights?.[(i - 1) % 4] ?? "Lesson " + (i + 1)}`,
      duration: durations[i % durations.length],
      videoUrl,
      thumbnail: `https://i.ytimg.com/vi/${thumbId}/mqdefault.jpg`,
      watched: i < 2,
    };
  });
}

export default function LessonLayout({ course }: LessonLayoutProps) {
  const lessons = buildLessons(course);
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watchedIds, setWatchedIds] = useState<Set<string>>(
    new Set(lessons.filter((l) => l.watched).map((l) => l.id)),
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // mark current lesson as watched after 5 s
  useEffect(() => {
    const t = setTimeout(() => {
      setWatchedIds((prev) => new Set([...prev, activeLesson.id]));
    }, 5000);
    return () => clearTimeout(t);
  }, [activeLesson.id]);

  const progress = Math.round((watchedIds.size / lessons.length) * 100);

  return (
    <div
      className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#08060d] min-h-screen overflow-auto"
      style={GEO}
    >
      {/* ── main grid ── */}
      <div className="flex flex-col lg:flex-row gap-0 flex-1 min-h-0">
        {/* LEFT: player + meta */}
        <div className="flex-1 min-w-0 p-4 lg:p-6 overflow-auto">
          {/* Player */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] mb-4">
            <iframe
              ref={iframeRef}
              key={activeLesson.id}
              src={`${activeLesson.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full"
              title={activeLesson.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>

          {/* Title row */}
          <h3
            className="text-[14px] text-left font-semibold text-gray-900 dark:text-white leading-snug mb-2"
            style={GEO}
          >
            {activeLesson.title}
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#fc4c02] to-orange-400 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p
                  className="text-[11px] font-semibold text-gray-800 dark:text-white"
                  style={GEO}
                >
                  {course.instructor}
                </p>
                <p
                  className="text-[10px] text-gray-500 dark:text-gray-400"
                  style={GEO}
                >
                  {course.reviews.toLocaleString()} learners
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                  liked
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400"
                    : "border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {liked ? "Liked" : "Like"}
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-[12px] font-medium transition-all duration-200 cursor-pointer">
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-[12px] font-medium transition-all duration-200 cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                  saved
                    ? "bg-[#fc4c02]/10 border-[#fc4c02]/30 text-[#fc4c02]"
                    : "border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {saved ? "Saved" : "Save"}
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200/60 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[11px] text-gray-500 dark:text-gray-400"
                style={GEO}
              >
                Course progress
              </span>
              <span
                className="text-[11px] font-semibold text-[#fc4c02]"
                style={GEO}
              >
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#fc4c02] rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] p-3">
            <div
              className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400 mb-3"
              style={GEO}
            >
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-[12px]">
                {course.rating} ★
              </span>
              <span>{course.reviews.toLocaleString()} reviews</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.duration}
              </span>
              <span>{course.lessons} lessons</span>
            </div>
            <p
              className={`text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed ${showMore ? "" : "line-clamp-3"}`}
              style={GEO}
            >
              {course.fullDescription}
            </p>
            <button
              onClick={() => setShowMore((v) => !v)}
              className="flex items-center gap-1 mt-2 text-[11px] font-medium text-[#006bff] cursor-pointer hover:underline"
              style={GEO}
            >
              {showMore ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Show more
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: lesson list */}
        <div className="w-full lg:w-90 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200/60 dark:border-white/5 bg-white dark:bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-200/60 dark:border-white/5">
            <p
              className="text-[13px] font-semibold text-gray-800 dark:text-white"
              style={GEO}
            >
              Course contents
            </p>
            <p
              className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5"
              style={GEO}
            >
              {lessons.length} lessons · {course.duration}
            </p>
          </div>
          <div className="overflow-y-auto flex-1">
            {lessons.map((lesson, i) => {
              const isActive = lesson.id === activeLesson.id;
              const isDone = watchedIds.has(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full flex items-start gap-3 p-3 text-left transition-all duration-200 cursor-pointer border-b border-gray-100 dark:border-white/5 last:border-b-0 ${
                    isActive
                      ? "bg-[#fc4c02]/8 dark:bg-[#fc4c02]/10"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {/* thumbnail */}
                  <div className="relative shrink-0 w-25 h-14 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[11px] font-medium leading-tight line-clamp-2 ${
                        isActive
                          ? "text-[#fc4c02]"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                      style={GEO}
                    >
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span
                        className="text-[10px] text-gray-500 dark:text-gray-400"
                        style={GEO}
                      >
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  {/* done indicator */}
                  {isDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                  {!isDone && (
                    <span
                      className="text-[10px] text-gray-400 dark:text-gray-600 shrink-0 mt-0.5 tabular-nums"
                      style={GEO}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
