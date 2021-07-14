// import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Case from 'case'
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
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
  const { dispatch } = useContext(GlobalContext)
  const handleComponentClick = React.useCallback((componentName: string) => () => {
    dispatch({ type: 'UPDATE_COMPONENT', componentName })
  }, [])

  return (
    <Drawer
      variant="persistent"
      open={ drawerOpen }
      onClose={ handleDrawerChange }
      sx={ { width: 240, flexShrink: 0 } }
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
            button
            onClick={ handleComponentClick(component) }
            sx={ { textAlign: 'center', height: '60px' } }
          >
            <ListItemText primary={ Case.capital(component) }/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
