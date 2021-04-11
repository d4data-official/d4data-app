import React, { useState } from 'react'
import { Tab, Tabs, Typography } from '@material-ui/core'
import { ColorLens, Extension, History, Settings, Timeline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import BrowserHistory from './BrowserData/BrowserHistory'
import BrowserHistoryStats from './BrowserData/BrowserHistoryStats'
import BrowserExtensions from './BrowserData/BrowserExtensions'
import BrowserSettings from './BrowserData/BrowserSettings'
import BrowserThemes from './BrowserData/BrowserThemes'

const useStyles = makeStyles({
  tabs: {
    borderBottom: '1px solid lightgrey',
  },
})

export default function BrowserData() {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState(0)

  const getTabContent = () => {
    switch (currentTab) {
      case 0:
        return <BrowserHistory/>
      case 1:
        return <BrowserHistoryStats/>
      case 2:
        return <BrowserExtensions/>
      case 3:
        return <BrowserSettings/>
      case 4:
        return <BrowserThemes/>
      default:
        return undefined
    }
  }

  return (
    <div>
      <Typography variant="h4" component="h2" align="left">Browser data</Typography>

      <Tabs
        className={classes.tabs}
        value={currentTab}
        onChange={(event, newValue) => setCurrentTab(newValue)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<History/>} label="History"/>
        <Tab icon={<Timeline/>} label="History stat"/>
        <Tab icon={<Extension/>} label="Extensions"/>
        <Tab icon={<Settings/>} label="Settings"/>
        <Tab icon={<ColorLens/>} label="Themes"/>
      </Tabs>

      {getTabContent()}
    </div>
  )
}
