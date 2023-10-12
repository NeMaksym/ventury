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
    pathname: '/settings',
  },
  {
    label: 'Expenses',
    icon: <MoneyOffIcon />,
    pathname: '/expenses',
  },
  {
    label: 'Incomes',
    icon: <MoneyIcon />,
    pathname: '/incomes',
  },
  {
    label: 'Capitale',
    icon: <SavingsIcon />,
    pathname: '/capitale',
  },
]

export function BottomNavigation() {
  const firstSubpath = new URL(document.URL).pathname.split('/')[1]
  const [value, setValue] = useState(`/${firstSubpath}`)
  const router = useRouter()

  return (
    <MuiBottomNavigation
      showLabels
      value={value}
      onChange={(_event, pathname) => {
        router.push(pathname)
        setValue(pathname)
      }}
    >
      {actions.map(({ label, icon, pathname }) => (
        <BottomNavigationAction
          key={label}
          label={label}
          icon={icon}
          value={pathname}
        />
      ))}
    </MuiBottomNavigation>
  )
}
