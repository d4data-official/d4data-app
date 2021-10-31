import useSWR from 'swr'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { GetterOptions } from '@d4data/archive-lib/dist/src/types/standardizer/Standardizer'
import useArchiveManager from '../useArchiveManager'
import laggy from '../swr/middlewares/laggy'

export default function useGetter<T>(getter: Getters, getterOptions?: GetterOptions) {
  const archiveManager = useArchiveManager()

  // @ts-ignore isLagging and isLagging are not typed and create a TS error
  const { data, error, isLagging, resetLaggy } = useSWR<GetterData<T>>(
    () => {
      if (!archiveManager.currentStandardizer) {
        console.error('[useGetter] Standardizer not found')
        throw new Error('[useGetter] Standardizer not found')
      } else if (!archiveManager.currentStandardizer[getter]) {
        console.error(`[useGetter] Getter not found: ${ getter }`)
        throw new Error(`[useGetter] Getter not found: ${ getter }`)
      }

      const offset = getterOptions?.parsingOptions?.pagination?.offset ?? 0
      const items = getterOptions?.parsingOptions?.pagination?.items ?? Infinity

      return `${ getter.toString() }?offset=${ offset }&items=${ items }`
    },
    async () => {
      console.info('[useGetter] Retrieve getter data:', getter)

      // @ts-ignore
      return archiveManager.currentStandardizer![getter](getterOptions)
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      loadingTimeout: 10000, // 10s
      use: [laggy],
    },
  )

  return {
    data,
    error,
    loading: !data && !error,
    isLagging: isLagging as boolean,
    resetLaggy: resetLaggy as () => void,
  }
}
