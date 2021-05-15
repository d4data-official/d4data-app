import React, { useCallback } from 'react'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import clsx from 'clsx'
import CodeIcon from '@material-ui/icons/Code';
import { Home, Menu } from '@material-ui/icons'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import Case from 'case'
import Sidebar from './Sidebar'
import ArchiveManager from '../../../../modules/ArchiveManager'

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ children }: SkeletonProps) {
  const router = useRouter()
  const { componentName } = router.query
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(/dashboard/.test(router.pathname))
  const [showRawData, setShowRawData] = React.useState(/dahsboard\/.+/.test(router.pathname));
  const classes = useStyles()

  const handleDrawerChange = React.useCallback((open?: boolean | any) => {
    setDrawerOpen(typeof open === 'boolean' ? open : !drawerOpen)
  }, [drawerOpen]);

  const handleDetectDashbord = useCallback((route) => {
    handleDrawerChange(/dashboard/.test(route));
    setShowRawData(/dashboard\/.+/.test(route))
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleDetectDashbord);
    return () => {
      router.events.off('routeChangeComplete', handleDetectDashbord);
    }
  }, [router])

  const clearCurrentArchive = () => {
    ArchiveManager.clear()
    router.push('/home')
  }

  return (
    <div className={ classes.root }>
      <CssBaseline />
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
                <Menu />
              </IconButton>
            </Show>
            <Typography variant="h6" noWrap>
              {Case.capital(componentName as string) ?? 'D4Data'}
            </Typography>
          </div>
          <div>
            { showRawData && (
            <Tooltip title="Show me raw data">
              <IconButton
                color="inherit"
                edge="end"
                aria-label="open drawer"
                onClick={ () => window.dispatchEvent(new Event('rawData')) }
              >
                <CodeIcon />
              </IconButton>
            </Tooltip>
            )}
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
        {/* <div className={ classes.drawerHeader } /> */}
        <Box padding={ 3 } height="100%" flexGrow={ 1 } display="flex" overflow="auto">{children}</Box>
      </main>
    </div>
  )
}
