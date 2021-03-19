import { BrowserWindow } from 'electron';

/**
 * Send $args on on the specified channel of the specified window
 */
function send(windowName: string, channel: string, ...args: any[]) {
  const window: BrowserWindow | undefined = global[`window-state-${windowName}`] as BrowserWindow;
  if (window && window.webContents) { window.webContents.send(channel, ...args); }
}

export default send;
