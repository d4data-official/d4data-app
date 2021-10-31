import React from 'react'
import { Box } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import AutoStatisticPage from '../../components/statistics/AutoStatisticPage'
import AutoTabs from '../../components/AutoTabs'
import EventsList from '../../components/getters/Events/EventsList'

export default function events() {
  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: 'Events stat', icon: <Timeline/> },
          { label: 'Events list', icon: <ListIcon/> },
        ] }
        tabsContent={ [
          <AutoStatisticPage getter={ Getters.EVENTS }/>,
          <EventsList/>,
        ] }
      />
    </Box>
  )
}
