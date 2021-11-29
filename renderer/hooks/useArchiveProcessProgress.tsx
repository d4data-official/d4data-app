import type Services from '@d4data/archive-lib/dist/src/types/Services'
import { useState } from 'react'

export enum ArchiveProcessStep {
  // Used when there is no processing
  NONE,
  IDENTIFYING,
  EXTRACTING,
  POST_PROCESS,
  OTHER,
}

export interface ArchiveProcessProgressState {
  step: ArchiveProcessStep
  service?: Services
  extractionInfo?: {
    fileName?: string
    extractedCount?: number
    total?: number
  }
  postProcessInfo?: {
    // Current post processing step name
    step?: string
  }
}

export default function useArchiveProcessProgress() {
  const [state, setState] = useState<ArchiveProcessProgressState>({ step: ArchiveProcessStep.NONE })

  return {
    state,
    setState,
  }
}
