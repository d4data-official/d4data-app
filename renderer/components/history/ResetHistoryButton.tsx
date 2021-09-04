import { Button } from '@material-ui/core'
import React, { CSSProperties, ReactNode, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { toast } from 'react-hot-toast'
import Trans from 'components/Translate'

export interface Props {
  label?: string
  icon?: ReactNode
  className?: string
  style?: CSSProperties
}

const useStyles = makeStyles((theme) => createStyles({
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
  const { history, resetHistory } = useArchiveHistory()
  const [loading, setLoading] = useState(false)

  const resetHistoryHandler = () => {
    setLoading(true)
    resetHistory()
      .then(() => {
        toast('Archive reset', { position: 'bottom-left' })
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
      <Trans page="history" section="reset" /> ({ history.length })
    </Button>
  )
}
