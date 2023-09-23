import { Roboto } from 'next/font/google'
import { BottomNavigation } from '@/components'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic'],
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
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
