/* eslint-disable max-len */
/* eslint-disable no-tabs */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { NextRouter, withRouter } from 'next/router'
import ArchiveExtractProgress from 'pages-components/home/components/ArchiveExtractProgress'
import Dropzone from 'pages-components/home/components/Dropzone'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import ArchiveManager from '../modules/ArchiveManager'

interface ProgressState {
  service: string | undefined,
  fileName: string | undefined,
  extractedCount: number | undefined,
  total: number | undefined,
}

function MainPage({ router }: { router: NextRouter }) {
  const [progressBar, setProgress] = React.useState<ProgressState>({
    service: undefined,
    extractedCount: undefined,
    fileName: undefined,
    total: undefined,
  })

  const handleProgress = (arg: any) => {
    setProgress(arg)
  }

  const handleExtract = React.useCallback((path: string) => {
    ArchiveFactoryIPC.init(path)
      .then(async (factory) => {
        const service = await factory.identify()

        if (service === Services.UNKNOWN) {
          console.info('Unknown archive service, cancel import')
          factory.destroy()
            .catch((err) => console.error(err))

          return
        }

        handleProgress({ service, fileName: 'start', extractedCount: 0, total: 100 })

        console.info('Archive service detected:', service)

        const archivePlugin = await factory.getPlugin()

        console.info('Start archive extraction...')
        await archivePlugin.extract({
          onProgress: (fileName, extractedCount, total) => {
            handleProgress({ service, fileName, extractedCount, total })
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
      {/* <Grid item xs={12}>
        <div style={{
          marginTop: 30, marginBottom: 30, width: '100vw', display: 'flex', alignContent: 'center', justifyContent: 'center',
        }}
        >
          <img src="/images/assets/logo-grey.svg" alt="logo" width="19%" />
        </div>
      </Grid> */ }
      <Grid item xs={ 8 }>
        <Typography variant="h3">
          Your data is important, take control of it.
        </Typography>
      </Grid>
      <Grid item xs={ 8 }>
        <Typography variant="body2">
          { `D4Data helps you having a better understanding of your data.
					Even if you have nothing to hide, your digital fingerprint defines who you are.
					Thanks to European regulations (GDPR), all companies that gathered data about you,
					must supply a package containing all of those data on demand.
					The only problem is that those data are not human-readable.` }
        </Typography>

      </Grid>
      <Grid item xs={ 8 }>
        <Typography variant="body1">
          D4Data is the secure interface to convert non-human readable data to an intuitive user interface where anybody
          can understand its digital fingerprint.
        </Typography>

      </Grid>
      {/* <Extraction /> */ }
      <Grid item xs={ 8 }>
        <Dropzone onLoaded={ handleExtract }/>
        <ArchiveExtractProgress state={ progressBar } />
      </Grid>
      {/* <History /> */ }
    </Grid>
  )
}

const Main = withRouter(MainPage)

export { Main }
export default Main
