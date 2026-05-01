import { useState, useEffect, useRef } from "react";
import idpRoadmapImg from "./assets/IDP-roadmap.png";
import { useNavigate, useLocation } from "react-router-dom";
import MyIDPPage from "./MyIDPPage";
import LessonLayout from "./components/courses/layouts/LessonLayout";
import SeriesLayout from "./components/courses/layouts/SeriesLayout";
import ReadingLayout from "./components/courses/layouts/ReadingLayout";
import MyCertificatedPage from "./MyCertificatedPage";
import { Card } from "./components/ui/card";
import { Area, AreaChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";

import {
  Clapperboard,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Play,
  X,
  Terminal,
  AppWindow,
  Check,
  Settings2,
  Flame,
  Clock,
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
} from "lucide-react";
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
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress);
      const current = start + (end - start) * easedProgress;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  if (location.pathname === "/my-idp-learning/my-certificated") {
    return <MyCertificatedPage />;
  }
  return (
    <>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </>
  );
};

interface SyncTooltipProps extends React.ComponentProps<
  typeof ChartTooltipContent
> {
  currentData: {
    chartData: Array<{ label: string; [key: string]: unknown }>;
  };
  onIndexChange: (index: number | null) => void;
}

const SyncTooltip = ({
  active,
  payload,
  label,
  currentData,
  onIndexChange,
  ...props
}: SyncTooltipProps) => {
  useEffect(() => {
    if (active && payload?.length) {
      const index = currentData.chartData.findIndex(
        (d: { label: string }) => d.label === label,
      );
      if (index !== -1) onIndexChange(index);
    } else {
      onIndexChange(null);
    }
  }, [active, label, payload, currentData, onIndexChange]);

  const order = ["frontend", "backend", "database", "aidata"];
  const sortedPayload = payload
    ? [...payload].sort((a, b) => {
        const keyA = String(a?.dataKey || "");
        const keyB = String(b?.dataKey || "");
        return order.indexOf(keyA) - order.indexOf(keyB);
      })
    : payload;

  return (
    <ChartTooltipContent
      active={active}
      payload={sortedPayload}
      label={label}
      {...props}
      indicator="dot"
      className="border-none ring-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
    />
  );
};

const courses = [
  {
    id: "jwt",
    title: "What is JWT and Why Should You Use JWT",
    description: "What is JWT and Why Should You Use JWT",
    fullDescription:
      "Learn about JWT (JSON Web Tokens) and why it's essential for modern web development. This course covers the fundamentals of token-based authentication and how to implement it securely.",
    category: "BACKEND",
    videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM",
    thumbnail: "https://i.ytimg.com/vi/7Q17ubqLfaM/hqdefault.jpg",
    rating: 4.8,
    reviews: 1250,
    instructor: "Expert Instructor",
    duration: "15 mins",
    lessons: 24,
    modules: 5,
    isFree: true,
    tags: ["Backend", "Security", "Authentication"],
    highlights: [
      "Understand token-based authentication",
      "Implement JWT in Node.js applications",
      "Secure API endpoints",
      "Handle token expiration and refresh",
    ],
  },
  {
    id: "react-ts",
    title: "TypeScript in React - COMPLETE Tutorial (Crash Course)",
    description: "TypeScript in React - COMPLETE Tutorial (Crash Course)",
    fullDescription:
      "Master TypeScript in React with this comprehensive guide. Learn how to use TypeScript to build type-safe React applications with improved developer experience and fewer runtime errors.",
    category: "FRONTEND",
    videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
    thumbnail: "https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg",
    rating: 4.9,
    reviews: 2540,
    instructor: "React Expert",
    duration: "3h 15m",
    lessons: 45,
    modules: 8,
    isFree: true,
    tags: ["Frontend", "React", "TypeScript"],
    highlights: [
      "TypeScript basics for React developers",
      "Type annotations for components and props",
      "Advanced TypeScript patterns in React",
      "Building production-ready React apps",
    ],
  },
  {
    id: "postgres",
    title: "Learn PostgreSQL Tutorial - Full Course for Beginners",
    description: "Learn PostgreSQL Tutorial - Full Course for Beginners",
    fullDescription:
      "Complete guide to PostgreSQL database management system. Learn SQL queries, database design, and advanced features to become proficient with one of the most powerful open-source databases.",
    category: "BACKEND",
    videoUrl: "https://www.youtube.com/embed/qw--VYLpxG4",
    thumbnail: "https://i.ytimg.com/vi/qw--VYLpxG4/hqdefault.jpg",
    rating: 4.7,
    reviews: 1890,
    instructor: "Database Expert",
    duration: "4 hours",
    lessons: 52,
    modules: 10,
    isFree: true,
    tags: ["Backend", "Database", "SQL"],
    highlights: [
      "PostgreSQL installation and setup",
      "SQL fundamentals and advanced queries",
      "Database design and optimization",
      "Real-world database projects",
    ],
  },
];

const newCourses = [
  {
    id: "react-complete",
    title: "React - The Complete Guide (incl. React Router & Redux)",
    description: "Dive in and learn React.js from scratch — fully updated to React 18.",
    fullDescription:
      "Fully updated and covering React 18, hooks, context, React Router, Redux, and more. Build real-world apps and master modern React development from the ground up.",
    category: "FRONTEND",
    videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
    rating: 4.9,
    reviews: 8430,
    instructor: "React Expert",
    duration: "4h 30m",
    lessons: 68,
    modules: 12,
    isFree: true,
    tags: ["Frontend", "React", "JavaScript"],
    highlights: [
      "React 18 features including concurrent rendering",
      "Hooks: useState, useEffect, useContext and custom hooks",
      "React Router v6 for client-side routing",
      "State management with Redux Toolkit",
    ],
  },
  {
    id: "nodejs-full",
    title: "Node.js Full Course for Beginners",
    description: "Complete Node.js tutorial — APIs, Express, and MongoDB.",
    fullDescription:
      "Learn Node.js from scratch. Build RESTful APIs with Express, connect to MongoDB, and deploy your server-side JavaScript applications.",
    category: "BACKEND",
    videoUrl: "https://www.youtube.com/embed/f2EqECiTBL8",
    thumbnail: "https://i.ytimg.com/vi/f2EqECiTBL8/hqdefault.jpg",
    rating: 4.8,
    reviews: 3120,
    instructor: "Backend Expert",
    duration: "3h 45m",
    lessons: 48,
    modules: 9,
    isFree: true,
    tags: ["Backend", "Node.js", "JavaScript"],
    highlights: [
      "Node.js runtime and event loop",
      "Express.js REST API design",
      "MongoDB with Mongoose",
      "Authentication with JWT",
    ],
  },
  {
    id: "css-mastery",
    title: "CSS Mastery — Advanced CSS and Sass",
    description: "Write modern, scalable CSS with Sass, Flexbox, and Grid.",
    fullDescription:
      "Master CSS with animations, variables, Sass/SCSS, Flexbox, CSS Grid, and responsive design. Build stunning UIs with clean, maintainable styles.",
    category: "FRONTEND",
    videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/hqdefault.jpg",
    rating: 4.7,
    reviews: 2870,
    instructor: "CSS Expert",
    duration: "2h 10m",
    lessons: 32,
    modules: 6,
    isFree: true,
    tags: ["Frontend", "CSS", "Sass"],
    highlights: [
      "Flexbox and Grid layouts",
      "CSS animations and transitions",
      "Sass/SCSS variables and mixins",
      "Responsive design strategies",
    ],
  },
  {
    id: "python-beginners",
    title: "Python for Beginners — Full Course",
    description: "Learn Python programming from scratch with hands-on projects.",
    fullDescription:
      "Start your programming journey with Python. Covers variables, data types, functions, OOP, file handling, and real-world projects including a web scraper and data visualizer.",
    category: "BACKEND",
    videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    thumbnail: "https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
    rating: 4.8,
    reviews: 5910,
    instructor: "Python Expert",
    duration: "6h 00m",
    lessons: 75,
    modules: 14,
    isFree: true,
    tags: ["Backend", "Python", "Programming"],
    highlights: [
      "Python fundamentals and syntax",
      "Object-oriented programming",
      "File I/O and error handling",
      "Real-world mini projects",
    ],
  },
];

const shortLearningReels = [
  {
    id: "reel-1",
    title: "Learn Git In 15 Minutes",
    description: "Learn the essentials of Git in just 15 minutes",
    category: "BACKEND",
    author: "@ColtSteeleCode",
    authorUrl: "https://www.youtube.com/@ColtSteeleCode",
    duration: "15 min",
    durationSeconds: 900,
    views: "12.5K",
    thumbnail: "https://i.ytimg.com/vi/USjZcfj8yxE/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/USjZcfj8yxE",
    aspectRatio: "16:9" as const,
    icon: Terminal,
  },
  {
    id: "reel-2",
    title: "Flexbox CSS In 20 Minutes",
    description: "Quick CSS Flexbox tips for better layouts",
    category: "FRONTEND",
    author: "@TraversyMedia",
    authorUrl: "https://www.youtube.com/@TraversyMedia",
    duration: "20 min",
    durationSeconds: 1200,
    views: "45.2K",
    thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JJSoEo8JSnc",
    aspectRatio: "16:9" as const,
    icon: AppWindow,
  },
  {
    id: "reel-3",
    title: "What is a REST API?",
    description: "Best practices for designing REST APIs",
    category: "BACKEND",
    author: "@programmingwithmosh",
    authorUrl: "https://www.youtube.com/@programmingwithmosh",
    duration: "12 min",
    durationSeconds: 720,
    views: "28.7K",
    thumbnail: "https://i.ytimg.com/vi/SLwpqD8n3d0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/SLwpqD8n3d0",
    aspectRatio: "16:9" as const,
    icon: Terminal,
  },
  {
    id: "reel-4",
    title: "10 React Hooks Explained",
    description: "Understanding React Hooks in 10 minutes",
    category: "FRONTEND",
    author: "@Fireship",
    authorUrl: "https://www.youtube.com/@Fireship",
    duration: "10 min",
    durationSeconds: 600,
    views: "89.3K",
    thumbnail: "https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q",
    aspectRatio: "16:9" as const,
    icon: AppWindow,
  },
  {
    id: "reel-5",
    title: "TypeScript Origins: The Documentary",
    description: "The story of TypeScript",
    category: "FRONTEND",
    author: "@OfferZenOrigins",
    authorUrl: "https://www.youtube.com/@OfferZenOrigins",
    duration: "25 min",
    durationSeconds: 1500,
    views: "34.1K",
    thumbnail: "https://i.ytimg.com/vi/U6s2pdxebSo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/U6s2pdxebSo",
    aspectRatio: "16:9" as const,
    icon: Terminal,
  },
  {
    id: "reel-6",
    title:
      "If You Are Using Next.js You Need To Enable This Development Feature",
    description: "Must-enable development feature for Next.js users",
    category: "FRONTEND",
    author: "@WebDevSimplified",
    authorUrl: "https://www.youtube.com/@WebDevSimplified",
    duration: "1 min",
    durationSeconds: 60,
    views: "213.9K",
    thumbnail: "https://i.ytimg.com/vi/1jpqBfptng0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1jpqBfptng0",
    aspectRatio: "9:16" as const,
    icon: AppWindow,
  },
  {
    id: "reel-7",
    title: "The super basics of Docker in under a minute",
    description: "Docker containers explained in under 60 seconds",
    category: "BACKEND",
    author: "@WebDevSimplified",
    authorUrl: "https://www.youtube.com/@WebDevSimplified",
    duration: "1 min",
    durationSeconds: 60,
    views: "438.4K",
    thumbnail: "https://i.ytimg.com/vi/6OA9AjzX4k4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/6OA9AjzX4k4",
    aspectRatio: "9:16" as const,
    icon: Terminal,
  },
];

const seriesData = [
  {
    id: "series-1",
    title: "The Complete JavaScript Series",
    description: "Master JavaScript from fundamentals to advanced patterns.",
    modules: 5,
    videos: 12,
    category: "FRONTEND",
    thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg",
  },
  {
    id: "series-2",
    title: "Node.js Crash Course Series",
    description: "Build server-side apps with Node.js and Express step by step.",
    modules: 3,
    videos: 8,
    category: "BACKEND",
    thumbnail: "https://i.ytimg.com/vi/fBNz5xF-Kx4/hqdefault.jpg",
  },
  {
    id: "series-3",
    title: "React Hooks In Depth",
    description: "Every React hook explained with real-world examples.",
    modules: 4,
    videos: 10,
    category: "FRONTEND",
    thumbnail: "https://i.ytimg.com/vi/O6P86uwfdR0/hqdefault.jpg",
  },
  {
    id: "series-4",
    title: "SQL & Database Design Series",
    description: "Learn relational database design and advanced SQL queries.",
    modules: 6,
    videos: 14,
    category: "DATABASE",
    thumbnail: "https://i.ytimg.com/vi/HXV3zeQKqGY/hqdefault.jpg",
  },
  {
    id: "series-5",
    title: "TypeScript Full Series",
    description: "Type-safe JavaScript for large-scale React applications.",
    modules: 3,
    videos: 9,
    category: "FRONTEND",
    thumbnail: "https://i.ytimg.com/vi/BwuLxPH8IDs/hqdefault.jpg",
  },
  {
    id: "series-6",
    title: "Docker & DevOps Series",
    description: "Containerise and deploy your apps with Docker and CI/CD.",
    modules: 4,
    videos: 11,
    category: "BACKEND",
    thumbnail: "https://i.ytimg.com/vi/6OA9AjzX4k4/hqdefault.jpg",
  },
];

const readingHubData = [
  {
    id: "read-1",
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 431,
    category: "Engineering",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
  },
  {
    id: "read-2",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    pages: 352,
    category: "Engineering",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
  },
  {
    id: "read-3",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    pages: 278,
    category: "Frontend",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1373665727i/9422683.jpg",
  },
  {
    id: "read-4",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    pages: 616,
    category: "Backend",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415816873i/23463279.jpg",
  },
  {
    id: "read-5",
    title: "System Design Interview",
    author: "Alex Xu",
    pages: 309,
    category: "Engineering",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603160280i/54109255.jpg",
  },
  {
    id: "read-6",
    title: "CSS: The Definitive Guide",
    author: "Eric A. Meyer",
    pages: 1094,
    category: "Frontend",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347964659i/1867080.jpg",
  },
];

export default function MyIDPLearningPage({ role = "employee" }: { role?: "employee" | "manager" | "admin" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState<null | {
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
  }>(null);

  const [selectedSeries, setSelectedSeries] = useState<null | (typeof seriesData)[0]>(null);
  const [selectedReading, setSelectedReading] = useState<null | (typeof readingHubData)[0]>(null);

  const [selectedReel, setSelectedReel] = useState<
    null | (typeof shortLearningReels)[0]
  >(null);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);

  useEffect(() => {
    const brandColors = [
      { main: "#006BFF", bg: "rgba(0, 107, 255, 0.15)" },
      { main: "#FC4C02", bg: "rgba(252, 76, 2, 0.15)" },
      { main: "#FFA400", bg: "rgba(255, 164, 0, 0.15)" },
    ];

    const handleSelection = () => {
      const randomColor =
        brandColors[Math.floor(Math.random() * brandColors.length)];
      document.documentElement.style.setProperty(
        "--moby-selection",
        randomColor.main,
      );
      document.documentElement.style.setProperty(
        "--moby-selection-bg",
        randomColor.bg,
      );
    };

    window.addEventListener("selectstart", handleSelection);
    return () => window.removeEventListener("selectstart", handleSelection);
  }, []);

  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reelsCarouselRef = useRef<HTMLDivElement>(null);
  const coursesCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [designThinkingProgress, setDesignThinkingProgress] = useState(0);
  const [activeDataIndex, setActiveDataIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDesignThinkingProgress(20);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [canCoursesScrollLeft, setCanCoursesScrollLeft] = useState(false);
  const [canCoursesScrollRight, setCanCoursesScrollRight] = useState(true);
  const [reelsFilter, setReelsFilter] = useState("ALL");
  const [isReelsFilterOpen, setIsReelsFilterOpen] = useState(false);
  const reelsFilterRef = useRef<HTMLDivElement>(null);

  // Learning Timeline dropdown
  const [timelineMonth, setTimelineMonth] = useState("Month");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progress filter dropdown
  const [progressFilter, setProgressFilter] = useState("All Courses");
  const [isProgressFilterOpen, setIsProgressFilterOpen] = useState(false);
  const progressFilterRef = useRef<HTMLDivElement>(null);

  // Course filter dropdown
  const [courseFilter, setCourseFilter] = useState("All Topics");
  const [isCourseFilterOpen, setIsCourseFilterOpen] = useState(false);
  const courseFilterRef = useRef<HTMLDivElement>(null);

  // New Course section (below Reels)
  const [newCourseFilter, setNewCourseFilter] = useState("All Topics");
  const [isNewCourseFilterOpen, setIsNewCourseFilterOpen] = useState(false);
  const newCourseFilterRef = useRef<HTMLDivElement>(null);
  const newCoursesCarouselRef = useRef<HTMLDivElement>(null);
  const [canNewCoursesScrollLeft, setCanNewCoursesScrollLeft] = useState(false);
  const [canNewCoursesScrollRight, setCanNewCoursesScrollRight] = useState(true);
  const [hoveredNewCourseId, setHoveredNewCourseId] = useState<string | null>(null);

  // Series section
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [isSeriesFilterOpen, setIsSeriesFilterOpen] = useState(false);
  const seriesFilterRef = useRef<HTMLDivElement>(null);
  const seriesCarouselRef = useRef<HTMLDivElement>(null);
  const [canSeriesScrollLeft, setCanSeriesScrollLeft] = useState(false);
  const [canSeriesScrollRight, setCanSeriesScrollRight] = useState(true);

  // Reading Hub section
  const [readingFilter, setReadingFilter] = useState("All");
  const [isReadingFilterOpen, setIsReadingFilterOpen] = useState(false);
  const readingFilterRef = useRef<HTMLDivElement>(null);
  const readingCarouselRef = useRef<HTMLDivElement>(null);
  const [canReadingScrollLeft, setCanReadingScrollLeft] = useState(false);
  const [canReadingScrollRight, setCanReadingScrollRight] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        reelsFilterRef.current &&
        !reelsFilterRef.current.contains(e.target as Node)
      ) {
        setIsReelsFilterOpen(false);
      }
      if (
        timelineRef.current &&
        !timelineRef.current.contains(e.target as Node)
      ) {
        setIsTimelineOpen(false);
      }
      if (
        progressFilterRef.current &&
        !progressFilterRef.current.contains(e.target as Node)
      ) {
        setIsProgressFilterOpen(false);
      }
      if (
        courseFilterRef.current &&
        !courseFilterRef.current.contains(e.target as Node)
      ) {
        setIsCourseFilterOpen(false);
      }
      if (
        newCourseFilterRef.current &&
        !newCourseFilterRef.current.contains(e.target as Node)
      ) {
        setIsNewCourseFilterOpen(false);
      }
      if (
        seriesFilterRef.current &&
        !seriesFilterRef.current.contains(e.target as Node)
      ) {
        setIsSeriesFilterOpen(false);
      }
      if (
        readingFilterRef.current &&
        !readingFilterRef.current.contains(e.target as Node)
      ) {
        setIsReadingFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredReels =
    reelsFilter === "ALL"
      ? shortLearningReels
      : shortLearningReels.filter((r) => r.category === reelsFilter);

  const handleReelsScroll = () => {
    if (reelsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = reelsCarouselRef.current;

      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const handleCoursesScroll = () => {
    if (coursesCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        coursesCarouselRef.current;
      setCanCoursesScrollLeft(scrollLeft > 20);
      setCanCoursesScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const handleNewCoursesScroll = () => {
    if (newCoursesCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        newCoursesCarouselRef.current;
      setCanNewCoursesScrollLeft(scrollLeft > 20);
      setCanNewCoursesScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const handleSeriesScroll = () => {
    if (seriesCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = seriesCarouselRef.current;
      setCanSeriesScrollLeft(scrollLeft > 20);
      setCanSeriesScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  const handleReadingScroll = () => {
    if (readingCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = readingCarouselRef.current;
      setCanReadingScrollLeft(scrollLeft > 20);
      setCanReadingScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  useEffect(() => {
    handleReelsScroll();
    handleCoursesScroll();
    handleNewCoursesScroll();
    handleSeriesScroll();
    handleReadingScroll();
    window.addEventListener("resize", handleReelsScroll);
    window.addEventListener("resize", handleCoursesScroll);
    window.addEventListener("resize", handleNewCoursesScroll);
    window.addEventListener("resize", handleSeriesScroll);
    window.addEventListener("resize", handleReadingScroll);
    return () => {
      window.removeEventListener("resize", handleReelsScroll);
      window.removeEventListener("resize", handleCoursesScroll);
      window.removeEventListener("resize", handleNewCoursesScroll);
      window.removeEventListener("resize", handleSeriesScroll);
      window.removeEventListener("resize", handleReadingScroll);
    };
  }, []);

  const reelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selectedReel) {
      setTimeout(() => {
        const el = reelRefs.current[selectedReel.id];
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "center" });
        }
      }, 50);
    }
  }, [selectedReel]);

  useEffect(() => {
    if (selectedReel) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reel-id");
              if (id) {
                setActiveReelId((prev) => {
                  if (prev !== id) {
                    return id;
                  }
                  return prev;
                });
              }
            }
          });
        },
        { threshold: 0.6 },
      );

      Object.values(reelRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, [selectedReel]);

  const isScrollingRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrollingRef.current) return;

    if (Math.abs(e.deltaY) > 30) {
      isScrollingRef.current = true;
      if (e.deltaY > 0) {
        handleScrollToNext();
      } else {
        handleScrollToPrev();
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  const handleScrollToNext = () => {
    if (!activeReelId) return;
    const currentIndex = filteredReels.findIndex((r) => r.id === activeReelId);
    if (currentIndex < filteredReels.length - 1) {
      const nextId = filteredReels[currentIndex + 1].id;
      const targetEl = reelRefs.current[nextId];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleScrollToPrev = () => {
    if (!activeReelId) return;
    const currentIndex = filteredReels.findIndex((r) => r.id === activeReelId);
    if (currentIndex > 0) {
      const prevId = filteredReels[currentIndex - 1].id;
      const targetEl = reelRefs.current[prevId];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    if (document.getElementById("yt-iframe-api")) return;
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    if (!activeReelId || !selectedReel) return;

    const iframeId = `iframe-${activeReelId}`;
    let player: YT.Player | null = null;
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled) return;
      const iframe = document.getElementById(iframeId);
      if (!iframe) return;

      player = new YT.Player(iframeId, {
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (cancelled) return;
            // YT.PlayerState.ENDED === 0
            if (event.data === 0) {
              const currentIndex = filteredReels.findIndex(
                (r) => r.id === activeReelId,
              );
              if (currentIndex < filteredReels.length - 1) {
                const nextId = filteredReels[currentIndex + 1].id;
                const targetEl = reelRefs.current[nextId];
                if (targetEl) {
                  targetEl.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }
            }
          },
        },
      });
    };

    const waitForYT = () => {
      if (cancelled) return;
      if (window.YT && window.YT.Player) {
        setTimeout(createPlayer, 500);
      } else {
        setTimeout(waitForYT, 200);
      }
    };

    waitForYT();

    return () => {
      cancelled = true;
      if (player && typeof player.destroy === "function") {
        try {
          player.destroy();
        } catch {
          //
        }
      }
    };
  }, [activeReelId, filteredReels, selectedReel]);

  useEffect(() => {
    if (location.pathname.startsWith("/my-idp-learning/course/")) {
      const courseId = location.pathname.split("/").pop();
      const course = courses.find((c) => c.id === courseId)
        ?? newCourses.find((c) => c.id === courseId);
      if (course && !selectedCourse) {
        setTimeout(() => setSelectedCourse(course), 0);
      }
    } else {
      if (selectedCourse) setTimeout(() => setSelectedCourse(null), 0);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.pathname.startsWith("/my-idp-learning/series/")) {
      const id = location.pathname.split("/").pop();
      const item = seriesData.find((s) => s.id === id);
      if (item && !selectedSeries) setTimeout(() => setSelectedSeries(item), 0);
    } else {
      if (selectedSeries) setTimeout(() => setSelectedSeries(null), 0);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.pathname.startsWith("/my-idp-learning/reading/")) {
      const id = location.pathname.split("/").pop();
      const item = readingHubData.find((r) => r.id === id);
      if (item && !selectedReading) setTimeout(() => setSelectedReading(item), 0);
    } else {
      if (selectedReading) setTimeout(() => setSelectedReading(null), 0);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (location.pathname === "/my-idp-learning/my-idp") {
    return <MyIDPPage role={role} />;
  }

  if (location.pathname === "/my-idp-learning/my-certificated") {
    return <MyCertificatedPage />;
  }

  if (selectedCourse) {
    return <LessonLayout course={selectedCourse} />;
  }

  if (selectedSeries) {
    return <SeriesLayout item={selectedSeries} />;
  }

  if (selectedReading) {
    return <ReadingLayout item={selectedReading} />;
  }

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-transparent">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-baseline justify-end mb-6">
          <button
            onClick={() => navigate("/my-idp-learning/my-certificated")}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border-transparent-transparent bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-300 active:scale-[0.96] cursor-pointer"
            style={{ fontFamily: '"Geometrica", sans-serif' }}
          >
            <span className="text-[12px] font-normal">My Certificated</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Learning Timeline and My Learning Path */}
        <div className="grid grid-cols-12 gap-4 items-stretch mb-8">
          {/* Learning Timeline */}
          <Card className="col-span-12 xl:col-span-7 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none">
            <div className="flex items-baseline justify-between mb-4">
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Learning Timeline
              </h2>
              <div className="relative" ref={timelineRef}>
                <button
                  onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                  className={`
                    group flex items-center gap-2 px-4 py-2 rounded-full border-transparent
                    transition-all duration-300 active:scale-[0.96] cursor-pointer text-[12px] font-normal
                    ${
                      isTimelineOpen
                        ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300"
                        : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
                    }
                  `}
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  {timelineMonth}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isTimelineOpen ? "rotate-180 text-[#FC4C02]" : ""}`}
                  />
                </button>

                <div
                  className={`
                    absolute top-full right-0 mt-2 w-40
                    bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50
                    transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]
                    ${
                      isTimelineOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                  `}
                >
                  <div className="flex flex-col gap-1">
                    {["Month", "Quarter", "Year"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setTimelineMonth(opt);
                          setActiveDataIndex(null);
                          setIsTimelineOpen(false);
                        }}
                        className={`
                          flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal
                          transition-all duration-200 cursor-pointer
                          ${
                            timelineMonth === opt
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                          }
                        `}
                        style={{ fontFamily: '"Geometrica", sans-serif' }}
                      >
                        <span className="flex-1 text-left">{opt}</span>
                        {timelineMonth === opt && (
                          <Check className="w-4 h-4 text-orange-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            {(() => {
              const chartDataConfig = {
                Month: {
                  chartData: [
                    {
                      label: "Oct 1",
                      frontend: 5,
                      backend: 8,
                      database: 2,
                      aidata: 1,
                    },
                    {
                      label: "Oct 4",
                      frontend: 15,
                      backend: 5,
                      database: 4,
                      aidata: 2,
                    },
                    {
                      label: "Oct 8",
                      frontend: 8,
                      backend: 12,
                      database: 3,
                      aidata: 1,
                    },
                    {
                      label: "Oct 12",
                      frontend: 20,
                      backend: 10,
                      database: 6,
                      aidata: 3,
                    },
                    {
                      label: "Oct 15",
                      frontend: 12,
                      backend: 20,
                      database: 5,
                      aidata: 2,
                    },
                    {
                      label: "Oct 18",
                      frontend: 25,
                      backend: 15,
                      database: 8,
                      aidata: 4,
                    },
                    {
                      label: "Oct 22",
                      frontend: 18,
                      backend: 25,
                      database: 7,
                      aidata: 3,
                    },
                    {
                      label: "Oct 25",
                      frontend: 35,
                      backend: 20,
                      database: 10,
                      aidata: 5,
                    },
                    {
                      label: "Oct 28",
                      frontend: 25,
                      backend: 35,
                      database: 12,
                      aidata: 4,
                    },
                    {
                      label: "Oct 31",
                      frontend: 40,
                      backend: 40,
                      database: 15,
                      aidata: 5,
                    },
                  ],
                  skills: [
                    {
                      skill: "Frontend",
                      percentage: 40,
                      gradient: "from-blue-400 to-blue-600",
                      glow: "rgba(59,130,246,0.2)",
                    },
                    {
                      skill: "Backend",
                      percentage: 40,
                      gradient: "from-orange-400 to-orange-600",
                      glow: "rgba(251,146,60,0.2)",
                    },
                    {
                      skill: "Database",
                      percentage: 15,
                      gradient: "from-emerald-400 to-emerald-600",
                      glow: "rgba(52,211,153,0.2)",
                    },
                    {
                      skill: "AI/Data",
                      percentage: 5,
                      gradient: "from-rose-400 to-rose-600",
                      glow: "rgba(251,113,133,0.2)",
                    },
                  ],
                },
                Quarter: {
                  chartData: [
                    {
                      label: "Week 1",
                      frontend: 10,
                      backend: 20,
                      database: 5,
                      aidata: 2,
                    },
                    {
                      label: "Week 3",
                      frontend: 25,
                      backend: 15,
                      database: 8,
                      aidata: 4,
                    },
                    {
                      label: "Week 5",
                      frontend: 15,
                      backend: 35,
                      database: 10,
                      aidata: 3,
                    },
                    {
                      label: "Week 7",
                      frontend: 40,
                      backend: 25,
                      database: 15,
                      aidata: 7,
                    },
                    {
                      label: "Week 9",
                      frontend: 30,
                      backend: 50,
                      database: 12,
                      aidata: 5,
                    },
                    {
                      label: "Week 12",
                      frontend: 50,
                      backend: 55,
                      database: 20,
                      aidata: 10,
                    },
                  ],
                  skills: [
                    {
                      skill: "Frontend",
                      percentage: 50,
                      gradient: "from-blue-400 to-blue-600",
                      glow: "rgba(59,130,246,0.2)",
                    },
                    {
                      skill: "Backend",
                      percentage: 55,
                      gradient: "from-orange-400 to-orange-600",
                      glow: "rgba(251,146,60,0.2)",
                    },
                    {
                      skill: "Database",
                      percentage: 20,
                      gradient: "from-emerald-400 to-emerald-600",
                      glow: "rgba(52,211,153,0.2)",
                    },
                    {
                      skill: "AI/Data",
                      percentage: 10,
                      gradient: "from-rose-400 to-rose-600",
                      glow: "rgba(251,113,133,0.2)",
                    },
                  ],
                },
                Year: {
                  chartData: [
                    {
                      label: "Jan",
                      frontend: 20,
                      backend: 30,
                      database: 10,
                      aidata: 3,
                    },
                    {
                      label: "Feb",
                      frontend: 40,
                      backend: 25,
                      database: 15,
                      aidata: 6,
                    },
                    {
                      label: "Mar",
                      frontend: 30,
                      backend: 50,
                      database: 12,
                      aidata: 5,
                    },
                    {
                      label: "Apr",
                      frontend: 55,
                      backend: 40,
                      database: 25,
                      aidata: 12,
                    },
                    {
                      label: "May",
                      frontend: 45,
                      backend: 65,
                      database: 20,
                      aidata: 10,
                    },
                    {
                      label: "Jun",
                      frontend: 70,
                      backend: 55,
                      database: 35,
                      aidata: 18,
                    },
                    {
                      label: "Jul",
                      frontend: 60,
                      backend: 80,
                      database: 30,
                      aidata: 15,
                    },
                    {
                      label: "Aug",
                      frontend: 80,
                      backend: 85,
                      database: 45,
                      aidata: 25,
                    },
                    {
                      label: "Sep",
                      frontend: 75,
                      backend: 90,
                      database: 50,
                      aidata: 30,
                    },
                    {
                      label: "Oct",
                      frontend: 85,
                      backend: 95,
                      database: 60,
                      aidata: 35,
                    },
                    {
                      label: "Nov",
                      frontend: 90,
                      backend: 110,
                      database: 70,
                      aidata: 40,
                    },
                    {
                      label: "Dec",
                      frontend: 110,
                      backend: 120,
                      database: 80,
                      aidata: 50,
                    },
                  ],
                  skills: [
                    {
                      skill: "Frontend",
                      percentage: 80,
                      gradient: "from-blue-400 to-blue-600",
                      glow: "rgba(59,130,246,0.2)",
                    },
                    {
                      skill: "Backend",
                      percentage: 85,
                      gradient: "from-orange-400 to-orange-600",
                      glow: "rgba(251,146,60,0.2)",
                    },
                    {
                      skill: "Database",
                      percentage: 45,
                      gradient: "from-emerald-400 to-emerald-600",
                      glow: "rgba(52,211,153,0.2)",
                    },
                    {
                      skill: "AI/Data",
                      percentage: 25,
                      gradient: "from-rose-400 to-rose-600",
                      glow: "rgba(251,113,133,0.2)",
                    },
                  ],
                },
              };

              const currentData =
                chartDataConfig[
                  timelineMonth as keyof typeof chartDataConfig
                ] || chartDataConfig["Month"];

              const chartConfig = {
                frontend: { label: "Frontend", color: "#3b82f6" },
                backend: { label: "Backend", color: "#f97316" },
                database: { label: "Database", color: "#10b981" },
                aidata: { label: "AI/Data", color: "#f43f5e" },
              };

              return (
                <>
                  <div className="relative h-44 px-0 mb-2 w-full overflow-visible">
                    <ChartContainer
                      config={chartConfig}
                      className="h-full w-full [&_.recharts-tooltip-cursor]:!hidden [&_*]:!border-none [&_*]:!outline-none [&_*]:!ring-0"
                    >
                      <AreaChart
                        data={currentData.chartData}
                        margin={{ top: 10, right: -8, left: -8, bottom: -10 }}
                      >
                        <defs>
                          <linearGradient
                            id="fillFrontend"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartConfig.frontend.color}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartConfig.frontend.color}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillBackend"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartConfig.backend.color}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartConfig.backend.color}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillDatabase"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartConfig.database.color}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartConfig.database.color}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillAidata"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartConfig.aidata.color}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartConfig.aidata.color}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>

                        <XAxis
                          dataKey="label"
                          tickLine={false}
                          axisLine={false}
                          stroke="none"
                          padding={{ left: 20, right: 20 }}
                          tickMargin={4}
                          tick={{
                            fill: "#9ca3af",
                            fontSize: 11,
                            fontFamily: '"Geometrica", sans-serif',
                          }}
                        />
                        <ChartTooltip
                          cursor={<></>}
                          content={
                            <SyncTooltip
                              currentData={currentData}
                              onIndexChange={setActiveDataIndex}
                            />
                          }
                        />
                        <Area
                          dataKey="aidata"
                          type="natural"
                          fill="url(#fillAidata)"
                          stroke={chartConfig.aidata.color}
                          stackId="a"
                        />
                        <Area
                          dataKey="database"
                          type="natural"
                          fill="url(#fillDatabase)"
                          stroke={chartConfig.database.color}
                          stackId="a"
                        />
                        <Area
                          dataKey="backend"
                          type="natural"
                          fill="url(#fillBackend)"
                          stroke={chartConfig.backend.color}
                          stackId="a"
                        />
                        <Area
                          dataKey="frontend"
                          type="natural"
                          fill="url(#fillFrontend)"
                          stroke={chartConfig.frontend.color}
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  {/* Skill Distribution */}
                  <div>
                    <h3
                      className="!text-[14px] font-semibold !text-[#08060d] dark:!text-white leading-tight text-left mb-2"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Skill Distribution
                      {activeDataIndex !== null && (
                        <span className="ml-1.5 font-normal text-gray-400 text-[11px]">
                          • {currentData.chartData[activeDataIndex].label}
                        </span>
                      )}
                    </h3>
                    <div className="space-y-2">
                      {(() => {
                        const activePoint =
                          activeDataIndex !== null
                            ? currentData.chartData[activeDataIndex]
                            : null;

                        const getPercentage = (
                          skill: string,
                          defaultVal: number,
                        ) => {
                          if (!activePoint) return defaultVal;
                          const key = skill.toLowerCase().replace("/", "");
                          return (
                            (activePoint[
                              key as keyof typeof activePoint
                            ] as number) || 0
                          );
                        };

                        return currentData.skills.map((item) => (
                          <div
                            key={item.skill}
                            className="flex items-center gap-3"
                          >
                            <span
                              className="text-[11px] font-normal text-gray-500 dark:text-gray-400 w-16 text-left"
                              style={{ fontFamily: '"Geometrica", sans-serif' }}
                            >
                              {item.skill}
                            </span>
                            <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
                              <div
                                className={`bg-linear-to-r ${item.gradient} h-full rounded-full transition-all duration-700`}
                                style={{
                                  width: `${getPercentage(item.skill, item.percentage)}%`,
                                  boxShadow: `0 0 8px ${item.glow}`,
                                }}
                              />
                            </div>
                            <span
                              className="text-[14px] font-medium text-gray-800 dark:text-gray-200 w-10 text-right shrink-0"
                              style={{ fontFamily: '"Geometrica", sans-serif' }}
                            >
                              <AnimatedNumber
                                value={getPercentage(
                                  item.skill,
                                  item.percentage,
                                )}
                              />
                              %
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </>
              );
            })()}
          </Card>

          {/* My Learning Path */}
          <Card className="col-span-12 xl:col-span-5 p-4 rounded-lg bg-white dark:bg-gray-800 border-none shadow-none">
            <h2
              className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-tight text-left mb-4"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              My Learning Path
            </h2>
            <div className="space-y-4">
              {/* Functional Path */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-transparent  dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[14px] font-semibold text-gray-800 dark:text-white"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Functional
                  </span>
                  <div className="relative h-[26px] overflow-hidden group/btn">
                    <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:translate-y-[-26px]">
                      {/* Status Label */}
                      <div className="h-[26px] flex items-center justify-end">
                        <span
                          className="text-[11px] font-medium text-[#006bff]"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          Standard
                        </span>
                      </div>
                      {/* Action Label */}
                      <div className="h-[26px] flex items-center justify-end gap-1.5 text-[#006bff] whitespace-nowrap pr-1.5">
                        <div className="relative group/text">
                          <span
                            className="text-[12px] font-bold relative z-10"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            Resume Course
                          </span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006bff] transition-all duration-300 delay-100 group-hover:w-full rounded-full"></div>
                        </div>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 delay-100 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-normal text-gray-600 dark:text-gray-300"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Full-Stack Developer Course
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span
                      className="text-[11px] font-normal text-gray-500 dark:text-gray-400"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      In Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Path */}
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-transparent  dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[14px] font-semibold text-gray-800 dark:text-white"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Core
                  </span>
                  <div className="relative h-[26px] overflow-hidden group/btn">
                    <div className="flex flex-col transition-all duration-300 ease-in-out group-hover:translate-y-[-26px]">
                      {/* Status Label */}
                      <div className="h-[26px] flex items-center justify-end">
                        <span
                          className="text-[11px] font-medium text-[#fc4c02]"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          Lower Than Expected Level
                        </span>
                      </div>
                      {/* Action Label */}
                      <div className="h-[26px] flex items-center justify-end gap-1.5 text-[#fc4c02] whitespace-nowrap pr-1.5">
                        <div className="relative group/text">
                          <span
                            className="text-[12px] font-bold relative z-10"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            Start Course
                          </span>
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fc4c02] transition-all duration-300 delay-100 group-hover:w-full rounded-full"></div>
                        </div>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 delay-100 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-normal text-gray-600 dark:text-gray-300"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    Design Thinking
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    <span
                      className="text-[11px] font-normal text-gray-500 dark:text-gray-400"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Not Started
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/my-idp-learning/my-idp")}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#006bff]/30 text-[#006bff] hover:bg-[#006bff]/5 hover:border-[#006bff] transition-all duration-300 cursor-pointer group"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              <span className="text-[12px] font-medium">View My IDP</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Card>
        </div>

        {/* In Progress Section */}
        <div className="relative z-0 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-[#08060d] dark:text-white relative -top-[3px] fill-current" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                In progress
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={progressFilterRef}>
              <button
                onClick={() => setIsProgressFilterOpen(!isProgressFilterOpen)}
                className={`
                  group flex items-center justify-center gap-2 h-10 rounded-full border-transparent
                  transition-all duration-300 active:scale-[0.96] cursor-pointer
                  ${
                    isProgressFilterOpen
                      ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                      : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                  }
                `}
              >
                <span
                  className="hidden md:inline text-[12px] font-normal"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  Filters
                </span>
                <Settings2
                  className={`w-5 h-5 transition-transform duration-300 ${isProgressFilterOpen ? "scale-110 text-[#FC4C02]" : ""}`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-2 w-44
                  bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50
                  transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]
                  ${
                    isProgressFilterOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  {[
                    { id: "All Courses", label: "All Courses" },
                    { id: "In Progress", label: "In Progress" },
                    { id: "Completed", label: "Completed" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setProgressFilter(cat.id);
                        setIsProgressFilterOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal
                        transition-all duration-200 cursor-pointer
                        ${
                          progressFilter === cat.id
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {progressFilter === cat.id && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[24px] bg-white dark:bg-gray-800 border-transparent  dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group max-w-[580px]">
            <div className="flex items-start gap-6 text-left">
              {/* Course Image */}
              <div className="w-[180px] md:w-[237px] h-[133px] rounded-xl shrink-0 overflow-hidden relative bg-gray-100 dark:bg-gray-700 aspect-video">
                <img
                  src={idpRoadmapImg}
                  alt="Design Thinking Course"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide shrink-0">
                      <svg
                        className="w-3.5 h-3.5"
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

                    <div className="flex items-center gap-1.5 text-[#006bff] opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 pointer-events-none group-hover:pointer-events-auto">
                      <div className="relative group/text">
                        <span
                          className="text-[12px] font-bold relative z-10"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          Resume Course
                        </span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#006bff] transition-all duration-300 delay-100 group-hover:w-full rounded-full"></div>
                      </div>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 delay-100 group-hover:translate-x-1" />
                    </div>
                  </div>

                  <h3
                    className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight truncate w-full"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    What Is Design Thinking?
                  </h3>
                </div>

                <div className="flex items-center gap-6 mt-1.5">
                  <div className="flex flex-col gap-0">
                    <span
                      className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Course
                    </span>
                    <span
                      className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      12 Hours
                    </span>
                  </div>
                  <div className="flex flex-col gap-0">
                    <span
                      className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Complete
                    </span>
                    <span
                      className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      20%
                    </span>
                  </div>
                  <div className="flex flex-col gap-0">
                    <span
                      className="text-[11px] text-gray-500 dark:text-gray-400 font-normal leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      Duration
                    </span>
                    <span
                      className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight"
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      2 Days
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.1)]">
                    <div
                      className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                      style={{ width: `${designThinkingProgress}%` }}
                    ></div>
                  </div>
                  <span
                    className="text-[14px] font-medium text-gray-800 dark:text-gray-200 shrink-0 min-w-[36px] text-right"
                    style={{ fontFamily: '"Geometrica", sans-serif' }}
                  >
                    <AnimatedNumber value={designThinkingProgress} />%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Lessons Section */}
        <div className="relative z-0 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#08060d] dark:text-white relative -top-[6px] fill-current" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                New Courses
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={courseFilterRef}>
              <button
                onClick={() => setIsCourseFilterOpen(!isCourseFilterOpen)}
                className={`
                  group flex items-center justify-center gap-2 h-10 rounded-full border-transparent
                  transition-all duration-300 active:scale-[0.96] cursor-pointer
                  ${
                    isCourseFilterOpen
                      ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                      : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                  }
                `}
              >
                <span
                  className="hidden md:inline text-[12px] font-normal"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  Filters
                </span>
                <Settings2
                  className={`w-5 h-5 transition-transform duration-300 ${isCourseFilterOpen ? "scale-110 text-[#FC4C02]" : ""}`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-2 w-44
                  bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50
                  transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]
                  ${
                    isCourseFilterOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  {[
                    { id: "All Topics", label: "All Topics" },
                    { id: "Frontend", label: "Frontend" },
                    { id: "Backend", label: "Backend" },
                    { id: "Database", label: "Database" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCourseFilter(cat.id);
                        setIsCourseFilterOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal
                        transition-all duration-200 cursor-pointer
                        ${
                          courseFilter === cat.id
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {courseFilter === cat.id && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group/coursecarousel -mb-12 -mt-2">
            <div
              className={`absolute left-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canCoursesScrollLeft ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -ml-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canCoursesScrollLeft && "pointer-events-none"}`}
                onClick={() => {
                  if (coursesCarouselRef.current) {
                    coursesCarouselRef.current.scrollBy({
                      left: -480,
                      behavior: "smooth",
                    });
                    setTimeout(handleCoursesScroll, 500);
                  }
                }}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={coursesCarouselRef}
              onScroll={handleCoursesScroll}
              className="flex overflow-x-auto gap-3 pt-2 pb-12 snap-x snap-mandatory no-scrollbar px-1 overflow-y-visible"
              style={{ scrollBehavior: "smooth" }}
            >
              {courses
                .filter((c) => {
                  if (courseFilter === "Frontend")
                    return c.category === "FRONTEND";
                  if (courseFilter === "Backend")
                    return c.category === "BACKEND";
                  if (courseFilter === "Database")
                    return c.tags?.includes("Database");
                  return true;
                })
                .map((c) => (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredCourseId(c.id)}
                    onMouseLeave={() => setHoveredCourseId(null)}
                    className="shrink-0 w-[90vw] md:w-[580px] p-4 rounded-[24px] bg-white dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group snap-start overflow-hidden"
                    onClick={() => {
                      setSelectedCourse(c);
                      navigate("/my-idp-learning/course/" + c.id);
                    }}
                  >
                    <div className="flex gap-6 text-left h-[133px]">
                      {/* Course Image */}
                      <div className="w-[180px] md:w-[237px] h-[133px] rounded-xl shrink-0 overflow-hidden relative bg-gray-100 dark:bg-gray-700 aspect-video">
                        {hoveredCourseId === c.id ? (
                          <div className="absolute inset-0 w-full h-full pointer-events-none">
                            <iframe
                              src={`${c.videoUrl}${c.videoUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${c.videoUrl.split("/").pop()?.split("?")[0]}&iv_load_policy=3&showinfo=0&disablekb=1`}
                              className="absolute inset-0 w-full h-full"
                              title={c.title}
                              allow="autoplay; encrypted-media"
                            />
                          </div>
                        ) : (
                          <img
                            src={c.thumbnail}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0 flex flex-col h-[133px]">
                        <div className="h-[93px] flex flex-col items-start gap-1.5 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              <svg
                                className="w-3.5 h-3.5"
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
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              {c.category === "BACKEND" ? (
                                <Terminal className="w-3.5 h-3.5" />
                              ) : (
                                <AppWindow className="w-3.5 h-3.5" />
                              )}
                              {c.category.charAt(0).toUpperCase() +
                                c.category.slice(1).toLowerCase()}
                            </div>
                          </div>
                          <h3
                            className="text-[14px] font-semibold text-gray-800 dark:text-white leading-tight line-clamp-2"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {c.title.split("-")[0].trim()}
                          </h3>
                          <p
                            className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mt-1 leading-tight line-clamp-1"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {c.description}
                          </p>
                        </div>

                        <div className="h-[40px] flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                            <Clock className="w-4 h-4 opacity-80 shrink-0" />
                            <span
                              className="text-[11px] font-normal leading-tight"
                              style={{ fontFamily: '"Geometrica", sans-serif' }}
                            >
                              {c.duration}
                            </span>
                          </div>
                          <button className="w-8 h-8 rounded-full bg-[#006bff] flex items-center justify-center active:scale-95 hover:bg-[#0056cc] group-hover:bg-[#0056cc] transition-all shrink-0 cursor-pointer shadow-sm">
                            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div
              className={`absolute right-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canCoursesScrollRight ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -mr-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canCoursesScrollRight && "pointer-events-none"}`}
                onClick={() => {
                  if (coursesCarouselRef.current) {
                    coursesCarouselRef.current.scrollBy({
                      left: 480,
                      behavior: "smooth",
                    });
                    setTimeout(handleCoursesScroll, 500);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Short Learning Reels */}
        <div className="mb-8 relative z-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Clapperboard className="w-5 h-5 text-[#08060d] dark:text-white relative -top-[3px]" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Quick Bites
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={reelsFilterRef}>
              <button
                title="Filter Reels"
                onClick={() => setIsReelsFilterOpen(!isReelsFilterOpen)}
                className={`
                  group flex items-center justify-center gap-2 h-10 rounded-full border-transparent
                  transition-all duration-300 active:scale-[0.96] cursor-pointer
                  ${
                    isReelsFilterOpen
                      ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                      : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                  }
                `}
              >
                <span
                  className="hidden md:inline text-[12px] font-normal"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  Filters
                </span>
                <Settings2
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isReelsFilterOpen ? "scale-110 text-[#FC4C02]" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-2 w-40 
                  bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50 
                  transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]
                  ${
                    isReelsFilterOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  {[
                    { id: "ALL", label: "All Reels" },
                    { id: "FRONTEND", label: "Frontend" },
                    { id: "BACKEND", label: "Backend" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setReelsFilter(cat.id);
                        setIsReelsFilterOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal 
                        transition-all duration-200 cursor-pointer
                        ${
                          reelsFilter === cat.id
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {reelsFilter === cat.id && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group/carousel -mb-12 -mt-2">
            <div
              className={`absolute left-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -ml-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canScrollLeft && "pointer-events-none"}`}
                onClick={() => {
                  if (reelsCarouselRef.current) {
                    reelsCarouselRef.current.scrollBy({
                      left: -240,
                      behavior: "smooth",
                    });

                    setTimeout(handleReelsScroll, 500);
                  }
                }}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={reelsCarouselRef}
              onScroll={handleReelsScroll}
              className="flex overflow-x-auto gap-3 pt-2 pb-12 snap-x snap-mandatory no-scrollbar px-1 overflow-y-visible"
              style={{ scrollBehavior: "smooth" }}
            >
              {filteredReels.map((reel) => {
                return (
                  <div
                    key={reel.id}
                    className="relative shrink-0 w-[180px] sm:w-[200px] md:w-[220px] aspect-[9/16] cursor-pointer shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:ring-1 hover:ring-white/40 dark:hover:ring-white/10 hover:translate-y-[-2px] transition-all duration-300 snap-start group rounded-2xl"
                    onMouseEnter={() => setHoveredReelId(reel.id)}
                    onMouseLeave={() => setHoveredReelId(null)}
                    onClick={() => {
                      setSelectedReel(reel);
                      setActiveReelId(reel.id);
                    }}
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
                      {hoveredReelId === reel.id ? (
                        <div className="absolute inset-0 w-full h-full pointer-events-none">
                          <iframe
                            src={`${reel.videoUrl}${reel.videoUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${reel.videoUrl.split("/").pop()?.split("?")[0]}&iv_load_policy=3&showinfo=0&disablekb=1`}
                            className="absolute inset-0 w-full h-full"
                            title={reel.title}
                            allow="autoplay; encrypted-media"
                          />
                        </div>
                      ) : (
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                        />
                      )}

                      <div className="absolute top-3 right-2 z-20">
                        <button
                          className="text-white drop-shadow-md hover:bg-white/20 p-1.5 rounded-full backdrop-blur-xs transition-all duration-300 active:scale-[0.96] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

                      <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end text-left">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="bg-black/30 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                            {reel.category === "BACKEND" ? (
                              <Terminal className="w-3 h-3" />
                            ) : (
                              <AppWindow className="w-3 h-3" />
                            )}
                            {reel.category.charAt(0).toUpperCase() +
                              reel.category.slice(1).toLowerCase()}
                          </div>
                        </div>
                        <h3
                          className="text-[14px] font-medium text-white leading-tight mb-2 line-clamp-2"
                          style={{ fontFamily: '"Geometrica", sans-serif' }}
                        >
                          {reel.title}
                        </h3>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[11px] font-normal text-white/90">
                            <Play className="w-3 h-3 fill-white/90" />
                            {reel.views}
                          </div>
                          <span className="text-white/50 text-[10px]">•</span>
                          <span className="text-[11px] font-normal text-white/90">
                            {reel.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`absolute right-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -mr-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canScrollRight && "pointer-events-none"}`}
                onClick={() => {
                  if (reelsCarouselRef.current) {
                    reelsCarouselRef.current.scrollBy({
                      left: 240,
                      behavior: "smooth",
                    });
                    setTimeout(handleReelsScroll, 500);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Full Lesson Section */}
        <div className="relative z-0 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#08060d] dark:text-white relative -top-[3px]" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Full Lesson
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={newCourseFilterRef}>
              <button
                onClick={() => setIsNewCourseFilterOpen(!isNewCourseFilterOpen)}
                className={`
                  group flex items-center justify-center gap-2 h-10 rounded-full border
                  transition-all duration-300 active:scale-[0.96] cursor-pointer
                  ${
                    isNewCourseFilterOpen
                      ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                      : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-200/60 dark:hover:border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                  }
                `}
              >
                <span
                  className="hidden md:inline text-[12px] font-normal"
                  style={{ fontFamily: '"Geometrica", sans-serif' }}
                >
                  Filters
                </span>
                <Settings2
                  className={`w-5 h-5 transition-transform duration-300 ${isNewCourseFilterOpen ? "scale-110 text-[#FC4C02]" : ""}`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-2 w-44
                  bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50
                  transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]
                  ${
                    isNewCourseFilterOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  {[
                    { id: "All Topics", label: "All Topics" },
                    { id: "Frontend", label: "Frontend" },
                    { id: "Backend", label: "Backend" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setNewCourseFilter(cat.id);
                        setIsNewCourseFilterOpen(false);
                      }}
                      className={`
                        flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal
                        transition-all duration-200 cursor-pointer
                        ${
                          newCourseFilter === cat.id
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                        }
                      `}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {newCourseFilter === cat.id && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group/newcoursecarousel -mb-12 -mt-2">
            <div
              className={`absolute left-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canNewCoursesScrollLeft ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -ml-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canNewCoursesScrollLeft && "pointer-events-none"}`}
                onClick={() => {
                  if (newCoursesCarouselRef.current) {
                    newCoursesCarouselRef.current.scrollBy({ left: -480, behavior: "smooth" });
                    setTimeout(handleNewCoursesScroll, 500);
                  }
                }}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={newCoursesCarouselRef}
              onScroll={handleNewCoursesScroll}
              className="flex overflow-x-auto gap-3 pt-2 pb-12 snap-x snap-mandatory no-scrollbar px-1 overflow-y-visible"
              style={{ scrollBehavior: "smooth" }}
            >
              {newCourses
                .filter((c) => {
                  if (newCourseFilter === "Frontend") return c.category === "FRONTEND";
                  if (newCourseFilter === "Backend") return c.category === "BACKEND";
                  return true;
                })
                .map((c) => (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredNewCourseId(c.id)}
                    onMouseLeave={() => setHoveredNewCourseId(null)}
                    className="shrink-0 w-[90vw] md:w-[580px] p-4 rounded-[24px] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group snap-start overflow-hidden"
                    onClick={() => {
                      setSelectedCourse(c);
                      navigate("/my-idp-learning/course/" + c.id);
                    }}
                  >
                    <div className="flex gap-6 text-left h-[133px]">
                      <div className="w-[180px] md:w-[237px] h-[133px] rounded-xl shrink-0 overflow-hidden relative bg-gray-100 dark:bg-gray-700 aspect-video">
                        {hoveredNewCourseId === c.id ? (
                          <div className="absolute inset-0 w-full h-full pointer-events-none">
                            <iframe
                              src={`${c.videoUrl}${c.videoUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${c.videoUrl.split("/").pop()?.split("?")[0]}&iv_load_policy=3&showinfo=0&disablekb=1`}
                              className="absolute inset-0 w-full h-full"
                              title={c.title}
                              allow="autoplay; encrypted-media"
                            />
                          </div>
                        ) : (
                          <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col h-[133px]">
                        <div className="h-[93px] flex flex-col items-start gap-1.5 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="8.5" cy="8.5" r="5.2" />
                                <circle cx="15.5" cy="8.5" r="5.2" />
                                <circle cx="8.5" cy="15.5" r="5.2" />
                                <circle cx="15.5" cy="15.5" r="5.2" />
                              </svg>
                              Course
                            </div>
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              {c.category === "BACKEND" ? (
                                <Terminal className="w-3.5 h-3.5" />
                              ) : (
                                <AppWindow className="w-3.5 h-3.5" />
                              )}
                              {c.category.charAt(0).toUpperCase() + c.category.slice(1).toLowerCase()}
                            </div>
                          </div>
                          <h3
                            className="text-[15px] font-semibold text-gray-800 dark:text-white leading-tight line-clamp-2"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {c.title.split("-")[0].trim()}
                          </h3>
                          <p
                            className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mt-1 leading-tight line-clamp-1"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {c.description}
                          </p>
                        </div>

                        <div className="h-[40px] flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                            <Clock className="w-4 h-4 opacity-80 shrink-0" />
                            <span
                              className="text-[11px] font-normal leading-tight"
                              style={{ fontFamily: '"Geometrica", sans-serif' }}
                            >
                              {c.duration}
                            </span>
                          </div>
                          <button className="w-8 h-8 rounded-full bg-[#006bff] flex items-center justify-center active:scale-95 hover:bg-[#0056cc] group-hover:bg-[#0056cc] transition-all shrink-0 cursor-pointer shadow-sm">
                            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div
              className={`absolute right-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canNewCoursesScrollRight ? "opacity-100" : "opacity-0"}`}
            >
              <button
                className={`w-12 h-12 -mr-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${!canNewCoursesScrollRight && "pointer-events-none"}`}
                onClick={() => {
                  if (newCoursesCarouselRef.current) {
                    newCoursesCarouselRef.current.scrollBy({ left: 480, behavior: "smooth" });
                    setTimeout(handleNewCoursesScroll, 500);
                  }
                }}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Series Section */}
        <div className="relative z-0 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#08060d] dark:text-white relative -top-[3px]" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Series
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={seriesFilterRef}>
              <button
                onClick={() => setIsSeriesFilterOpen(!isSeriesFilterOpen)}
                className={`group flex items-center justify-center gap-2 h-10 rounded-full border transition-all duration-300 active:scale-[0.96] cursor-pointer ${
                  isSeriesFilterOpen
                    ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                    : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-200/60 dark:hover:border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                }`}
              >
                <span className="hidden md:inline text-[12px] font-normal" style={{ fontFamily: '"Geometrica", sans-serif' }}>Filters</span>
                <Settings2 className={`w-5 h-5 transition-transform duration-300 ${isSeriesFilterOpen ? "scale-110 text-[#FC4C02]" : ""}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50 transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] ${
                isSeriesFilterOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}>
                <div className="flex flex-col gap-1">
                  {[{ id: "All", label: "All Series" }, { id: "FRONTEND", label: "Frontend" }, { id: "BACKEND", label: "Backend" }, { id: "DATABASE", label: "Database" }].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSeriesFilter(cat.id); setIsSeriesFilterOpen(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal transition-all duration-200 cursor-pointer ${
                        seriesFilter === cat.id
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {seriesFilter === cat.id && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group/seriescarousel -mb-12 -mt-2">
            <div className={`absolute left-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canSeriesScrollLeft ? "opacity-100" : "opacity-0"}`}>
              <button
                className="w-12 h-12 -ml-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none"
                onClick={() => { seriesCarouselRef.current?.scrollBy({ left: -480, behavior: "smooth" }); setTimeout(handleSeriesScroll, 500); }}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={seriesCarouselRef}
              onScroll={handleSeriesScroll}
              className="flex overflow-x-auto gap-3 pt-2 pb-12 snap-x snap-mandatory no-scrollbar px-1 overflow-y-visible"
              style={{ scrollBehavior: "smooth" }}
            >
              {seriesData
                .filter((s) => seriesFilter === "All" || s.category === seriesFilter)
                .map((s) => (
                  <div
                    key={s.id}
                    className="shrink-0 w-[90vw] md:w-[580px] p-4 rounded-[24px] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-white/5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group snap-start overflow-hidden"
                    onClick={() => { setSelectedSeries(s); navigate("/my-idp-learning/series/" + s.id); }}
                  >
                    <div className="flex gap-6 text-left h-[133px]">
                      {/* Thumbnail */}
                      <div className="w-[180px] md:w-[237px] h-[133px] rounded-xl shrink-0 overflow-hidden relative bg-gray-100 dark:bg-gray-700 aspect-video">
                        <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col h-[133px]">
                        <div className="h-[93px] flex flex-col items-start gap-1.5 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              <Layers className="w-3.5 h-3.5" />
                              Series
                            </div>
                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 text-[11px] font-semibold tracking-wide">
                              {s.category === "BACKEND" ? (
                                <Terminal className="w-3.5 h-3.5" />
                              ) : s.category === "DATABASE" ? (
                                <FileText className="w-3.5 h-3.5" />
                              ) : (
                                <AppWindow className="w-3.5 h-3.5" />
                              )}
                              {s.category.charAt(0).toUpperCase() + s.category.slice(1).toLowerCase()}
                            </div>
                          </div>
                          <h3
                            className="text-[15px] font-semibold text-gray-800 dark:text-white leading-tight line-clamp-2"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {s.title}
                          </h3>
                          <p
                            className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mt-1 leading-tight line-clamp-1"
                            style={{ fontFamily: '"Geometrica", sans-serif' }}
                          >
                            {s.description}
                          </p>
                        </div>

                        <div className="h-[40px] flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                            <Layers className="w-4 h-4 opacity-80 shrink-0" />
                            <span
                              className="text-[11px] font-normal leading-tight"
                              style={{ fontFamily: '"Geometrica", sans-serif' }}
                            >
                              {s.modules} modules · {s.videos} videos
                            </span>
                          </div>
                          <button className="w-8 h-8 rounded-full bg-[#006bff] flex items-center justify-center active:scale-95 hover:bg-[#0056cc] group-hover:bg-[#0056cc] transition-all shrink-0 cursor-pointer shadow-sm">
                            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className={`absolute right-0 top-[calc(50%-24px)] -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canSeriesScrollRight ? "opacity-100" : "opacity-0"}`}>
              <button
                className="w-12 h-12 -mr-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none"
                onClick={() => { seriesCarouselRef.current?.scrollBy({ left: 480, behavior: "smooth" }); setTimeout(handleSeriesScroll, 500); }}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Reading Hub Section */}
        <div className="relative z-0 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#08060d] dark:text-white relative -top-[3px]" />
              <h2
                className="!text-[18px] font-medium !text-[#08060d] dark:!text-white leading-none"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Reading Hub
              </h2>
            </div>
            <div className="relative -top-[3px]" ref={readingFilterRef}>
              <button
                onClick={() => setIsReadingFilterOpen(!isReadingFilterOpen)}
                className={`group flex items-center justify-center gap-2 h-10 rounded-full border transition-all duration-300 active:scale-[0.96] cursor-pointer ${
                  isReadingFilterOpen
                    ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-200/50 dark:border-transparent shadow-xl translate-y-[-1px] text-gray-700 dark:text-gray-300 px-4"
                    : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent hover:border-gray-200/60 dark:hover:border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] w-10 md:w-auto md:px-4"
                }`}
              >
                <span className="hidden md:inline text-[12px] font-normal" style={{ fontFamily: '"Geometrica", sans-serif' }}>Filters</span>
                <Settings2 className={`w-5 h-5 transition-transform duration-300 ${isReadingFilterOpen ? "scale-110 text-[#FC4C02]" : ""}`} />
              </button>
              <div className={`absolute top-full right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl p-1.5 z-50 transition-all duration-300 origin-top-right shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] ${
                isReadingFilterOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}>
                <div className="flex flex-col gap-1">
                  {[{ id: "All", label: "All Books" }, { id: "Engineering", label: "Engineering" }, { id: "Frontend", label: "Frontend" }, { id: "Backend", label: "Backend" }].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setReadingFilter(cat.id); setIsReadingFilterOpen(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[12px] font-normal transition-all duration-200 cursor-pointer ${
                        readingFilter === cat.id
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      style={{ fontFamily: '"Geometrica", sans-serif' }}
                    >
                      <span className="flex-1 text-left">{cat.label}</span>
                      {readingFilter === cat.id && <Check className="w-4 h-4 text-orange-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group/readingcarousel -mb-4 -mt-2">
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canReadingScrollLeft ? "opacity-100" : "opacity-0"}`}>
              <button
                className="w-12 h-12 -ml-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none"
                onClick={() => { readingCarouselRef.current?.scrollBy({ left: -400, behavior: "smooth" }); setTimeout(handleReadingScroll, 500); }}
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            <div
              ref={readingCarouselRef}
              onScroll={handleReadingScroll}
              className="flex overflow-x-auto gap-4 pt-2 pb-4 snap-x snap-mandatory no-scrollbar px-1"
              style={{ scrollBehavior: "smooth" }}
            >
              {readingHubData
                .filter((r) => readingFilter === "All" || r.category === readingFilter)
                .map((r) => (
                  <div
                    key={r.id}
                    className="shrink-0 w-[140px] sm:w-[155px] md:w-[165px] cursor-pointer snap-start group"
                    onClick={() => { setSelectedReading(r); navigate("/my-idp-learning/reading/" + r.id); }}
                  >
                    <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300">
                      <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <div className="w-7 h-7 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center shadow">
                          <FileText className="w-3.5 h-3.5 text-[#fc4c02]" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 px-0.5">
                      <p className="text-[12px] font-medium text-gray-800 dark:text-white leading-tight line-clamp-2" style={{ fontFamily: '"Geometrica", sans-serif' }}>{r.title}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5" style={{ fontFamily: '"Geometrica", sans-serif' }}>{r.author}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5" style={{ fontFamily: '"Geometrica", sans-serif' }}>{r.pages} pages · PDF</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center px-4 pointer-events-none transition-opacity duration-300 ${canReadingScrollRight ? "opacity-100" : "opacity-0"}`}>
              <button
                className="w-12 h-12 -mr-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white pointer-events-auto border border-transparent hover:border-gray-200/60 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none"
                onClick={() => { readingCarouselRef.current?.scrollBy({ left: 400, behavior: "smooth" }); setTimeout(handleReadingScroll, 500); }}
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Short Learning Reel Modal */}
        {selectedReel && (
          <div
            className="fixed inset-0 z-[100] bg-white dark:bg-[#0f0f0f]"
            onWheel={handleWheel}
            onClick={() => {
              setSelectedReel(null);
              setActiveReelId(null);
            }}
          >
            <button
              className="fixed top-2 left-2 z-[110] w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none"
              onClick={() => {
                setSelectedReel(null);
                setActiveReelId(null);
              }}
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Navigation Arrows */}
            <div
              className="fixed right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleScrollToPrev}
                className={`w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${
                  activeReelId &&
                  shortLearningReels.findIndex((r) => r.id === activeReelId) > 0
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
              >
                <ChevronUp className="w-7 h-7 stroke-[2.5]" />
              </button>
              <button
                onClick={handleScrollToNext}
                className={`w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 active:scale-[0.96] transition-all duration-500 ease-in-out text-[#08060d] dark:text-white border-transparent hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] outline-none ${
                  activeReelId &&
                  shortLearningReels.findIndex((r) => r.id === activeReelId) <
                    shortLearningReels.length - 1
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
              >
                <ChevronDown className="w-7 h-7 stroke-[2.5]" />
              </button>
            </div>

            {/* Scroll Feed Container */}
            <div
              ref={scrollContainerRef}
              className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar"
            >
              {shortLearningReels.map((reel) => {
                const isActive = activeReelId === reel.id;
                const isLandscape = reel.aspectRatio === "16:9";

                return (
                  <div
                    key={reel.id}
                    data-reel-id={reel.id}
                    ref={(el) => {
                      if (el) reelRefs.current[reel.id] = el;
                    }}
                    className="snap-start snap-always shrink-0 w-full h-[100vh] flex items-center justify-center"
                  >
                    <div
                      className={`relative flex ${isLandscape ? "flex-col items-center justify-center" : "items-center justify-center"} gap-6 h-[85vh] w-full ${isLandscape ? "max-w-4xl" : "max-w-6xl"} px-4`}
                    >
                      {/* Center Column - Video Player */}
                      <div
                        className={`relative ${isLandscape ? "w-full max-w-[750px]" : "h-full"} flex flex-col items-center justify-center`}
                      >
                        <div
                          className={`relative ${isLandscape ? "w-full aspect-video" : "h-full aspect-[9/16]"} rounded-xl overflow-hidden shadow-2xl shadow-black/20 group isolation-isolate transform translate-z-0`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Video */}
                          {isActive ? (
                            reel.videoUrl.includes("youtube") ||
                            reel.videoUrl.includes("youtu.be") ? (
                              <div className="absolute inset-0 w-full h-full">
                                <iframe
                                  id={`iframe-${reel.id}`}
                                  className="absolute inset-0 w-full h-full transition-opacity duration-500"
                                  src={`${reel.videoUrl}?autoplay=1&controls=1&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
                                  title={reel.title}
                                  frameBorder="0"
                                  style={{ border: "none" }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                                <div className="absolute inset-y-0 left-0 w-8 z-10 border-none" />
                                <div className="absolute inset-y-0 right-0 w-8 z-10 border-none" />
                                <div className="absolute inset-x-0 top-0 h-8 z-10 border-none" />
                              </div>
                            ) : (
                              <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                              >
                                <source src={reel.videoUrl} />
                                Your browser does not support the video tag.
                              </video>
                            )
                          ) : (
                            <img
                              src={reel.thumbnail}
                              alt={reel.title}
                              className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                          )}
                        </div>

                        {/* Reel Info */}
                        {isActive && (
                          <div
                            className="fixed bottom-4 left-4 z-[110] text-left space-y-1.5 max-w-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a
                              href={reel.authorUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 group/author"
                            >
                              <div className="w-9 h-9 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center text-[#08060d] dark:text-white shrink-0 border-transparent border-transparent group-hover/author: group-hover/author:bg-white dark:group-hover/author:bg-gray-700 group-hover/author:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-500 ease-in-out">
                                {reel.icon && (
                                  <reel.icon className="w-4.5 h-4.5 stroke-[2.5]" />
                                )}
                              </div>
                              <div className="flex flex-col items-start gap-0 relative group/author-text overflow-hidden">
                                <span
                                  className="text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300 truncate relative z-10"
                                  style={
                                    {
                                      "--hover-color": [
                                        "#006bff",
                                        "#fc4c02",
                                        "#ffa400",
                                      ][
                                        parseInt(reel.id.replace("reel-", "")) %
                                          3
                                      ],
                                    } as React.CSSProperties
                                  }
                                >
                                  <span className="group-hover/author:text-[var(--hover-color)] transition-colors duration-300">
                                    {reel.author}
                                  </span>
                                </span>

                                <div
                                  className="absolute bottom-0 left-0 w-0 h-[2.5px] transition-all duration-300 group-hover/author:w-full rounded-full"
                                  style={
                                    {
                                      backgroundColor: [
                                        "#006bff",
                                        "#fc4c02",
                                        "#ffa400",
                                      ][
                                        parseInt(reel.id.replace("reel-", "")) %
                                          3
                                      ],
                                    } as React.CSSProperties
                                  }
                                ></div>
                              </div>
                            </a>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                              <Play className="w-3 h-3 fill-current shrink-0" />
                              <span className="truncate">
                                {reel.description}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                              {reel.title}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
