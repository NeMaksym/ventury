'use client'
import { useState } from 'react'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SettingsIcon from '@mui/icons-material/Settings'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import MoneyIcon from '@mui/icons-material/Money'
import SavingsIcon from '@mui/icons-material/Savings'

const actions = [
  { label: 'Settings', icon: <SettingsIcon /> },
  { label: 'Expenses', icon: <MoneyOffIcon /> },
  { label: 'Incomes', icon: <MoneyIcon /> },
  { label: 'Capitale', icon: <SavingsIcon /> },
]

export function BottomNavigation() {
  const [value, setValue] = useState(0)

  return (
    <MuiBottomNavigation
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue)
      }}
    >
      {actions.map((action) => (
        <BottomNavigationAction key={action.label} {...action} />
      ))}
    </MuiBottomNavigation>
  )
}
