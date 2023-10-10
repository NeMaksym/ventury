import { Paper, Unstable_Grid2 as Grid } from '@mui/material'
import { ExpensesSidebar } from '@/components'

interface ExpensesLayoutProps {
  children: React.ReactNode
}

export default function ExpensesLayout({ children }: ExpensesLayoutProps) {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Paper elevation={3} sx={{ p: 4 }}>
          <ExpensesSidebar />
        </Paper>
      </Grid>

      <Grid xs>{children}</Grid>
    </Grid>
  )
}
