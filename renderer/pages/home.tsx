/* eslint-disable max-len */
/* eslint-disable no-tabs */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { NextRouter, withRouter } from 'next/router'
import Dropzone from 'pages-components/home/components/Dropzone'
import Services from 'd4data-archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import ArchiveManager from '../modules/ArchiveManager'

function MainPage({ router }: { router: NextRouter }) {
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

        console.info('Archive service detected:', service)

        const archivePlugin = await factory.getPlugin()
        factory.destroy()
          .catch((err) => console.error(err))

        console.info('Start archive extraction...')
        await archivePlugin.extract({
          onProgress: (fileName, extractedCount, total) => {

          },
        })
        console.info('Archive extraction ended')

        const standardizer = await archivePlugin.getStandardizer()

        ArchiveManager.currentStandardizer = standardizer

        router.push('/dashboard', {
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
      </Grid>
      {/* <History /> */ }
    </Grid>
  )
}

const Main = withRouter(MainPage)

export { Main }
export default Main
