import { Button } from '@mui/material'
import React, { CSSProperties, ReactNode, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { createStyles, makeStyles } from '@mui/styles'
import clsx from 'clsx'
import useArchiveHistory from '@hooks/useArchiveHistory'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('history')

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
      { label ?? `${ t('reset') } (${ history.length })` }
    </Button>
  )
}
