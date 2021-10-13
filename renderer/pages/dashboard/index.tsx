import React, { useContext } from 'react'
import useDashboardComponent from '@hooks/useDashboardComponent'
import Loading from 'components/pages/dashboard/components/Loading'
import NoDataAvailable from 'components/pages/dashboard/components/NoDataAvailable'
import Overview from 'components/Overview'
import { GlobalContext } from 'renderer/context/Store'
import RawData from 'components/getters/RawData'
import { useRouter } from 'next/router'
import useArchiveManager from '../../hooks/useArchiveManager'

function Dashboard() {
  const { rawData } = useContext(GlobalContext)
  const { componentName, Component, data } = useDashboardComponent()
  const { currentStandardizer } = useArchiveManager()
  const router = useRouter()

  if (!currentStandardizer && typeof window !== 'undefined') {
    router.push('/home')
  }

  if (!componentName) {
    return (
      <Overview/>
    )
  }

  if (data === undefined || data.componentName !== componentName) {
    return (
      <Loading/>
    )
  }

  if (data.data === null) {
    return (
      <NoDataAvailable/>
    )
  }

  return (
    (rawData && !Component.disableRawData)
      ? <RawData data={ data.data }/>
      : <Component data={ data.data }/>
  )
}

export default Dashboard
