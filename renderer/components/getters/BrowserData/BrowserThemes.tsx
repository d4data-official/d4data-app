import { Theme } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import openInBrowser from '../../../modules/openInBrowser'

export interface Props {
  data: Theme
}

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
})

export default function BrowserThemes({ data }: Props) {
  const { t } = useTranslation(['common', 'BrowserThemes'])

  const classes = useStyles()

  return (
    <Container maxWidth="sm" className={ classes.root }>
      <Box height={ 1 } width={ 1 } display="flex" flexDirection="column" justifyContent="center">
        <Card elevation={ 2 } sx={ { p: 1 } }>
          <CardHeader title={ t('BrowserThemes:cardHeader') }/>

          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography color="primary" variant="h6">{ data.name }</Typography>
            </Box>
          </CardContent>

          { data.websiteUrl && (
            <CardActions>
              <Tooltip title={ data.websiteUrl } placement="bottom">
                <Button
                  onClick={ () => openInBrowser(data.websiteUrl!) }
                  variant="outlined"
                  color="primary"
                  fullWidth
                >{ t('common:openWebsite') }
                </Button>
              </Tooltip>
            </CardActions>
          ) }
        </Card>
      </Box>
    </Container>
  )
}
