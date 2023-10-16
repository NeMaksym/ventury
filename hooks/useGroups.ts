import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { STORAGE_KEY } from '@/app/consts'

export function useGroups(): [Group[], Dispatch<SetStateAction<Group[]>>] {
  const [didMount, setDidMount] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY.groups)
    const storageGroups: Group[] = storageValue ? JSON.parse(storageValue) : []
    setGroups(storageGroups)
    setDidMount(true)
  }, [])

  useEffect(() => {
    if (didMount) {
      const storageValue = JSON.stringify(groups)
      localStorage.setItem(STORAGE_KEY.groups, storageValue)
    }
  }, [groups, didMount])

  return [groups, setGroups]
}
