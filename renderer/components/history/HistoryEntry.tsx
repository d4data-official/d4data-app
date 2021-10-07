import { Button, Grid, Typography } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import moment from 'moment'
import { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/styles'
import RestoreIcon from '@material-ui/icons/Restore'
import DeleteIcon from '@material-ui/icons/Delete'
import filesize from 'filesize'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { ArchiveHistoryEntry } from '@modules/ArchiveHistoryManager'
import { toast } from 'react-hot-toast'
import EllipsisTooltip from '../EllipsisTooltip'

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
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const getDeltaTimeHumanized = (date: Date) => moment.duration(date.valueOf() - new Date().valueOf())

  const deleteEntryHandler = () => {
    setLoading(true)
    deleteHistoryEntry(entry)
      .then(() => {
        toast(<span>Archive <b>{ entry.archiveName ?? entry.service }</b> deleted</span>, { position: 'bottom-left' })
      })
      .finally(() => setLoading(false))
  }

  const restoreEntryHandler = () => {
    setLoading(true)
    restoreArchiveFromEntry(entry)
      .then(() => {
        toast.success(
          <span>Archive <b>{ entry.archiveName ?? entry.service }</b> restored</span>,
          { position: 'bottom-left' },
        )
      })
      .finally(() => setLoading(false))
  }

  if (!entry) {
    return (
      <div>Empty history</div>
    )
  }

  return (
    <div>
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
            <Typography variant="h6" align="left" noWrap>
              <EllipsisTooltip text={ entry.archiveName }/>
            </Typography>
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
                  size="small"
                  sx={ { px: 1 } }
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
                  size="small"
                  sx={ { px: 1 } }
                >Restore
                </Button>
              </Grid>
            ) }
          </Grid>
        ) }
      </Grid>
    </div>
  )
}
