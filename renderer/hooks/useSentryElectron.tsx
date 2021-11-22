import { useEffect } from 'react'
import * as Sentry from '@sentry/electron'
import { Event, setContext } from '@sentry/electron'
import { name, version } from '../../package.json'
import { getDataCollectUserContent } from '../modules/dataCollectUserConsent'
import useArchiveManager from './useArchiveManager'

export default function useSentryElectron() {
  const { currentStandardizer } = useArchiveManager()
  const isEnabled = () => process.env.NODE_ENV === 'production' || process.env.ENABLE_SENTRY === 'true'

  const beforeSend = (event: Event): Event | null => {
    if (!getDataCollectUserContent()) {
      console.info('[Sentry] User do not consent, dropping event')
      return null
    }
    console.info('[Sentry] User consent, sending event')

    return event
  }

  useEffect(() => setContext('app', {
    archiveService: currentStandardizer?.service ?? 'None',
  }), [currentStandardizer])

  useEffect(() => {
    Sentry.init({
      dsn: 'https://0e7a80545a864e62b2a1625e38e5b268@o688733.ingest.sentry.io/5773432',
      release: process.env.SENTRY_RELEASE || `${ name }@${ version }`,
      environment: process.env.NODE_ENV,
      enabled: isEnabled(),
      beforeSend,
    })
  }, [])
}
