'use client'
import { useState } from 'react'
import { FormControl, InputLabel, OutlinedInput, Button } from '@mui/material'

const STORAGE_KEY = 'monoToken'

export function MonoTokenInput() {
  const initialValue = localStorage.getItem(STORAGE_KEY)
  const [monoToken, setMonoToken] = useState(initialValue ?? '')

  const saveToStarage = () => localStorage.setItem(STORAGE_KEY, monoToken)

  return (
    <FormControl sx={{ width: '500px' }}>
      <InputLabel htmlFor="monoToken">Mono Token</InputLabel>
      <OutlinedInput
        type="text"
        id="monoToken"
        label="Mono Token"
        value={monoToken}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMonoToken(event.target.value)
        }}
        endAdornment={<Button onClick={saveToStarage}>Submit</Button>}
      />
    </FormControl>
  )
}
