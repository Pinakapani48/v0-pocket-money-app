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
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Plus,
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
  const [bonusMin, setBonusMin] = useState("")
  const [bonusMax, setBonusMax] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState<"online" | "offline">("online")
  const [urgency, setUrgency] = useState<"immediate" | "feasible">("feasible")
  const [verification, setVerification] = useState<"1-step" | "2-step">("1-step")
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
      setBonusMin("")
      setBonusMax("")
      setTime("")
      setSelectedSkills([])
      setLocation("")
      setVerification("1-step")
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
        <div className="mt-1 flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
          {verification === "1-step" ? (
            <><Unlock className="h-3 w-3 text-neon-green" /> 1-Step: Auto-assign on accept</>
          ) : (
            <><Lock className="h-3 w-3 text-neon-orange" /> 2-Step: You review before assigning</>
          )}
        </div>
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

      {/* Verification selector */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> Verification Mode
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setVerification("1-step")}
            className={`relative flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-300 ${
              verification === "1-step"
                ? "border-neon-green/50"
                : "border-border hover:border-border"
            }`}
            style={
              verification === "1-step"
                ? {
                    background: "rgba(57,255,20,0.06)",
                    boxShadow: "0 0 20px rgba(57,255,20,0.12), inset 0 0 20px rgba(57,255,20,0.03)",
                  }
                : { background: "rgba(18,18,28,0.5)" }
            }
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
              style={
                verification === "1-step"
                  ? {
                      background: "rgba(57,255,20,0.15)",
                      boxShadow: "0 0 12px rgba(57,255,20,0.2)",
                    }
                  : { background: "rgba(30,30,58,0.5)" }
              }
            >
              <Unlock
                className={`h-5 w-5 transition-colors ${
                  verification === "1-step" ? "text-neon-green" : "text-muted-foreground"
                }`}
              />
            </div>
            <div>
              <p
                className={`text-xs font-bold transition-colors ${
                  verification === "1-step" ? "text-neon-green" : "text-muted-foreground"
                }`}
              >
                1-Step
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                Anyone can directly accept. Instant lock-in.
              </p>
            </div>
            {verification === "1-step" && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#39ff14" }}>
                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>

          <button
            onClick={() => setVerification("2-step")}
            className={`relative flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-300 ${
              verification === "2-step"
                ? "border-neon-orange/50"
                : "border-border hover:border-border"
            }`}
            style={
              verification === "2-step"
                ? {
                    background: "rgba(255,170,0,0.06)",
                    boxShadow: "0 0 20px rgba(255,170,0,0.12), inset 0 0 20px rgba(255,170,0,0.03)",
                  }
                : { background: "rgba(18,18,28,0.5)" }
            }
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
              style={
                verification === "2-step"
                  ? {
                      background: "rgba(255,170,0,0.15)",
                      boxShadow: "0 0 12px rgba(255,170,0,0.2)",
                    }
                  : { background: "rgba(30,30,58,0.5)" }
              }
            >
              <Lock
                className={`h-5 w-5 transition-colors ${
                  verification === "2-step" ? "text-neon-orange" : "text-muted-foreground"
                }`}
              />
            </div>
            <div>
              <p
                className={`text-xs font-bold transition-colors ${
                  verification === "2-step" ? "text-neon-orange" : "text-muted-foreground"
                }`}
              >
                2-Step
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                Review applicants first. You choose who does it.
              </p>
            </div>
            {verification === "2-step" && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#ffaa00" }}>
                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        </div>

        {/* Explanation banner */}
        <div
          className="mt-2 flex items-start gap-2 rounded-lg border px-3 py-2.5"
          style={{
            borderColor: verification === "1-step" ? "rgba(57,255,20,0.15)" : "rgba(255,170,0,0.15)",
            background: verification === "1-step" ? "rgba(57,255,20,0.04)" : "rgba(255,170,0,0.04)",
          }}
        >
          <ShieldAlert
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            style={{ color: verification === "1-step" ? "#39ff14" : "#ffaa00" }}
          />
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            {verification === "1-step"
              ? "Best for simple tasks like deliveries, printouts, or errands. First student to accept gets the task immediately -- no review needed."
              : "Best for skill-based tasks like editing, drawing, or coding. Students express interest, you check their profile and portfolio, then assign it. You can also offer a performance bonus."}
          </p>
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
            <IndianRupee className="h-3.5 w-3.5" /> Base Pay (rupees)
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

      {/* Bonus range for 2-step */}
      {verification === "2-step" && (
        <div className="animate-slide-up">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Plus className="h-3.5 w-3.5" /> Performance Bonus Range (optional)
          </label>
          <p className="mb-2 text-[10px] text-muted-foreground">
            Offer extra rupees based on quality. Students see this as an incentive.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="number"
                value={bonusMin}
                onChange={(e) => setBonusMin(e.target.value)}
                placeholder="Min bonus"
                className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-orange/50 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">min</span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={bonusMax}
                onChange={(e) => setBonusMax(e.target.value)}
                placeholder="Max bonus"
                className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-orange/50 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">max</span>
            </div>
          </div>
          {money && (bonusMin || bonusMax) && (
            <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,170,0,0.06)" }}>
              <IndianRupee className="h-3 w-3 text-neon-orange" />
              <p className="text-[10px] text-neon-orange">
                {'Total pay: '}
                <span className="font-bold">{money}</span>
                {(bonusMin || bonusMax) && (
                  <>
                    {' + '}
                    <span className="font-bold">{bonusMin || '0'}</span>
                    {' to '}
                    <span className="font-bold">{bonusMax || '0'}</span>
                    {' bonus'}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

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
        <span className="ml-1 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: "rgba(10,10,15,0.3)" }}>
          {verification === "1-step" ? <><Unlock className="h-2.5 w-2.5" /> 1-STEP</> : <><Lock className="h-2.5 w-2.5" /> 2-STEP</>}
        </span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
