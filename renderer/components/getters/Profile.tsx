import { Avatar, Grid, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import React from 'react'
import moment from 'moment'
import type { Profile as ProfileType } from '@d4data/archive-lib/dist/src/types/schemas'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { useTranslation } from 'react-i18next'
import getInitialsFromContact from '../../modules/getInitialsFromContact'

export interface Props {
  data: NonNullable<GetterData<ProfileType>>
}

export default function Profile({ data }: Props) {
  const { t } = useTranslation('common')

  const profile = data.data
  const formattedName = (profile.displayName ?? profile.firstName)
    && profile.lastName && profile.firstName && `${ profile.firstName } ${ profile.lastName }`

  return (
    <Container maxWidth="lg" sx={ { py: 3 } }>
      <Stack direction="column" spacing={ 2 }>

        <Stack direction="row" alignItems="center" spacing={ 2 }>
          <Avatar
            alt={ profile.firstName }
            src={ profile.profilePicture?.current?.url }
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
              label={ t('gender') }
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
              label={ t('displayName') }
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
              label={ t('firstName') }
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
              label={ t('lastName') }
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
              label={ t('birthday') }
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
              label={ t('username') }
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
              label={ t('nickname') }
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
              label={ t('creationDate') }
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
              label={ t('email') }
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
              label={ t('phone') }
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
