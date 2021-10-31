import { Alert, AlertProps } from '@mui/material'
import { SxProps } from '@mui/system'

export interface Props {
  error: Error | string
  componentProps?: Omit<AlertProps, 'sx'>
  sx?: SxProps
}

export default function ErrorAlert({ error, componentProps, sx }: Props) {
  const message = typeof error === 'string' ? error : error.message

  return (
    <Alert severity="error" sx={ sx } { ...componentProps }>{ message }</Alert>
  )
}
