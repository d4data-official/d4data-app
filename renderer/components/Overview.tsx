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
import useArchiveManager from '../hooks/useArchiveManager'

function computeLogoFromServiceName(serviceName: string) {
  if (serviceName.toUpperCase() === 'FACEBOOK') return (<FacebookIcon/>)
  if (serviceName.toUpperCase() === 'REDDIT') return (<RedditIcon/>)
  // if (serviceName.toUpperCase() === 'DISCORD') return (<Reddit/>)
  if (serviceName.toUpperCase() === 'GOOGLE') return (<GoogleIcon/>)
  return (<UnarchiveIcon/>)
}

function generateTeamNotes() {
  return (
    <div>
      <h2>A note from the team</h2>

      <Card component="fieldset" style={ { borderColor: 'transparent', padding: 15, paddingBottom: 5 } }>
        <Grid container>
          <Grid item>
            <Typography component="legend">GDPR Score (coming soon)</Typography>
            <Rating name="read-only" value={ 0 } disabled readOnly/>
          </Grid>
        </Grid>
        <Grid item>
          <p>This section will help you know more about the services you are using and their data policies.</p>
          <p>D4Data will set a score for each supported services. More to come during the release!</p>
        </Grid>
      </Card>

    </div>
  )
}

export default function Overview() {
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
      <h2>About your archive</h2>
      <Grid container spacing={ 4 }>
        <Grid item xs={ 4 }>
          <MetadataCard
            icon={ archiveMetadata?.service
              ? computeLogoFromServiceName(archiveMetadata?.service)
              : 'Loading...' }
            metadata={ archiveMetadata?.service }
            subtitle="Service"
          />

        </Grid>

        { archiveMetadata?.size && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <UnarchiveIcon/> }
              metadata={ Filesize(archiveMetadata?.size) }
              subtitle="Archive size"
            />
          </Grid>
        ) }

        { archiveCreationDateDuration && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <EventNoteIcon/> }
              metadata={ archiveCreationDateDuration.humanize() }
              subtitle="Archive age"
            />
          </Grid>
        ) }
      </Grid>
      <br/>
      <div>
        { archiveMetadata?.service && generateTeamNotes() }
      </div>
    </Container>
  )
}
