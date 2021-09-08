import { Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import AssignmentIcon from '@material-ui/icons/Assignment'
import BrowserDataStats from '../../../../modules/stats/BrowserDataStats'

export interface Props {
  browserDataStats: BrowserDataStats
}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    height: 175,
    width: 350,
    padding: theme.spacing(4),
    color: theme.palette.primary.main,
    border: `3px solid ${ theme.palette.primary.main }`,
  },
  icon: {
    fontSize: 100,
  },
  value: {
    fontWeight: 100,
  },
  description: {},
}))

export default function HistoryWebsiteCountCard({ browserDataStats }: Props) {
  const classes = useStyles()

  return (
    <Paper className={ classes.root } elevation={ 2 }>
      <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap" style={ { height: '100%' } }>
        <Grid item>
          <Typography variant="h3" className={ classes.value }>
            { browserDataStats.historyUniqueWebsitesCount }
          </Typography>
          <Typography variant="h6" className={ classes.description }>Visited websites</Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end" style={ { flexBasis: 0 } }>
          <AssignmentIcon fontSize="large" className={ classes.icon }/>
        </Grid>
      </Grid>
    </Paper>
  )
}
