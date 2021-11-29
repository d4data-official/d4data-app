import useSWR from 'swr'
import {
  getDataCollectUserContent,
  resetDataCollectUserContent,
  setDataCollectUserContent,
} from '../../modules/dataCollectUserConsent'

export const KEY = 'dataCollectUserContent'

export default function useDataCollectUserContent() {
  const {
    data,
    mutate,
  } = useSWR<ReturnType<typeof getDataCollectUserContent>>(KEY, () => getDataCollectUserContent(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  const set = (userConsent: boolean) => {
    setDataCollectUserContent(userConsent)
    mutate(userConsent, false)
  }

  const reset = () => {
    resetDataCollectUserContent()
    mutate(null, false)
  }

  return {
    dataCollectUserContent: data,
    setDataCollectUserContent: set,
    resetDataCollectUserContent: reset,
  }
}
