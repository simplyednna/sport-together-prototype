export type Activity = {
  dateISO?: string
  owned?: boolean
  status?: "open" | "cancelled"
  id: number
  sport: string
  title: string
  type: "Game" | "Players Wanted"
  date: string
  time: string
  location: string
  district: string
  level: string
  spots: number
  capacity: number
  organiser: string
  organiserRole: string
  image: string
  description: string
  instant: boolean
  distance: string
  }

export const activities: Activity[] = [
  {
    id: 1,
    sport: "Tennis",
    title: "Friendly Match at Prater",
    type: "Game",
    dateISO: "2026-10-31",
    date: "Sat, 31 Oct 2026",
    time: "10:00–11:30",
    location: "Tennis Point Vienna",
    district: "Leopoldstadt",
    level: "Intermediate",
    spots: 1,
    capacity: 4,
    organiser: "Lena Hoffmann",
    organiserRole: "Community organiser",
    image:
      "https://images.unsplash.com/photo-1715333157294-49b465a34054?auto=format&fit=crop&w=1200&q=86",
    description:
      "A relaxed Saturday doubles match for intermediate players. We have the court booked for ninety minutes and would love one more player to complete the group.",
    instant: true,
    distance: "1.8 km",
    },
  {
    id: 2,
    sport: "Padel",
    title: "Casual Padel Game",
    type: "Game",
    dateISO: "2026-11-01",
    date: "Sun, 1 Nov 2026",
    time: "09:30–11:00",
    location: "Padelzone Erdberg",
    district: "Landstraße",
    level: "All Levels",
    spots: 2,
    capacity: 4,
    organiser: "Sofia Marin",
    organiserRole: "Community organiser",
    image:
      "https://images.unsplash.com/photo-1657704358775-ed705c7388d2?auto=format&fit=crop&w=1200&q=86",
    description:
      "A relaxed player-organised padel game for all levels. Join fellow players for friendly rallies and a casual match; everyone plays together.",
    instant: true,
    distance: "2.4 km",
    },
  {
    id: 3,
    sport: "Volleyball",
    title: "Casual Sunset Volleyball",
    type: "Game",
    dateISO: "2026-11-01",
    date: "Sun, 1 Nov 2026",
    time: "17:30–19:00",
    location: "Donauinsel Courts",
    district: "Donaustadt",
    level: "All Levels",
    spots: 4,
    capacity: 12,
    organiser: "Jonas Weber",
    organiserRole: "Community organiser",
    image:
      "https://images.unsplash.com/photo-1764080614063-ea7c757cddb9?auto=format&fit=crop&w=1200&q=86",
    description:
      "Easygoing outdoor volleyball by the river. Teams rotate throughout the evening, so come alone or bring a friend.",
    instant: true,
    distance: "3.1 km",
    },
  {
    id: 4,
    sport: "Running",
    title: "Easy Sunday Social Run",
    type: "Players Wanted",
    dateISO: "2026-10-25",
    date: "Sun, 25 Oct 2026",
    time: "08:00–09:00",
    location: "Augarten Main Gate",
    district: "Leopoldstadt",
    level: "All Levels",
    spots: 8,
    capacity: 16,
    organiser: "Vienna Easy Miles",
    organiserRole: "Community group",
    image:
      "https://images.unsplash.com/photo-1774793153213-6ed1e7facab5?auto=format&fit=crop&w=1200&q=86",
    description:
      "A conversational 6 km loop through Augarten, followed by coffee nearby. Pace groups make this suitable for everyone.",
    instant: true,
    distance: "1.2 km",
    },
  {
    id: 5,
    sport: "Football",
    title: "Friday Five-a-Side",
    type: "Players Wanted",
    dateISO: "2026-10-30",
    date: "Fri, 30 Oct 2026",
    time: "18:30–20:00",
    location: "Sportcenter Donaucity",
    district: "Donaustadt",
    level: "Intermediate",
    spots: 2,
    capacity: 10,
    organiser: "Emil & Friends",
    organiserRole: "Community organiser",
    image:
      "https://images.unsplash.com/photo-1777489689168-497290f235d5?auto=format&fit=crop&w=1200&q=86",
    description:
      "Friendly weekly five-a-side with a good tempo and no hard tackles. Bibs and balls are already sorted.",
    instant: true,
    distance: "4.6 km",
    },
  {
    id: 6,
    sport: "Basketball",
    title: "After Work Half Court",
    type: "Game",
    dateISO: "2026-10-28",
    date: "Wed, 28 Oct 2026",
    time: "18:00–19:30",
    location: "Hermann-Gmeiner Park",
    district: "Innere Stadt",
    level: "Intermediate",
    spots: 3,
    capacity: 8,
    owned: true,
    organiser: "Alex König",
    organiserRole: "Community organiser",
    image:
      "https://images.unsplash.com/photo-1625733834793-2ed17531baa7?auto=format&fit=crop&w=1200&q=86",
    description:
      "A focused but friendly half-court session. Individual players are welcome and teams change every game.",
    instant: true,
    distance: "2.8 km",
  },
    
]

export const sportNames = [
  "Tennis",
  "Padel",
  "Volleyball",
  "Running",
  "Basketball",
  "Yoga",
  "Football",
  "Climbing",
  "More",
]

export const conversations = [
  {
    id: 1,
    name: "Tennis Group",
    initials: "TG",
    preview: "I can bring an extra set of balls.",
    time: "09:42",
    unread: 2,
  },
  {
    id: 2,
    name: "Padel Group",
    initials: "PG",
    preview: "Great, see you on Sunday morning.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Running Group",
    initials: "RG",
    preview: "Coffee at the usual place after?",
    time: "Mon",
    unread: 0,
  },
]
