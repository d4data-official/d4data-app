import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { shell } from 'electron'
import { OUTPUT_DIR } from '@d4data/archive-lib/dist/src/classes/Archive/Archive'
import Trans from 'components/Translate'
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
    <Container maxWidth="md" sx={ { py: 3 } }>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">
            <Trans
              page="common"
              section={ history.length > 1 ? 'entries' : 'entry' }
              template={ `${ history.length } {{template}}` }
            />
          </Typography>
        </Grid>

        <Grid item>
          <Stack direction="row" spacing={ 2 }>
            <Button variant="outlined" onClick={ () => shell.showItemInFolder(`${ OUTPUT_DIR }/archives`) }>
              <Trans page="history" section="openFolder" />
            </Button>

            <ResetHistoryButton/>
          </Stack>
        </Grid>
      </Grid>

      <Box marginY={ 4 }>
        <Stack spacing={ 1 }>
          { orderedHistory.map((entry) => <HistoryEntry entry={ entry } key={ entry.path }/>) }
        </Stack>

        <Show condition={ history.length === 0 }>
          <Box marginTop={ 12 } display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" className={ classes.emptyMessage }>
              <Trans page="history" section="empty" />
            </Typography>
          </Box>
        </Show>
      </Box>
    </Container>
  )
}
