import { Dialog, DialogTitle, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface ProgressState {
  show: boolean
  service?: string
  fileName?: string
  extractedCount?: number
  total?: number
}

export interface Props {
  state: ProgressState
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
})

function ArchiveExtraction({ state }: { state: ProgressState }) {
  const classes = useStyles()
  const percentage = (state.extractedCount! * 100) / state.total!

  return (
    <>
      <DialogTitle>{ state.service } archive: extraction in progress...</DialogTitle>
      <div className={ classes.dialog }>
        <h3>{ Math.trunc(percentage) } %</h3>
        <LinearProgress variant="determinate" value={ percentage }/>
      </div>
    </>
  )
}

function ArchiveIdentification() {
  const classes = useStyles()

  return (
    <>
      <DialogTitle>Archive identification...</DialogTitle>
      <div className={ classes.dialog }>
        <h3>In progress</h3>
        <LinearProgress/>
      </div>
    </>
  )
}

export default function ArchiveExtractProgress({ state }: Props) {
  const classes = useStyles()

  const getDialogContent = () => (state.service === undefined ? <ArchiveIdentification/>
    : <ArchiveExtraction state={ state }/>)

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      className={ classes.root }
      open={ state.show }
    >
      { getDialogContent() }
    </Dialog>
  )
}
