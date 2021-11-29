import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { shell } from 'electron'
import { OUTPUT_DIR } from '@d4data/archive-lib/dist/src/classes/Archive/Archive'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import useArchiveHistory from '../hooks/useArchiveHistory'
import ResetHistoryButton from '../components/history/ResetHistoryButton'
import HistoryEntry from '../components/history/HistoryEntry'
import Show from '../components/Show'
import useArchiveProcessProgress, { ArchiveProcessStep } from '../hooks/useArchiveProcessProgress'
import getAvailableGetters from '../modules/getAvailableGetters'
import { ArchiveHistoryEntry } from '../modules/ArchiveHistoryManager'
import ArchiveProcessProgressDialog from '../components/ArchiveProcessProgressDialog'

export default function ArchiveHistoryPage() {
  const { t } = useTranslation(['common', 'history'])
  const router = useRouter()
  const { history, restoreArchiveFromEntry } = useArchiveHistory()
  const { state: progress, setState: setProgress } = useArchiveProcessProgress()

  const orderedHistory = useMemo(() => [...history].reverse(), [history])

  const restoreArchiveHandler = useCallback(async (entry: ArchiveHistoryEntry) => {
    setProgress({ step: ArchiveProcessStep.POST_PROCESS, postProcessInfo: { step: 'Getting standardizer...' } })
    const standardizer = await restoreArchiveFromEntry(entry)
    setProgress({ step: ArchiveProcessStep.POST_PROCESS, postProcessInfo: { step: 'Checking data...' } })
    await getAvailableGetters(standardizer)

    return router.push('/dashboard')
  }, [])

  return (
    <Container maxWidth="md" sx={ { py: 3 } }>
      <ArchiveProcessProgressDialog state={ progress }/>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">
            { t('common:entry', { count: history.length }) }
          </Typography>
        </Grid>

        <Grid item>
          <Stack direction="row" spacing={ 2 }>
            <Button variant="outlined" onClick={ () => shell.showItemInFolder(`${ OUTPUT_DIR }/archives`) }>
              { t('history:openFolder') }
            </Button>

            <ResetHistoryButton/>
          </Stack>
        </Grid>
      </Grid>

      <Box marginY={ 4 }>
        <Stack spacing={ 1 }>
          { orderedHistory.map((entry) => (
            <HistoryEntry
              entry={ entry }
              key={ entry.path }
              onRestore={ () => restoreArchiveHandler(entry) }
            />
          )) }
        </Stack>

        <Show condition={ history.length === 0 }>
          <Box marginTop={ 12 } display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" color="grey">{ t('history:empty') }</Typography>
          </Box>
        </Show>
      </Box>
    </Container>
  )
}
