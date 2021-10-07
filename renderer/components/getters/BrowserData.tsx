import React from 'react'
import { Box } from '@material-ui/core'
import { ColorLens, Extension, History, ListAlt, Settings, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { BrowserData as BrowserDataType } from '@d4data/archive-lib/dist/src/types/schemas'
import BrowserHistory from './BrowserData/BrowserHistory'
import BrowserExtensions from './BrowserData/BrowserExtensions'
import BrowserSettings from './BrowserData/BrowserSettings'
import BrowserThemes from './BrowserData/BrowserThemes'
import BrowserSavedForms from './BrowserData/BrowserSavedForms'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

export default function BrowserData({ data }: { data: NonNullable<GetterData<BrowserDataType>> }) {
  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } flexGrow={ 1 }>
      <AutoTabs
        tabs={ [
          { label: 'History stat', icon: <Timeline/> },
          { label: 'History', icon: <History/> },
          { label: 'Extensions', icon: <Extension/> },
          { label: 'Settings', icon: <Settings/> },
          { label: 'Themes', icon: <ColorLens/> },
          { label: 'Forms', icon: <ListAlt/> },
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
