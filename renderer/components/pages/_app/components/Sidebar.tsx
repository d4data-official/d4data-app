// import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { GlobalContext } from 'renderer/context/Store'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import getGetterLabel from '../../../../modules/getGetterLabel'
import useArchiveManager from '../../../../hooks/useArchiveManager'
import ConditionalTooltip from '../../../ConditionalTooltip'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

const AVAILABLE_GETTERS_SECTION_TITLE = 'Available data'
const UNAVAILABLE_GETTERS_ACCORDION_LABEL = 'Unavailable data'
const LOADING_ACCORDION_LABEL = 'Processing...'

const GETTERS = Object.values(Getters)

const DRAWER_WIDTH = 240

const IGNORED_GETTER: Array<Getters> = [Getters.CHAT_MESSAGES]

export default function Sidebar({ drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps) {
  const { dispatch } = useContext(GlobalContext)
  const [availableGetters, setAvailableGetters] = useState<Array<Getters>>()
  const { currentStandardizer } = useArchiveManager()

  const unavailableGetters = useMemo(() => GETTERS
    .filter((getter) => !availableGetters?.includes(getter)), [availableGetters])

  const handleLinkClick = React.useCallback((getterName: string) => () => {
    // const componentName = getterName.slice(3) // Remove 'get' of getter name
    dispatch({ type: 'UPDATE_COMPONENT', componentName: getterName })
  }, [])

  // Check available getters
  useEffect(() => {
    if (!currentStandardizer) {
      setAvailableGetters(undefined)
      return
    }

    currentStandardizer.getAvailableGetters()
      .then((getters) => {
        const filteredGetter = getters.filter((getter) => !IGNORED_GETTER.includes(getter))
        setAvailableGetters(filteredGetter)
      })
  }, [currentStandardizer])

  return (
    <Drawer
      variant="persistent"
      open={ drawerOpen }
      onClose={ handleDrawerChange }
      sx={ { width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } } }
    >
      <div className={ drawerHeaderClass }>
        <IconButton onClick={ handleDrawerChange }>
          <ChevronLeft/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        { availableGetters && (
          <Typography
            ml={ 1 }
            variant="overline"
            color="primary"
          >{ AVAILABLE_GETTERS_SECTION_TITLE }
          </Typography>
        ) }

        { (availableGetters ?? GETTERS).map((getter) => (
          <ListItem key={ getter } onClick={ handleLinkClick(getter) } button>
            <ListItemText primary={ getGetterLabel(getter) }/>
          </ListItem>
        )) }

        <Accordion disabled={ !availableGetters } disableGutters sx={ { '&.Mui-disabled': { background: 'initial' } } }>
          <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
            <ConditionalTooltip title={ LOADING_ACCORDION_LABEL } show={ !availableGetters }>
              <Stack direction="row" alignItems="center" spacing={ 1 }>
                { !availableGetters && <CircularProgress size={ 15 }/> }
                <Typography variant="overline" color="gray">{ UNAVAILABLE_GETTERS_ACCORDION_LABEL }</Typography>
              </Stack>
            </ConditionalTooltip>
          </AccordionSummary>

          <AccordionDetails>
            { (unavailableGetters).map((getter) => (
              <ListItem key={ getter } button disabled>
                <ListItemText primary={ getGetterLabel(getter) }/>
              </ListItem>
            )) }
          </AccordionDetails>
        </Accordion>
      </List>
    </Drawer>
  )
}
