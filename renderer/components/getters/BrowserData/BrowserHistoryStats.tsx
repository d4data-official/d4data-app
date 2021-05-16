import { Grid } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useMemo } from 'react'
import { BrowserData } from '@d4data/archive-lib'
import HistoryCountCard from './BrowserHistoryStats/HistoryCountCard'
import BrowserDataStats from '../../../modules/stats/BrowserDataStats'
import HistoryWebsiteCountCard from './BrowserHistoryStats/HistoryWebsiteCountCard'
import HistoryDurationCard from './BrowserHistoryStats/HistoryDurationCard'

export interface Props {
  data: BrowserData
}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(0),
  },
}))

export default function BrowserHistoryStats({ data }: Props) {
  const classes = useStyles()
  const browserDataStats = useMemo(() => new BrowserDataStats(data), [data])

  return (
    <Grid container spacing={ 4 } className={ classes.root }>
      <Grid item>
        <HistoryCountCard browserDataStats={ browserDataStats }/>
      </Grid>
      <Grid item>
        <HistoryWebsiteCountCard browserDataStats={ browserDataStats }/>
      </Grid>
      <Grid item>
        <HistoryDurationCard browserDataStats={ browserDataStats }/>
      </Grid>
    </Grid>
  )
}
