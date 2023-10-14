import { ChangeEvent } from 'react'
import { TextField, MenuItem } from '@mui/material'

const YEARS = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
]

interface YearSelectProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function YearSelect({ value, onChange }: YearSelectProps) {
  return (
    <TextField
      select
      fullWidth
      id="year"
      name="year"
      label="Year"
      value={value}
      onChange={onChange}
    >
      {YEARS.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  )
}
