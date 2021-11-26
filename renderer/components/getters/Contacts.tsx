import React from 'react'
import { Contact } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { useTranslation } from 'react-i18next'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import ContactTable from './Contacts/ContactTable'

export default function Contacts({ data }: { data: NonNullable<GetterData<Array<Contact>>> }) {
  const { t } = useTranslation('common')

  return (
    <AutoTabs
      tabs={ [
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.CONTACTS }/>,
        <ContactTable contacts={ data.data }/>,
      ] }
    />
  )
}
