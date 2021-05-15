import React from 'react'
import useArchiveHistory from '@hooks/useArchiveHistory'
import HistoryEntry, { Props } from './HistoryEntry'

export default function LastHistoryEntry(props: Omit<Props, 'entry'>) {
  const { lastHistoryEntry } = useArchiveHistory()

  if (!lastHistoryEntry) {
    return <></>
  }

  return <HistoryEntry entry={ lastHistoryEntry } { ...props } />
}
