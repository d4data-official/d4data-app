import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Box, Button, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArchiveManager from '@modules/ArchiveManager'
import { shell } from 'electron'
import { join, relative } from 'path'
import React, { useCallback, useEffect, useState } from 'react'
import ReactJson from 'react-json-view-ssr'

interface Props {
  data: NonNullable<GetterData<any>>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  formContainer: {
    width: '100%',
  },
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  formControl: {
    minWidth: '25%',
  },
  topSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    whiteSpace: 'nowrap',
  },
}))

export default function RawData({ data: { parsedFiles } }: Props) {
  const processParsedFile = useCallback(() => {
    const standardizer = ArchiveManager.currentStandardizer
    if (!standardizer) {
      return parsedFiles
    }
    return parsedFiles.map((parsedFile) => relative(standardizer.path, parsedFile))
  }, [parsedFiles])

  const [file, setFile] = useState<string>(processParsedFile()[0])
  const [data, setData] = useState<any>()
  const classes = useStyles()

  const handleChangeFile = useCallback((event: SelectChangeEvent<string>) => {
    setFile(event.target.value)
  }, [])

  useEffect(() => {
    if (file) {
      const standardizer = ArchiveManager.currentStandardizer
      if (!standardizer) {
        return
      }
      standardizer.getRawData(file)
        .then((rawData) => {
          setData({ data: rawData })
        })
    }
  }, [file])

  const showInFolder = useCallback(() => {
    const standardizer = ArchiveManager.currentStandardizer
    if (!standardizer || !file) {
      return
    }
    shell.showItemInFolder(join(standardizer.path, file))
  }, [ArchiveManager])

  return (
    <Box height={ 1 } width={ 1 } padding={ 2 } className={ classes.root }>
      <div className={ classes.topSection }>
        <div className={ classes.formContainer }>
          <FormControl size="small" className={ classes.formControl }>
            <FormLabel>Choose your file</FormLabel>
            <Select value={ file } onChange={ handleChangeFile }>
              { processParsedFile().map((parsedFile) => (
                <MenuItem className={ classes.menuItem } value={ parsedFile }>{ parsedFile }</MenuItem>
              )) }
            </Select>
          </FormControl>
        </div>

        <Button
          className={ classes.button }
          variant="outlined"
          onClick={ showInFolder }
        >
          See in file explorer
        </Button>
      </div>

      { data && (
        <ReactJson
          name={ false }
          src={ data }
        />
      ) }
    </Box>
  )
}
