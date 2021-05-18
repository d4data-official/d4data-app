import React from 'react'
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import Dropzone from 'pages-components/home/components/Dropzone'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import { useSnackbar } from 'notistack'
import CloseIcon from '@material-ui/icons/Close'
import { useRouter } from 'next/router'
import Path from 'path'
import useArchiveHistory from '@hooks/useArchiveHistory'
import ArchiveExtractProgress, { ProgressState } from '../components/pages/home/components/ArchiveExtractProgress'
import LastHistoryEntry from '../components/history/LastHistoryEntry'
import useArchiveManager from '../hooks/useArchiveManager'

export default function HomePage() {
  const router = useRouter()
  const [progressBar, setProgress] = React.useState<ProgressState>({ show: false })
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const {
    lastHistoryEntry,
    history,
    addHistoryEntry,
  } = useArchiveHistory()
  const { setCurrentArchive, setCurrentStandardizer } = useArchiveManager()

  const handleExtract = React.useCallback(async (path: string) => {
    setProgress({ show: true })

    const archiveFactory = await ArchiveFactoryIPC.init(path)

    console.info('[Archive] Identifying service')

    const service = await archiveFactory.identify()
    if (service === Services.UNKNOWN) {
      setProgress({ show: false })
      enqueueSnackbar('Fail to identify archive service', {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        action: (key) => (
          <IconButton onClick={ () => closeSnackbar(key) } style={ { color: 'white' } }>
            <CloseIcon/>
          </IconButton>
        ),
      })
      console.info('[Archive] Unknown service, cancel import')
      archiveFactory.destroy()
        .catch((err) => console.error(err))
      return
    }

    console.info('[Archive] Service detected:', service)
    setProgress({ show: true, service, extractedCount: 0, total: 100 })

    const archivePlugin = await archiveFactory.getPlugin()

    console.info('[Archive] Start extraction')
    await archivePlugin.extract({
      onProgress: (fileName, extractedCount, total) => {
        setProgress({ show: (extractedCount !== total), service, fileName, extractedCount, total })
      },
    })
    console.info('[Archive] Extraction ended')

    const standardizer = await archivePlugin.getStandardizer()
    setCurrentArchive(archivePlugin)
    setCurrentStandardizer(standardizer)

    addHistoryEntry({
      archiveName: Path.parse(path).base,
      path: standardizer.path,
      service: standardizer.service,
      date: new Date(),
      size: await archivePlugin.getMetadata()
        .then((metadata) => metadata.size),
    })

    router.push('/dashboard')
  }, [])

  return (
    <Grid container justify="center" spacing={ 4 } style={ { textAlign: 'center' } }>
      <Grid item xs={ 12 }>
        <Box width={ 1 } display="flex" alignItems="center" justifyContent="center">
          <img src="/images/logo.png" alt="logo" width="4%"/>
          <Typography style={ { marginLeft: 30 } } variant="h3">
            D4Data
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={ 8 }>
        <Typography variant="h6" align="center">
          Visualize your personal data in just one click !
        </Typography>
        <br/>
        <Typography variant="body1" align="center">
          D4Data is the secure interface to convert non-human readable data to an intuitive user interface where anybody
          can understand its digital fingerprint.
        </Typography>
      </Grid>

      <Grid item xs={ 8 }>
        <Dropzone onLoaded={ handleExtract }/>
        <ArchiveExtractProgress state={ progressBar }/>
      </Grid>

      { lastHistoryEntry && (
        <Grid item xs={ 8 }>
          <Typography variant="h6">Last archive processed</Typography>
          <Box marginY={ 2 }>
            <LastHistoryEntry/>
          </Box>
          <Button onClick={ () => router.push('/archive-history') } variant="outlined">
            Show complete history ({ history.length })
          </Button>
        </Grid>
      ) }
    </Grid>
  )
}
