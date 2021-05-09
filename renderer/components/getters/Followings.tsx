import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Following, Contact } from '@d4data/archive-lib/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/src/types/standardizer/GetterReturn';
import moment from 'moment';
import Contacts from './Contacts'
import ContactComponent from './Contacts/ContactComponent'

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
});

interface Props {
  value: any,
  index: any,
  followings: NonNullable<GetterData<Array<Following>>>
}

function ShowCommunity({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [clickedProfile, setProfile] = React.useState<Contact | undefined>()

  const handleClick = (profile: Contact) => {
    setProfile(profile)
    setOpen(true)
  }
  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          {`${ data.data.length } communities found`}
        </Typography>
      </Box>
      <ContactComponent show={ open } onClose={ () => setOpen(false) } profile={ clickedProfile }/>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Joined date</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.data.filter((r) => r.type === 'community').map((row) => {
                const profile = row;
                return (
                  <StyledTableRow key={ row.nickname }>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { profile?.entity?.name }
                    </TableCell>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { profile?.followedSince
                        ? moment(new Date(profile?.creationDate)).format('yyyy-MM-DD')
                        : 'No date provided' }
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
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
      <div>No friends found :/</div>
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
        index === 0 && <ShowCommunity data={ followings }/>
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
