import { SavedForm } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Box, List, ListItem, Paper } from '@mui/material'
import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@mui/styles'
import FormListItem from './BrowserSavedForms/FormListItem'
import SavedFormDetails from './BrowserSavedForms/SavedFormDetails'

export interface Props {
  data: Array<SavedForm>
}

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
  },
  formList: {
    height: '100%',
    width: '25%',
    padding: 0,
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
    <Box height={ 1 } padding={ 4 }>
      <Paper className={ classes.paper } elevation={ 2 }>
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
      </Paper>
    </Box>
  )
}
