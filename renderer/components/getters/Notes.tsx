import React from 'react';
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

interface getterData {
  data: any[];
}

interface note {
  title: string,
  creationDate: Date,
  content: string
}

export default function DisplayNotes({ data }: getterData) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const notes = data as Array<note>

  return (
    <>
      {
        notes.map((note) => (
          < Card className={classes.root} >
            <CardContent>
              <Typography variant="h5" className={classes.title} gutterBottom>
                {note.title}
              </Typography>
              <Typography variant="body2" component="h2">
                {note.creationDate}
              </Typography>
              <Typography variant="body1" component="p">
                {note.content}
              </Typography>
            </CardContent>
            <Divider />
          </Card >
        ))}
    </>
  );
}