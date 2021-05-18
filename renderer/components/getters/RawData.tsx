import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import { FormControl, FormLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArchiveManager from '@modules/ArchiveManager';
import DefaultDisplay from 'components/pages/dashboard/components/DefaultDisplay';
import { relative } from 'path';
import { useCallback, useEffect, useState } from 'react';

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

  const handleChangeFile = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
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

  return (
    <div className={ classes.root }>
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
      {data && <DefaultDisplay data={ data }/>}
    </div>
  )
}
