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
  disabled?: boolean
}

export function InputWithButton({
  fullWidth,
  btnText,
  onClick,
  initialValue,
  label,
  sx,
  size,
  disabled,
}: InputWithButtonProps) {
  // TODO: Use external state
  const [value, setValue] = useState(initialValue ?? '')

  const captureValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleMainAction = () => onClick(value, setValue)

  return (
    <FormControl
      sx={sx}
      fullWidth={fullWidth}
      variant="outlined"
      disabled={disabled}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <OutlinedInput
        size={size}
        type="text"
        value={value}
        onChange={captureValue}
        label={label}
        endAdornment={
          <Button onClick={handleMainAction} disabled={disabled}>
            {btnText}
          </Button>
        }
      />
    </FormControl>
  )
}
