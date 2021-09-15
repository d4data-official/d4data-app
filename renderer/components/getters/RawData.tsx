import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import { Button, FormControl, FormLabel, MenuItem, Select, SelectChangeEvent, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArchiveManager from '@modules/ArchiveManager';
import DefaultDisplay from 'components/pages/dashboard/components/DefaultDisplay';
import { shell } from 'electron';
import { join, relative } from 'path';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  data: NonNullable<GetterData<any>>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    width: '100%',
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
  const processPardedFile = useCallback(() => {
    const standardizer = ArchiveManager.currentStandardizer;
    if (!standardizer) {
      return parsedFiles;
    }
    return parsedFiles.map((parsedFile) => relative(standardizer.path, parsedFile))
  }, [parsedFiles])

  const [file, setFile] = useState<string>(processPardedFile()[0]);
  const [data, setData] = useState<any>();
  const classes = useStyles();

  const handleChangeFile = useCallback((event: SelectChangeEvent<string>) => {
    setFile(event.target.value as string);
  }, [])

  useEffect(() => {
    if (file) {
      const standardizer = ArchiveManager.currentStandardizer;
      if (!standardizer) {
        return;
      }
      standardizer.getRawData(file)
        .then((rawData) => {
          setData({ data: rawData });
        })
    }
  }, [file])

  const showInFolder = useCallback(() => {
    const standardizer = ArchiveManager.currentStandardizer;
    if (!standardizer || !file) {
      return;
    }
    shell.showItemInFolder(join(standardizer.path, file))
  }, [ArchiveManager])

  return (
    <div className={ classes.root }>
      <div className={ classes.topSection }>
        <div className={ classes.formContainer }>
          <FormControl className={ classes.formControl }>
            <FormLabel>Choose your file</FormLabel>
            <Select value={ file } onChange={ handleChangeFile }>
              {processPardedFile().map((parsedFile) => (
                <MenuItem className={ classes.menuItem } value={ parsedFile }>{parsedFile}</MenuItem>
              ))}
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
      {data && <DefaultDisplay data={ data }/>}
    </div>
  )
}
