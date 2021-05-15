import ArchiveIPC from '@shared/d4data-archive-lib/renderer/ArchiveIPC'
import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'
// eslint-disable-next-line import/no-cycle
import ArchiveHistoryManager from './ArchiveHistoryManager'

class ArchiveManager {
  currentArchive?: ArchiveIPC

  currentStandardizer?: StandardizerIPC

  archiveHistoryManager = new ArchiveHistoryManager()
}

export default new ArchiveManager()
