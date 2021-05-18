import React from 'react'
import { capitalize } from '@material-ui/core'
import useDashboardComponent from '@hooks/useDashboardComponent'
import Loading from 'components/pages/dashboard/components/Loading'
import NoDataAvailable from 'components/pages/dashboard/components/NoDataAvailable'
import Overview from 'components/Overview'

function Dashboard() {
  const { componentName, Component, data } = useDashboardComponent();

  if (!componentName) {
    return (
      <Overview/>
    )
  }

  if (data === undefined || data.componentName !== componentName) {
    return (
      <Loading componentName={ capitalize(componentName) }/>
    )
  }

  if (data.data === null) {
    return (
      <NoDataAvailable componentName={ capitalize(componentName) }/>
    )
  }

  return (
    <Component data={ data.data }/>
  )
}

export default Dashboard
