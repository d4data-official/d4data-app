import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
  useTheme,
} from '@mui/material'
import { Post as PostType, Reaction } from '@d4data/archive-lib/dist/src/types/schemas'
import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import getDurationFromNow from '../modules/getDurationFromNow'
import GenericReactionComponent from './getters/ReactedComponents/GenericReactionComponent'
import ConditionalTooltip from './ConditionalTooltip'
import PostLinks from './Post/PostLinks'
import SharableContent from './SharableContent'

export interface Props {
  post: PostType
  cardProps?: CardProps
}

export default function Post({ post, cardProps }: Props) {
  const { t } = useTranslation(['common', 'getters'])
  const theme = useTheme()

  const [accordionExpandedId, setAccordionExpandedId] = useState<number>()

  const subHeader = [
    post.sender ? t('common:sentBy', { sender: post.sender }) : undefined,
    `${ post.creationDate.toLocaleString() } (${
      t('common:ago', { time: getDurationFromNow(post.creationDate).humanize() })
    })`,
  ]
    .filter((item) => item)
    .join(', ')

  const hasMetaData = post.metaData?.links?.length > 0

  const handleExpend = (id: number) => setAccordionExpandedId((prevState) => (prevState !== id ? id : undefined))

  return (
    <SharableContent
      exportFileName={ t('getters:posts', { count: 1 }).toLowerCase() }
      menuIconColor={ theme.palette.primary.main }
      menuIconMargin={ { x: -14, y: -10 } }
    >
      <Card { ...cardProps }>
        <CardHeader
          title={ post.title }
          subheader={ subHeader }
        />
        <CardContent>
          { post.content && <Typography>{ post.content }</Typography> }

          { hasMetaData && (
            <Typography mt={ 1 } variant="overline" color="primary">{ t('common:metaData') }</Typography>
          ) }

          { post.metaData?.links?.length > 0 && (
            <PostLinks
              links={ post.metaData.links }
              accordionProps={ {
                expanded: accordionExpandedId === 1,
                onChange: () => handleExpend(1),
              } }
            />
          ) }

          { post.metaData?.reactions?.length > 0 && (
            <Accordion
              expanded={ accordionExpandedId === 2 }
              onChange={ () => handleExpend(2) }
              variant="outlined"
            >
              <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                <Typography>{ `${ t('common:reactions') } (${ post.metaData.reactions.length })` }</Typography>
              </AccordionSummary>

              <AccordionDetails>
                { post.metaData.reactions.map((reaction: Reaction) => (
                  <ConditionalTooltip show={ !!reaction.description } title={ reaction.description }>
                    <GenericReactionComponent reaction={ reaction }/>
                  </ConditionalTooltip>
                )) }
              </AccordionDetails>
            </Accordion>
          ) }
        </CardContent>
      </Card>
    </SharableContent>
  )
}
