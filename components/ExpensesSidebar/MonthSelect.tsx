import { ChangeEvent } from 'react'
import { TextField, MenuItem } from '@mui/material'

const MONTHS = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
]

interface MonthSelectProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function MonthSelect({ value, onChange }: MonthSelectProps) {
  return (
    <TextField
      select
      fullWidth
      id="month"
      name="month"
      label="Month"
      value={value}
      onChange={onChange}
    >
      {MONTHS.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}
