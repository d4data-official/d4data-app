import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box, Divider, Grid } from '@material-ui/core'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Mail as MailsType } from '@d4data/archive-lib/dist/src/types/schemas'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  title: {
    fontSize: 20,
  },
  subtitleFrom: {
    marginTop: 20,
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    marginTop: 30,
  },
  mailContent: {
    marginTop: 30,
  },
})

export interface Props {
  data: NonNullable<GetterData<Array<MailsType>>>
}

export default function Mails({ data }: Props) {
  const classes = useStyles()

  return (
    <Box width={ 1 } height={ 1 }>
      <h2>{ data.data.length } mails</h2>
      <Grid container spacing={ 2 }>
        {
          data.data.map((mail) => (
            <Grid item xs={ 12 }>
              < Card className={ classes.root }>
                <CardContent>
                  <Typography variant="h5" className={ classes.title } gutterBottom>
                    <b>{ mail.subject }</b>
                  </Typography>
                  <Typography variant="h5" className={ classes.subtitleFrom } gutterBottom>
                    From : { mail.from }
                  </Typography>
                  <Typography variant="h5" className={ classes.subtitle } gutterBottom>
                    To : { mail.to.join(', ') }
                  </Typography>
                  <Typography variant="h6" className={ classes.date } gutterBottom>
                    Date : { mail.date.toLocaleString() }
                  </Typography>
                  <Divider/>
                  <div className={ classes.mailContent }>
                    { ReactHtmlParser(mail.content) }
                  </div>
                </CardContent>
                <Divider/>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
