import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Clock, Users } from "lucide-react";

export default function ShortLearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<null | {
    id: string;
    title: string;
    description: string;
    duration: string;
    category: string;
    videoUrl: string;
    instructor?: string;
    participants?: number;
  }>(null);

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
    },
  ];

  const categories = [
    { name: "All", color: "bg-gray-100 text-gray-700" },
    { name: "DEVELOPMENT", color: "bg-blue-100 text-blue-700" },
    { name: "SOFT SKILLS", color: "bg-purple-100 text-purple-700" },
    { name: "SKILLS", color: "bg-green-100 text-green-700" },
  ];

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find((c) => c.name === category);
    return categoryObj ? categoryObj.color : "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Short Learning
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 text-left">
              Quick bite-sized learning sessions for busy professionals
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              size="sm"
              className={`whitespace-nowrap ${category.color}`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg cursor-pointer transition-shadow"
              onClick={() => setSelectedCourse(course)}
            >
              {/* Video Thumbnail */}
              <div className="relative h-40 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
                <svg
                  className="w-12 h-12 text-white opacity-70"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Category Badge */}
                <div>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded font-medium ${getCategoryColor(
                      course.category
                    )}`}
                  >
                    {course.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor & Participants */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {course.instructor && (
                      <p className="font-medium">Instructor: {course.instructor}</p>
                    )}
                    {course.participants && (
                      <p className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.participants.toLocaleString()} learning
                      </p>
                    )}
                  </div>
                </div>

                {/* Watch Button */}
                <Button className="w-full mt-2" onClick={() => setSelectedCourse(course)}>
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCourse(null)}
          />
          <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-gray-900 rounded shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCourse.title}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedCourse.duration}
                  </span>
                  {selectedCourse.instructor && (
                    <span>By {selectedCourse.instructor}</span>
                  )}
                </div>
              </div>
              <Button variant="ghost" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
            </div>
            <div className="p-4">
              {selectedCourse.videoUrl.includes("youtube") ||
              selectedCourse.videoUrl.includes("youtu.be") ? (
                <div className="aspect-video w-full">
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
                <video className="w-full rounded" controls>
                  <source src={selectedCourse.videoUrl} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
