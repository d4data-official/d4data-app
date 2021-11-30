import Statistic, { StatisticType } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { Grid, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import StatisticCard, { BIG_CARD_TYPES, Props as StatisticCardProps } from './StatisticCard'

export interface Props {
  statistics: Array<Statistic>
  variantProvider?: (statistic: Statistic, index: number, statistics: Array<Statistic>) => StatisticCardProps['variant']
}

export default function StatisticPage({ statistics, variantProvider }: Props) {
  const smallStat = useMemo(() => statistics.filter((statistic) => !BIG_CARD_TYPES.includes(statistic.type)), [])

  const bigStat = useMemo(() => statistics.filter((statistic) => BIG_CARD_TYPES.includes(statistic.type)), [])

  return (
    <Stack height={ 1 } padding={ 4 } spacing={ 4 } overflow="auto">
      <Grid container spacing={ 4 } justifyContent="center">
        {
          smallStat.map((statistic, index) => (
            <Grid item key={ statistic.name }>
              <StatisticCard statistic={ statistic } variant={ variantProvider?.(statistic, index, smallStat) }/>
            </Grid>
          ))
        }
      </Grid>

      <Grid container spacing={ 4 } justifyContent="center">
        {
          bigStat.map((statistic, index) => (
            <Grid item key={ statistic.name }>
              <StatisticCard statistic={ statistic } variant={ variantProvider?.(statistic, index, bigStat) }/>
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  )
}
