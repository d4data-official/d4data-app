import React from 'react'
import { Contact } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import ContactTable from './Contacts/ContactTable'

export default function Friends({ data }: { data: NonNullable<GetterData<Array<Contact>>> }) {
  return (
    <AutoTabs
      tabs={ [
        { label: 'Friends stat', icon: <Timeline/> },
        { label: 'Friends list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.FRIENDS }/>,
        <ContactTable contacts={ data.data }/>,
      ] }
    />
  )
}
