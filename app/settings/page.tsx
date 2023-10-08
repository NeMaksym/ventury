import { Unstable_Grid2 as Grid, Paper } from '@mui/material'
import { MonoTokenInput, CategoryManager } from '@/components'

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <MonoTokenInput />
        </Grid>
        <Grid xs={12}>
          <CategoryManager />
        </Grid>
      </Grid>
    </Paper>
  )
}
