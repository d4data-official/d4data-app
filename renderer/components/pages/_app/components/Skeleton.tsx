import React, { useCallback, useContext } from 'react'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import clsx from 'clsx'
import Home from '@mui/icons-material/Home'
import Menu from '@mui/icons-material/Menu'
import Settings from '@mui/icons-material/Settings'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import { GlobalContext } from 'renderer/context/Store'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import Sidebar from './Sidebar'
import ArchiveManager from '../../../../modules/ArchiveManager'
import AppSettingsDialog from '../../../AppSettingsDialog'
import AppBarMoreMenu from './AppBarMoreMenu'
import useArchiveManager from '../../../../hooks/useArchiveManager'
import DataCollectUserContentDialog from '../../../DataCollectUserContentDialog'
import useGetGetterLabel from '../../../../hooks/getter/useGetGetterLabel'

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ children }: SkeletonProps) {
  const router = useRouter()
  const { componentName, dispatch } = useContext(GlobalContext)
  const { currentStandardizer } = useArchiveManager()
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState<boolean>(false)
  const { getGetterLabel } = useGetGetterLabel()
  const classes = useStyles()

  const handleDrawerChange = React.useCallback((open?: boolean | any) => {
    setDrawerOpen(typeof open === 'boolean' ? open : !drawerOpen)
  }, [drawerOpen])

  const handleRouteChange = useCallback((route) => {
    handleDrawerChange(/dashboard/.test(route))
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  const clearCurrentArchive = useCallback(() => {
    router.push('/home')
    ArchiveManager.clear()
    dispatch({ type: 'UPDATE_COMPONENT' })
  }, [])

  const handleSettingsDialogOpen = useCallback(() => {
    setSettingsDialogOpen((prev) => !prev)
  }, [])

  return (
    <div className={ classes.root }>
      <DataCollectUserContentDialog/>

      <AppBar
        position="fixed"
        className={ clsx(classes.appbar, {
          [classes.appBarShift]: drawerOpen,
        }) }
      >
        <Toolbar className={ classes.toolbar }>
          <div className={ classes.toolbarLeft }>
            <Show condition={ /dashboard/.test(router.pathname) }>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={ handleDrawerChange }
                edge="start"
                className={ clsx(classes.menuButton, drawerOpen && classes.hide) }
              >
                <Menu/>
              </IconButton>
            </Show>
            <Show condition={ router.pathname !== '/home' }>
              <IconButton color="inherit" onClick={ clearCurrentArchive } edge="start">
                <Home/>
              </IconButton>
            </Show>
            <Typography variant="h6" noWrap>
              { currentStandardizer?.service && `${ currentStandardizer?.service } / ` }
              {
                // eslint-disable-next-line no-nested-ternary
                router.pathname.startsWith('/dashboard/')
                  ? getGetterLabel(router.pathname.split('/').pop() as Getters)
                  : componentName
                    ? getGetterLabel(componentName as Getters)
                    : 'D4Data'
              }
            </Typography>
          </div>

          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={ 0 }>
            <IconButton onClick={ handleSettingsDialogOpen }>
              <Settings className={ classes.settingsButton }/>
            </IconButton>

            <AppBarMoreMenu/>

            <AppSettingsDialog open={ settingsDialogOpen } onClose={ () => setSettingsDialogOpen(false) }/>
          </Stack>
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerOpen={ drawerOpen }
        drawerHeaderClass={ classes.drawerHeader }
        handleDrawerChange={ handleDrawerChange }
      />
      <main
        className={ clsx(classes.main, {
          [classes.mainShift]: drawerOpen,
        }) }
      >
        <div className={ classes.drawerHeader }/>
        <Box
          flexGrow={ 1 }
          display="flex"
          overflow="auto"
        >{ children }
        </Box>
      </main>
    </div>
  )
}
