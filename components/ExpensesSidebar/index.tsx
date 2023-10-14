'use client'
import { type ChangeEvent, useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Stack,
  List,
  ListProps,
  ListSubheader,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  IconButtonProps,
  Divider,
} from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PaymentsIcon from '@mui/icons-material/Payments'

import { ModeToggle, MODES } from './ModeToggle'
import { YearSelect } from './YearSelect'
import { MonthSelect } from './MonthSelect'
import { AddSourceDialog } from './AddSourceDialog'

const ListStyled = styled(List)<ListProps>(({ theme }) => ({
  minWidth: '200px',
  border: 'solid',
  borderRadius: '4px',
  borderColor: theme.palette.grey[300],
  ':hover': {
    borderColor: theme.palette.grey[500],
  },
}))

const IconButtonStyled = styled(IconButton)<IconButtonProps>(() => ({
  height: '34px',
}))

const SOURCES = [
  { value: crypto.randomUUID(), label: '**** 1234' },
  { value: crypto.randomUUID(), label: '**** 0987' },
  { value: crypto.randomUUID(), label: 'Cash' },
]

export function ExpensesSidebar() {
  const today = new Date()

  const [mode, setMode] = useState(MODES[0].value)
  const [year, setYear] = useState(today.getFullYear().toString())
  const [month, setMonth] = useState(today.getMonth().toString())
  const [source, setSource] = useState(SOURCES[0].value)
  const [openAddSourceDialog, setOpenAddSourceDialog] = useState(false)

  const handleModeChange = useCallback(
    (_: any, value: string) => setMode(value),
    []
  )

  const handleYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setYear(e.target.value),
    []
  )

  const handleMonthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setMonth(e.target.value),
    []
  )

  return (
    <Stack spacing={2}>
      <ModeToggle value={mode} onChange={handleModeChange} />
      <YearSelect value={year} onChange={handleYearChange} />
      <MonthSelect value={month} onChange={handleMonthChange} />

      <ListStyled
        disablePadding
        subheader={
          <ListSubheader>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              Sources
              <IconButtonStyled
                size="small"
                onClick={() => setOpenAddSourceDialog(true)}
              >
                <AddCardIcon />
              </IconButtonStyled>
            </Stack>
          </ListSubheader>
        }
      >
        <Divider />
        {SOURCES.map((src) => (
          <ListItemButton
            key={src.value}
            selected={src.value === source}
            onClick={() => setSource(src.value)}
          >
            <ListItemIcon>
              {src.label === 'Cash' ? <PaymentsIcon /> : <CreditCardIcon />}
            </ListItemIcon>
            <ListItemText>{src.label}</ListItemText>
          </ListItemButton>
        ))}
      </ListStyled>

      <AddSourceDialog
        open={openAddSourceDialog}
        onClose={() => setOpenAddSourceDialog(false)}
        onApply={(account) => {
          console.log(account)
          setOpenAddSourceDialog(false)
        }}
      />
    </Stack>
  )
}
