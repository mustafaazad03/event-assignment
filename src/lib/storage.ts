import type { Event } from "@/types/event"

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Annual Gala",
    date: "2023-12-01T19:00",
    location: "Grand Ballroom",
    description: "An elegant evening filled with exquisite dining and entertainment.",
    media: "/placeholder.webp",
  },
  {
    id: "2",
    title: "Music Concert",
    date: "2023-11-15T20:00",
    location: "City Arena",
    description: "A live music concert featuring top bands.",
    media: "/placeholder.webp",
  },
  {
    id: "3",
    title: "Tech Conference",
    date: "2023-10-25T09:00",
    location: "Convention Center",
    description: "A gathering of tech enthusiasts and professionals.",
    media: "/placeholder.webp",
  },
  {
    id: "4",
    title: "Art Exhibition",
    date: "2023-11-05T11:00",
    location: "Art Gallery",
    description: "Showcasing contemporary art pieces.",
    media: "/placeholder.webp",
  },
  {
    id: "5",
    title: "Culinary Festival",
    date: "2023-10-20T12:00",
    location: "Downtown Park",
    description: "Taste the best dishes from local chefs.",
    media: "/placeholder.webp",
  },
  {
    id: "6",
    title: "Marathon",
    date: "2023-12-10T06:00",
    location: "City Streets",
    description: "Join the annual marathon run for charity.",
    media: "/placeholder.webp",
  },
  {
    id: "7",
    title: "Book Fair",
    date: "2023-11-22T10:00",
    location: "Exhibition Hall",
    description: "Explore thousands of books and meet authors.",
    media: "/placeholder.webp",
  },
  {
    id: "8",
    title: "Film Screening",
    date: "2023-10-30T18:30",
    location: "Independent Cinema",
    description: "Screening of critically-acclaimed indie films.",
    media: "/placeholder.webp",
  },
  {
    id: "9",
    title: "Networking Meetup",
    date: "2023-11-12T17:00",
    location: "Co-working Space",
    description: "Connect with professionals and expand your network.",
    media: "/placeholder.webp",
  },
  {
    id: "10",
    title: "Charity Run",
    date: "2023-12-15T07:00",
    location: "Riverfront",
    description: "Participate in a fun run to support a good cause.",
    media: "/placeholder.webp",
  },
]

const STORAGE_KEY = "events"

export function getEvents(): Event[] {
  if (typeof window === "undefined") return defaultEvents

  const stored = localStorage.getItem(STORAGE_KEY)
  const customEvents: Event[] = stored ? JSON.parse(stored) : []

  const eventsMap = new Map<string, Event>()

  defaultEvents.forEach(event => eventsMap.set(event.id, event))
  customEvents.forEach(event => eventsMap.set(event.id, event))

  return Array.from(eventsMap.values())
}

export function saveEvent(event: Event): void {
  if (typeof window === "undefined") return

  const stored = localStorage.getItem(STORAGE_KEY)
  const customEvents: Event[] = stored ? JSON.parse(stored) : []

  customEvents.push(event)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customEvents))
}

export function getEventById(id: string): Event | undefined {
  console.log(getEvents())
  return getEvents().find((event) => event.id === id)
}