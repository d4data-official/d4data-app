import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import useDataCollectUserContent from '../hooks/swr/useDataCollectUserContent'
import { getDataCollectUserContent } from '../modules/dataCollectUserConsent'

export interface Props {
  onClose?: () => void
  onDeny?: () => void
  onAccept?: () => void
}

const DataCollectUserContentDialog = forwardRef(({ onClose, onDeny, onAccept }: Props, ref) => {
  const { setDataCollectUserContent } = useDataCollectUserContent()

  const { t } = useTranslation('dataCollectUserConsentDialog')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (getDataCollectUserContent() === null) {
      setOpen(true)
    }
  })

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  const close = () => {
    setOpen(false)
    onClose?.()
  }

  const handleDeny = () => {
    setDataCollectUserContent(false)
    close()
    onDeny?.()
  }
  const handleAccept = () => {
    setDataCollectUserContent(true)
    close()
    onAccept?.()
  }

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>{ t('title') }</DialogTitle>

      <DialogContent>
        <DialogContentText>{ t('text') }</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={ handleDeny } color="error">{ t('denyButton') }</Button>
        <Button onClick={ handleAccept } color="success">{ t('acceptButton') }</Button>
      </DialogActions>
    </Dialog>
  )
})

export default DataCollectUserContentDialog
