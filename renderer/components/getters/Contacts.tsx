import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/styles'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Avatar } from '@material-ui/core'
import { Contact } from '@d4data/archive-lib/dist/src/types/schemas'
import Trans from 'components/Translate'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import getInitialsFromContact from '../../modules/getInitialsFromContact'
import ContactComponent from './Contacts/ContactComponent'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

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
          { `${ data.data.length } contacts found` }
        </Typography>
      </Box>
      <ContactComponent show={ open } onClose={ () => setOpen(false) } profile={ clickedProfile }/>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><Trans page="common" section="picture" /></TableCell>
                <TableCell>
                  <Trans page="common" section="name" />
                </TableCell>
                <TableCell><Trans page="common" section="username" /></TableCell>
                <TableCell><Trans page="common" section="email" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row: Contact, idx) => {
                const profile: Contact = {
                  ...row,
                  displayName: row.displayName
                    ?? (row.firstName && row.lastName && `${ row.firstName } ${ row.lastName }`),
                }

                return (
                  <TableRow
                    key={ idx.toString() }
                    sx={ { cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1) !important' } } }
                  >
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
                  </TableRow>
                )
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
