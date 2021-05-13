import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  AppBar, Container, Typography,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';

const E7 = 10000000

async function resolveLocations(whereabouts: Array<Connection>) {
  console.log(whereabouts)
  const result = whereabouts.map(async (whereabout: Connection) => {
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

function Table({ connexions }: { connexions: Array<Connection> }) {
  const data = connexions.map((location: Connection) => [
    location?.ipAddress ?? '', location?.timestamp?.toString() ?? '', location?.location?.relativePosition?.raw ?? '',
    location?.browser, location?.location?.absolutePosition?.latitude ?? '',
    location?.location?.absolutePosition?.longitude ?? ''])
  return (
    <>
      <MUIDataTable
        title="Connexions"
        data={ data }
        columns={ ['IP', 'Date', 'Address', 'Browser', 'Latitude', 'Longitude'] }
        options={ {
          selectableRowsHeader: false,
          selectableRowsOnClick: false,
          selectableRowsHideCheckboxes: true,
        } }
      />
    </>
  )
}

async function imports2({ connexions }: { connexions: Array<Connection> }) {
  const {
    Marker, Popup,
  } = await import('react-leaflet')
  return (
    <>
      {connexions.filter((location: any) => location.location?.absolutePosition !== undefined)
        .map((location: any, i: Number) => {
          const position = location.location?.absolutePosition
          return (
            <Marker key={ i.toString() } position={ [position.latitude, position.longitude] }>
              <Popup>
                <b>{location?.ipAddress ?? ''}</b>
                <br/>
                {location?.location?.relativePosition?.raw ?? ''}
                <br/>
                <b><small>{location?.timestamp?.toString()}</small></b>
                {' '}
                <br/>
                <small>
                  {position.latitude}
                  ,
                  {' '}
                  {position.longitude}
                </small>
                {' '}
                <br/>
              </Popup>
            </Marker>
          )
        })}
    </>
  )
}

function Markers({ connexions }: { connexions: Array<Connection> }) {
  const [MapComp, setMapComp] = useState(<>Loading...</>)
  useEffect(() => {
    imports2({ connexions }).then((html) => setMapComp(html))
  }, [])
  return MapComp
}

async function imports({ connexions }: { connexions: Array<Connection> }) {
  const {
    TileLayer, MapContainer,
  } = await import('react-leaflet')

  return (
    <div style={ { display: 'flex', height: '100%' } }>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div style={ { display: 'flex', flexGrow: 1 } }>
        <MapContainer
          center={ [51.505, -0.09] }
          zoom={ 3 }
          scrollWheelZoom
          style={ { height: '100%', width: '100%' } }
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers connexions={ connexions ?? [] }/>
        </MapContainer>
      </div>
    </div>
  )
}

function Map({ connexions }: { connexions: Array<Connection> }) {
  const [MapComp, setMapComp] = useState(<>Loading...</>)
  useEffect(() => {
    imports({ connexions }).then((html) => setMapComp(html))
  }, [])
  return MapComp
}

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    overflow: 'hidden',
  },
});

function Menu({ data }: { data: Array<Connection> }) {
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
        <Map connexions={ data }/>
      </TabPanel>
      <TabPanel value={ value } index={ 1 } dir="ltr">
        <Container maxWidth="xl" style={ { marginTop: '50px' } }>
          <Table connexions={ data }/>
        </Container>
      </TabPanel>
    </div>
  )
}

interface Prop {
  data: Array<Connection>,
  parsedFiles?: string
}

function Connexions({ data }: { data: Prop }) {
  const [data2, setData] = useState<any>([])
  useEffect(() => {
    setData(data.data?.slice(0, 1))
    resolveLocations(data.data?.slice(0, 1)).then((locations) => setData(locations))
  }, [data.data?.slice(0, 1)])
  return (
    <>
      <Menu data={ data2 }/>
    </>
  )
}

export default Connexions;
