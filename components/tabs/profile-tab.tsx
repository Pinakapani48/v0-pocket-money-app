"use client"

import { useState } from "react"
import { currentUser, skillPortfolio } from "@/lib/store"
import {
  Star,
  CheckCircle2,
  IndianRupee,
  GraduationCap,
  Calendar,
  ChevronLeft,
  Palette,
  Code,
  Film,
  PenTool,
  Footprints,
  Presentation,
  BookOpen,
  School,
} from "lucide-react"

const skillIcons: Record<string, React.ElementType> = {
  editor: Film,
  coder: Code,
  artist: Palette,
  writer: PenTool,
  runner: Footprints,
  presenter: Presentation,
  designer: Palette,
  tutor: BookOpen,
}

const skillColors: Record<string, string> = {
  editor: "#00f0ff",
  coder: "#39ff14",
  artist: "#ff3366",
  writer: "#ffaa00",
  runner: "#bf5fff",
  presenter: "#00f0ff",
  designer: "#ff3366",
  tutor: "#39ff14",
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export function ProfileTab() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const user = currentUser

  if (selectedSkill) {
    const portfolio = skillPortfolio[selectedSkill] || []
    const color = skillColors[selectedSkill] || "#00f0ff"
    const Icon = skillIcons[selectedSkill] || Code

    return (
      <div className="flex flex-col gap-5 pb-24">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedSkill(null)}
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Go back to profile"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" style={{ color }} />
            <h1 className="text-lg font-bold capitalize text-foreground">{selectedSkill} Portfolio</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {portfolio.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-muted-foreground">No portfolio items yet</p>
            </div>
          ) : (
            portfolio.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4 glass-card transition-all hover:border-opacity-50"
                style={{ borderColor: `${color}20` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">{formatDate(item.date)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Profile header */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border p-6 glass-card">
        {/* Avatar */}
        <div className="relative">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #39ff14)",
              boxShadow: "0 0 20px rgba(0,240,255,0.3)",
            }}
          >
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2"
            style={{ background: "#0a0a0f", borderColor: "#39ff14" }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-neon-green" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
          <p className="text-xs text-neon-cyan">@{user.username}</p>
          <p className="mt-2 max-w-xs text-xs text-muted-foreground leading-relaxed">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="mt-2 grid w-full grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl p-2" style={{ background: "rgba(0,240,255,0.05)" }}>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 text-neon-cyan" />
              <span className="text-sm font-bold text-foreground">{user.rating}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">Rating</span>
          </div>
          <div className="flex flex-col items-center rounded-xl p-2" style={{ background: "rgba(57,255,20,0.05)" }}>
            <span className="text-sm font-bold text-foreground">{user.tasksCompleted}</span>
            <span className="text-[10px] text-muted-foreground">Tasks</span>
          </div>
          <div className="flex flex-col items-center rounded-xl p-2" style={{ background: "rgba(255,170,0,0.05)" }}>
            <div className="flex items-center gap-0.5">
              <IndianRupee className="h-3 w-3 text-neon-orange" />
              <span className="text-sm font-bold text-foreground">{(user.earnings / 1000).toFixed(1)}k</span>
            </div>
            <span className="text-[10px] text-muted-foreground">Earned</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-xl border border-border p-4 glass-card">
        <h2 className="mb-3 text-sm font-bold text-foreground">Details</h2>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-4 w-4 text-neon-cyan" />
            <div>
              <p className="text-xs font-medium text-foreground">{user.college}</p>
              <p className="text-[10px] text-muted-foreground">College</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-neon-green" />
            <div>
              <p className="text-xs font-medium text-foreground">{user.age} years old</p>
              <p className="text-[10px] text-muted-foreground">Age</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <School className="h-4 w-4 text-neon-orange" />
            <div>
              <p className="text-xs font-medium text-foreground">B.Tech CSE, 3rd Year</p>
              <p className="text-[10px] text-muted-foreground">Program</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills tags */}
      <div className="rounded-xl border border-border p-4 glass-card">
        <h2 className="mb-3 text-sm font-bold text-foreground">Skills & Portfolio</h2>
        <p className="mb-3 text-[10px] text-muted-foreground">Tap a skill to view your portfolio</p>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => {
            const color = skillColors[skill] || "#00f0ff"
            const Icon = skillIcons[skill] || Code
            return (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className="flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold capitalize transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: `${color}40`,
                  color: color,
                  background: `${color}10`,
                  boxShadow: `0 0 10px ${color}15`,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {skill}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
