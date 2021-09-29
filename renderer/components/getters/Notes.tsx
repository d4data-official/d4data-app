import React from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Divider, Grid } from '@material-ui/core'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Note } from '@d4data/archive-lib/dist/src/types/schemas'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import AutoTabs from '../AutoTabs'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
})

export interface Props {
  data: NonNullable<GetterData<Array<Note>>>
}

export default function DisplayNotes({ data }: Props) {
  const classes = useStyles()

  const Notes = (
    <div>
      <h2>{ data.data.length } notes</h2>
      <Grid container xs={ 12 } spacing={ 2 }>
        {
          data.data.map((note) => (
            <Grid item xs={ 4 }>
              <Card className={ classes.root }>
                <CardContent>
                  <Typography variant="h5" className={ classes.title } gutterBottom>
                    { note.title ?? 'Unnamed task' }
                  </Typography>
                  <Typography variant="body2" component="h2">
                    { note.creationDate
                      ? `${ moment.duration(note.creationDate.valueOf() / 10).humanize() } ago`
                      : 'No date provided' }
                  </Typography>
                  <Typography variant="body1" component="p">
                    { note.content ?? 'Empty note' }
                  </Typography>
                </CardContent>
                <Divider/>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )

  return (
    <AutoTabs
      tabs={ [
        { label: 'Notes stat', icon: <Timeline/> },
        { label: 'Notes list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.NOTES }/>,
        Notes,
      ] }
    />
  )
}
