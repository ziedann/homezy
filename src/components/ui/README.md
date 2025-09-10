# Date and Time Picker Components

## DatePicker

Komponen DatePicker yang menggunakan shadcn/ui Calendar dengan styling yang konsisten dengan desain aplikasi.

### Features:
- Menggunakan shadcn/ui Calendar sebagai base
- Styling yang konsisten dengan desain aplikasi (warna #B592FF)
- Support untuk minDate dan maxDate
- Tombol Clear dan Today
- Click outside untuk menutup calendar
- Format tanggal dd/MM/yyyy

### Usage:
```tsx
import { DatePicker } from "@/components/ui/DatePicker";

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select Date"
  minDate={new Date()}
/>
```

### Props:
- `value?: Date` - Tanggal yang dipilih
- `onChange?: (date: Date | undefined) => void` - Callback ketika tanggal berubah
- `placeholder?: string` - Placeholder text
- `className?: string` - Custom CSS class
- `disabled?: boolean` - Apakah input disabled
- `minDate?: Date` - Tanggal minimum yang bisa dipilih
- `maxDate?: Date` - Tanggal maksimum yang bisa dipilih

## TimePicker

Komponen TimePicker dengan dropdown untuk memilih waktu.

### Features:
- Dropdown dengan opsi waktu setiap 30 menit
- Styling yang konsisten dengan desain aplikasi
- Click outside untuk menutup dropdown
- Format waktu HH:mm

### Usage:
```tsx
import { TimePicker } from "@/components/ui/TimePicker";

<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  placeholder="Select Time"
/>
```

### Props:
- `value?: string` - Waktu yang dipilih (format HH:mm)
- `onChange?: (time: string) => void` - Callback ketika waktu berubah
- `placeholder?: string` - Placeholder text
- `className?: string` - Custom CSS class
- `disabled?: boolean` - Apakah input disabled

## Dependencies:
- `react-day-picker` - Untuk Calendar component
- `date-fns` - Untuk formatting tanggal
- `lucide-react` - Untuk icons
