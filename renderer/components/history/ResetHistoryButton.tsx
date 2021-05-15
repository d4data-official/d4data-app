import { Button, createStyles, IconButton } from '@material-ui/core'
import React, { CSSProperties, ReactNode, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useArchiveHistory from '@hooks/useArchiveHistory'
import CloseIcon from '@material-ui/icons/Close'
import { useSnackbar } from 'notistack'

export interface Props {
  label?: string
  icon?: ReactNode
  className?: string
  style?: CSSProperties
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    color: 'white',
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))

export default function ResetHistoryButton({ label, icon, className, style }: Props) {
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { history, resetHistory } = useArchiveHistory()
  const [loading, setLoading] = useState(false)

  const resetHistoryHandler = () => {
    setLoading(true)
    resetHistory()
      .then(() => {
        enqueueSnackbar(<span>Archive reset</span>, {
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

  return (
    <Button
      onClick={ () => resetHistoryHandler() }
      disabled={ history.length === 0 || loading }
      variant="contained"
      startIcon={ icon ?? <DeleteIcon/> }
      className={ clsx(classes.button, className) }
      style={ style }
    >
      { label ?? `Reset History (${ history.length })` }
    </Button>
  )
}
