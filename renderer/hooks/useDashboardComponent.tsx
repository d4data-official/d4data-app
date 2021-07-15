import { fetchComponent } from 'components/pages/dashboard/components'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import ArchiveManager from '@modules/ArchiveManager'
import { GlobalContext } from 'renderer/context/Store'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import DefaultDisplay from 'components/pages/dashboard/components/DefaultDisplay'

interface UseStandardizerArgs {
  componentName?: string,
  Component?: FunctionComponent<{ data: NonNullable<GetterData<any>> }>
  getterArgs?: Array<any>
}

interface UseDashboardComponentReturn {
  componentName?: string,
  Component: FunctionComponent<{ data: NonNullable<GetterData<any>> }> & { disableRawData?: boolean }
  data?: {
    data: GetterData<any>
    componentName: string
  }
}

function useDashboardComponent(args?: UseStandardizerArgs): UseDashboardComponentReturn {
  const [data, setData] = useState<{ componentName: string, data: GetterData<any> } | undefined>(undefined)
  const { componentName: contextComponentName } = useContext(GlobalContext)
  const componentName = args?.componentName ?? contextComponentName
  const Component: FunctionComponent<{ data: NonNullable<GetterData<any>> }> & { disableRawData?: boolean }
  | null = args?.Component ?? (componentName ? fetchComponent(componentName) : null)

  useEffect(() => {
    setData(undefined)
    if (componentName) {
      const standardizer = ArchiveManager.currentStandardizer
      if (!standardizer) {
        console.info('No standardizer found in Archive Manager')
        return
      }

      const getterName = componentName

      // @ts-ignore
      if (!standardizer[getterName]) {
        throw new Error(`Bad getter name : ${ componentName }`)
      }

      console.info(`Retrieving data of ${ componentName } getter`)

      // @ts-ignore
      standardizer[getterName](...(args?.getterArgs ?? []))
        .then((getterData: GetterData<any>) => {
          console.info(`${ componentName } getter data retrieved`)
          setData({ componentName, data: getterData })
        })
    }
  }, [componentName])
  return ({
    data,
    componentName,
    Component: Component ?? DefaultDisplay,
  })
}

export default useDashboardComponent
