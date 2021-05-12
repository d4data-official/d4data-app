import { shell } from 'electron'

export default async function openInBrowser(url: string) {
  return shell.openExternal(url)
}
