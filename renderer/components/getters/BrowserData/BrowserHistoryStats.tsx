import { Box, Grid, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import { BrowserData } from '@d4data/archive-lib'
import HistoryCountCard from './BrowserHistoryStats/HistoryCountCard'
import BrowserDataStats from '../../../modules/stats/BrowserDataStats'
import HistoryWebsiteCountCard from './BrowserHistoryStats/HistoryWebsiteCountCard'
import HistoryDurationCard from './BrowserHistoryStats/HistoryDurationCard'
import HistoryTopWebsitesCard from './BrowserHistoryStats/HistoryTopWebsitesCard'
import SharableContent from '../../SharableContent'

export interface Props {
  data: BrowserData
}

export default function BrowserHistoryStats({ data }: Props) {
  const theme = useTheme()
  const browserDataStats = useMemo(() => new BrowserDataStats(data), [data])

  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <Grid container spacing={ 4 } justifyContent="center">
        <Grid item>
          <SharableContent menuIconColor="white">
            <HistoryCountCard browserDataStats={ browserDataStats }/>
          </SharableContent>
        </Grid>
        <Grid item>
          <SharableContent menuIconColor={ theme.palette.primary.main }>
            <HistoryWebsiteCountCard browserDataStats={ browserDataStats }/>
          </SharableContent>
        </Grid>
        <Grid item>
          <SharableContent menuIconColor="white">
            <HistoryDurationCard browserDataStats={ browserDataStats }/>
          </SharableContent>
        </Grid>
        <Grid item>
          <SharableContent menuIconColor="white">
            <HistoryTopWebsitesCard browserDataStats={ browserDataStats }/>
          </SharableContent>
        </Grid>
      </Grid>
    </Box>
  )
}
