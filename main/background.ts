import { app } from 'electron'
import serve from 'electron-serve'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import LibManager from '@shared/d4data-archive-lib/main/LibManager'
import createWindow from './helpers/create-window'
import AppUpdate from './updater';

AppUpdate()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const libManager = new LibManager()

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${ app.getPath('userData') } (development)`)
}

// Install dev tools extensions if node env is not production
// Must be call after app is ready (await app.whenReady())
async function installDevToolExtensions() {
  if (isProd) {
    return
  }

  await installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.info(`Added Extension:  ${ name }`))
    .catch((err) => console.error('An error occurred: ', err))
}

(async () => {
  await app.whenReady()
  await installDevToolExtensions()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${ port }/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
