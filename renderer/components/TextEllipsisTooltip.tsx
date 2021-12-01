import { Link, Typography } from '@mui/material'
import { PropsWithChildren, useState } from 'react'
import { TypographyProps } from '@mui/material/Typography'
import RouterLink from 'next/link'
import ConditionalTooltip, { Props as ConditionalTooltipProps } from './ConditionalTooltip'

export interface Props {
  text: string
  typographyProps?: Omit<TypographyProps, 'ref'>
  tooltipProps?: Omit<ConditionalTooltipProps, 'show' | 'title' | 'children'>
  // Link target. Enable link mode if given.
  to?: string
}

export default function TextEllipsisTooltip({ text, typographyProps, tooltipProps, to }: PropsWithChildren<Props>) {
  const [ellipsis, setEllipsis] = useState(false)

  const Content = to ? (
    <RouterLink href={ to } as="div">
      <Link
        ref={ (ref: any) => ref?.offsetWidth! < ref?.scrollWidth! && setEllipsis(true) }
        color="secondary"
        style={ {
          width: '100%',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        } }
        { ...typographyProps }
      >
        { text }
      </Link>
    </RouterLink>
  ) : (
    <Typography
      ref={ (ref) => ref?.offsetWidth! < ref?.scrollWidth! && setEllipsis(true) }
      sx={ {
        ...(typographyProps?.sx),
        width: 1,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      } }
      { ...typographyProps }
    >
      { text }
    </Typography>
  )

  return (
    <ConditionalTooltip show={ ellipsis } title={ text } { ...tooltipProps }>
      { Content }
    </ConditionalTooltip>
  )
}
