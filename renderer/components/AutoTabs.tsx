import { Box, Tab, TabProps, Tabs } from '@material-ui/core'
import React, { ReactNode } from 'react'

export interface Props {
  tabs: Array<TabProps>
  tabsContent: Array<ReactNode>
}

export default function AutoTabs({ tabs, tabsContent }: Props) {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)

  const handleTabChange = (event: any, newTabIndex: any) => {
    setCurrentTabIndex(newTabIndex)
  }

  return (
    <Box height={ 1 } width={ 1 } display="flex" flexDirection="column" alignItems="center">
      <Tabs
        value={ currentTabIndex }
        onChange={ handleTabChange }
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={ { minHeight: 72 } }
      >
        { tabs.map((tabProps) => <Tab { ...tabProps }/>) }
      </Tabs>

      <Box width={ 1 } flexGrow={ 1 } overflow="auto">
        { tabsContent[currentTabIndex] }
      </Box>
    </Box>
  )
}
