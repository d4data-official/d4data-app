import { ipcRenderer } from 'electron';

function send(channel: string, ...args: any[]) {
  ipcRenderer?.send(channel, ...args);
}

export default send;
