'use client'
import { type ChangeEvent, useCallback, useState } from 'react'
import { Stack } from '@mui/material'

import { ModeToggle, MODES } from './ModeToggle'
import { YearSelect } from './YearSelect'
import { MonthSelect } from './MonthSelect'
import { AddSourceDialog } from './AddSourceDialog'
import { SourceList, SOURCES_MOCK } from './SourceList'

export function ExpensesSidebar() {
  const today = new Date()

  const [mode, setMode] = useState(MODES[0].value)
  const [year, setYear] = useState(today.getFullYear().toString())
  const [month, setMonth] = useState(today.getMonth().toString())
  const [source, setSource] = useState(SOURCES_MOCK[0].value)
  const [openDialog, setOpenDialog] = useState(false)

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

  const handleSourceChange = useCallback(
    (value: string) => setSource(value),
    []
  )

  const handleDialogOpen = useCallback(() => setOpenDialog(true), [])

  const handleDialogClose = useCallback(() => setOpenDialog(false), [])

  const handleSourceSubmit = useCallback(
    (account: Mono_Account | Pb_Account) => {
      console.log(account)
      handleDialogClose()
    },
    [handleDialogClose]
  )

  return (
    <Stack spacing={2}>
      <ModeToggle value={mode} onChange={handleModeChange} />
      <YearSelect value={year} onChange={handleYearChange} />
      <MonthSelect value={month} onChange={handleMonthChange} />
      <SourceList
        value={source}
        onChange={handleSourceChange}
        onAddSource={handleDialogOpen}
      />
      <AddSourceDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSourceSubmit}
      />
    </Stack>
  )
}
