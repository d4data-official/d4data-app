import { useState } from 'react'
import { TooltipProps } from '@material-ui/core'
import ConditionalTooltip from './ConditionalTooltip'

export interface Props {
  text: string
  tooltipProps?: TooltipProps
}

// Auto ellipsis given text and show a tooltip with full text on hover
export default function EllipsisTooltip({ text, tooltipProps }: Props) {
  const [ellipsis, setEllipsis] = useState(false)

  return (
    <ConditionalTooltip show={ ellipsis } title={ text } placement="top" { ...tooltipProps }>
      <div
        ref={ (ref) => ref?.offsetWidth! < ref?.scrollWidth! && setEllipsis(true) }
        style={ {
          width: '100%',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        } }
      >
        { text }
      </div>
    </ConditionalTooltip>
  )
}
