import ArchiveIPC from '@shared/d4data-archive-lib/renderer/ArchiveIPC'
import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'

class ArchiveManager {
  currentArchive?: ArchiveIPC

  currentStandardizer?: StandardizerIPC
}

export default new ArchiveManager()
