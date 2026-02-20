"use client"

import { useState } from "react"
import {
  sampleTasks,
  completedTasks,
  sampleUsers,
  sampleChats,
  currentUser,
  type ChatMessage,
  type Task,
  type TaskApplicant,
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
  Lock,
  Unlock,
  User,
  Star,
  Eye,
  UserCheck,
  XCircle,
  Plus,
  FileText,
} from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// Profile review modal for 2-step verification
function ApplicantReviewPanel({
  task,
  onClose,
  onAssign,
}: {
  task: Task
  onClose: () => void
  onAssign: (userId: string) => void
}) {
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null)
  const [confirmAssign, setConfirmAssign] = useState(false)

  const applicants = task.applicants || []
  const selectedUser = sampleUsers.find((u) => u.id === selectedApplicant)

  if (confirmAssign && selectedUser) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6" style={{ background: "rgba(10,10,15,0.95)" }}>
        <div className="w-full max-w-sm animate-slide-up">
          <div
            className="flex flex-col items-center gap-4 rounded-2xl border p-6"
            style={{
              borderColor: "rgba(57,255,20,0.3)",
              background: "rgba(57,255,20,0.05)",
              boxShadow: "0 0 40px rgba(57,255,20,0.1)",
            }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(57,255,20,0.15)" }}>
              <UserCheck className="h-8 w-8 text-neon-green" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-foreground">Assign to {selectedUser.name}?</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                They will be notified and the task will be locked.
              </p>
              {task.bonusMin !== undefined && (
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-neon-orange">
                  <IndianRupee className="h-3 w-3" />
                  Pay: {task.money} + {task.bonusMin}-{task.bonusMax} bonus
                </p>
              )}
            </div>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setConfirmAssign(false)}
                className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border py-2.5 text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
              >
                Go Back
              </button>
              <button
                onClick={() => onAssign(selectedApplicant!)}
                className="flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold text-primary-foreground"
                style={{ background: "linear-gradient(135deg, #39ff14, #00f0ff)", boxShadow: "0 0 20px rgba(57,255,20,0.3)" }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Confirm Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={onClose} className="text-muted-foreground" aria-label="Close review panel">
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">Review Applicants</h3>
          <p className="text-[10px] text-muted-foreground truncate">{task.title}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold" style={{ background: "rgba(255,170,0,0.12)", color: "#ffaa00" }}>
          <Lock className="h-2.5 w-2.5" /> 2-STEP
        </span>
      </div>

      {/* Task summary */}
      <div className="border-b border-border px-4 py-3" style={{ background: "rgba(18,18,28,0.5)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-3.5 w-3.5 text-neon-green" />
            <span className="text-sm font-bold text-neon-green">{task.money}</span>
            {task.bonusMin !== undefined && (
              <span className="flex items-center gap-0.5 text-[10px] text-neon-orange">
                <Plus className="h-2.5 w-2.5" />{task.bonusMin}-{task.bonusMax} bonus
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">{applicants.length} applicant{applicants.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Applicant list */}
      <div className="flex-1 overflow-y-auto p-4">
        {applicants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <User className="h-8 w-8 text-muted-foreground/30" />
            <p className="mt-2 text-xs text-muted-foreground">No applicants yet</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground/60">Students will appear here when they express interest</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applicants.map((applicant) => {
              const user = sampleUsers.find((u) => u.id === applicant.userId)
              if (!user) return null
              const isSelected = selectedApplicant === applicant.userId

              return (
                <div
                  key={applicant.userId}
                  className={`rounded-xl border p-4 transition-all duration-300 ${
                    isSelected ? "border-neon-cyan/40" : "border-border"
                  }`}
                  style={isSelected ? { background: "rgba(0,240,255,0.04)", boxShadow: "0 0 15px rgba(0,240,255,0.08)" } : { background: "rgba(18,18,28,0.5)" }}
                >
                  {/* User info */}
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, #00f0ff, #bf5fff)" }}
                    >
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">{user.name}</h4>
                        <div className="flex items-center gap-0.5 text-[10px] text-neon-orange">
                          <Star className="h-2.5 w-2.5 fill-neon-orange" /> {user.rating}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground">@{user.username} · {user.college}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {user.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize"
                            style={{ background: "rgba(191,95,255,0.1)", color: "#bf5fff" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span>{user.tasksCompleted} tasks done</span>
                        <span>Earned {user.earnings}</span>
                      </div>
                    </div>
                  </div>

                  {/* Applicant message */}
                  <div className="mt-3 rounded-lg border border-border px-3 py-2" style={{ background: "rgba(10,10,15,0.5)" }}>
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                      <FileText className="h-2.5 w-2.5" /> Their message:
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/80">{applicant.message}</p>
                    <p className="mt-1 text-[9px] text-muted-foreground">{formatTimeAgo(applicant.appliedAt)}</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setSelectedApplicant(isSelected ? null : applicant.userId)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neon-cyan/30 py-2 text-xs font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
                    >
                      <Eye className="h-3.5 w-3.5" /> {isSelected ? "Deselect" : "Select"}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedApplicant(applicant.userId)
                        setConfirmAssign(true)
                      }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-primary-foreground"
                      style={{ background: "linear-gradient(135deg, #39ff14, #00f0ff)" }}
                    >
                      <UserCheck className="h-3.5 w-3.5" /> Assign
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
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
  const [tab, setTab] = useState<"active" | "posted" | "completed">("active")
  const [chatTaskId, setChatTaskId] = useState<string | null>(null)
  const [reviewTask, setReviewTask] = useState<Task | null>(null)
  const [assignedMap, setAssignedMap] = useState<Record<string, string>>({})

  // Tasks the current user is working on (assigned to them)
  const activeTasks = sampleTasks.filter((t) => t.status === "open").slice(0, 2)
  // Tasks the current user posted (for 2-step review)
  const postedTasks = sampleTasks.filter(
    (t) => t.verification === "2-step" && t.status === "open" && t.applicants && t.applicants.length > 0
  )
  const userCompletedTasks = completedTasks

  const handleAssign = (taskId: string, userId: string) => {
    setAssignedMap((prev) => ({ ...prev, [taskId]: userId }))
    setReviewTask(null)
  }

  if (reviewTask) {
    return (
      <ApplicantReviewPanel
        task={reviewTask}
        onClose={() => setReviewTask(null)}
        onAssign={(userId) => handleAssign(reviewTask.id, userId)}
      />
    )
  }

  if (chatTaskId) {
    return <ChatPanel taskId={chatTaskId} onClose={() => setChatTaskId(null)} />
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      <div>
        <h1 className="text-lg font-bold text-foreground">My Tasks</h1>
        <p className="text-xs text-muted-foreground">Track, review, and manage your work</p>
      </div>

      {/* Tab switcher - now 3 tabs */}
      <div className="flex rounded-xl border border-border overflow-hidden" style={{ background: "rgba(18,18,28,0.5)" }}>
        <button
          onClick={() => setTab("active")}
          className={`flex flex-1 items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-all ${
            tab === "active" ? "text-neon-cyan" : "text-muted-foreground"
          }`}
          style={tab === "active" ? { background: "rgba(0,240,255,0.1)" } : {}}
        >
          <Clock className="h-3 w-3" /> Active
        </button>
        <button
          onClick={() => setTab("posted")}
          className={`relative flex flex-1 items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-all ${
            tab === "posted" ? "text-neon-orange" : "text-muted-foreground"
          }`}
          style={tab === "posted" ? { background: "rgba(255,170,0,0.1)" } : {}}
        >
          <Eye className="h-3 w-3" /> Review
          {postedTasks.length > 0 && (
            <span
              className="absolute -right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-primary-foreground"
              style={{ background: "#ff3366" }}
            >
              {postedTasks.reduce((sum, t) => sum + (t.applicants?.length || 0), 0)}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`flex flex-1 items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-all ${
            tab === "completed" ? "text-neon-green" : "text-muted-foreground"
          }`}
          style={tab === "completed" ? { background: "rgba(57,255,20,0.1)" } : {}}
        >
          <CheckCircle2 className="h-3 w-3" /> Done
        </button>
      </div>

      {/* Content based on tab */}
      {tab === "posted" ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2 rounded-xl border border-neon-orange/15 px-3 py-2.5" style={{ background: "rgba(255,170,0,0.04)" }}>
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-orange" />
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              These are your 2-step verification tasks. Review applicants, check their profiles, and assign the task to the best candidate.
            </p>
          </div>

          {postedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-muted-foreground">No pending reviews</p>
            </div>
          ) : (
            postedTasks.map((task) => {
              const isAssigned = assignedMap[task.id]
              const assignedUser = isAssigned ? sampleUsers.find((u) => u.id === isAssigned) : null

              return (
                <div key={task.id} className="rounded-xl border border-border p-4 glass-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(255,170,0,0.12)", color: "#ffaa00" }}>
                          <Lock className="h-2.5 w-2.5" /> 2-STEP
                        </span>
                        {task.urgency === "immediate" && (
                          <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: "rgba(255,51,102,0.15)", color: "#ff3366" }}>
                            <Zap className="h-2.5 w-2.5" /> URGENT
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 text-sm font-semibold text-foreground">{task.title}</h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {formatTimeAgo(task.postedAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 pl-3">
                      <span className="flex items-center text-sm font-bold text-neon-green">
                        <IndianRupee className="h-3 w-3" />{task.money}
                      </span>
                      {task.bonusMin !== undefined && (
                        <span className="flex items-center gap-0.5 text-[9px] text-neon-orange">
                          <Plus className="h-2 w-2" />{task.bonusMin}-{task.bonusMax}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Applicant preview */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {(task.applicants || []).slice(0, 3).map((applicant) => {
                        const user = sampleUsers.find((u) => u.id === applicant.userId)
                        return (
                          <div
                            key={applicant.userId}
                            className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[8px] font-bold text-primary-foreground"
                            style={{ borderColor: "#0a0a0f", background: "linear-gradient(135deg, #00f0ff, #bf5fff)" }}
                            title={user?.name}
                          >
                            {user?.name.split(" ").map((n) => n[0]).join("") || "?"}
                          </div>
                        )
                      })}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {(task.applicants || []).length} interested
                    </span>
                  </div>

                  {isAssigned ? (
                    <div
                      className="mt-3 flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-bold"
                      style={{
                        borderColor: "rgba(57,255,20,0.3)",
                        background: "rgba(57,255,20,0.08)",
                        color: "#39ff14",
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Assigned to {assignedUser?.name}
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewTask(task)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-primary-foreground transition-all"
                      style={{ background: "linear-gradient(135deg, #ffaa00, #ff3366)", boxShadow: "0 0 15px rgba(255,170,0,0.2)" }}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Review Applicants
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {(tab === "active" ? activeTasks : userCompletedTasks).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-muted-foreground">No tasks here yet</p>
            </div>
          ) : (
            (tab === "active" ? activeTasks : userCompletedTasks).map((task) => {
              const poster = sampleUsers.find((u) => u.id === task.postedBy)
              const isCompleted = task.status === "completed"
              const is1Step = task.verification === "1-step"
              return (
                <div key={task.id} className="rounded-xl border border-border p-4 glass-card">
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
      )}
    </div>
  )
}
