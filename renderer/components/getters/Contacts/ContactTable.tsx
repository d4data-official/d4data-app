import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Avatar } from '@mui/material'
import { Contact } from '@d4data/archive-lib'
import ContactComponent from './ContactComponent'
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
