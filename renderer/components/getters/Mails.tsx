import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Divider, Grid } from '@material-ui/core';
import type { GetterData } from 'd4data-archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Mail as MailsType } from 'd4data-archive-lib/dist/src/types/schemas'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 17,
  },
  pos: {
    marginBottom: 12,
  },
});

export interface Props {
  data: NonNullable<GetterData<Array<MailsType>>>
}

export default function Mails({ data }: Props) {
  const classes = useStyles();

  return (
    <Box width={1} height={1}>
      <h2>{data.data.length} Mails</h2>
      <Grid container spacing={2}>
        {
          data.data.map((mail) => (
            <Grid item xs={12}>
              < Card className={classes.root} >
                <CardContent>
                  <Typography variant="h5" className={classes.title} gutterBottom>
                    {mail.subject}
                  </Typography>
                  <Typography variant="h5" className={classes.subtitle} gutterBottom>
                    From : {mail.from}
                  </Typography>
                  <Typography variant="h5" className={classes.subtitle} gutterBottom>
                    To : {mail.to.join(', ')}
                  </Typography>
                  <Typography variant="h5" className={classes.subtitle} gutterBottom>
                    Date : {mail.date.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {mail.content}
                  </Typography>
                </CardContent>
                <Divider />
              </Card >
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}
