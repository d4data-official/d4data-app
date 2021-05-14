import React from 'react'
import { capitalize } from '@material-ui/core'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import ArchiveManager from '../../../../modules/ArchiveManager'
import NoDataAvailable from '../components/NoDataAvailable'
import Loading from '../components/Loading'
import DisplayRawData from './DisplayRowData'

export interface WithDataFetchProps {
  component: any
  componentName: string
  componentProps?: any
  standardizeArgs?: Array<any>
}

export default function WithDataFetch({
  component, componentName, componentProps, standardizeArgs,
}: WithDataFetchProps) {
  const [data, setData] = React.useState<any>(undefined)
  const [rawData, setRawData] = React.useState<any>();
  const [raw, setRaw] = React.useState(false);

  const Component = component

  React.useEffect(() => {
    setData(undefined)
    setRawData(undefined)

    const standardizer = ArchiveManager.currentStandardizer
    if (!standardizer) {
      console.info('No standardizer found in Archive Manager')
      setData(null);
      return
    }

    const getterName = `get${ capitalize(componentName) }`

    // @ts-ignore
    if (!standardizer[getterName]) {
      throw new Error(`Bad getter name, please rename ${ componentName } component with valid getter name`)
    }

    console.info(`Retrieving data of ${ capitalize(componentName) } getter`)

    // @ts-ignore
    standardizer[getterName](...(standardizeArgs ?? []))
      .then((getterData: GetterData<any>) => {
        console.info(`${ capitalize(componentName) } getter data retrieved`)
        setData(getterData)
      })
  }, [componentName, standardizeArgs]);

  const handleRawData = React.useCallback(() => {
    setRaw((prev) => !prev);
  }, []);

  const handleLoadRawData = React.useCallback((filePath) => {
    const standardizer = ArchiveManager.currentStandardizer
    if (!standardizer) {
      console.info('No standardizer found in Archive Manager')
      setData(null);
      return
    }
    standardizer.getRawData(filePath).then((parsedRawData: any) => {
      setRawData(parsedRawData);
    });
  }, [])

  React.useEffect(() => {
    window.addEventListener('rawData', handleRawData);
    return () => {
      window.removeEventListener('rawData', handleRawData);
    }
  }, [])

  if (data === undefined) {
    return (
      <Loading componentName={ capitalize(componentName ?? '') } />
    )
  }

  if (data === null || ((data.data?.map) && !data.data.map.length)) {
    return (
      <NoDataAvailable componentName={ capitalize(componentName ?? '') } />
    )
  }

  return raw ? <DisplayRawData data={ data } rawData={ rawData } onLoadRawData={ handleLoadRawData } /> : (
    <Component { ...(componentProps ?? {}) } data={ data } />
  )
}
