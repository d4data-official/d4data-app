import { capitalize, Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import TimelineIcon from '@material-ui/icons/Timeline'
import { useMemo } from 'react'
import BrowserDataStats from '../../../../modules/stats/BrowserDataStats'

export interface Props {
  browserDataStats: BrowserDataStats
}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    height: 175,
    width: 350,
    padding: theme.spacing(4),
    background: `linear-gradient(90deg, ${ theme.palette.primary.light } 0%, ${ theme.palette.primary.main } 100%);`,
    color: 'white',
  },
  icon: {
    fontSize: 100,
  },
  value: {
    fontWeight: 100,
  },
  description: {},
}))

export default function HistoryDurationCard({ browserDataStats }: Props) {
  const classes = useStyles()
  const duration = useMemo(() => browserDataStats.getHistoryDuration(), [browserDataStats])

  const getHumanReadableDuration = () => {
    const humanReadableDuration = duration?.humanize(false, { s: 0, m: 0 })
    return humanReadableDuration ? capitalize(humanReadableDuration) : 'Empty history'
  }

  return (
    <Paper className={ classes.root } elevation={ 0 }>
      <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap" style={ { height: '100%' } }>
        <Grid item>
          <Typography variant="h3" className={ classes.value }>
            { getHumanReadableDuration() }
          </Typography>
          <Typography variant="h6" className={ classes.description }>Of history</Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end" style={ { flexBasis: 0 } }>
          <TimelineIcon fontSize="large" className={ classes.icon }/>
        </Grid>
      </Grid>
    </Paper>
  )
}
