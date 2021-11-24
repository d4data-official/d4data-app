import useSWR from 'swr'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import useArchiveManager from '../useArchiveManager'

const KEY = 'availableGetters'

export default function useAvailableGetters() {
  const archiveManager = useArchiveManager()

  const { data, error } = useSWR<Array<Getters>>(
    () => {
      // Don't retrieve data if there is no Standardizer (throw will stop SWR)
      if (!archiveManager.currentStandardizer) {
        console.error('[useGetter] Standardizer not found')
        throw new Error('[useGetter] Standardizer not found')
      }

      return `${ KEY }-${ archiveManager.currentStandardizer.path }`
    },
    async () => {
      console.info('[useAvailableGetters] Retrieve available getters')

      return archiveManager.currentStandardizer!.getAvailableGetters()
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      loadingTimeout: 10000, // 10s
    },
  )

  return {
    availableGetters: data,
    error,
    loading: !data && !error,
  }
}
