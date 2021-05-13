import { Dialog, DialogTitle, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ProgressState {
  state: {
    show: boolean,
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

function ArchiveExtraction({ state } : NonNullable<ProgressState>) {
  const classes = useStyles()
  let percentage = state.extractedCount! * 100
  percentage /= state.total!

  return (
    <>
      <DialogTitle id="simple-dialog-title">{state.service} archive: extraction in progress...</DialogTitle>
      <div className={ classes.dialog }>
        <h3>{Math.trunc(percentage)} %</h3>
        <LinearProgress variant="determinate" value={ percentage } />
      </div>
    </>
  )
}

function ArchiveIdentification() {
  const classes = useStyles()

  return (
    <>
      <DialogTitle id="simple-dialog-title">Archive identification...</DialogTitle>
      <div className={ classes.dialog }>
        <h3>In progress</h3>
        <LinearProgress />
      </div>
    </>
  )
}

function getDialogContent(state: ProgressState['state']) {
  if (state.service === undefined) {
    return (
      <ArchiveIdentification/>
    )
  }
  return (
    <ArchiveExtraction state={ state }/>
  )
}

export default function ArchiveExtractProgress({ state } : ProgressState) {
  const classes = useStyles()

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      className={ classes.root }
      aria-labelledby="simple-dialog-title"
      open={ state.show }
    >
      { getDialogContent(state) }
    </Dialog>
  )
}
