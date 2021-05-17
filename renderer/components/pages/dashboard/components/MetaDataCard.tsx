import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface MetaDataCardComponent {
  icon: ReactNode, metadata: string, subtitle: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export default function MetadataCard({ icon, metadata, subtitle } : MetaDataCardComponent) {
  const classes = useStyles({})
  return (
    <Card className={ classes.root }>
      <CardContent>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 4 }>
            <Typography variant="body2" component="p">
              { subtitle }
            </Typography>
            { icon }
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>
              <div className={ classes.flexIcon }>
                { metadata }
              </div>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
