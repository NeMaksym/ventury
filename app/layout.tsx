
import { Roboto } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline';

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic']
})

interface RootLayoutProps {
  children: React.ReactNode,
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CssBaseline/>
        {children}
      </body>
    </html>
  )
}
