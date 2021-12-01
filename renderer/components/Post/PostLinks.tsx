import { Post } from '@d4data/archive-lib/dist/src/types/schemas'
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Link, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import openInBrowser from '../../modules/openInBrowser'

export interface Props {
  links: Post['metaData']['links']
  accordionProps?: Omit<AccordionProps, 'children'>
}

export default function PostLinks({ links, accordionProps }: Props) {
  const { t } = useTranslation('common')

  if (links.length === 1) {
    return (
      <Link
        onClick={ () => openInBrowser(links[0]) }
        color="text.secondary"
        component="p"
        style={ {
          width: '100%',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          cursor: 'pointer',
        } }
      >
        { links[0] }
      </Link>
    )
  }

  return (
    <Accordion
      variant="outlined"
      { ...accordionProps }
    >
      <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
        <Typography>{ `${ t('links') } (${ links.length })` }</Typography>
      </AccordionSummary>

      <AccordionDetails>
        { links.map((link: string) => (
          <Link
            onClick={ () => openInBrowser(link) }
            style={ {
              width: '100%',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              cursor: 'pointer',
            } }
          >
            { link }
          </Link>
        )) }
      </AccordionDetails>
    </Accordion>
  )
}
