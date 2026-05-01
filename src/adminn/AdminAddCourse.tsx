import { useState } from "react";
import {
  Upload,
  Trash2,
  Plus,
  Film,
  AlignJustify,
  FileText,
  Play,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type CourseType = "quick-bites" | "full-lesson" | "series" | "reading-hub";
type AudienceType = "everyone" | "specific" | "managers";

interface MockFile {
  id: string;
  name: string;
  duration?: string;
  resolution?: string;
  pages?: number;
  size?: string;
  order?: number;
}

interface SeriesVideo {
  id: string;
  name: string;
  duration: string;
}

interface SeriesModule {
  id: string;
  label: string;
  title: string;
  videos: SeriesVideo[];
}

// ── Static data ────────────────────────────────────────────────────────────────
const COMPETENCIES: Record<string, { code: string; name: string }[]> = {
  Core: [
    { code: "CC01", name: "Create Impact" },
    { code: "CC02", name: "Take Ownership" },
    { code: "CC03", name: "Adaptive" },
    { code: "CC04", name: "Collaboration" },
  ],
  Functional: [
    { code: "FC01", name: "Data Analysis" },
    { code: "FC02", name: "Stakeholder Communication" },
    { code: "FC03", name: "Strategic Thinking" },
    { code: "FC04", name: "Project Execution" },
    { code: "FC05", name: "Process Improvement" },
  ],
  Managerial: [
    { code: "MC01", name: "Process" },
    { code: "MC02", name: "Purpose" },
    { code: "MC03", name: "People" },
    { code: "MC04", name: "Result" },
  ],
};

const COURSE_TYPE_META: Record<
  CourseType,
  { label: string; sub: string; tab: string; placeholder: string }
> = {
  "quick-bites": {
    label: "Quick Bites",
    sub: "≤ 60 SEC · 9:16 · SINGLE CLIP",
    tab: "Quick Bites tab",
    placeholder: "e.g. Run a 5-minute standup",
  },
  "full-lesson": {
    label: "Full Lesson",
    sub: "5-60 MIN · 16:9 · SINGLE VIDEO",
    tab: "Full Lesson tab",
    placeholder: "e.g. Insight to recommendation",
  },
  series: {
    label: "Series",
    sub: "MULTIPLE MODULES · MULTIPLE VIDEOS",
    tab: "Series tab",
    placeholder: "e.g. Stakeholder communication",
  },
  "reading-hub": {
    label: "Reading Hub",
    sub: "1+ PDFS · IN-BROWSER VIEWER",
    tab: "Reading Hub tab",
    placeholder: "e.g. OKR fundamentals",
  },
};

const TRACK_CODE_COLOR: Record<string, string> = {
  Core: "text-gray-400",
  Functional: "text-green-600",
  Managerial: "text-purple-500",
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function AdminAddCourse() {
  const fontGeo = { fontFamily: "Geometrica, sans-serif" };

  // form state
  const [courseType, setCourseType] = useState<CourseType>("quick-bites");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState<AudienceType>("everyone");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [catalogTag, setCatalogTag] = useState("");
  const [tagged, setTagged] = useState<string[]>([]);

  // Quick Bites state
  const [qbFiles, setQbFiles] = useState<MockFile[]>([
    {
      id: "qb1",
      name: "standup-tip-final.mp4",
      duration: "0:48",
      resolution: "1080×1920",
    },
  ]);
  const [qbCoverFrame, setQbCoverFrame] = useState("Auto-pick from video");
  const [qbCaptions, setQbCaptions] = useState("Generate automatically");

  // Full Lesson state
  const [flFiles, setFlFiles] = useState<MockFile[]>([
    {
      id: "fl1",
      name: "insight-to-recommendation.mp4",
      duration: "24:10",
      resolution: "1920×1080",
    },
  ]);
  const [flCoverFrame, setFlCoverFrame] = useState("Auto-pick from video");
  const [flCaptions, setFlCaptions] = useState("Generate automatically");

  // Series state
  const [modules, setModules] = useState<SeriesModule[]>([
    {
      id: "m1",
      label: "M01",
      title: "Why stakeholders matter",
      videos: [
        { id: "v1", name: "Intro to stakeholder maps.mp4", duration: "6:12" },
        {
          id: "v2",
          name: "Identifying primary stakeholders.mp4",
          duration: "8:01",
        },
      ],
    },
    {
      id: "m2",
      label: "M02",
      title: "Tailoring your message",
      videos: [
        { id: "v3", name: "Audience analysis.mp4", duration: "5:30" },
        { id: "v4", name: "Choosing the channel.mp4", duration: "7:45" },
        { id: "v5", name: "Worked example.mp4", duration: "11:08" },
      ],
    },
    {
      id: "m3",
      label: "M03",
      title: "Difficult conversations",
      videos: [
        { id: "v6", name: "Saying no, gracefully.mp4", duration: "9:22" },
      ],
    },
  ]);

  // Reading Hub state
  const [pdfFiles, setPdfFiles] = useState<MockFile[]>([
    {
      id: "p1",
      name: "OKR Fundamentals.pdf",
      pages: 32,
      size: "1.4 MB",
      order: 1,
    },
    {
      id: "p2",
      name: "Writing measurable key results.pdf",
      pages: 18,
      size: "820 KB",
      order: 2,
    },
    {
      id: "p3",
      name: "Common OKR pitfalls.pdf",
      pages: 34,
      size: "2.1 MB",
      order: 3,
    },
  ]);

  const meta = COURSE_TYPE_META[courseType];
  const totalVideos = modules.reduce((sum, m) => sum + m.videos.length, 0);
  const totalPdfPages = pdfFiles.reduce((sum, f) => sum + (f.pages ?? 0), 0);
  const estReadingMin = Math.round(totalPdfPages * 1.5);

  const toggleTag = (code: string) =>
    setTagged((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );

  const addModule = () => {
    const idx = modules.length + 1;
    setModules((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        label: `M0${idx}`,
        title: `Module ${idx}`,
        videos: [],
      },
    ]);
  };
  const removeModule = (id: string) =>
    setModules((prev) => prev.filter((m) => m.id !== id));
  const addVideo = (moduleId: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              videos: [
                ...m.videos,
                {
                  id: `v${Date.now()}`,
                  name: "new-video.mp4",
                  duration: "0:00",
                },
              ],
            }
          : m,
      ),
    );
  const removeVideo = (moduleId: string, videoId: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, videos: m.videos.filter((v) => v.id !== videoId) }
          : m,
      ),
    );
  const updateModuleTitle = (id: string, value: string) =>
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: value } : m)),
    );

  const audienceLabel =
    audience === "everyone"
      ? "All"
      : audience === "managers"
        ? "Managers"
        : "Specific";

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={fontGeo} className="min-h-full bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* ── Course Type ───────────────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] tracking-widest text-gray-400 font-semibold uppercase mb-3">
            Course Type
          </p>
          <div className="grid grid-cols-4 gap-3">
            {(
              [
                "quick-bites",
                "full-lesson",
                "series",
                "reading-hub",
              ] as CourseType[]
            ).map((type) => {
              const m = COURSE_TYPE_META[type];
              const active = courseType === type;
              return (
                <button
                  key={type}
                  onClick={() => setCourseType(type)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all bg-white ${
                    active
                      ? "border-gray-800 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      active
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {type === "quick-bites" && <Play size={15} />}
                    {type === "full-lesson" && <Film size={15} />}
                    {type === "series" && <AlignJustify size={15} />}
                    {type === "reading-hub" && <FileText size={15} />}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${active ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {m.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                      {m.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main layout ───────────────────────────────────────────────────── */}
        <div className="flex gap-6 items-start">
          {/* ── Left column ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* 01 Basics */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <StepHeading step="01" title="Basics" />

              <div className="space-y-1">
                <FieldLabel>Course Title</FieldLabel>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={meta.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-gray-400"
                />
              </div>

              <div className="space-y-1">
                <FieldLabel>Short Description</FieldLabel>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="One or two sentences explaining what learners will get out of this."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-gray-400 resize-none"
                />
              </div>
            </section>

            {/* 02 Content */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <StepHeading step="02" title={`Content · ${meta.label}`} />
                <span className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">
                  {meta.sub}
                </span>
              </div>

              {/* ── Quick Bites content ──────────────────────────────────────── */}
              {courseType === "quick-bites" && (
                <div className="space-y-4">
                  <FieldLabel>Vertical Video (9:16)</FieldLabel>
                  <DropZone
                    primary="DROP MP4 / MOV HERE, OR CLICK TO BROWSE"
                    secondary="≤ 60 SEC · MAX 200 MB · 1080×1920 RECOMMENDED"
                  />
                  {qbFiles.map((f) => (
                    <VideoFileRow
                      key={f.id}
                      file={f}
                      onRemove={() =>
                        setQbFiles((prev) => prev.filter((x) => x.id !== f.id))
                      }
                    />
                  ))}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <SelectField
                      label="Cover Frame"
                      value={qbCoverFrame}
                      options={["Auto-pick from video", "Custom frame"]}
                      onChange={setQbCoverFrame}
                    />
                    <SelectField
                      label="Captions"
                      value={qbCaptions}
                      options={["Generate automatically", "Upload SRT", "None"]}
                      onChange={setQbCaptions}
                    />
                  </div>
                </div>
              )}

              {/* ── Full Lesson content ──────────────────────────────────────── */}
              {courseType === "full-lesson" && (
                <div className="space-y-4">
                  <FieldLabel>Lesson Video</FieldLabel>
                  <DropZone
                    primary="DROP MP4 / MOV HERE, OR CLICK TO BROWSE"
                    secondary="5-60 MIN · MAX 4 GB · 1080P HORIZONTAL RECOMMENDED"
                  />
                  {flFiles.map((f) => (
                    <VideoFileRow
                      key={f.id}
                      file={f}
                      onRemove={() =>
                        setFlFiles((prev) => prev.filter((x) => x.id !== f.id))
                      }
                    />
                  ))}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1">
                      <FieldLabel>Thumbnail</FieldLabel>
                      <DropZone
                        primary="DROP IMAGE HERE, OR CLICK TO BROWSE"
                        secondary="JPG / PNG · 16:9 · 1280×720"
                        small
                      />
                    </div>
                    <div className="space-y-1">
                      <FieldLabel>Resources (Optional)</FieldLabel>
                      <DropZone
                        primary="DROP FILES HERE, OR CLICK TO BROWSE"
                        secondary="SLIDES, WORKSHEETS, LINKS"
                        small
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <SelectField
                      label="Cover Frame"
                      value={flCoverFrame}
                      options={["Auto-pick from video", "Custom frame"]}
                      onChange={setFlCoverFrame}
                    />
                    <SelectField
                      label="Captions"
                      value={flCaptions}
                      options={["Generate automatically", "Upload SRT", "None"]}
                      onChange={setFlCaptions}
                    />
                  </div>
                </div>
              )}

              {/* ── Series content ───────────────────────────────────────────── */}
              {courseType === "series" && (
                <div className="space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                    <div className="px-5 py-3">
                      <p className="text-2xl font-bold text-gray-900">
                        {modules.length}
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-gray-400">
                        Modules
                      </p>
                    </div>
                    <div className="px-5 py-3">
                      <p className="text-2xl font-bold text-gray-900">
                        {totalVideos}
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-gray-400">
                        Videos
                      </p>
                    </div>
                    <div className="px-5 py-3">
                      <p className="text-2xl font-bold text-gray-900">
                        ~42<span className="text-sm font-normal">min</span>
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-gray-400">
                        Est. Duration
                      </p>
                    </div>
                  </div>

                  {/* Module blocks */}
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <span className="text-[10px] font-bold bg-gray-200 text-gray-600 rounded px-1.5 py-0.5">
                          {mod.label}
                        </span>
                        <input
                          value={mod.title}
                          onChange={(e) =>
                            updateModuleTitle(mod.id, e.target.value)
                          }
                          className="flex-1 text-sm font-semibold text-gray-800 bg-transparent outline-none"
                        />
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {mod.videos.length} video
                          {mod.videos.length !== 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={() => removeModule(mod.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="divide-y divide-gray-50 bg-white">
                        {mod.videos.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center gap-3 px-4 py-2.5"
                          >
                            <span className="flex-1 text-sm text-gray-700">
                              {v.name}
                            </span>
                            <span className="text-xs text-gray-400 w-10 text-right tabular-nums">
                              {v.duration}
                            </span>
                            <button
                              onClick={() => removeVideo(mod.id, v.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors ml-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2.5 bg-white border-t border-gray-50">
                        <button
                          onClick={() => addVideo(mod.id)}
                          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <Plus size={12} /> Add video
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addModule}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-dashed border-gray-300 rounded-xl px-4 py-2.5 w-full justify-center hover:border-gray-400 transition-colors"
                  >
                    <Plus size={14} /> Add module
                  </button>
                </div>
              )}

              {/* ── Reading Hub content ──────────────────────────────────────── */}
              {courseType === "reading-hub" && (
                <div className="space-y-4">
                  <FieldLabel>PDF Files</FieldLabel>
                  <DropZone
                    primary="DROP PDFS HERE, OR CLICK TO BROWSE"
                    secondary="DRAG IN MULTIPLE PDFS · MAX 50 MB EACH"
                  />
                  {pdfFiles.map((f, i) => (
                    <div
                      key={f.id}
                      className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={14} className="text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">
                          {f.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {f.pages} pages · {f.size}
                        </p>
                      </div>
                      <select
                        value={f.order}
                        onChange={(e) =>
                          setPdfFiles((prev) =>
                            prev.map((p, idx) =>
                              idx === i
                                ? { ...p, order: Number(e.target.value) }
                                : p,
                            ),
                          )
                        }
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none text-gray-700 bg-white"
                      >
                        {pdfFiles.map((_, oi) => (
                          <option key={oi} value={oi + 1}>
                            Order {oi + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          setPdfFiles((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {pdfFiles.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {pdfFiles.length} files · {totalPdfPages} pages total ·
                      est. {estReadingMin} min reading
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* 03 Tag & audience */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <StepHeading step="03" title="Tag & audience" />

              {/* Competencies */}
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">
                  Competencies · Tag at least one
                </p>
                {Object.entries(COMPETENCIES).map(([track, comps]) => (
                  <div key={track} className="space-y-2">
                    <p className="text-[10px] tracking-widest uppercase text-gray-400">
                      {track}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {comps.map((c) => {
                        const active = tagged.includes(c.code);
                        return (
                          <button
                            key={c.code}
                            onClick={() => toggleTag(c.code)}
                            className={`flex items-center gap-1.5 text-sm border rounded-full px-3 py-1 transition-colors ${
                              active
                                ? "border-gray-800 bg-gray-900 text-white"
                                : "border-gray-200 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold ${
                                active
                                  ? "text-gray-300"
                                  : TRACK_CODE_COLOR[track]
                              }`}
                            >
                              {c.code}
                            </span>
                            {c.name}
                            <span className="ml-0.5 text-gray-400 text-xs">
                              {active ? "×" : "+"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Audience */}
              <div className="space-y-2">
                <FieldLabel>Audience</FieldLabel>
                {(
                  [
                    {
                      value: "everyone",
                      label: "Everyone",
                      sub: "All employees and managers see it in Learning.",
                    },
                    {
                      value: "specific",
                      label: "Specific roles",
                      sub: "Pick roles or teams.",
                    },
                    {
                      value: "managers",
                      label: "Managers only",
                      sub: "Only people with direct reports.",
                    },
                  ] as { value: AudienceType; label: string; sub: string }[]
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                      audience === opt.value
                        ? "border-gray-800"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="audience"
                      value={opt.value}
                      checked={audience === opt.value}
                      onChange={() => setAudience(opt.value)}
                      className="mt-0.5 accent-gray-900"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {opt.label}
                      </p>
                      <p
                        className={`text-xs ${
                          opt.value === "specific"
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      >
                        {opt.sub}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Difficulty + Catalog Tag */}
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Difficulty"
                  value={difficulty}
                  options={["Beginner", "Intermediate", "Advanced"]}
                  onChange={setDifficulty}
                />
                <div className="space-y-1">
                  <FieldLabel>Catalog Tag</FieldLabel>
                  <input
                    value={catalogTag}
                    onChange={(e) => setCatalogTag(e.target.value)}
                    placeholder="e.g. Q2 Leadership Pack"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Summary ────────────────────────────────────────────────── */}
          <div className="w-72 flex-shrink-0 sticky top-6 space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">
                Summary
              </p>
              <div className="space-y-2">
                <SummaryRow label="Type" value={meta.label} />
                <SummaryRow
                  label="Title"
                  value={title || "UNTITLED"}
                  muted={!title}
                />
                <SummaryRow label="Audience" value={audienceLabel} />
                <SummaryRow label="Level" value={difficulty} />
                <SummaryRow
                  label="Tagged"
                  value={`${tagged.length} ${tagged.length === 1 ? "competency" : "competencies"}`}
                />
              </div>
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">
                  Will appear in
                </p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                  Learning · {meta.tab}
                </div>
              </div>
            </div>

            <button className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors bg-white shadow-sm">
              Save as draft
            </button>
            <button
              disabled
              className="w-full rounded-xl py-2.5 text-sm font-semibold text-white bg-gray-400 cursor-not-allowed shadow-sm"
            >
              Publish to Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────────
function StepHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-bold bg-gray-100 text-gray-600 rounded px-2 py-0.5">
        {step}
      </span>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold">
      {children}
    </p>
  );
}

function DropZone({
  primary,
  secondary,
  small = false,
}: {
  primary: string;
  secondary: string;
  small?: boolean;
}) {
  return (
    <div
      className={`border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center gap-2 bg-gray-50 hover:border-gray-300 cursor-pointer transition-colors ${
        small ? "p-5" : "p-8"
      }`}
    >
      <Upload size={small ? 18 : 22} className="text-gray-400" />
      <p
        className={`font-semibold text-gray-500 ${small ? "text-xs" : "text-sm"}`}
      >
        {primary}
      </p>
      <p className={`text-gray-400 ${small ? "text-[10px]" : "text-xs"}`}>
        {secondary}
      </p>
    </div>
  );
}

function VideoFileRow({
  file,
  onRemove,
}: {
  file: MockFile;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 bg-white">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Film size={14} className="text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{file.name}</p>
        <p className="text-xs text-gray-400">
          {file.duration} · {file.resolution} · placeholder
        </p>
      </div>
      <span className="text-[10px] font-semibold border border-orange-300 text-orange-500 rounded px-2 py-0.5 bg-orange-50 flex-shrink-0">
        PLACEHOLDER
      </span>
      <button
        onClick={onRemove}
        className="text-gray-300 hover:text-red-400 transition-colors ml-1"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline gap-2">
      <span className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-right font-semibold ${
          muted ? "text-gray-300 uppercase text-xs" : "text-gray-800 text-sm"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
