import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Filter } from "lucide-react";

export default function MyIDPLearningPage() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 text-foreground">My IDP & Learning</h2>
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
              <div className="relative h-48 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
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
                  <circle cx="350" cy="30" r="5" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" fill="white" />
                  
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
                <div className="w-40 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
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
            {/* JWT Course */}
            <Card className="bg-white dark:bg-gray-800 overflow-hidden p-2">
              <div className="relative h-32 bg-black flex items-center justify-center px-6 rounded-lg">
                {/* Colorful pinwheel icon */}
                <svg className="w-20 h-20" viewBox="0 0 100 100">
                  {/* Center circle */}
                  <circle cx="50" cy="50" r="8" fill="#000" stroke="#fff" strokeWidth="2"/>
                  
                  {/* Colorful petals - arranged in a circle */}
                  {[
                    { angle: 0, color: '#ffffff' },
                    { angle: 45, color: '#ff69b4' },
                    { angle: 90, color: '#ff1493' },
                    { angle: 135, color: '#a855f7' },
                    { angle: 180, color: '#8b5cf6' },
                    { angle: 225, color: '#3b82f6' },
                    { angle: 270, color: '#06b6d4' },
                    { angle: 315, color: '#10b981' },
                  ].map((petal, i) => {
                    const rad = (petal.angle * Math.PI) / 180;
                    const x1 = 50;
                    const y1 = 50;
                    const x2 = 50 + Math.cos(rad) * 35;
                    const y2 = 50 + Math.sin(rad) * 35;
                    return (
                      <g key={i}>
                        <path
                          d={`M ${x1} ${y1} L ${x2} ${y2} L ${50 + Math.cos(rad + 0.3) * 25} ${50 + Math.sin(rad + 0.3) * 25} Z`}
                          fill={petal.color}
                        />
                      </g>
                    );
                  })}
                </svg>
                
                {/* JUUT Text */}
                <div className="absolute right-6 text-white text-2xl font-bold tracking-wider" style={{ fontFamily: 'sans-serif' }}>
                  JUUT
                </div>
                {/* BACKEND tag */}
                
              </div>
              <CardContent className="relative p-1 pt-6">
                <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                  BACKEND
                </div>
                <p className="text-sm text-gray-900 dark:text-white text-left">What is JWT and Why Should You Use JWT</p>
              </CardContent>
            </Card>

            {/* TypeScript React Course */}
            <Card className="bg-white dark:bg-gray-800 overflow-hidden p-2">
              <div className="relative h-32 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center rounded-lg">
                <svg className="w-16 h-16 text-white" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
                  <circle cx="50" cy="35" r="3" fill="currentColor" />
                  <circle cx="35" cy="55" r="3" fill="currentColor" />
                  <circle cx="65" cy="55" r="3" fill="currentColor" />
                  <path d="M 50 35 L 35 55 L 65 55 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <div className="absolute bottom-2 left-2 text-white text-xl font-bold">React + TypeScript</div>
              </div>
              <CardContent className="relative p-1 pt-6">
                <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                  FRONTEND
                </div>
                <p className="text-sm text-gray-900 dark:text-white text-left">TypeScript in React - COMPLETE Tutorial (Crash Course)</p>
              </CardContent>
            </Card>

            {/* PostgreSQL Course */}
            <Card className="bg-white dark:bg-gray-800 overflow-hidden p-2">
              <div className="relative h-32 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center rounded-lg">
                <svg className="w-20 h-20 text-white" viewBox="0 0 100 100">
                  <path d="M 30 25 Q 50 15 70 25 Q 75 30 75 40 Q 75 55 70 60 Q 50 70 30 60 Q 25 55 25 40 Q 25 30 30 25 Z" fill="currentColor" opacity="0.6" />
                  <path d="M 30 45 Q 50 35 70 45 Q 75 50 75 60 Q 75 75 70 80 Q 50 90 30 80 Q 25 75 25 60 Q 25 50 30 45 Z" fill="currentColor" />
                  <text x="50" y="68" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">14</text>
                </svg>
              </div>
              <CardContent className="relative p-1 pt-6">
                <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                  BACKEND
                </div>
                <p className="text-sm text-gray-900 dark:text-white text-left">Learn PostgreSQL Tutorial - Full Course for Beginners</p>
              </CardContent>
            </Card>

            {/* TypeScript React Course (Duplicate) */}
            <Card className="bg-white dark:bg-gray-800 overflow-hidden p-2">
              <div className="relative h-32 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center rounded-lg">
                <svg className="w-16 h-16 text-white" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
                  <circle cx="50" cy="35" r="3" fill="currentColor" />
                  <circle cx="35" cy="55" r="3" fill="currentColor" />
                  <circle cx="65" cy="55" r="3" fill="currentColor" />
                  <path d="M 50 35 L 35 55 L 65 55 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <div className="absolute bottom-2 left-2 text-white text-xl font-bold">React + TypeScript</div>
              </div>
              <CardContent className="relative p-1 pt-6">
                <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                  FRONTEND
                </div>
                <p className="text-sm text-gray-900 dark:text-white text-left">TypeScript in React - COMPLETE Tutorial (Crash Course)</p>
              </CardContent>
            </Card>

            {/* PostgreSQL Course (Duplicate) */}
            <Card className="bg-white dark:bg-gray-800 overflow-hidden p-2">
              <div className="relative h-32 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center rounded-lg">
                <svg className="w-20 h-20 text-white" viewBox="0 0 100 100">
                  <path d="M 30 25 Q 50 15 70 25 Q 75 30 75 40 Q 75 55 70 60 Q 50 70 30 60 Q 25 55 25 40 Q 25 30 30 25 Z" fill="currentColor" opacity="0.6" />
                  <path d="M 30 45 Q 50 35 70 45 Q 75 50 75 60 Q 75 75 70 80 Q 50 90 30 80 Q 25 75 25 60 Q 25 50 30 45 Z" fill="currentColor" />
                  <text x="50" y="68" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">14</text>
                </svg>
              </div>
              <CardContent className="relative p-1 pt-6">
                <div className="absolute -top-2 left-0 inline-block w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                  BACKEND
                </div>
                <p className="text-sm text-gray-900 dark:text-white text-left">Learn PostgreSQL Tutorial - Full Course for Beginners</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
