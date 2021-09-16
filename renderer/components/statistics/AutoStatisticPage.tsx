import React, { useEffect, useState } from 'react'
import type Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { StatisticGetterData } from '@d4data/archive-lib/dist/src/types/standardizer/StatisticGetterReturn'
import type Statistic from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import useArchiveManager from '../../hooks/useArchiveManager'
import Loading from '../pages/dashboard/components/Loading'
import NoDataAvailable from '../pages/dashboard/components/NoDataAvailable'
import StatisticPage from './StatisticPage'

export interface Props {
  getter: Getters
}

const LOADING_MESSAGE = 'Getting statistics...'

export default function AutoStatisticPage({ getter }: Props) {
  const archiveManager = useArchiveManager()
  const [statistics, setStatistics] = useState<Array<Statistic> | null>()

  useEffect(() => {
    // @ts-ignore
    // Dynamically call statistic getter with given getter name
    archiveManager.currentStandardizer?.[`${ getter }Statistics`]?.()
      .then((stat: StatisticGetterData) => setStatistics(stat?.statistics ?? null))
  }, [])

  if (statistics === undefined) {
    return <Loading title={ LOADING_MESSAGE }/>
  }

  if (statistics === null) {
    return <NoDataAvailable/>
  }

  return (
    <StatisticPage statistics={ statistics }/>
  )
}
