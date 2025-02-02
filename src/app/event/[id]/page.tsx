"use client"
import React, { use, useState, useEffect } from "react"
import { getEventById } from "@/lib/storage"
import { Event } from "@/types/event"
import Image from "next/image"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EventDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const e = getEventById(id)
    if (!e) {
      notFound()
    } else {
      setEvent(e)
    }
  }, [id])

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      {event.media && (
        <Image
          src={event.media}
          alt={event.title}
          width={400}
          height={300}
          className="object-cover mb-4"
        />
      )}
      <p className="mb-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {event.description}
      </p>
    </div>
  )
}