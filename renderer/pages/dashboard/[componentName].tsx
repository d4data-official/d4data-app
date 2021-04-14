import React from 'react'
import { useRouter } from 'next/router';
import Case from 'case'
import { fetchComponent } from 'pages-components/dashboard/components'
import WithDataFetch from 'components/pages/dashboard/tools/WithDataFetch';

export default function DashboardComponent() {
  const router = useRouter();
  const { componentName } = router.query
  const Component = fetchComponent(Case.pascal(componentName.toString()))

  return (
    <WithDataFetch component={Component} />
  )
}
