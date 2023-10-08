'use client'
import { useState } from 'react'
import { EditableList } from '@/components'

let initialItems = [
  { id: crypto.randomUUID(), label: 'test' },
  { id: crypto.randomUUID(), label: 'test2' },
  { id: crypto.randomUUID(), label: 'test3' },
  { id: crypto.randomUUID(), label: 'test4' },
  { id: crypto.randomUUID(), label: 'test5' },
]

export function CategoryManager() {
  const [items, setItems] = useState(initialItems)

  return (
    <EditableList
      label="Groups"
      items={items}
      onItemAdd={(inputValue, setInputValue) => {
        setItems([...items, { id: crypto.randomUUID(), label: inputValue }])
        setInputValue('')
      }}
      onItemDelete={(id) => {
        const updatedItems = items.filter((item) => item.id !== id)
        setItems(updatedItems)
      }}
      onItemEdit={(id, inputValue) => {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, label: inputValue } : item
        )
        setItems(updatedItems)
      }}
      onItemSelect={(id) => {
        const selectedItem = items.find((item) => item.id === id)
        console.log(selectedItem)
      }}
    />
  )
}
