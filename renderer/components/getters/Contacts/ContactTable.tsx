import { Contact } from '../../../../../d4data-archive-lib'
import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ContactComponent from './ContactComponent'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { Avatar } from '@material-ui/core'
import getInitialsFromContact from '../../../modules/getInitialsFromContact'

export interface Props {
  contacts: Array<Contact>
}

export default function ContactTable({ contacts }: Props) {
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
          { `${ contacts.length } contacts found` }
        </Typography>
      </Box>
      <ContactComponent show={ open } onClose={ () => setOpen(false) } profile={ clickedProfile }/>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { contacts.map((contact, idx) => {
                const profile: Contact = {
                  ...contact,
                  displayName: contact.displayName
                    ?? (contact.firstName && contact.lastName && `${ contact.firstName } ${ contact.lastName }`),
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
                      <Avatar alt={ contact.firstName } src={ contact.profilePicture }>
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
                      { contact.username }
                    </TableCell>
                    <TableCell
                      onClick={ () => handleClick(profile) }
                      component="th"
                      scope="row"
                    >
                      { contact.email }
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
