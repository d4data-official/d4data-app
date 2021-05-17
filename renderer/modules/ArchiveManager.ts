import ArchiveIPC from '@shared/d4data-archive-lib/renderer/ArchiveIPC'
import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'
// eslint-disable-next-line import/no-cycle
import ArchiveHistoryManager, { ArchiveHistoryEntry } from './ArchiveHistoryManager'

class ArchiveManager {
  restoredHistoryEntry?: ArchiveHistoryEntry

  currentArchive?: ArchiveIPC

  currentStandardizer?: StandardizerIPC

  archiveHistoryManager = new ArchiveHistoryManager()

  /**
   * Clear current state of archive manager
   */
  clear() {
    this.restoredHistoryEntry = undefined
    this.currentStandardizer = undefined
    this.currentStandardizer = undefined
  }
}

export default new ArchiveManager()
