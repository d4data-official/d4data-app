import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import ReactJson from 'react-json-view-ssr'

export interface Props {
  data: NonNullable<GetterData<any>>
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    marginBottom: '20px',
  },
})

export default function DefaultDisplay({ data: { data: src } }: Props) {
  const classes = useStyles();
  return (
    <div className={ classes.container }>
      <ReactJson
        name={ false }
        src={ src }
        collapsed
      />
    </div>
  )
}
