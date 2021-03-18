import { ipcRenderer, IpcRendererEvent } from 'electron';

type IpcMessageCallback<T extends unknown[]> = (e: IpcRendererEvent, ...args: T) => void;

function on<T extends unknown[]>(channel: string, callback: IpcMessageCallback<T>) {
  ipcRenderer?.on(channel, callback);
}

export default on;
