import {
  NsisUpdater, AppImageUpdater, MacUpdater, UpdateCheckResult,
} from 'electron-updater'
import { AllPublishOptions } from 'builder-util-runtime'
import Log from 'electron-log'

function getUpdater(options: AllPublishOptions) {
  if (process.platform === 'win32') {
    return new NsisUpdater(options)
  }
  if (process.platform === 'darwin') {
    return new MacUpdater(options)
  }
  return new AppImageUpdater(options)
}

export default async function appUpdate(): Promise<UpdateCheckResult | null> {
  const options: AllPublishOptions = {
    requestHeaders: {
      Authorization: 'Basic AUTH_CREDS_VALUE',
    },
    provider: 'github',
    repo: 'd4data-app',
    owner: 'd4data-official',
    host: 'github.com',
    protocol: 'https',
  }
  const autoUpdater = getUpdater(options)

  Log.transports.file.level = 'info'
  autoUpdater.logger = Log
  return autoUpdater.checkForUpdatesAndNotify()
}
