import { Unstable_Grid2 as Grid, Paper } from '@mui/material'

export default function Expenses() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid> Content </Grid>
      </Grid>
    </Paper>
  )
}
