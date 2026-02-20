"use client"

import { useState, useRef } from "react"
import { sampleTasks, sampleUsers } from "@/lib/store"
import type { Task } from "@/lib/store"
import {
  Wifi,
  MapPin,
  Zap,
  Clock,
  IndianRupee,
  ChevronRight,
  Globe,
  Footprints,
  ArrowRight,
  Unlock,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Star,
  Plus,
  User,
  Send,
  UserX,
  UserCheck,
} from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function TaskCard({ task, assignedMap }: { task: Task; assignedMap: Record<string, string> }) {
  const poster = sampleUsers.find((u) => u.id === task.postedBy)
  const [expanded, setExpanded] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [interested, setInterested] = useState(false)
  const [interestMessage, setInterestMessage] = useState("")
  const [showInterestForm, setShowInterestForm] = useState(false)

  const is1Step = task.verification === "1-step"
  const isAssignedToOther = assignedMap[task.id] && assignedMap[task.id] !== "u1"
  const isAssignedToMe = assignedMap[task.id] === "u1"
  const assignedUser = isAssignedToOther ? sampleUsers.find((u) => u.id === assignedMap[task.id]) : null

  const handleDirectAccept = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAccepted(true)
  }

  const handleExpressInterest = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!showInterestForm) {
      setShowInterestForm(true)
      return
    }
    if (interestMessage.trim()) {
      setInterested(true)
      setShowInterestForm(false)
    }
  }

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-300 glass-card cursor-pointer ${
        isAssignedToOther
          ? "border-border/50 opacity-60"
          : isAssignedToMe
          ? "border-neon-green/40"
          : accepted
          ? "border-neon-green/40"
          : interested
          ? "border-neon-orange/40"
          : "border-border hover:border-neon-cyan/20"
      }`}
      onClick={() => !isAssignedToOther && setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => { if (e.key === "Enter" && !isAssignedToOther) setExpanded(!expanded) }}
    >
      {/* Task Taken banner for 2-step tasks assigned to someone else */}
      {isAssignedToOther && (
        <div
          className="mb-3 flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
          style={{
            borderColor: "rgba(255,170,0,0.2)",
            background: "rgba(255,170,0,0.05)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(255,170,0,0.15)" }}
          >
            <UserX className="h-4 w-4 text-neon-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-neon-orange">Task Taken</p>
            <p className="text-[10px] text-muted-foreground">
              Assigned to {assignedUser?.name || "another student"}. Better luck next time!
            </p>
          </div>
        </div>
      )}

      {/* Assigned to you banner */}
      {isAssignedToMe && (
        <div
          className="mb-3 flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
          style={{
            borderColor: "rgba(57,255,20,0.2)",
            background: "rgba(57,255,20,0.05)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(57,255,20,0.15)" }}
          >
            <UserCheck className="h-4 w-4 text-neon-green" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-neon-green">Assigned to you!</p>
            <p className="text-[10px] text-muted-foreground">
              The poster chose you for this task. Check My Tasks to get started.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {task.urgency === "immediate" && (
              <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(255,51,102,0.15)", color: "#ff3366" }}>
                <Zap className="h-2.5 w-2.5" /> URGENT
              </span>
            )}
            <span
              className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase"
              style={{
                background: task.type === "online" ? "rgba(0,240,255,0.15)" : "rgba(255,170,0,0.15)",
                color: task.type === "online" ? "#00f0ff" : "#ffaa00",
              }}
            >
              {task.type}
            </span>
            {/* Verification badge */}
            <span
              className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
              style={{
                background: is1Step ? "rgba(57,255,20,0.12)" : "rgba(255,170,0,0.12)",
                color: is1Step ? "#39ff14" : "#ffaa00",
              }}
            >
              {is1Step ? <Unlock className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
              {is1Step ? "1-STEP" : "2-STEP"}
            </span>
            {task.skills.map((s) => (
              <span key={s} className="rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize" style={{ background: "rgba(191,95,255,0.1)", color: "#bf5fff" }}>
                {s}
              </span>
            ))}
          </div>
          <h3 className="mt-2 text-sm font-semibold text-foreground">{task.title}</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            by {poster?.name || "Unknown"} · {formatTimeAgo(task.postedAt)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 pl-3">
          <span className="flex items-center text-base font-bold text-neon-green">
            <IndianRupee className="h-3.5 w-3.5" />{task.money}
          </span>
          {task.bonusMin !== undefined && task.bonusMax !== undefined && (
            <span className="flex items-center gap-0.5 text-[9px] font-medium text-neon-orange">
              <Plus className="h-2 w-2" />{task.bonusMin}-{task.bonusMax} bonus
            </span>
          )}
          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" /> {task.time}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 animate-slide-up border-t border-border pt-3">
          <p className="text-xs leading-relaxed text-muted-foreground">{task.description}</p>
          {task.location && (
            <p className="mt-2 flex items-center gap-1 text-xs text-neon-orange">
              <MapPin className="h-3 w-3" /> {task.location}
            </p>
          )}

          {/* Verification explanation */}
          <div
            className="mt-3 flex items-start gap-2 rounded-lg border px-3 py-2"
            style={{
              borderColor: is1Step ? "rgba(57,255,20,0.15)" : "rgba(255,170,0,0.15)",
              background: is1Step ? "rgba(57,255,20,0.04)" : "rgba(255,170,0,0.04)",
            }}
          >
            <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" style={{ color: is1Step ? "#39ff14" : "#ffaa00" }} />
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              {is1Step
                ? "1-Step: Accept now and the task is yours instantly. No review needed."
                : `2-Step: Express interest with a message. The poster will review your profile and decide. ${
                    task.bonusMin !== undefined ? `Base pay: ${task.money} + ${task.bonusMin}-${task.bonusMax} performance bonus.` : ""
                  }`}
            </p>
          </div>

          {/* 2-step applicants count */}
          {!is1Step && task.applicants && task.applicants.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <User className="h-3 w-3" />
              {task.applicants.length} {task.applicants.length === 1 ? "student" : "students"} already interested
            </div>
          )}

          {/* Action buttons */}
          {isAssignedToOther ? (
            <div
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-bold"
              style={{
                borderColor: "rgba(255,170,0,0.2)",
                background: "rgba(255,170,0,0.06)",
                color: "#ffaa00",
              }}
            >
              <UserX className="h-4 w-4" />
              Task assigned to {assignedUser?.name || "someone else"}
            </div>
          ) : isAssignedToMe ? (
            <div
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-bold"
              style={{
                borderColor: "rgba(57,255,20,0.3)",
                background: "rgba(57,255,20,0.08)",
                color: "#39ff14",
              }}
            >
              <UserCheck className="h-4 w-4" />
              You got this task! Go to My Tasks.
            </div>
          ) : accepted ? (
            <div
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-bold"
              style={{
                borderColor: "rgba(57,255,20,0.3)",
                background: "rgba(57,255,20,0.08)",
                color: "#39ff14",
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Task Locked! It{"'"}s yours now.
            </div>
          ) : interested ? (
            <div
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-bold"
              style={{
                borderColor: "rgba(255,170,0,0.3)",
                background: "rgba(255,170,0,0.08)",
                color: "#ffaa00",
              }}
            >
              <Clock className="h-4 w-4" />
              Interest sent! Waiting for review...
            </div>
          ) : is1Step ? (
            <button
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-primary-foreground transition-all"
              style={{ background: "linear-gradient(135deg, #39ff14, #00f0ff)", boxShadow: "0 0 15px rgba(57,255,20,0.2)" }}
              onClick={handleDirectAccept}
            >
              <Unlock className="h-3.5 w-3.5" />
              Accept Task Instantly
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="mt-3 flex flex-col gap-2">
              {showInterestForm && (
                <div className="animate-slide-up" onClick={(e) => e.stopPropagation()}>
                  <textarea
                    value={interestMessage}
                    onChange={(e) => setInterestMessage(e.target.value)}
                    placeholder="Tell the poster why you're a good fit... (mention your skills, experience, or past work)"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-neon-orange/20 bg-secondary px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-neon-orange/50 focus:outline-none"
                    autoFocus
                  />
                </div>
              )}
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-primary-foreground transition-all"
                style={{
                  background: showInterestForm && !interestMessage.trim()
                    ? "rgba(255,170,0,0.3)"
                    : "linear-gradient(135deg, #ffaa00, #ff3366)",
                  boxShadow: showInterestForm && !interestMessage.trim() ? "none" : "0 0 15px rgba(255,170,0,0.2)",
                }}
                onClick={handleExpressInterest}
                disabled={showInterestForm && !interestMessage.trim()}
              >
                {showInterestForm ? (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Send Interest
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    Express Interest
                    <Star className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
              {showInterestForm && (
                <button
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); setShowInterestForm(false); setInterestMessage("") }}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function TasksTab() {
  const [mode, setMode] = useState<"online" | "offline" | null>(null)
  const [filter, setFilter] = useState<"all" | "immediate" | "feasible">("all")
  const containerRef = useRef<HTMLDivElement>(null)
  // Tracks which tasks are assigned and to whom (synced across the app in a real implementation)
  const [assignedMap] = useState<Record<string, string>>({})

  // Mode selection screen
  if (mode === null) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 pb-24">
        <div>
          <h1 className="text-center text-xl font-bold text-foreground">Browse Tasks</h1>
          <p className="mt-1 text-center text-xs text-muted-foreground">Choose your preferred mode</p>
        </div>

        <div className="flex w-full gap-4 px-4">
          {/* Online card */}
          <button
            onClick={() => setMode("online")}
            className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border border-neon-cyan/20 p-6 transition-all duration-500 hover:border-neon-cyan/50 hover:scale-[1.02]"
            style={{ background: "rgba(0,240,255,0.03)" }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,240,255,0.05))",
                border: "1px solid rgba(0,240,255,0.3)",
                boxShadow: "0 0 20px rgba(0,240,255,0.1)",
              }}
            >
              <Globe className="h-8 w-8 text-neon-cyan transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-neon-cyan">Online</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                PPT, Video Editing, Coding, Design & more digital work
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-medium text-neon-cyan/60">
              Enter <ChevronRight className="h-3 w-3" />
            </div>
          </button>

          {/* Offline card */}
          <button
            onClick={() => setMode("offline")}
            className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border border-neon-orange/20 p-6 transition-all duration-500 hover:border-neon-orange/50 hover:scale-[1.02]"
            style={{ background: "rgba(255,170,0,0.03)" }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(255,170,0,0.2), rgba(255,170,0,0.05))",
                border: "1px solid rgba(255,170,0,0.3)",
                boxShadow: "0 0 20px rgba(255,170,0,0.1)",
              }}
            >
              <Footprints className="h-8 w-8 text-neon-orange transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(255,170,0,0.6)]" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-neon-orange">Offline</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                Delivery, Printouts, Food runs & physical campus tasks
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-medium text-neon-orange/60">
              Enter <ChevronRight className="h-3 w-3" />
            </div>
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 rounded-xl border border-border px-4 py-2.5" style={{ background: "rgba(18,18,28,0.5)" }}>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Unlock className="h-3 w-3 text-neon-green" />
            1-Step: Instant
          </div>
          <div className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Lock className="h-3 w-3 text-neon-orange" />
            2-Step: Review
          </div>
        </div>
      </div>
    )
  }

  const isOnline = mode === "online"
  const accentColor = isOnline ? "#00f0ff" : "#ffaa00"
  const filteredTasks = sampleTasks.filter((t) => {
    if (t.type !== mode || t.status !== "open") return false
    if (filter === "immediate") return t.urgency === "immediate"
    if (filter === "feasible") return t.urgency === "feasible"
    return true
  })

  return (
    <div ref={containerRef} className="flex flex-col gap-4 pb-24">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode(null)}
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Go back to mode selection"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </button>
        <div>
          <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
            {isOnline ? (
              <><Wifi className="h-4 w-4" style={{ color: accentColor }} /> Online Tasks</>
            ) : (
              <><MapPin className="h-4 w-4" style={{ color: accentColor }} /> Offline Tasks</>
            )}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isOnline ? "Digital tasks you can do from anywhere" : "Physical tasks around campus"}
          </p>
        </div>
      </div>

      {/* Animated accent bar */}
      <div className="h-0.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(30,30,58,0.5)" }}>
        <div className="h-full w-1/3 rounded-full animate-shimmer" style={{ background: accentColor }} />
      </div>

      {/* Urgency filter */}
      <div className="flex gap-2">
        {(["all", "immediate", "feasible"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              filter === f
                ? "border-transparent text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
            style={
              filter === f
                ? {
                    background: f === "immediate" ? "#ff3366" : f === "feasible" ? "#39ff14" : accentColor,
                    color: "#0a0a0f",
                  }
                : {}
            }
          >
            {f === "immediate" && <Zap className="h-3 w-3" />}
            {f === "feasible" && <Clock className="h-3 w-3" />}
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} assignedMap={assignedMap} />)
        )}
      </div>
    </div>
  )
}
