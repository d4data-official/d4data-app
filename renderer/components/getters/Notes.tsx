import React from 'react'
import moment from 'moment'
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardHeader, Divider, Grid } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { Box } from '@mui/system'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Note } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
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
  const { t } = useTranslation(['common', 'pages'])

  const classes = useStyles()

  const getFormattedTime = (date: Note['creationDate']): string | undefined => {
    if (!date) {
      return undefined
    }

    return t('common:ago', {
      time: moment.duration(new Date().valueOf() - date.valueOf()).humanize(),
    })
  }

  const Notes = (
    <Box p={ 3 } pt={ 0 }>
      <h2>{ t('pages:notes.title', { count: data.data.length }) }</h2>

      <Grid container xs={ 12 } spacing={ 2 }>
        {
          data.data.map((note) => (
            <Grid item xs={ 4 }>
              <Card className={ classes.root }>
                <CardContent>
                  <CardHeader
                    title={ note.title }
                    subheader={ getFormattedTime(note.creationDate) }
                  />

                  <CardContent>
                    { note.content && <Typography variant="body1" component="p">{ note.content }</Typography> }
                  </CardContent>
                </CardContent>
                <Divider/>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )

  return (
    <AutoTabs
      tabs={ [
        { label: t('common:stat'), icon: <Timeline/> },
        { label: t('common:list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.NOTES }/>,
        Notes,
      ] }
    />
  )
}
