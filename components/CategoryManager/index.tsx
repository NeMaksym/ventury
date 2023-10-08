'use client'
import { useState } from 'react'
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

  const handleGroupAdd = (inputValue: string, setInputValue: any) => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      label: inputValue,
      categories: [],
    }
    setGroups([...groups, newGroup])
    setInputValue('')
  }

  const handleGroupDelete = () => {
    const updatedGroups = groups.filter((group) => group.id !== groupId)
    setGroups(updatedGroups)
  }

  const handleGroupEdit = (inputValue: string) => {
    const updatedGroups = groups.map((group) =>
      group.id === groupId ? { ...group, label: inputValue } : group
    )
    setGroups(updatedGroups)
  }

  const handleGroupSelect = (id: string) => setGroupId(id)

  const handleCategoryAdd = (inputValue: string, setInputValue: any) => {
    const newCategory = { id: crypto.randomUUID(), label: inputValue }
    const updatedGroups = groups.map((group) => {
      return group.id === groupId
        ? { ...group, categories: [...group.categories, newCategory] }
        : group
    })
    setGroups(updatedGroups)
    setInputValue('')
  }

  const handleCategoryDelete = () => {
    const updatedGroups = groups.map((group) => {
      return group.id === groupId
        ? {
            ...group,
            categories: group.categories.filter((cat) => cat.id !== categoryId),
          }
        : group
    })
    setGroups(updatedGroups)
  }

  const handleCategoryEdit = (inputValue: string) => {
    const updatedGroups = groups.map((group) => {
      return group.id === groupId
        ? {
            ...group,
            categories: group.categories.map((cat) =>
              cat.id === categoryId ? { ...cat, label: inputValue } : cat
            ),
          }
        : group
    })
    setGroups(updatedGroups)
  }

  const handleCategorySelect = (id: string) => setCategoryId(id)

  return (
    <Stack direction="row" spacing={2}>
      <EditableList
        label="Groups"
        items={groups}
        selectedId={groupId}
        onItemSelect={handleGroupSelect}
        onItemAdd={handleGroupAdd}
        onItemDelete={handleGroupDelete}
        onItemEdit={handleGroupEdit}
      />
      <EditableList
        label="Categories"
        items={groups.find((group) => group.id === groupId)?.categories || []}
        selectedId={categoryId}
        onItemSelect={handleCategorySelect}
        onItemAdd={handleCategoryAdd}
        onItemDelete={handleCategoryDelete}
        onItemEdit={handleCategoryEdit}
      />
    </Stack>
  )
}
