import React from 'react'
import { capitalize } from '@material-ui/core'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import ArchiveManager from '../../../../modules/ArchiveManager'
import NoDataAvailable from '../components/NoDataAvailable'
import Loading from '../components/Loading'

export interface WithDataFetchProps {
  component: any
  componentName: string
}

export default function WithDataFetch({ component, componentName }: WithDataFetchProps) {
  const [data, setData] = React.useState<any>(undefined)
  const Component = component

  React.useEffect(() => {
    setData(undefined)

    const standardizer = ArchiveManager.currentStandardizer
    if (!standardizer) {
      console.info('No standardizer found in Archive Manager')
      return
    }

    const getterName = `get${ capitalize(componentName) }`

    // @ts-ignore
    if (!standardizer[getterName]) {
      throw new Error(`Bad getter name, please rename ${ componentName } component with valid getter name`)
    }

    console.info(`Retrieving data of ${ capitalize(componentName) } getter`)

    // @ts-ignore
    standardizer[getterName]()
      .then((getterData: GetterData<any>) => {
        console.info(`${ capitalize(componentName) } getter data retrieved`)
        setData(getterData)
      })
  }, [componentName])

  if (data === undefined) {
    return (
      <Loading componentName={ capitalize(componentName) } />
    )
  }

  if (data === null) {
    return (
      <NoDataAvailable componentName={ capitalize(componentName) } />
    )
  }

  return (
    <Component data={ data }/>
  )
}
