import { PropsWithChildren, useState } from 'react'
import { Tooltip, TooltipProps } from '@material-ui/core'

export interface Props extends TooltipProps {
  show?: boolean
}

export default function ConditionalTooltip({
  show,
  open,
  onClose,
  onOpen,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const [conditionalOpen, setConditionalOpen] = useState(false)

  const handleClose = () => {
    setConditionalOpen(false)
  }

  const handleOpen = () => {
    if (show) {
      setConditionalOpen(true)
    }
  }

  return (
    <Tooltip
      { ...props }
      open={ open ?? conditionalOpen }
      onClose={ onClose ?? handleClose }
      onOpen={ onOpen ?? handleOpen }
    >
      { children }
    </Tooltip>
  )
}
