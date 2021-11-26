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
import { useTranslation } from 'react-i18next'
import ContactComponent from './ContactComponent'
import getInitialsFromContact from '../../../modules/getInitialsFromContact'

export interface Props {
  contacts: Array<Contact>
}

export default function ContactTable({ contacts }: Props) {
  const { t } = useTranslation(['common', 'contactTable'])

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
          { t('common:entry', { count: contacts.length }) }
        </Typography>
      </Box>

      <ContactComponent
        show={ open }
        onClose={ () => setOpen(false) }
        profile={ clickedProfile }
      />

      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>{ t('contactTable:headers.picture') }</TableCell>
                <TableCell>{ t('contactTable:headers.name') }</TableCell>
                <TableCell>{ t('contactTable:headers.username') }</TableCell>
                <TableCell>{ t('contactTable:headers.email') }</TableCell>
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
