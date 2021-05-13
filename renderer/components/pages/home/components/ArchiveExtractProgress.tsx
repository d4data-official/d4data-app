import { Box, Dialog, DialogTitle, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ProgressState {
  state: {
    service: string | undefined,
    fileName: string | undefined,
    extractedCount: number | undefined,
    total: number | undefined,
  }
}

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
  },
  dialog: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    overflow: 'hidden',
  },
});

export default function ArchiveExtractProgress({ state } : ProgressState) {
  const classes = useStyles()
  if (!state.extractedCount || !state.total || !state.service) {
    return (<></>)
  }
  let percentage = state.extractedCount * 100
  percentage /= state.total
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      className={ classes.root }
      aria-labelledby="simple-dialog-title"
      open={ (state.total !== undefined) }
    >
      <DialogTitle id="simple-dialog-title">{state.service} archive: extraction in progress...</DialogTitle>
      <div className={ classes.dialog }>
        <h3>{Math.trunc(percentage)} %</h3>
        <LinearProgress variant="determinate" value={ percentage } />
      </div>

    </Dialog>
  )
}
