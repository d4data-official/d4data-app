import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { useTranslation } from 'components/Translate'

export default function useLabelizeLabel() {
  const translate = useTranslation();

  return (getter: Getters) => translate('getters', getter.replace('get', '').toLowerCase());
}
