import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'

interface MetaDataCardComponent {
  icon: ReactNode,
  metadata: string,
  subtitle: string
}

const useStyles = makeStyles((theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
  flexIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18pt',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function MetadataCard({ icon, metadata, subtitle }: MetaDataCardComponent) {
  const classes = useStyles({})
  return (
    <Card className={ classes.root }>
      <CardContent>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 4 } className={ classes.grid }>
            { icon }
          </Grid>
          <Grid item>
            <Typography variant="body2" component="p">
              { subtitle }
            </Typography>
            <Typography color="textSecondary" gutterBottom className={ classes.flexIcon }>{ metadata }</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
