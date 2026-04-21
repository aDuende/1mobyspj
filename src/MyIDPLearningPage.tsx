import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Filter } from "lucide-react";

export default function MyIDPLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<null | {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    videoUrl: string;
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

  const [selectedReel, setSelectedReel] = useState<null | {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    views: string;
    videoUrl: string;
  }>(null);

  const courses = [
    {
      id: "jwt",
      title: "What is JWT and Why Should You Use JWT",
      description: "What is JWT and Why Should You Use JWT",
      fullDescription: "Learn about JWT (JSON Web Tokens) and why it's essential for modern web development. This course covers the fundamentals of token-based authentication and how to implement it securely.",
      category: "BACKEND",
      videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM",
      rating: 4.8,
      reviews: 1250,
      instructor: "Expert Instructor",
      duration: "3-4 hours",
      lessons: 28,
      modules: 5,
      isFree: true,
      tags: ["Backend", "Security", "Authentication"],
      highlights: [
        "Understand JWT structure and how it works",
        "Implement secure token-based authentication",
        "Learn best practices for JWT implementation",
        "Practical examples with real-world scenarios",
      ],
    },
    {
      id: "react-ts",
      title: "TypeScript in React - COMPLETE Tutorial (Crash Course)",
      description: "TypeScript in React - COMPLETE Tutorial (Crash Course)",
      fullDescription: "Master TypeScript in React with this comprehensive guide. Learn how to use TypeScript to build type-safe React applications with improved developer experience and fewer runtime errors.",
      category: "FRONTEND",
      videoUrl: "https://www.youtube.com/embed/BwuLxPH8IDs",
      rating: 4.9,
      reviews: 2540,
      instructor: "React Expert",
      duration: "4-5 hours",
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
      fullDescription: "Complete guide to PostgreSQL database management system. Learn SQL queries, database design, and advanced features to become proficient with one of the most powerful open-source databases.",
      category: "BACKEND",
      videoUrl: "https://www.youtube.com/embed/q7p3k8fJqYQ",
      rating: 4.7,
      reviews: 1890,
      instructor: "Database Expert",
      duration: "5-6 hours",
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

  const shortLearningReels = [
    {
      id: "reel-1",
      title: "5 min: Git Basics",
      description: "Learn the essentials of Git in just 5 minutes",
      category: "BACKEND",
      duration: "5 min",
      views: "12.5K",
      thumbnail: "https://via.placeholder.com/300x300?text=Git+Basics",
      videoUrl: "https://www.youtube.com/embed/USjZcfj8yxE",
    },
    {
      id: "reel-2",
      title: "CSS Flexbox Tips",
      description: "Quick CSS Flexbox tips for better layouts",
      category: "FRONTEND",
      duration: "3 min",
      views: "45.2K",
      thumbnail: "https://via.placeholder.com/300x300?text=CSS+Flexbox",
      videoUrl: "https://www.youtube.com/embed/JJSoEo8JSnc",
    },
    {
      id: "reel-3",
      title: "REST API Design",
      description: "Best practices for designing REST APIs",
      category: "BACKEND",
      duration: "4 min",
      views: "28.7K",
      thumbnail: "https://via.placeholder.com/300x300?text=REST+API",
      videoUrl: "https://www.youtube.com/embed/SLwpqD8n3d0",
    },
    {
      id: "reel-4",
      title: "React Hooks Tutorial",
      description: "Understanding React Hooks in 4 minutes",
      category: "FRONTEND",
      duration: "4 min",
      views: "89.3K",
      thumbnail: "https://via.placeholder.com/300x300?text=React+Hooks",
      videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q",
    },
    {
      id: "reel-5",
      title: "Database Indexing",
      description: "Why database indexes matter for performance",
      category: "BACKEND",
      duration: "6 min",
      views: "15.8K",
      thumbnail: "https://via.placeholder.com/300x300?text=DB+Indexing",
      videoUrl: "https://www.youtube.com/embed/fsG1XaZxSDE",
    },
    {
      id: "reel-6",
      title: "TypeScript Types",
      description: "Essential TypeScript types explained",
      category: "FRONTEND",
      duration: "5 min",
      views: "34.1K",
      thumbnail: "https://via.placeholder.com/300x300?text=TS+Types",
      videoUrl: "https://www.youtube.com/embed/U6s2pdxebSo",
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My IDP & Learning</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 text-left">Growing Area.</p>
          </div>
          <Button variant="link" className="text-blue-500 hover:text-blue-600">
            My Certificated
          </Button>
        </div>

        {/* Learning Timeline and My Learning Path */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Timeline */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Learning Timeline</CardTitle>
              <Button variant="outline" size="sm">Month</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chart Area */}
              <div className="relative h-48 bg-linear-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                  {/* Grid lines */}
                  <line x1="0" y1="140" x2="400" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Gradient area under the line */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path d="M 50 100 L 150 80 L 250 60 L 350 30 L 350 140 L 50 140 Z" fill="url(#areaGradient)" />
                  
                  {/* Line */}
                  <path d="M 50 100 L 150 80 L 250 60 L 350 30" stroke="url(#lineGradient)" strokeWidth="3" fill="none" />
                  
                  {/* Data points */}
                  <circle cx="50" cy="100" r="5" fill="#a855f7" />
                  <circle cx="150" cy="80" r="5" fill="#3b82f6" />
                  <circle cx="250" cy="60" r="5" fill="#3b82f6" />
                  <circle cx="350" cy="30" r="5" stroke="#9ca3af" strokeWidth="2" fill="white" />
                  
                  {/* X-axis labels */}
                  <text x="50" y="155" fontSize="12" fill="#9ca3af" textAnchor="middle">Jan</text>
                  <text x="150" y="155" fontSize="12" fill="#9ca3af" textAnchor="middle">Feb</text>
                  <text x="250" y="155" fontSize="12" fill="#9ca3af" textAnchor="middle">March</text>
                  <text x="350" y="155" fontSize="12" fill="#9ca3af" textAnchor="middle">April</text>
                </svg>
              </div>

              {/* Skill Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skill Distribution</h3>
                <div className="space-y-3">
                  {[
                    { skill: "Frontend", percentage: 40, color: "bg-blue-500" },
                    { skill: "Backend", percentage: 40, color: "bg-yellow-500" },
                    { skill: "Database", percentage: 15, color: "bg-green-500" },
                    { skill: "AI/Data", percentage: 5, color: "bg-red-400" },
                  ].map((item) => (
                    <div key={item.skill} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-20">{item.skill}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                        <div 
                          className={`${item.color} h-full rounded-full transition-all`} 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-10 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Learning Path */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>My Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Functional Path */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Functional</span>
                  <span className="text-xs text-blue-500">Standard</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-white">Fullstack Dev Course</span>
                    <span className="inline-flex items-center gap-1 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      In Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Path */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Core</span>
                  <span className="text-xs text-orange-500">Lower Than Expected Level</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-white">Design Thinking</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Not Started
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* In progress Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">In progress</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Upcoming + IDP
            </Button>
          </div>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Course Image */}
                <div className="w-40 h-24 bg-linear-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231e293b' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='12' fill='white' text-anchor='middle' dominant-baseline='middle'%3EIDP Plan%3C/text%3E%3C/svg%3E"
                    alt="Course thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Title */}
                <div className="min-w-0 w-48">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-left">IDP Plan</div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    What Is Design Thinking?
                  </h3>
                </div>

                {/* Stats */}
                <div className="flex flex-1 justify-around text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Course</div>
                    <div className="font-medium text-gray-900 dark:text-white">12Hours</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Complete</div>
                    <div className="font-medium text-gray-900 dark:text-white">20%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400 mb-1">Duration</div>
                    <div className="font-medium text-gray-900 dark:text-white">2 Days</div>
                  </div>
                </div>

                {/* Start Button */}
                <Button variant="outline" className="self-center">Start</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Course Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Course</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Tech • Web • PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {courses.map((c) => (
              <Card
                key={c.id}
                className="bg-white dark:bg-gray-800 overflow-hidden p-2 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedCourse(c)}
              >
                <div className="relative h-32 flex items-center justify-center rounded-lg">
                  {/* Simple visual variants based on category */}
                  <div
                    className={`absolute inset-0 rounded-lg ${c.category === 'FRONTEND' ? 'bg-linear-to-br from-purple-600 to-blue-500' : 'bg-linear-to-br from-gray-400 to-gray-600'}`}
                  />
                  <div className="relative z-10 text-white text-xl font-bold">{c.title.split('-')[0]}</div>
                </div>
                <CardContent className="relative p-1 pt-6">
                  <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                    {c.category}
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white text-left">{c.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Short Learning Reels Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Short Learning - Reels</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              All Topics
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {shortLearningReels.map((reel) => (
              <Card
                key={reel.id}
                className="bg-white dark:bg-gray-800 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => setSelectedReel(reel)}
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-square bg-linear-to-br from-gray-300 to-gray-400 overflow-hidden">
                  <div className={`absolute inset-0 ${reel.category === 'FRONTEND' ? 'bg-linear-to-br from-purple-600 to-blue-500' : 'bg-linear-to-br from-gray-400 to-gray-600'} flex items-center justify-center`}>
                    <span className="text-white text-3xl group-hover:scale-110 transition-transform">▶</span>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {reel.duration}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{reel.views} views</p>
                  <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded">
                    {reel.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedCourse(null)} />
            <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden my-8">
              {/* Close Button */}
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-20"
              >
                ✕
              </Button>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Left Column - Video & Description */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Introduction Video */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Introduction Video</h3>
                    {selectedCourse.videoUrl.includes('youtube') || selectedCourse.videoUrl.includes('youtu.be') ? (
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-800">
                        <iframe
                          className="w-full h-full"
                          src={selectedCourse.videoUrl}
                          title={selectedCourse.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video className="w-full rounded-lg" controls>
                        <source src={selectedCourse.videoUrl} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>

                  {/* Course Title & Rating */}
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs px-3 py-1 rounded-full font-medium">
                            {selectedCourse.isFree ? "FREE" : "PREMIUM"}
                          </span>
                          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-3 py-1 rounded-full">
                            {selectedCourse.category}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h2>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{selectedCourse.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">({selectedCourse.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedCourse.instructor.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedCourse.instructor}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {selectedCourse.fullDescription}
                    </p>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What You'll Learn</h3>
                    <ul className="space-y-3">
                      {selectedCourse.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                            <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Course Info Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6 sticky top-6">
                    {/* Course Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">⏱️</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedCourse.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedCourse.lessons} lessons</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📦</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Modules</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{selectedCourse.modules} modules</p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700" />

                    {/* Tags */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700" />

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6">
                        Start Learning
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedCourse(null)}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Short Learning Reel Modal */}
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedReel(null)} />
            <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden my-8">
              {/* Close Button */}
              <Button 
                variant="ghost" 
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 z-20"
              >
                ✕
              </Button>

              <div className="p-6 space-y-4">
                {/* Video */}
                <div>
                  {selectedReel.videoUrl.includes('youtube') || selectedReel.videoUrl.includes('youtu.be') ? (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-800">
                      <iframe
                        className="w-full h-full"
                        src={selectedReel.videoUrl}
                        title={selectedReel.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video className="w-full rounded-lg" controls>
                      <source src={selectedReel.videoUrl} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                {/* Title and Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
                      {selectedReel.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">• {selectedReel.duration}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">• {selectedReel.views} views</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedReel.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{selectedReel.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Add to Watchlist
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedReel(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
