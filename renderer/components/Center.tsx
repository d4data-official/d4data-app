import { PropsWithChildren } from 'react'
import { Box } from '@material-ui/core'
import { SxProps } from '@material-ui/system'

export interface Props {
  sx?: SxProps
}

export default function Center({ sx, children }: PropsWithChildren<Props>) {
  return (
    <Box height={ 1 } width={ 1 } display="flex" alignItems="center" justifyContent="center" sx={ sx }>
      { children }
    </Box>
  )
}
