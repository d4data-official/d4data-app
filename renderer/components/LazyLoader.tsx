import React, { Suspense } from 'react'
import DefaultDisplay from './pages/dashboard/components/DefaultDisplay'
import WithDataFetch from './pages/dashboard/tools/WithDataFetch'

export default function LazyLoader(props: any) {
  const Component = React.lazy(() => import(props.componentName))
  return (
    <Suspense fallback={ <WithDataFetch component={ DefaultDisplay }/> }>
      <WithDataFetch component={ Component }/>
    </Suspense>
  )
}
