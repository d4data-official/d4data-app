import { Button, createStyles, Grid, IconButton, Typography } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import moment from 'moment'
import { makeStyles, Theme } from '@material-ui/core/styles'
import RestoreIcon from '@material-ui/icons/Restore'
import DeleteIcon from '@material-ui/icons/Delete'
import filesize from 'filesize'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { ArchiveHistoryEntry } from '@modules/ArchiveHistoryManager'
import { useSnackbar } from 'notistack'
import CloseIcon from '@material-ui/icons/Close'

export interface Props {
  entry: ArchiveHistoryEntry
  showSize?: boolean
  showDeltaTime?: boolean
  showDeleteButton?: boolean
  showRestoreButton?: boolean
  className?: string
  style?: CSSProperties
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  deleteButton: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  restoreButton: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}))

export default function HistoryEntry({
  entry,
  showSize = true,
  showDeltaTime = true,
  showRestoreButton = true,
  showDeleteButton = true,
  className,
  style,
}: Props) {
  const { restoreArchiveFromEntry, deleteHistoryEntry } = useArchiveHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const getDeltaTimeHumanized = (date: Date) => moment.duration(date.valueOf() - new Date().valueOf())

  const deleteEntryHandler = () => {
    setLoading(true)
    deleteHistoryEntry(entry)
      .then(() => {
        enqueueSnackbar(<span>Archive <b>{ entry.archiveName ?? entry.service }</b> deleted</span>, {
          variant: 'info',
          action: (key) => (
            <IconButton onClick={ () => closeSnackbar(key) } style={ { color: 'white' } }>
              <CloseIcon/>
            </IconButton>
          ),
        })
      })
      .finally(() => setLoading(false))
  }

  const restoreEntryHandler = () => {
    setLoading(true)
    restoreArchiveFromEntry(entry)
      .then(() => {
        enqueueSnackbar(<span>Archive <b>{ entry.archiveName ?? entry.service }</b> restored</span>, {
          variant: 'success',
          action: (key) => (
            <IconButton onClick={ () => closeSnackbar(key) } style={ { color: 'white' } }>
              <CloseIcon/>
            </IconButton>
          ),
        })
      })
      .finally(() => setLoading(false))
  }

  if (!entry) {
    return (
      <div>Empty history</div>
    )
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      spacing={ 1 }
      wrap="nowrap"
      className={ className }
      style={ style }
    >
      { entry.archiveName && (
        <Grid item xs={ 3 }>
          <Typography variant="h6" align="left" noWrap>{ entry.archiveName }</Typography>
        </Grid>
      ) }

      <Grid item xs={ 1 }>
        <Typography variant="body1" align="left">{ entry.service }</Typography>
      </Grid>

      { showSize && (
        <Grid item xs={ 2 }>
          <Typography variant="body1" align="left">{ filesize(entry.size) }</Typography>
        </Grid>
      ) }

      { showDeltaTime && (
        <Grid item xs={ 1 }>
          <Typography
            variant="overline"
            align="center"
            noWrap
          >{ getDeltaTimeHumanized(entry.date).humanize(true, { s: 0, ss: 0 }) }
          </Typography>
        </Grid>
      ) }

      { showDeleteButton && showRestoreButton && (
        <Grid container justifyContent="flex-end" wrap="nowrap" spacing={ 1 } item style={ { width: 'auto' } }>
          { showDeleteButton && (
            <Grid item>
              <Button
                onClick={ () => deleteEntryHandler() }
                disabled={ loading }
                startIcon={ <DeleteIcon/> }
                className={ classes.deleteButton }
              >Delete
              </Button>
            </Grid>
          ) }
          { showRestoreButton && (
            <Grid item>
              <Button
                onClick={ () => restoreEntryHandler() }
                disabled={ loading }
                startIcon={ <RestoreIcon/> }
                className={ classes.restoreButton }
              >Restore
              </Button>
            </Grid>
          ) }
        </Grid>
      ) }
    </Grid>
  )
}
