import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { makeStyles } from '@mui/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, Divider, Grid } from '@mui/material'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Mail as MailsType } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

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
  const { t } = useTranslation('common')

  const classes = useStyles()

  const Mails = (
    <Box width={ 1 } height={ 1 } p={ 3 } pt={ 0 }>
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
                    { t('from') } : { mail.from }
                  </Typography>
                  <Typography variant="h5" className={ classes.subtitle } gutterBottom>
                    { t('to') } : { mail.to.join(', ') }
                  </Typography>
                  <Typography variant="h6" className={ classes.date } gutterBottom>
                    { t('date') } : { mail.date.toLocaleString() }
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

  return (
    <AutoTabs
      tabs={ [
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.MAIL }/>,
        Mails,
      ] }
    />
  )
}
