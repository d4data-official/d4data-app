import React from 'react';
import type { Mail as MailsType } from 'd4data-archive-lib/dist/src/types/schemas'
import type { GetterData } from 'd4data-archive-lib/dist/src/types/standardizer/GetterReturn'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
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
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      {
        data.data.map((mail) => (
          < Card className={classes.root} >
            <CardContent>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {mail.from}
              </Typography>
              <Typography variant="body2" component="h2">
                {mail.date}
              </Typography>
              <Typography variant="body1" component="p">
                {mail.content}
              </Typography>
            </CardContent>
            <Divider />
          </Card >
        ))
      }
    </>
  );
}
