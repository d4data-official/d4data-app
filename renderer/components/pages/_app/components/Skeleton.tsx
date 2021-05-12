import React, { useCallback } from 'react'
// import Show from 'components/Show'
import useStyles from 'pages-components/_app/styles/skeleton.styles'
// import Sidebar from './Sidebar';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Menu } from '@material-ui/icons'
import Show from 'components/Show'
import { useRouter } from 'next/router'
import Case from 'case'
import Sidebar from './Sidebar'

export interface SkeletonProps {
  children: JSX.Element | JSX.Element[]
}

export default function Skeleton({ children }: SkeletonProps) {
  const router = useRouter()
  const { componentName } = router.query
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(/dashboard/.test(router.pathname))
  const classes = useStyles()

  const handleDrawerChange = React.useCallback((open?: boolean | any) => {
    setDrawerOpen(typeof open === 'boolean' ? open : !drawerOpen)
  }, [drawerOpen]);

  const handleDetectDashbord = useCallback((route) => {
    handleDrawerChange(/dashboard/.test(route));
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleDetectDashbord);
    return () => {
      router.events.off('routeChangeComplete', handleDetectDashbord);
    }
  }, [])
  return (
    <div className={ classes.root }>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={ clsx(classes.appbar, {
          [classes.appBarShift]: drawerOpen,
        }) }
      >
        <Toolbar>
          <div>
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
          </div>
          <Typography variant="h6" noWrap>
            {Case.capital(componentName as string) ?? 'D4Data'}
          </Typography>
          <div />
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
