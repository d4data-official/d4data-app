import React from 'react'
import { Contact } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import Getters from '../../../../d4data-archive-lib/dist/src/types/standardizer/Getters'
import ContactTable from './Contacts/ContactTable'

export default function Contacts({ data }: { data: NonNullable<GetterData<Array<Contact>>> }) {
  return (
    <AutoTabs
      tabs={ [
        { label: 'Contacts stat', icon: <Timeline/> },
        { label: 'Contacts devices list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.CONTACTS }/>,
        <ContactTable contacts={ data.data }/>,
      ] }
    />
  )
}
