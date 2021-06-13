import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import useArchiveHistory from '../hooks/useArchiveHistory'
import ResetHistoryButton from '../components/history/ResetHistoryButton'
import HistoryEntry from '../components/history/HistoryEntry'
import Show from '../components/Show'

const useStyles = makeStyles({
  emptyMessage: {
    color: 'grey',
  },
})

export default function ArchiveHistoryPage() {
  const classes = useStyles()
  const { history } = useArchiveHistory()

  const orderedHistory = [...history].reverse()

  return (
    <Container maxWidth="md">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{ history.length } entries</Typography>
        </Grid>
        <Grid item>
          <ResetHistoryButton/>
        </Grid>
      </Grid>

      <Box marginY={ 4 }>
        { orderedHistory.map((entry) => <HistoryEntry entry={ entry } key={ entry.path }/>) }
        <Show condition={ history.length === 0 }>
          <Box marginTop={ 12 } display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" className={ classes.emptyMessage }>Empty history</Typography>
          </Box>
        </Show>
      </Box>
    </Container>
  )
}
