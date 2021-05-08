import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Grid } from '@material-ui/core';

export default function Following(props: any): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const states = props.state;
  const { profile } = props;
  const [open, setOpen] = states;
  const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
      boxShadow: theme.shadows[3],
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  }));
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={ open } onClose={ handleClose } maxWidth="md" fullWidth aria-labelledby="form-dialog-title">
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
              {profile?.firstName?.charAt(0)}
              {profile?.lastName?.charAt(0)}
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
          <Grid item xs={ 1 }/>
          <Grid item xs={ 4 }>
            <TextField
              id="outlined-read-only-input"
              label="First name"
              defaultValue={ profile.firstName }
              fullWidth
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 4 }>
            <TextField
              id="outlined-read-only-input"
              label="Last name"
              defaultValue={ profile?.lastName || profile?.displayName?.includes(' ')
                ? profile?.displayName?.split(' ')
                  .slice(1, profile?.displayName?.length)
                  .toString().replaceAll(',', ' ') : '' }
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
              defaultValue={ profile?.birthday }
              InputLabelProps={ {
                shrink: true,
              } }
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 1 }/>
          <Grid item xs={ 4 }>
            <TextField
              id="outlined-read-only-input"
              label="Username"
              defaultValue={ !(profile?.username) && profile?.displayName?.includes(' ') ? profile?.username : profile?.displayName }
              InputProps={ {
                readOnly: true,
              } }
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 4 }>
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
              defaultValue={ profile.creationDate }
              InputLabelProps={ {
                shrink: true,
              } }
              InputProps={ {
                readOnly: true,
              } }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={ 1 }/>
          <Grid item xs={ 4 }>
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
          <Grid item xs={ 4 }>
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
