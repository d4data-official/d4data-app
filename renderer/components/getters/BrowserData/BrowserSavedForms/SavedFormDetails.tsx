import { SavedForm } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Grid, TextField, Typography } from '@material-ui/core'
import { CSSProperties, ReactNode } from 'react'

export interface Props {
  name?: string
  form: SavedForm
  className?: string
  style?: CSSProperties
}

const CustomField = ({ label, value }: { label: ReactNode, value: unknown }) => (
  <TextField
    label={ label }
    value={ value }
    fullWidth
    InputProps={ {
      readOnly: true,
    } }
    variant="outlined"
  />
)

export default function SavedFormDetails({ name, form, className, style }: Props) {
  return (
    <div className={ className } style={ style }>
      <Grid container spacing={ 2 }>
        { name && (
          <Grid item xs={ 12 }>
            <Typography variant="h5">{ name }</Typography>
          </Grid>
        ) }
        <Grid item xs={ 6 }>
          <CustomField label="First name" value={ form.firstName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Last name" value={ form.lastName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Full name" value={ form.fullName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Company name" value={ form.companyName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Email" value={ form.email }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Phone number" value={ form.phoneNumber }/>
        </Grid>

        <Grid item xs={ 12 }>
          <Typography variant="h5">Address</Typography>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Line 1" value={ form.address?.line1 }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label="Line 2" value={ form.address?.line2 }/>
        </Grid>
        <Grid item xs={ 12 }>
          <CustomField label="Address" value={ form.address?.streetAddress }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label="ZIP" value={ form.address?.zip }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label="City" value={ form.address?.city }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label="Country" value={ form.address?.country }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label="State" value={ form.address?.state }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label="Language code" value={ form.address?.languageCode }/>
        </Grid>
      </Grid>
    </div>
  )
}
