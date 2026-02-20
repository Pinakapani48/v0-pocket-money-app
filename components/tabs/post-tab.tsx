"use client"

import { useState } from "react"
import {
  Send,
  Wifi,
  MapPin,
  Zap,
  Clock,
  IndianRupee,
  Tag,
  FileText,
  ChevronRight,
  CheckCircle2,
} from "lucide-react"

const skillOptions = [
  "editor",
  "coder",
  "artist",
  "writer",
  "runner",
  "presenter",
  "designer",
  "tutor",
]

export function PostTab() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [money, setMoney] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState<"online" | "offline">("online")
  const [urgency, setUrgency] = useState<"immediate" | "feasible">("feasible")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSubmit = () => {
    if (!title.trim() || !money || !time.trim()) return
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setTitle("")
      setDescription("")
      setMoney("")
      setTime("")
      setSelectedSkills([])
      setLocation("")
    }, 2500)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pb-24">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full animate-float"
          style={{
            background: "linear-gradient(135deg, #00f0ff, #39ff14)",
            boxShadow: "0 0 30px rgba(0,240,255,0.4), 0 0 60px rgba(57,255,20,0.2)",
          }}
        >
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Task Posted!</h2>
        <p className="text-center text-sm text-muted-foreground">
          Your task is now live. Sit tight, someone will pick it up soon.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-lg font-bold text-foreground">Post a Task</h1>
        <p className="text-xs text-muted-foreground">Describe what you need done</p>
      </div>

      {/* Type selector */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Wifi className="h-3.5 w-3.5" /> Task Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setType("online")}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${
              type === "online"
                ? "border-neon-cyan/50 text-neon-cyan"
                : "border-border text-muted-foreground hover:border-border"
            }`}
            style={type === "online" ? { background: "rgba(0,240,255,0.08)", boxShadow: "0 0 15px rgba(0,240,255,0.15)" } : { background: "rgba(18,18,28,0.5)" }}
          >
            <Wifi className="h-4 w-4" />
            Online / Static
          </button>
          <button
            onClick={() => setType("offline")}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${
              type === "offline"
                ? "border-neon-orange/50 text-neon-orange"
                : "border-border text-muted-foreground hover:border-border"
            }`}
            style={type === "offline" ? { background: "rgba(255,170,0,0.08)", boxShadow: "0 0 15px rgba(255,170,0,0.15)" } : { background: "rgba(18,18,28,0.5)" }}
          >
            <MapPin className="h-4 w-4" />
            Offline / Dynamic
          </button>
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Zap className="h-3.5 w-3.5" /> Urgency
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setUrgency("immediate")}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${
              urgency === "immediate"
                ? "border-neon-pink/50 text-neon-pink"
                : "border-border text-muted-foreground"
            }`}
            style={urgency === "immediate" ? { background: "rgba(255,51,102,0.08)", boxShadow: "0 0 15px rgba(255,51,102,0.15)" } : { background: "rgba(18,18,28,0.5)" }}
          >
            <Zap className="h-4 w-4" />
            Immediate
          </button>
          <button
            onClick={() => setUrgency("feasible")}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${
              urgency === "feasible"
                ? "border-neon-green/50 text-neon-green"
                : "border-border text-muted-foreground"
            }`}
            style={urgency === "feasible" ? { background: "rgba(57,255,20,0.08)", boxShadow: "0 0 15px rgba(57,255,20,0.15)" } : { background: "rgba(18,18,28,0.5)" }}
          >
            <Clock className="h-4 w-4" />
            Feasible
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <FileText className="h-3.5 w-3.5" /> Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Edit my YouTube video"
          className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <FileText className="h-3.5 w-3.5" /> Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what needs to be done in detail..."
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
        />
      </div>

      {/* Money & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <IndianRupee className="h-3.5 w-3.5" /> Budget (rupees)
          </label>
          <input
            type="number"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            placeholder="e.g., 200"
            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Deadline
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g., 2 hours"
            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Location (offline only) */}
      {type === "offline" && (
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Main Canteen, Library"
            className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
          />
        </div>
      )}

      {/* Skills */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Tag className="h-3.5 w-3.5" /> Skills Required
        </label>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => {
            const isSelected = selectedSkills.includes(skill)
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200 ${
                  isSelected
                    ? "border-neon-cyan/50 text-neon-cyan"
                    : "border-border text-muted-foreground hover:border-neon-cyan/30 hover:text-foreground"
                }`}
                style={isSelected ? { background: "rgba(0,240,255,0.1)" } : {}}
              >
                {skill}
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!title.trim() || !money || !time.trim()}
        className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 disabled:opacity-30 text-primary-foreground"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #39ff14)",
          boxShadow: title && money && time ? "0 0 20px rgba(0,240,255,0.3)" : "none",
        }}
      >
        <Send className="h-4 w-4" />
        Post Task
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
