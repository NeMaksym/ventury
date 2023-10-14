import { ToggleButton, ToggleButtonGroup } from '@mui/material'

export const MODES = [
  { value: 'edit', label: 'Edit' },
  { value: 'view', label: 'View' },
]

interface ModeToggleProps {
  value: string
  onChange: (_: any, value: string) => void
}

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <ToggleButtonGroup exclusive fullWidth value={value} onChange={onChange}>
      {MODES.map(({ value, label }) => (
        <ToggleButton key={value} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
