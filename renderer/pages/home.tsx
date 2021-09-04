import React from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import Dropzone from 'pages-components/home/components/Dropzone'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import { useRouter } from 'next/router'
import Path from 'path'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { toast } from 'react-hot-toast'
import Trans from 'components/Translate';
import ArchiveExtractProgress, { ProgressState } from 'components/pages/home/components/ArchiveExtractProgress'
import LastHistoryEntry from 'components/history/LastHistoryEntry'
import useArchiveManager from '../hooks/useArchiveManager'

export default function HomePage() {
  const router = useRouter()
  const [progressBar, setProgress] = React.useState<ProgressState>({ show: false })
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
      toast.error('Fail to identify archive service', { position: 'bottom-left' })

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
    <Grid container justifyContent="center" spacing={ 4 } style={ { textAlign: 'center' } }>
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
          <Trans page="homepage" section="header" />
        </Typography>
        <br/>
        <Typography variant="body1" align="center">
          <Trans page="homepage" section="description" />
        </Typography>
      </Grid>

      <Grid item xs={ 8 }>
        <Dropzone onLoaded={ handleExtract }/>
        <ArchiveExtractProgress state={ progressBar }/>
      </Grid>

      { lastHistoryEntry && (
        <Grid item xs={ 8 }>
          <Typography variant="h6"><Trans page="homepage" section="historyTitle" /></Typography>
          <Box marginY={ 2 }>
            <LastHistoryEntry/>
          </Box>
          <Button onClick={ () => router.push('/archive-history') } variant="outlined">
            <Trans page="homepage" section="historyButton" /> ({ history.length })
          </Button>
        </Grid>
      ) }
    </Grid>
  )
}
