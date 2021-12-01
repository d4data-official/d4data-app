import React from 'react'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import ConnectionHistory from './LocationComponents/ConnectionHistory'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export default function Connections({ data }: { data: NonNullable<GetterData<Array<Connection>>> }) {
  const { t } = useTranslation(['common', 'pages'])

  return (
    <AutoTabs
      tabs={ [
        { label: t('common:stat'), icon: <Timeline/> },
        { label: t('pages:connections.tabs.history'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.CONNECTIONS }/>,
        // Wrap with no overflow container to fix buggy table scroll
        <Box height={ 1 } p={ 0 } pt={ 0 } overflow="hidden">
          <Container maxWidth="lg" sx={ { height: 1 } }>
            <ConnectionHistory whereabouts={ data.data }/>
          </Container>
        </Box>,
      ] }
    />
  )
}
