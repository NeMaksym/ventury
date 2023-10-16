'use client'
import { useState, ChangeEvent, useCallback } from 'react'
import { Stack } from '@mui/material'
import { EditableList } from '@/components'
import { useGroups } from '@/hooks'

export function CategoryManager() {
  const [groups, setGroups] = useGroups()
  const [groupId, setGroupId] = useState('')
  const [categoryId, setCategoryId] = useState('')

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
    [groups, setGroups]
  )

  const handleGroupDelete = useCallback(() => {
    const updatedGroups = groups.filter((group) => group.id !== groupId)
    setGroups(updatedGroups)
    setGroupId(updatedGroups[0]?.id || '')
  }, [groups, groupId, setGroups])

  const handleGroupEdit = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const updatedGroups = groups.map((group) =>
        group.id === groupId ? { ...group, label: e.target.value } : group
      )
      setGroups(updatedGroups)
    },
    [groups, groupId, setGroups]
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
    [groups, groupId, setGroups]
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
  }, [groups, groupId, categoryId, setGroups])

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
    [groups, groupId, categoryId, setGroups]
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
