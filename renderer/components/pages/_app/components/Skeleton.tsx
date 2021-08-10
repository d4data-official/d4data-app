import React, { useCallback, useContext } from 'react'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import clsx from 'clsx'
import Home from '@material-ui/icons/Home'
import Menu from '@material-ui/icons/Menu'
import Settings from '@material-ui/icons/Settings'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import { GlobalContext } from 'renderer/context/Store'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import Sidebar from './Sidebar'
import ArchiveManager from '../../../../modules/ArchiveManager'
import AppSettingsDialog from '../../../AppSettingsDialog'
import getGetterLabel from '../../../../modules/getGetterLabel'

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ children }: SkeletonProps) {
  const router = useRouter()
  const { currentTheme, rawData, componentName, dispatch } = useContext(GlobalContext)
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState<boolean>(false)
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
              { componentName ? getGetterLabel(componentName as Getters) : 'D4Data' }
            </Typography>
          </div>

          <div className={ classes.toolbarRight }>
            <IconButton onClick={ handleSettingsDialogOpen }>
              <Settings className={ classes.settingsButton }/>
            </IconButton>

            <AppSettingsDialog open={ settingsDialogOpen } onClose={ () => setSettingsDialogOpen(false) }/>
          </div>
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
        <Box padding={ 3 } flexGrow={ 1 } display="flex" overflow="auto">{ children }</Box>
      </main>
    </div>
  )
}
