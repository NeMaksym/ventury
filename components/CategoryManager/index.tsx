'use client'
import { useState, ChangeEvent, useCallback, useEffect, useMemo } from 'react'
import { Stack } from '@mui/material'
import { EditableList } from '@/components'
import { STORAGE_KEY } from '@/app/consts'

export function CategoryManager() {
  const initialValue: Group[] = useMemo(() => {
    const storageValue = localStorage.getItem(STORAGE_KEY.groups)
    return JSON.parse(storageValue ?? '[]')
  }, [])
  const [groups, setGroups] = useState(initialValue)

  const [groupId, setGroupId] = useState(groups[0]?.id || '')
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    const storageValue = JSON.stringify(groups)
    localStorage.setItem(STORAGE_KEY.groups, storageValue)
  }, [groups])

  const handleGroupAdd = useCallback(
    (inputValue: string, setInputValue: any) => {
      const newGroup: Group = {
        id: crypto.randomUUID(),
        label: inputValue,
        categories: [],
      }
      setGroups([...groups, newGroup])
      setInputValue('')
      setGroupId(newGroup.id)
    },
    [groups]
  )

  const handleGroupDelete = useCallback(() => {
    const updatedGroups = groups.filter((group) => group.id !== groupId)
    setGroups(updatedGroups)
    setGroupId(updatedGroups[0]?.id || '')
  }, [groups, groupId])

  const handleGroupEdit = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const updatedGroups = groups.map((group) =>
        group.id === groupId ? { ...group, label: e.target.value } : group
      )
      setGroups(updatedGroups)
    },
    [groups, groupId]
  )

  const handleGroupSelect = useCallback((id: string) => setGroupId(id), [])

  const handleCategoryAdd = useCallback(
    (inputValue: string, setInputValue: any) => {
      const newCategory = { id: crypto.randomUUID(), label: inputValue }
      const updatedGroups = groups.map((group) => {
        return group.id === groupId
          ? { ...group, categories: [...group.categories, newCategory] }
          : group
      })
      setGroups(updatedGroups)
      setInputValue('')
    },
    [groups, groupId]
  )

  const handleCategoryDelete = useCallback(() => {
    const updatedGroups = groups.map((group) => {
      return group.id === groupId
        ? {
            ...group,
            categories: group.categories.filter((cat) => cat.id !== categoryId),
          }
        : group
    })
    setGroups(updatedGroups)
  }, [groups, groupId, categoryId])

  const handleCategoryEdit = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const updatedGroups = groups.map((group) => {
        return group.id === groupId
          ? {
              ...group,
              categories: group.categories.map((cat) =>
                cat.id === categoryId ? { ...cat, label: e.target.value } : cat
              ),
            }
          : group
      })
      setGroups(updatedGroups)
    },
    [groups, groupId, categoryId]
  )

  const handleCategorySelect = useCallback(
    (id: string) => setCategoryId(id),
    []
  )

  return (
    <Stack direction="row" spacing={2}>
      <EditableList
        label="Groups"
        items={groups}
        selectedId={groupId}
        onItemSelect={handleGroupSelect}
        onItemAdd={handleGroupAdd}
        onItemDelete={handleGroupDelete}
        onItemChange={handleGroupEdit}
      />
      <EditableList
        label="Categories"
        items={groups.find((group) => group.id === groupId)?.categories || []}
        selectedId={categoryId}
        onItemSelect={handleCategorySelect}
        onItemAdd={handleCategoryAdd}
        onItemDelete={handleCategoryDelete}
        onItemChange={handleCategoryEdit}
        addDisabled={!groupId}
      />
    </Stack>
  )
}
