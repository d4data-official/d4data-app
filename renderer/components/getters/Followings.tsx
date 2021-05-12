import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Following } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import Communities from './Communities'
import Contacts from './Contacts'
import NoDataAvailable from '../pages/dashboard/components/NoDataAvailable';

interface Props {
  value: any,
  index: any,
  followings: NonNullable<GetterData<Array<Following>>>
}

function ShowCommunities({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const communities = data.data.filter((r) => r.type === 'community').map((row) => row.entity)
  const reformattedFile = {
    data: communities,
    parsedFiles: [],
  }

  if (communities.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box my={ 18 }>
          <NoDataAvailable componentName="Communities"/>
        </Box>
      </Container>
    );
  }
  return (
    <Communities data={ reformattedFile } />
  );
}

function ShowContacts({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const contacts = data.data.filter((r) => r.type === 'contact').map((row) => row.entity)
  const reformattedFile = {
    data: contacts,
    parsedFiles: [],
  }

  if (contacts.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box my={ 18 }>
          <NoDataAvailable componentName="Friends"/>
        </Box>
      </Container>
    );
  }
  return (
    <Contacts data={ reformattedFile } />
  );
}

function TabPanel(props: Props) {
  const { value, index, followings } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${ index }` }
      aria-labelledby={ `simple-tab-${ index }` }
    >
      {
        index === 0 && <ShowCommunities data={ followings }/>
      }
      {
        index === 1 && <ShowContacts data={ followings }/>
      }
    </div>
  )
}

function a11yProps(index:any) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  };
}

export default function Followings({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Tabs
        value={ value }
        onChange={ handleChange }
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Communities" { ...a11yProps(0) } />
        <Tab label="Friends" { ...a11yProps(1) } />
      </Tabs>
      <TabPanel value={ value } index={ 0 } followings={ data }/>
      <TabPanel value={ value } index={ 1 } followings={ data }/>
    </Container>
  )
}
