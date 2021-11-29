import React from 'react'
import { Box } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Notification } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'
import NotificationsList from './Notifications/NotificationsList'

export default function Notifications({ data }: { data: NonNullable<GetterData<Notification>> }) {
  const { t } = useTranslation('common')

  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: t('stat'), icon: <Timeline/> },
          { label: t('list'), icon: <ListIcon/> },
        ] }
        tabsContent={ [
          <AutoStatisticPage getter={ Getters.NOTIFICATIONS }/>,
          <NotificationsList data={ data }/>,
        ] }
      />
    </Box>
  )
}
