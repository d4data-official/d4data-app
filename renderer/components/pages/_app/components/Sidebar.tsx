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
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { GlobalContext } from 'renderer/context/Store'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ConditionalTooltip from '../../../ConditionalTooltip'
import useAvailableGetters from '../../../../hooks/getter/useAvailableGetters'
import useGetGetterLabel from '../../../../hooks/getter/useGetGetterLabel'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

const DRAWER_WIDTH = 240

const GETTERS = Object.values(Getters)
const IGNORED_GETTER: Array<Getters> = [Getters.CHAT_MESSAGES]
const DEDICATED_GETTER_PAGES: Array<Getters> = [Getters.EVENTS, Getters.MESSAGES]

export default function Sidebar({ drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps) {
  const router = useRouter()
  const { componentName, dispatch } = useContext(GlobalContext)
  const { availableGetters, loading } = useAvailableGetters()

  const { getGetterLabel } = useGetGetterLabel()
  const { t } = useTranslation('sidebar')

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

  const goToDashboard = () => {
    dispatch({ type: 'UPDATE_COMPONENT', componentName: undefined })
  }

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
        <ListItem key="overviewBtn" onClick={ () => goToDashboard() } selected={ componentName === undefined } button>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary={ t('dashboard') }/>
        </ListItem>

        { filteredGetters && (
          <Typography
            ml={ 1 }
            variant="overline"
            color="primary"
          >{ t('availableData') }
          </Typography>
        ) }

        { (filteredGetters ?? GETTERS).map((getter) => (
          <ListItem
            key={ getter }
            onClick={ handleLinkClick(getter) }
            selected={ (router.pathname === '/dashboard' && componentName === getter)
              || router.pathname.split('/').pop() === getter.slice(3).toLowerCase() }
            button
          >
            <ListItemText primary={ getGetterLabel(getter) }/>
          </ListItem>
        )) }

        <Accordion disabled={ !filteredGetters } disableGutters sx={ { '&.Mui-disabled': { background: 'initial' } } }>
          <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
            <ConditionalTooltip title={ t('processing') } show={ !filteredGetters }>
              <Stack direction="row" alignItems="center" spacing={ 1 }>
                { loading && <CircularProgress size={ 15 }/> }
                <Typography variant="overline" color="gray">{ t('unavailableData') }</Typography>
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
