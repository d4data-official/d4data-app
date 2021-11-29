import React from 'react'
import { Community } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { useTranslation } from 'react-i18next'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import CommunityTable from './Communities/CommunityTable'

export default function Communities({ data }: { data: NonNullable<GetterData<Array<Community>>> }) {
  const { t } = useTranslation('common')

  return (
    <AutoTabs
      tabs={ [
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.COMMUNITIES }/>,
        <CommunityTable communities={ data.data }/>,
      ] }
    />
  )
}
