import { useRouter } from 'next/router';
import React from 'react'

export interface WithDataFetchProps {
  component: any
}

const loadData = (componentName: string, cb: Function) => {
  // here insert ipc tools to load the correct data
  cb({
    componentName,
  })
}

export default function WithDataFetch({ component }: WithDataFetchProps) {
  const router = useRouter();
  const [data, setData] = React.useState<any>(undefined)
  const Component = component

  React.useEffect(() => {
    loadData((router.query.componentName as string).split('/').pop().toString(), (newData: any) => {
      setData(newData)
    })
    router.events.on('routeChangeComplete', (componentName) => {
      loadData(componentName.split('/').pop().toString(), (newData: any) => {
        setData(newData)
      })
    })
  }, [])

  return (
    <Component data={data} />
  )
}
