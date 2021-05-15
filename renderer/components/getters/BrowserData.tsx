import React, { useState } from 'react'
import { Box, Paper, Tab, Tabs } from '@material-ui/core'
import { ColorLens, Extension, History, ListAlt, Settings, Timeline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { BrowserData as BrowserDataType } from '@d4data/archive-lib/dist/src/types/schemas'
import { grey } from '@material-ui/core/colors'
import BrowserHistory from './BrowserData/BrowserHistory'
import BrowserHistoryStats from './BrowserData/BrowserHistoryStats'
import BrowserExtensions from './BrowserData/BrowserExtensions'
import BrowserSettings from './BrowserData/BrowserSettings'
import BrowserThemes from './BrowserData/BrowserThemes'
import BrowserSavedForms from './BrowserData/BrowserSavedForms'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 100,
    marginBottom: theme.spacing(2),
  },
  tabs: {
    background: grey[300],
    borderBottom: '1px solid lightgrey',
    '& .Mui-selected': {
      background: grey['50'],
    },
    minHeight: 72,
  },
}))

export default function BrowserData({ data }: { data: NonNullable<GetterData<BrowserDataType>> }) {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState(0)

  const getTabContent = () => {
    switch (currentTab) {
      case 0:
        return <BrowserHistory data={ data.data.history }/>
      case 1:
        return <BrowserHistoryStats/>
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
    <Paper className={ classes.paper }>
      <Tabs
        className={ classes.tabs }
        value={ currentTab }
        onChange={ (event, newValue) => setCurrentTab(newValue) }
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={ <History/> } label="History"/>
        <Tab icon={ <Timeline/> } label="History stat"/>
        <Tab icon={ <Extension/> } label="Extensions"/>
        <Tab icon={ <Settings/> } label="Settings"/>
        <Tab icon={ <ColorLens/> } label="Themes"/>
        <Tab icon={ <ListAlt/> } label="Forms"/>
      </Tabs>

      <Box flexGrow={ 1 } overflow="hidden">{ getTabContent() }</Box>
    </Paper>
  )
}
