import React, { useEffect, useState } from 'react'
import { StatisticType } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import type Statistic from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import type Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { StatisticGetterData } from '@d4data/archive-lib/dist/src/types/standardizer/StatisticGetterReturn'
import useArchiveManager from '../../hooks/useArchiveManager'
import Loading from '../pages/dashboard/components/Loading'
import NoDataAvailable from '../pages/dashboard/components/NoDataAvailable'
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
        <Loading title={ LOADING_MESSAGE }/>
      </Center>
    )
  }

  if (statistics === null) {
    return (
      <Center>
        <NoDataAvailable/>
      </Center>
    )
  }

  return (
    <StatisticPage statistics={ statistics }/>
  )
}
