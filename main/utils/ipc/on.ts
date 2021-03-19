import { ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';

type IpcMessageCallback<T extends any[]> = (e: IpcMainEvent, ...args: T) => void;

/**
 * Register a callback which will be called on each message received on the specified channel
 */
function on<T extends any[]>(channel: string, callback: IpcMessageCallback<T>) {
  ipcMain.on(channel, callback);
}

export default on;
