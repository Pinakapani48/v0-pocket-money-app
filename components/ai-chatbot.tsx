"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Sparkles, ChevronUp } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickReplies = [
  "Help me write a task description",
  "What tasks are trending?",
  "How to price my task?",
  "Tips to get fast responses",
]

const botResponses: Record<string, string> = {
  "help me write a task description": "Sure! To write a great task description, include:\n1. What exactly needs to be done\n2. Any specific tools/skills needed\n3. Deadline and urgency\n4. Where to deliver/meet\n\nFor example: \"Need someone to create a 10-slide PPT on Machine Learning basics. Must include diagrams and clean design. Deadline: Tomorrow 5 PM.\"",
  "what tasks are trending?": "Hot tasks right now on campus:\n1. PPT Preparation - 15 requests\n2. Assignment Writing - 12 requests\n3. Print & Delivery - 10 requests\n4. Video Editing - 8 requests\n5. Canteen Food Delivery - 7 requests",
  "how to price my task?": "Here's a quick pricing guide:\n- Simple tasks (bring items): 20-50 rupees\n- Medium tasks (printing, delivery): 50-100 rupees\n- Skill-based (editing, design): 100-500 rupees\n- Complex tasks (coding, writing): 200-1000 rupees\n\nTip: Check similar tasks to stay competitive!",
  "tips to get fast responses": "Tips for faster responses:\n1. Write clear, detailed descriptions\n2. Set a fair price for the work\n3. Add relevant skill tags\n4. Mark urgency correctly\n5. Respond quickly to applicants\n6. Add your location for offline tasks",
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return "I can help you with task descriptions, pricing, trending tasks, and tips! Try asking me about any of these topics. You can also describe your task and I'll help you write a compelling description for it."
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! I'm PocketBot, your campus task assistant. I can help you write task descriptions, suggest pricing, and more. What do you need?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotReply(text),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #39ff14)",
          boxShadow: "0 0 20px rgba(0,240,255,0.3), 0 0 40px rgba(57,255,20,0.15)",
        }}
        aria-label="Open AI assistant"
      >
        <Bot className="h-5 w-5 text-primary-foreground" />
        <span className="text-xs font-bold text-primary-foreground">PocketBot</span>
        <ChevronUp className="h-3 w-3 text-primary-foreground" />
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-40 mx-auto flex max-w-lg flex-col"
      style={{ height: "60vh" }}
    >
      <div
        className="flex flex-col overflow-hidden rounded-t-2xl border border-border"
        style={{ background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)", height: "100%" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}
            >
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">PocketBot</h3>
              <p className="text-[10px] text-neon-green">Online - Ready to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close chatbot"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "rounded-br-sm text-primary-foreground"
                    : "rounded-bl-sm text-foreground"
                }`}
                style={{
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(135deg, #00f0ff, #00c8d6)"
                      : "rgba(30,30,58,0.8)",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm px-4 py-2" style={{ background: "rgba(30,30,58,0.8)" }}>
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "0ms" }} />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "150ms" }} />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-cyan" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick replies */}
        {messages.length <= 2 && (
          <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="whitespace-nowrap rounded-full border border-neon-cyan/30 px-3 py-1 text-[10px] font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask PocketBot anything..."
              className="flex-1 rounded-full border border-border bg-secondary px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-neon-cyan/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all disabled:opacity-30"
              style={{ background: "linear-gradient(135deg, #00f0ff, #39ff14)" }}
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
