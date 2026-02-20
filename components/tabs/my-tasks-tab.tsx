"use client"

import { useState } from "react"
import {
  sampleTasks,
  completedTasks,
  sampleUsers,
  sampleChats,
  currentUser,
  type ChatMessage,
} from "@/lib/store"
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  MessageCircle,
  Send,
  X,
  ChevronRight,
  Zap,
} from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function ChatPanel({
  taskId,
  onClose,
}: {
  taskId: string
  onClose: () => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    sampleChats.filter((c) => c.taskId === taskId)
  )
  const [input, setInput] = useState("")
  const task = [...sampleTasks, ...completedTasks].find((t) => t.id === taskId)
  const otherUserId = task?.postedBy === currentUser.id ? task?.assignedTo : task?.postedBy
  const otherUser = sampleUsers.find((u) => u.id === otherUserId)

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      taskId,
      senderId: currentUser.id,
      text: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMsg])
    setInput("")
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={onClose} className="text-muted-foreground" aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">
            {otherUser?.name || "Unknown"}
          </h3>
          <p className="text-[10px] text-muted-foreground truncate">
            {task?.title}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="py-12 text-center text-xs text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  isMe ? "rounded-br-sm text-primary-foreground" : "rounded-bl-sm text-foreground"
                }`}
                style={{
                  background: isMe
                    ? "linear-gradient(135deg, #00f0ff, #00c8d6)"
                    : "rgba(30,30,58,0.8)",
                }}
              >
                {msg.text}
                <p className={`mt-1 text-[9px] ${isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {formatTimeAgo(msg.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-neon-cyan/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-30"
            style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}
            aria-label="Send message"
          >
            <Send className="h-4 w-4 text-primary-foreground" />
          </button>
        </form>
      </div>
    </div>
  )
}

export function MyTasksTab() {
  const [tab, setTab] = useState<"active" | "completed">("active")
  const [chatTaskId, setChatTaskId] = useState<string | null>(null)

  // Simulated tasks the user is working on
  const activeTasks = sampleTasks.filter((t) => t.status === "open").slice(0, 2)
  const userCompletedTasks = completedTasks

  const displayTasks = tab === "active" ? activeTasks : userCompletedTasks

  if (chatTaskId) {
    return <ChatPanel taskId={chatTaskId} onClose={() => setChatTaskId(null)} />
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-lg font-bold text-foreground">My Tasks</h1>
        <p className="text-xs text-muted-foreground">Track your active and completed work</p>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-xl border border-border overflow-hidden" style={{ background: "rgba(18,18,28,0.5)" }}>
        <button
          onClick={() => setTab("active")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all ${
            tab === "active" ? "text-neon-cyan" : "text-muted-foreground"
          }`}
          style={tab === "active" ? { background: "rgba(0,240,255,0.1)" } : {}}
        >
          <Clock className="h-3.5 w-3.5" /> Active ({activeTasks.length})
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all ${
            tab === "completed" ? "text-neon-green" : "text-muted-foreground"
          }`}
          style={tab === "completed" ? { background: "rgba(57,255,20,0.1)" } : {}}
        >
          <CheckCircle2 className="h-3.5 w-3.5" /> Completed ({userCompletedTasks.length})
        </button>
      </div>

      {/* Task cards */}
      <div className="flex flex-col gap-3">
        {displayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">No tasks here yet</p>
          </div>
        ) : (
          displayTasks.map((task) => {
            const poster = sampleUsers.find((u) => u.id === task.postedBy)
            const isCompleted = task.status === "completed"
            return (
              <div
                key={task.id}
                className="rounded-xl border border-border p-4 glass-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(57,255,20,0.15)", color: "#39ff14" }}>
                          <CheckCircle2 className="h-2.5 w-2.5" /> DONE
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(0,240,255,0.15)", color: "#00f0ff" }}>
                          <Clock className="h-2.5 w-2.5" /> IN PROGRESS
                        </span>
                      )}
                      {task.urgency === "immediate" && (
                        <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(255,51,102,0.15)", color: "#ff3366" }}>
                          <Zap className="h-2.5 w-2.5" /> URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-sm font-semibold text-foreground">{task.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Posted by {poster?.name} · {formatTimeAgo(task.postedAt)}
                    </p>
                  </div>
                  <span className="flex items-center text-sm font-bold text-neon-green">
                    <IndianRupee className="h-3 w-3" />{task.money}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setChatTaskId(task.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neon-cyan/30 py-2 text-xs font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Chat
                  </button>
                  {!isCompleted && (
                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark Done
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
