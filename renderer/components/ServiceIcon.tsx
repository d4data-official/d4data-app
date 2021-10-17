import Services from '@d4data/archive-lib/dist/src/types/Services'
import { SxProps } from '@mui/system'
import { Box } from '@mui/material'
import { CSSProperties } from 'react'

export interface Props {
  service: Services
  size?: CSSProperties['width']
  sx?: SxProps
}

export default function ServiceIcon({ service, size = '1em', sx }: Props) {
  const getIcon = () => {
    switch (service) {
      case Services.FACEBOOK:
        return <img src="/images/services/facebook.png" width="100%" height="100%" alt="facebook icon"/>
      case Services.GOOGLE:
        return <img src="/images/services/google.png" width="100%" height="100%" alt="google icon"/>
      case Services.DISCORD:
        return <img src="/images/services/discord.png" width="100%" height="100%" alt="discord icon"/>
      case Services.REDDIT:
        return <img src="/images/services/reddit.png" width="100%" height="100%" alt="reddit icon"/>
      case Services.GRAVATAR:
        return <img src="/images/services/gravatar.png" width="100%" height="100%" alt="gravatar icon"/>
      default:
        return undefined
    }
  }

  const Icon = getIcon()

  if (!Icon) {
    return <></>
  }

  return (
    <Box width={ size } height={ size } sx={ sx }>{ Icon }</Box>
  )
}
