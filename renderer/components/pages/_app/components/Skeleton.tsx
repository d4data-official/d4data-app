import React, { useCallback, useContext } from 'react'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
import {
  AppBar,
  Box,
  capitalize,
  Dialog, DialogContent, DialogTitle, Grid, IconButton, Toolbar, Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import { Home, Menu, Settings } from '@material-ui/icons'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import Case from 'case'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CodeIcon from '@material-ui/icons/Code';
import ListIcon from '@material-ui/icons/List';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { GlobalContext } from 'renderer/context/Store'
import Sidebar from './Sidebar'
import ArchiveManager from '../../../../modules/ArchiveManager'

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ children }: SkeletonProps) {
  const router = useRouter()
  const { currentTheme, rawData, componentName, dispatch } = useContext(GlobalContext)
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
  const classes = useStyles()

  const handleDrawerChange = React.useCallback((open?: boolean | any) => {
    setDrawerOpen(typeof open === 'boolean' ? open : !drawerOpen)
  }, [drawerOpen])

  const handleRouteChange = useCallback((route) => {
    handleDrawerChange(/dashboard/.test(route));
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])

  const clearCurrentArchive = useCallback(() => {
    router.push('/home')
    ArchiveManager.clear()
    dispatch({ type: 'UPDATE_COMPONENT' })
  }, [])

  const handleThemeChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' })
  }, []);

  const handleRawdataChange = useCallback(() => {
    dispatch({ type: 'TOGGLE_RAWDATA' })
  }, []);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen((prev) => !prev);
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
              {componentName ? Case.capital(componentName) : 'D4Data'}
            </Typography>
          </div>
          <div className={ classes.toolbarRight }>
            <IconButton onClick={ handleDialogOpen }>
              <Settings className={ classes.settingsButton } />
            </IconButton>
            <Dialog
              open={ dialogOpen }
              onClose={ handleDialogOpen }
              maxWidth="md"
              fullWidth
            >
              <DialogTitle className={ classes.dialogTitle } >Settings</DialogTitle>
              <DialogContent className={ classes.dialogContent } >
                <Grid container spacing={ 1 } justifyContent="space-between" alignItems="center">
                  <Grid item >
                    <Typography variant="h4">
                      Theme: { capitalize(currentTheme) }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ToggleButtonGroup
                      value={ currentTheme }
                      exclusive
                      onChange={ handleThemeChange }
                    >
                      <ToggleButton value="light" aria-label="light">
                        <WbSunnyIcon/>
                      </ToggleButton>
                      <ToggleButton value="dark" aria-label="dark">
                        <Brightness3Icon/>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={ 12 }/>
                  <Grid item>
                    <Typography variant="h4">
                      Display type: { rawData ? 'Raw Data' : 'Ergonomic Display' }
                    </Typography>
                  </Grid>
                  <Grid item >
                    <ToggleButtonGroup
                      value={ rawData }
                      exclusive
                      onChange={ handleRawdataChange }
                    >
                      <ToggleButton value={ false } aria-label="light">
                        <ListIcon/>
                      </ToggleButton>
                      <ToggleButton value aria-label="dark">
                        <CodeIcon/>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
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
        <Box padding={ 3 } flexGrow={ 1 } display="flex" overflow="auto">{children}</Box>
      </main>
    </div>
  )
}
