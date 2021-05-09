import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Grid } from '@material-ui/core';
import { Contact } from '@d4data/archive-lib/src/types/schemas';
import moment from 'moment';
import getInitialsFromContact from '../../../modules/getInitialsFromContact'

export interface Props {
  onClose?: () => void
  show: boolean
  profile: Contact
}

export default function ContactComponent({ show, profile, onClose }: Props) {
  const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
      boxShadow: theme.shadows[3],
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  }));
  const classes = useStyles();

  const handleClose = () => {
    onClose?.()
  };

  if (!profile) return <></>

  return (
    <Dialog open={ show } onClose={ handleClose } maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Contact</DialogTitle>
      <DialogContent
        style={
          { overflow: 'hidden' }
        }
      >
        <Grid container spacing={ 4 }>
          <Grid item xs={ 5 }/>
          <Grid item>
            <Avatar alt={ profile.firstName } src={ profile.profilePicture } className={ classes.avatar }>
              { getInitialsFromContact(profile) }
            </Avatar>
          </Grid>
        </Grid>
        <Grid container spacing={ 8 }>
          <Grid item xs={ 1 }/>
        </Grid>
        <Grid container spacing={ 4 }>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Gender"
              defaultValue={ profile?.gender }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Display name"
              defaultValue={ profile?.displayName }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="First name"
              defaultValue={ profile?.firstName }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Last name"
              defaultValue={ profile?.lastName }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={ 4 }>
          <Grid item xs={ 3 }>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              fullWidth
              defaultValue={ moment(new Date(profile.birthday)).format('yyyy-MM-DD') }
              InputLabelProps={ {
                shrink: true,
              } }
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Username"
              defaultValue={ profile.username }
              InputProps={ {
                readOnly: true,
              } }
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Nickname"
              defaultValue={ profile.nickname }
              InputProps={ {
                readOnly: true,
              } }
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={ 4 }>
          <Grid item xs={ 3 }>
            <TextField
              id="date"
              label="Creation date"
              type="date"
              fullWidth
              defaultValue={ moment(new Date(profile.creationDate)).format('yyyy-MM-DD') }
              InputLabelProps={ {
                shrink: true,
              } }
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Email"
              defaultValue={ profile.email }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 3 }>
            <TextField
              id="outlined-read-only-input"
              label="Phone"
              defaultValue={ profile.phoneNumber }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
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
  );
}
