import React, { useEffect, useState } from 'react'
import Filesize from 'filesize'
import { ArchiveMetaData } from '@d4data/archive-lib'
import { Card, Container, Grid, Typography } from '@mui/material'
import Rating from '@mui/lab/Rating'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import FacebookIcon from '@mui/icons-material/Facebook'
import RedditIcon from '@mui/icons-material/Reddit'
import GoogleIcon from '@mui/icons-material/Google'
import EventNoteIcon from '@mui/icons-material/EventNote'
import moment from 'moment'
import MetadataCard from '@components/pages/dashboard/components/MetaDataCard'
import { useTranslation } from 'react-i18next'
import Services from '@d4data/archive-lib/dist/src/types/Services'
import useArchiveManager from '../hooks/useArchiveManager'

function computeLogoFromServiceName(service: Services | undefined) {
  if (service === Services.FACEBOOK) return (<FacebookIcon/>)
  if (service === Services.REDDIT) return (<RedditIcon/>)
  if (service === Services.GOOGLE) return (<GoogleIcon/>)
  return (<UnarchiveIcon/>)
}

export default function Overview() {
  const { t } = useTranslation(['common', 'overview'])

  const [archiveMetadata, setArchiveMetadata] = useState<ArchiveMetaData | undefined>()
  const { getArchiveMetadata, restoredArchive } = useArchiveManager()

  const archiveCreationDate = restoredArchive?.date ?? archiveMetadata?.creationDate
  const archiveCreationDateDuration = archiveCreationDate
    && moment.duration(new Date().valueOf() - archiveCreationDate.valueOf(), 'millisecond')

  useEffect(() => {
    getArchiveMetadata()
      .then((metadata) => setArchiveMetadata(metadata))
  }, [])

  return (
    <Container>
      <h2>{ t('overview:about') }</h2>
      <Grid container spacing={ 4 }>
        <Grid item xs={ 4 }>
          <MetadataCard
            icon={ computeLogoFromServiceName(archiveMetadata?.service) }
            metadata={ archiveMetadata?.service }
            subtitle={ t('common:service') }
          />

        </Grid>

        { archiveMetadata?.size && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <UnarchiveIcon/> }
              metadata={ Filesize(archiveMetadata?.size) }
              subtitle={ t('overview:size') }
            />
          </Grid>
        ) }

        { archiveCreationDateDuration && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <EventNoteIcon/> }
              metadata={ archiveCreationDateDuration.humanize() }
              subtitle={ t('overview:age') }
            />
          </Grid>
        ) }
      </Grid>

      <br/>

      { archiveMetadata?.service && (
        <div>
          <h2>{ t('overview:note') }</h2>

          <Card component="fieldset" style={ { borderColor: 'transparent', padding: 15, paddingBottom: 5 } }>
            <Grid container>
              <Grid item>
                <Typography component="legend">{ t('overview:score') }</Typography>
                <Rating name="read-only" value={ 0 } disabled readOnly/>
              </Grid>
            </Grid>
            <Grid item>
              <p>{ t('overview:noteDescription') }</p>
              <p>{ t('overview:scoreDescription') }</p>
            </Grid>
          </Card>

        </div>
      ) }
    </Container>
  )
}
