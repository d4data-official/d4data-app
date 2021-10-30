import React from 'react'
import { Box } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Notification } from '@d4data/archive-lib/dist/src/types/schemas'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'
import NotificationsList from './Notifications/NotificationsList'

export default function Notifications({ data }: { data: NonNullable<GetterData<Notification>> }) {
  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: 'Notifications stat', icon: <Timeline/> },
          { label: 'Notifications list', icon: <ListIcon/> },
        ] }
        tabsContent={ [
          <AutoStatisticPage getter={ Getters.BROWSER_DATA }/>,
          <NotificationsList data={ data }/>,
        ] }
      />
    </Box>
  )
}
