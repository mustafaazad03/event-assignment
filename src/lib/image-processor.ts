export async function processImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      if (!e.target?.result) return reject("Failed to read file")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject("Failed to get canvas context")

        // Calculate dimensions for 4:5 aspect ratio
        const aspectRatio = 4 / 5
        let width = img.width
        let height = width * aspectRatio

        if (img.height < height) {
          height = img.height
          width = height / aspectRatio
        }

        // Set canvas dimensions
        canvas.width = width
        canvas.height = height

        // Draw image centered
        const x = (width - img.width) / 2
        const y = (height - img.height) / 2
        ctx.drawImage(img, x, y)

        // Convert to base64
        const base64 = canvas.toDataURL("image/jpeg", 0.8)
        resolve(base64)
      }
      img.onerror = () => reject("Failed to load image")
      img.src = e.target.result as string
    }
    reader.onerror = () => reject("Failed to read file")
    reader.readAsDataURL(file)
  })
}

