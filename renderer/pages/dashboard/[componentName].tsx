import React from 'react'
import { useRouter } from 'next/router'
import Case from 'case'
import { fetchComponent } from 'pages-components/dashboard/components'
import WithDataFetch from 'components/pages/dashboard/tools/WithDataFetch'

export default function DashboardComponent() {
  const router = useRouter()
  const componentName = router.query.componentName?.toString()
  const Component = componentName ? fetchComponent(Case.pascal(componentName)) : undefined

  return (
    <WithDataFetch component={Component} componentName={componentName}/>
  )
}
