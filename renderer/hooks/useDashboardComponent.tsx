import { fetchComponent } from 'components/pages/dashboard/components'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import Case from 'case'
import ArchiveManager from '@modules/ArchiveManager'
import { GlobalContext } from 'renderer/context/Store'
import { capitalize } from '@material-ui/core'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import DefaultDisplay from 'components/pages/dashboard/components/DefaultDisplay'

interface UseStandardizerArgs {
  componentName?: string,
  Component?: FunctionComponent<{ data: NonNullable<GetterData<any>> }>
  getterArgs?: Array<any>
}

function useDashboardComponent(args?: UseStandardizerArgs) {
  const [data, setData] = useState<{ componentName: string, data: GetterData<any> } | undefined>(undefined)
  const { componentName: contextComponentName } = useContext(GlobalContext)
  const componentName = args?.componentName ?? contextComponentName
  const Component: FunctionComponent<{ data: NonNullable<GetterData<any>> }> | null = args?.Component
    ?? (componentName ? fetchComponent(Case.pascal(componentName)) : null)

  useEffect(() => {
    setData(undefined)
    if (componentName) {
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
      standardizer[getterName](...(args?.getterArgs ?? []))
        .then((getterData: GetterData<any>) => {
          console.info(`${ capitalize(componentName) } getter data retrieved`)
          setData({ componentName, data: getterData })
        })
    }
  }, [componentName]);
  return ({
    data,
    componentName,
    Component: Component ?? DefaultDisplay,
  })
}

export default useDashboardComponent
