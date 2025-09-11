"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setSelectedDate(value)
  }, [value])

  // Close calendar when clicking outside
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

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange?.(date)
    setOpen(false)
  }

  const handleClear = () => {
    setSelectedDate(undefined)
    onChange?.(undefined)
  }

  const handleToday = () => {
    const today = new Date()
    setSelectedDate(today)
    onChange?.(today)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <CalendarIcon className="w-4 h-4 text-[#B592FF]" />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) setOpen(!open);
          }}
          disabled={disabled}
          className={cn(
            "w-full pl-12 pr-4 py-4 h-auto justify-start text-left font-normal",
            "border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:border-[#B592FF] transition-colors text-[14px] bg-white hover:bg-white",
            !selectedDate 
              ? "text-[#BEBEBE] hover:text-[#BEBEBE]" 
              : "text-[#1F1F1F] hover:text-[#1F1F1F]"
          )}
        >
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
        </Button>
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-[#E8E8E8] rounded-[12px] shadow-xl overflow-hidden w-62 sm:w-80">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={(date) => {
              if (disabled) return true
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            initialFocus
            className="p-2 sm:p-4 [&_.rdp-nav]:flex [&_.rdp-nav]:items-center [&_.rdp-nav]:justify-between [&_.rdp-nav_button]:h-8 [&_.rdp-nav_button]:w-8 [&_.rdp-nav_button]:sm:h-10 [&_.rdp-nav_button]:sm:w-10 [&_.rdp-nav_button]:p-0 [&_.rdp-nav_button]:flex [&_.rdp-nav_button]:items-center [&_.rdp-nav_button]:justify-center [&_.rdp-caption]:flex [&_.rdp-caption]:items-center [&_.rdp-caption]:justify-center [&_.rdp-caption_label]:text-sm [&_.rdp-caption_label]:sm:text-base [&_.rdp-caption_label]:font-medium [&_.rdp-caption_label]:text-[#1F1F1F] [&_.rdp-caption_label]:leading-none"
            classNames={{
              root: "w-full",
              months: "flex flex-col",
              month: "space-y-2 sm:space-y-4",
              nav: "flex items-center justify-between px-1 sm:px-2",
              button_previous: "h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-[#F8F7FF] hover:text-[#B592FF] rounded-md transition-colors",
              button_next: "h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-[#F8F7FF] hover:text-[#B592FF] rounded-md transition-colors",
              month_caption: "flex justify-center items-center",
              caption_label: "text-sm sm:text-base font-medium text-[#1F1F1F]",
              table: "w-full border-collapse space-y-1",
              weekdays: "flex",
              weekday: "w-8 h-6 sm:w-10 sm:h-8 flex items-center justify-center text-xs font-medium text-[#666666]",
              week: "flex w-full",
              day: "h-8 w-8 sm:h-10 sm:w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-[#F8F7FF] hover:text-[#B592FF] rounded-md transition-colors text-sm sm:text-base",
              day_selected: "bg-[#B592FF] text-white hover:bg-[#B592FF] hover:text-white font-medium",
              day_today: "bg-[#F8F7FF] text-[#B592FF] font-semibold",
              day_outside: "text-[#CCCCCC] hover:text-[#CCCCCC] hover:bg-transparent",
              day_disabled: "text-[#CCCCCC] hover:text-[#CCCCCC] hover:bg-transparent cursor-not-allowed",
            }}
          />
          <div className="flex justify-between items-center px-2 py-2 sm:px-4 sm:py-3 border-t border-[#E8E8E8] bg-[#FAFAFA]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleClear();
              }}
              className="text-[#B592FF] hover:text-[#B592FF] hover:bg-[#F8F7FF] px-2 py-1 sm:px-3 sm:py-1.5 h-auto text-xs sm:text-sm font-medium"
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleToday();
              }}
              className="text-[#B592FF] hover:text-[#B592FF] hover:bg-[#F8F7FF] px-2 py-1 sm:px-3 sm:py-1.5 h-auto text-xs sm:text-sm font-medium"
            >
              Today
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
