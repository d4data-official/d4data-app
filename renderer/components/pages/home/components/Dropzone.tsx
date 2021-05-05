import React from 'react'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
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
  root: {
    display: 'flex',
    borderRadius: 20,
    borderColor: '#000',
    backgroundColor: '#000',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
  },
})

export default function Dropzone(props: { onLoaded: CallableFunction }) {
  const classes = useStyles()

  const [list, setList] = React.useState<File[]>([])

  const onChange = React.useCallback((fileList: File[]) => {
    setList(fileList)
    if (fileList.length) {
      props.onLoaded(fileList[0].path)
      setList([])
    }
  }, [props])

  return (
    <>
      <DropzoneAreaBase
        // onAdd={onChange}
        onDrop={ onChange }
        fileObjects={ [] }
        classes={ {
          root: classes.root,
          icon: list.length ? classes.none : classes.dropzone,
          text: list.length ? classes.none : classes.dropzone,
          textContainer: list.length ? classes.none : classes.dropzone,
        } }
        dropzoneText="Here upload your archive"
        acceptedFiles={ ['.zip'] }
        filesLimit={ 1 }
        maxFileSize={ 50000000000 }
      />
    </>
  )
}
