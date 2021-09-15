import React, { useEffect, useState } from 'react'
import Statistic from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import useArchiveManager from '../../../hooks/useArchiveManager'
import Loading from '../../pages/dashboard/components/Loading'
import StatisticPage from '../../statistics/StatisticPage'

const LOADING_MESSAGE = 'Getting statistics...'

export default function BrowserHistoryStats() {
  const archiveManager = useArchiveManager()

  const [statistics, setStatistics] = useState<Array<Statistic>>()

  useEffect(() => {
    archiveManager.currentStandardizer?.getBrowserDataStatistics()
      .then((stat) => setStatistics(stat?.statistics ?? []))
  }, [])

  if (!statistics) {
    return <Loading title={ LOADING_MESSAGE }/>
  }

  return (
    <StatisticPage
      statistics={ statistics }
    />
  )
}
