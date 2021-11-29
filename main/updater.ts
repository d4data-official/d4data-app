import {
  AppImageUpdater, MacUpdater, NsisUpdater, UpdateCheckResult,
} from 'electron-updater'
import { GithubOptions } from 'builder-util-runtime'
import Log from 'electron-log'

function getUpdater(options: GithubOptions) {
  if (process.platform === 'win32') {
    return new NsisUpdater(options)
  }
  if (process.platform === 'darwin') {
    return new MacUpdater(options)
  }
  return new AppImageUpdater(options)
}

export default async function appUpdate(): Promise<UpdateCheckResult | null> {
  const options: GithubOptions = {
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
