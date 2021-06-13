import { Avatar, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import React from 'react'
import moment from 'moment'
import type { Profile as ProfileType } from '@d4data/archive-lib/dist/src/types/schemas'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import getInitialsFromContact from '../../modules/getInitialsFromContact'

export interface Props {
  data: NonNullable<GetterData<ProfileType>>
}

export default function Profile({ data }: Props) {
  const useStyles = makeStyles((theme) => createStyles({
    avatar: {
      boxShadow: theme.shadows[3],
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  }))
  const classes = useStyles()

  const profile = data.data
  const formattedName = (profile.displayName ?? profile.firstName)
    && profile.lastName && profile.firstName && `${ profile.firstName } ${ profile.lastName }`

  return (
    <Container maxWidth="lg">
      <Avatar alt={ profile.firstName } src={ profile.profilePicture } className={ classes.avatar }>
        { getInitialsFromContact(profile) }
      </Avatar>
      <Grid container spacing={ 4 }>
        <Grid item/>
      </Grid>
      <h1>{ formattedName }</h1>

      <Grid container spacing={ 8 }>
        <Grid item xs={ 1 }/>
      </Grid>
      <Grid container spacing={ 4 }>
        <Grid item xs={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label="Gender"
            defaultValue={ profile.gender }
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
            defaultValue={ profile.displayName ?? formattedName }
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
            defaultValue={ profile.firstName }
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
            defaultValue={ profile.lastName }
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
    </Container>
  )
}
