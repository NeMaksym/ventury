'use client'
import { useEffect, useState } from 'react'
import { InputWithButton } from '@/components'
import { STORAGE_KEY } from '@/app/consts'

export function MonoTokenInput() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY.monoToken)
    setToken(storageValue ?? '')
  }, [])

  const saveToStorage = (value: string) =>
    localStorage.setItem(STORAGE_KEY.monoToken, value)

  return (
    <InputWithButton
      sx={{ width: '500px' }}
      label="Mono Token"
      initialValue={token}
      onClick={saveToStorage}
      btnText="Submit"
    />
  )
}
