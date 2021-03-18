import { BrowserWindow } from 'electron';

function write(name: string, channel: string, ...args: any[]) {
  const window: BrowserWindow | undefined = global[`window-state-${name}`] as BrowserWindow;
  if (window && window.webContents) { window.webContents.send(channel, ...args); }
}

export default write;
