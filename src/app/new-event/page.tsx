import { EventForm } from "@/components/event-form"

export default function NewEventPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <EventForm />
    </div>
  )
}

