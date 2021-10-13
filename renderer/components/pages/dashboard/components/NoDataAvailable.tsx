import React from 'react'
import { makeStyles } from '@mui/styles'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Box } from '@mui/material'

interface Props {
  title?: string,
  description?: string,
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    border: '2px solid #66bb6a',
    borderRadius: '10px',
    padding: '30px',
    paddingBottom: '10px',
    color: '#4caf50',
  },
  nda: {
    fontSize: '16pt',
    textAlign: 'center',
  },
  ndaTitle: {
    flex: 1,
  },
  descr: {
    marginTop: '-2%',
  },
  icon: {
    fontSize: '32pt',
  },
}))

function GenerateDefaultDescription() {
  const classes = useStyles()

  return (
    <div className={ classes.descr }>
      <span>Awesome ! This service collected no data for this category</span>
    </div>
  )
}

export default function NoDataAvailable({ title, description }: Props) {
  const classes = useStyles()

  return (
    <div className={ classes.root }>
      <Box className={ classes.box }>
        <div className={ classes.nda }>
          <SentimentVerySatisfiedIcon className={ classes.icon }/>
          <h2 className={ classes.ndaTitle }>{ title ?? 'No data available' }</h2>
          { description ?? <GenerateDefaultDescription/> }
        </div>
      </Box>
    </div>
  )
}
