import { SavedForm } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Typography } from '@material-ui/core'
import { CSSProperties } from 'react'
import moment from 'moment'

export interface Props {
  name?: string
  form: SavedForm
  className?: string
  style?: CSSProperties
}

const DEFAULT_FORM_NAME = 'Unknown form'

export default function FormListItem({ name = DEFAULT_FORM_NAME, form, className, style }: Props) {
  return (
    <div className={ className } style={ style }>
      <Typography variant="h6">{ name }</Typography>
      { form.useCount && <div>Used { form.useCount } time(s)</div> }
      { form.lastUseDate && <div>Last used: { moment.duration(form.lastUseDate.valueOf()).humanize() } </div> }
    </div>
  )
}
