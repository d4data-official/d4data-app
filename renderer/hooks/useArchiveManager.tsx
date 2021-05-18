import ArchiveMetaData from '@d4data/archive-lib/dist/src/types/schemas/ArchiveMetaData'
import ArchiveIPC from '@shared/d4data-archive-lib/renderer/ArchiveIPC'
import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'
import archiveManager from '../modules/ArchiveManager'
import { ArchiveHistoryEntry } from '../modules/ArchiveHistoryManager'

export default function useArchiveManager() {
  return {
    getArchiveMetadata: async (): Promise<ArchiveMetaData> => {
      if (archiveManager.restoredHistoryEntry) {
        return {
          service: archiveManager.restoredHistoryEntry.service,
          size: archiveManager.restoredHistoryEntry.size,
        }
      }

      return archiveManager.currentArchive?.getMetadata()
    },
    restoredArchive: archiveManager.restoredHistoryEntry,
    archiveHistoryManager: archiveManager.archiveHistoryManager,
    currentArchive: archiveManager.currentArchive,
    currentStandardizer: archiveManager.currentStandardizer,
    setRestoredArchive: (entry: ArchiveHistoryEntry): void => {
      archiveManager.restoredHistoryEntry = entry
    },
    setCurrentArchive: (archive: ArchiveIPC): void => {
      archiveManager.currentArchive = archive
    },
    setCurrentStandardizer: (standardizer: StandardizerIPC): void => {
      archiveManager.currentStandardizer = standardizer
    },
  }
}
