"use client"

import { useState } from "react"
import { sampleUsers, sampleTasks } from "@/lib/store"
import {
  Search,
  Star,
  CheckCircle2,
  IndianRupee,
  Clock,
  Zap,
  User,
  Tag,
  X,
} from "lucide-react"

const trendingTags = ["editor", "coder", "artist", "runner", "writer", "presenter", "designer"]

export function SearchTab() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState<"users" | "tags">("users")

  const lowerQuery = query.toLowerCase().trim()

  const filteredUsers =
    lowerQuery.length > 0
      ? sampleUsers.filter(
          (u) =>
            u.username.toLowerCase().includes(lowerQuery) ||
            u.name.toLowerCase().includes(lowerQuery)
        )
      : []

  const filteredTasks =
    lowerQuery.length > 0
      ? sampleTasks.filter(
          (t) =>
            t.skills.some((s) => s.toLowerCase().includes(lowerQuery)) ||
            t.title.toLowerCase().includes(lowerQuery)
        )
      : []

  const handleTagClick = (tag: string) => {
    setQuery(tag)
    setSearchType("tags")
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-lg font-bold text-foreground">Search</h1>
        <p className="text-xs text-muted-foreground">Find users or tasks by skills</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search username, name, or skill tags..."
          className="w-full rounded-xl border border-border bg-secondary py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search type toggle */}
      <div className="flex rounded-xl border border-border overflow-hidden" style={{ background: "rgba(18,18,28,0.5)" }}>
        <button
          onClick={() => setSearchType("users")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all ${
            searchType === "users" ? "text-neon-cyan" : "text-muted-foreground"
          }`}
          style={searchType === "users" ? { background: "rgba(0,240,255,0.1)" } : {}}
        >
          <User className="h-3.5 w-3.5" /> Users
        </button>
        <button
          onClick={() => setSearchType("tags")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all ${
            searchType === "tags" ? "text-neon-green" : "text-muted-foreground"
          }`}
          style={searchType === "tags" ? { background: "rgba(57,255,20,0.1)" } : {}}
        >
          <Tag className="h-3.5 w-3.5" /> Tags / Tasks
        </button>
      </div>

      {/* Trending tags */}
      {!query && (
        <div>
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Trending Skills</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-neon-cyan/20 px-3 py-1.5 text-xs font-medium capitalize text-neon-cyan transition-all hover:border-neon-cyan/50 hover:bg-neon-cyan/5"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && searchType === "users" && (
        <div className="flex flex-col gap-3">
          <p className="text-[10px] text-muted-foreground">{filteredUsers.length} users found</p>
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 rounded-xl border border-border p-3 glass-card">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
                style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}
              >
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{user.name}</h3>
                <p className="text-[11px] text-neon-cyan">@{user.username}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {user.skills.map((s) => (
                    <span key={s} className="rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize" style={{ background: "rgba(191,95,255,0.1)", color: "#bf5fff" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 text-neon-orange" />
                  <span className="text-xs font-bold text-foreground">{user.rating}</span>
                </div>
                <span className="flex items-center text-[10px] text-muted-foreground">
                  <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" /> {user.tasksCompleted}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {query && searchType === "tags" && (
        <div className="flex flex-col gap-3">
          <p className="text-[10px] text-muted-foreground">{filteredTasks.length} tasks found</p>
          {filteredTasks.map((task) => {
            const poster = sampleUsers.find((u) => u.id === task.postedBy)
            return (
              <div key={task.id} className="rounded-xl border border-border p-3 glass-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
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
                        <span className="flex items-center gap-0.5 text-[9px] font-bold" style={{ color: "#ff3366" }}>
                          <Zap className="h-2.5 w-2.5" /> URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-xs font-semibold text-foreground">{task.title}</h3>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      by {poster?.name} · {task.time}
                    </p>
                    <div className="mt-1 flex gap-1">
                      {task.skills.map((s) => (
                        <span key={s} className="rounded-full px-1.5 py-0.5 text-[9px] capitalize" style={{ background: "rgba(191,95,255,0.1)", color: "#bf5fff" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 pl-3">
                    <span className="flex items-center text-sm font-bold text-neon-green">
                      <IndianRupee className="h-3 w-3" />{task.money}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" /> {task.time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
