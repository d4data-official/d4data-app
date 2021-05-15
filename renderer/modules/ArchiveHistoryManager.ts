import fs, { constants } from 'fs'
import ArchiveLibConfig from '@d4data/archive-lib/dist/src/modules/Config'
import type { Services } from '@d4data/archive-lib'

export interface ArchiveHistoryEntry {
  archiveName?: string,
  service: Services
  date: Date,
  size: number,
  path: string
}

export type ArchiveHistoryCallback = (newHistory: ArchiveHistory) => void

export type ArchiveHistory = Array<ArchiveHistoryEntry>

const LOCAL_STORAGE_KEY = 'ARCHIVE_HISTORY'
const EXTRACTION_FOLDER = ArchiveLibConfig.archiveOutputDir

export default class ArchiveHistoryManager {
  history: ArchiveHistory = []

  subscribers: Array<ArchiveHistoryCallback> = []

  constructor() {
    this.reload()
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.history))
  }

  get lastEntry(): ArchiveHistoryEntry | undefined {
    return this.history[this.history.length - 1]
  }

  reload(): ArchiveHistory {
    this.history = ArchiveHistoryManager.getHistory()
    this.notifySubscribers()
    return this.history
  }

  async resetHistory(): Promise<void> {
    await ArchiveHistoryManager.resetHistory()
    this.history = []
    this.notifySubscribers()
  }

  saveHistory(): void {
    ArchiveHistoryManager.saveHistory(this.history)
  }

  async deleteLastEntry() {
    return this.deleteEntry(this.history.length - 1)
  }

  async deleteEntry(index: number): Promise<ArchiveHistory> {
    const [deletedEntry] = this.history.splice(index, 1)

    await fs.promises.unlink(deletedEntry.path)
      .catch(() => console.info(`Can not remove archive history files, no such file: ${ deletedEntry }`))

    this.saveHistory()
    this.notifySubscribers()

    return this.history
  }

  addHistoryEntry(entry: ArchiveHistoryEntry): ArchiveHistory {
    this.history = [...this.history, entry]
    this.saveHistory()
    this.notifySubscribers()

    return this.history
  }

  async cleanHistory(): Promise<ArchiveHistory> {
    const entriesExist = await Promise.all(
      this.history.map((entry) => fs.promises.access(entry.path, constants.R_OK)
        .then(() => true)
        .catch(() => false)),
    )

    this.history = this.history.filter((entry, idx) => entriesExist[idx])

    this.notifySubscribers()

    return this.history
  }

  subscribe(callback: ArchiveHistoryCallback): void {
    if (this.subscribers.includes(callback)) {
      return
    }

    this.subscribers.push(callback)
  }

  unsubscribe(callback: ArchiveHistoryCallback): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback)
  }

  static getHistory(resetOnFail = true): ArchiveHistory {
    if (typeof localStorage === 'undefined') {
      return []
    }

    const jsonHistory = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!jsonHistory) {
      return []
    }

    try {
      const history: Array<Omit<ArchiveHistoryEntry, 'date'> & { date: string }> = JSON.parse(jsonHistory)

      return history.map((entry) => ({
        ...entry,
        date: new Date(entry.date),
      }))
    } catch {
      console.info('Invalid JSON archive history')

      if (resetOnFail) {
        this.resetHistory()
      }

      return []
    }
  }

  static saveHistory(history: ArchiveHistory): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history))
  }

  static async resetHistory(): Promise<void> {
    if (typeof localStorage === 'undefined') {
      return undefined
    }

    return fs.promises.rm(EXTRACTION_FOLDER, { recursive: true, force: true })
      .then(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        console.info('Archive history reset')
      })
      .catch((err) => {
        console.error(err)
        console.info(`No archive history files to remove in: ${ EXTRACTION_FOLDER }`)
      })
  }
}
