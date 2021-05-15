import React, { useEffect } from 'react'
import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'
import { useRouter } from 'next/router'
import { ArchiveHistoryCallback, ArchiveHistoryEntry } from '../modules/ArchiveHistoryManager'
import ArchiveManager from '../modules/ArchiveManager'

const { archiveHistoryManager } = ArchiveManager

export default function useArchiveHistory() {
  const router = useRouter()
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

  useEffect(() => {
    const callback: ArchiveHistoryCallback = () => forceUpdate()

    archiveHistoryManager.subscribe(callback)

    return () => archiveHistoryManager.unsubscribe(callback)
  }, [])

  return {
    lastHistoryEntry: archiveHistoryManager.lastEntry,
    history: archiveHistoryManager.history,
    addHistoryEntry: (entry: ArchiveHistoryEntry) => archiveHistoryManager.addHistoryEntry(entry),
    deleteLastEntry: () => archiveHistoryManager.deleteLastEntry(),
    deleteEntry: (index: number) => archiveHistoryManager.deleteEntry(index),
    resetHistory: () => archiveHistoryManager.resetHistory(),
    restoreArchiveFromEntry: async (entry: ArchiveHistoryEntry) => {
      ArchiveManager.currentStandardizer = await StandardizerIPC.init(entry.service, entry.path)
      await router.push('/dashboard')
    },
  }
}
