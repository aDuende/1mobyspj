import { useState, useEffect, useRef } from "react";
import { Button } from "./components/ui/button";
import { Heart, MessageCircle, Share, ChevronUp, ChevronDown, Bookmark, Users } from "lucide-react";

export default function ShortLearningPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const lastScrollTimeRef = useRef(0);

  const shortCourses = [
    {
      id: "design-thinking",
      title: "Design Thinking Fundamentals",
      description: "Learn the basics of design thinking in just 15 minutes",
      duration: "15 mins",
      category: "SKILLS",
      videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM",
      instructor: "Sarah Johnson",
      participants: 1240,
      thumbnail: "bg-linear-to-br from-purple-600 to-blue-500",
    },
    {
      id: "git-basics",
      title: "Git & Version Control Basics",
      description: "Quick introduction to Git and version control concepts",
      duration: "12 mins",
      category: "DEVELOPMENT",
      videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
      instructor: "Mike Chen",
      participants: 856,
      thumbnail: "bg-linear-to-br from-green-600 to-emerald-500",
    },
    {
      id: "public-speaking",
      title: "Public Speaking Tips",
      description: "Essential techniques for effective communication",
      duration: "18 mins",
      category: "SOFT SKILLS",
      videoUrl: "https://www.youtube.com/embed/q7p3k8fJqYQ",
      instructor: "Emma Williams",
      participants: 2103,
      thumbnail: "bg-linear-to-br from-red-600 to-pink-500",
    },
    {
      id: "api-basics",
      title: "REST API Fundamentals",
      description: "Understanding REST APIs and how to use them",
      duration: "20 mins",
      category: "DEVELOPMENT",
      videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM",
      instructor: "Alex Kumar",
      participants: 1567,
      thumbnail: "bg-linear-to-br from-blue-600 to-cyan-500",
    },
    {
      id: "time-management",
      title: "Time Management Essentials",
      description: "Practical strategies for managing your time effectively",
      duration: "14 mins",
      category: "SOFT SKILLS",
      videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
      instructor: "David Brown",
      participants: 3421,
      thumbnail: "bg-linear-to-br from-yellow-600 to-orange-500",
    },
    {
      id: "docker-intro",
      title: "Docker Containers 101",
      description: "Get started with Docker containerization",
      duration: "16 mins",
      category: "DEVELOPMENT",
      videoUrl: "https://www.youtube.com/embed/q7p3k8fJqYQ",
      instructor: "Lisa Zhang",
      participants: 945,
      thumbnail: "bg-linear-to-br from-gray-700 to-gray-900",
    },
  ];

  const currentCourse = shortCourses[currentIndex];

  // Handle keyboard scroll
  useEffect(() => {
    const SCROLL_DEBOUNCE = 600; // milliseconds
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Debounce: only process if enough time has passed since last scroll
      if (now - lastScrollTimeRef.current < SCROLL_DEBOUNCE) {
        return;
      }
      
      lastScrollTimeRef.current = now;
      
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % 6);
      } else if (e.deltaY < 0) {
        setCurrentIndex((prev) => (prev - 1 + 6) % 6);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTimeRef.current >= 600) {
          lastScrollTimeRef.current = now;
          setCurrentIndex((prev) => (prev + 1) % 6);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTimeRef.current >= 600) {
          lastScrollTimeRef.current = now;
          setCurrentIndex((prev) => (prev - 1 + 6) % 6);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Reel Container */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-md h-full md:max-h-screen md:h-screen md:rounded-2xl overflow-hidden bg-black shadow-2xl">
          {/* Video/Background */}
          <div className={`absolute inset-0 ${currentCourse.thumbnail} flex items-center justify-center`}>
            {/* YouTube Embed */}
            <div className="w-full h-full">
              <iframe
                width="100%"
                height="100%"
                src={`${currentCourse.videoUrl}?autoplay=1&controls=0&modestbranding=1&rel=0&fs=0`}
                title={currentCourse.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />

          {/* Content - Top - Course Counter & Play Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <div className="text-white text-sm font-medium">
              {currentIndex + 1} / {shortCourses.length}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "⏸" : "▶"}
            </Button>
          </div>

          {/* Content - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            {/* Course Info */}
            <div className="space-y-3">
              {/* Category Badge */}
              <div>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                  {currentCourse.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-xl font-bold line-clamp-2">{currentCourse.title}</h2>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">{currentCourse.description}</p>
              </div>

              {/* Instructor & Stats */}
              <div className="flex items-center gap-2 text-xs">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {currentCourse.instructor.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{currentCourse.instructor}</p>
                  <p className="text-xs text-gray-400">
                    <Users className="w-3 h-3 inline mr-1" />
                    {currentCourse.participants.toLocaleString()} learning
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Interactions */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
            {/* Like Button */}
            <button className="flex flex-col items-center gap-1 text-white hover:text-red-500 transition-all duration-200 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/30 transition-all duration-200 transform group-hover:scale-110 active:scale-90">
                <Heart className="w-6 h-6 group-hover:fill-red-500 transition-all duration-200" />
              </div>
              <span className="text-xs font-semibold">10.2K</span>
            </button>

            {/* Comment Button */}
            <button className="flex flex-col items-center gap-1 text-white hover:text-blue-400 transition-all duration-200 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all duration-200 transform group-hover:scale-110 active:scale-90">
                <MessageCircle className="w-6 h-6 transition-all duration-200" />
              </div>
              <span className="text-xs font-semibold">25</span>
            </button>

            {/* Share Button */}
            <button className="flex flex-col items-center gap-1 text-white hover:text-green-400 transition-all duration-200 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-green-500/30 transition-all duration-200 transform group-hover:scale-110 active:scale-90">
                <Share className="w-6 h-6 transition-all duration-200" />
              </div>
              <span className="text-xs font-semibold">634</span>
            </button>

            {/* Bookmark Button */}
            <button className="flex flex-col items-center gap-1 text-white hover:text-yellow-400 transition-all duration-200 group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-yellow-500/30 transition-all duration-200 transform group-hover:scale-110 active:scale-90">
                <Bookmark className="w-6 h-6 group-hover:fill-yellow-400 transition-all duration-200" />
              </div>
              <span className="text-xs font-semibold"></span>
            </button>
          </div>

          {/* Top - Course Counter */}
          <div className="absolute bottom-20 left-4 right-4 flex items-center justify-between z-20">
            {/* Navigation - Previous Clip */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + 6) % 6)}
              className="text-white hover:bg-white/30 p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              <ChevronUp className="w-6 h-6" />
            </button>

            {/* Navigation - Next Clip */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % 6)}
              className="text-white hover:bg-white/30 p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / shortCourses.length) * 100}%` }}
        />
      </div>

      {/* Mobile hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs text-center pointer-events-none md:hidden">
        Swipe up or down to browse
      </div>
    </div>
  );
}
