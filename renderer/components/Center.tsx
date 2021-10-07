import { PropsWithChildren } from 'react'
import { Box } from '@material-ui/core'

export default function Center({ children }: PropsWithChildren<{}>) {
  return (
    <Box height={ 1 } width={ 1 } display="flex" alignItems="center" justifyContent="center">
      { children }
    </Box>
  )
}
