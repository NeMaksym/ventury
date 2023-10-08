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
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const categories =
    groups.find((group) => group.id === selectedGroupId)?.categories || []

  const handleGroupAdd = (inputValue: string, setInputValue: any) => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      label: inputValue,
      categories: [],
    }
    setGroups([...groups, newGroup])
    setInputValue('')
  }

  const handleGroupDelete = (id: string) => {
    const updatedGroups = groups.filter((group) => group.id !== id)
    setGroups(updatedGroups)
  }

  const handleGroupEdit = (id: string, inputValue: string) => {
    const updatedGroups = groups.map((group) =>
      group.id === id ? { ...group, label: inputValue } : group
    )
    setGroups(updatedGroups)
  }

  const handleGroupSelect = (id: string) => {
    setSelectedGroupId(id)
  }

  const handleCategoryAdd = (inputValue: string, setInputValue: any) => {
    const newCategory = { id: crypto.randomUUID(), label: inputValue }
    const updatedGroups = groups.map((group) => {
      return group.id === selectedGroupId
        ? { ...group, categories: [...group.categories, newCategory] }
        : group
    })
    setGroups(updatedGroups)
    setInputValue('')
  }

  const handleCategoryDelete = (id: string) => {
    const updatedGroups = groups.map((group) => {
      return group.id === selectedGroupId
        ? {
            ...group,
            categories: group.categories.filter((cat) => cat.id !== id),
          }
        : group
    })
    setGroups(updatedGroups)
  }

  const handleCategoryEdit = (id: string, inputValue: string) => {
    const updatedGroups = groups.map((group) => {
      return group.id === selectedGroupId
        ? {
            ...group,
            categories: group.categories.map((cat) =>
              cat.id === id ? { ...cat, label: inputValue } : cat
            ),
          }
        : group
    })
    setGroups(updatedGroups)
  }

  return (
    <Stack direction="row" spacing={2}>
      <EditableList
        label="Groups"
        items={groups}
        onItemAdd={handleGroupAdd}
        onItemDelete={handleGroupDelete}
        onItemEdit={handleGroupEdit}
        onItemSelect={handleGroupSelect}
      />
      <EditableList
        label="Categories"
        items={categories}
        onItemAdd={handleCategoryAdd}
        onItemDelete={handleCategoryDelete}
        onItemEdit={handleCategoryEdit}
        onItemSelect={() => {}}
      />
    </Stack>
  )
}
