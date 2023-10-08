'use client'
import { useState, Dispatch, SetStateAction } from 'react'
import {
  FormControl,
  OutlinedInput,
  Button,
  InputLabel,
  SxProps,
  Theme,
} from '@mui/material'

export type InputWithPropsSetValue = Dispatch<SetStateAction<string>>

interface InputWithButtonProps {
  btnText: string
  onClick: (value: string, setValue: InputWithPropsSetValue) => void
  initialValue?: string
  label?: string
  fullWidth?: boolean
  sx?: SxProps<Theme>
  size?: 'small' | 'medium'
}

export function InputWithButton({
  fullWidth,
  btnText,
  onClick,
  initialValue,
  label,
  sx,
  size,
}: InputWithButtonProps) {
  const INPUT_ID = crypto.randomUUID()
  const [value, setValue] = useState(initialValue ?? '')

  const captureValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleMainAction = () => onClick(value, setValue)

  return (
    <FormControl sx={sx} fullWidth={fullWidth} variant="outlined">
      {label && <InputLabel htmlFor={INPUT_ID}>{label}</InputLabel>}
      <OutlinedInput
        size={size}
        id={INPUT_ID}
        type="text"
        value={value}
        onChange={captureValue}
        label={label}
        endAdornment={<Button onClick={handleMainAction}>{btnText}</Button>}
      />
    </FormControl>
  )
}
