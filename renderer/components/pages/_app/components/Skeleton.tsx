import React from 'react'
// import Show from 'components/Show'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
// import Sidebar from './Sidebar';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Home, Menu } from '@material-ui/icons'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import Case from 'case'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Sidebar from './Sidebar'
import ArchiveManager from '../../../../modules/ArchiveManager'

export interface ThemeProps {
  theme: Function
}

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ theme, children }: ThemeProps & SkeletonProps) {
  const router = useRouter()
  const { componentName } = router.query
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(/dashboard/.test(router.pathname))
  const classes = useStyles()

  const handleDrawerChange = React.useCallback((open?: boolean | any) => {
    setDrawerOpen(typeof open === 'boolean' ? open : !drawerOpen)
  }, [drawerOpen])
  React.useEffect(() => {
    router.events.on('routeChangeComplete', (route) => {
      handleDrawerChange(/dashboard/.test(route))
    })
  }, [])

  const clearCurrentArchive = () => {
    ArchiveManager.clear()
    router.push('/home')
  }

  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  return (
    <div className={ classes.root }>
      <CssBaseline/>
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
              <IconButton color="inherit" onClick={ () => clearCurrentArchive() } edge="start">
                <Home/>
              </IconButton>
            </Show>
            <Typography variant="h6" noWrap>
              { Case.capital(componentName as string) ?? 'D4Data' }
            </Typography>
          </div>
          <div className={ classes.toolbarRight }>
            <ToggleButtonGroup
              value={ alignment }
              exclusive
              onChange={ handleAlignment }
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <WbSunnyIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <Brightness3Icon />
              </ToggleButton>
            </ToggleButtonGroup>
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
