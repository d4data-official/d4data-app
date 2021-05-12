import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from './components/Table'
import {
  AppBar, Container, Typography,
} from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Map from './components/Map'
import MUIDataTable from 'mui-datatables';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

async function resolveLocations(whereabouts: Array<Whereabout>) {
  console.log(whereabouts)
  const result = whereabouts?.map(async (whereabout: Whereabout) => {
    console.log('debut')
    console.log(whereabout)

    if (!whereabout.location.relativePosition && !whereabout.location.absolutePosition) {
      console.log('la')
      return whereabout
    }
    if (!whereabout.location.absolutePosition) {
      const address = whereabout?.location?.relativePosition?.raw
      // eslint-disable-next-line max-len
      const res = await axios.get(`https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${ address }&format=json&limit=1`)
      console.log('ici')
      // eslint-disable-next-line no-param-reassign
      whereabout.location.absolutePosition = { latitude: 0, longitude: 0 }
      // eslint-disable-next-line no-param-reassign
      whereabout.location.absolutePosition.latitude = res?.data?.[0]?.lat
      // eslint-disable-next-line no-param-reassign
      whereabout.location.absolutePosition.longitude = res?.data?.[0]?.lon
    }
    if (!whereabout.location.relativePosition) {
      console.log('tf')
      const lat = whereabout?.location?.absolutePosition?.latitude
      const lon = whereabout?.location?.absolutePosition?.longitude
      // eslint-disable-next-line max-len
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${ lat }&lon=${ lon }`)
      // eslint-disable-next-line no-param-reassign
      whereabout.location.relativePosition = {
        address: undefined,
        city: undefined,
        country: undefined,
        raw: '',
        zipcode: undefined,
      }
      // eslint-disable-next-line no-param-reassign
      whereabout.location.relativePosition.raw = res.data.display_name
    }
    console.log('final')
    console.log(whereabout)
    console.log('------------')
    return whereabout
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
    console.log(data)
    setData(data?.data)
    resolveLocations(data?.data ?? []).then((locations) => setData(locations))
  }, [data.data])
  return (
    <>
      <Menu data={ data2 }/>
    </>
  )
}

export default Whereabouts;
