import * as Sentry from '@sentry/electron'
import { name, version } from '../../package.json'

const isEnabled = () => process.env.NODE_ENV === 'production' || process.env.ENABLE_SENTRY === 'true'

Sentry.init({
  dsn: 'https://0e7a80545a864e62b2a1625e38e5b268@o688733.ingest.sentry.io/5773432',
  release: process.env.SENTRY_RELEASE || `${ name }@${ version }`,
  environment: process.env.NODE_ENV,
  enabled: isEnabled(),
})
