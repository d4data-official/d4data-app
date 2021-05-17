import React, { useEffect } from 'react'
import { capitalize } from '@material-ui/core'
import Case from 'case'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import ArchiveManager from '../../../../modules/ArchiveManager'
import NoDataAvailable from '../components/NoDataAvailable'
import Loading from '../components/Loading'
import { fetchComponent } from '../components'

export interface WithDataFetchProps {
  componentName: string
}

export default function WithDataFetch({ componentName }: WithDataFetchProps) {
  const [data, setData] = React.useState<{ componentName: string, data: any } | undefined>(undefined)
  const Component: any = fetchComponent(Case.pascal(componentName))

  useEffect(() => {
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
        setData({ componentName, data: getterData })
      })
  }, [componentName])

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
