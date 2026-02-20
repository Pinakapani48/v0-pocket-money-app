"use client"

import { sampleTransactions, currentUser } from "@/lib/store"
import {
  Wallet,
  IndianRupee,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export function WalletTab() {
  const totalEarned = sampleTransactions
    .filter((t) => t.type === "earned")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = sampleTransactions
    .filter((t) => t.type === "spent")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = currentUser.earnings

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div>
        <h1 className="text-lg font-bold text-foreground">Wallet</h1>
        <p className="text-xs text-muted-foreground">Your earnings and spending</p>
      </div>

      {/* Balance card */}
      <div
        className="relative overflow-hidden rounded-2xl border p-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,240,255,0.08), rgba(57,255,20,0.05))",
          borderColor: "rgba(0,240,255,0.2)",
        }}
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00f0ff, transparent)" }} />
        <div className="relative">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-neon-cyan" />
            <span className="text-xs font-medium text-muted-foreground">Total Balance</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <IndianRupee className="h-6 w-6 text-foreground" />
            <span className="text-3xl font-bold text-foreground">{balance.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-4 glass-card">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(57,255,20,0.1)" }}>
              <TrendingUp className="h-4 w-4 text-neon-green" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Earned</p>
              <p className="flex items-center text-sm font-bold text-neon-green">
                <IndianRupee className="h-3 w-3" />{totalEarned.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border p-4 glass-card">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(255,51,102,0.1)" }}>
              <TrendingDown className="h-4 w-4 text-neon-pink" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Spent</p>
              <p className="flex items-center text-sm font-bold text-neon-pink">
                <IndianRupee className="h-3 w-3" />{totalSpent.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="mb-3 text-sm font-bold text-foreground">Transaction History</h2>
        <div className="flex flex-col gap-2">
          {sampleTransactions.map((txn) => {
            const isEarned = txn.type === "earned"
            return (
              <div
                key={txn.id}
                className="flex items-center gap-3 rounded-xl border border-border p-3 glass-card"
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background: isEarned ? "rgba(57,255,20,0.1)" : "rgba(255,51,102,0.1)",
                  }}
                >
                  {isEarned ? (
                    <ArrowDownLeft className="h-4 w-4 text-neon-green" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-neon-pink" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{txn.description}</p>
                  <p className="text-[10px] text-muted-foreground">{formatDate(txn.date)}</p>
                </div>
                <span
                  className="flex items-center text-sm font-bold"
                  style={{ color: isEarned ? "#39ff14" : "#ff3366" }}
                >
                  {isEarned ? "+" : "-"}
                  <IndianRupee className="h-3 w-3" />
                  {txn.amount}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
