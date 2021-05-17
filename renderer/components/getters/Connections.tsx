import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas';
import ConnectionHistory from './LocationComponents/ConnectionHistory';
import ConnectionsMap from './LocationComponents/ConnectionsMap';

const LIMIT = 14

const useStyless = makeStyles((theme: Theme) => createStyles({
  whole: {
    overflow: 'hidden',
    height: '90%',
  },
}));

function a11yProps(index:any) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  };
}

export default function Connections({ data }: { data: NonNullable<GetterData<Array<Connection>>> }) {
  const [value, setValue] = React.useState(0);
  const classes = useStyless()

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  const slicedData = data.data.slice(0, LIMIT)

  const getTabContent = () => {
    switch (value) {
      case 0:
        // eslint-disable-next-line no-case-declarations
        // const WhereaboutsMap = await import('./LocationComponents/WhereaboutsMap').then((module) => module.default)
        return <ConnectionsMap connections={ slicedData } />
      case 1:
        return <ConnectionHistory whereabouts={ slicedData } />
      default:
        return undefined
    }
  }

  return (
    <Container>
      <Tabs
        value={ value }
        onChange={ handleChange }
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="World map" icon={ <MapIcon/> } { ...a11yProps(0) } />
        <Tab label="Connection history" icon={ <ListIcon/> } { ...a11yProps(1) } />
      </Tabs>
      <div className={ classes.whole } id={ `simple-tabpanel-${ value }` } aria-labelledby={ `simple-tab-${ value }` }>
        {getTabContent()}
      </div>
    </Container>
  )
}
