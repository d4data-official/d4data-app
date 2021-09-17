import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Box } from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map'
import ListIcon from '@material-ui/icons/List'
import { createStyles, makeStyles } from '@material-ui/styles'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas'
import ConnectionHistory from './LocationComponents/ConnectionHistory'
import ConnectionsMap from './LocationComponents/ConnectionsMap'
import Getters from '../../../../d4data-archive-lib/dist/src/types/standardizer/Getters'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import { Timeline } from '@material-ui/icons'

const LIMIT = 14

const useStyless = makeStyles(() => createStyles({
  whole: {},
}))

function a11yProps(index: any) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  }
}

export default function Connections({ data }: { data: NonNullable<GetterData<Array<Connection>>> }) {
  const [value, setValue] = React.useState(0)
  const classes = useStyless()

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const slicedData = data.data.slice(0, LIMIT)

  const getTabContent = () => {
    switch (value) {
      case 0:
        return <AutoStatisticPage getter={ Getters.CONNECTIONS }/>
      case 1:
        return <ConnectionsMap connections={ slicedData }/>
      case 2:
        return <ConnectionHistory whereabouts={ slicedData }/>
      default:
        return undefined
    }
  }

  return (
    <Box width={ 1 } display="flex" flexDirection="column" alignItems="center" id="test">
      <Tabs
        value={ value }
        onChange={ handleChange }
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={ <Timeline/> } label="History stat"/>
        <Tab label="World map" icon={ <MapIcon/> } { ...a11yProps(0) } />
        <Tab label="Connection history" icon={ <ListIcon/> } { ...a11yProps(1) } />
      </Tabs>
      <Box
        width={ 1 }
        flexGrow={ 1 }
        className={ classes.whole }
        id={ `simple-tabpanel-${ value }` }
        aria-labelledby={ `simple-tab-${ value }` }
      >
        { getTabContent() }
      </Box>
    </Box>
  )
}
