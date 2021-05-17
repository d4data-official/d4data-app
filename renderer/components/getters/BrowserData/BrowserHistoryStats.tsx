import { Box, Grid } from '@material-ui/core'
import React, { useMemo } from 'react'
import { BrowserData } from '@d4data/archive-lib'
import HistoryCountCard from './BrowserHistoryStats/HistoryCountCard'
import BrowserDataStats from '../../../modules/stats/BrowserDataStats'
import HistoryWebsiteCountCard from './BrowserHistoryStats/HistoryWebsiteCountCard'
import HistoryDurationCard from './BrowserHistoryStats/HistoryDurationCard'
import HistoryTopWebsitesCard from './BrowserHistoryStats/HistoryTopWebsitesCard'

export interface Props {
  data: BrowserData
}

export default function BrowserHistoryStats({ data }: Props) {
  const browserDataStats = useMemo(() => new BrowserDataStats(data), [data])

  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <Grid container spacing={ 4 }>
        <Grid item>
          <HistoryCountCard browserDataStats={ browserDataStats }/>
        </Grid>
        <Grid item>
          <HistoryWebsiteCountCard browserDataStats={ browserDataStats }/>
        </Grid>
        <Grid item>
          <HistoryDurationCard browserDataStats={ browserDataStats }/>
        </Grid>
        <Grid item>
          <HistoryTopWebsitesCard browserDataStats={ browserDataStats }/>
        </Grid>
      </Grid>
    </Box>
  )
}
