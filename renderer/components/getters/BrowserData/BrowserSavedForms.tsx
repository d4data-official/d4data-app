import { SavedForm } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, List, ListItem } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import FormListItem from './BrowserSavedForms/FormListItem'
import SavedFormDetails from './BrowserSavedForms/SavedFormDetails'

export interface Props {
  data: Array<SavedForm>
}

const useStyles = makeStyles((theme) => createStyles({
  formList: {
    padding: 0,
    width: '25%',
    borderRight: '1px solid lightgrey',
    overflow: 'auto',
  },
  formListItem: {
    padding: `${ theme.spacing(1) }px ${ theme.spacing(2) }px`,
  },
  selectedFormListItem: {
    borderLeft: `2px solid ${ theme.palette.primary.main }`,
  },
  formDetails: {
    width: '75%',
    padding: theme.spacing(2),
    overflow: 'auto',
  },
}))

function computeKey(form: SavedForm): string {
  return [form.useCount, form.email, form.phoneNumber, form.address?.line1].join('+')
}

export default function BrowserSavedForms({ data }: Props) {
  const [currentFormIdx, setCurrentFormIdx] = useState<number | undefined>(data.length ? 0 : undefined)
  const classes = useStyles()
  const sortedForms = useMemo(() => data.sort((form1, form2) => {
    if (form1.useCount && form2.useCount) {
      return form2.useCount - form1.useCount
    }
    if (form1.lastUseDate && form2.lastUseDate) {
      return form2.lastUseDate.valueOf() - form1.lastUseDate.valueOf()
    }
    return 0
  }), [data])

  return (
    <Box height={ 1 } display="flex" overflow="hidden">
      <div className={ classes.formList }>
        <List component="nav" aria-label="mailbox folders">
          { sortedForms.map((form, idx) => (
            <ListItem
              button
              divider
              key={ computeKey(form) }
              onClick={ () => setCurrentFormIdx(idx) }
              className={ clsx({ [classes.selectedFormListItem]: idx === currentFormIdx }) }
            >
              <FormListItem
                name={ `Saved form ${ idx + 1 }` }
                form={ form }
                className={ classes.formListItem }
              />
            </ListItem>
          )) }
        </List>
      </div>

      {
        currentFormIdx !== undefined && (
          <SavedFormDetails
            name={ `Saved form ${ currentFormIdx + 1 }` }
            form={ sortedForms[currentFormIdx] }
            className={ classes.formDetails }
          />
        )
      }
      <div/>
    </Box>
  )
}
