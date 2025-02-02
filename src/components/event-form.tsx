"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Camera } from "lucide-react"
import { processImage } from "@/lib/image-processor"
import { saveEvent } from "@/lib/storage"
import type { Community, EventFormData } from "@/types/event"
import Image from "next/image"

interface EventFormProps {
  onSuccess?: () => void
  communities?: Community[]
}

const defaultCommunities = [
  { id: "1", name: "Community A" },
  { id: "2", name: "Community B" },
  { id: "3", name: "Community C" },
]

export function EventForm({ onSuccess, communities = defaultCommunities }: EventFormProps) {
  const router = useRouter()
  const [media, setMedia] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState<string>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: EventFormData = {
        title: formData.get("title") as string,
        date: formData.get("date") as string,
        location: formData.get("location") as string,
        description: formData.get("description") as string,
        community: selectedCommunity,
      }

      saveEvent({
        id: crypto.randomUUID(),
        ...data,
        media,
      })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Failed to save event:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const processedImage = await processImage(file)
      setMedia(processedImage)
    } catch (error) {
      console.error("Failed to process image:", error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-0">
      <CardContent className="p-6 shadow-none ring-0 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="aspect-[4/5] relative bg-slate-50 rounded-lg overflow-hidden">
              {media ? (
                <>
                  <Image
                    src={media}
                    alt="Event preview"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="absolute bottom-4 right-4"
                    onClick={() => document.getElementById("image-input")?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Replace Photo
                  </Button>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400 mb-4" />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => document.getElementById("image-input")?.click()}
                  >
                    Add Photo
                  </Button>
                </div>
              )}
            </div>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <Select
              value={selectedCommunity}
              onValueChange={setSelectedCommunity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community: Community) => (
                  <SelectItem key={community.id} value={community.id}>
                    {community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="title"
              placeholder="Event Title"
              required
              className="text-lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="datetime-local"
                name="date"
                required
                className="w-full"
              />
              <Input
                name="location"
                placeholder="Choose location"
                required
              />
            </div>

            <Textarea
              name="description"
              placeholder="Add a brief description to let attendees know what your event is all about"
              required
              className="min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-950 hover:bg-violet-700 font-medium rounded-xl"
            disabled={loading}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}