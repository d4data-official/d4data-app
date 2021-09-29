import React from 'react'
import MapIcon from '@material-ui/icons/Map'
import ListIcon from '@material-ui/icons/List'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
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
        <LocationHistory whereabouts={ data.data }/>,
      ] }
    />
  )
}
