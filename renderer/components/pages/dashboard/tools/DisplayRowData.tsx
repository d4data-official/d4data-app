import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import { useCallback, useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
import ReactJson from 'react-json-view-ssr';

export interface Props {
  data: NonNullable<GetterData<any>>
  rawData: any
  onLoadRawData: Function
}

function RenderData({ rawData }: any) {
  if (typeof rawData === 'object') {
    return (<ReactJson src={ rawData } />)
  }
  return rawData ?? null;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gridTemplateRow: 'auto auto',
    width: '100%',
  },
  form: {
    width: '100%',
  },
  rawData: {
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    marginBottom: '20px',
  },
});

export default function DisplayRawData({ data: { parsedFiles }, rawData, onLoadRawData }: Props) {
  const classes = useStyles();
  const [file, setFile] = useState<number>();

  const handleFileChange = useCallback((e: any) => {
    e.preventDefault();
    setFile(e.target.value)
  }, [])

  useEffect(() => {
    if (file !== undefined) { onLoadRawData(parsedFiles[file]) }
  }, [file]);

  return (
    <div className={ classes.container }>
      <FormControl className={ classes.form }>
        <InputLabel className={ classes.form } id="demo-simple-select-label">Parsed File</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ file }
          className={ classes.container }
          onChange={ handleFileChange }
        >
          {parsedFiles.map((parsedFile, index) => (
            <MenuItem value={ index }>{parsedFile}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={ classes.rawData }>

        <RenderData rawData={ rawData } />
      </div>
      {/* { file?.length && (
        <WithDataFetch component={DisplayAny} componentName="RawData" standardizeArgs={[file]} />
      )} */}
    </div>
  )
}
