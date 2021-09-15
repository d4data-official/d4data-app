import React, { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'
import { Unarchive } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { darken } from '@material-ui/core'

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
      <h1>Click to select your GDPR archive or drop it here</h1>
    </div>
  )
}
