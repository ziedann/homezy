"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  className,
  disabled = false,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedTime, setSelectedTime] = React.useState<string>(value || "")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setSelectedTime(value || "")
  }, [value])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onChange?.(time)
    setOpen(false)
  }

  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Clock className="w-4 h-4 text-[#B592FF]" />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) setOpen(!open);
          }}
          disabled={disabled}
          className={cn(
            "w-full pl-12 pr-4 py-4 h-auto text-left font-normal",
            "border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] bg-white hover:bg-white",
            !selectedTime 
              ? "text-[#BEBEBE] hover:text-[#BEBEBE]" 
              : "text-[#1F1F1F] hover:text-[#1F1F1F]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {selectedTime || placeholder}
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-[#E8E8E8] rounded-[12px] shadow-xl overflow-hidden w-48 sm:w-56">
          <div className="max-h-48 sm:max-h-60 overflow-y-auto">
            <div className="p-1 sm:p-2 space-y-0.5 sm:space-y-1">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeSelect(time);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium hover:bg-[#F8F7FF] hover:text-[#B592FF] transition-colors",
                    selectedTime === time && "bg-[#B592FF] text-white hover:bg-[#B592FF] hover:text-white"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
