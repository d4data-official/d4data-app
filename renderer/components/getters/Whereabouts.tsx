import React from 'react'
import MapIcon from '@mui/icons-material/Map'
import ListIcon from '@mui/icons-material/List'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { Box, Container } from '@mui/material'
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas'
import LocationHistory from './LocationComponents/LocationHistory'
import WhereaboutsMap from './LocationComponents/WhereaboutsMap'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export default function Whereabouts({ data }: { data: NonNullable<GetterData<Array<Whereabout>>> }) {
  return (
    <AutoTabs
      tabs={ [
        { label: 'Transaction stat', icon: <Timeline/> },
        { label: 'World map', icon: <MapIcon/> },
        { label: 'Location history', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.WHEREABOUTS }/>,
        <WhereaboutsMap whereabouts={ data.data }/>,
        // Wrap with no overflow container to fix buggy table scroll
        <Box height={ 1 } p={ 3 } pt={ 0 } overflow="hidden">
          <Container maxWidth="lg" sx={ { height: 1 } }>
            <LocationHistory whereabouts={ data.data }/>
          </Container>
        </Box>,
      ] }
    />
  )
}
