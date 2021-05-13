import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  AppBar, Container, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';
import Table from './components/Table'
import Map from './components/Map'

const E7 = 10000000

async function resolveLocations(whereabouts: Array<Whereabout>) {
  const result = whereabouts.map(async (whereabout: Whereabout) => {
    const whereaboutCopy = { ...whereabout }
    if (whereaboutCopy.location?.absolutePosition) {
      whereaboutCopy.location.absolutePosition.latitude = whereaboutCopy.location?.absolutePosition?.latitude / E7
          ?? 0
      whereaboutCopy.location.absolutePosition.longitude = whereaboutCopy.location?.absolutePosition?.longitude / E7
          ?? 0
    }
    if (!whereabout.location?.relativePosition && !whereabout.location?.absolutePosition) {
      return whereabout
    }
    if (!whereabout.location?.absolutePosition) {
      const address = whereabout?.location?.relativePosition?.raw
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${ address }&format=json&limit=1`,
      )
      whereaboutCopy.location.absolutePosition = { latitude: 0, longitude: 0 }
      whereaboutCopy.location.absolutePosition.latitude = res?.data?.[0]?.lat
      whereaboutCopy.location.absolutePosition.longitude = res?.data?.[0]?.lon
    }
    return whereaboutCopy
  })
  return Promise.all(result)
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `full-width-tabpanel-${ index }` }
      aria-labelledby={ `full-width-tab-${ index }` }
      { ...other }
      style={ { height: '100%' } }
    >
      {value === index && (
        <Typography component="span" variant="body2" style={ { height: '100%' } }>{children}</Typography>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    overflow: 'hidden',
  },
});

function Menu({ data }: { data: Array<Whereabout> }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const classes = useStyles()
  return (
    <div className={ classes.fullWidth }>
      <AppBar position="static" color="default">
        <Tabs
          value={ value }
          onChange={ handleChange }
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="World Map" icon={ <MapIcon/> }/>
          <Tab label="Table" icon={ <ListIcon/> }/>
        </Tabs>
      </AppBar>
      <TabPanel value={ value } index={ 0 } dir="ltr">
        <Map whereabouts={ data }/>
      </TabPanel>
      <TabPanel value={ value } index={ 1 } dir="ltr">
        <Container maxWidth="xl" style={ { marginTop: '50px' } }>
          <Table whereabouts={ data }/>
        </Container>
      </TabPanel>
    </div>
  )
}

interface Prop {
  data?: Array<Whereabout>,
  parsedFiles?: string
}

function Whereabouts({ data }: { data: Prop }) {
  const [data2, setData] = useState<any>([])
  useEffect(() => {
    setData(data.data?.slice(0, 1))
    resolveLocations(data.data?.slice(0, 1) ?? []).then((locations) => setData(locations))
  }, [data.data?.slice(0, 1)])
  return (
    <>
      <Menu data={ data2 }/>
    </>
  )
}

export default Whereabouts;
