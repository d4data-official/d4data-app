import { useTranslation } from 'react-i18next'
import ProgressDialog from './ProgressDialog'
import { ArchiveProcessProgressState, ArchiveProcessStep } from '../hooks/useArchiveProcessProgress'

export interface Props {
  state: ArchiveProcessProgressState
}

export default function ArchiveProcessProgressDialog({ state }: Props) {
  const { t } = useTranslation('archiveProcessDialog')

  const { fileName, extractedCount, total } = state.extractionInfo ?? {}
  const value = extractedCount && total ? Math.round((extractedCount * 100) / total) : 0

  const getTitle = () => {
    switch (state.step) {
      case ArchiveProcessStep.IDENTIFYING:
        return t('title.identifying')
      case ArchiveProcessStep.EXTRACTING:
        return t('title.extracting', { service: state.service })
      case ArchiveProcessStep.POST_PROCESS:
        return t('title.postProcessing')
      default:
        return t('title.processing')
    }
  }
  const getSubTitle = () => {
    switch (state.step) {
      case ArchiveProcessStep.IDENTIFYING:
        return t('inProgress')
      case ArchiveProcessStep.EXTRACTING:
        return fileName
      case ArchiveProcessStep.POST_PROCESS:
        return state.postProcessInfo?.step
      default:
        return undefined
    }
  }

  return (
    <ProgressDialog
      open={ state.step !== ArchiveProcessStep.NONE }
      title={ getTitle() }
      progressCaption={ getSubTitle() }
      value={ state.step === ArchiveProcessStep.EXTRACTING ? value : undefined }
    />
  )
}
