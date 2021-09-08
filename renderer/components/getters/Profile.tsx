import { Avatar, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { createStyles, makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import React from 'react'
import moment from 'moment'
import { useCommonTranslation } from 'components/Translate'
import type { Profile as ProfileType } from '@d4data/archive-lib/dist/src/types/schemas'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import getInitialsFromContact from '../../modules/getInitialsFromContact'

export interface Props {
  data: NonNullable<GetterData<ProfileType>>
}

export default function Profile({ data }: Props) {
  const translate = useCommonTranslation();
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
      <Grid item xs={ 12 }>
        <Avatar alt={ profile.firstName } src={ profile.profilePicture } className={ classes.avatar }>
          { getInitialsFromContact(profile) }
        </Avatar>
      </Grid>

      <Grid item xs={ 12 }>
        <h1>{ formattedName }</h1>
      </Grid>

      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('gender') }
            defaultValue={ profile.gender }
            fullWidth
            InputProps={ {
              readOnly: true,
            } }
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('displayName') }
            defaultValue={ profile.displayName ?? formattedName }
            fullWidth
            InputProps={ {
              readOnly: true,
            } }
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('firstName') }
            defaultValue={ profile.firstName }
            fullWidth
            InputProps={ {
              readOnly: true,
            } }
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('lastName') }
            defaultValue={ profile.lastName }
            fullWidth
            InputProps={ {
              readOnly: true,
            } }
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="date"
            label={ translate('birthday') }
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

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('username') }
            defaultValue={ profile.username }
            InputProps={ {
              readOnly: true,
            } }
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('nickname') }
            defaultValue={ profile.nickname }
            InputProps={ {
              readOnly: true,
            } }
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="date"
            label={ translate('creationDate') }
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

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('email') }
            defaultValue={ profile.email }
            placeholder="exemple@email.com"
            fullWidth
            InputProps={ {
              readOnly: true,
            } }
            variant="outlined"
          />
        </Grid>

        <Grid item xs={ 12 } md={ 3 }>
          <TextField
            id="outlined-read-only-input"
            label={ translate('phone') }
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
