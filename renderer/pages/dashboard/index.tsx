import React, { useEffect, useState } from 'react'
import Filesize from 'filesize';
import type { ArchiveMetaData } from '@d4data/archive-lib';
import { Card, Container, Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import Facebook from '@material-ui/icons/Facebook';
import Reddit from '@material-ui/icons/Reddit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import moment from 'moment';
import ArchiveManager from '../../modules/ArchiveManager';
import MetadataCard from '../../components/pages/dashboard/components/MetaDataCard';

function computeLogoFromServiceName(serviceName: string) {
  if (serviceName.toUpperCase() === 'FACEBOOK') return (<Facebook/>)
  if (serviceName.toUpperCase() === 'REDDIT') return (<Reddit/>)
  // if (serviceName.toUpperCase() === 'DISCORD') return (<Reddit/>)
  // if (serviceName.toUpperCase() === 'GOOGLE') return (<Reddit/>)
  return (<UnarchiveIcon/>)
}

function generateTeamNotes(serviceName: string) {
  return (
    <div>
      <h2>A note from the team</h2>

      <Card component="fieldset" style={ { borderColor: 'transparent', padding: 15, paddingBottom: 5 } }>
        <Grid container >
          <Grid item >
            <Typography component="legend">GDPR Score (coming soon)</Typography>
            <Rating name="read-only" value={ 0 } disabled readOnly />
          </Grid>
        </Grid>
        <Grid item >
          <p>This section will help you know more about the services you are using and their data policies.</p>
          <p>D4Data will set a score for each supported services. More to come during the release!</p>
        </Grid>
      </Card>

    </div>
  )
}

const Dashboard = () => {
  const [archiveMetadata, setArchiveMetadata] = useState<ArchiveMetaData>()

  useEffect(() => {
    ArchiveManager.currentArchive?.getMetadata().then((metadata) => {
      setArchiveMetadata(metadata)
    })
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
        <Grid item xs={ 4 }>
          <MetadataCard
            icon={ <UnarchiveIcon/> }
            metadata={ archiveMetadata?.size ? Filesize(archiveMetadata?.size) : 'Loading...' }
            subtitle="Archive size"
          />
        </Grid>
        <Grid item xs={ 4 }>
          <MetadataCard
            icon={ <EventNoteIcon/> }
            metadata={ archiveMetadata?.creationDate
              ? moment.duration(archiveMetadata?.creationDate?.valueOf() / 100).humanize()
              : 'Loading...' }
            subtitle="Archive age"
          />
        </Grid>
      </Grid>
      <br/>
      <div>
        { archiveMetadata?.service && generateTeamNotes(archiveMetadata?.service) }
      </div>
    </Container>
  )
}

export default Dashboard
