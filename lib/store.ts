export interface Task {
  id: string
  title: string
  description: string
  money: number
  time: string
  urgency: "immediate" | "feasible"
  type: "online" | "offline"
  skills: string[]
  postedBy: string
  postedAt: Date
  status: "open" | "in-progress" | "completed"
  assignedTo?: string
  location?: string
}

export interface UserProfile {
  id: string
  name: string
  username: string
  age: number
  college: string
  bio: string
  avatar: string
  skills: string[]
  rating: number
  tasksCompleted: number
  earnings: number
}

export interface Transaction {
  id: string
  type: "earned" | "spent"
  amount: number
  description: string
  date: Date
  taskId: string
}

export interface ChatMessage {
  id: string
  taskId: string
  senderId: string
  text: string
  timestamp: Date
}

export const currentUser: UserProfile = {
  id: "u1",
  name: "Arjun Kumar",
  username: "arjun_k",
  age: 20,
  college: "JNTU Hyderabad",
  bio: "Full-stack dev & design enthusiast. Always up for creative tasks!",
  avatar: "",
  skills: ["editor", "coder", "artist"],
  rating: 4.8,
  tasksCompleted: 47,
  earnings: 12500,
}

export const sampleUsers: UserProfile[] = [
  currentUser,
  {
    id: "u2",
    name: "Priya Sharma",
    username: "priya_s",
    age: 19,
    college: "JNTU Hyderabad",
    bio: "Creative graphic designer and illustrator",
    avatar: "",
    skills: ["artist", "editor"],
    rating: 4.9,
    tasksCompleted: 32,
    earnings: 8900,
  },
  {
    id: "u3",
    name: "Rahul Verma",
    username: "rahul_v",
    age: 21,
    college: "JNTU Hyderabad",
    bio: "Speed typist & errand runner. Quick and reliable!",
    avatar: "",
    skills: ["writer", "runner"],
    rating: 4.6,
    tasksCompleted: 61,
    earnings: 15200,
  },
  {
    id: "u4",
    name: "Sneha Patel",
    username: "sneha_p",
    age: 20,
    college: "JNTU Hyderabad",
    bio: "PPT queen and video editing pro",
    avatar: "",
    skills: ["editor", "presenter"],
    rating: 4.7,
    tasksCompleted: 28,
    earnings: 7600,
  },
]

export const sampleTasks: Task[] = [
  {
    id: "t1",
    title: "Edit my YouTube vlog (5 min video)",
    description: "Need someone to edit a 5-minute campus vlog. Add transitions, background music, and subtitles. I'll share the raw footage via Google Drive.",
    money: 350,
    time: "2 days",
    urgency: "feasible",
    type: "online",
    skills: ["editor"],
    postedBy: "u2",
    postedAt: new Date(Date.now() - 3600000),
    status: "open",
  },
  {
    id: "t2",
    title: "Bring printout from Xerox Center",
    description: "Need 20 pages printed (B&W, single side) from the Xerox Center near the library. Will share PDF on WhatsApp. Need it in 30 minutes.",
    money: 40,
    time: "30 min",
    urgency: "immediate",
    type: "offline",
    skills: ["runner"],
    postedBy: "u3",
    postedAt: new Date(Date.now() - 1800000),
    status: "open",
    location: "Xerox Center",
  },
  {
    id: "t3",
    title: "Create PPT for Data Structures seminar",
    description: "Need a 15-slide PPT on Graphs & Trees. Should include diagrams, examples, and clean design. Reference material will be provided.",
    money: 200,
    time: "1 day",
    urgency: "feasible",
    type: "online",
    skills: ["presenter", "coder"],
    postedBy: "u4",
    postedAt: new Date(Date.now() - 7200000),
    status: "open",
  },
  {
    id: "t4",
    title: "Get me a sandwich from Main Canteen",
    description: "Veg grilled sandwich and a cold coffee from Main Canteen. I'm in Block B, Room 302. Come before 1 PM.",
    money: 30,
    time: "20 min",
    urgency: "immediate",
    type: "offline",
    skills: ["runner"],
    postedBy: "u2",
    postedAt: new Date(Date.now() - 900000),
    status: "open",
    location: "Main Canteen",
  },
  {
    id: "t5",
    title: "Draw a portrait from my photo",
    description: "Need a pencil sketch portrait from a reference photo. Digital or physical both work. Decent quality expected.",
    money: 500,
    time: "3 days",
    urgency: "feasible",
    type: "online",
    skills: ["artist"],
    postedBy: "u3",
    postedAt: new Date(Date.now() - 14400000),
    status: "open",
  },
  {
    id: "t6",
    title: "Write lab record for Physics practical",
    description: "Need 5 experiments written neatly in lab record format. Observations and diagrams included. Can share the data.",
    money: 150,
    time: "1 day",
    urgency: "feasible",
    type: "offline",
    skills: ["writer"],
    postedBy: "u4",
    postedAt: new Date(Date.now() - 10800000),
    status: "open",
  },
  {
    id: "t7",
    title: "Debug my React project",
    description: "My e-commerce project has 3 bugs - cart not updating, search not filtering, and checkout form validation failing. Need help ASAP.",
    money: 300,
    time: "2 hours",
    urgency: "immediate",
    type: "online",
    skills: ["coder"],
    postedBy: "u2",
    postedAt: new Date(Date.now() - 2700000),
    status: "open",
  },
  {
    id: "t8",
    title: "Bring a pen & notebook from Stationary",
    description: "Need a black gel pen (any brand) and a 200-page ruled notebook. Stationary shop near main gate.",
    money: 25,
    time: "15 min",
    urgency: "immediate",
    type: "offline",
    skills: ["runner"],
    postedBy: "u3",
    postedAt: new Date(Date.now() - 600000),
    status: "open",
    location: "Stationary Shop",
  },
]

export const completedTasks: Task[] = [
  {
    id: "ct1",
    title: "Design club poster",
    description: "Created a poster for the coding club event",
    money: 200,
    time: "1 day",
    urgency: "feasible",
    type: "online",
    skills: ["artist"],
    postedBy: "u4",
    postedAt: new Date(Date.now() - 86400000 * 3),
    status: "completed",
    assignedTo: "u1",
  },
  {
    id: "ct2",
    title: "Delivered books from library",
    description: "Picked up 3 reference books from central library",
    money: 50,
    time: "30 min",
    urgency: "immediate",
    type: "offline",
    skills: ["runner"],
    postedBy: "u2",
    postedAt: new Date(Date.now() - 86400000 * 5),
    status: "completed",
    assignedTo: "u1",
  },
]

export const sampleTransactions: Transaction[] = [
  { id: "tr1", type: "earned", amount: 200, description: "Design club poster", date: new Date(Date.now() - 86400000 * 3), taskId: "ct1" },
  { id: "tr2", type: "earned", amount: 50, description: "Delivered books from library", date: new Date(Date.now() - 86400000 * 5), taskId: "ct2" },
  { id: "tr3", type: "spent", amount: 150, description: "Lab record writing", date: new Date(Date.now() - 86400000 * 7), taskId: "t6" },
  { id: "tr4", type: "earned", amount: 350, description: "Video editing project", date: new Date(Date.now() - 86400000 * 10), taskId: "t1" },
  { id: "tr5", type: "spent", amount: 40, description: "Printout delivery", date: new Date(Date.now() - 86400000 * 12), taskId: "t2" },
  { id: "tr6", type: "earned", amount: 500, description: "Portrait drawing", date: new Date(Date.now() - 86400000 * 14), taskId: "t5" },
  { id: "tr7", type: "earned", amount: 300, description: "React debugging", date: new Date(Date.now() - 86400000 * 16), taskId: "t7" },
  { id: "tr8", type: "spent", amount: 30, description: "Sandwich delivery", date: new Date(Date.now() - 86400000 * 18), taskId: "t4" },
]

export const sampleChats: ChatMessage[] = [
  { id: "c1", taskId: "ct1", senderId: "u4", text: "Hey, can you include the club logo too?", timestamp: new Date(Date.now() - 86400000 * 3 + 3600000) },
  { id: "c2", taskId: "ct1", senderId: "u1", text: "Sure! Send me the logo file", timestamp: new Date(Date.now() - 86400000 * 3 + 7200000) },
  { id: "c3", taskId: "ct1", senderId: "u4", text: "Sent on WhatsApp. Thanks!", timestamp: new Date(Date.now() - 86400000 * 3 + 10800000) },
]

export const skillPortfolio: Record<string, { title: string; description: string; date: Date }[]> = {
  editor: [
    { title: "Campus Tour Vlog Edit", description: "Full video edit with transitions, color grading, and music", date: new Date(Date.now() - 86400000 * 7) },
    { title: "Club Promo Video", description: "30-second promotional video for coding club", date: new Date(Date.now() - 86400000 * 14) },
  ],
  coder: [
    { title: "E-commerce Dashboard", description: "React + Tailwind dashboard with charts and analytics", date: new Date(Date.now() - 86400000 * 10) },
    { title: "Weather App", description: "Built a weather app using OpenWeather API", date: new Date(Date.now() - 86400000 * 20) },
  ],
  artist: [
    { title: "College Fest Poster", description: "Digital poster design for annual fest", date: new Date(Date.now() - 86400000 * 5) },
    { title: "Portrait Collection", description: "Series of pencil sketch portraits", date: new Date(Date.now() - 86400000 * 15) },
  ],
}
