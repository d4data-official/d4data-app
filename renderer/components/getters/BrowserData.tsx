import React, { useState } from 'react'
import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { ColorLens, Extension, History, Settings, Timeline } from '@material-ui/icons'
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
        return <BrowserThemes/>
      default:
        return undefined
    }
  }

  return (
    <Box height={ 1 } width={ 1 } display="flex" flexDirection="column">
      <Typography variant="h4" component="h2" className={ classes.title }>BROWSER DATA</Typography>

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
        </Tabs>

        <Box flexGrow={ 1 }>{ getTabContent() }</Box>
      </Paper>
    </Box>
  )
}
