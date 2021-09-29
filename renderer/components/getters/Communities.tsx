import React from 'react'
import { Community } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import CommunityTable from './Communities/CommunityTable'

export default function Communities({ data }: { data: NonNullable<GetterData<Array<Community>>> }) {
  return (
    <AutoTabs
      tabs={ [
        { label: 'Communities stat', icon: <Timeline/> },
        { label: 'Communities list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.COMMUNITIES }/>,
        <CommunityTable communities={ data.data }/>,
      ] }
    />
  )
}
