import React from 'react'
import { Box } from '@mui/material'
import { ColorLens, Extension, History, ListAlt, Settings, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { BrowserData as BrowserDataType } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import BrowserHistory from './BrowserData/BrowserHistory'
import BrowserExtensions from './BrowserData/BrowserExtensions'
import BrowserSettings from './BrowserData/BrowserSettings'
import BrowserThemes from './BrowserData/BrowserThemes'
import BrowserSavedForms from './BrowserData/BrowserSavedForms'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export default function BrowserData({ data }: { data: NonNullable<GetterData<BrowserDataType>> }) {
  const { t } = useTranslation(['common', 'pages'])

  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: t('common:stat'), icon: <Timeline/> },
          { label: t('pages:browserData.tabs.history'), icon: <History/> },
          { label: t('pages:browserData.tabs.extensions'), icon: <Extension/> },
          { label: t('pages:browserData.tabs.settings'), icon: <Settings/> },
          { label: t('pages:browserData.tabs.themes'), icon: <ColorLens/> },
          { label: t('pages:browserData.tabs.forms'), icon: <ListAlt/> },
        ] }
        tabsContent={ [
          <AutoStatisticPage getter={ Getters.BROWSER_DATA }/>,
          <BrowserHistory data={ data.data.history }/>,
          <BrowserExtensions data={ data.data.extensions }/>,
          <BrowserSettings data={ data.data.preferences }/>,
          <BrowserThemes data={ data.data.theme }/>,
          <BrowserSavedForms data={ data.data.savedForms }/>,
        ] }
      />
    </Box>
  )
}
