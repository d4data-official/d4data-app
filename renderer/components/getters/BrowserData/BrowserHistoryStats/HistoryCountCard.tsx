import { Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import LanguageIcon from '@material-ui/icons/Language'
import numeral from 'numeral'
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

export default function HistoryCountCard({ browserDataStats }: Props) {
  const classes = useStyles()

  const getHumanReadableCount = (value: number) => numeral(value).format(value > 1000 ? '0.0a' : '0a')

  return (
    <Paper className={ classes.root } elevation={ 2 }>
      <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={ { height: '100%' } }>
        <Grid item>
          <Typography variant="h3" className={ classes.value }>
            { getHumanReadableCount(browserDataStats.historyCount) }
          </Typography>
          <Typography variant="h6" className={ classes.description }>History entries</Typography>
        </Grid>
        <Grid item container alignItems="center" justify="flex-end" style={ { flexBasis: 0 } }>
          <LanguageIcon fontSize="large" className={ classes.icon }/>
        </Grid>
      </Grid>
    </Paper>
  )
}
