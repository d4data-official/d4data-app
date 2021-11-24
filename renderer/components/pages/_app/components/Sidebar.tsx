// import { useRouter } from 'next/router'
import React, { useContext, useMemo } from 'react'
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
import { useRouter } from 'next/router'
import getGetterLabel from '../../../../modules/getGetterLabel'
import ConditionalTooltip from '../../../ConditionalTooltip'
import useAvailableGetters from '../../../../hooks/getter/useAvailableGetters'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

const AVAILABLE_GETTERS_SECTION_TITLE = 'Available data'
const UNAVAILABLE_GETTERS_ACCORDION_LABEL = 'Unavailable data'
const LOADING_ACCORDION_LABEL = 'Processing...'

const DRAWER_WIDTH = 240

const GETTERS = Object.values(Getters)
const IGNORED_GETTER: Array<Getters> = [Getters.CHAT_MESSAGES]
const DEDICATED_GETTER_PAGES: Array<Getters> = [Getters.EVENTS]

export default function Sidebar({ drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps) {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)
  const { availableGetters, loading } = useAvailableGetters()

  const filteredGetters = useMemo(() => availableGetters
    ?.filter((getter) => !IGNORED_GETTER.includes(getter)), [availableGetters])

  const unavailableGetters = useMemo(() => GETTERS
    .filter((getter) => !filteredGetters?.includes(getter)), [filteredGetters])

  const handleLinkClick = React.useCallback((getterName: string) => () => {
    if (DEDICATED_GETTER_PAGES.includes(getterName as Getters)) {
      router.push(`/dashboard/${ getterName.toLowerCase().slice(3) }`)
      return
    }

    router.push('/dashboard')
    dispatch({ type: 'UPDATE_COMPONENT', componentName: getterName })
  }, [])

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
        { filteredGetters && (
          <Typography
            ml={ 1 }
            variant="overline"
            color="primary"
          >{ AVAILABLE_GETTERS_SECTION_TITLE }
          </Typography>
        ) }

        { (filteredGetters ?? GETTERS).map((getter) => (
          <ListItem key={ getter } onClick={ handleLinkClick(getter) } button>
            <ListItemText primary={ getGetterLabel(getter) }/>
          </ListItem>
        )) }

        <Accordion disabled={ !filteredGetters } disableGutters sx={ { '&.Mui-disabled': { background: 'initial' } } }>
          <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
            <ConditionalTooltip title={ LOADING_ACCORDION_LABEL } show={ !filteredGetters }>
              <Stack direction="row" alignItems="center" spacing={ 1 }>
                { loading && <CircularProgress size={ 15 }/> }
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
