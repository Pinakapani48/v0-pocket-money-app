"use client"

import {
  Home,
  Plus,
  ListTodo,
  ClipboardList,
  User,
  Search,
  Wallet,
} from "lucide-react"

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "post", label: "Post", icon: Plus },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "mytasks", label: "My Tasks", icon: ClipboardList },
  { id: "profile", label: "Profile", icon: User },
  { id: "search", label: "Search", icon: Search },
  { id: "wallet", label: "Wallet", icon: Wallet },
]

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border"
      style={{ background: "rgba(10, 10, 15, 0.95)", backdropFilter: "blur(20px)" }}
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isPost = tab.id === "post"

          if (isPost) {
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-label={tab.label}
                onClick={() => onTabChange(tab.id)}
                className="group relative -mt-5 flex flex-col items-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #39ff14)",
                    boxShadow: "0 0 20px rgba(0,240,255,0.4), 0 0 40px rgba(57,255,20,0.2)",
                  }}
                >
                  <Plus className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="mt-0.5 text-[10px] font-medium text-neon-cyan">
                  Post
                </span>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.id)}
              className="group flex flex-col items-center gap-0.5 px-1 py-2 transition-all duration-200"
            >
              <div className="relative">
                <tab.icon
                  className={`h-5 w-5 transition-all duration-200 ${
                    isActive
                      ? "text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                    style={{ background: "#00f0ff", boxShadow: "0 0 8px #00f0ff" }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-neon-cyan" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
