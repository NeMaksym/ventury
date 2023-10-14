'use client'
import { type ChangeEvent, useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  TextField,
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

import { YearSelect } from './YearSelect'
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

const MODES = [
  { value: 'edit', label: 'Edit' },
  { value: 'view', label: 'View' },
]

const MONTHS = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
]

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

  const handleYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setYear(e.target.value),
    []
  )

  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        fullWidth
        value={mode}
        exclusive
        onChange={(_, value) => setMode(value)}
      >
        {MODES.map((mode) => (
          <ToggleButton key={mode.value} value={mode.value}>
            {mode.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <YearSelect value={year} onChange={handleYearChange} />

      <TextField
        fullWidth
        id="month"
        select
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {MONTHS.map((mon) => (
          <MenuItem key={mon.value} value={mon.value}>
            {mon.label}
          </MenuItem>
        ))}
      </TextField>

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
