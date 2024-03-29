import React, { useEffect, useState } from 'react'
import type Statistic from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { StatisticType } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { Box, Zoom } from '@mui/material'
import type Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { StatisticGetterData } from '@d4data/archive-lib/dist/src/types/standardizer/StatisticGetterReturn'
import useArchiveManager from '../../hooks/useArchiveManager'
import Loading from '../pages/dashboard/components/Loading'
import NoData from '../pages/dashboard/components/NoData'
import StatisticPage from './StatisticPage'
import Center from '../Center'

export interface Props {
  getter: Getters
}

const LOADING_MESSAGE = 'Getting statistics...'

const STATISTIC_PRIORITY: Array<StatisticType> = [
  StatisticType.STRING,
  StatisticType.BOOLEAN,
  StatisticType.DURATION,
  StatisticType.NUMBER,
  StatisticType.PERCENTAGE,
  StatisticType.RANKING,
]

/**
 * Wrapper of StatisticPage component with automatic statistics retrieval from the Standardizer.
 * Display loading and no data message. Statistics are sorted by type.
 */
export default function AutoStatisticPage({ getter }: Props) {
  const archiveManager = useArchiveManager()
  const [statistics, setStatistics] = useState<Array<Statistic> | null>()

  useEffect(() => {
    // @ts-ignore
    if (!archiveManager.currentStandardizer?.[`${ getter }Statistics`]) {
      console.error('Invalid statistics getter name:', `${ getter }Statistics`)
    }

    console.info(`[${ getter }Statistics] Retrieving statistics...`)

    // @ts-ignore
    // Dynamically call statistic getter with given getter name
    archiveManager.currentStandardizer?.[`${ getter }Statistics`]?.()
      .then((stat: StatisticGetterData) => {
        const sortedStatistics = stat?.statistics?.sort(
          (stat1, stat2) => STATISTIC_PRIORITY.indexOf(stat1.type) - STATISTIC_PRIORITY.indexOf(stat2.type),
        )

        setStatistics(sortedStatistics ?? null)
      })
      .then(() => console.info(`[${ getter }] Statistics retrieved`))
  }, [])

  if (statistics === undefined) {
    return (
      <Center>
        <Zoom in timeout={ 500 }>
          <Box>
            <Loading title={ LOADING_MESSAGE }/>
          </Box>
        </Zoom>
      </Center>
    )
  }

  if (statistics === null) {
    return (
      <Center>
        <NoData/>
      </Center>
    )
  }

  return (
    <StatisticPage
      statistics={ statistics }
      variantProvider={ (statistic, index, statistics) => (
        index % 2 !== 0 && index !== (statistics.length - 1)
          ? 'outlined'
          : 'contained'
      ) }
    />
  )
}
