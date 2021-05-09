import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { Contact } from '@d4data/archive-lib/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/src/types/standardizer/GetterReturn';
import getInitialsFromContact from '../../modules/getInitialsFromContact'
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
});

export default function Contacts({ data }: { data: NonNullable<GetterData<Array<Contact>>> }) {
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
          {`${ data.data.length } contacts found`}
        </Typography>
      </Box>
      <ContactComponent show={ open } onClose={ () => setOpen(false) } profile={ clickedProfile }/>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Picture</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>E-mail</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row: Contact) => {
                const profile: Contact = {
                  ...row,
                  displayName: row.displayName
                  ?? (row.firstName && row.lastName && `${ row.firstName } ${ row.lastName }`),
                }

                return (
                  <StyledTableRow key={ row.nickname }>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      <Avatar alt={ row.firstName } src={ row.profilePicture }>
                        { getInitialsFromContact(profile) }
                      </Avatar>
                    </TableCell>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { profile.displayName }
                    </TableCell>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { row.username }
                    </TableCell>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { row.email }
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
