import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import Case from 'case'
import { useTranslation } from 'react-i18next'

export default function useGetGetterLabel() {
  const { t } = useTranslation('getters')

  const getGetterLabel = (getter: Getters) => {
    const translation = t(getter)

    if (!translation) {
      return Case.capital(getter).replace('Get ', '')
    }

    return translation
  }

  return {
    getGetterLabel,
  }
}
