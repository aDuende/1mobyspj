import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Video, Link, Upload, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type CourseType = "Video" | "Document" | "Article" | "Link";
type CourseCategory = "Core" | "Managerial" | "Functional";
type TargetRole = "Employee" | "Manager" | "Both";

interface CourseForm {
  title: string;
  description: string;
  type: CourseType;
  category: CourseCategory;
  targetRole: TargetRole;
  url: string;
  duration: string;
  tags: string;
}

const TYPE_ICONS: Record<CourseType, React.ReactNode> = {
  Video: <Video className="w-5 h-5" />,
  Document: <FileText className="w-5 h-5" />,
  Article: <BookOpen className="w-5 h-5" />,
  Link: <Link className="w-5 h-5" />,
};

function AdminAddCourse() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CourseForm>({
    title: "",
    description: "",
    type: "Video",
    category: "Core",
    targetRole: "Both",
    url: "",
    duration: "",
    tags: "",
  });
  const [errors, setErrors] = useState<Partial<CourseForm>>({});

  const validate = (): boolean => {
    const e: Partial<CourseForm> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.url.trim()) e.url = "URL or resource link is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const set = <K extends keyof CourseForm>(key: K, value: CourseForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  if (submitted) {
    return (
      <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 flex flex-col items-center gap-4 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3
            className="text-xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            Course Added!
          </h3>
          <p
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{ fontFamily: "Geometrica, sans-serif" }}
          >
            <span className="font-semibold text-gray-700 dark:text-gray-300">{form.title}</span> is now available in the{" "}
            {form.targetRole === "Both" ? "Employee & Manager" : form.targetRole} IDP & Learning page.
          </p>
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: "",
                  description: "",
                  type: "Video",
                  category: "Core",
                  targetRole: "Both",
                  url: "",
                  duration: "",
                  tags: "",
                });
              }}
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Add Another
            </Button>
            <Button
              onClick={() => navigate("/idp-overview")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Back to IDP Overview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div>
            <h2
              className="text-2xl font-bold text-gray-900 dark:text-white text-left"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Add New Course
            </h2>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-0.5"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              This course will appear in Employee & Manager IDP &amp; Learning pages
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 space-y-6">

          {/* Title */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Course Title <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="e.g. Data Analysis Fundamentals"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={errors.title ? "border-rose-400 focus-visible:ring-rose-400" : ""}
              style={{ fontFamily: "Geometrica, sans-serif" }}
            />
            {errors.title && (
              <p className="text-xs text-rose-500" style={{ fontFamily: "Geometrica, sans-serif" }}>{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              placeholder="Describe what this course covers and who it's for..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className={`w-full rounded-md border px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.description
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              style={{ fontFamily: "Geometrica, sans-serif" }}
            />
            {errors.description && (
              <p className="text-xs text-rose-500" style={{ fontFamily: "Geometrica, sans-serif" }}>{errors.description}</p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Content Type
            </label>
            <div className="grid grid-cols-4 gap-3">
              {(["Video", "Document", "Article", "Link"] as CourseType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("type", t)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    form.type === t
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {TYPE_ICONS[t]}
                  <span className="text-xs font-medium" style={{ fontFamily: "Geometrica, sans-serif" }}>{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category + Target Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Competency Category
              </label>
              <div className="flex gap-2">
                {(["Core", "Managerial", "Functional"] as CourseCategory[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("category", c)}
                    className={`flex-1 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                      form.category === c
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                    }`}
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Visible To
              </label>
              <div className="flex gap-2">
                {(["Employee", "Manager", "Both"] as TargetRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set("targetRole", r)}
                    className={`flex-1 py-2 px-2 rounded-lg border text-xs font-medium transition-all ${
                      form.targetRole === r
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                    }`}
                    style={{ fontFamily: "Geometrica, sans-serif" }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* URL */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Resource URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="https://..."
                value={form.url}
                onChange={(e) => set("url", e.target.value)}
                className={`pl-9 ${errors.url ? "border-rose-400 focus-visible:ring-rose-400" : ""}`}
                style={{ fontFamily: "Geometrica, sans-serif" }}
              />
            </div>
            {errors.url && (
              <p className="text-xs text-rose-500" style={{ fontFamily: "Geometrica, sans-serif" }}>{errors.url}</p>
            )}
          </div>

          {/* Duration + Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Duration
              </label>
              <Input
                placeholder="e.g. 45 min, 2 hr"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                style={{ fontFamily: "Geometrica, sans-serif" }}
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Geometrica, sans-serif" }}
              >
                Tags
              </label>
              <Input
                placeholder="e.g. leadership, data, communication"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                style={{ fontFamily: "Geometrica, sans-serif" }}
              />
            </div>
          </div>

          {/* Preview pill */}
          {form.title && (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/30">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold" style={{ fontFamily: "Geometrica, sans-serif" }}>
                Preview
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {TYPE_ICONS[form.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate" style={{ fontFamily: "Geometrica, sans-serif" }}>
                    {form.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                      {form.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                      {form.type}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                      {form.targetRole === "Both" ? "Employee & Manager" : form.targetRole}
                    </span>
                    {form.duration && (
                      <span className="text-xs text-gray-400" style={{ fontFamily: "Geometrica, sans-serif" }}>
                        · {form.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/idp-overview")}
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              Publish Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddCourse;
