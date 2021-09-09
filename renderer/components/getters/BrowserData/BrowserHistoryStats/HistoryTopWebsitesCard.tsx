import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import { useMemo } from 'react'
import { Theme } from '@material-ui/core/styles'
import BrowserDataStats from '../../../../modules/stats/BrowserDataStats'

export interface Props {
  browserDataStats: BrowserDataStats
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: 350,
    width: 700 + 32,
    padding: theme.spacing(4),
    background: `linear-gradient(90deg, ${ theme.palette.primary.light } 0%, ${ theme.palette.primary.main } 100%);`,
    color: 'white',
  },
  icon: {
    fontSize: 200,
  },
  website: {
    marginBottom: 4,
  },
  count: {
    padding: '0 4px',
    marginRight: 6,
    background: 'white',
    color: theme.palette.primary.main,
  },
  bar: {
    background: 'white',
  },
  domain: {
    fontWeight: 100,
  },
}))

export default function HistoryTopWebsitesCard({ browserDataStats }: Props) {
  const classes = useStyles()
  const topWebsites = useMemo(() => browserDataStats.getHistoryTopWebsites(5), [browserDataStats])

  return (
    <Paper className={ classes.root } elevation={ 0 }>
      <Grid
        container
        spacing={ 2 }
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
        style={ { height: '100%' } }
      >
        <Grid item xs={ 6 }>
          { topWebsites.websites.map((website) => (
            <Grid container alignItems="center" key={ website.domain } className={ classes.website }>
              <Grid item>
                <Typography variant="h6" className={ classes.count }>{ website.count }</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={ classes.domain }>{ website.domain }</Typography>
              </Grid>
              <Grid item xs={ 12 }>
                <Box height={ 2 } width={ `${ (website.count / topWebsites.max) * 100 }%` } className={ classes.bar }/>
              </Grid>
            </Grid>
          )) }

          <Box marginTop={ 2 }>
            <Typography variant="h6">Top websites</Typography>
          </Box>
        </Grid>

        <Grid item container alignItems="center" justifyContent="flex-end" style={ { flexBasis: 0 } }>
          <FormatListNumberedIcon fontSize="large" className={ classes.icon }/>
        </Grid>
      </Grid>
    </Paper>
  )
}
