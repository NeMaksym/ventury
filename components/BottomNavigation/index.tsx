'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MuiBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SettingsIcon from '@mui/icons-material/Settings'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import MoneyIcon from '@mui/icons-material/Money'
import SavingsIcon from '@mui/icons-material/Savings'

const actions = [
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '/settings',
  },
  {
    label: 'Expenses',
    icon: <MoneyOffIcon />,
    href: '/expenses',
  },
  {
    label: 'Incomes',
    icon: <MoneyIcon />,
    href: '/incomes',
  },
  {
    label: 'Capitale',
    icon: <SavingsIcon />,
    href: '/capitale',
  },
]

export function BottomNavigation() {
  const [value, setValue] = useState(0)
  const router = useRouter()

  return (
    <MuiBottomNavigation
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        router.push(actions[newValue].href)
        setValue(newValue)
      }}
    >
      {actions.map(({ label, icon }) => (
        <BottomNavigationAction key={label} label={label} icon={icon} />
      ))}
    </MuiBottomNavigation>
  )
}
