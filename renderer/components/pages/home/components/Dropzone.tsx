import React, { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'
import { Unarchive } from '@material-ui/icons'
import { toast } from 'react-hot-toast'
import { makeStyles } from '@material-ui/styles'
import Trans from 'components/Translate'

interface Props {
  onLoaded: Function
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    color: '#fff',
    borderColor: '#000',
    textAlign: 'center',
    outline: 'none',
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
    borderRadius: '20px',
    borderStyle: 'dashed',
    borderWidth: '4px',
    borderColor: theme.palette.primary.main,
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    height: '30vh',
    outline: 'none',
  },
}))

export default function Dropzone({ onLoaded }: Props) {
  const classes = useStyles()

  const onDrop = useCallback((fileList) => {
    if (fileList.length) {
      onLoaded(fileList[0].path)
    }
  }, [])

  const handleDropRejected = useCallback(() => {
    toast.error(<span>File type not supported !</span>,
      { position: 'bottom-left' });
  }, [])

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      accept: ['.zip', '.tar', '.tgz'],
      onDropRejected: handleDropRejected,
    },
  )

  return (
    <div { ...getRootProps() } className={ classes.root }>
      <input { ...getInputProps() } className={ classes.dropzone }/>
      <Unarchive className={ classes.icon } fontSize="large"/>
      <h2> <Trans page="homepage" section="dropzone" /></h2>
    </div>
  )
}
