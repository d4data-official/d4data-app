import { Button, Grid, Typography } from '@mui/material'
import React, { CSSProperties, useState } from 'react'
import moment from 'moment'
import RestoreIcon from '@mui/icons-material/Restore'
import DeleteIcon from '@mui/icons-material/Delete'
import filesize from 'filesize'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ArchiveHistoryEntry } from '../../modules/ArchiveHistoryManager'
import useArchiveHistory from '../../hooks/useArchiveHistory'
import EllipsisTooltip from '../EllipsisTooltip'

export interface Props {
  entry: ArchiveHistoryEntry
  showSize?: boolean
  showDeltaTime?: boolean
  showDeleteButton?: boolean
  showRestoreButton?: boolean
  onDelete?: (entry: ArchiveHistoryEntry) => void
  onRestore?: (entry: ArchiveHistoryEntry) => void
  className?: string
  style?: CSSProperties
}

export default function HistoryEntry({
  entry,
  showSize = true,
  showDeltaTime = true,
  showRestoreButton = true,
  showDeleteButton = true,
  onDelete,
  onRestore,
  className,
  style,
}: Props) {
  const { t, i18n } = useTranslation('history')
  const router = useRouter()
  const { restoreArchiveFromEntry, deleteHistoryEntry } = useArchiveHistory()
  const [loading, setLoading] = useState(false)

  const getDeltaTimeHumanized = (date: Date) => {
    const duration = moment.duration(date.valueOf() - new Date().valueOf())
    duration.locale(i18n.language)
    return duration
  }

  const deleteEntryHandler = () => {
    if (onDelete) {
      onDelete?.(entry)
      return
    }

    setLoading(true)
    deleteHistoryEntry(entry)
      .then(() => {
        toast(
          <span>{ t('deleted', { name: entry.archiveName ?? entry.service }) }</span>,
          { position: 'bottom-left' },
        )
      })
      .finally(() => setLoading(false))
  }

  const restoreEntryHandler = () => {
    if (onRestore) {
      onRestore?.(entry)
      return
    }

    setLoading(true)
    restoreArchiveFromEntry(entry)
      .then(() => {
        toast.success(
          <span>{ t('restored', { name: entry.archiveName ?? entry.service }) }</span>,
          { position: 'bottom-left' },
        )
      })
      .then(() => router.push('/dashboard'))
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
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={ { px: 1 } }
                >
                  { t('delete') }
                </Button>
              </Grid>
            ) }
            { showRestoreButton && (
              <Grid item>
                <Button
                  onClick={ () => restoreEntryHandler() }
                  disabled={ loading }
                  startIcon={ <RestoreIcon/> }
                  variant="contained"
                  size="small"
                  sx={ { px: 1 } }
                >
                  { t('restore') }
                </Button>
              </Grid>
            ) }
          </Grid>
        ) }
      </Grid>
    </div>
  )
}
