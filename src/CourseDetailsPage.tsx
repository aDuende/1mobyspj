import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  BarChart,
  Star,
  Users,
  CheckCircle,
  Play,
  Terminal,
  AppWindow,
} from "lucide-react";
import { Card } from "./components/ui/card";

interface CourseDetailsPageProps {
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
  onBack: () => void;
}

export default function CourseDetailsPage({
  course,
  onBack,
}: CourseDetailsPageProps) {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload video after a short delay
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    onBack();
    navigate("/my-idp-learning");
  };

  return (
    <div className="flex-1 bg-[#f8fafc] dark:bg-[#08060d] min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 active:scale-95 shadow-sm border border-gray-200 dark:border-gray-700"
          style={{ fontFamily: '"Geometrica", sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-[13px] font-medium">Back to Learning</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border-none shadow-lg">
              <div className="relative w-full bg-black aspect-video">
                {isVideoLoaded ? (
                  <iframe
                    src={`${course.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
                    className="absolute inset-0 w-full h-full"
                    title={course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsVideoLoaded(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-[#006bff] ml-1" fill="currentColor" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* Course Info */}
            <Card className="p-6 rounded-2xl bg-white dark:bg-gray-800 border-none shadow-lg">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="8.5" cy="8.5" r="5.2" />
                    <circle cx="15.5" cy="8.5" r="5.2" />
                    <circle cx="8.5" cy="15.5" r="5.2" />
                    <circle cx="15.5" cy="15.5" r="5.2" />
                  </svg>
                  Course
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[12px] font-semibold tracking-wide">
                  {course.category === "BACKEND" ? (
                    <Terminal className="w-4 h-4" />
                  ) : (
                    <AppWindow className="w-4 h-4" />
                  )}
                  {course.category.charAt(0).toUpperCase() +
                    course.category.slice(1).toLowerCase()}
                </div>
                {course.isFree && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-[12px] font-semibold tracking-wide">
                    Free
                  </div>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-[28px] font-bold text-gray-900 dark:text-white mb-3 leading-tight"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {course.title}
              </h1>

              {/* Description */}
              <p
                className="text-[14px] text-gray-600 dark:text-gray-400 mb-5 leading-relaxed"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {course.fullDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span
                    className="text-[14px] font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    {course.rating}
                  </span>
                  <span
                    className="text-[13px] text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span
                    className="text-[13px] text-gray-600 dark:text-gray-400"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    {course.instructor}
                  </span>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-5">
                <h3
                  className="text-[18px] font-semibold text-gray-900 dark:text-white mb-3"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  What you'll learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#006bff] shrink-0 mt-0.5" />
                      <span
                        className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[12px] font-medium"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Details Card */}
            <Card className="p-6 rounded-2xl bg-white dark:bg-gray-800 border-none shadow-lg sticky top-6">
              <h3
                className="text-[18px] font-semibold text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Course Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#006bff]" />
                    </div>
                    <div>
                      <p
                        className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        Duration
                      </p>
                      <p
                        className="text-[14px] font-semibold text-gray-900 dark:text-white"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {course.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p
                        className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        Lessons
                      </p>
                      <p
                        className="text-[14px] font-semibold text-gray-900 dark:text-white"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {course.lessons} lessons
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p
                        className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-wide"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        Modules
                      </p>
                      <p
                        className="text-[14px] font-semibold text-gray-900 dark:text-white"
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        {course.modules} modules
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 px-4 rounded-xl bg-[#006bff] hover:bg-[#0056cc] text-white font-semibold text-[14px] transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/30"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Start Learning
              </button>

              <button className="w-full mt-3 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold text-[14px] transition-all duration-300 active:scale-95"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Add to Watchlist
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
