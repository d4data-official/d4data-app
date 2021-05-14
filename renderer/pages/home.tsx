import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import Dropzone from 'pages-components/home/components/Dropzone'
import ArchiveManager from '../modules/ArchiveManager'
import ArchiveExtractProgress, { ProgressState } from '../components/pages/home/components/ArchiveExtractProgress'

export default function HomePage() {
  const router = useRouter()
  const [progressBar, setProgress] = React.useState<ProgressState>({ show: false })

  const handleExtract = React.useCallback(async (path: string) => {
    setProgress({ show: true })

    const archiveFactory = await ArchiveFactoryIPC.init(path)

    console.info('[Archive] Identifying service')

    const service = await archiveFactory.identify()
    if (service === Services.UNKNOWN) {
      setProgress({ show: false })
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
    ArchiveManager.currentArchive = archivePlugin
    ArchiveManager.currentStandardizer = standardizer

    await router.push('/dashboard')
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
      {/* <Extraction /> */ }
      <Grid item xs={ 8 }>
        <Dropzone onLoaded={ handleExtract }/>
        <ArchiveExtractProgress state={ progressBar }/>
      </Grid>
    </Grid>
  )
}
