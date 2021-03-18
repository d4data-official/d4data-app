import { ipcMain } from 'electron';
import { IpcMainEvent } from 'electron/main';

type IpcMessageCallback<T extends any[]> = (e: IpcMainEvent, ...args: T) => void;

function read<T extends any[]>(channel: string, callback: IpcMessageCallback<T>) {
  ipcMain.on(channel, callback);
}

export default read;
