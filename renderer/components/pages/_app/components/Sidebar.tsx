import React from 'react'

import useStyles from 'pages-components/_app/styles/sidebar.styles'
import {
  Drawer, IconButton, Divider, List, ListItem, ListItemText,
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import Case from 'case'
import { ComponentList } from 'components/pages/dashboard/components'
import { useRouter } from 'next/router'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

export default function Sidebar(
  { drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps,
) {
  const classes = useStyles()
  const router = useRouter()
  const handleComponentClick = React.useCallback((componentName: string) => () => {
    router.push(`/dashboard/${Case.camel(componentName)}`)
  }, [])
  return (
    <Drawer
      variant="persistent"
      open={drawerOpen}
      onClose={handleDrawerChange}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={drawerHeaderClass}>
        <IconButton onClick={handleDrawerChange}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {ComponentList.map(([component]) => (
          <ListItem
            key={component}
            className={classes.component}
            button
            onClick={handleComponentClick(component)}
          >
            <ListItemText primary={Case.capital(component)} />
          </ListItem>
        ))}
      </List>
    </Drawer >
  )
}
