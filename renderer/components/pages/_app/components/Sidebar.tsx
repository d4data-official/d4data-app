// import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Case from 'case'
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import useStyles from 'pages-components/_app/styles/sidebar.styles'
import { ComponentList } from 'components/pages/dashboard/components'
import { GlobalContext } from 'renderer/context/Store'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

export default function Sidebar(
  { drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps,
) {
  const classes = useStyles()
  const { dispatch } = useContext(GlobalContext)
  const handleComponentClick = React.useCallback((componentName: string) => () => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: componentName })
  }, [])

  return (
    <Drawer
      variant="persistent"
      open={ drawerOpen }
      onClose={ handleDrawerChange }
      className={ classes.drawer }
      classes={ {
        paper: classes.drawerPaper,
      } }
    >
      <div className={ drawerHeaderClass }>
        <IconButton onClick={ handleDrawerChange }>
          <ChevronLeft/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        {ComponentList.map(([component]) => (
          <ListItem
            key={ component }
            className={ classes.component }
            button
            onClick={ handleComponentClick(component) }
          >
            <ListItemText primary={ Case.capital(component) }/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
