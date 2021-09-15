import React from 'react'
import { Box, Button, Grid, Paper, Stack, Typography, useTheme } from '@material-ui/core'
import Dropzone from 'pages-components/home/components/Dropzone'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import ArchiveFactoryIPC from '@shared/d4data-archive-lib/renderer/ArchiveFactoryIPC'
import { useRouter } from 'next/router'
import Path from 'path'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { toast } from 'react-hot-toast'
import Particles from 'react-tsparticles'
import ArchiveExtractProgress, { ProgressState } from '../components/pages/home/components/ArchiveExtractProgress'
import LastHistoryEntry from '../components/history/LastHistoryEntry'
import useArchiveManager from '../hooks/useArchiveManager'

export default function HomePage() {
  const theme = useTheme()
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
    <Grid
      height={ 1 }
      width={ 1 }
      py={ 4 }
      container
      justifyContent="center"
      spacing={ 2 }
      style={ { textAlign: 'center', position: 'relative' } }
    >
      <Particles
        id="home-page-particles"
        style={ { filter: 'blur(2px)', zIndex: 0, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } }
        options={ {
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: theme.palette.primary.main,
            },
            links: {
              color: theme.palette.primary.main,
              distance: 200,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 3,
              straight: true,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        } }
      />

      <Grid item xs={ 12 } sx={ { zIndex: 10 } }>
        <Box width={ 1 } display="flex" alignItems="center" justifyContent="center">
          <img
            src="/images/logo_primary_color_1024p.png"
            alt="logo"
            width="200px"
            style={ {
              filter: 'drop-shadow(0 2px 4px rgb(0 0 0 / 20%)',
            } }
          />
        </Box>
      </Grid>

      <Grid item xs={ 8 } sx={ { zIndex: 10 } }>
        <Typography
          variant="h4"
          component="span"
          color="primary"
          align="center"
        >
          Visualize your personal data in just one click !
        </Typography>
      </Grid>

      <Grid item xs={ 8 } sx={ { zIndex: 10 } }>
        <Paper sx={ { p: 4 } } elevation={ 4 }>
          <Stack spacing={ 4 }>

            <Paper elevation={ 2 } sx={ { overflow: 'hidden' } }>
              <Dropzone onLoaded={ handleExtract }/>
            </Paper>

            { lastHistoryEntry && (
              <Stack spacing={ 2 }>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={ 100 } color="secondary">Last archive processed</Typography>

                  <Button
                    onClick={ () => router.push('/archive-history') }
                    color="secondary"
                    variant="contained"
                    size="small"
                  >
                    Show complete history ({ history.length })
                  </Button>
                </Stack>

                <LastHistoryEntry/>
              </Stack>
            ) }

          </Stack>
        </Paper>

        <ArchiveExtractProgress state={ progressBar }/>
      </Grid>
    </Grid>
  )
}
