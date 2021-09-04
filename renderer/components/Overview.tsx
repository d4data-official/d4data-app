import React, { useEffect, useState, useContext } from 'react'
import Filesize from 'filesize'
import { ArchiveMetaData } from '@d4data/archive-lib'
import { Card, Container, Grid, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import Facebook from '@material-ui/icons/Facebook'
import Reddit from '@material-ui/icons/Reddit'
import EventNoteIcon from '@material-ui/icons/EventNote'
import moment from 'moment'
import MetadataCard from '@components/pages/dashboard/components/MetaDataCard'
import useArchiveManager from '@hooks/useArchiveManager'
import { GlobalContext } from 'renderer/context/Store'
import Trans, { useTranslation } from './Translate'

function computeLogoFromServiceName(serviceName: string) {
  if (serviceName.toUpperCase() === 'FACEBOOK') return (<Facebook fontSize="large"/>)
  if (serviceName.toUpperCase() === 'REDDIT') return (<Reddit fontSize="large"/>)
  // if (serviceName.toUpperCase() === 'DISCORD') return (<Reddit/>)
  // if (serviceName.toUpperCase() === 'GOOGLE') return (<Reddit/>)
  return (<UnarchiveIcon/>)
}

function generateTeamNotes() {
  return (
    <div>
      <h2><Trans page="overview" section="note" /></h2>

      <Card component="fieldset" style={ { borderColor: 'transparent', padding: 15, paddingBottom: 5 } }>
        <Grid container>
          <Grid item>
            <Typography component="legend"><Trans page="overview" section="score" /></Typography>
            <Rating name="read-only" value={ 0 } disabled readOnly/>
          </Grid>
        </Grid>
        <Grid item>
          <p><Trans page="overview" section="noteDescription" /></p>
          <p><Trans page="overview" section="scoreDescription" /></p>
        </Grid>
      </Card>

    </div>
  )
}

export default function Overview() {
  const [archiveMetadata, setArchiveMetadata] = useState<ArchiveMetaData | undefined>()
  const { getArchiveMetadata } = useArchiveManager()
  const { language } = useContext(GlobalContext);
  const translate = useTranslation();

  useEffect(() => {
    getArchiveMetadata()
      .then((metadata) => setArchiveMetadata(metadata))
  }, [])
  return (
    <Container>
      <h2><Trans page="overview" section="about" /></h2>
      <Grid container spacing={ 4 }>
        <Grid item xs={ 4 }>
          <MetadataCard
            icon={ archiveMetadata?.service
              ? computeLogoFromServiceName(archiveMetadata?.service)
              : 'Loading...' }
            metadata={ archiveMetadata?.service }
            subtitle={ translate('overview', 'service') }
          />

        </Grid>

        {archiveMetadata?.size && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <UnarchiveIcon fontSize="large" /> }
              metadata={ Filesize(archiveMetadata?.size) }
              subtitle={ translate('overview', 'size') }
            />
          </Grid>
        )}

        {archiveMetadata?.creationDate && (
          <Grid item xs={ 4 }>
            <MetadataCard
              icon={ <EventNoteIcon fontSize="large" /> }
              metadata={ moment.duration(
                archiveMetadata?.creationDate?.valueOf() / 1000,
              ).locale(language.key).humanize() }
              subtitle={ translate('overview', 'date') }
            />
          </Grid>
        )}
      </Grid>
      <br/>
      <div>
        {archiveMetadata?.service && generateTeamNotes()}
      </div>
    </Container>
  )
}
