"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, PlusIcon, Settings, ChevronDown } from "lucide-react"
import { getEvents } from "@/lib/storage"
import type { Event } from "@/types/event"
import Image from "next/image"
import { Modal } from "@/components/modal"
import { EventForm } from "@/components/event-form"

const tabs = [
  { name: 'Events', href: '#', current: true },
  { name: 'Communities', href: '#', current: false },
]

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("events")

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Delhi NCR</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value.toLowerCase())}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500"
        />
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name.toLowerCase())}
                className={classNames(
                  tab.name.toLowerCase() === activeTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                )}
                aria-current={tab.name.toLowerCase() === activeTab ? 'page' : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {events.map((event) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={event.media || "/placeholder.webp"}
                      alt={event.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {event.community && (
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm">
                        By {event.community}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'communities' && (
        <div className="mt-6">
          <p className="text-gray-500">Communities content goes here</p>
        </div>
      )}

      <Button
        className="fixed bottom-6 right-6 shadow-lg bg-indigo-500 hover:bg-indigo-600 text-white rounded-full h-14 px-6"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        New Event
      </Button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EventForm onSuccess={() => {
          setIsModalOpen(false)
          setEvents(getEvents())
        }} />
      </Modal>
    </div>
  )
}

export default EventList;