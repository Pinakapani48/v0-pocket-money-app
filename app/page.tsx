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

  const ActiveComponent = tabComponents[activeTab] || HomeTab

  return (
    <main className="mx-auto min-h-screen max-w-lg" style={{ background: "#0a0a0f" }}>
      <div className="px-4 pt-6">
        <ActiveComponent />
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
