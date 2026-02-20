"use client"

import { CampusMap } from "@/components/campus-map"
import { AIChatbot } from "@/components/ai-chatbot"
import { sampleTasks, sampleUsers } from "@/lib/store"
import { Zap, TrendingUp, Clock, IndianRupee } from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function HomeTab() {
  const urgentTasks = sampleTasks.filter((t) => t.urgency === "immediate" && t.status === "open")
  const recentTasks = sampleTasks.filter((t) => t.status === "open").slice(0, 4)

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            <span className="neon-text" style={{ color: "#00f0ff" }}>Pocket</span>
            <span style={{ color: "#39ff14" }}>Work</span>
          </h1>
          <p className="text-xs text-muted-foreground">Earn money, help peers</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-neon-green/30 px-3 py-1" style={{ background: "rgba(57,255,20,0.08)" }}>
          <IndianRupee className="h-3 w-3 text-neon-green" />
          <span className="text-sm font-bold text-neon-green">12,500</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 neon-border" style={{ background: "rgba(0,240,255,0.05)" }}>
          <Zap className="h-4 w-4 text-neon-cyan" />
          <p className="mt-1 text-lg font-bold text-foreground">{urgentTasks.length}</p>
          <p className="text-[10px] text-muted-foreground">Urgent Tasks</p>
        </div>
        <div className="rounded-xl p-3 neon-border" style={{ background: "rgba(57,255,20,0.05)" }}>
          <TrendingUp className="h-4 w-4 text-neon-green" />
          <p className="mt-1 text-lg font-bold text-foreground">{sampleTasks.length}</p>
          <p className="text-[10px] text-muted-foreground">Total Open</p>
        </div>
        <div className="rounded-xl p-3 neon-border" style={{ background: "rgba(255,51,102,0.05)" }}>
          <Clock className="h-4 w-4 text-neon-pink" />
          <p className="mt-1 text-lg font-bold text-foreground">47</p>
          <p className="text-[10px] text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Campus Map */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" style={{ boxShadow: "0 0 6px #00f0ff" }} />
          Campus Hotspots
        </h2>
        <CampusMap />
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green" style={{ boxShadow: "0 0 6px #39ff14" }} />
          Recent Tasks
        </h2>
        <div className="flex flex-col gap-2">
          {recentTasks.map((task) => {
            const poster = sampleUsers.find((u) => u.id === task.postedBy)
            return (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl p-3 transition-all duration-200 hover:border-neon-cyan/30 glass-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase"
                      style={{
                        background: task.type === "online" ? "rgba(0,240,255,0.15)" : "rgba(255,170,0,0.15)",
                        color: task.type === "online" ? "#00f0ff" : "#ffaa00",
                      }}
                    >
                      {task.type}
                    </span>
                    {task.urgency === "immediate" && (
                      <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(255,51,102,0.15)", color: "#ff3366" }}>
                        <Zap className="h-2.5 w-2.5" /> URGENT
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-xs font-semibold text-foreground">{task.title}</h3>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    by {poster?.name || "Unknown"} · {formatTimeAgo(task.postedAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="flex items-center text-sm font-bold text-neon-green">
                    <IndianRupee className="h-3 w-3" />{task.money}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{task.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  )
}
