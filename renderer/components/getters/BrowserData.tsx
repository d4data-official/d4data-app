import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@material-ui/core'
import { ColorLens, Extension, History, ListAlt, Settings, Timeline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { BrowserData as BrowserDataType } from '@d4data/archive-lib/dist/src/types/schemas'
import BrowserHistory from './BrowserData/BrowserHistory'
import BrowserHistoryStats from './BrowserData/BrowserHistoryStats'
import BrowserExtensions from './BrowserData/BrowserExtensions'
import BrowserSettings from './BrowserData/BrowserSettings'
import BrowserThemes from './BrowserData/BrowserThemes'
import BrowserSavedForms from './BrowserData/BrowserSavedForms'

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100% + ${ theme.spacing(3) })`,
    width: '100%',
    margin: `-${ theme.spacing(3) }`,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    '& .Mui-selected': {
      background: grey['50'],
    },
    minHeight: 72,
  },
  tabsRoot: {
    justifyContent: 'center',
  },
  tabsScroller: {
    flexGrow: 0,
  },
}))

export default function BrowserData({ data }: { data: NonNullable<GetterData<BrowserDataType>> }) {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState(0)

  const getTabContent = () => {
    switch (currentTab) {
      case 0:
        return <BrowserHistoryStats/>
      case 1:
        return <BrowserHistory data={ data.data.history }/>
      case 2:
        return <BrowserExtensions data={ data.data.extensions }/>
      case 3:
        return <BrowserSettings data={ data.data.preferences }/>
      case 4:
        return <BrowserThemes data={ data.data.theme }/>
      case 5:
        return <BrowserSavedForms data={ data.data.savedForms }/>
      default:
        return undefined
    }
  }

  return (
    <Box className={ classes.root }>
      <Box padding={ 4 } paddingBottom={ 0 }>
        <Tabs
          classes={ { root: classes.tabsRoot, scroller: classes.tabsScroller } }
          className={ classes.tabs }
          value={ currentTab }
          onChange={ (event, newValue) => setCurrentTab(newValue) }
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={ <Timeline/> } label="History stat"/>
          <Tab icon={ <History/> } label="History"/>
          <Tab icon={ <Extension/> } label="Extensions"/>
          <Tab icon={ <Settings/> } label="Settings"/>
          <Tab icon={ <ColorLens/> } label="Themes"/>
          <Tab icon={ <ListAlt/> } label="Forms"/>
        </Tabs>
      </Box>

      <Box flexGrow={ 1 } padding={ 0 } overflow="hidden">{ getTabContent() }</Box>
    </Box>
  )
}
