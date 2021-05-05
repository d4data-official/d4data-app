import { Extension } from 'd4data-archive-lib/dist/src/types/schemas/BrowserData'
import { Box } from '@material-ui/core'
import ExtensionCard from './BrowserExtensions/ExtensionCard'

export interface Props {
  data: Array<Extension>
}

export default function BrowserExtensions({ data }: Props) {
  return (
    <Box padding={ 2 } display="flex" flexWrap="wrap">
      {
        data.map((extension) => (
          <ExtensionCard data={ extension } key={ extension.name }/>
        ))
      }
    </Box>
  )
}
