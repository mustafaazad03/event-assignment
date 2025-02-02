export interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
  media?: string
  community?: string
}

export interface EventFormData {
  title: string
  date: string
  location: string
  description: string
  community?: string
}

export interface Community {
  id: string
  name: string
  image?: string
}