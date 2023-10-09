'use client'
import { useState, ChangeEvent, useCallback } from 'react'
import { Stack } from '@mui/material'
import { EditableList } from '@/components'

interface Category {
  id: string
  label: string
}

interface Group {
  id: string
  label: string
  categories: Category[]
}

const mockData: Group[] = [1, 2, 3, 4, 5].map((i) => {
  const categories = [1, 2, 3, 4, 5].map((i) => ({
    id: crypto.randomUUID(),
    label: `Category ${i}`,
  }))

  return {
    id: crypto.randomUUID(),
    label: `Group ${i}`,
    categories: categories,
  }
})

export function CategoryManager() {
  const [groups, setGroups] = useState(mockData)

  const [groupId, setGroupId] = useState(groups[0]?.id || '')
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
