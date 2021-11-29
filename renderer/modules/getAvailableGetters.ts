import StandardizerIPC from '@shared/d4data-archive-lib/renderer/StandardizerIPC'
import { mutate } from 'swr'
import type Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { KEY } from '../hooks/getter/useAvailableGetters'

// Retrieve available getters for given standardizer and put result in SWR cache
export default async function getAvailableGetters(standardizer: StandardizerIPC): Promise<Array<Getters>> {
  const availableGetters = await standardizer.getAvailableGetters()

  await mutate(`${ KEY }-${ standardizer.path }`, availableGetters, false)

  return availableGetters
}
