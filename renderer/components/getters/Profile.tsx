import { Avatar, Grid, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import React from 'react'
import moment from 'moment'
import type { Profile as ProfileType } from '@d4data/archive-lib/dist/src/types/schemas'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import getInitialsFromContact from '../../modules/getInitialsFromContact'

export interface Props {
  data: NonNullable<GetterData<ProfileType>>
}

export default function Profile({ data }: Props) {
  const profile = data.data
  const formattedName = (profile.displayName ?? profile.firstName)
    && profile.lastName && profile.firstName && `${ profile.firstName } ${ profile.lastName }`

  return (
    <Container maxWidth="lg" sx={ { py: 3 } }>
      <Stack direction="column" spacing={ 2 }>

        <Stack direction="row" alignItems="center" spacing={ 2 }>
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

          <h1>{ formattedName }</h1>
        </Stack>

        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

          <Grid item xs={ 12 } md={ 3 }>
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

      </Stack>
    </Container>
  )
}
