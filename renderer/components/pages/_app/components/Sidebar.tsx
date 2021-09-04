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
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { GlobalContext } from 'renderer/context/Store'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import Trans, { useTranslation } from 'components/Translate'
import useArchiveManager from '../../../../hooks/useArchiveManager'
import ConditionalTooltip from '../../../ConditionalTooltip'
import useLabelizeLabel from '../../../../modules/getGetterLabel'

export interface SidebarProps {
  drawerHeaderClass: string
  drawerOpen: boolean
  handleDrawerChange: (open?: boolean | any) => void
}

const GETTERS = Object.values(Getters)

const DRAWER_WIDTH = 240

const IGNORED_GETTER: Array<Getters> = [Getters.CHAT_MESSAGES]

const useStyles = makeStyles((theme) => ({
  selected: {
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.main,
    borderRightWidth: '4px',
  },
}))

export default function Sidebar({ drawerHeaderClass, drawerOpen, handleDrawerChange }: SidebarProps) {
  const classes = useStyles();
  const { componentName, dispatch } = useContext(GlobalContext)
  const translate = useTranslation();
  const labelizeLabel = useLabelizeLabel();
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
      sx={ {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          justifyContent: 'space-between',
        },
      } }
    >
      <div>
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
          >
            <Trans page="navbar" section="available" />
          </Typography>
          ) }

          { (availableGetters ?? GETTERS).map((getter) => (
            <ListItem
              key={ getter }
              onClick={ handleLinkClick(getter) }
              button
              className={ getter === componentName ? classes.selected : '' }
            >
              <ListItemText primary={ labelizeLabel(getter) }/>
            </ListItem>
          )) }

        </List>
      </div>
      <Accordion disabled={ !availableGetters } disableGutters sx={ { '&.Mui-disabled': { background: 'initial' } } }>
        <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
          <ConditionalTooltip title={ translate('navbar', 'loading') } show={ !availableGetters }>
            <Stack direction="row" alignItems="center" spacing={ 1 }>
              { !availableGetters && <CircularProgress size={ 15 }/> }
              <Typography variant="overline" color="gray">
                <Trans page="navbar" section="unavailable" />
              </Typography>
            </Stack>
          </ConditionalTooltip>
        </AccordionSummary>

        <AccordionDetails>
          { (unavailableGetters).map((getter) => (
            <ListItem key={ getter } button disabled>
              <ListItemText primary={ labelizeLabel(getter) }/>
            </ListItem>
          )) }
        </AccordionDetails>
      </Accordion>
    </Drawer>
  )
}
