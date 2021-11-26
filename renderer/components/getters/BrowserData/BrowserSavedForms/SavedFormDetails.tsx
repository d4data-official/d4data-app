import { SavedForm } from '@d4data/archive-lib/dist/src/types/schemas/BrowserData'
import { Grid, TextField, Typography } from '@mui/material'
import { CSSProperties, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('common')

  return (
    <div className={ className } style={ style }>
      <Grid container spacing={ 2 }>
        { name && (
          <Grid item xs={ 12 }>
            <Typography variant="h5">{ name }</Typography>
          </Grid>
        ) }
        <Grid item xs={ 6 }>
          <CustomField label={ t('firstName') } value={ form.firstName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('lastName') } value={ form.lastName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('fullName') } value={ form.fullName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('companyName') } value={ form.companyName }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('email') } value={ form.email }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('phone') } value={ form.phoneNumber }/>
        </Grid>

        <Grid item xs={ 12 }>
          <Typography variant="h5">{ t('address') }</Typography>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('line1') } value={ form.address?.line1 }/>
        </Grid>
        <Grid item xs={ 6 }>
          <CustomField label={ t('line1') } value={ form.address?.line2 }/>
        </Grid>
        <Grid item xs={ 12 }>
          <CustomField label={ t('address') } value={ form.address?.streetAddress }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label={ t('zip') } value={ form.address?.zip }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label={ t('city') } value={ form.address?.city }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label={ t('country') } value={ form.address?.country }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label={ t('state') } value={ form.address?.state }/>
        </Grid>
        <Grid item xs={ 4 }>
          <CustomField label={ t('languageCode') } value={ form.address?.languageCode }/>
        </Grid>
      </Grid>
    </div>
  )
}
