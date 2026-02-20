"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeTab } from "@/components/tabs/home-tab"
import { PostTab } from "@/components/tabs/post-tab"
import { TasksTab } from "@/components/tabs/tasks-tab"
import { MyTasksTab } from "@/components/tabs/my-tasks-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { SearchTab } from "@/components/tabs/search-tab"
import { WalletTab } from "@/components/tabs/wallet-tab"
import {
  NotificationBell,
  NotificationsPanel,
} from "@/components/notifications-panel"

const tabComponents: Record<string, React.ComponentType> = {
  home: HomeTab,
  post: PostTab,
  tasks: TasksTab,
  mytasks: MyTasksTab,
  profile: ProfileTab,
  search: SearchTab,
  wallet: WalletTab,
}

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")
  const [showNotifications, setShowNotifications] = useState(false)

  const ActiveComponent = tabComponents[activeTab] || HomeTab

  return (
    <main className="mx-auto min-h-screen max-w-lg" style={{ background: "#0a0a0f" }}>
      {/* Top bar with notification bell */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border px-4 py-3" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)" }}>
        <div>
          <h1 className="text-sm font-bold neon-text" style={{ color: "#00f0ff" }}>PocketWork</h1>
          <p className="text-[10px] text-muted-foreground">Earn while you learn</p>
        </div>
        <NotificationBell onOpenNotifications={() => setShowNotifications(true)} />
      </div>

      <div className="px-4 pt-4">
        <ActiveComponent />
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </main>
  )
}
