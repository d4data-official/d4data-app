import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { NextRouter, withRouter } from 'next/router'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import ArchiveExtractProgress from 'pages-components/home/components/ArchiveExtractProgress'
import Dropzone from 'pages-components/home/components/Dropzone'
import ArchiveManager from '../modules/ArchiveManager'

interface ProgressState {
  show: boolean,
  service: string | undefined,
  fileName: string | undefined,
  extractedCount: number | undefined,
  total: number | undefined,
}

function MainPage({ router }: { router: NextRouter }) {
  const [progressBar, setProgress] = React.useState<ProgressState>({
    show: false,
    service: undefined,
    extractedCount: undefined,
    fileName: undefined,
    total: undefined,
  })

  const handleProgress = (arg: ProgressState) => {
    setProgress(arg)
  }

  const handleExtract = React.useCallback((path: string) => {
    handleProgress({ show: true, service: undefined, fileName: 'start', extractedCount: 0, total: 0 })

    ArchiveFactoryIPC.init(path)
      .then(async (factory) => {
        const service = await factory.identify()
        if (service === Services.UNKNOWN) {
          handleProgress({
            show: false, service: undefined, fileName: undefined, extractedCount: undefined, total: undefined,
          })
          console.info('Unknown archive service, cancel import')
          factory.destroy()
            .catch((err) => console.error(err))
          return
        }

        handleProgress({ show: true, service, fileName: 'start', extractedCount: 0, total: 100 })
        console.info('Archive service detected:', service)
        const archivePlugin = await factory.getPlugin()
        console.info('Start archive extraction...')

        await archivePlugin.extract({
          onProgress: (fileName, extractedCount, total) => {
            handleProgress({ show: (extractedCount !== total), service, fileName, extractedCount, total })
          },
        })
        console.info('Archive extraction ended')

        const standardizer = await archivePlugin.getStandardizer()
        ArchiveManager.currentArchive = archivePlugin
        ArchiveManager.currentStandardizer = standardizer

        await router.push('/dashboard', {
          query: {
            id: standardizer.id,
          },
        })
      })
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
      {/* <History /> */ }
    </Grid>
  )
}

const Main = withRouter(MainPage)

export { Main }
export default Main
