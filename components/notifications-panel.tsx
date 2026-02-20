"use client"

import { useState } from "react"
import {
  sampleNotifications,
  sampleUsers,
  type Notification,
} from "@/lib/store"
import {
  Bell,
  X,
  UserCheck,
  UserX,
  MessageSquarePlus,
  CheckCircle2,
  Circle,
} from "lucide-react"

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function getNotificationContent(notification: Notification) {
  const fromUser = notification.fromUserId
    ? sampleUsers.find((u) => u.id === notification.fromUserId)
    : null
  const assignedUser = notification.assignedToUserId
    ? sampleUsers.find((u) => u.id === notification.assignedToUserId)
    : null

  switch (notification.type) {
    case "task-assigned-to-you":
      return {
        icon: <UserCheck className="h-4 w-4" />,
        iconBg: "rgba(57,255,20,0.15)",
        iconColor: "#39ff14",
        title: "You got the task!",
        message: `${fromUser?.name || "Someone"} assigned "${notification.taskTitle}" to you. Time to get to work!`,
      }
    case "task-assigned-to-other":
      return {
        icon: <UserX className="h-4 w-4" />,
        iconBg: "rgba(255,170,0,0.15)",
        iconColor: "#ffaa00",
        title: "Task assigned to someone else",
        message: `"${notification.taskTitle}" was assigned to ${assignedUser?.name || "another student"}. Keep looking, more tasks are coming!`,
      }
    case "new-applicant":
      return {
        icon: <MessageSquarePlus className="h-4 w-4" />,
        iconBg: "rgba(0,240,255,0.15)",
        iconColor: "#00f0ff",
        title: "New applicant!",
        message: `${fromUser?.name || "Someone"} expressed interest in "${notification.taskTitle}". Review their profile now.`,
      }
    case "interest-received":
      return {
        icon: <MessageSquarePlus className="h-4 w-4" />,
        iconBg: "rgba(191,95,255,0.15)",
        iconColor: "#bf5fff",
        title: "Interest received",
        message: `${fromUser?.name || "Someone"} expressed interest in your task "${notification.taskTitle}".`,
      }
    default:
      return {
        icon: <Bell className="h-4 w-4" />,
        iconBg: "rgba(0,240,255,0.15)",
        iconColor: "#00f0ff",
        title: "Notification",
        message: notification.taskTitle,
      }
  }
}

export function NotificationBell({
  onOpenNotifications,
}: {
  onOpenNotifications: () => void
}) {
  const [notifications] = useState<Notification[]>(sampleNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <button
      onClick={onOpenNotifications}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-all hover:border-neon-cyan/30 hover:bg-secondary"
      aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
    >
      <Bell className="h-4 w-4 text-muted-foreground" />
      {unreadCount > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-primary-foreground animate-pulse-glow"
          style={{ background: "#ff3366" }}
        >
          {unreadCount}
        </span>
      )}
    </button>
  )
}

export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#0a0a0f" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-muted-foreground"
            aria-label="Close notifications"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-bold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span
              className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[9px] font-bold text-primary-foreground"
              style={{ background: "#ff3366" }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[11px] font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="h-8 w-8 text-muted-foreground/20" />
            <p className="mt-3 text-sm text-muted-foreground">
              No notifications yet
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground/60">
              {"You'll"} be notified about task updates here
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notification) => {
              const content = getNotificationContent(notification)
              return (
                <button
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={`flex items-start gap-3 border-b border-border px-4 py-4 text-left transition-all ${
                    notification.read
                      ? "opacity-60"
                      : "hover:bg-secondary/30"
                  }`}
                  style={
                    !notification.read
                      ? {
                          background: "rgba(0,240,255,0.02)",
                          borderLeft: `2px solid ${content.iconColor}`,
                        }
                      : { borderLeft: "2px solid transparent" }
                  }
                >
                  {/* Icon */}
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: content.iconBg, color: content.iconColor }}
                  >
                    {content.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs font-semibold ${
                          notification.read
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {content.title}
                      </h4>
                      {!notification.read && (
                        <Circle
                          className="h-2 w-2 shrink-0 fill-neon-cyan text-neon-cyan"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                      {content.message}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground/50">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>

                  {/* Read indicator */}
                  {notification.read && (
                    <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Info bar */}
      <div
        className="border-t border-border px-4 py-3"
        style={{ background: "rgba(18,18,28,0.5)" }}
      >
        <div className="flex items-start gap-2">
          <UserX className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-orange" />
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            For 2-step tasks, all applicants are notified when the task is assigned. If you were not selected,{" "}
            {"don't"} worry -- more tasks are posted every day!
          </p>
        </div>
      </div>
    </div>
  )
}
