import { Box, Dialog, DialogContent, DialogProps, DialogTitle, LinearProgress, Stack, Typography } from '@mui/material'

export interface Props {
  open: boolean
  title: string
  progressCaption?: string
  value?: number
  dialogProps?: Omit<DialogProps, 'open'>
}

export default function ProgressDialog({ open, title, progressCaption, value, dialogProps }: Props) {
  return (
    <Dialog
      open={ open }
      maxWidth="lg"
      fullWidth
      style={ { overflow: 'hidden' } }
      { ...dialogProps }
    >
      <DialogTitle>{ title }</DialogTitle>

      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={ 1 }>
          <Box flexGrow={ 1 }>
            <LinearProgress variant={ value !== undefined ? 'determinate' : 'indeterminate' } value={ value }/>
          </Box>

          { value !== undefined && <Typography>{ value }%</Typography> }
        </Stack>

        { progressCaption && (
          <Typography
            mt={ value !== undefined ? -1 : undefined }
            variant="body2"
            color="gray"
            textOverflow="ellipsis"
            overflow="hidden"
            style={ { width: '95%' } }
          >{ progressCaption }
          </Typography>
        ) }
      </DialogContent>
    </Dialog>
  )
}
