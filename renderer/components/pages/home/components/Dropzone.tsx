import React, { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import { Unarchive } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

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
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    height: '30vh',
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
