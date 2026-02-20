"use client"

import { useState } from "react"
import { MapPin, X } from "lucide-react"

interface Location {
  id: string
  name: string
  x: number
  y: number
  taskCount: number
  type: "canteen" | "stationary" | "gate" | "library" | "lab" | "hostel"
}

const campusLocations: Location[] = [
  { id: "1", name: "Main Canteen", x: 35, y: 30, taskCount: 12, type: "canteen" },
  { id: "2", name: "Stationary Shop", x: 65, y: 25, taskCount: 3, type: "stationary" },
  { id: "3", name: "College Gate", x: 50, y: 85, taskCount: 2, type: "gate" },
  { id: "4", name: "Central Library", x: 25, y: 55, taskCount: 7, type: "library" },
  { id: "5", name: "CS Lab Block", x: 72, y: 50, taskCount: 9, type: "lab" },
  { id: "6", name: "Boys Hostel", x: 15, y: 75, taskCount: 5, type: "hostel" },
  { id: "7", name: "Girls Hostel", x: 80, y: 72, taskCount: 4, type: "hostel" },
  { id: "8", name: "Xerox Center", x: 48, y: 45, taskCount: 8, type: "stationary" },
]

function getMarkerColor(taskCount: number): { bg: string; glow: string; label: string } {
  if (taskCount >= 8) return { bg: "#ff3366", glow: "rgba(255,51,102,0.5)", label: "Hot" }
  if (taskCount >= 5) return { bg: "#ffaa00", glow: "rgba(255,170,0,0.4)", label: "Moderate" }
  return { bg: "#39ff14", glow: "rgba(57,255,20,0.4)", label: "Few" }
}

export function CampusMap() {
  const [selected, setSelected] = useState<Location | null>(null)

  return (
    <div className="relative w-full overflow-hidden rounded-xl neon-border">
      {/* Map background */}
      <div
        className="relative aspect-[4/3] w-full"
        style={{
          background: "linear-gradient(145deg, #0e0e18 0%, #12121c 50%, #0e0e18 100%)",
        }}
      >
        {/* Grid overlay */}
        <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Campus paths */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 85 L 50 45 L 25 55" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 50 45 L 72 50" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 50 45 L 35 30" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 50 45 L 65 25" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 25 55 L 15 75" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 72 50 L 80 72" fill="none" stroke="#1e1e3a" strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>

        {/* Campus label */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2">
          <span className="text-xs font-bold tracking-widest uppercase text-neon-cyan/60">Campus Map</span>
        </div>

        {/* Location markers */}
        {campusLocations.map((loc) => {
          const color = getMarkerColor(loc.taskCount)
          return (
            <button
              key={loc.id}
              className="absolute flex flex-col items-center transition-transform duration-200 hover:scale-110"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => setSelected(loc)}
              aria-label={`${loc.name} - ${loc.taskCount} tasks available`}
            >
              <div
                className="animate-pulse-glow relative flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background: color.bg,
                  boxShadow: `0 0 12px ${color.glow}, 0 0 24px ${color.glow}`,
                }}
              >
                <MapPin className="h-4 w-4 text-background" />
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: "#0a0a0f", color: color.bg, border: `1px solid ${color.bg}` }}
                >
                  {loc.taskCount}
                </span>
              </div>
              <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-muted-foreground">
                {loc.name}
              </span>
            </button>
          )
        })}

        {/* You are here indicator */}
        <div
          className="absolute flex items-center gap-1"
          style={{ left: "48%", top: "60%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-neon-cyan" style={{ boxShadow: "0 0 12px #00f0ff" }} />
            <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-neon-cyan opacity-40" />
          </div>
          <span className="text-[10px] font-semibold text-neon-cyan">You</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex gap-3 rounded-lg px-3 py-1.5 glass-card">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ background: "#ff3366" }} />
            <span className="text-[10px] text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ background: "#ffaa00" }} />
            <span className="text-[10px] text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ background: "#39ff14" }} />
            <span className="text-[10px] text-muted-foreground">Low</span>
          </div>
        </div>
      </div>

      {/* Selected location popup */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 animate-slide-up rounded-t-xl border-t border-neon-cyan/30 p-4"
          style={{ background: "rgba(18,18,28,0.95)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">{selected.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span
                  className="font-semibold"
                  style={{ color: getMarkerColor(selected.taskCount).bg }}
                >
                  {selected.taskCount} tasks
                </span>{" "}
                available nearby
              </p>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-neon-cyan" style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.3)" }}>
                  {selected.type}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
