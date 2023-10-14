'use client'
import axios from 'axios'
import { useEffect } from 'react'
import { Roboto } from 'next/font/google'
import { BottomNavigation } from '@/components'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { STORAGE_KEY } from '@/app/consts'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic'],
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.monoToken)
    if (!token) return

    const value = localStorage.getItem(STORAGE_KEY.accounts)
    const updatedAt = localStorage.getItem(STORAGE_KEY.updatedAt)
    if (value && updatedAt) {
      const timeSinceUpdate =
        new Date(updatedAt).valueOf() - new Date().valueOf()
      if (timeSinceUpdate < 60 * 1000) return
    }

    const url = 'https://api.monobank.ua/personal/client-info'
    const headers = { 'X-Token': token }
    axios
      .get(url, { headers })
      .then((res: { data: Mono_Client }) => res.data.accounts)
      .then((accounts) =>
        accounts.filter(({ type }) => type !== 'eAid' && type !== 'fop')
      )
      .then((accounts) => {
        const value = JSON.stringify(accounts)
        localStorage.setItem(STORAGE_KEY.accounts, value)
        localStorage.setItem(STORAGE_KEY.updatedAt, new Date().toUTCString())
      })
  }, [])

  return (
    <html lang="en">
      <body className={roboto.className}>
        <CssBaseline />
        <Box sx={{ mt: 2, mx: 2, height: 'calc(100vh - 56px - 16px)' }}>
          {children}
        </Box>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation />
        </Paper>
      </body>
    </html>
  )
}
