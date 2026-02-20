"use client"

import { useState, useRef } from "react"
import { sampleTasks, sampleUsers } from "@/lib/store"
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
} from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function TaskCard({ task }: { task: typeof sampleTasks[0] }) {
  const poster = sampleUsers.find((u) => u.id === task.postedBy)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-xl border border-border p-4 transition-all duration-300 hover:border-neon-cyan/20 glass-card cursor-pointer"
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => { if (e.key === "Enter") setExpanded(!expanded) }}
    >
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
          <button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold text-primary-foreground transition-all"
            style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}
            onClick={(e) => {
              e.stopPropagation()
              // Accept task action
            }}
          >
            Accept Task <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

export function TasksTab() {
  const [mode, setMode] = useState<"online" | "offline" | null>(null)
  const [filter, setFilter] = useState<"all" | "immediate" | "feasible">("all")
  const containerRef = useRef<HTMLDivElement>(null)

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
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}
