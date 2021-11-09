import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Unarchive } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { darken } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  onLoaded: Function
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    color: '#fff',
    borderColor: '#000',
    textAlign: 'center',
  },
  none: {
    display: 'none',
  },
  chip: {
    color: '#fff',
  },
  icon: {
    fontSize: '120px',
  },
  root: {
    display: 'flex',
    padding: '10px',
    borderColor: '#000',
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    height: '30vh',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.1),
    },
  },
}))

export default function Dropzone({ onLoaded }: Props) {
  const { t } = useTranslation('homepage')

  const classes = useStyles()

  const onDrop = useCallback((fileList) => {
    if (fileList.length) {
      onLoaded(fileList[0].path)
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: ['.zip'] })

  return (
    <div { ...getRootProps() } className={ classes.root }>
      <input { ...getInputProps() } className={ classes.dropzone }/>
      <Unarchive className={ classes.icon } fontSize="large"/>
      <h1>{ t('dropzone') }</h1>
    </div>
  )
}
