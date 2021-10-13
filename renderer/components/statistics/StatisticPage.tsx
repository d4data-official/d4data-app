import Statistic from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { Box, Grid } from '@mui/material'
import React from 'react'
import StatisticCard, { Props as StatisticCardProps } from './StatisticCard'

export interface Props {
  statistics: Array<Statistic>
  variantProvider?: (statistic: Statistic, index: number) => StatisticCardProps['variant']
}

export default function StatisticPage({ statistics, variantProvider }: Props) {
  return (
    <Box height={ 1 } padding={ 4 } overflow="auto">
      <Grid container spacing={ 4 } justifyContent="center">
        {
          statistics.map((statistic, index) => (
            <Grid item>
              <StatisticCard statistic={ statistic } variant={ variantProvider?.(statistic, index) }/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
