import React from 'react'
import { Box } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../../components/statistics/AutoStatisticPage'
import AutoTabs from '../../components/AutoTabs'
import EventsList from '../../components/getters/Events/EventsList'

export default function events() {
  const { t } = useTranslation('common')

  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: t('stat'), icon: <Timeline/> },
          { label: t('list'), icon: <ListIcon/> },
        ] }
        tabsContent={ [
          <AutoStatisticPage getter={ Getters.EVENTS }/>,
          <EventsList/>,
        ] }
      />
    </Box>
  )
}
