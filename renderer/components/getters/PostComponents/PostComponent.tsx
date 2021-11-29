import React from 'react'
import moment from 'moment'
import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Box, Button, capitalize, CardHeader, Tooltip } from '@mui/material'
import openInBrowser from '../../../modules/openInBrowser'
import ReactionsComponent from './ReactionsComponent'
import DisabledReactionsComponent from './DisabledReactionsComponent'

export default function PostComponent({ data }: { data: NonNullable<Post> }) {
  const getCardHeaderSubTitle = () => {
    const title = []

    if (data.sender) {
      title.push(`Sent by ${ data.sender }`)
    }
    if (data.creationDate) {
      title.push(`on ${ data.creationDate.toLocaleDateString() } (${
        moment
          .duration(new Date().valueOf() - data.creationDate.valueOf())
          .humanize(false)
      } ago)`)
    }

    return capitalize(title.join(' '))
  }

  const getCardHeader = () => {
    if (data.title) {
      return (<CardHeader title={ data.title } subheader={ getCardHeaderSubTitle() }/>)
    }

    if (data.metaData?.links?.[0]) {
      return (
        <CardHeader
          title={ (
            <Tooltip title={ data.metaData?.links?.[0] }>
              <Typography variant="h5" component="span">Link</Typography>
            </Tooltip>
          ) }
          subheader={ getCardHeaderSubTitle() }
          action={
            <Button variant="text" onClick={ () => openInBrowser(data.metaData?.links?.[0]) }>View in browser</Button>
          }
        />
      )
    }

    if (data.metaData?.medias?.[0]) {
      return (
        <CardHeader
          title="Media"
          subheader={ getCardHeaderSubTitle() }
          action={
            <Button variant="text" onClick={ () => openInBrowser(data.metaData?.medias?.[0]) }>View in browser</Button>
          }
        />
      )
    }

    return undefined
  }

  return (
    <Card variant="outlined" sx={ { minWidth: 275, p: 2, pt: 1 } }>
      { getCardHeader() }

      <CardContent>
        { data.content && (
          <Typography variant="body2" component="p">{ data.content }</Typography>
        ) }
      </CardContent>

      <Box width={ 1 }>
        { data.metaData?.reactions
          ? <ReactionsComponent data={ data.metaData?.reactions }/>
          : <DisabledReactionsComponent/> }
      </Box>
    </Card>
  )
}
