import BrowserData from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import moment from 'moment'

export type UniqueWebsites = Record<string, number>

export default class BrowserDataStats {
  private uniqueWebsites?: UniqueWebsites = undefined

  readonly data: BrowserData

  constructor(data: BrowserData) {
    this.data = data
  }

  get historyCount(): number {
    return this.data.history.length
  }

  get historyUniqueWebsitesCount(): number {
    return Object.keys(this.uniqueWebsites ?? this.getHistoryUniqueWebsites()).length
  }

  getHistoryUniqueWebsites(): UniqueWebsites {
    if (this.uniqueWebsites) {
      return this.uniqueWebsites
    }

    const uniqueWebsites: UniqueWebsites = {}

    this.data.history.forEach((entry) => {
      const domain = new URL(entry.url).hostname.replace('www.', '')
      uniqueWebsites[domain] = (uniqueWebsites[domain] ?? 0) + 1
    })

    this.uniqueWebsites = uniqueWebsites

    return this.uniqueWebsites
  }

  getHistoryDuration(): moment.Duration | undefined {
    const start = this.data.history[0]?.datetime
    const end = this.data.history[this.data.history.length - 1]?.datetime

    if (!start && !end) {
      return undefined
    }

    return moment.duration(end.valueOf() - start.valueOf())
  }
}
