import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Avatar, Grid } from '@material-ui/core'
import { Contact } from '@d4data/archive-lib/dist/src/types/schemas'
import moment from 'moment'
import getInitialsFromContact from '../../../modules/getInitialsFromContact'
import Center from '../../Center'

export interface Props {
  onClose?: () => void
  show: boolean
  profile: Contact
}

export default function ContactComponent({ show, profile, onClose }: Props) {
  const handleClose = () => {
    onClose?.()
  }

  if (!profile) return <></>

  return (
    <Dialog open={ show } onClose={ handleClose } maxWidth="md" fullWidth>
      <DialogTitle id="form-dialog-title">Contact</DialogTitle>

      <DialogContent sx={ { py: 2 } }>
        <Center sx={ { mb: 3 } }>
          <Avatar
            alt={ profile.firstName }
            src={ profile.profilePicture }
            sx={ {
              boxShadow: (theme) => theme.shadows[3],
              width: (theme) => theme.spacing(16),
              height: (theme) => theme.spacing(16),
            } }
          >
            { getInitialsFromContact(profile) }
          </Avatar>
        </Center>

        <Grid container spacing={ 2 }>

          <Grid item xs={ 4 }>
            <TextField
              label="First name"
              value={ profile?.firstName }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Last name"
              value={ profile?.lastName }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Gender"
              value={ profile?.gender }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Display name"
              value={ profile?.displayName }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Username"
              value={ profile.username }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Nickname"
              value={ profile.nickname }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              value={ moment(new Date(profile.birthday)).format('yyyy-MM-DD') }
              InputLabelProps={ { shrink: true } }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Email"
              value={ profile.email }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Phone"
              value={ profile.phoneNumber }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={ 4 }>
            <TextField
              label="Creation date"
              type="date"
              value={ moment(new Date(profile.creationDate)).format('yyyy-MM-DD') }
              InputLabelProps={ { shrink: true } }
              InputProps={ { readOnly: true } }
              variant="outlined"
              fullWidth
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={ handleClose } color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
