import React from "react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-4 relative z-10">
        <button className="absolute top-3 right-3" onClick={onClose}>X</button>
        <div className="text-lg font-semibold text-center mt-1">Create New Event</div>
        {children}
      </div>
    </div>
  )
}