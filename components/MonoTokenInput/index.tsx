'use client'
import { InputWithButton } from '@/components'

const STORAGE_KEY = 'monoToken'

export function MonoTokenInput() {
  const initialValue = localStorage.getItem(STORAGE_KEY)

  const saveToStorage = (value: string) =>
    localStorage.setItem(STORAGE_KEY, value)

  return (
    <InputWithButton
      sx={{ width: '500px' }}
      label="Mono Token"
      initialValue={initialValue ?? ''}
      onClick={saveToStorage}
      btnText="Submit"
    />
  )
}
