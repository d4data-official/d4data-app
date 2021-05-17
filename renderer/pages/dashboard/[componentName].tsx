import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import WithDataFetch from 'components/pages/dashboard/tools/WithDataFetch'

export default function DashboardComponent() {
  const router = useRouter()
  const componentName = router.query.componentName?.toString()

  useEffect(() => {
    if (!componentName) router.push('/dashboard')
  }, [componentName])

  if (!componentName) {
    return (<></>)
  }

  return (
    <WithDataFetch componentName={ componentName }/>
  )
}
